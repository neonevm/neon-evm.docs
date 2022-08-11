---
title: Using Hardhat
---

Hardhat is a development environment used to compile, deploy, test, and debug Ethereum software. It helps developers manage and automate the recurring tasks that are inherent to the process of building smart contracts and launching dApps, as well as supporting various add-on functionality and features in order to streamline this workflow.

Details on how to use the Hardhat framework will not be described here. You can find all necessary information by reading the [Hardhat documentation](https://hardhat.org/getting-started/#overview).

## Prerequisites
Before you start, make sure of the following software is installed on your device:
  * `NodeJS v8.9.4` or later
  * `Web3 v1.2.0` or later

## Network Configurations
  * [Solana cluster](https://docs.solana.com/clusters) is accessed via a proxy.
  * Solana works in test mode and the proxy interacts with it through Neon EVM.

## How to Use Hardhat

### Step 1: Install Hardhat
To install Hardhat, simply run the following command:

```bash
npm install --save-dev hardhat
```

### Step 2: Create a Project
A Hardhat project on Neon can either be imported from an existing Hardhat project elsewhere, or created based on Hardhat's sample project. See below for descriptions of both options.

#### Option A: Import an Existing Project
Since Neon is an Ethereum-compatible virtual machine and RPC, migration of existing Hardhat projects onto Neon is easy and seamless. The only thing required is a correct **hardhat.config.js** file. To begin, import your project files into the project folder, and then add the following information to the configuration file:

##### hardhat.config.js
```js
require("@nomiclabs/hardhat-waffle");

const proxy_url = 'https://proxy.devnet.neonlabs.org/solana';
const network_id = 245022926;
const deployerPrivateKey = 'PLACE_YOUR_PRIVATE_KEY_HERE'; // place your private key here (Note: the corresponding wallet must have a non-zero balance of NEON tokens in order to pay for gas fees. Devnet NEON tokens can be obtained for free at https://neonfaucet.org/)

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: 'neonlabs',
  networks: {
    neonlabs: {
      url: proxy_url,
      accounts: [deployerPrivateKey],
      network_id: network_id,
      chainId: network_id,
      gas: 3000000,
      gasPrice: 1000000000,
      blockGasLimit: 10000000,
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

#### Option B: Create a New Project
Creating a sample project is done by running the following command:

```bash
npx hardhat
```

This will result in the following output:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.9.9 👷‍

? What do you want to do? …
❯ Create a JavaScript project
  Create a TypeScript project
  Create an empty hardhat.config.js
  Quit
```

To create a default project, select `Create a JavaScript project` or `Create a TypeScript project`, depending on what kind of project you need. These options will create some folders for the projects contracts (including a sample contract), tests, and scripts. They will also create a default hardhat.config.js file, which can be updated to include the information shown [above](using_hardhat#hardhatconfigjs).

To start with an empty project folder, select the `Create an empty hardhat.config.js` option, which will create only an empty hardhat.config.js file. This file can be replaced with the configuration file shown [above](using_hardhat#hardhatconfigjs).

### Step 3: Compilation
To compile your project, simple run:

```bash
npx hardhat compile
```

## Example Project
An example Hardhat project can be found [here](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-hardhat).
