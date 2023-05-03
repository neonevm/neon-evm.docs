---
title: EVM Compatibility Overview
---



TL;DR

- Apply (most of) Ethereum's standard JSON RPC API methods
- Direct the calls to Neon's Proxy
- There are some differences and limitations to consider

## Introduction

Interacting with Neon EVM is essentially the same as interacting with the [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/).

Neon EVM provides a proxy service that accepts [Ethereum's standard RPC API](https://ethereum.github.io/execution-apis/api-documentation/). Your dAPP can apply familiar methods: with your calls directed to the [Neon Proxy](todo link to page on proxy) rather than an Ethereum L1 node.

In this way, Neon EVM provides a seamless developer experience. Note that there are some differences and considerations. 

## Shared standards and features

Solidity or Vyper smart contracts, standard development and deployment tools and practices can all be applied on Neon EVM with almost no code changes:

- Neon EVM accounts follow [Ethereum's account standards](https://ethereum.org/en/developers/docs/accounts/) 

> A subset of [Ethereum OpCodes](todo replace link with yellowpaper https://www.evm.codes/?fork=merge) are represented verbatim on Neon EVM. 

> <!-- we need a page on the not supported OpCodes Anton will send by slack-->

- Apply Ethereum's standard JSON RPC API based on the Ethereum Client API, the Web3 Module API, and the Net Module API

> See the [supported JSON RPC API methods and the backlog](./json_rpc_api_methods).

## Notable differences

Interoperability between Solana and Ethereum EVMs does require certain adaptations. In addition to Solana-specific restrictions, two major differences include:

### Precompiles
Neon supports a subset of precompiled contracts defined on [evm.code](https://www.evm.codes/precompiled?fork=merge) that provide more advanced functionalities, with [certain limitations](./precompiles#limitations) on some precompiled contracts on Neon EVM.

<!-- Requires a list Anton can provide by slack + explanation of WHY they are not supported-->

Neon also supports native precompiled contracts that are available to our users.

<!-- Requires a list Anton can provide by slack -->


### Gas calculation
The mechanism of gas consumption and calculation of gas fees on Neon EVM differ from Ethereum. Gas fees on Neon EVM are much cheaper than on Ethereum. 

<!-- Oleg could provide metrics on one transfer -- ?? once mainnet launched can we compare Neon + Solana to L2 and Rollups Yuri has for tx such as transfers and swaps -->

> Learn more about the [NEON token and how gas fees work on Neon EVM](../../docs/tokens/gas_fees.md).

Several Solana-specific differences also impact smart contract development.

### Upper limit on number of Accounts
Neon EVM uses [Solana Transaction V2](https://docs.solana.com/proposals/transactions-v2): limiting the maximum number of accounts used in a single transaction to 64. Solana requires that all accounts used in a transaction be specified in order to ensure parallel execution of transactions. 

<!-- go deeper on HOW to modify the contract to constrain account numbers Anton will pass in slack
 -->

### Heap size
Ethereum-like transactions are executed by Neon EVM inside [Solana's Virtual Machine (VM)](https://docs.solana.com/developing/on-chain-programs/overview#berkeley-packet-filter-bpf). Solana's VM has heap memory limit of 256 KB. Consequently, the size of the heap allocated to a EVM, is limited to the same 256 KB.

To avoid the occurrence of a heap overflow error, it is recommended that you reduce the size of the:

- call stack 
- contract size
<!-- return to bullets -->

<!-- Can we support users further on HOW to reduce heap size? -->
<!-- Can we show logs ?screenshot and name of service? to demonstrate when the issue is heap size? == detection method ?? Oleg should be able to provide -->

<!-- Support address?? IF users are experiencing such issues, reach out to Yuri sending address -->


### Limitation on `block.timestamp` / `block.number` Usage
Time-related methods in addresses for mapping indexes, namely `block.timestamp` and `block.number`, behave differently from Ethereum and developers are **strongly cautioned** against using them when developing on Neon EVM. 

The following code snippet is correct on Ethereum, but is **not** correct on Neon, due to the usage of `block.timestamp`.
```javascript
function create_new_element_timestamp() external {
	block_timestamp = block.timestamp;
	test_mapping[block_timestamp] = 100;
}
```
