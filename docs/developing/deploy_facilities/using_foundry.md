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
This page is a quickstart based on a specific example program. For more details on installing Foundry, refer to the *[Foundry documentation](https://book.getfoundry.sh/getting-started/installation)*.
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
:::

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
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
VERIFIER_URL_BLOCKSCOUT=https://neon-devnet.blockscout.com/api
```
:::important
Replace <YOUR_PRIVATE_KEY> with your data.
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

4. To deploy the project's contracts, run:
```sh
forge create --rpc-url $RPC_URL_DEVNET --private-key $PRIVATE_KEY src/TestERC20/TestERC20.sol:TestERC20 --constructor-args "Test ERC20 Token" "TERC20" --legacy
```

On running this step you should get console output similar to:
```
[⠰] Compiling...
No files changed, compilation skipped
Deployer: 0x4455E84Eaa56a01676365D4f86348B311969a4f4
Deployed to: 0x5537599aa2F97Dd60a66342522a465A7f2e40Ff9
Transaction hash: 0x6de9dab8a526cbac33008056d185b93dff725605efb791bf116b6bece4f0c486
```

### Step 5: Contract verification

5.1 Verify the deployment of our smart contract on the explorer [Neon Blockscout](https://neon-devnet.blockscout.com) using following command:
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

```https://neon-devnet.blockscout.com/address/<contract_address>```