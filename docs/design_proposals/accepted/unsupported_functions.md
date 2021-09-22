# Unsupported functions in Neon EVM
The Neon EVM doesn't support the following functions:
  * `gas_price(&self)`
  * `block_hash(&self, number: U256)`
  * `block_coinbase(&self)`
  * `block_dificulty(&self)`
  * `block_gas_limit(&self)`

### Why these features are temporarily not supported
Calling each of the above listed functions mistakenly returns zero instead of the expected ones. The reason for this behavior of these functions is a bug in the Neon EVM program code.  

### When these features will be supported
Investigating and fixing the bug will start after MVP on Mainnet.

