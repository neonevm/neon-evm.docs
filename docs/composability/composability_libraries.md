---
title: 'Composability Libraries'
proofedDate: 20250618
iterationBy: na
includedInSite: true
approvedBy: Greg
---
# Solidity libraries for composability with Solana programs through NeonEVM

## Overview

### Installation

```javascript
npm install @neonevm/call-solana
```

### Usage

Once you have installed the package, you can use the Solidity libraries by importing them in your contracts:

```solidity
pragma solidity 0.8.28;

import { LibSPLTokenData } from "@neonevm/call-solana/composability/libraries/spl-token-program/LibSPLTokenData.sol";

contract CallSPLTokenProgram {
  /// @param tokenAccount The 32 bytes SPL token account public key
  /// @return token account balance as uint64
  function getSPLTokenAccountBalance(bytes32 tokenAccount) external view returns(uint64) {
    return LibSPLTokenData.getSPLTokenAccountBalance(tokenAccount);
  }
}
```

## NeonEVM's composability feature

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
* **Raydium program**: `LibRaydiumProgram`, `LibRaydiumData` and `LibRaydiumErrors` libraries

We also provide a set of example smart-contracts implementing typical use cases for these libraries and best practices 
when it comes to user authentication and _Solana_ accounts management.

> [!CAUTION]
> The following contracts have not been audited yet and are here for educational purposes.



## Supported Solana programs

### System program
<dl>
  <dd>
 #### Rpository
  [System program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/libraries/system-program/README.md)
 #### Exmaple contract
  [CallSystemProgram](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/CallSystemProgram.sol) - example contract demonstrating how the System program Solidity libraries can be used in practice to interact with Solana's System program.

