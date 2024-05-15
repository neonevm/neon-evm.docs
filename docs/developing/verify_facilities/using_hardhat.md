---
title: Verify smart contracts with Hardhat
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: This is another test
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

_This page outlines the steps for verifying contracts on Neon EVM using the Hardhat tool._

Before beginning the tutorial below, make sure that you have properly [configured Hardhat](/docs/developing/deploy_facilities/configure_hardhat) for Neon EVM.

This tutorial is based on the example located in [this repository](https://github.com/neonlabsorg/neon-tutorials/tree/main/hardhat).

By the end of this tutorial, you will learn to verify a contract that deploys an ERC-20 token to Neon EVM Devnet on Neonscan and Blockscout explorers.

## Step 1: Deploy the contract

To deploy a contract, please follow this page describing [how to deploy contracts with Hardhat](https://docs.neonevm.org/docs/developing/deploy_facilities/using_hardhat).

## Step 2: Verify the deployed contract

To verify the deployed contract from the above step, let's take an example of a deployed contract with address `0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08` on Neon EVM Devnet.

<Tabs>
<TabItem value="NeonScan" label="NeonScan">

1. Add these lines to `hardhat.config.js` -

```sh
etherscan: {
    apiKey: {
      neonevm: "test",
    },
    customChains: [
      {
        network: "neonevm",
        chainId: 245022926,
        urls: {
          apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
          browserURL: "https://devnet.neonscan.org",
        },
      },
      {
        network: "neonevm",
        chainId: 245022934,
        urls: {
          apiURL: "https://api.neonscan.org/hardhat/verify",
          browserURL: "https://neonscan.org",
        },
      },
    ],
},
```

2. After running the following command to verify -

```sh
npx hardhat verify --network neondevnet 0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08
```

The output should look like this -

```sh
Successfully submitted source code for contract
contracts/TestERC20/TestERC20.sol:TestERC20Hardhat at 0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08
for verification on the block explorer. Waiting for verification result...

Successfully verified contract TestERC20Hardhat on the block explorer.
https://devnet.neonscan.org/address/0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08#code
```

The verified contract source code can be found here https://devnet.neonscan.org/address/0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08#contract.

</TabItem>

<TabItem value="Blockscout" label="Blockscout">

1. Add these lines to `hardhat.config.js` -

```sh
etherscan: {
    apiKey: {
      neonevm: "test",
    },
    customChains: [
      {
        network: "neonevm",
        chainId: 245022926,
        urls: {
          apiURL: "https://neon-devnet.blockscout.com/api",
          browserURL: "https://neon-devnet.blockscout.com",
        },
      },
      {
        network: "neonevm",
        chainId: 245022934,
        urls: {
          apiURL: "https://neon.blockscout.com/api",
          browserURL: "https://neon.blockscout.com",
        },
      },
    ],
},
```

2. After running the following command to verify -

```sh
npx hardhat verify --network neondevnet 0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08
```

The output should look like this -

```sh
Successfully submitted source code for contract
contracts/TestERC20/TestERC20.sol:TestERC20Hardhat at 0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08
for verification on the block explorer. Waiting for verification result...

Successfully verified contract TestERC20Hardhat on the block explorer.
https://neon-devnet.blockscout.com/address/0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08#code
```

The verified contract source code can be found here https://neon-devnet.blockscout.com/address/0xf4f09428C61c5F91c6F6B9a1A422778F0473eA08?tab=contract.

</TabItem>
</Tabs>

:::important
If the deployed contract consists of constructor arguments to be passed, then the command for verification should be -

```sh
npx hardhat verify --network neondevnet <CONTRACT_ADDRESS> <ARGUMENT_1> <ARGUMENT_2>
```

:::
