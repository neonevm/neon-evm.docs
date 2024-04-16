---
title: Verify smart contracts with Foundry
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment:
---

_This page outlines the steps for verifying contracts on Neon EVM using the Foundry tool._

This tutorial is based on the example located in [this repository](https://github.com/neonlabsorg/neon-tutorials/tree/main/foundry).

:::info
Foundry doesn't support custom explorers and only support Blockscout, Sourcify and Etherscan.
:::

By the end of this tutorial, you will learn to verify a contract that deploys an ERC-20 token to Neon EVM Devnet on Blockscout explorer.

## Step 1: Configure `.env`

Create a `.env` file in the project's root directory to feed in the required variables.

```sh
RPC_URL_DEVNET=https://devnet.neonevm.org
CHAIN_ID_DEVNET=245022926
RPC_URL_MAINNET=https://neon-proxy-mainnet.solana.p2p.org
CHAIN_ID_MAINNET=245022934
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
VERIFIER_URL_BLOCKSCOUT=https://neon-devnet.blockscout.com/api
```

Run `source .env` to save the .env variables.

## Step 2: Deploy the contract

To deploy a contract, please follow this page describing [how to deploy contracts with Foundry](https://docs.neonevm.org/docs/developing/deploy_facilities/using_foundry).

## Step 3: Verify the deployed contract

To verify the deployed contract from the above step, let's take an example of a deployed contract with address `0x93adb347065949a90a7f2e198f94c2fadeb7dbbd` on Neon EVM Devnet.

After running the following command to verify -

```sh
forge verify-contract --chain-id $CHAIN_ID_DEVNET 0x93adb347065949a90a7f2e198f94c2fadeb7dbbd src/TestERC20/TestERC20.sol:TestERC20 --verifier-url $VERIFIER_URL_BLOCKSCOUT --verifier blockscout
```

The output should look like this -

```sh
Start verifying contract `0x93Adb347065949a90a7f2e198F94c2FADeb7dBbd` deployed on 245022926

Submitting verification for [src/TestERC20/TestERC20.sol:TestERC20] "0x93Adb347065949a90a7f2e198F94c2FADeb7dBbd".
Submitted contract for verification:
	Response: `OK`
	GUID: `93adb347065949a90a7f2e198f94c2fadeb7dbbd661584d8`
	URL:
        https://neon-devnet.blockscout.com/api?/address/0x93adb347065949a90a7f2e198f94c2fadeb7dbbd
```

The verified contract source code can be found here https://neon-devnet.blockscout.com/address/0x93Adb347065949a90a7f2e198F94c2FADeb7dBbd?tab=contract.

:::important
If the deployed contract consists of constructor arguments to be passed, then the constructor arguments are ABI-encoded. For example -

```sh
forge verify-contract --chain-id $CHAIN_ID_DEVNET 0x93adb347065949a90a7f2e198f94c2fadeb7dbbd src/TestERC20/TestERC20.sol:TestERC20 --verifier-url $VERIFIER_URL_BLOCKSCOUT --verifier blockscout --constructor-args $(cast abi-encode "constructor(string,string)" "TestToken" "TEST")
```

:::

:::info
If you want to verify on NeonScan, then please follow this page which describes the steps **[to verify smart contracts manually on NeonScan](verify_manually.md)**
:::
