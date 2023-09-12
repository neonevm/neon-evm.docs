---
title: OpCodes
proofedDate: na
iterationBy: HB
includedInSite: true
approvedBy: na
comments: 
---

Neon EVM supports the majority of the [Ethereum OpCodes](https://ethereum.org/en/developers/docs/evm/opcodes/) verbatim. This page presents those OpCodes that are *not* supported verbatim as they're adapted for use in the Neon EVM.


|Stack|Name|Description|
|--|--|--|
|41|COINBASE|always returns zero|
|44|PREVRANDAO (FKA DIFFICULTY)|always returns zero|
|45|GASLIMIT|always returns U256::MAX|
|48|BASEFEE|always returns zero|
|5A|GAS|returns the gas limit in the transaction instead of remaining gas|








