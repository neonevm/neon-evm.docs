---
title: 'SPL token program composability libraries'
proofedDate: 20250618
iterationBy: na
includedInSite: true
approvedBy: Greg
---

# SPL token program composability libraries

## Repository

[SPL Token program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/libraries/spl-token-program/README.md)

## Exmaple contract
[CallSPLTokenProgram](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/CallSPLTokenProgram.sol) - example contract demonstrating how the SPL Token program Solidity libraries can be used in practice to interact with Solana's SPL Token program.

## SPL Token program libraries

### *LibSPLTokenProgram* library
  
This library provides helper functions for formatting instructions to be executed by _Solana_'s **SPL Token** program.
  
#### Available SPL Token program instructions
  
  - `initializeMint2`: initializes a _Solana_ account as a SPL _token mint_. Such an account holds data related to a 
  SPL token (see `LibSPLTokenData.SPLTokenMintData`). See [instruction formatting](LibSPLTokenProgram.sol#L24).
  
  - `initializeAccount2`: initializes a _Solana_ account as a SPL _token account_. Such an account holds data related to a
    SPL token holder (see `LibSPLTokenData.SPLTokenAccountData`). See [instruction formatting](LibSPLTokenProgram.sol#L57).
  
  - `mintTo`: mints an amount of  tokens to an initialized SPL _token account_. See [instruction formatting](LibSPLTokenProgram.sol#L93).
  
  - `transfer`: transfers an amount of tokens to an initialized SPL _token account_. See [instruction formatting](LibSPLTokenProgram.sol#L132).
  
  - `setAuthority`:  updates a SPL token _mint_'s `MINT` or `FREEZE` authority or a a SPL _token account_'s `OWNER` or `CLOSE` 
  authority. See [instruction formatting](LibSPLTokenProgram.sol#L172).
  
  - `approve`: delegates an amount of tokens belonging to a SPL _token account_ to a third party _Solana_ account. See [instruction formatting](LibSPLTokenProgram.sol#L209).
  
  - `revoke`: revokes token delegation previously granted to a third party _Solana_ account. See [instruction formatting](LibSPLTokenProgram.sol#L247).
  
  - `burn`: burns an amount of tokens from a SPL _token account_. See [instruction formatting](LibSPLTokenProgram.sol#L276).
  
  - `closeAccount`: closes a previously initialized SPL _token account_. See [instruction formatting](LibSPLTokenProgram.sol#L314).
  
  - `syncNative`: syncs the token balance of a `Wrapped SOL` _token account_ to reflect its `SOL` balance (minus rent 
  exemption balance). See [instruction formatting](LibSPLTokenProgram.sol#L345).
  
### _LibSPLTokenData_ library
  
This library provides a set of getter functions for querying **SPL Token** accounts data from _Solana_.
  
#### SPL _token mint_ data
  
  The following data fields are stored by SPL _token mint_ accounts and can be queried using the **LibSPLTokenData** library:
  ```solidity
  bytes4 mintAuthorityOption
  bytes32 mintAuthority
  uint64 supply
  uint8 decimals
  bool isInitialized
  bytes4 freezeAuthorityOption
  bytes32 freezeAuthority
  ```
  
#### SPL _token account_ data
  
  The following data fields are stored by SPL _token account_s and can be queried using the **LibSPLTokenData** library:
  ```solidity
  bytes32 mint
  bytes32 owner
  uint64 balance
  bytes4 delegateOption
  bytes32 delegate
  bool isInitialized
  bytes4 isNativeOption
  bool isNative
  uint64 delegatedAmount
  bytes4 closeAuthorityOption
  bytes32 closeAuthority
  ```
  
### _LibSPLTokenErrors_ library
  
  This library provides a set of custom errors that may be thrown when using **LibSPLTokenProgram** and **LibSPLTokenData** libraries.
