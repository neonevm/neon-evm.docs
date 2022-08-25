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

## How to Use Hardhat

### Step 1: Install Hardhat
To install Hardhat, simply run the following command:

```bash
npm install --save-dev hardhat
```

### Step 2: Create a Project
A Hardhat project on Neon can either be imported from an existing Hardhat project elsewhere, or created based on Hardhat's sample project. See below for descriptions of both options.

#### Option A: Import an Existing Project
Since Neon is an Ethereum-compatible virtual machine and RPC, migration of existing Hardhat projects onto Neon is easy and seamless. The only thing required is a correct **hardhat.config.js** file. In addition, the deployer wallet address needs to have enough NEON tokens to cover the gas cost of the deployment. NEON tokens for Devnet can be obtained using the [NeonFaucet](developing/utilities/faucet.md).

To begin, import your project files into the project folder, and then add the following information to the **hardhat.config.js** configuration file:

##### hardhat.config.js
```js
require("@nomiclabs/hardhat-waffle");

const proxy_url = 'https://devnet.neonevm.org';
const network_id = 245022926;
const deployerPrivateKey = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // Specify your private key here

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: 'neonlabs',
  networks: {
    neonlabs: {
      url: proxy_url,
      accounts: [deployerPrivateKey],
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

### Optional Step 2.5: Hello World Example Project
This step will detail how to launch an example 'Hello World' to Neon with Hardhat. If you have a different project in mind, simply continue to Step 3. Make sure you chose Option B and created a JavaScript Project in Step 2 before completing this step.

In the `contracts/` folder, replace any existing files with the following file and save it as `helloWorld.sol`:

#### helloWorld.sol
```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract helloWorld {
  string public text = "Hello World!";

  function callHelloWorld() public view returns (string memory) {
    return text;
  }
}
```

In the `scripts/` folder, replace the content in `deploy.js` with the following:

#### deploy.js
```
const hre = require("hardhat");

async function main() {
  const HelloWorld = await hre.ethers.getContractFactory("helloWorld");
  await HelloWorld.deploy();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Step 3: Compilation
To compile your project, simply run:

```bash
npx hardhat compile
```

### Step 4: Deploy Contract
To deploy your JavaScript project, run the following command from the project folder:

```bash
npx hardhat run ./scripts/deploy.js
```

If your project is written in TypeScript, run the following command instead to deploy:

```bash
npx hardhat run ./scripts/deploy.ts
```

Running the relevant command should result in output similar to the following:

```
Deploying contracts with the account: 0xcB31Ce6E4Ff9E2C8f6CbB7044dd9529263a846De

Contract address is: 0x66eCCEe29F6FbDb055379A557f8fb7716964dF1a

Minting 100000000000 tokens...

Balance of deployer is: BigNumber { value: "100000000000" }
```

### Step 5: Connect Project to MetaMask
To import your project as an asset in MetaMask, follow the instructions [here](https://metamask.zendesk.com/hc/en-us/articles/360015489031-How-to-add-unlisted-tokens-custom-tokens-in-MetaMask#h_01FWH492CHY60HWPC28RW0872H) and use the contract address from the previous step as the 'Token Contract Address' in MetaMask.

## Example Project
An example Hardhat project can be found [here](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-hardhat).
