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

Also make sure that the following is true:
  * MetaMask is installed on your device. To install MetaMask, follow [this guide](wallet/metamask_setup.md#installing-metamask). 
  * MetaMask is configured for the Neon EVM.

## Network Configurations
  * [Solana cluster](https://docs.solana.com/clusters) is accessed via a proxy.
  * Solana works in test mode and the proxy interacts with it through Neon EVM.

## The Truffle Configuration File
To deploy a contract to the Neon EVM with Truffle, some Neon-specific information must be specified in a configuration file. This configuration file is called `truffle-config.js` and is located at the root of your project directory. This file is a JavaScript file and can execute any code necessary to create your configuration. Its file schema, variables, and other documentation can be found on the [official Truffle Suite website](https://trufflesuite.com/docs/truffle/reference/configuration/). Please note that the deployer wallet address needs to have enough NEON tokens to cover the gas cost of the deployment. NEON tokens for Devnet can be obtained using the [NeonFaucet](developing/utilities/faucet.md).

The following is a full example, configured for the example below, of the `truffle-config.js` configuration file for connecting Truffle to a devnet-proxy using the one-way library on Node.js:

#### truffle-config.js
```js
const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");

Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send

const provider = new Web3.providers.HttpProvider("https://devnet.neonevm.org");

// Private keys for test accounts
// NOTE: Replace these placeholders with your own and make sure the accounts have non-zero NEON balances
const privateKeys = [
  "0xPLACEHOLDER1",
  "0xPLACEHOLDER2"
];

module.exports = {
  networks: {
    neonlabs: {
      provider: () => {
        return new HDWalletProvider(
          privateKeys,
          provider,
        );
      },
      network_id: "*"
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
```

> **Note:** If both mnemonic and private keys are provided, the mnemonic takes precedence and is used instead.

To connect Truffle to a proxy on `node.js`, the `eth_accounts` method from the [Ethereum JSON RPC API](https://eth.wiki/json-rpc/API) set is required. This method allows serving a list of *20* byte addresses owned by a client. Since the Neon EVM proxy does not support the `eth_accounts` method required to connect Truffle, the HDWalletProvider library is used to function as this method. The connection is configured in `truffle-config.js`.

The configuration file is publicly available, and therefore the `word mnemonic` and `private key` contained in the file are also publicly available. This makes it possible for the library to use this data. HDWalletProvider obtains the `word mnemonic` or `private key` from the configuration file and uses this data to sign transactions before sending them to the proxy. Due to this potential vulnerability, Truffle deployment should only be used with test wallets.

> **Note:** Due to the public nature of the private key in this file, it is strongly recommended to use Truffle in the Neon EVM only for developing or testing contracts.

## How to Use Truffle: A Tutorial
This section will describe, step by step, how to deploy a simple ERC-20 Neon contract to Truffle. The example is located in [this repository](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-truffle).

> **Note:** Although this tutorial uses the *Ubuntu* operating system, these instructions can be applied to other UNIX distros as well.  

By the end of this tutorial, you will deploy a contract describing an ERC-20 token to the Neon Devnet, and subsequently mint 1 test token that is deposited to the first wallet specified in the configuration file (see above).

### Step 1: Installation
> **Note:** This page is just a quickstart based on a specific example program. For more details on installing Truffle, refer to the *[Truffle documentation](https://www.trufflesuite.com/docs/truffle/getting-started/installation)*.

Using Git, clone the example Truffle project from the remote repository and navigate to it:
```sh
git clone https://github.com/neonlabsorg/examples.git
cd examples/simple-erc20-truffle
```

Then, run the following command:
```sh
npm install
```
This will install all the necessary packages to continue with the example. These packages include the `Truffle` and `HDWalletProvider` libraries.

The `HDWalletProvider` is important because one of its functions is signing transactions with private keys. Since the Neon EVM proxy does not store private keys, it cannot sign transactions. Therefore, while debugging smart contracts, the `HDWalletProvider` library is used instead to sign transactions for addresses derived from a *12* or *24* word mnemonic.

If the above command results in an error, run:
```sh
npm cache clear --force
npm install
```

### Step 2: Set Up MetaMask Accounts
To interact with the soon-to-be-deployed contracts, you'll need to create two new accounts in MetaMask. Before you begin, make sure that MetaMask is connected to the Neon Devnet.

In MetaMask, create two new accounts. This can be done by clicking on your current account's icon in the top right of the MetaMask extension pop-up, and then clicking on 'Create an Account' in the drop-down menu that appears. Then, obtain some Devnet NEON tokens for these accounts (up to 100 NEON per account) using the [NeonFaucet](../utilities/faucet).

Finally, copy the new accounts' private keys and paste them into the `truffle-config.js` file described above, replacing the placeholder text in lines 11 and 12 of that file. To obtain the private keys, click on the three vertical dots to the right of your currently displayed account name and wallet address. In this drop-down menu, click on 'Account Details', then on 'Export Private Key', and enter your password and click 'Confirm' to get access to the private key for that account.

> **Note:** When adding the private keys to the configuration file, make sure to add the prefix **0x** to the key obtained via MetaMask.

### Step 3: Compile Contracts
All of the contracts are located in the project's `contracts/` directory. Before these contracts can be run, they must first be compiled. To compile the project's contracts, run the following command:
```sh
./node_modules/.bin/truffle compile
```

After running this step, you should see output similar to the following:
```
Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
✔ Downloading compiler. Attempt #1.
✔ Fetching solc version list from solc-bin. Attempt #1
> Compiling ./contracts/ERC20.sol
> Compiling ./contracts/IERC20.sol
> Artifacts written to /tmp/test--947955-ciBGiafT1chM
> Compiled successfully using:
   - solc: 0.8.16+commit.07a7930e.Emscripten.clang
```

For the first run, all contracts will be compiled. During subsequent runs, only contracts that have changed since the last compilation will be compiled again.

If you want to re-compile all contracts, run the above command with the `--all` option:
```sh
./node_modules/.bin/truffle compile --all
```

### Step 4: Run Tests
Make sure to test your code before you migrate it to the network. All test files should be located under the `test/` directory.

To run all tests, simply run the command below. Make sure to specify the **neonlabs** network to deploy to with the `--network` option.
```sh
./node_modules/.bin/truffle test --network neonlabs
```

This command compiles all the contracts in the `contracts/`, deploys them to the Neon Devnet, and runs all the tests in the `test/` directory. The output should look something like this:
```
Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
✔ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.


  Contract: TestERC20
    ✓ should successfully mint 10000 ERC20 in the first account (5288ms)
    ✓ should transfer token correctly (7335ms)


  2 passing (13s)
```

The full list of options that you can use for testing can be found under the [truffle test](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#test) command.

### Step 5: Run Migrations
Migrations are a set of managed deployment scripts used to deploy contracts to the network. These scripts, which are JavaScript files, are contained in the project's `migrations/` directory.

To run migrations to deploy the contracts, run the `migrate` command. Make sure to specify the **neonlabs** network to deploy to with the `--network` option.
```sh
./node_modules/.bin/truffle migrate --network neonlabs
```

This will run all migrations located within the `migrations/` directory. If your migrations were previously run successfully, truffle migrate will start execution from the last migration that was run, running only newly created migrations. If no new migrations exist, truffle migrate won't perform any action.

After running this command, you should see console output similar to the following:
```
Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
✔ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'neonlabs'
> Network id:      245022926
> Block gas limit: 260057650590124 (0xec8563e271ac)


1_erc20.js
==========

   Deploying 'ERC20'
   -----------------
   > transaction hash:    0x54db68667335ab2c6e8aeee1080b30ac39209186e2f0c12dba97b7130d923382
   > Blocks: 11           Seconds: 4
   > contract address:    0x7364DA3a4989898Ac2d466611Ce4b957885DF7B8
   > block number:        158638454
   > block timestamp:     1661872308
   > account:             0xf71c4DACa893E5333982e2956C5ED9B648818376
   > balance:             8.205758048453800748
   > gas used:            43936740 (0x29e6be4)
   > gas price:           137.5017384 gwei
   > value sent:          0 ETH
   > total cost:          6.041378129628816 ETH

   > Saving artifacts
   -------------------------------------
   > Total cost:     6.041378129628816 ETH

Summary
=======
> Total deployments:   1
> Final cost:          6.041378129628816 ETH
```

If you need to run all migrations from the beginning, instead of running from the last completed migration, you can use the `--reset` option:
```sh
./node_modules/.bin/truffle migrate --reset --network neonlabs
```

The full list of options that you can use for migrations can be found in the [truffle migrate](https://www.trufflesuite.com/docs/truffle/reference/truffle-commands#migrate) section of the Truffle documentation.

### Step 6: Connect Project to MetaMask
To import your project as an asset in MetaMask, follow the instructions [here](https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-add-unlisted-tokens-custom-tokens-in-MetaMask#h_01FWH492CHY60HWPC28RW0872H) and use the contract address from the previous step as the 'Token Contract Address' in MetaMask.

Once you complete this final step, you will be able to see your new ERC-20 assets in the MetaMask profiles of the new test accounts.