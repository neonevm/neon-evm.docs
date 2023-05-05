---
title: Precompiles
proofedDate: na
iterationBy: HB
includedInSite: true
approvedBy: na
comments: TODOs inline 
---


## Precompiled Contracts Supported by Neon
Currently, Neon supports a variety of precompiled contracts. These include:

* https://www.evm.codes/precompiled?fork=merge

## Limitations
However, there are some precompiled contracts that Neon does not support. Contracts written in the Solidity language will not work on Solana if they contain calls to the following precompiled contracts:
* bigModExp — Used for efficient RSA verification inside of EVM, as well as other forms of number theory-based cryptography.
* bn256Add — Performs addition on the elliptic curve operations.
* bn256ScalarMult — Performs scalar multiplication on the elliptic curve operations.
* bn256Pairing — Elliptic curve pairing operations to perform zkSTARKs verification within the block gas limit.

The Neon EVM requires the implementation of system calls in Solana for these contracts.

<!-- Updates required Eth precompiled that are not supported && Add Neon native precompiled -->