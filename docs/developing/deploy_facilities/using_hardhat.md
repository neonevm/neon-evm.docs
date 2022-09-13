---
title: Using Hardhat
---

Hardhat is a development environment used to compile, deploy, test, and debug Ethereum software. It helps developers manage and automate the recurring tasks that are inherent to the process of building smart contracts and launching dApps, as well as supporting various add-on functionality and features in order to streamline this workflow.

Details on how to use the Hardhat framework will not be described here. You can find all necessary information by reading the [Hardhat documentation](https://hardhat.org/getting-started/#overview).

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

## The Hardhat Configuration File
To deploy a contract to the Neon EVM with Hardhat, some Neon-specific information must be specified in a configuration file. This configuration file is called `hardhat.config.js` and is located at the root of your project directory. This file is a JavaScript file and can execute any code necessary to create your configuration. Its file schema, variables, and other documentation can be found on the [official Hardhat website](https://hardhat.org/hardhat-runner/docs/config). Please note that the deployer wallet address needs to have enough NEON tokens to cover the gas cost of the deployment. NEON tokens for Devnet can be obtained using the [NeonFaucet](developing/utilities/faucet.md).

The following is a full example, configured for the example below, of the `hardhat.config.js` configuration file for connecting Hardhat to a devnet-proxy using the one-way library on Node.js:

##### hardhat.config.js
```js
require("@nomiclabs/hardhat-waffle");

const proxy_url = 'https://devnet.neonevm.org';
const network_id = 245022926;

// Private keys for test accounts
// NOTE: Replace these placeholders with your own and make sure the accounts have non-zero NEON balances
const privateKeys = [
  "0xPLACEHOLDER1",
  "0xPLACEHOLDER2"
];

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'neonlabs',
  networks: {
    neonlabs: {
      url: proxy_url,
      accounts: privateKeys,
      network_id: network_id,
      chainId: network_id,
      allowUnlimitedContractSize: false,
      timeout: 1000000,
      isFork: true
    }
  }
};
```

The parameters for `module.exports` include:
* `solidity`: version of Solidity used
* `defaultNetwork`: 'neonlabs'
* `networks`:
  * `neonlabs`:
    * `url`: proxy URL
    * `accounts`: an array of deployer's private keys
    * `network_id`: the network's network ID
    * `chainId`: the network's chain ID

Note that `proxy_url`, `network_id`, and `chainId` can be retrieved from the RPC endpoints table and/or [chainlist.org](https://chainlist.org/).

## How to Use Hardhat: A Tutorial
This section will describe, step by step, how to deploy a simple ERC-20 Neon contract to Hardhat. The example is located in [this repository](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-hardhat).

> **Note:** Although this tutorial uses the *Ubuntu* operating system, these instructions can be applied to other UNIX distros as well.  

By the end of this tutorial, you will deploy a contract describing an ERC-20 token to the Neon Devnet. You will then test this contract by minting 10000 test tokens that are deposited to the first wallet specified in the configuration file (see above), and then transferred to the second wallet address.

### Step 1: Installation
> **Note:** This page is just a quickstart based on a specific example program. For more details on installing Hardhat, refer to the *[Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started#overview)*.

Using Git, clone the example Hardhat project from the remote repository and navigate to it:
```sh
git clone https://github.com/neonlabsorg/examples.git
cd examples/simple-erc20-hardhat
```

Then, run the following command:
```sh
npm install
```
This will install all the necessary packages to continue with the example. These packages include the `Hardhat` library.

If the above command results in an error, run:
```sh
npm cache clear --force
npm install
```

### Step 2: Set Up MetaMask Accounts
To interact with the soon-to-be-deployed contracts, you'll need to create two new accounts in MetaMask. Before you begin, make sure that MetaMask is connected to the Neon Devnet.

In MetaMask, create two new accounts. This can be done by clicking on your current account's icon in the top right of the MetaMask extension pop-up, and then clicking on 'Create an Account' in the drop-down menu that appears. Then, obtain some Devnet NEON tokens for these accounts (up to 100 NEON per account) using the [NeonFaucet](../utilities/faucet).

Finally, copy the new accounts' private keys and paste them into the `hardhat.config.js` file described above, replacing the placeholder text in lines 11 and 12 of that file. To obtain the private keys, click on the three vertical dots to the right of your currently displayed account name and wallet address. In this drop-down menu, click on 'Account Details', then on 'Export Private Key', and enter your password and click 'Confirm' to get access to the private key for that account.

> **Note:** When adding the private keys to the configuration file, make sure to add the prefix **0x** to the key obtained via MetaMask.

### Step 3: Compile Contracts
All of the contracts are located in the project's `contracts/` directory. Before these contracts can be run, they must first be compiled. To compile the project's contracts, run the following command:
```sh
./node_modules/.bin/hardhat compile
```

After running this step, you should see output similar to the following:
```
Compiled 2 Solidity files successfully
```

### Step 4: Run Tests
Make sure to test your code before you migrate it to the network. All test files should be located under the `test/` directory.

To run all tests, simply run the command below:
```sh
./node_modules/.bin/hardhat test
```

This command compiles all the contracts in the `contracts/`, deploys them to the Neon Devnet, and runs all the tests in the `test/` directory. The output should look something like this:
```
  Testing TestERC20 contract
    ✔ should successfully mint 10000 ERC20 in the first account (15967ms)
    ✔ should transfer token correctly (31327ms)


  2 passing (53s)
```

### Step 5: Deploy Contracts
To deploy the project's contracts, simply run the command below to run the deployment script in the `scripts/` directory:
```sh
./node_modules/.bin/hardhat run ./scripts/deploy.js
```

After running this command, you should see console output similar to the following:
```
Deploying contracts with the account: 0xf71c4DACa893E5333982e2956C5ED9B648818376
Contract address is:  0x49DCDEc367bba4271876259AE473890aa5AABc2e
Minting  100000000000  tokens...
```

### Step 6: Connect Project to MetaMask
To import your project as an asset in MetaMask, follow the instructions [here](https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-add-unlisted-tokens-custom-tokens-in-MetaMask#h_01FWH492CHY60HWPC28RW0872H) and use the contract address from the previous step as the 'Token Contract Address' in MetaMask.

Once you complete this final step, you will be able to see your new ERC-20 assets in the MetaMask profiles of the new test accounts.