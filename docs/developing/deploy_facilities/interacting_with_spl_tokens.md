---
title: ERC-20 for SPL Tokens
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comments:
boilerPlatable: TODO we could have an item providing demo
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes the ERC-20 SPL wrapper contract: the ERC-20 Factory Contract. This contract provides access to native Solana tokens, i.e. those registered in the SPL token contract, through the [ERC-20 standard interface](https://eips.ethereum.org/EIPS/eip-20). 

This allows Solana liquidity to be available to EVM (Solidity, Vyper, etc.) bytecode contracts, i.e. this ERC-20 SPL wrapper allows Ethereum wallets such as MetaMask to transact with SPL tokens. 

:::info
To be able to use an SPL token from a Solana account balance, it must be transferred to a Neon EVM account via the [NeonPass SDK](/docs/developing/integrate/neon_transfer_sdk).
:::

## ERC-20 Factory Contract

The [ERC-20-for-SPL Factory Contract](https://github.com/neonlabsorg/neon-evm/blob/4bcae0f476721e5396916c43396ec85e465f878f/evm_loader/solidity/erc20_for_spl_factory.sol) provides a method to access a list of deployed contracts on the Neon EVM and to issue and register a new ERC-20-for-SPL contract. Once registered, these contracts are then deployed to Neon EVM and are available on the system-wide registry.

:::info
Two addresses of the deployed contract will registered: Devnet and Mainnet.
::: 

Depending on the method called and the arguments passed to this contract, two variants of the deployment may be created and registered: 

### ERC-20-for-SPL

The [ERC-20-for-SPL variant](https://github.com/neonlabsorg/neon-evm/blob/4bcae0f476721e5396916c43396ec85e465f878f/evm_loader/solidity/erc20_for_spl_factory.sol#L17) works with a precompiled contract within Neon EVM which can call the SPL token program. This enables you to utilize existing SPL tokens e.g. SOL or NEON, as wSOL or wNEON, respectively, via the ERC-20 interface, i.e. this contract assigns the to the token.

:::info
Note that before setting up the ERC-20 Factory Contract to construct an ERC-20-for-SPL, you must register the token's existing [Metaplex metadata](https://docs.metaplex.com/programs/token-metadata/overview).
:::

### ERC-20-for-SPL-Mintable

The [ERC-20-for-SPL-Mintable variant](https://github.com/neonlabsorg/neon-evm/blob/4bcae0f476721e5396916c43396ec85e465f878f/evm_loader/solidity/erc20_for_spl_factory.sol#LL35C1-L35C1) has two additional methods that enable you to use the Neon EVM to mint a new SPL token and wrap it as ERC-20-compatible. When the ERC-20 Factory Contract is constructed to this variant, it creates a new SPL token using Solana's Token Program and provides mint and freeze authority to the Neon account specified in the constructor.

## Contract signing

Depending on which output you need to be constructed, you will sign with different accounts, as shown in the table:


| Contract            | Usage                                | Account requirements                               | Mint tx signed by                                                    |
| ------------------- | ----------------------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| ERC-20-For-Spl         | Wrap Solana-minted token | 1\. Neon Account<br></br>2\. Existing SPL token | Signed by the Solana account private key (via linked Phantom wallet) |
| ERC-20-ForSpl-Mintable | Mint a token on Solana   | 1\. Neon Account                           | Signed by the Neon account private key (via linked MetaMask wallet)  |


## Restrictions

According to the SPL token structure, an unsigned 64-bit floating point number is used to store the balance; in ERC-20, it's an unsigned 256-bit floating point number. Based on the unsigned 64-bit floating point standard, the maximum balance and transfer amount is (2^64-1)/(10^9), with 9 decimals of accuracy.

## Notes on variants in outcome

Depending on how you set up the ERC-20 Factory Contract will determine the constructor's variables:

<Tabs>
 <TabItem value="Constructor non-mintable" label="ERC20ForSpl Constructor" default>

```
constructor(
     bytes32 _tokenMint
)
Arguments:
_tokenMint – address of SPL token account
Constructor signature for Mintable token is:
constructor(
<!--      string memory _name,
     string memory _symbol, Is this to be removed for non-mintable?? -->
     uint8 _decimals,
     address _mint_authority
)
Arguments:
_name – string representing full name of the token 
_symbol – string representing shorten symbol of the token 
_decimals – decimals of new token
_mint_authority – address of mint/freeze authority Neon account
```
 </TabItem>
<TabItem value="Constructor mintable" label="ERC20ForSplMintable Constructor">

``` 
constructor(
     string memory _name,
     string memory _symbol,
     bytes32 _tokenMint
)
Arguments:
_name – string representing full name of the token 
_symbol – string representing shorten symbol of the token 
_tokenMint – address of SPL token account
Constructor signature for mintable token is:
constructor(
     string memory _name,
     string memory _symbol,
     uint8 _decimals,
     address _mint_authority
)
Arguments:
_name – string representing full name of the token 
_symbol – string representing shorten symbol of the token 
_decimals – decimals of new token
_mint_authority – address of mint/freeze authority Neon account 
```
 </TabItem>
</Tabs>

<!-- ## Notes on usage

The ERC-20 Factory Contract is provided as a basic toolkit under ** lisence. You are invited to adapt this to your needs as required. -->