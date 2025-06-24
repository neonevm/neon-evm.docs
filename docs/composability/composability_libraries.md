---
title: 'Composability Libraries Overview'
proofedDate: 20250618
iterationBy: na
includedInSite: true
approvedBy: Greg
---
# Solidity libraries for composability with Solana programs through NeonEVM

## Overview

### NeonEVM's composability feature

_NeonEVM_ is a _Solana_ **network extension** enabling EVM dApps to tap into _Solana_'s user base and liquidity. It 
comes with a set of precompiled smart contracts acting as an interface between EVM dApps on _NeonEVM_ and _Solana_'s 
accounts and programs.

The **composability** feature allows EVM dApps deployed on _NeonEVM_ to interact with _Solana_ programs, which involves 
formatting _Solana_ instructions in ways that are specific to each program.

Here we provide a set of **Solidity** libraries which make it possible to easily implement secure interactions with the 
following _Solana_ programs:

* **System program**: `LibSystemProgram`, `LibSystemData` and `LibSystemErrors` libraries
* **SPL Token program**: `LibSPLTokenProgram`, `LibSPLTokenData` and `LibSPLTokenErrors` libraries
* **Associated Token program**: : `LibAssociatedTokenProgram` and `LibAssociatedTokenData` libraries
* **Metaplex program**: `LibMetaplexProgram`, `LibMetaplexData` and `LibMetaplexErrors` libraries
* **Raydium program**: `LibRaydiumCPMMProgram`, `LibRaydiumCPMMData` and `LibRaydiumCPMMErrors` libraries

We also provide a set of example smart-contracts implementing typical use cases for these libraries and best practices 
when it comes to user authentication and _Solana_ accounts management.

### Installation

```javascript
npm install @neonevm/call-solana
```

:::note

