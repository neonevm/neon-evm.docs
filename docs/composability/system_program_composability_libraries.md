---
title: 'System program composability libraries'
proofedDate: 20250618
iterationBy: na
includedInSite: true
approvedBy: Greg
---

# System program composability libraries

## Repository

[System program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/system-program/README.md)
## Example contract

[CallSystemProgram](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/CallSystemProgram.sol) - example contract demonstrating how the System program Solidity libraries can be used in practice to interact with Solana's System program.

## Libraries

### *LibSystemProgram* library
  
This library provides helper functions for formatting instructions to be executed by _Solana_'s **System** program.
  
#### Available System program instructions
  
  - `createAccountWithSeed`: creates a new _Solana_ PDA (program-derived account) which public key is derived from a base 
  public key, a program id and a seed. A payer account pays for the rent exemption balance of the created PDA based on the
  size of the storage allocated to the account. See [instruction formatting](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/system-program/LibSystemProgram.sol#L19).
  
  - `transfer`: transfers an amount of SOL to another _Solana_ account. See [instruction formatting](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/system-program/LibSystemProgram.sol#L66).
  
  - `assignWithSeed`: assigns a _Solana_ PDA (program-derived account) to a _Solana_ program. See [instruction formatting](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/system-program/LibSystemProgram.sol#L102).
  
  - `allocateWithSeed`: allocates storage space to a _Solana_ PDA (program-derived account). See [instruction formatting](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/system-program/LibSystemProgram.sol#L141).
  
### *LibSystemData* library
  
  This library provides a set of getter functions for querying **System** accounts data from _Solana_.
  
  ###### System accounts data
  
  The following data fields are stored by **System** accounts and can be queried using the **LibSystemData** library:
  ```solidity
  bytes32 pubkey
  uint64 lamports
  bytes32 owner
  bool executable
  uint64 rent_epoch
  ```
  
  ### *LibSystemErrors* library
  
  This library provides a set of custom errors that may be thrown when using **LibSystemProgram** and **LibSystemData** 
  libraries.