#### System program Solidity librarie
  ##### LibSystemProgram library
  
  This library provides helper functions for formatting instructions to be executed by _Solana_'s **System** 
  program.
  
  ###### Available System program instructions
  
  - `createAccountWithSeed`: creates a new _Solana_ PDA (program-derived account) which public key is derived from a base 
  public key, a program id and a seed. A payer account pays for the rent exemption balance of the created PDA based on the
  size of the storage allocated to the account. See [instruction formatting](LibSystemProgram.sol#L19).
  
  - `transfer`: transfers an amount of SOL to another _Solana_ account. See [instruction formatting](LibSystemProgram.sol#L66).
  
  - `assignWithSeed`: assigns a _Solana_ PDA (program-derived account) to a _Solana_ program. See [instruction formatting](LibSystemProgram.sol#L102).
  
  - `allocateWithSeed`: allocates storage space to a _Solana_ PDA (program-derived account). See [instruction formatting](LibSystemProgram.sol#L141).
  
  ##### LibSystemData library
  
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
  
  ##### LibSystemErrors library
  
  This library provides a set of custom errors that may be thrown when using **LibSystemProgram** and **LibSystemData** 
  libraries.

  </dd>
</dl>

### SPL Token program
<dl>
  <dd>

  #### LibSPLTokenProgram library
  
  This library provides helper functions for formatting instructions to be executed by _Solana_'s **SPL Token** 
  program.
  
  ### Available SPL Token program instructions
  
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
  
  #### LibSPLTokenData library
  
  This library provides a set of getter functions for querying **SPL Token** accounts data from _Solana_.
  
  ##### SPL _token mint_ data
  
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
  
  ##### SPL _token account_ data
  
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
  
  #### LibSPLTokenErrors library
  
  This library provides a set of custom errors that may be thrown when using **LibSPLTokenProgram** and **LibSPLTokenData** 
  libraries.

* [SPL Token program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/libraries/spl-token-program/README.md)

* [CallSPLTokenProgram](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/CallSPLTokenProgram.sol) example contract demonstrating how the SPL Token 
program Solidity libraries can be used in practice to interact with Solana's SPL Token program.

  </dd>
</dl>

### Metaplex program
<dl>
  <dd>
#### LibMetaplexProgram library

This library provides helper functions for formatting instructions to be executed by _Solana_'s **Metaplex** 
program.

##### Available Metaplex program instructions

- `createMetadataAccountV3`: creates a new token metadata account associated with an already initialized _token mint_ 
account and store provided token metadata on it. A token metadata account can be **_mutable_**, meaning that it is 
possible for the specified `updateAuthority` account to update the metadata held by the account in the future. 

- `updateMetadataAccountV2`: updates an existing **mutable** token metadata account, storing new token metadata on it.

#### LibMetaplexData library

This library provides a set of getter functions for querying **Metaplex** accounts data from _Solana_.

##### Metaplex token metadata

The following data fields are stored by token metadata accounts and can be queried using the **LibMetaplexData** library:
```solidity
string tokenName;
string tokenSymbol;
string uri;
bool isMutable;
bytes32 updateAuthority;
```

#### LibMetaplexErrors library

This library provides a set of custom errors that may be thrown when using **LibMetaplexProgram** and **LibMetaplexData** 
libraries.

* [Metaplex program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/libraries/metaplex-program/README.md)

* [CallMetaplexProgram](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/CallMetaplexProgram.sol) example contract demonstrating how the Metaplex
  program Solidity libraries can be used in practice to interact with Solana's Metaplex program.

  </dd>
</dl>

### Associated Token program
<dl>
  <dd>
This library provides helper functions for formatting instructions to be executed by _Solana_'s **Associated Token** 
program.

#### Available Associated Token program instructions

- `create`: creates and initializes a canonical _Associated Token account_ on _Solana_. Such an account holds 
data related to an SPL token holder. See [instruction formatting](LibAssociatedTokenProgram.sol#L16).

* [Associated Token program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/libraries/associated-token-program/README.md)

* [CallAssociatedTokenProgram](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/CallAssociatedTokenProgram.sol) example contract demonstrating how the 
Associated Token program Solidity libraries can be used in practice to interact with Solana's Associated Token program.

  </dd>
</dl>

### Raydium program
<dl>
  <dd>

#### LibRaydiumProgram library
This library provides helper functions for formatting instructions to be executed by _Solana_'s **Raydium** 
program.

##### Available Raydium CPMM program instructions
* `createPoolInstruction` - Deploying CPMM pool on Raydium for selected tokens pair. This method also returns the needed `lamports` amount for the instruction to be processed successfully in Solana, this amount constains several account creations plus the pool creation fee paid to Raydium. [Info](LibRaydiumProgram.sol#L30)
* `addLiquidityInstruction` - Adding liquidity for selected tokens pair. [Info](LibRaydiumProgram.sol#L152)
* `withdrawLiquidityInstruction` - Withdrawing liquidity from selected tokens pair. [Info](LibRaydiumProgram.sol#L246)
* `lockLiquidityInstruction` - Locking liquidity position. This method also returns the needed `lamports` amount for the instruction to be processed successfully in Solana, this amount constains several account creations plus a fee if `withMetadata` is set to `true`. [Info](LibRaydiumProgram.sol#L331)
* `collectFeesInstruction` - Collecting fees for locked LP position. This instruction can be sent to Solana only if there is already existing locked LP position and there are some pending fees to be collected. [Info](LibRaydiumProgram.sol#L460)
* `swapInputInstruction` - Swapping exact token input amount, example - swap 100 tokensA for X tokensB. [Info](LibRaydiumProgram.sol#L559)
* `swapOutputInstruction` - Swapping tokens to exact token output amount, example - swap X tokensA for 100 tokensB. [Info](LibRaydiumProgram.sol#L605)

#### LibRaydiumData library
This library provides a set of getter functions for querying different accounts & data. Also some calculations such as swap input or output amount; convert LP amount to tokens amounts; etc. Here are some of the getters:
* `getPoolData` - Returns the data of Raydium CPMM pool. [Info](LibRaydiumData.sol#L150)
* `getConfigData` - Returns the data for requested utils index. [Info](LibRaydiumData.sol#L173)
* `getTokenReserve` - Returns pool token reserve for selected token mint. [Info](LibRaydiumData.sol#L194)
* `getPoolLpAmount` - Returns the pool's LP amount. [Info](LibRaydiumData.sol#L199)
* `lpToAmount` - Converts LP amount to reserves amounts. [Info](LibRaydiumData.sol#L204)
* `getSwapOutput` - Returns a swap quote of provided exact input amount. [Info](LibRaydiumData.sol#L224)
* `getSwapInput` - Returns a swap quote of provided exact output amount. [Info](LibRaydiumData.sol#L240)


#### LibRaydiumErrors library
This library provides a set of custom errors that may be thrown when using **LibRaydiumProgram** and **LibRaydiumData** 
libraries.

* [Raydium program Solidity libraries](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/libraries/raydium-program/README.md)

* [CallRaydiumProgram](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/CallRaydiumProgram.sol) example contract demonstrating how the Raydium program 
Solidity libraries can be used in practice to interact with Solana's Raydium program.

  </dd>
</dl>

## Composability helper contracts

* [Constants.sol](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/composability/libraries/Constants.sol) provides commonly used constants for formatting 
instructions to be executed by _Solana_ programs
* [CallSolanaHelperLib.sol](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/utils/CallSolanaHelperLib.sol) provides helper functions to prepare formatted instructions
right before they are executed on _Solana_
* [SolanaDataConverterLib.sol](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/utils/SolanaDataConverterLib.sol) provides helper functions for casting data to and 
from various types commonly used on _Solana_
* [ICallSolana.sol](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/precompiles/ICallSolana.sol) provides an interfacte to the `CallSolana` precompiled contract which 
is the cornerstone of _NeonEVM_'s composability with _Solana_. See: [ICallSolana interface documentation ](https://neonevm.org/docs/composability/call_solana_interface).
* [QueryAccount.sol](https://github.com/neonevm/neon-contracts/blob/dev/solidity-composability-libraries/contracts/precompiles/QueryAccount.sol) provides a set of getter function for reading _Solana_'s state by 
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