More details about the composability libraries package at [npm: @neonevm/call-solana](https://www.npmjs.com/package/@neonevm/call-solana)

:::

## Supported Solana programs

:::important

The following contracts have not been audited yet and are here for educational purposes.

:::


- [System program](system_program_composability_libraries.md)

- [SPL Token program](spl_token_program_composability_libraries.md)

- [Metaplex program](metaplex_program_composability_libraries.md)

- [Associated Token program](associated_token_program_composability_libraries.md)

- [Raydium program](raydium_program_composability_libraries.md)


## Composability helper contracts

* [Constants.sol](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/Constants.sol) provides commonly used constants for formatting 
instructions to be executed by _Solana_ programs
* [CallSolanaHelperLib.sol](https://github.com/neonevm/neon-contracts/blob/main/contracts/utils/CallSolanaHelperLib.sol) provides helper functions to prepare formatted instructions
right before they are executed on _Solana_
* [SolanaDataConverterLib.sol](https://github.com/neonevm/neon-contracts/blob/main/contracts/utils/SolanaDataConverterLib.sol) provides helper functions for casting data to and 
from various types commonly used on _Solana_
* [ICallSolana.sol](https://github.com/neonevm/neon-contracts/blob/main/contracts/precompiles/ICallSolana.sol) provides an interfacte to the `CallSolana` precompiled contract which 
is the cornerstone of _NeonEVM_'s composability with _Solana_. See: [ICallSolana interface documentation ](https://neonevm.org/docs/composability/call_solana_interface).
* [QueryAccount.sol](https://github.com/neonevm/neon-contracts/blob/main/contracts/precompiles/QueryAccount.sol) provides a set of getter function for reading _Solana_'s state by 
querying data stored on _Solana_ accounts

## Solana specifics

See: [Common Solana terminology](https://neonevm.org/docs/composability/common_solana_terminology)

### Solana Token accounts

#### Associated token accounts vs Arbitrary token accounts

_Arbitrary token accounts_ are derived using a `seed` which includes the token account `owner`'s public key and an 
arbitrary `nonce` (among other parameters). By using different `nonce` values it is possible to derive different 
_arbitrary token accounts_ for the same `owner` which can be useful for some use cases.

The **CallSPLTokenProgram** contract provides its users with methods to create and initialize SPL _token mints_ and
_arbitrary token accounts_ as well as to mint and transfer tokens using those accounts. It features a built-in
authentication logic ensuring that users remain in control of created accounts.

However, there exists a canonical way of deriving a SPL token account for a specific `owner` and this token account is 
called an _Associated Token account_. _Associated Token accounts_ are used widely by application s running on _Solana_ 
and it is generally expected that token transfers are made to and from _Associated Token accounts_.

The **CallAssociatedTokenProgram** contract provides a method to create and initialize canonical _Associated Token
accounts_ for third party _Solana_ users. This method can also be used to create and initialize canonical _Associated
Token accounts_ owned by this contract.

## Ownership and authentication

### SPL token mint ownership and authentication

The `CallSPLTokenProgram.createInitializeTokenMint` function takes a `seed` parameter as input which is used along with 
`msg.sender` to derive the created token mint account. While the **CallSPLTokenProgram** contract is given mint/freeze 
authority on the created token mint account, the `mintTokens` function grants `msg.sender` permission to mint tokens
by providing the `seed` that was used to create the token mint account.

### Metadata accounts ownership and authentication

The `CallMetaplexProgram.createTokenMetadataAccount` function takes a `seed` parameter as input which is used along with
`msg.sender` to derive a token mint account. Created token metadata account is associated with this token mint account 
which must have been created and initialized beforehand by the same `msg.sender`. That same `msg.sender` is also granted 
permission to update the token metadata account in the future, provided that it is set as mutable upon creation.

### Arbitrary token accounts ownership and authentication

Using _arbitrary SPL Token accounts_ created via the `CallSPLTokenProgram` contract deployed on _NeonEVM_ allows for 
cheap and easy authentication of _NeonEVM_ users to let them interact with and effectively control those token accounts 
securely via this contract while this contract is the actual owner of those token accounts on _Solana_. It is also 
possible to create and initialize an _arbitrary SPL Token accounts_ for third party _Solana_ users, granting them full 
ownership of created accounts on _Solana_.

The `CallSPLTokenProgram.createInitializeArbitraryTokenAccount` function can be used for three different purposes:

* To create and initialize an _arbitrary token account_ to be used by `msg.sender` to send tokens through the 
**CallSPLTokenProgram** contract. In this case, both the `owner` and `tokenOwner` parameters passed to the function 
should be left empty. The _arbitrary token account_ to be created is derived from `msg.sender` and a `nonce` (that can 
be incremented to create different _arbitrary token accounts_). Only `msg.sender` is allowed to perform state changes to
the created token account via this contract. The `transferTokens` function grants `msg.sender` permission to transfer 
tokens from this _arbitrary token account_ by providing the `nonce` that was used to create the _arbitrary token account_.

* To create and initialize an _arbitrary token account_ to be used by a third party `user` NeonEVM account through 
the **CallSPLTokenProgram** contract. In this case, the `owner` parameter passed to the function should be  
`CallSPLTokenProgram.getNeonAddress(user)` and the `tokenOwner` parameter should be left empty. The _arbitrary token 
account_ to be created is derived from the `user` account and a `nonce` (that can be incremented to create different 
_arbitrary token accounts_). Only that `user` is allowed to perform state changes to the created token account via this 
contract. The `transferTokens` function grants `user` permission to transfer tokens from this _arbitrary token account_ 
by providing the `nonce` that was used to create the _arbitrary token account_.

* To create and initialize an _arbitrary token account_ to be used by a third party `solanaUser` _Solana_ account
to send tokens directly on _Solana_ without interacting with the **CallSPLTokenProgram** contract. In this case, both the 
`owner` and the `tokenOwner` parameters passed to the function should be `solanaUser`. The _arbitrary token account_ to 
be created is derived from the `solanaUser` account and a `nonce` (that can be incremented to create different 
_arbitrary token accounts_). The owner of the _arbitrary token account_ is the `solanaUser` account. The `solanaUser` 
account cannot transfer tokens from this _arbitrary token account_ by interacting with the **CallSPLTokenProgram** 
contract, instead it must interact directly with the **SPL Token** program on _Solana_ by signing and executing a 
`transfer` instruction.

## License

This software is licensed under the [MIT license](https://github.com/neonevm/neon-contracts/blob/main/LICENSE)
