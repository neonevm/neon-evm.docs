---
title: Using Hardhat
---

Hardhat is a development environment used to compile, deploy, test, and debug Ethereum software. It helps developers manage and automate the recurring tasks that are inherent to the process of building smart contracts and launching dApps, as well as supporting various add-on functionality and features in order to streamline this workflow.

Details on how to use the Hardhat framework will not be enumerated here. You can find all necessary information by reading the [Hardhat documentation](https://hardhat.org/getting-started/#overview).

## Prerequisites
Before you start, make sure of the following software is installed on your device:
  * `NodeJS v8.9.4` or later
  * `Web3 v1.2.0` or later

## Network Configurations
  * [Solana cluster](https://docs.solana.com/clusters) is accessed via a proxy.
  * Solana works in test mode and the proxy interacts with it through Neon EVM.

## Hardhat Configuration File for Neon

Since Neon is an Ethereum-compatible virtual machine and RPC, migration of existing Hardhat projects onto Neon is easy and seamless. The only thing required is a correct **hardhat.config.js** file. See below for an example of a configuration file:

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

* `solidity`: version of Solidity used
* `defaultNetwork`: 'neonlabs'
* `networks`:
  * `neonlabs`:
    * `url`: proxy URL
    * `accounts`: an array of deployer's private keys
    * `network_id`: the network's network ID
    * `chainId`: the network's chain ID

Note that `proxy_url`, `network_id`, and `chainId` can be retrieved from the RPC endpoints table and/or chainlist.org.

## Hardhat Neon Examples

You can find example Hardhat projects [here](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-hardhat).
