---
title: 'Common Solana Terminology'
proofedDate: 20240627
iterationBy: na
includedInSite: false
approvedBy: na
---

## Introduction

To learn about Solana's Composability feature, we first need to understand Solana’s core concepts and features that differentiates it from other blockchains.

## What is Solana?

Solana is a blockchain designed for widespread adoption, offering a high-performance network suited for various applications such as finance, NFTs, payments, and gaming. It functions as a single global state machine, ensuring openness, interoperability, and decentralization.

Solana's parallel processing architecture marks a major breakthrough in blockchain technology, delivering exceptional scalability, throughput, and low-latency transaction confirmations. By utilizing parallelism across various levels of its framework, Solana attains high performance while maintaining decentralization and security.

## Core concepts of Solana

### Accounts

Since Solana programs are stateless, hence the data on Solana is stored in what are known as "accounts". Each account is uniquely identified by a 32-byte address formatted as an Ed25519 PublicKey. This address acts as the account's unique identifier. Some of the key characteristic of accounts are -

1. Accounts can store up to 10MB of data, which may include executable program code or program state.
2. Accounts require a rent deposit in SOL, proportional to the amount of data stored. This deposit is fully refundable when the account is closed.
3. Each account has a program "owner". Only the owning program can modify the account's data or reduce its lamport balance, but anyone can increase the balance.

Every account in Solana has the structure called `AccountInfo` which includes the following fields:

- `data`: A byte array that holds the state of an account. If the account is a program (smart contract), it contains the executable program code. This field is commonly known as "account data".
- `executable`: A boolean flag indicating whether the account is a program.
- `lamports`: A numerical representation of the account's balance in lamports, the smallest unit of SOL (1 SOL = 1 billion lamports).
- `owner`: Indicates the public key (program ID) of the program that owns the account.

Solana account types can be divided into two broad categories - Executable and non-executable programs.

1. **Executable Programs**: Executable programs consist of immutable code that can own and create other accounts to store state. This code is written in a language such as Rust and then compiled into eBPF, a form of bytecode.

   The following are the two types of executable accounts -

   - `Native Programs`: Executable native programs are integral to the Solana ecosystem, handling tasks such as maintaining and operating validator nodes. The most notable example is the **System Program**, responsible for creating new system accounts (commonly referred to as "wallets") and transferring SOL. Other examples of native programs include the **Stake Program**, which manages the staking mechanism, and the BPF Loader, which functions similarly to Ethereum’s EVM.
   - `Custom Programs`: Executable program accounts are pre-built Solana programs designed to create and store other programs. A prime example is the **Solana Program Library (SPL)**, a collection of programs that facilitate various on-chain activities such as creating, swapping, and lending tokens, generating stake pools, and maintaining an on-chain name service. A notable component of the SPL is the Token Program, which creates and manages tokens.

2. **Non-executable Programs**: Non-executable programs are "storage" or "data" accounts that hold various types of data, such as program variables, token balances, NFTs, and fungible currencies. These accounts reflect state changes that occur after each transaction within the protocol.

   This type of accounts can be further divided into -

   - `System Accounts` : System accounts are essential for the network's functionality and manage the basic aspects of account creation and transaction processing. They are managed by the Solana runtime and are necessary for performing fundamental actions like creating, funding, and managing accounts.
   - `Token Accounts` : Token accounts are owned by the Token Program and tracks the number of units of a specific type of token (mint account) owned by a particular address. Token accounts are specialized accounts used to manage and interact with tokens that adhere to the Solana Token Program (often referred to as SPL Token Program). These accounts facilitate the creation, transfer, and management of SPL tokens.

   An `Associated Token Account` is a token account with an address deterministically derived from the owner's address and the mint account's address. These accounts store the SPL token balances for each individual user.

   - `Program Derived Address (PDA)` : A Program Derived Address (PDA) is a special type of account address that is derived from a program ID and some seed data. PDAs are used to create deterministic and secure addresses for program-owned accounts. These addresses are not directly controlled by any private key, but are instead controlled by the program itself, which can authorize transactions on behalf of the PDA.
   - `Data Accounts` : Data accounts are specialized accounts that store data associated with Solana programs (smart contracts). These accounts are crucial for maintaining the state and data of decentralized applications running on the Solana blockchain.

Please refer to the accounts types in details on [Solana Account Model](https://solana.com/docs/core/accounts).

### Transactions and Instructions:

1. `Transactions`**:** On Solana, transactions are sent to interact with the network. Each transaction consists of one or more instructions, each representing a specific operation to be executed. The execution logic for these instructions resides in programs deployed on the Solana network, with each program containing its own set of instructions.

   Couple of key points about transaction execution -

   - **Execution Order:** multiple instructions in a transaction are processed in the order they appear in the transaction.
   - **Atomicity:** A transaction either fully completes with all instructions successfully processed, or it fails entirely. If any instruction within the transaction fails, none of the instructions are executed.

2. `Instructions`: An instruction is a request to perform a specific action on-chain and represents the smallest unit of execution logic within a program.

   An instruction must include the following information -

   - **Program Address:** It specifies the program being called.
   - **Accounts:** Lists all accounts that the instruction will read from or write to, including other programs, using the AccountMeta struct.
   - **Instruction Data:** A byte array that indicates which instruction handler on the program to invoke, along with any additional data required by the instruction handler (function arguments).

Please refer to transactions and instructions details on [Transactions and Instructions](https://solana.com/docs/core/transactions).

### Cross Program Invocation (CPI):

A Cross Program Invocation (CPI) occurs when one program calls the instructions of another program. This mechanism enables the **_Composability_** of Solana programs.

Some important points to note about CPI -

1. CPIs allow Solana program instructions to directly call instructions on another program.
2. Signer privileges from the calling program are extended to the called program.
3. When performing a CPI, programs can "sign" on behalf of PDAs derived from their own program ID.
4. The called program can make additional CPIs to other programs, with a maximum depth of 4.

Please refer to the details about CPI on [Cross Program Invocation](https://solana.com/docs/core/cpi).
