---
title: Accounts
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

## TL;DR

- Operator keys are whitelisted for Proxy access
- Key accounts provide SOL to support Neon EVM transactions
- Account balances may be queried and topped up
- Security of accounts is a consideration

## The Operator key

The Operator key is an account that is whitelisted by the Neon EVM. Neon Proxy creates several holder accounts for each Neon Operator key (if the Neon Operator key has enough SOLs).

## Holder accounts

Holder accounts are a crucial element of Neon EVM. Neon Proxy creates holder accounts with [rent-exempt balances](https://docs.solana.com/ru/developing/programming-model/accounts#rent) on start. The number of holder accounts created determines the TPS provided to users.

 The number of holder accounts per Neon Operator key can be configured with `PRX_PERM_ACCOUNT_LIMIT`.

