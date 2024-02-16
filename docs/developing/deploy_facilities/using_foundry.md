---
title: Deploy with Foundry
proofedDate: 20231116
iterationBy: na
includedInSite: true
approvedBy: na
comment:
---

import mm_p_key from '@site/static/img/doc-images/developing/deploy_facilities/foundry-metamask.png';

This tutorial walks through deploying a contract describing an ERC-20 token to Neon Devnet.

## Introduction

This tutorial is based on an [example in GitHub](https://github.com/neonlabsorg/neon-tutorials/tree/main/foundry).

:::info
This page is a quickstart based on a specific example program. For more details on installing Foundry, refer to the _[Foundry documentation](https://book.getfoundry.sh/getting-started/installation)_.
:::

## Prerequisites

- An EVM-compatible wallet, such as MetaMask [connected to Devnet](/docs/developing/connect_rpc#connect-via-chainlist)
- A balance in [Devnet NEON](https://neonfaucet.org/)

### Step 1: Installation

1.1 Clone the example Foundry project from the remote repository and navigate to it:

```sh
git clone https://github.com/neonlabsorg/neon-tutorials
cd neon-tutorials/foundry
```

1.2 Install Foundryup with:

```sh
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

:::info
`foundryup` installs the latest _(nightly)_ precompiled binaries: forge, cast, anvil, and chisel.
:::

1.3 Install the required libraries:

```sh
forge install foundry-rs/forge-std --no-commit
forge install openzeppelin/openzeppelin-contracts --no-commit
```

### Step 2: Set up an environment file

:::info
This step requires an EVM-compatible wallet such as MetaMask, connected to Neon Devnet, with a balance in Devnet NEON available from [NeonFaucet](https://neonfaucet.org/).

The following tutorials assist you to meet these prerequisites:

- Learn how to [install a MetaMask wallet and connect it to Devnet](/docs/wallet/metamask_setup)
  > Or [connect an existing wallet to Devnet](/docs/developing/connect_rpc#connect-via-chainlist)
  > :::

<!-- I suspect there is no need to create new wallet as per first draft of page >> existing wallet probably fine -- test on run through -->

2.1 Obtain the private key for your wallet account.

> To obtain the private key from MetaMask, from the hamburger menu, click **Account Details** > **Show Private Key**, enter your password, and click **Confirm** for access to the private key for that account.
> <img src={mm_p_key} width="250" />

2.2 Create a .env file and add these lines:

```
RPC_URL_DEVNET=https://devnet.neonevm.org
CHAIN_ID_DEVNET=245022926
RPC_URL_MAINNET=https://neon-proxy-mainnet.solana.p2p.org
CHAIN_ID_MAINNET=245022934
PRIVATE_KEY=`YOUR_PRIVATE_KEY`
VERIFIER_URL_BLOCKSCOUT=https://neon-devnet.blockscout.com/api
```

:::important
Replace `YOUR_PRIVATE_KEY` with your data.
:::

2.3 Run:

```
source .env
```

### Step 3: Compile contracts

The contracts are located in the project's `src/` directory. Before these contracts can be run, they must first be compiled.

3.1 To compile the project's contracts, run the following command:

```sh
forge build
```

After running this step, you should see output similar to the following:

```
[⠢] Compiling...
[⠒] Compiling 24 files with 0.8.21
[⠃] Solc 0.8.21 finished in 2.48s
Compiler run successful!
```

3.2 (Optional) test the smart contracts with:

```sh
forge test
```

### Step 4: Deploy Contracts

4.1 To deploy the project's contracts using scripts, run:

```sh
forge script script/TestERC20/DeployTestERC20.s.sol:DeployTestERC20Script --broadcast --rpc-url $RPC_URL_DEVNET --legacy --skip-simulation
```

On running this step, you should get console output similar to:

```sh
[⠢] Compiling...
[⠒] Compiling 2 files with 0.8.21
[⠢] Solc 0.8.21 finished in 842.35ms
Compiler run successful!
Script ran successfully.

SKIPPING ON CHAIN SIMULATION.

###
Finding wallets for all the necessary addresses...
##
Sending transactions [0 - 0].
⠁ [00:00:00] [######################################################################################################################################] 1/1 txes (0.0s)

##
Waiting for receipts.
⠉ [00:00:04] [##################################################################################################################################] 1/1 receipts (0.0s)
##### 245022926
✅  [Success]Hash: 0x93b3a7f39f9bb5e6326d73b8f1c77ffe90a79390c784f1ece1ba74d6da356e31
Contract Address: 0x853dA9a815c817866848Aff7fE43e4a74b8FF282
Block: 278115244
Paid: 5.7943561133217 ETH (33229200 gas * 174.37543225 gwei)

==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 5.7943561133217 ETH (33229200 gas * avg 174.37543225 gwei)
```

To run the script for minting tokens, define the contract address displayed in the terminal after deploying the contract in script/TestERC20/MintTestERC20.s.sol and run:

```sh
forge script script/TestERC20/MintTestERC20.s.sol:MintTestERC20Script --broadcast --rpc-url $RPC_URL_DEVNET --legacy --skip-simulation
```

On running this step, you should get console output similar to:

```sh
[⠢] Compiling...
No files changed, compilation skipped
Script ran successfully.

== Logs ==
  The initial balance of the deployer account is:
  99000000000000
  The new balance of the deployer account is:
  199000000000000
  The initial balance of the receiver account before the transfer is:
  1000000000000
  The new balance of the deployer account after the transfer is:
  198000000000000
  The new balance of the receiver account after the transfer is:
  2000000000000

SKIPPING ON CHAIN SIMULATION.

###
Finding wallets for all the necessary addresses...
##
Sending transactions [0 - 1].
⠉ [00:00:01] [######################################################################################################################################] 2/2 txes (0.0s)

##
Waiting for receipts.
⠙ [00:00:06] [##################################################################################################################################] 2/2 receipts (0.0s)
##### 245022926
✅  [Success]Hash: 0x2b4e080fef106d489fbb986fe517f8ce393ba593019939b2c591ec37035126fc
Block: 278118078
Paid: 0.0017438435201 ETH (10000 gas * 174.38435201 gwei)


##### 245022926
✅  [Success]Hash: 0x7975d08e3cf9413670ede44ee9cc2f5d69c0d375530948453585b5195c5ca472
Block: 278118084
Paid: 0.0017438435201 ETH (10000 gas * 174.38435201 gwei)

==========================

ONCHAIN EXECUTION COMPLETE & SUCCESSFUL.
Total Paid: 0.0034876870402 ETH (20000 gas * avg 174.38435201 gwei)
```

:::important
The native token displayed above should be NEON instead of ETH and the unit should be Galan instead of gwei (It is not possible to customize the display).
:::

4.2 To deploy the project's contracts without scripts, run:

```sh
forge create --rpc-url $RPC_URL_DEVNET --private-key $PRIVATE_KEY src/TestERC20/TestERC20.sol:TestERC20 --constructor-args "Test ERC20 Token" "TERC20" --legacy
```

On running this step, you should get console output similar to:

```
[⠰] Compiling...
No files changed, compilation skipped
Deployer: 0x4455E84Eaa56a01676365D4f86348B311969a4f4
Deployed to: 0x5537599aa2F97Dd60a66342522a465A7f2e40Ff9
Transaction hash: 0x6de9dab8a526cbac33008056d185b93dff725605efb791bf116b6bece4f0c486
```

To mint tokens to the deployer address, run:

```sh
cast send <contract_address> --rpc-url $RPC_URL_DEVNET --private-key $PRIVATE_KEY "mint(address,uint256)" <deployer_address> 20000000000000000000 --legacy
```

On running this step, you should get console output similar to:

```sh
blockHash               0x60c530c2a73f48d9d7dea410d6a314f951e4120fa57a5472c1baf91fc50c6622
blockNumber             252337066
contractAddress
cumulativeGasUsed       1527280
effectiveGasPrice
gasUsed                 1527280
logs                    [{"address":"0x5537599aa2f97dd60a66342522a465a7f2e40ff9","topics":["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef","0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000004455e84eaa56a01676365d4f86348b311969a4f4"],"data":"0x000000000000000000000000000000000000000000000001158e460913d00000","blockHash":"0x60c530c2a73f48d9d7dea410d6a314f951e4120fa57a5472c1baf91fc50c6622","blockNumber":"0xf0a5baa","transactionHash":"0x6a0aafa041c4e27abdf55abb430c5ff9da5606af466b7beff4f4e8da3e7829ae","transactionIndex":"0x0","logIndex":"0x0","transactionLogIndex":"0x0","removed":false}]
logsBloom               0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
root
status                  1
transactionHash         0x6a0aafa041c4e27abdf55abb430c5ff9da5606af466b7beff4f4e8da3e7829ae
transactionIndex        0
type                    0
```

:::important
Replace `<contract_address>` and `<deployer_address>` with your smart contract address and deployer address respectively.
:::

### Step 5: Contract verification

5.1 Verify the deployment of your smart contract on the explorer [Neon Blockscout](https://neon-devnet.blockscout.com) using following command:

```sh
forge verify-contract --chain-id $CHAIN_ID_DEVNET <contract_address> src/TestERC20/TestERC20.sol:TestERC20 --verifier-url $VERIFIER_URL_BLOCKSCOUT --verifier blockscout
```

:::important
Replace `<contract_address>` with your smart contract address.
:::

After successfully running this step you should get console output similar to:

```
Start verifying contract `0x5537599aa2F97Dd60a66342522a465A7f2e40Ff9` deployed on 245022926
Submitting verification for [src/TestERC20/TestERC20.sol:TestERC20] "0x5537599aa2F97Dd60a66342522a465A7f2e40Ff9".
Submitted contract for verification:
	Response: `OK`
	GUID: `5537599aa2f97dd60a66342522a465a7f2e40ff9654118b3`
	URL:
        https://neon-devnet.blockscout.com/api?/address/0x5537599aa2f97dd60a66342522a465a7f2e40ff9
```

5.2 Copy/paste this link in your browser, remembering to replace `contract_address` with your freshly deployed contract address:

`https://neon-devnet.blockscout.com/address/<contract_address>`
