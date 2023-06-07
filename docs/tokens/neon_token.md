---
title: The Neon Token
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

The NEON token is the native token of the Neon EVM. It is used as a:
* **Utility token**: the payment method for user transactions (transfers, dApps deployment, interaction with dApps, etc.) on the Neon platform, similar to how ETH is used on Ethereum; and
* **Governance token**: representing a vote in the Neon DAO for decentralized community governance.

## Token parameters
Some properties of the NEON token include:
* It can be divided into *Alans*, where 10<sup>18</sup> Alan = 10<sup>9</sup> Galan = 1 NEON.
* No inflation or deflation rates.
* Transaction Fees: 50% go to Solana Validators and 50% to the Neon DAO Treasury.
* NEON is an SPL token on Solana and, at the same time, is a native token on the Neon EVM (like ETH on Ethereum).

## Utility
The Neon token facilitates all payments for Neon EVM transactions, including the fee paid to Neon operators.

When a Neon user (i.e., an end-user of a dApp built on the Neon EVM) wants to execute a transaction, they send a request to a Neon operator. Operators have two main responsibilities:
1. To wrap the Neon transaction into a Solana transaction, so that it may be executed iteratively on a Solana cluster.
2. To pay for the execution of every iteration of the Neon transaction.

The goal of this abstraction is to improve the user experience by simplifying the payment process for Neon transactions.

For every iteration of a Neon transaction, the Neon operator will pay SOL tokens to the Solana Validator and to the Neon DAO Treasury. This latter payment is known as the Neon EVM platform fee.

In return, the Neon user pays the Neon operator in NEON tokens to cover the cost of the Solana validation fee, the Neon EVM platform fee, and the operator’s commission.

## Governance
NEON holders are able to propose changes to the Neon protocol and vote on proposals that affects Neon protocol, using their NEON tokens as votes.
