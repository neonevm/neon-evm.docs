---
title: Setting up a Local Solana Cluster
---

*This step-by-step guide describes how to install, configure, and test the local Solana cluster with Neon EVM onboard. It will help new developers create their own environment and run Ethereum programs wrapped into the Neon EVM.*

The [Neon EVM](https://neon-labs.org/) is a solution that performs transaction execution outside layer 1. The development process can be run on any modern Linux or Mac system, though this document is based on an Ubuntu 20.04 experience.

All the services in the **`Neon EVM environment`** presented by the docker-compose configuration files can be interchangeably substituted with their experimental versions in order to develop and test each service independently. To resolve issues, the Neon engineer has to be able to replace any service with a customized one according to the current requirements. You are welcome to change the following `docker-compose` configuration files based on your needs. Also, you can bring them altogether in a single docker-compose file, it is important to provide dependencies according to the following sequence.

Before you start to build your local environment, make sure you have all the [prerequisites](#prerequisites).

## Prerequisites

- **Docker** — for docker installation, please follow instructions at: https://docs.docker.com/engine/install/ubuntu/
- **Docker Compose** — Docker Compose is required to start up containers at: https://docs.docker.com/compose/install/
- **Solana Tool Suite** — for interaction with Solana, we need to install Solana CLI Tools: https://docs.solana.com/ru/cli/install-solana-cli-tools
- A Chromium-based **browser** — for [MetaMask](https://metamask.io/) and [Remix](https://remix.ethereum.org/)
* **Node package manager** — [Node.js/npm](https://www.w3schools.com/nodejs/nodejs_npm.asp) to interact with he Neon EVM with [Web3](https://www.npmjs.com/package/web3) and [Eth](https://www.npmjs.com/package/web3-eth) modules.

## Setting up the Neon Local Workspace Environment

Currently, the most flexible way is to use the set of independent docker containers sharing the common external network. To create the network called **`local`** that will be used over the docker containers, just input the following command:

```bash
docker network create local
```

If you want to bind some ports from the service to the host machine to be able to connect them and work with a service independently, just extend a `docker-compose.yml` configurations with the `ports` instruction. For example, you can bind the Solana (8899, 8900)- or Proxy (9090)-related ports to the host machine this way.

After establishing the local network, it's time to start the following containers:

<details><summary>1. Solana validator service</summary>

This service presents the Solana validator running inside the container

Once you deploy the environment, you'll have the Solana RPC endpoint working from the docker container at the 9090 port. The folder named "solana_state" will be created as well. It contains the Solana ledger to keep the state over restarts. If you need to reset the ledger, just remove this folder and it'll be recreated the next time you run docker-compose.

#### docker-compose.yml

    version: "3"

    services:
      solana:
        container_name: solana
        image: neonlabsorg/solana:${SOLANA_REVISION:-v1.9.12-testnet}
        environment:
          SOLANA_URL: http://solana:8899
          RUST_LOG: solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=debug,solana_bpf_loader=debug,solana_rbpf=debug
        expose:
          - 8899
          - 8900
        networks:
          - net
        healthcheck:
          test: [ CMD-SHELL, "solana cluster-version -u http://solana:8899" ]
          interval: 5s
          timeout: 10s
          retries: 10
          start_period: 10s
        volumes:
          - "./solana_state:/opt/solana/config/"

    networks:
      net:
        external: yes
        name: local

#### How to run it in bash

    $ docker-compose -f solana/docker-compose.yml pull
    $ docker-compose -f solana/docker-compose.yml up -d

</details>

<details><summary>2. EVM loader service</summary>

This container helps deploy the Neon EVM base contract onto Solana that listens for incoming connections on the port 8899. It's important to say that this container doesn't work as daemon, it just uploads the Neon EVM contract and finishes with zero return code.

#### docker-compose.yml

    version: "3"

    services:
      evm_loader:
        container_name: evm_loader
        image: neonlabsorg/evm_loader:latest
        environment:
          - SOLANA_URL=http://solana:8899
        networks:
          - net
        command: bash -c "create-test-accounts.sh 1 && deploy-evm.sh && /opt/spl-token create-account HPsV9Deocecw3GeZv1FkAPNCBRfuVyfw9MMwjwRe1xaU && /opt/spl-token mint HPsV9Deocecw3GeZv1FkAPNCBRfuVyfw9MMwjwRe1xaU 1000000000 --owner /opt/evm_loader-keypair.json -- HX14J4Pp9CgSbWP13Dtpm8VLJpNxMYffLtRCRGsx7Edv"

    networks:
      net:
        external: yes
        name: local

#### How to Run It in Bash

       $ docker-compose -f evm-loader/docker-compose.yml pull
       $ docker-compose -f evm-loader/docker-compose.yml up
</details>

<details><summary>3. Database services</summary>

This container aims to handle the database that stores all the relevant Ethereum processing metadata linked to each other: **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`** etc. This data is consumed by the **indexer** service.

#### docker-compose.yml

    version: "3"

    services:
      postgres:
        container_name: postgres
        image: postgres:14.0
        command: postgres -c 'max_connections=1000'
        environment:
          POSTGRES_DB: neon-db
          POSTGRES_USER: neon-proxy
          POSTGRES_PASSWORD: neon-proxy-pass
        hostname: postgres
        healthcheck:
          test: [ CMD-SHELL, "pg_isready -h postgres -p 5432" ]
          interval: 5s
          timeout: 10s
          retries: 10
          start_period: 5s
        networks:
          - net
        ports:
          - "127.0.0.1:5432:5432"
        expose:
          - "5432"

      dbcreation:
        container_name: dbcreation
        image: neonlabsorg/proxy:latest
        environment:
          SOLANA_URL: http://solana:8899
          POSTGRES_DB: neon-db
          POSTGRES_USER: neon-proxy
          POSTGRES_PASSWORD: neon-proxy-pass
          POSTGRES_HOST: postgres
        entrypoint: proxy/run-dbcreation.sh
        networks:
          - net
        depends_on:
          postgres:
            condition: service_healthy


    networks:
      net:
        external: yes
        name: local

#### How to Run It in Bash

    $ docker-compose -f postgres/docker-compose.yml pull
    $ docker-compose -f postgres/docker-compose.yml up -d

</details>


<details><summary>4. Indexer service</summary>

The indexer service indexes all the relevant Ethereum processing metadata consisting of **`signatures`**, **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`**, etc. It gathers all this data from the Solana blockchain, filtering them by the EVM contract address. It also makes it possible to provide our users with the Ethereum API according to the data provided by the whole known operators.

#### docker-compose.yml

    version: "3"

    services:
      indexer:
        container_name: indexer
        image: neonlabsorg/proxy:latest
        environment:
          SOLANA_URL: http://solana:8899
          POSTGRES_DB: neon-db
          POSTGRES_USER: neon-proxy
          POSTGRES_HOST: postgres
          POSTGRES_PASSWORD: neon-proxy-pass
          CONFIG: ci
          START_SLOT: LATEST
        hostname: indexer
        entrypoint: proxy/run-indexer.sh

        networks:
          - net

    networks:
      net:
        external: yes
        name: local

#### How To Run It in Bash

    $ docker-compose -f indexer/docker-compose.yml pull
    $ docker-compose -f indexer/docker-compose.yml up -d

</details>

<details><summary>5. Proxy service</summary>
The Proxy service is a core service that allows Ethereum-like transactions to be processed on [Solana](https://docs.solana.com/introduction), taking full advantage of the functionality native to Solana, including the ability to execute transactions in parallel. It's available on 9090 port.

#### docker-compose.yml

    version: "3"

    services:
      proxy:
        container_name: proxy
        image: neonlabsorg/proxy:latest
        environment:
          - POSTGRES_DB=neon-db
          - POSTGRES_USER=neon-proxy
          - POSTGRES_PASSWORD=neon-proxy-pass
          - POSTGRES_HOST=postgres
          - SOLANA_URL=http://solana:8899
          - EXTRA_GAS=5000
          - EVM_LOADER=53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
          - CONFIG=ci
          - LOG_NEON_CLI_DEBUG=YES
          - USE_COMBINED_START_CONTINUE=yes
          - NEON_CLI_TIMEOUT=60
          - NEW_USER_AIRDROP_AMOUNT=0
          - WRITE_TRANSACTION_COST_IN_DB=NO
          - START_SLOT=LATEST
          - PERM_ACCOUNT_LIMIT=16
        hostname: proxy
        entrypoint: ./proxy/run-proxy.sh
        ports:
          - "9090:9090"
        expose:
          - "9090"
        networks:
          - net

    networks:
      net:
        external: yes
        name: local

#### How to Run It in Bash

    $ docker-compose -f proxy/docker-compose.yml pull
    $ docker-compose -f proxy/docker-compose.yml up -d

</details>


<details><summary>6. Faucet service</summary>
The Faucet service provides the liquidity in `NEON` to all the accounts that are mentioned in the incoming requests.

#### docker-compose.yml

    version: "3"

    services:

      faucet:
        container_name: faucet
        image: neonlabsorg/faucet:latest
        environment:
          - FAUCET_RPC_BIND=0.0.0.0
          - FAUCET_RPC_PORT=3333
          - SOLANA_URL=http://solana:8899
          - NEON_ETH_MAX_AMOUNT=50000
          - EVM_LOADER=53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
          - FAUCET_RPC_ALLOWED_ORIGINS=["https://neonswap.live"]
          - FAUCET_WEB3_ENABLE=false
          - FAUCET_SOLANA_ENABLE=true
          - NEON_OPERATOR_KEYFILE=/opt/faucet/id.json
          - SOLANA_COMMITMENT=confirmed
        entrypoint: /opt/faucet/faucet --config /opt/proxy/faucet.conf run
        ports:
          - 3333:3333
        expose:
          - "3333"
        networks:
          - net

    networks:
      net:
        external: yes
        name: local

#### How to Run It in Bash

    $ docker-compose -f faucet/docker-compose.yml pull
    $ docker-compose -f faucet/docker-compose.yml up -d

</details>


<details><summary>7. Full test suite service</summary>

The full test suite provides in general the [OpenZeppelin tests](https://docs.openzeppelin.com/learn/writing-automated-tests) to make sure the infrastructure deployed by this guide works properly. At the end, the `full test suite` outputs the result in the following form:

    Full test passing - 1743
    Full test threshold - 1700
    Check if 1743 is greater or equal 1700

#### full_test_suite/docker-compose.yml

    version: "3"

    services:

      full_test_suite:
        container_name: ${FTS_CONTAINER_NAME:-full_test_suite}
        image: ${FTS_IMAGE:-neonlabsorg/full_test_suite:develop}
        entrypoint: ./run-full-test-suite.sh 2>/dev/null
        environment:
          - NETWORK_NAME=${NETWORK_NAME}
          - PROXY_URL=${PROXY_URL}
          - NETWORK_ID=${NETWORK_ID}
          - REQUEST_AMOUNT=${REQUEST_AMOUNT}
          - FAUCET_URL=${FAUCET_URL}
          - USE_FAUCET=${USE_FAUCET}
          - SOLANA_URL=${SOLANA_URL}
          - FTS_USERS_NUMBER=${FTS_USERS_NUMBER}
          - FTS_JOBS_NUMBER=${FTS_JOBS_NUMBER}

        networks:
          - net

    networks:
      net:
        external: yes
        name: local

#### full_test_suite/local.env

    NETWORK_NAME=local
    PROXY_URL=http://proxy:9090/solana
    NETWORK_ID=111
    REQUEST_AMOUNT=20000
    FAUCET_URL=http://faucet:3333/request_neon
    USE_FAUCET=true
    SOLANA_URL=http://solana:8899
    FTS_USERS_NUMBER=15
    FTS_JOBS_NUMBER=8

#### How to Run It in Bash

    $ docker-compose -f full_test_suite/docker-compose.yml pull
    $ docker-compose -f full_test_suite/docker-compose.yml --env-file full_test_suite/local.env up

</details>

## Logs

After following the previous steps, you will have four running containers for the Neon EVM local environment: **solana**, **`postgres`**, **`proxy`**, **`indexer`**:

```
49c864f47ccd   neonlabsorg/solana:v1.9.12-testnet   "./run.sh"               About an hour ago   Up About an hour (healthy)   8003/udp, 0.0.0.0:8899-8900->8899-8900/tcp, :::8899-8900->8899-8900/tcp, 9900/tcp   solana
92f6b4492894   neonlabsorg/proxy:latest             "./proxy/run-proxy.sh"   46 hours ago        Up About an hour             0.0.0.0:9090->9090/tcp, :::9090->9090/tcp                                           proxy
932d4d860629   neonlabsorg/proxy:latest             "proxy/run-indexer.sh"   46 hours ago        Up About an hour             9090/tcp                                                                            indexer
5a7df37069fc   postgres:14.0                        "docker-entrypoint.s…"   47 hours ago        Up About an hour (healthy)   127.0.0.1:5432->5432/tcp                                                            postgres
```

To look for events or errors, just run the `docker logs` for either the `solana` or `proxy` container:

```sh
$ docker logs -f solana 2>&1 | grep -v "Program Vote111111111111111111111111111111111111111"
$ docker logs -f proxy
```

## Remix and MetaMask with the Neon EVM

Set up the "MetaMask" Chromium extension to connect to the proxy via Custom RPC at `http://localhost:9090/solana`. The following image describes how to set up the local Solana connection:  

<div class='neon-img-box-300' style={{textAlign: 'center'}}>  

![](../img/cluster-install-1.png)

</div>

Note: Once you create or import a new account in MetaMask, some NEONs will be airdropped into it.

Open Remix (also in Chromium) and select `Injected Web3` environment. You can deploy EVM-wrapped smart contracts on Solana and input these instructions:  

<div class='neon-img-box-300' style={{textAlign: 'center'}}>  

![](../img/cluster-install-2.png)

</div>

## Truffle Suite with Neon EVM

Truffle is a popular platform to deploy and test Solidity programs. This section shows you how to check the compatibility of the Neon EVM and the Truffle suite.

In the new terminal, create a Truffle project and deploy contracts into EVM:

```sh
$ sudo npm install -g truffle
$ mkdir myproject && cd myproject
$ truffle init
$ npm install web3 @truffle/hdwallet-provider
```

### Common Truffle Settings

Put your `truffle-config.js` into the Truffle root:

```sh
$ echo 'const Web3 = require("web3");

const Web3eth = require("web3-eth");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const web3eth = new Web3eth();
const accs = Array.from(Array(10), (_, x) => web3eth.accounts.create());
const privateKeys = accs.map((account) => account.privateKey);

module.exports = {
  networks: {
    solana: {
      provider: new HDWalletProvider(privateKeys, "http://127.0.0.1:9090/solana"),
      from: accs[0].publicKey,
      network_id: "111",
      gas: 3000000,
      gasPrice: 1000000000,
    }
  },

  compilers: {
    solc: {
      version: "0.8.9"
    }
  }
};' > truffle-config.js
```

### Contract Creation

Create a trivial contract at `contracts/Storage.sol`:

```sh
$ echo '// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Storage {
    uint256 number;

    function put(uint256 num) public {
        number = num;
    }

    function get() public view returns (uint256) {
        return number;
    }
}' > contracts/Storage.sol
```

### Testing

You can now start testing `Storage` invocations with Truffle facility:

```sh
$ echo 'const Storage = artifacts.require("Storage");

contract("Storage", (accounts) => {
    let storage;

    beforeEach(async () => {
        storage = await Storage.new();
    });

    it("should store a value", async () => {
        const setResult = await storage.put(248);
        assert.equal(setResult.receipt.status, true);
        const value = await storage.get();
        assert.equal(value, 248);
    })
})' > test/Storage.test.js

$ truffle test test/Storage.test.js --network solana
```

### Possible Problems

If for some reasons you remove the Solana container and run it again, then all related accounts stored in foreign systems get invalid from that moment. That's why you need to re-run the proxy container and reset the state of MetaMask and Truffle as well, to make all relations consistent.

To reset the MetaMask state, follow the steps at `Settings`, `Advanced`, `Reset Account`.

The Truffle state can be reset by redeploying it in the following way:

```sh
$ truffle compile --network solana --reset
```

---

*Deploy your Solidity programs on the [Solana](https://solana.com)-driven [Neon EVM](https://neon-labs.org/)*.
