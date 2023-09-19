---
title: Fees
proofedDate: na
iterationBy: HB
includedInSite: false
approvedBy: na
comments: Versions completely made up -- how can we handle this?
---

## Fees FAQ

This page provides answers to some of the most commonly asked questions around Fees.

## What token are fees paid in?

As of Q4 2023, only NEON are used to pay gas fees. Accepting alterntives is part of the roadmap.

NeonPass accepts either Sol or NEON for transferring assets on and off NeonEVM.

<!-- todo -- link to roadmap that has token payment data -->


<!-- todo -- Replace the anser above. How to control versions for this FAQ? 

### Neon EVM version 1.0--1.2

The NEON token is used to pay the “gas fees” required for transaction execution. The gas fee is the amount of NEON tokens that a user needs to pays for a transaction to execute it successfully.

### Neon EVM version 1.0--1.2

Gas fees may be paid in Neon or Sol.

-->

<!-- todo: single source snippet needed for tokens that may be used to pay currently, current version? -->

## Does Neon EVM burn gas?

No. Neon EVM doesn't burn gas. Under Ethereum's EIP-1559, the base fee is burned Neon EVM functions differently and doesn't calculate a [base fee per gas](https://ethereum.org/en/developers/docs/gas/#:~:text=The%20base%20fee%20is%20calculated%20by%20a%20formula%20that%20compares,target%20block%20size%20is%20exceeded.). 


Neon EVM uses Solana as the settlement layer. And, Solana functions differently to Ethereum. On Solana, [50% of each tx fee is burned]. With Ethereum's model, the base fee increases in response to target block size being exceeded. Ethereum penalizes large blocks developing with its method.

<!-- todo write up how Solana rewards optimum block sizing -->


