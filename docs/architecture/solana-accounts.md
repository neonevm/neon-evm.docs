---
title: Solana accounts
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

## Introduction 

Neon EVM provides a competitive solution by settling to Solana. Solana offers inexpensive transaction costs and only charges for storage allocation. This contrasts with Ethereum, where calculations require much more gas, and gas is charged for every change in data stored. As a result, gas usage on Solana is much cheaper than on Ethereum, and the Neon EVM passes these savings on to users.

A large part of how Solana offers such affordable transactions is through its accounts and storage. This page provides a high-level overview of the Solana holder account.

## Holder accounts

Solana's holder accounts are a crucial element of Neon EVM. You may think of think of the holder account as a temporary file in the operating system (OS). The Neon Proxy writes a large Neon transaction to the holder account as a temporary file. It then calls the Neon EVM program to execute the Neon transaction by loading it from the holder account.

These enables the Neon EVM to overcome some of the compatibility challenges of settling Ethereum-like transactions to Solana: 

- Transaction size differences
- Cycle/gas differences

### Transaction size

An Ethereum transaction and, therefore, a Neon transaction can be large: with an upper limit of 128 KiB. A Solana transaction is small, with an upper limit of 1240 B. 

Neon Proxy writes any large Neon transactions into a holder account before execution. This allows Neon EVM to receive big Neon transactions on-chain.

### Cycle size

A Solana transaction can use 1’400’000 BPF cycles. An Ethereum-like transaction has a limit of 30’000’000 gas. So it’s impossible to execute a long Ethereum-like transaction in **one** Solana transaction. Neon EVM executes Neon transactions in iterative mode with the EVM state stored in a holder account between iterations.

Solana may interrupt the Neon EVM program due to the BPF cycle limit, so the program needs to store the current EVM state and restore it to continue executing the transaction from the interruption point. 

## Holder account size

The default size for the holder account is 256KiB. This size is recommended because it is the HEAP size available for Neon EVM during transaction execution, i.e. it is the maximum HEAP size available for Solana programs during Solana transaction execution.

