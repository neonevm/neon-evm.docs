---
title: Unsupported Functions in the Neon EVM
---

The Neon EVM doesn't support the following functions:
  * `gas_price(&self)`
  * `block_hash(&self, number: U256)`
  * `block_coinbase(&self)`
  * `block_dificulty(&self)`
  * `block_gas_limit(&self)`

### Why are these features temporarily not supported?
Calling each of these functions mistakenly returns zero instead of the expected ones. The reason for the behavior of these functions is a bug in the Neon EVM program code.  

### When will these features be supported?
Investigating and fixing the bug will start after MVP on Mainnet.
