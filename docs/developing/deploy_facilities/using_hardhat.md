---
title: "Configure Hardhat"
proofedDate: 20231116
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

This page details setting up a Hardhat configuration file. 

## Introduction

Hardhat is a development environment used to compile, deploy, test, and debug Ethereum software. It helps developers manage and automate the recurring tasks inherent to the process of building smart contracts and launching dApps, as well as supporting various add-on features that streamline this workflow.

The Hardhat framework isn't described here; find that in the [Hardhat documentation](https://hardhat.org/getting-started/#overview). This tutorial is based on an [example in GitHub](/docs/developing/deploy_facilities/using_hardhat).

## Prerequisites

Before you start, make sure the following software is installed on your device:
-  `NodeJS v8.9.4` or later
- `Web3 v1.2.0` or later[
- An EVM-compatible wallet such as [MetaMask](wallet/metamask_setup.md#installing-metamask):
  - Configured for a [Neon EVM network](/docs/developing/connect_rpc#connect-via-chainlist)
  - Balance to cover gas fees

## Network configuration

- [Solana cluster](https://docs.solana.com/clusters) is accessed via a proxy.
- Solana works in test mode and the proxy interacts with it through Neon EVM.

## The Hardhat configuration file

To deploy a contract to Neon EVM with Hardhat, some Neon-specific information must be configured. The configuration file is called `hardhat.config.js` and is located at the root of your project directory. 

This file is a JavaScript file and can execute any code necessary to create your configuration. Its file schema, variables, and other documentation can be found on the [official Hardhat website](https://hardhat.org/hardhat-runner/docs/config). 

:::info
The deployer wallet address needs to have enough tokens to cover the gas cost of the deployment. 

- [Get Devnet NEON](https://neonfaucet.org/)
:::

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