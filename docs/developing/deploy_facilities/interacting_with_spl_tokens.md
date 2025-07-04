---
title: ERC-20 for SPL Tokens
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comments:
boilerPlatable: TODO we could have an item providing demo TODO see inline todos && this probably needs to become a folder with the subtopics
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page describes the ERC-20 SPL interface contract: the ERC-20 Factory Contract. This contract provides access to native Solana tokens, i.e. those registered in the SPL token contract, through the [ERC-20 standard interface](https://eips.ethereum.org/EIPS/eip-20). 

<!-- 
todo provide userguide to explain how to return ERC-20-interface contract addresses for existing SPL-as-ERC-20 tokens : this is the item in the code https://github.com/neonlabsorg/neon-evm/blob/769e831889bb8564ac061c7fcdd3774fefe01273/evm_loader/solidity/erc20_for_spl_factory.sol#L8-L15 below is the address -->

This allows Solana liquidity to be available to EVM bytecode contracts (Solidity, Vyper, etc.), i.e. this ERC-20 SPL interface allows Ethereum wallets such as MetaMask to transact with SPL tokens. The contract is deployed on Devnet and Mainnet:


|Location|Factory Contract address|
|:-------|:-------|
|Devnet| 0xF6b17787154C418d5773Ea22Afc87A95CAA3e957|
|Mainnet| 0x6B226a13F5FE3A5cC488084C08bB905533804720|

:::info
To be able to use an SPL token from a Solana account balance, it must be transferred to a Neon EVM account via [NeonPass](/docs/token_transferring/neon_transfer).
:::

## ERC-20 Factory Contract

The [ERC-20-for-SPL Factory Contract](https://github.com/neonlabsorg/neon-evm/blob/4bcae0f476721e5396916c43396ec85e465f878f/evm_loader/solidity/erc20_for_spl_factory.sol) provides a method to access a list of deployed contracts on the Neon EVM and to issue and register a new ERC-20-for-SPL contract. Once registered, these contracts are then deployed to Neon EVM and are available on the system-wide registry.

Depending on the method called and the arguments passed to this contract, two variants of the deployment may be created and registered: 

### ERC-20-for-SPL

The [ERC-20-for-SPL variant](https://github.com/neonlabsorg/neon-evm/blob/4bcae0f476721e5396916c43396ec85e465f878f/evm_loader/solidity/erc20_for_spl_factory.sol#L17) works with a precompiled contract within Neon EVM which can call the SPL token program. This enables you to utilize existing SPL tokens e.g. SOL or USDC, as wSOL or USDC tokens on Neon EVM chain, respectively, via the ERC-20 interface.

:::info
Note that before setting up the ERC-20 Factory Contract to construct an ERC-20-for-SPL, you must register the token's existing [Metaplex metadata](https://developers.metaplex.com/token-metadata).
:::

### ERC-20-for-SPL-Mintable

The [ERC-20-for-SPL-Mintable variant](https://github.com/neonlabsorg/neon-evm/blob/4bcae0f476721e5396916c43396ec85e465f878f/evm_loader/solidity/erc20_for_spl_factory.sol#LL35C1-L35C1) has two additional methods that enable you to use the Neon EVM to mint a new SPL token and register it to the interface to be ERC-20-compatible. When the ERC-20 Factory Contract is constructed to this variant, it creates a new SPL token using Solana's Token Program and provides mint and freeze authority to the Neon account specified in the constructor.

## Deploying
Setting up the ERC-20-for-SPL interface could be a 1-step or 2-step process:
- You already have an existing SPLToken on Solana:
  1. In this case, you only have to submit a transaction on Neon EVM to create the smart contract instance for the SPLToken.
- You don't have an existing SPLToken and decided to use ERC-20-for-SPL-Mintable to mint a new SPLToken and to create smart contract instance:
  1. Here, you can pass a single transaction to Neon EVM chain.
- You don't have an existing SPLToken, but you want to be the owner of the token in the context of Solana:
  1. Firstly, you need to deploy the SPLToken on Solana with a Solana transaction.
  2. Next step is a transaction to Neon EVM to create the smart contract instance for the SPLToken you just deployed in the step 1.

## Contract signing

Depending on which output you need to construct, you will sign with different accounts, as shown in the table:


| Contract               | Usage                                       | Requirements                                                                         |tx signed by                                                          |
| :--------------------: | ------------------------------------------- | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| ERC-20-For-Spl         | Provide interface for Solana-minted token   | 1\. Neon Account<br></br>2\. Existing SPL token <br></br>3\. Solana account & wallet | Signed by the Solana account private key (via linked Phantom wallet) |
| ERC-20-ForSpl-Mintable | Mint a token on Solana & provide interface  | 1\. Neon Account                                                                     | Signed by the Neon account private key (via linked MetaMask wallet)  |


## Restrictions

According to the SPL token structure, an unsigned 64-bit integer is used to store the balance; in ERC-20, it's an unsigned 256-bit integer. Based on the unsigned 64-bit integer, the maximum balance and transfer amount is (2^64-1)/(10^9), with 9 decimals of accuracy.

## Notes on variants in outcome

How you set up the ERC-20 Factory Contract will determine the contract deployed and the constructor's variables:

<Tabs>
 <TabItem value="Constructor non-mintable" label="ERC20-For-Spl Constructor" default>

```
/// @notice ERC20ForSpl constructor
/// @param _tokenMint The Solana-like address of the Token Mint on Solana in bytes32 format
constructor(bytes32 _tokenMint)
```
 </TabItem>
<TabItem value="Constructor mintable" label="ERC20-For-Spl-Mintable Constructor">

``` 
/// @notice ERC20ForSplMintable constructor
/// @dev parameter _decimals cannot be bigger than 9, because of Solana's maximum value limit of uint64
/// @param _name The name of the SPLToken
/// @param _symbol The symbol of the SPLToken
/// @param _decimals The decimals of the SPLToken
/// @param _mint_authority The owner of the ERC20ForSPLMintable contract, which has the permissions to mint new tokens
constructor(
    string memory _name,
    string memory _symbol,
    uint8 _decimals,
    address _mint_authority
)
```
 </TabItem>
</Tabs>
:::important
It's highly desirable to not place `decimals` greater than 9. Neglecting this restricion may lead to issues with math operations inside the smart contract.
:::

## Notes on usage

The ERC-20 Factory Contract is provided as a basic toolkit under the MIT (X11) license. You are invited to adapt this to your needs as required.

<!-- todo this probably needs its own page
Understand accounts: Solana vs. Neon EVM
Now that we understand how SPL and ERC-20 tokens become compatible with Neon EVM, let’s take a look at how a dApp can access account balances. Firstly, it is important to understand the two different account types. There are standard Solana “Associated Token Accounts”, which hold a user’s SPL tokens natively, and Neon EVM Token Accounts “packed” in an ERC-20-for-SPL interface within Neon EVM. 

These Neon EVM ERC-20-for-SPL Token Accounts are specialized Solana accounts instantiated in the Neon ecosystem. These accounts can interact with Solidity dApps and are similar in structure to Associated Token Accounts in the broader Solana environment. They store tokens associated with a user’s Neon EVM-facing EVM-compatible wallet, e.g. MetaMask.

If you want to learn more about the utility token NEON, see our previous article. To join the community and have access to experts who can answer your questions, find us on ****.
 -->

