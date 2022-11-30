---
title: ERC-20 for SPL Tokens
---

The ERC-20 SPL wrapper contract provides access to native Solana tokens registered in the SPL token contract, through the ERC-20 interface. This allows Solana applications to interact with EVM (Solidity, Vyper, etc.) bytecode contracts. The ERC-20 SPL wrapper can also be used to transfer funds in Solana tokens using Ethereum wallets such as MetaMask.

To transfer ERC-20 (add neonpass description here)

The contract is implemented in Rust as part of the Neon EVM program, and is accessible via two wrappers written in Solidity: one for direct interaction, and the other for interaction using a factory.

Source code:
  * [Rust source code](https://github.com/neonlabsorg/neon-evm/blob/c43345d7abf7af14aa840e6b15c0fc64b084bb2c/evm_loader/program/src/precompile_contracts.rs#L106)
  * [Solidity direct wrapper source code](https://github.com/neonlabsorg/neon-evm/blob/develop/evm_loader/solidity/erc20_for_spl.sol)
  * [Solidity factory wrapper source code](https://github.com/neonlabsorg/neon-evm/blob/develop/evm_loader/solidity/erc20_for_spl_factory.sol)

## Direct Wrapper

### Contract Interface

```solidity
interface ERC20ForSpl {
    function name() public view returns (string memory);
    function symbol() public view returns (string memory);
    function decimals() public view returns (uint8);
    function totalSupply() public view returns (uint256);
    function balanceOf(address who) public view returns (uint256);
    function allowance(address owner, address spender) public view returns (uint256);
    function approve(address spender, uint256 amount) public returns (bool);
    function transfer(address to, uint256 amount) public returns (bool);
    function transferFrom(address from, address to, uint256 amount) public returns (bool);
    function burn(uint256 amount) public returns (bool);
    function burnFrom(address from, uint256 amount) public returns (bool);
    function approveSolana(bytes32 spender, uint64 amount) public returns (bool);
    function transferSolana(bytes32 to, uint64 amount) public returns (bool);
    function claim(bytes32 from, uint64 amount) external returns (bool);
    function claimTo(bytes32 from, address to, uint64 amount) public returns (bool)

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    event ApprovalSolana(address indexed owner, bytes32 indexed spender, uint64 amount);
    event TransferSolana(address indexed from, bytes32 indexed to, uint64 amount);
}
```

The purpose of each function in the ERC20ForSpl interface is detailed below:
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

### Example

## Factory Wrapper

### Contract Interface
Deploying ERC-20 tokens on Neon is much simpler when using the factory method. There are only three relevant public functions, which are intuitive and take care of a lot of detailed execution "behind the scenes".

```solidity
interface ERC20ForSplFactory {
    event ERC20ForSplCreated(bytes32 _mint, address pair, uint);

    function allErc20ForSplLength() external view returns (uint);
    function createErc20ForSpl(bytes32 _mint) public returns (address erc20spl);
    function createErc20ForSplMintable(string memory _name, string memory _symbol, uint8 _decimals, address _mint_authority) public returns (address erc20spl)
}
```

The purpose of each function in the ERC20ForSpl interface is detailed below:
  * `allErc20ForSplLength()` — Returns the number of existing ERC-20 token wrappers on Neon for SPL tokens.
  * `createErc20ForSpl()` — Returns the address of a new ERC-20 token wrapper for an existing SPL token.
  * `createErc20ForSplMintable()` — Creates a new SPL token and a corresponding ERC-20 wrapper, and returns the address of this ERC-20 token wrapper.

### Example: Deploying a New Token
The following example will demonstrate how to create a new ERC-20 token wrapper and a corresponding SPL token using the factory interface. The complete repository, with all necessary dependencies as well as local deployment instructions, can be found [here](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-spl-hardhat).

First, we need to require the Hardhat library and set up the main function. This function will get the ERC-20 contract factory and deploy it via the contract deployer with inputs to create a new "Test token".
```solidity
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const ERC20 = await hre.ethers.getContractFactory("ERC20ForSplMintable");
  const erc20_for_spl = await ERC20.deploy(
    "Test token",
    "TPL",
    9,
    deployer.address
  );
```

The function now waits for the deployment to be completed, after which point it prints the address of the new ERC-20 token.
```solidity
  await erc20_for_spl.deployed();
  console.log("Contract address is: ", erc20_for_spl.address);
```

Now that the token has been created, we can use the token contract's minting capability to mint new tokens to the deployer's address.
```solidity
  const amount = 100 * 10 ** 9;
  console.log("Minting ", amount, " tokens...");
  await erc20_for_spl.mint(deployer.address, amount);
}
```

Finally, some routine error-catching is required in case something goes wrong in the main function.
```solidity
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```
