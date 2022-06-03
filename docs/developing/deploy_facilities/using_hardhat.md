---
title: Using Hardhat
---

Hardhat is a development environment to compile, deploy, test, and debug Ethereum software. It helps developers manage and automate the recurring tasks that are inherent to the process of building smart contracts and dApps, as well as easily introduce more functionality around this workflow. This means compiling, running, and testing smart contracts at the very core.

The details of using the Hardhat framework will not be described here. You can find all necessary documentation by following [this link](https://hardhat.org/getting-started/#overview).

As Neon is an Ethereum-compatible virtual machine and RPC, which allows for easy migration of existing Hardhat projects. The only thing required is the correct **hardhat.config.js** file. The code below is an example of config-file content:

```js
require("@nomiclabs/hardhat-waffle");

const proxy_url = 'https://proxy.devnet.neonlabs.org/solana';
const network_id = 245022926;
const deployerPrivateKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxx'; // place your private key here (note that wallet must have non-zero balance of NEONs to pay fees)

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

## Example Hardhat Project

You can obtain an example Hardhat project from [here](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-hardhat).
