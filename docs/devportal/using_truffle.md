# Debugging Contracts via Truffle

*This page outlines a methodology for deploying and testing contracts in Neon EVM using the Truffle tool. This technique can be useful for personnel involved in the development and maintenance of Neon EVM.*

It should be noted that Ethereum contracts can also be successfully deployed in Neon EVM using Remix in manual mode. Since Remix has not so many capabilities, it turned out to be not very convenient in software development, and therefore we provide developers a more advanced methodology using Truffle.

## The Goal
Our main goal with Truffle is to make it easier for developers to deploy and debug contacts in Neon EVM.

With Truffle, you get:
  * Simple setting of configuration parameters.
  * An easy process of deploying and debugging contacts in the network.
  * Automated deploying and running tests.

## Installation

### Requirements for your device
The following softwares must be installed on your device:
  * NodeJS v8.9.4 or later
  * Web3 v1.2.0 or later

> **Note:** Although this tutorial uses the Ubuntu platform, the instructions provided can be applied to other Linux platforms.

### Installation of Truffle

If Truffle is already installed on your device, you can skip this section and move on to the next one. For those just getting started, you need to go through this section.

> **Note:** This page is just a quickstart. To go into much detail here, you can see the *[Truffle documentation](https://www.trufflesuite.com/docs/truffle/getting-started/installation)*.

Create a new directory for your Truffle project:
```sh
$ mkdir <project name>
$ cd <project name>
```

Install Truffle:
```sh
$ npm install -g truffle
```

Initialize the project directory by running the following command:
```sh
$ truffle init
```

Once this operation is completed, you will have a project structure with the following items:
  * `contracts/` — Directory for Solidity contracts.
  * `migrations/` — Directory for scriptable deployment files.
  * `test/` — Directory for test files for testing your contracts.
  * `truffle-config.js` — Truffle configuration file.

You can run `truffle compile`, `truffle migrate` and `truffle test` to compile your contracts, deploy them to the network, and run their associated unit tests.

### Installation of the HDWalletProvider library

HD Wallet-enabled Web3 provider (HDWalletProvider) is a standalone library. One of its functions is signing transactions with private keys. Since the Neon EVM proxy does not store private keys, it cannot sign transactions. Therefore, during debugging contracts, the HDWalletProvider library is used to sign transactions for addresses derived from a *12* or *24* word mnemonic.

By default, the Truffle installation does not provide the HDWalletProvider library. If during the installation of Truffle none of the applications also required the HDWalletProvider library to be installed, you need to install it separately.

Install the HDWalletProvider library:
```sh
$ npm install @truffle/hdwallet-provider
```

> **Note:** To go into much detail here, you can see the *[official documentation](https://www.npmjs.com/package/@truffle/hdwallet-provider)*.

## Connecting Truffle to a Proxy

To connect Truffle to a proxy on `node.js`, the `eth_accounts` method from the [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API) set is required. This method allows serving a list of *20* Bytes-addresses owned by a client. Since the Neon EVM proxy does not support the `eth_accounts` method required to connect Truffle , the HDWalletProvider library is used to function as this method. The connection is configured in `truffle-config.js`.

The configuration file is publicly available and therefore, `word mnemonic` and `private key` contained in the file are also publicly available. This makes it possible to use this data by the library. HDWalletProvider obtains `word mnemonic` or `private key` from the configuration file and uses this data to sign transactions before sending them to the proxy.

This method of configuration is convenient for debug mode, but not suitable for work in real conditions. Since the development process uses "test" wallets, this data is not of any value.

> **Note:** We strongly recommend to use Truffle in Neon EVM only for developing or testing contracts.

## Configuration
Your configuration file is called `truffle-config.js` and is located at the root of your project directory. This file is a JavaScript file and can execute any code necessary to create your configuration.

## Compiling Contracts
All of your contracts are located in your project's `contracts/` directory. To compile a Truffle project, change to the root of the directory where the project is located and run the following command:
```sh
$ truffle compile
```

Upon first run, all contracts will be compiled. Upon subsequent runs, only those contracts will be compiled that have changed since the last compilation.

If you want to re-compile all contracts, run the above command with the `--all` option:
```sh
$ truffle compile --all
```

## Running Migrations
Migration is used to deploy your contracts to the network. This operation is performed using JavaScript files contained in the `migration/` directory. Migrations are simply a set of managed deployment scripts.

Run migrations to deploy contracts:
```sh
$ truffle migrate
```
This will run all migrations located within the `migrations/` directory. If your migrations were previously run successfully, truffle migrate will start execution from the last migration that was run, running only newly created migrations. If no new migrations exist, truffle migrate won't perform any action.

If you need to run all migrations from the beginning, instead of running from the last completed migration, you can use the `--reset` option:
```sh
$ truffle migrate --reset
```

The full set of options that you can use during running migrations are listed in the page with [truffle migrate](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#migrate) command.

## Testing Contracts
All test files should be located in the `test/` directory.

To run all tests by default, simply run:
```sh
$ truffle test
```

To run only one file from the entire test suite or a specific file that is not in `test/`, you need to specify the full name of that file:
```sh
$ truffle test <./path/file.js>
```

The full set of options that you can use during testing are listed in the page with [truffle test](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test) command.


## Example of configuration file settings
The example of the configuration file for connecting Truffle to a proxy using the one-way library on Node.js:
```js
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const provider = new Web3.providers.HttpProvider("http://localhost:9090/solana");

const privateKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Specify your private key here

module.exports = {
  networks: {
    solana: {
      provider: () => {
        return new HDWalletProvider(
          privateKey,
          provider,
        );
      },
      from: "0x1beb0aEb41AcA04467BF4FA9913a41188FF9C082",
      network_id: "*",
      gas: 3000000,
      gasPrice: 1000000000,
    }
  }
};
```

> **Note:** If both mnemonic and private keys are provided, the mnemonic is used.
