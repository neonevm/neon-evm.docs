---
title: Deploy with Go-ethereum
proofedDate: 20240502
iterationBy: na
includedInSite: false
approvedBy: na
comment:
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import mm_p_key from '@site/static/img/doc-images/developing/deploy_facilities/foundry-metamask.png';

## Introduction

Go-ethereum (Geth) is indeed the official implementation of the Ethereum protocol in Go. Its popularity stems from its robustness, performance, and active development community. Geth provides a comprehensive set of functionalities for interacting with the Ethereum blockchain, including creating and managing accounts, sending transactions, deploying and interacting with smart contracts, querying blockchain data, and more.

Developers often choose Geth for Ethereum-based application development in Go due to its efficiency and the familiarity of the Go programming language. Its extensive API allows developers to build complex decentralized applications (dApps) and blockchain-based solutions easily.

Overall, Geth is a powerful tool for developers building applications on the EVM based blockchains using the Go programming language.

:::info
For more details, please refer to these documentations https://goethereumbook.org/en/ and https://geth.ethereum.org/docs/developers/dapp-developer/native-bindings.
:::

## Prerequisites

- An EVM-compatible wallet, such as MetaMask [connected to Devnet](/docs/developing/connect_rpc#connect-via-chainlist)
- A balance in [Devnet NEON](https://neonfaucet.org/)
- NodeJS 16.x or newer
- The latest Go version
- [Solidity compiler](https://docs.soliditylang.org/en/latest/installing-solidity.html) **less than or equal to v0.8.24** (Neon EVM supports solidity versions less than or equal to v0.8.24)

## Go installation

:::important
If your machine already has Go installed, then please proceed to the next step.
:::

1. Download the latest Go version from https://go.dev/doc/install.
2. Create a directory `GoProjects` for your Go project development on your machine. Please run `pwd` inside `GoProjects` directory to get the full path. This will be used in Step 4 to set the $GOPATH env variable.
3. Create 3 directories `/GoProjects/src`, `/GoProjects/pkg` and `/GoProjects/bin`.
4. Set up the $GOPATH env variable on your machine -

- Run `nano ~/.zshrc` on Mac machines.
- Run `nano ~/.bash_profile` on Linux machines.
- Paste the following lines -

```sh
export GOPATH=<PATH_TO_YOUR_GO_PROJECTS_DIRECTORY>
export PATH=$GOPATH/bin:$PATH
```

5. Save your ~/.bash_profile or ~/.zshrc file.

- Run `source ~/.zshrc` on Mac machines.
- Run `source ~/.bash_profile` on Linux machines.

6. Run `echo $GOPATH` to check if the GOPATH is set correctly in the machine.

## How to deploy contracts using go-ethereum

This tutorial is based on the [Github example](https://github.com/neonlabsorg/go-ethereum-tutorial) and walks you through the steps of deploying the following smart contracts on Neon EVM Devnet-

- Simple storage contract.
- ERC20 token contract.

### Step 1: Installation

:::info
Neon EVM doesn't support the latest JSON-RPC specifications. Therefore Neon EVM only supports go-ethereum versions **less than or equal to 1.12.2**.
:::

1.1 Navigate to the src directory of your `$GOPATH`:

```sh
cd $GOPATH/src
```

1.2 Clone the example go-ethereum project from the remote repository and navigate to it:

```sh
git clone https://github.com/neonlabsorg/go-ethereum-tutorial.git
cd go-ethereum-tutorial
```

**Note:** All the following commands should be executed inside `go-ethereum-tutorial` folder.

1.3 Install the required libraries:

```sh
npm install
```

```sh
go install github.com/ethereum/go-ethereum/cmd/abigen@latest
```

```sh
go mod tidy
```

### Step 2: Set up an environment file

:::info
This step requires an EVM-compatible wallet such as MetaMask, connected to Neon Devnet, with a balance in Devnet NEON available from [NeonFaucet](https://neonfaucet.org/).

The following tutorials assist you to meet these prerequisites:

- Learn how to [install a MetaMask wallet and connect it to Devnet](/docs/wallet/metamask_setup)

> Or [connect an existing wallet to Devnet](/docs/developing/connect_rpc#connect-via-chainlist)
> :::

2.1 Obtain the private key for your wallet account.

> To obtain the private key from MetaMask, from the hamburger menu, click **Account Details** > **Show Private Key**, enter your password, and click **Confirm** for access to the private key for that account.
> <img src={mm_p_key} width="250" />

2.2 Rename `.env.example` to `.env` and place your private key inside it:

```sh
PRIVATE_KEY=YOUR_PRIVATE_KEY
NEON_RPC_DEVNET=https://devnet.neonevm.org
NEON_RPC_MAINNET=https://neon-proxy-mainnet.solana.p2p.org
```

:::important
Replace `YOUR_PRIVATE_KEY` with your data.
:::

2.3 Run:

```
source .env
```

### Step 3: Generate the Go bindings for the smart contracts

<Tabs>
<TabItem value="Storage" label="Storage Contract">

3.1 Run the following commands to generate the smart contract ABI and bytecode:

```sh
solc --abi ./contracts/Storage.sol -o build
```

```sh
solc --bin ./contracts/Storage.sol -o build
```

3.2 Run the following command to generate the smart contract go binding inside `contractsgo` folder:

```sh
abigen --abi ./build/Storage.abi --pkg contractsgo --type Storage --out ./contractsgo/Storage.go --bin ./build/Storage.bin
```

</TabItem>

<TabItem value="ERC20" label="ERC20 Contract">

3.1 Run the following commands to generate the smart contract ABI and bytecode:

```sh
solc --abi ./contracts/TestERC20.sol -o build
```

```sh
solc --bin ./contracts/TestERC20.sol -o build
```

3.2 Run the following command to generate the smart contract go binding inside `contractsgo` folder:

```sh
abigen --abi ./build/TestERC20.abi --pkg contractsgo --type TestERC20 --out ./contractsgo/TestERC20.go --bin ./build/TestERC20.bin
```

</TabItem>
</Tabs>

### Step 4: Deploy and run smart contract functions

<Tabs>
<TabItem value="Storage" label="Storage Contract">

:::important
Go applications can only have one `main.go` file which is the entry point to execute the functions from the .go files in other packages. To run only the Storage contract, please comment out `deploy.RunTestERC20Contract()` in `main.go`.
:::

4.1 Run the following command to deploy the Storage contract, store a value in the deployed smart contract and reading the stored value from the deployed smart contract:

```sh
go run main.go
```

4.2 After successfully running this step you should get console output similar to:

```
You are now connected to Neon EVM Devnet
The NEON balance of the account is: 310387553758242748088682
------------------------------------------------------------------------
Deploying Storage contract...
The contract is deployed at address:  0x6b6Ba862e2bBc0C1305DF681d45f16a1D6F57baf
Transaction hash: 0xf84667ce0bd5d2da4dfcf81fe9c72bdc81c207a41a3c9baa4c43e9ebb6ae1b6e

You are now connected to Neon EVM Devnet
The NEON balance of the account is: 310383249542814769793482
------------------------------------------------------------------------
Storing value in the Storage contract...
Estimated gas: 25000
Transaction hash: 0x24e5af83df1e9f1536d684c08e903d1285f1f5e484df43d4616c925bb25ec9a9

You are now connected to Neon EVM Devnet
The NEON balance of the account is: 310383247282862115123482
------------------------------------------------------------------------
Reading value from the Storage contract...
Returned value: 45
```

</TabItem>

<TabItem value="ERC20" label="ERC20 Contract">

:::important
Go applications can only have one `main.go` file which is the entry point to execute the functions from the .go files in other packages. To run only the TestERC20 contract, please comment out `deploy.RunStorageContract()` in `main.go`.
:::

4.1 Run the following command to deploy the TestERC20 contract and transfer some TestERC20 tokens from the deployer address to a randomly created address:

```sh
go run main.go
```

4.2 After successfully running this step you should get console output similar to:

```
You are now connected to Neon EVM Devnet
The NEON balance of the account is: 310383247282862115123482
------------------------------------------------------------------------
Deploying TestERC20 contract...
The contract is deployed at address:  0x7BeE8180c4f35744C9cC811e540252ECcD8AcEb4
Transaction hash: 0xf8af65bcb8187bcdcc8c7a5a7106f242c941d6506201497f31f46099d891bcc6

You are now connected to Neon EVM Devnet
The NEON balance of the account is: 310373551028315738437922
------------------------------------------------------------------------
Transferring TestERC20 tokens...
Estimated gas: 1422000
Sender balance before transfer: 1000000000000000000000
Receiver balance before transfer: 0
Transaction hash: 0x8d2ff2a94f836b25e3ae9cc2f9b95ca73e3b3c1e4a6bf7725890eddd915029ab

Sender balance after transfer: 999999999999999999990
Receiver balance after transfer: 10
```

</TabItem>
</Tabs>
