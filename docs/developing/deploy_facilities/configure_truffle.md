---
title: "Configure Truffle"
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

The main goal in using Truffle is to make it easier for developers to deploy and debug contracts in Neon EVM.

With Truffle, you get:
  * Simple configuration parameter settings
  * An easy process of deploying and debugging contracts on the network
  * Automated deployment and running of tests

For a tutorial on how to use Truffle to deploy on the Neon EVM, see [here](/docs/developing/deploy_facilities/using_truffle).

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