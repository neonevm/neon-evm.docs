# ERC20Wrapper

ERC20Wrapper contract is used to represent a token created under spl-token contract of Solana inside NeonEVM. It realizes ERC20 interface for transparent work from the rest contracts of NeonEVM. It also may be used to represent Ethereum tokens transferred to Solana to be processed by NeonEVM.  

ERC20Wrapper contract stores all necessary information on respective accounts of Solana and does not use contract storage for that.  

To represent every spl-token it is required to load separate version of ERC20Wrapper indicating Solana token address in constructor parameters.

### How to find account addresses
The following types of accounts are used to store the information:

  * Solana account bound to an Etehreum account: its address is calculated as PDA (Program Derived Address) with seed `[ACCOUNT_SEED_VERSION, ethereum_address]`
    * `ethereum_address` — is address of an account in Ethereum.
  * Token address in Solana: calculated according to [associated_token_address](https://github.com/solana-labs/solana-program-library/blob/master/docs/src/associated-token-account.md#finding-the-associated-token-account-address) rules.
  * Address of account that stores Approve/Allowance information; calculated as PDA with seed `[ACCOUNT_SEED_VERSION, 'ERC20Allowance', TOKEN_MINT, owner_ethereum_address, spender_ethereum_address]`
    * `owner_ethereum_address` — tokens owner Ethereum address
    * `spender_ethereum_address` — Ethereum address of a spender

In all the calculations above it is accepted that `ACCOUNT_SEED_VERSION=1`.

### Description of functions implemented in ERC20Wrapper

Neon ERC20Wrapper contract is realized in compliance with ERC20 standard and contains the following functions:
  * `decimals`
  * `totalSupply`
  * `balanceOf`
  * `allowance`
  * `transfer`
  * `approve`
  * `transferFrom`

`decimals()` — Returns the number of decimals used to get its user representation. For example, if `decimals` equals 2, a balance of 505 tokens should be displayed to a user as 5,05 (505 / 10 * 2).  

`totalSupply()` — Returns the amount of tokens in existence.  

`balanceOf(address account)` — Returns the amount of tokens owned by `account.  

`allowance(address owner, address spender)` — Returns the remaining number of tokens that `spender` will be allowed to spend on behalf of `owner` through {​​​​​​​transferFrom}​​​​​​​. This is zero by default.  

`transfer(address recipient, uint256 amount)` — sends specified amount of tokens  `amount` from the caller's account balance to the `recipient` account balance. Returns a boolean value indicating whether the operation succeeded.  

`approve(address spender, uint256 amount)` — Sets `amount` as the allowance of `spender` over the caller's tokens. Returns a boolean value indicating whether the operation succeeded.  

`transferFrom(address sender, address recipient, uint256 amount)` — Transfer `amount` tokens from `sender` to `recipient`. Returns a boolean value indicating whether the operation succeeded.

### Restrictions

According to spl-token structure, *u64* is used to store the balance (in ERC20 it's *U256*). Based on *u64*, maximum balance and transfer amounts are restricted by (2^64-1)/(10^9) (for 9 decimals accuracy).
