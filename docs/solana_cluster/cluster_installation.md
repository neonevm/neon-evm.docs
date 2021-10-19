# Installation and setup

*This guide describes how to install, configure and test the local Solana cluster with Neon EVM on-board. It helps new developers to create their own environment and run Ethereum programs, wrapped into Neon EVM. All you need is to follow this guide step by step.*

The [Neon EVM](https://neon-labs.org/) is a solution that performs transaction execution outside layer 1. The development process can be run on any modern Linux or Mac system, though this document is based on Ubuntu 20.04 experience.

## Prerequisites

* [Docker](https://www.docker.com/)
* A Chromium-based browser for [Metamask](https://metamask.io/) and [Remix](https://remix.ethereum.org/)
* [npm CLI](https://www.npmjs.com/)

## Setting up the Solana Cluster

The next step is making Solana Validator node working from the docker container:

```sh
$ docker run -p 8899:8899 -p 8900:8900 -p 8001:8001 -p 8000-8009:8000-8009/udp -ti -e RUST_LOG=solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=debug,solana_bpf_loader=debug,solana_rbpf=debug -e NDEBUG=1 --name=solana neonlabsorg/solana:stable-testnet | grep -v 'Program Vote111111111111111111111111111111111111111'
```

## Starting Neon EVM endpoint

The Neon EVM endpoint enables [Metamask](https://metamask.io/) to work with Solana seamlessly. You should issue the following command in a new terminal window:

```sh
 $ docker run --rm -ti --network=host -e CONFIG=local -e EXTRA_GAS=10000 --name=proxy neonlabsorg/proxy:latest
```

## Remix and Metamask with Neon EVM

Setup the "Metamask" Chromium extension to connect to the proxy via Custom RPC at `http://localhost:9090/solana`. The following image describes how to set up the local Solana connection:  

<div style={{textAlign: 'center'}}>  

![](./img/cluster-install-1.png) 

</div>

Open Remix (also in Chromium) and select `Injected Web3` environment. You can deploy EVM-wrapped smart contracts on Solana and invoke instructions:  

<div style={{textAlign: 'center'}}>  

![](./img/cluster-install-2.png) 

</div>



## Truffle suite with Neon EVM

Truffle is a popular platform to deploy and test solidity programs. This section is to check Neon EVM and truffle suite compatibility. 

In the new terminal, create a truffle project and deploy contracts into EVM:

```sh
$ sudo npm install -g truffle
$ mkdir myproject && cd myproject
$ truffle init
$ npm install web3 @truffle/hdwallet-provider
```

### Common truffle settings

Put your `truffle-config.js` into the truffle root:

```sh
$ echo 'const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const provider = new Web3.providers.HttpProvider("http://localhost:9090/solana");

const privateKeys = ["288223d97bb45b3f623ca00396c7b66d6867fc622e53b87e16020472203bf4eb"];

module.exports = {
  networks: {
    solana: {
      provider: () => {
        return new HDWalletProvider(
          privateKeys,
          provider
        );
      },
      from: "0xB50F582f55EA9B1130b7fB8b1464Df6c897c2502",
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

### Contract creating

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

### Migration

The following commands are to deploy `Storage` contract onto the local blockchain:

```sh
$ echo 'const Storage = artifacts.require("Storage");

module.exports = function (deployer) {
    deployer.deploy(Storage);
}' > migrations/2_storage.js
$ truffle migrate --network solana
```

### Testing

You can now start testing `Storage` invocations with truffle facility:

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

### Possible problems

If for some reasons you remove the Solana container and run it again then all related accounts, stored in foreign systems, get invalid from that moment. That's why you need to re-run proxy container and reset the state of Metamask and truffle as well, to make all relations consistent.

To reset the metamask state, follow the steps `Settings`, `Advanced`, `Reset Account`, .

The truffle state can be reset by redeploying in the following way: 

```sh
$ truffle migrate --network solana --reset
```

---

*Welcome to deploy your solidity programs on [Solana](https://solana.com) using [Neon EVM](https://neon-labs.org/)*.

