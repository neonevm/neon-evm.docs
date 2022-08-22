---
title: Using Truffle
---

*This page outlines the steps for deploying and testing contracts in the Neon EVM using the Truffle tool. Truffle can be useful for those involved in the development and maintenance of the Neon EVM.*

> **Note:** Ethereum contracts can also be successfully deployed in the Neon EVM using Remix in manual mode (see the [previous section](developing/deploy_facilities/using_remix.md)). However, since Remix does not have as many capabilities, Truffle is offered as a useful, more advanced alternative for those that need the additional functionality and flexibility.

The main goal in using Truffle is to make it easier for developers to deploy and debug contracts in Neon EVM.

With Truffle, you get:
  * Simple configuration parameter settings
  * An easy process of deploying and debugging contracts on the network
  * Automated deployment and running of tests

## Prerequisites
Before you start, make sure the following software is installed on your device:
  * `NodeJS v8.9.4` or later
  * `Web3 v1.2.0` or later

## Network Configurations
  * [Solana cluster](https://docs.solana.com/clusters) is accessed via a proxy.
  * Solana works in test mode and the proxy interacts with it through Neon EVM.

## How to Use Truffle

### Step 1: Installation

> **Note:** Although this tutorial uses the *Ubuntu* operating system, these instructions can be applied to other UNIX distros as well.  

#### Install Truffle

If Truffle is already installed on your device, you can skip this section and move on to the next one. For those just getting started, you need to go through this section.

> **Note:** This page is just a quickstart. To go into more detail, you can read the *[Truffle documentation](https://www.trufflesuite.com/docs/truffle/getting-started/installation)*.

Create a new directory for your Truffle project:
```sh
mkdir <project name>
cd <project name>
```

Install Truffle:
```sh
npm install truffle
```

Initialize the project directory by running the following command:
```sh
truffle init
```

Once this operation is completed, you will have a project structure with the following items:
  * `contracts/` — Directory containing Solidity contracts
  * `migrations/` — Directory for scriptable deployment files
  * `test/` — Directory containing test files for testing your Solidity contracts
  * `truffle-config.js` — Truffle configuration file

You can run `truffle compile`, `truffle migrate` and `truffle test` to compile your contracts, deploy them to the network, and run their associated unit tests, respectively.

#### Install the HDWalletProvider library

The HD Wallet-enabled Web3 provider `HDWalletProvider` is a standalone library. One of its functions is signing transactions with private keys. Since the Neon EVM proxy does not store private keys, it cannot sign transactions. Therefore, while debugging smart contracts, the `HDWalletProvider` library is used instead to sign transactions for addresses derived from a *12* or *24* word mnemonic.

By default, the vanilla Truffle installation does not provide the `HDWalletProvider` library. If, during the installation process, none of the applications required the `HDWalletProvider` library to be installed, you will need to install it separately by running the following command.

```console
npm install @truffle/hdwallet-provider
```

Refer to the [official npm package documentation](https://www.npmjs.com/package/@truffle/hdwallet-provider) for the full installation process.

### Step 2: Connect Truffle to a Proxy using the Configuration File
The configuration file is called `truffle-config.js` and is located at the root of your project directory. This file is a JavaScript file and can execute any code necessary to create your configuration. Its file schema, variables, and other documentation can be found on the [official Truffle Suite website](https://trufflesuite.com/docs/truffle/reference/configuration/). Please note that the deployer wallet address needs to have enough NEON tokens to cover the gas cost of the deployment. NEON tokens for Devnet can be obtained using the [NeonFaucet](developing/utilities/faucet.md).

The following is a full example of the `truffle-config.js` configuration file for connecting Truffle to a devnet-proxy using the one-way library on Node.js:

#### truffle-config.js
```js
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send

const provider = new Web3.providers.HttpProvider("https://devnet.neonevm.org");

const privateKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Specify your private key here

module.exports = {
  networks: {
    neonlabs: {
      provider: () => {
        return new HDWalletProvider(
          privateKey,
          provider,
        );
      },
      network_id: "*"
    }
  }
};
```

> **Note:** If both mnemonic and private keys are provided, the mnemonic takes precedence and is used instead.

To connect Truffle to a proxy on `node.js`, the `eth_accounts` method from the [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API) set is required. This method allows serving a list of *20* byte addresses owned by a client. Since the Neon EVM proxy does not support the `eth_accounts` method required to connect Truffle, the HDWalletProvider library is used to function as this method. The connection is configured in `truffle-config.js`.

The configuration file is publicly available, and therefore the `word mnemonic` and `private key` contained in the file are also publicly available. This makes it possible for the library to use this data. HDWalletProvider obtains the `word mnemonic` or `private key` from the configuration file and uses this data to sign transactions before sending them to the proxy.

This method of configuration is convenient for debug mode, but not suitable for work in real conditions. Since the development process uses "test" wallets, this data is not of any value.

> **Note:** It is strongly recommended to use Truffle in the Neon EVM only for developing or testing contracts.

### Step 3: Compile Contracts
All of your contracts are located in your project's `contracts/` directory. Before these contracts can be run, they must first be compiled. To compile a Truffle project, change to the root of the directory where the project is located and run the following command:
```sh
truffle compile
```
For the first run, all contracts will be compiled. During subsequent runs, only contracts that have changed since the last compilation will be compiled again.

If you want to re-compile all contracts, run the above command with the `--all` option:
```sh
truffle compile --all
```

### Step 4: Test Contracts
Make sure to test your code before you migrate it to the network. All test files should be located under the `test/` directory.

To run all tests, simply run:
```sh
truffle test
```

To run only one test file from the entire test suite or a specific file that is not in `test/`, you need to specify the full name of that file:
```sh
truffle test <./path/file.js>
```

The full list of options that you can use for testing can be found under the [truffle test](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test) command.

### Step 5: Running Migrations
Migrations are a set of managed deployment scripts used to deploy contracts to the network. These scripts, which are JavaScript files, should be contained in the project's `migrations/` directory.

To run migrations to deploy contracts, run the `truffle migrate` command. Make sure to specify the network to deploy to with the `--network` option. For example, to deploy contracts to the **neonlabs** network, described [earlier](using_truffle#truffle-configjs), run:
```sh
truffle migrate --network neonlabs
```

This will run all migrations located within the `migrations/` directory. If your migrations were previously run successfully, truffle migrate will start execution from the last migration that was run, running only newly created migrations. If no new migrations exist, truffle migrate won't perform any action.

If you need to run all migrations from the beginning, instead of running from the last completed migration, you can use the `--reset` option:
```sh
truffle migrate --reset --network neonlabs
```

The full list of options that you can use for migrations can be found in the [truffle migrate](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#migrate) section of the Truffle documentation.

## Example Project
An example Truffle project can be found [here](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-truffle).
