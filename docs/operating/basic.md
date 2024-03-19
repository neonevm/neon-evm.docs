---
title: Proxy local testing
proofedDate: 20230706
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

import stats from '@site/static/img/doc-images/operating/local-proxy/docker-stats2.png';
import network from '@site/static/img/doc-images/operating/local-proxy/mm-manual-network-add.png';
import network2 from '@site/static/img/doc-images/operating/local-proxy/network.png';
import nmap from '@site/static/img/doc-images/operating/local-proxy/nmap-local-host.png'; 
import update from '@site/static/img/doc-images/operating/local-proxy/mmw_update.png'; 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Prerequisites

- Ubuntu/Intel
> This tutorial presents a flow using an Intel chip with Ubuntu (as of the time of writing, the Solana image does not support alternative operating systems).
- Browser supporting a MetaMask wallet 
> [This tutorial uses Brave](https://brave.com/linux/).
- [Docker compose](https://docs.docker.com/compose/install/) v>[2.12.1](https://docs.docker.com/compose/release-notes/#2121)
- 1 Terabyte or more to run the Solana standalone node
> Solana provides further details on the [recommended minimum requirements](https://docs.solana.com/ru/running-validator/validator-reqs).
- nmap (or equivalent)


## Step 1: Create a docker compose file

<!-- Clone the Neon Proxy for Solana: https://github.com/neonlabsorg/proxy-model.py and change directory (`cd`) into the folder. -->
Save the following code to a file in your local destination.
<span style={{paddingLeft: '20px', fontStyle: 'italic'}}> 
<details>
<summary>docker-compose.yml file content</summary>

```YAML
version: "3"

services:
  solana:
    container_name: solana
    image: neonlabsorg/evm_loader:${NEON_EVM_COMMIT:-v1.7.2}
    environment:
      SOLANA_URL: http://solana:8899
      RUST_LOG: solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=debug,solana_bpf_loader=debug,solana_rbpf=debug
    hostname: solana
    expose:
      - "8899"
      - "9900"
      - "8900"
      - "8001"
      - "8001-8009/udp"
    networks:
      - net
    ports:
      - 8899:8899
      - 8900:8900
    healthcheck:
      # Must be available from outside (calling without -u causes premature result)
      test: [ CMD-SHELL, "./wait-for-neon.sh" ]
      interval: 5s
      timeout: 5s
      retries: 20
      start_period: 5s
    entrypoint: /opt/solana-run-neon.sh

  neon_test_invoke_program_loader:
    container_name: neon_test_invoke_program_loader
    image: neonlabsorg/neon_test_invoke_program:develop
    environment:
      SOLANA_URL: http://solana:8899
    networks:
      - net
    depends_on:
      solana:
        condition: service_healthy
    entrypoint: /opt/neon-test-invoke-program.sh

  postgres:
    container_name: postgres
    image: postgres:15.3
    command: postgres -c 'max_connections=1000'
    environment:
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
    hostname: postgres
    healthcheck:
      test: [ CMD-SHELL, "pg_isready -h postgres -p 5432" ]
      interval: 3s
      timeout: 3s
      retries: 10
      start_period: 5s
    expose:
      - "5432"
    ports:
      - "5432"
    networks:
      - net

  dbcreation:
    container_name: dbcreation
    image: neonlabsorg/proxy:${PROXY_COMMIT:-v1.7.9}
    environment:
      SOLANA_URL: http://solana:8899
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
      POSTGRES_HOST: postgres
    entrypoint: /bin/sh
    command: proxy/run-dbcreation.sh
    networks:
      - net
    depends_on:
      postgres:
        condition: service_healthy

  proxy:
    container_name: proxy
    image: neonlabsorg/proxy:${PROXY_COMMIT:-v1.7.9}
    environment:
      SOLANA_URL: http://solana:8899
      FAUCET_URL: http://faucet:3333
      PROXY_URL: http://proxy:9090/solana
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
      POSTGRES_HOST: postgres
      NEON_CLI_DEBUG_LOG: "YES"
      FUZZ_FAIL_PCT: 0
      GATHER_STATISTICS: "YES"
      CONFIG: ci
      MIN_OPERATOR_BALANCE_TO_WARN: 4565760000 # = 913152000 * 5 (5 storage accounts) = 4.56576 SOL
      MIN_OPERATOR_BALANCE_TO_ERR: 913152000 # = solana rent 131072 (= Rent-exempt minimum: 0.913152 SOL) SOLs to create a storage
      PP_SOLANA_URL: ${CI_PP_SOLANA_URL:-https://api.devnet.solana.com}
      PYTH_MAPPING_ACCOUNT: ${CI_PYTH_MAPPING_ACCOUNT:-BmA9Z6FjioHJPpjT39QazZyhDRUdZy2ezwx4GiDdE2u2}
      GAS_PRICE_SLIPPAGE: 0.3
      ENABLE_PRIVATE_API: "NO"
      ALLOW_UNDERPRICED_TX_WITHOUT_CHAINID: "YES"
      LOG_FULL_OBJECT_INFO: "NO"
      EVM_LOADER: 53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
      RUST_BACKTRACE: ${RUST_BACKTRACE:-0}
      COMMIT_LEVEL: "Confirmed"
      SOLANA_KEY_FOR_EVM_CONFIG: "BMp6gEnveANdvSvspESJUrNczuHz1GF5UQKjVLCkAZih"
    hostname: proxy
    depends_on:
      solana:
        condition: service_healthy
      dbcreation:
        condition: service_completed_successfully
    ports:
      - 9090:9090
      - 8881:8888
    expose:
      - "8888"
      - "9090"
    networks:
      - net
    entrypoint: proxy/run-test-proxy.sh
    healthcheck:
      test: [ CMD-SHELL, "/opt/health_check_proxy.sh" ]
      interval: 5s
      timeout: 3s
      retries: 20
      start_period: 5s

  faucet:
    container_name: faucet
    image: neonlabsorg/faucet:${FAUCET_COMMIT:-v1.7.x}
    environment:
      FAUCET_RPC_BIND: 0.0.0.0
      FAUCET_RPC_PORT: 3333
      FAUCET_WEB3_ENABLE: 'true'
      WEB3_RPC_URL: http://solana:8899
      WEB3_PRIVATE_KEY: 0x4deacb079b4714c38f39508aa8900039f2721ed8686835d43347ba9267da767b
      NEON_ERC20_TOKENS: '["0xB521b9F3484deF53545F276F1DAA50ef0Ca82E2d", "0x8a2a66CA0E5D491A001957edD45A6350bC76D708", "0x914782059DC42d4E590aeFCfdbF004B2EcBB9fAA", "0x7A7510b9b18241C788a7aAE8299D1fA6010D8128"]'
      NEON_ERC20_MAX_AMOUNT: 1000
      FAUCET_SOLANA_ENABLE: 'true'
      SOLANA_URL: http://solana:8899
      NEON_OPERATOR_KEYFILE: /root/.config/solana/id.json
      NEON_ETH_MAX_AMOUNT: 50000
      TEST_FAUCET_INIT_NEON_BALANCE: 100000000
      EVM_LOADER: 53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
      NEON_TOKEN_MINT: HPsV9Deocecw3GeZv1FkAPNCBRfuVyfw9MMwjwRe1xaU
      NEON_TOKEN_MINT_DECIMALS: 9
      SOLANA_COMMITMENT: confirmed
      RUST_BACKTRACE: ${RUST_BACKTRACE:-0}
    hostname: faucet
    ports:
      - 3333:3333
    expose:
      - "3333"
    networks:
      - net
    entrypoint: ./run-test-faucet.sh
    depends_on:
      solana:
        condition: service_healthy

  indexer:
    container_name: indexer
    image: neonlabsorg/proxy:${PROXY_COMMIT:-v1.7.9}
    environment:
      SOLANA_URL: http://solana:8899
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
      POSTGRES_HOST: postgres
      POSTGRES_TIMEOUT: 5
      GATHER_STATISTICS: "YES"
      LOG_FULL_OBJECT_INFO: "NO"
      CONFIG: ci
      EVM_LOADER: 53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
      START_SLOT: latest
      REINDEX_START_SLOT: continue
    hostname: indexer
    depends_on:
      solana:
        condition: service_healthy
      dbcreation:
        condition: service_completed_successfully
    expose:
      - "8887"
    ports:
      - 8882:8888
    networks:
      - net
    entrypoint: proxy/run-indexer.sh

networks:
  net:
```
</details> </span>
In case you want to use a remote Solana node, change the SOLANA_URL value to its URL.

## Step 2: Configure environment variables

Set the following optional variables to "latest" to work with the Docker image's latest settings. If a variable is not specified, the version 1.7 of the corresponding component is used by default.

Run the commands: 

```bash
export NEON_EVM_COMMIT=latest; export PROXY_COMMIT=latest; export FAUCET_COMMIT=latest
```

## Step 3: Run the Docker containers 

Use the docker compose file created in the Step 1 to pull and run the docker containers:

3.1 Pull the Docker images:

```bash
docker-compose -f /path/to/docker-compose.yml pull
```

3.2 Start the proxy with:

```bash
docker-compose -f /path/to/docker-compose.yml up
```


<Tabs>
  <TabItem value="View" label="Code" default>

> Let's check the status of our containers with: 
> 
> ```bash
> docker stats
> ```
>

</TabItem>
<TabItem value="Retrieve" label="Outcome" default>
  
<div className='neon-img-box-300' style={{textAlign: 'center', width: 900, display: 'block', margin: 'auto'}}>
<img src={stats} />
</div>

</TabItem>
</Tabs>


Congratulations, you are now running Neon EVM deployed to a single, local node of Solana.

:::tip

> When you are at the point where you are willing to lose your data, then free your disk space and close the instance by running:
> ```bash
> docker-compose -f /path/to/docker-compose.yml down
> ```
:::

## Step 4: Set up MetaMask wallet to run with the local proxy

Set up your MetaMask wallet with the proxy:

Tip: 
> Run nmap, or equivalent, to view the ports the services are running on:
> 
> ```bash
> nmap localhost
> ```
> The port 9090 is our proxy and 3333 is our faucet.

<Tabs>
  <TabItem value="View" label="4.1" default>

From your browser's MetaMask extension, set the localhost as a network within the MetaMask wallet, click: **Settings** > **Networks** > **Add a Network** > **Add a network manually**

</TabItem>
<TabItem value="Retrieve" label="Show" default>

<div className='neon-img-box-600' style={{textAlign: 'center', width: 600, display: 'block', margin: 'auto'}}>
<img src={network} />
</div>
</TabItem>
</Tabs>


<Tabs>
  <TabItem value="View" label="4.2" default>

4.2 Fill out the following fields:
- **Network name**: Neon Localhost
- **New RPC URL**: http://localhost:9090/solana
- **Chain ID**: 111
- **Currency symbol**: NEON

And click **Save**.

</TabItem>
<TabItem value="Retrieve" label="Show" default>

<div className='neon-img-box-600' style={{textAlign: 'center', width: 600, display: 'block', margin: 'auto'}}>
<img src={network2} />  
</div>

</TabItem>
</Tabs>


## Step 5: Use the faucet to populate your wallet with NEON tokens

5.1 Copy your account address from your MetaMask wallet and update the following script to use your address:

<!-- Consider adding this .sh file to the proxy-model repo, why we going to leave our reader to create a file when we can provide it? -->

file: drop_neons.sh

```bash
#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: drop_neons.sh <wallet-address>"
  exit 1
fi

/usr/bin/curl --location --request POST 'http://localhost:3333/request_neon' \
--header 'Content-Type: application/json' \
--data-raw '{
  "wallet": "'${1}'",
  "amount": 1000
}'
```

5.2 From your terminal, at the file location run `sh ./drop_neons.sh {wallet address}`.

<!-- May be necessary to #chmod +x drop_neons.sh on this file -->


## Gotchas

- It is recommended that you have a couple of terabytes of free space! Should you want to run your node with persistent data, the space requirements will grow.
- The MetaMask Wallet may not update automatically:

<Tabs>
<TabItem value="View" label="Reselect " default>
<b>Neon Localhost</b> to force a refresh after using the faucet
</TabItem>
<TabItem value="Retrieve" label="Show" default>
<div className='neon-img-box-600' style={{textAlign: 'center', width: 600, display: 'block', margin: 'auto'}}>
<img src={update} />  
</div>
</TabItem>
</Tabs> 

- It is only possible to set up the localhost network in the MetaMask wallet while the proxy service is running.
- If you are following best practice, and adding your [user to the `docker` group](https://docs.docker.com/engine/install/linux-postinstall/) to avoid running Docker as root or sudo, then restart to apply the update.

<!-- I did this on docker-compose 1.29.2 no problem -->

## What next?

Congratulations you can now deploy and test smart contracts on the NeonEVM. Consider:
- [Deploying a contract](../developing/deploy_facilities/using_remix) via the Remix IDE
- [Understanding how to configure your self-managed Proxy](enhanced.md#configuration)



<!--

What follows is the original page content -- not deleting as there are hints at environment variables that should be supported


*This guide sets you up with a functional, running neon-proxy on your local machine with `docker-compose` in a matter of minutes with minimal user input required.* 

## Operator requirements

### Hardware requirements

|Component|Requirement                           |
|-----|:-----------------------------------------|
|Operating System | Linux (Ubuntu/CentOS recommended) |
|CPU | 8 vCPU |
|RAM | 16 GB |
|Storage | 500 GB |

### Software requirements

Make sure the following components are **installed** on your device prior to proceeding:
* [Docker Engine](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/) > [v2.12.1](https://docs.docker.com/compose/release-notes/#2121)

## Install and run read-only proxy locally

This part consists of three components: `evm_loader`, `neon_test_invoke_program`, and `proxy`, each of which produces a Docker image of the same name.

### evm_loader

1. Clone the neon-evm GitHub repository
```bash
git clone https://github.com/neonlabsorg/neon-evm.git
```

2. Change directory into the neon-evm repository
```bash
cd neon-evm
```

3. Check out the v0.14.x Git branch
```bash
git checkout v0.14.x
```

4. Update the Git submodule 
```bash
git submodule update --init
```

5. Export Solana-specific environment variables
```bash
export SOLANA_REVISION=v1.11.10
export SOLANA_IMAGE=solanalabs/solana:v1.11.10
export REVISION=v0.14.1
```

6. Build the evm_loader Docker image
```bash
docker build --build-arg SOLANA_REVISION=$SOLANA_REVISION --build-arg SOLANA_IMAGE=$SOLANA_IMAGE --build-arg REVISION=$REVISION --tag neonlabsorg/evm_loader:v0.14.1 .
```

:::info
You can safely ignore errors like the following:
> ```Error: Function _ZN8evm_core15primitive_types4U51215overflowing_pow17hb39293b73e96c896E Stack offset of 4312 exceeded max offset of 4096 by 216 bytes, please minimize large stack variables```
:::


### neon_test_invoke_program
1. Clone the neon-test-invoke-program GitHub repository
```bash
git clone https://github.com/neonlabsorg/neon-test-invoke-program.git
```

2. Change directory into the neon-test-invoke-program repository
```bash
cd neon-test-invoke-program
```

3. Build the neon_test_invoke_program Docker image
```bash
docker build --tag neonlabsorg/neon_test_invoke_program:develop .
```

### proxy

1. Clone the proxy-model.py GitHub repository
```bash
git clone https://github.com/neonlabsorg/proxy-model.py.git
```

2. Change directory into the proxy-model.py repository
```bash
cd proxy-model.py
```

3. Export Neon proxy environment variables
```bash
export NEON_EVM_COMMIT=v0.14.1
export PROXY_REVISION=v0.14.5
export PROXY_LOG_CFG=log_cfg.json
```

4. Build the proxy Docker image
```bash
docker build --build-arg NEON_EVM_COMMIT=$NEON_EVM_COMMIT --build-arg PROXY_REVISION=$PROXY_REVISION --build-arg PROXY_LOG_CFG=$PROXY_LOG_CFG --tag neonlabsorg/proxy:v0.14.5 .
```

### Run Proxy in read-only mode
With the required Docker images built, you can now run `docker-compose` with `sudo` to run the proxy in read-only mode
```bash
sudo SOLANA_URL="https://api.devnet.solana.com" REVISION="v0.14.5" docker-compose -f docker-compose-operator-ro.yaml up -d
```
where:

* `SOLANA_URL` is your RPC endpoint of choice.
* `REVISION` is the version of choice or `"stable"` to use the stable version

<!-- retired to retire linked page
 and can be found in {the RPC endpoints table}(/docs/clusters/neon_proxy_rpc_endpoints.md)
* `REVISION` is the version of choice or `"stable"` to use the stable version -->

<!-- ### Database
The Docker Composer will use your local disk as storage for the proxy's PostgreSQL database:
```yaml
volumes:
    - db:/var/lib/postgresql/data
```

The `db` scheme is related to local driver from the Docker daemon:
```yaml
volumes:
  db:
    driver: local
```

### Environment variables
Some container environments need attention for production, such as:

```yaml
POSTGRES_DB: neon-db
POSTGRES_USER: neon-proxy
POSTGRES_PASSWORD: neon-proxy-pass
POSTGRES_HOST: postgres
```

For read-only mode,   ``` ENABLE_SEND_TX_API: "NO" ``` should stay as "NO" for correct usage. This is how application works without operator-keys.

#### PYTH_MAPPING_ACCOUNT

The `PYTH_MAPPING_ACCOUNT` environment variable follow the current structure from [the Pyth Network documentation](https://pyth.network/developers/accounts). For Neon's networks, its respective values are:

|Network|`PYTH_MAPPING_ACCOUNT`                           |
|-----|:-----------------------------------------|
|Devnet | BmA9Z6FjioHJPpjT39QazZyhDRUdZy2ezwx4GiDdE2u2 |
|Testnet | AFmdnt9ng1uVxqCmqwQJDAYC5cKTkw8gJKSM5PnzuF6z |
|mainnet-beta | AHtgzX45WTKfkPG53L6WYhGEXwQkN1BVknET3sVsLL8J |

#### EVM_LOADER

The `EVM_LOADER` environment variable's values are:

|Network|`EVM_LOADER`                         |
|-----|:-----------------------------------------|
|Devnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU |
|Testnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU |

### Execute the install script and monitor logs

Run the install script
```bash
./install.sh
```

In another terminal, check your containers' logs
```bash
$ docker logs -f proxy --tail 10
2022-11-25 12:07:19.294 I run-proxy.sh:3 1 Proxy:StartScript {} Start Proxy service
2022-11-25 12:07:19.296 I run-proxy.sh:5 1 Proxy:StartScript {} Init environment set
Config File: /root/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com 
WebSocket URL: ws:https://api.devnet.solana.com
Keypair Path: /root/.config/solana/id.json 
Commitment: confirmed 
2022-11-25 12:07:19.303 I run-proxy.sh:7 1 Proxy:StartScript {} run-proxy
```

Voila, the endpoint [http://127.0.0.1:9090/solana](http://127.0.0.1:9090/solana) can be now accessed with your local MetaMask for testing purposes.

-->
