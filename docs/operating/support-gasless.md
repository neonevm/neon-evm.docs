---
title: Transaction gas
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

## TL;DR

Operators: 

- Can configure some aspects of gas prices
- Can set gas to zero for testing
- Must configure the Proxy to accept no-fee transactions

<!-- Operators need to accept request to provide gasless (0 gas fee transaction). Is this handled by the Proxy without any configuration? -->

## Introduction to the Neon Operator economy

Neon Proxy enables Neon Operators to earn NEON tokens by processing transactions from Neon users.

The Neon Operator economy is based on providing a custom gas price returned by the eth_gasPrice method. The Neon Proxy calculates the gas price based on the assumption that it should cover the cost of transaction processing on the Solana cluster and include the profit of the Neon Operator. The Neon Operator should include all additional costs (such as hardware rent) plus profit in their Operator Fee. 

The Neon EVM calculates gas usage by tracking the SOL spent by the Neon Operator during transaction execution. The gas price includes the ratio of NEON and SOL tokens, so the payment from the Neon User to Neon Operator covers all spent SOLs.

## Passing on gas savings

Because the Neon EVM operates on Solana, not Ethereum it takes advantage of Solana’s inexpensive transaction costs and favourable approach to only charge for storage allocation. This contrasts with Ethereum, where calculations require much more gas, and gas is charged for every change in data stored in Ethereum. As a result, gas usage on Solana is much cheaper than on Ethereum, and the Neon EVM passes these savings on to users.


## Gas price calculation and configuration


