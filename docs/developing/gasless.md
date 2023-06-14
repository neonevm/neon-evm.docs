---
title: Gasless transactions
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: There are code examples (React>> https://codesandbox.io/s/t3fid3) and https://thirdweb.com/neon-evm-devnet/0xF3eBc32292F4BbFB83DECB97Eb42d95da968f775/sources >> bit confused though, the flow described means that the dApp dev has nothing to do but accept the 0 cost tx. If these code examples "demonstrate how to implement gasless transactions" does that mean they apply to Proxy Operators?
---

## TL;DR

- Neon EVM provides a starter pack of gasless transactions
- Buy NEON tokens from your chosen DEX by using free NEON

## Introduction

What happens if you do not yet own enough (or any) NEON to pay for your user's first transactions? Don't worry, we have you covered with a starter pack of gasless transactions.

These transactions are still handled by your chosen [Proxy Operator](docs/developing/connect_rpc.md), however, the transaction cost is covered by us. This means if you bring assets into the Neon network, then the first transactions are free.

## How does it work?

1. The user transfers tokens to a new Neon account

> You may use NeonPass to move SPL tokens from Solana or bridge assets across with a partner's bridge

2. The Proxy Operator nominates the Neon account as eligible for N gasless transactions.

3. The user sets up a swap of the transferred tokens for NEON.

4. The DEX supporting the swap is provided a gas cost of zero for the applicable transactions.

5. The user signs the transaction with the zero gas price.

6. The Proxy Operator executes the transaction.

> Note, that the Proxy Operator pays the SOL gas fee, as per the [normal flow](/docs/tokens/gas_fees), but the commission is extracted from Neon Foundation, not the end user.

## How many?

So, what does N stand for? The minimum number of gasless transactions is 3. However, favoured partners may negotiate better deals.

<!-- needs confirmation, and IF true, needs a contact point for folk to negotiate their startup packs -->


