---
title: Getting Started
---

*The purpose of this guide is to get you familiarized with the Neon EVM's high-level structure and to provide you with step-by-step instructions on how to set up your local Neon EVM development environment.*

## Neon vs Ethereum

Ethereum is set to remain a booming blockchain ecosystem. The number of active dApps on Ethereum is hovering above 300, and the number of active users of these dApps is close to 6 million, with the number of transactions continuing to be on the rise. Ethereum’s popularity is not only thanks to its processing of smart contracts, but also its sophisticated infrastructure for application development.

Solana is one of the most technically advanced and innovative blockchains, offering low gas fees and high throughput of transactions. Among these innovations is its Proof-of-Stake (PoS) consensus system, which is reinforced via a Proof-of-History protocol, a transaction parallelization technology that optimizes resources and ensures that Solana can scale horizontally across GPUs and SSDs, along with an optimized mempool system that speeds up throughput.

The Neon EVM is a cross-chain solution that allows dApp developers to access the advantages of Solana to expand their services, to offer new products like arbitrage or high-frequency trading, grow their user base, and decrease costs where possible, including gas fees. Neon EVM enables full compatibility with Ethereum on Solana.

## Quick Start

To get started quickly with Neon, follow the steps below. 

### Setting up a Neon EVM Environment

In this section, you will set up a Neon EVM environment to interact with Solana Devnet using MetaMask. Please ensure that MetaMask has already been installed. 

### Network Configuration
  * The [Solana cluster](https://docs.solana.com/cluster/overview) is accessed via a proxy hosted on a remote virtual server.
  * Solana works in test mode (recommended) and the proxy interacts with it through the Neon EVM.

#### Step 1
Open your MetaMask wallet, and in the upper-right corner, click the identical.  
Click `Create Account` in the dropdown menu and add one more account to interact with the network configured.

#### Step 2
Open your wallet under the new account and click `Settings` in the dropdown menu.  
The settings menu window for selecting a network should open.  

#### Step 3
Click `Add Network` in the top-right corner.  
To connect to the Solana [Devnet](https://docs.solana.com/clusters#devnet) cluster, fill in the fields in the open window. For example,
  * `Network Name`: "remote proxy — solana devnet"
  * `New RPC URL`: `https://proxy.devnet.neonlabs.org/solana`
  * `Chain ID`: 245022926
  * `Currency Symbol`: NEON

#### Step 4
After filling in the fields, click `Save`. You can now access the [Solana cluster](https://docs.solana.com/clusters) and carry out transactions.

### Migrating dApps to the Neon EVM

[🔘 Migrating NeonSwap to the Neon EVM](developing/deploy_facilities/migrating_dapps.md)

## Deploying dApps

[🔘 Using Remix](developing/deploy_facilities/using_remix.md) — Example of deploying smart contracts using Remix.  
[🔘 Using Truffle](developing/deploy_facilities/using_truffle.md) — Example of deploying smart contracts using Truffle.  
[🔘 Using Hardhat](developing/deploy_facilities/using_hardhat.md) — Example of deploying smart contracts using Hardhat.  

## Neon EVM Architecture

[🔘 Ethereum and Solana capabilities in a single solution](architecture/eth_sol_solution.md) — Describes a unique solution that allows Ethereum users to use the key features of Solana and vice versa.  
[🔘 Overview of Neon EVM architecture](architecture/neon_evm_arch.md) — Describes the architectural solutions built into Neon EVM that enable fast transaction processing for Ethereum users.  

## Fundamental Topics

If you are new to Neon EVM development, we recommend starting from the very beginning and moving forward in order through each of the topics.  

[🔘 Web2 versus Web3](architecture/core_aspects/web3.md) — Describes the fundamental differences between Web2 and Web3.  
[🔘 Ethereum account](architecture/core_aspects/account.md) — An entity with an ETH balance that can send transactions on Ethereum.  
[🔘 Ethereum transaction](architecture/core_aspects/transaction.md) — A cryptographically signed instruction from an account.  
[🔘 Block](architecture/core_aspects/block.md) — A special structure for recording a group of transactions in blockchain systems.  
[🔘 Gas](architecture/core_aspects/gas.md) — Computational power represented in tokens. Required to process transactions.
