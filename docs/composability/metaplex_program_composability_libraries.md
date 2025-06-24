---
title: 'Metaplex program composability libraries'
proofedDate: 20250618
iterationBy: na
includedInSite: true
approvedBy: Greg
---

# Metaplex program composability libraries

## Repository

[Metaplex program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/metaplex-program/README.md)

## Exmaple contract
[CallMetaplexProgram](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/CallMetaplexProgram.sol) - example contract demonstrating how the Metaplex program Solidity libraries can be used in practice to interact with Solana's Metaplex program.

## Libraries

### _LibMetaplexProgram_ library

This library provides helper functions for formatting instructions to be executed by _Solana_'s **Metaplex** 
program.

#### Available Metaplex program instructions

- `createMetadataAccountV3`: creates a new token metadata account associated with an already initialized _token mint_ 
account and store provided token metadata on it. A token metadata account can be **_mutable_**, meaning that it is 
possible for the specified `updateAuthority` account to update the metadata held by the account in the future. 

- `updateMetadataAccountV2`: updates an existing **mutable** token metadata account, storing new token metadata on it.

### _LibMetaplexData_ library

This library provides a set of getter functions for querying **Metaplex** accounts data from _Solana_.

#### Metaplex token metadata

The following data fields are stored by token metadata accounts and can be queried using the **LibMetaplexData** library:
```solidity
string tokenName;
string tokenSymbol;
string uri;
bool isMutable;
bytes32 updateAuthority;
```

### _LibMetaplexErrors_ library

This library provides a set of custom errors that may be thrown when using **LibMetaplexProgram** and **LibMetaplexData** libraries.
