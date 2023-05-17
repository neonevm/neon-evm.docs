---
title: ERC-20 for SPL Tokens
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comments: #1 TODO update text #fix broken link -- see inline comment
---

The ERC-20 SPL wrapper contract provides access to native Solana tokens registered in the SPL token contract, through the ERC-20 interface.

This allows Solana applications to interact with EVM (Solidity, Vyper, etc.) bytecode contracts. The ERC-20 SPL wrapper can also be used to transfer funds in Solana tokens using Ethereum wallets such as MetaMask.

The contract is implemented in Rust as part of the Neon EVM program.

Source code:
  * [Rust source code](https://github.com/neonlabsorg/neon-evm/blob/c43345d7abf7af14aa840e6b15c0fc64b084bb2c/evm_loader/program/src/precompile_contracts.rs#L106)
  * [Solidity wrapper source code](https://github.com/neonlabsorg/neon-evm/blob/6ac1734658f0fdcac09092bd98979d4f6fe4530d/evm_loader/solidity/erc20_for_spl.sol#LL12C11-L12C11)

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

### Finding the Token Account Address

The token account for a given wallet address is a program-derived account consisting of the following constants: the Ethereum wallet address itself, the ERC-20 contract address, and the token mint.

The account address can be derived in Rust with:

```rust
const ACCOUNT_SEED_VERSION: u8 = 1;

fn token_address(owner: &H160, contract: &H160, mint: &Pubkey, neon_evm: &Pubkey) {
    let seeds: &[&[u8]] = &[&[ACCOUNT_SEED_VERSION], b"ERC20Balance", &mint.to_bytes(), contract.as_bytes(), owner.as_bytes()];
    Pubkey::find_program_address(seeds, neon_evm)
}
```

### Creating the Token Account

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
