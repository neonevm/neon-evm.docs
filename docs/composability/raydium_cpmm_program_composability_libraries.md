---
title: 'Raydium CPMM program composability libraries'
proofedDate: 20250618
iterationBy: na
includedInSite: true
approvedBy: Greg
---

# Raydium CPMM program composability libraries

## Repository

[Raydium program Solidity libraries](https://github.com/neonevm/neon-contracts/tree/main/contracts/composability/libraries/raydium-cpmm-program)

## Exmaple contract
[CallRaydiumProgram](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/CallRaydiumCPMMProgram.sol) - example contract demonstrating how the Raydium program Solidity libraries can be used in practice to interact with Solana's Raydium program.

## Libraries

### _LibRaydiumCPMMProgram_ library
This library provides helper functions for formatting instructions to be executed by _Solana_'s **Raydium** 
program.

#### Available Raydium CPMM program instructions
* `createPoolInstruction` - Deploying CPMM pool on Raydium for selected tokens pair. This method also returns the needed `lamports` amount for the instruction to be processed successfully in Solana, this amount constains several account creations plus the pool creation fee paid to Raydium. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMProgram.sol#L30)
* `addLiquidityInstruction` - Adding liquidity for selected tokens pair. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMProgram.sol#L152)
* `withdrawLiquidityInstruction` - Withdrawing liquidity from selected tokens pair. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMProgram.sol#L246)
* `lockLiquidityInstruction` - Locking liquidity position. This method also returns the needed `lamports` amount for the instruction to be processed successfully in Solana, this amount constains several account creations plus a fee if `withMetadata` is set to `true`. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMProgram.sol#L331)
* `collectFeesInstruction` - Collecting fees for locked LP position. This instruction can be sent to Solana only if there is already existing locked LP position and there are some pending fees to be collected. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMProgram.sol#L460)
* `swapInputInstruction` - Swapping exact token input amount, example - swap 100 tokensA for X tokensB. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMProgram.sol#L559)
* `swapOutputInstruction` - Swapping tokens to exact token output amount, example - swap X tokensA for 100 tokensB. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMProgram.sol#L605)

### _LibRaydiumCPMMData_ library
This library provides a set of getter functions for querying different accounts & data. Also some calculations such as swap input or output amount; convert LP amount to tokens amounts; etc. Here are some of the getters:
* `getPoolData` - Returns the data of Raydium CPMM pool. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMData.sol#L150)
* `getConfigData` - Returns the data for requested utils index. [Info](https://github.com/neonevm/neon-contracts/blob/main/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMData.sol#L173)
* `getTokenReserve` - Returns pool token reserve for selected token mint. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMData.sol#L194)
* `getPoolLpAmount` - Returns the pool's LP amount. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMData.sol#L199)
* `lpToAmount` - Converts LP amount to reserves amounts. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMData.sol#L204)
* `getSwapOutput` - Returns a swap quote of provided exact input amount. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMData.sol#L224)
* `getSwapInput` - Returns a swap quote of provided exact output amount. [Info](https://github.com/neonevm/neon-contracts/blob/main/contracts/composability/libraries/raydium-cpmm-program/LibRaydiumCPMMData.sol#L240)


### _LibRaydiumCPMMErrors_ library
This library provides a set of custom errors that may be thrown when using **LibRaydiumCPMMProgram** and **LibRaydiumCPMMData** libraries.
