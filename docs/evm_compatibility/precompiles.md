---
title: Precompiles
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: From meet>> Requires supported precompiles Anton can provide + explanation of WHY they are not supported #3 Requires a list of native precomiled contracts Anton can provide by slack [actually, the yellow paper https://ethereum.github.io/yellowpaper/paper.pdf is not a great source for the opcodes -- using docs instead]
---

## Precompiled EVM contracts
Currently, Neon EVM supports the majority of [precompiled contracts](https://www.evm.codes/precompiled?fork=merge)

## Unsupported precompiled EVM contracts
There are some precompiled EVM contracts that Neon EVM does not support. 

Contracts written in the Solidity language will in Neon EVM if they contain calls to the following:
* bigModExp — Used for efficient RSA verification inside an EVM, as well as other forms of number theory-based cryptography
* bn256Add — Performs addition on the elliptic curve operations
* bn256ScalarMult — Performs scalar multiplication on the elliptic curve operations
* bn256Pairing — Elliptic curve pairing operations to perform zkSTARKs verification within the block gas limit

> The Neon EVM requires the implementation of system calls in Solana to support these contracts in the future.

<!-- We have our own native Precompiled contracts -- need to list those and provide addresses -->