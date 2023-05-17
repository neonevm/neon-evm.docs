---
title: ERC-20 for SPL Tokens
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comments:
boilerPlatable: yes -- we could have an item providing demo
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The ERC-20 SPL wrapper contract provides access to native Solana tokens, i.e. those registered in the SPL token contract, through the ERC-20 interface. 

This allows Solana liquidity to be available to EVM (Solidity, Vyper, etc.) bytecode contracts, i.e. this ERC-20 SPL wrapper allows Ethereum wallets such as MetaMask to transact with SPL tokens.

:::info
To be able to use an SPL token from a Solana account balance, it must be transferred to a NeonEVM account via [NeonPass](/docs/token_transferring/neonpass_usage).
:::

Two contracts are available on Neon EVM that enable SPL tokens to be transacted as ERC-20 compliant. It's vital that you understand which to use:

## ERC-20-for-SPL
The [ERC-20-for-SPL contract](https://github.com/neonlabsorg/neon-evm/blob/c33b34bb624234955d88bf98a4ad1c95ddd453dc/evm_loader/solidity/erc20_for_spl.sol#L12) works with a precompiled contract within Neon EVM which can call the SPL token program. This enables you to utilize existing SPL tokens e.g. SOL or NEON, as wSOL or wNEON, respectively, via the ERC-20 interface, i.e. this contract assigns the [ERC-20 standard](https://eips.ethereum.org/EIPS/eip-20) to the token.


## ERC-20-for-SPL-Mintable
The [ERC-20-for-SPL-Mintable](https://github.com/neonlabsorg/neon-evm/blob/4bcae0f476721e5396916c43396ec85e465f878f/evm_loader/solidity/erc20_for_spl.sol#LL203C1-L203C1) contract has two additional methods that enable you to use the Neon EVM to mint a new SPL token and wrap it as ERC-20-compatible. This contract creates a new SPL token using Solana's Token Program and provides mint and freeze authority to the Neon account specified in the constructor.

| Contract            | Usage                                | Account requirements                               | Mint tx signed by                                                    |
| ------------------- | ----------------------------------- | ------------------------------------------ | -------------------------------------------------------------------- |
| ERC20ForSpl         | Wrap Solana-minted token | 1\. Neon Account<br></br>2\. Existing SPL token | Signed by the Solana account private key (via linked Phantom wallet) |
| ERC20ForSplMintable | Mint a token on Solana   | 1\. Neon Account                           | Signed by the Neon account private key (via linked MetaMask wallet)  |



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

Note that before setting up this contract, you must register the token's [Metaplex metadata](https://docs.metaplex.com/programs/token-metadata/overview).

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


### Contract Interface

```solidity
interface IERC20 {
    function decimals() external view returns (uint8);
    function totalSupply() external view returns (uint256);
    function balanceOf(address who) external view returns (uint256);
    function allowance(address ow ERC-20 SPL-Wrapperer, address spender) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    function approveSolana(bytes32 spender, uint64 value) external returns (bool);
    event ApprovalSolana(address indexed owner, bytes32 indexed spender, uint64 value);
}
```

The purpose of each function in the IERC20 interface is detailed below:
  * `decimals()` — Returns the number of decimals used to get its user representation. For example, if `decimals` equals 2, a balance of 505 tokens should be displayed to a user as 5,05 (505 / 10 * 2).

  * `totalSupply()` — Returns the amount of tokens in existence.

  * `balanceOf(address account)` — Returns the amount of tokens owned by the `account`.

  * `allowance(address owner, address spender)` — Returns the remaining number of tokens that a `spender` will be allowed to spend on behalf of the `owner` through `​​​​​​​transferFrom`​​​​​​​. This is zero by default.

  * `transfer(address recipient, uint256 amount)` — Sends the specified `amount` of tokens from the caller's account balance to the `recipient's` account balance.

  * `approve(address spender, uint256 amount)` — Sets an `amount` as the spender's allowance over the caller's tokens.

  * `transferFrom(address sender, address recipient, uint256 amount)` — Transfers the `amount` of tokens from the `sender` to the `recipient`.

  * `approveSolana(bytes32 spender, uint64 value)` — Allows ***Solana*** user `spender` to withdraw from the caller's account multiple times up to the `value` amount. Only one Solana `spender` can exists at the time. Translates into SPL token `Approve` instruction.

### Restrictions

According to the SPL token structure, an unsigned 64-bit floating point number is used to store the balance; in ERC-20, it's an unsigned 256-bit floating point number. Based on the unsigned 64-bit floating point standard, the maximum balance and transfer amount is (2^64-1)/(10^9), with 9 decimals of accuracy.

### Find the Token Account Address

The token account for a given wallet address is a program-derived account consisting of the following constants: the Ethereum wallet address itself, the ERC-20 contract address, and the token mint.

The account address can be derived in Rust with:

```rust
const ACCOUNT_SEED_VERSION: u8 = 1;

fn token_address(owner: &H160, contract: &H160, mint: &Pubkey, neon_evm: &Pubkey) {
    let seeds: &[&[u8]] = &[&[ACCOUNT_SEED_VERSION], b"ERC20Balance", &mint.to_bytes(), contract.as_bytes(), owner.as_bytes()];
    Pubkey::find_program_address(seeds, neon_evm)
}
```

### Create the Token Account

Accounts hold token balances and are created using the `ERC20CreateTokenAccount` instruction.

This instruction can be created in Rust with:

```rust
fn create_token_account(funding: Pubkey, owner: H160, contract: H160, mint: Pubkey, neon_evm: Pubkey) {
    let (token_address, _) = token_address(&owner, &contract, &mint, &neon_evm);
    let (wallet_address, _) = Pubkey::find_program_address(&[&[ACCOUNT_SEED_VERSION], owner.as_bytes()], &neon_evm);
    let (contract_address, _) = Pubkey::find_program_address(&[&[ACCOUNT_SEED_VERSION], contract.as_bytes()], &neon_evm);

    Instruction::new_with_bincode(
        neon_evm,
        &(15_u8),
        vec![
            AccountMeta::new(funding, true),
            AccountMeta::new(token_address, false),
            AccountMeta::new_readonly(wallet_address, false),
            AccountMeta::new_readonly(contract_address, false),
            AccountMeta::new_readonly(mint, false),
            AccountMeta::new_readonly(system_program::id(), false),
            AccountMeta::new_readonly(spl_token::id(), false),
            AccountMeta::new_readonly(sysvar::rent::id(), false)
        ]
    )
}
```
