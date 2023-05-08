---
title: Precompiles
proofedDate: na
iterationBy: HB
includedInSite: true
approvedBy: na
comments: TODOs inline 
---


## Precompiled EVM-native contracts supported by Neon
Currently, Neon supports the majority of precompiled contracts that may be called by Solidity contracts, as documented at [www.evm.codes](https://www.evm.codes/precompiled). However, there are some precompiled contracts that Neon doesn't (yet) support.

Once Solana enables the following [features in Solana MainNet beta](https://docs.rs/solana-sdk/latest/src/solana_sdk/feature_set.rs.html):

- alt_bn128 syscalls
- big_mod_exp syscall

these contracts may be supported.

## Unsupported precompiles

The following functions remain unsupported:

1. Modular exponentiation [(EIP 198)](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-198.md).
2. Addition on an elliptic curve alt_bn128 [(EIP 196)](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md).
3. Scalar multiplication on an elliptic curve alt_bn128 [(EIP 196)](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md).
4. Checking a pairing equation on an eliptic curve alt_bn128 [(EIP 197)](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md).

<!-- Previous list: making this redundant in favor of Anton's latest, worried some data is being lost so keeping here fore now

* bigModExp — Used for efficient RSA verification inside of EVM, as well as other forms of number theory-based cryptography.
* bn256Add — Performs addition on the elliptic curve operations.
* bn256ScalarMult — Performs scalar multiplication on the elliptic curve operations.
* bn256Pairing — Elliptic curve pairing operations to perform zkSTARKs verification within the block gas limit. -->


<!-- Updates needed -- Neon native precompiled -->