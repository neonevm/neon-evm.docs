---
title: Precompiled Contracts That Can't Be Used in Solana
---

### Problem
Contracts written in the Solidity language cannot work in Solana if they contain calls to the following precompiled contracts:
  * *[bigModExp](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-198.md)* — Used for efficient [RSA](about/terminology.md#rsa) verification inside of EVM, as well as other forms of number theory-based cryptography.
  * *[bn256Add](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md)* — Performs addition on the elliptic curve operations.
  * *[bn256ScalarMult](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-196.md)* — Performs scalar multiplication on the elliptic curve operations.
  * *[bn256Pairing](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-197.md)* — Elliptic curve pairing operations to perform [zkSTARKs](about/terminology.md#zk-stark) verification within the block gas limit.

The Neon EVM requires the implementation of system calls in Solana for these contracts.

### Details
A Solidity contract can contain calls to functions supported by the EVM itself. For example, to perform operations such as addition, subtraction, obtaining a hash block, a contract can use methods implemented in the EVM. Each called function is an *operation-code*. The EVM contains some such codes (in a limited number).

To increase the number of such functions, precompiled contracts implemented inside the blockchain core are used. Since these contracts are written in Solidity, their use requires an increased consumption of resources (i.e. gas). The Neon EVM contains several pieces of the program code where calls to these precompiled contracts can occur.

If the program enters such places, the Neon EVM does not create a new contract, but calls an already-compiled contract from the blockchain core. Although these functions are called within the core, in the code it is like calling another contract. Since this code is executed directly in the core, it is resource-intensive.

Currently there are several precompiled contracts implemented as *bpf-code*. When calling these contracts, a lot of *bpf-instructions* are used, and therefore the transaction size limit may be exceeded.

### Solution
In order for the precompiled contracts to be used in Solana, it is proposed to implement sys-calls inside the Solana core. That is, to perform an implementation similar to the *erc-recover* implementation.

### Implementation Strategy
1. Prepare the necessary changes to support precompiled contracts in the Solana core.
2. Create *pull requests* for the Solana core to make these improvements.
3. Test changes in Testnet.
4. Test changes in Devnet.
5. Test changes in Mainnet.
6. Update the Neon EVM to support these precompiled contracts.
