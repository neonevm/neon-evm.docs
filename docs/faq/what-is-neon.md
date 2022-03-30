---
title: What is Neon?
---

* [What is Neon?](#what-is-neon)
* [What is the Neon Web3 Proxy?](#what-is-the-neon-web3-proxy)
* [What are the main roles in Neon?](#what-are-the-main-roles-in-neon)
* [What is the ERC-20/SPL wrapper?](#what-is-the-erc-20spl-wrapper)
* [What about the NFT support (ERC-721 and ERC-1155)?](#what-about-the-nft-support-erc-721-and-erc-1155)
* [What is the ERC-20/SPL bridge?](#what-is-the-erc-20spl-bridge)

### What is Neon?

Neon is a smart contract on Solana that was designed to bring EVM (Ethereum Virtual Machine) compatibility to Solana. Neon enables the use of Ethereum dApps and tools on Solana without any reconfiguration.

### What is the Neon Web3 Proxy?

The Neon Web3 Proxy allows users to access Solana via the existing Ethereum app front end. On the back end, it wraps a Neon transaction into a Solana transaction. Then the Proxy sends the Solana transaction to a Solana cluster and the Neon EVM program executes the Neon transaction on-chain.

### What are the main roles in Neon?

**Neon user**: Any account in Neon EVM with a non-zero balance in Neon tokens (later NEON/ETH/ERC-20).
Neon users order Ethereum-like transactions that are executed via Neon EVM program on Solana.

**Neon client**: An application with EVM bytecode (Solidity, Vyper, etc.) loaded into Neon.
The application generates a Neon transaction according to Ethereum rules and sends it to Neon EVM
via the Web3 Proxy.

**Neon operator**: Anyone who operates a Neon Web3 Proxy. Operators are compensated by users in
Neon tokens (later NEON/ETH/ERC-20). Operators must maintain SOL tokens as payment to Neon EVM and
Solana validators for the execution of Neon transactions. Operators receive a fee from Neon users for finalizing the executions of Neon transactions.

### What is the ERC-20/SPL wrapper?

The ERC-20/SPL wrapper is the implementation of the ERC-20 interface for SPL tokens. Its purpose is to ensure the interaction of Solana applications with Neon EVM contracts. The original ERC-20 tokens are "wrapped" in the SPL tokens so that they can operate with Solana. This wrapper can also be used to transfer SOL/SPL tokens using Ethereum wallets such as MetaMask.

### What about the NFT support (ERC-721 and ERC-1155)?

NFTs (ERC-721 and ERC-1155) aren't supported right now but will be supported in the future.

### What is the ERC-20/SPL bridge?

Say, for example, you have a dApp on Ethereum. This dApp has an ERC-20 contract with its own logic of token minting, and you want to deploy it on Neon EVM.

The dApp tokens will be available to other Solidity contracts on Neon EVM, but they will not exists for Solana programs. The ERC-20/SPL bridge will allow you to transfer such tokens from an ERC-20 contract to SPL token accounts.
