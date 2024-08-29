---
title: 'Smart Contract Code Compatibility Checklist'
proofedDate: na
iterationBy: HB
includedInSite: false
approvedBy: na
comments: na
---

## Introduction

This page details the smart contract code compatibility factors that determine whether the smart contracts are fully compatible with Neon EVM or not.

## Smart contract compatibility factors

The following are the factors that determine the smart contract code compatibility with Neon EVM and the alternative solutions -

### Solidity Compiler version

If the contracts are not clean fork like Uniswap V2 or Aave V2 and the solidity compiler is very old i.e. < 0.8.x, it is always recommended to upgrade to the latest stable solidity compiler version and re-run the tests.
:::info
Solidity version ≥ 0.8.25 is not supported currently because of the need to implement EIP-5656 and EIP-1153. It will be supported on Devnet and Mainnet soon.
:::

### Usage of third-party protocols

There shouldn't be any usage of third party protocols that are not currently supported on Neon EVM.

### Usage of `block.number` and `block.timestamp`

1. `block.timestamp` and `block.number` shouldn't be used as an array or mapping key. More details can be found [here](https://docs.neonevm.org/docs/evm_compatibility/overview#limitation-on-blocktimestamp--blocknumber-usage)

2. `block.timestamp` and `block.number` shouldn't be used as an argument in `create2`(Deterministic deployments) since deterministic addresses are calculated based on the arguments provided.

### Usage of non-reentrancy safe methods `transfer()` and `send()`

`transfer()` and `send()` are not considered as reentrancy safe methods in Neon EVM. This is described [here](https://docs.neonevm.org/docs/evm_compatibility/overview#reentrancy-safe-approaches). It is recommended to use `call()` as an alternative for native token transfers.

```sh
contract Vulnerable {
    function withdraw(uint256 amount) external {
        // This forwards 2300 gas, which may not be enough if the recipient
        // is a contract and gas costs change.
        msg.sender.transfer(amount);
    }
}

contract Fixed {
    function withdraw(uint256 amount) external {
        // This forwards all available gas. Be sure to check the return value!
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success, "Transfer failed.");
    }
}
```

### Usage of unsupported OpCodes

There shouldn't be any usage of unsupported opcodes -

1. `gasleft()` or `gas()`
2. `block.coinbase`
3. `block.difficulty` / `block.prevrandao`
4. `block.gaslimit`
5. `block.basefee`
6. `selfdestruct` - The opCode behind this method will be deprecated soon. This can be mostly seen with the projects that uses [Seaport marketplace protocol](https://github.com/ProjectOpenSea/seaport/blob/main/contracts/zones/PausableZone.sol#L110). However, if `selfdestruct` is used only for tests/ mocks, this can be skipped.

The details of the unsupported opcodes are described [here](https://docs.neonevm.org/docs/evm_compatibility/opcodes).

### Usage of `multicall` methods

The smart contracts having `multicall` methods that includes more than one address or migration methods to recreate state from another chain results in exceeding the 64 accounts limit. This situation can be avoided by calling these methods in batches.

:::info
The restriction of 64 accounts doesn't translate directly to 64 addresses in Solidity. The limit may further decrease if there are additional internal calls between contracts.
:::

### Emitting big events data

Smart contracts shouldn't emit big data through events such as an array of bytes or strings or a single bytes or string variable through a `multicall` method, which eventually generates a big event log if there are a lot of multicall iterations.

Every Solana transaction which corresponds to a particular Neon EVM transaction, subject to an event limit of 128K bytes. If the transaction execution is in iterative mode, each Solana transaction within this process maintains a 128K byte limit for event logs.

If the data emitted by an event is more than 128K bytes, the transaction won't get reverted, but some of the event data won't be stored on-chain, causing some inconsistencies in the data stored.

### Usage of dynamic sized variable types

In Solidity versions before `0.8.15`, there is a limitation when using dynamic-sized variable types, such as `string` and `bytes`, as mapping values in functions invoked multiple times. This issue arises because reusing the same parameters of these types in transactions leads to increased consumption of Solana accounts.

For example:

```sh
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract MappingActions {
    mapping(uint256 => string) public mapping1;
    mapping(uint256 => bytes) public mapping2;

    function testMapping1() external {
        for (uint256 i = 0; i < 45; ++i) {
            mapping1[i] = 'Test 123 Hello';
        }
    }

    function testMapping2() external {
        for (uint256 i = 0; i < 45; ++i) {
            mapping2[i] = '0x1';
        }
    }
}
```

The transaction will fail with the error `Too many accounts` if the functions `testMapping1()` and `testMapping2()` are invoked more than once.

## Support

Should you require further advice to help troubleshoot, create a ticket in the support-tickets channel in [Neon's Discord](https://discord.gg/neonevm).
