---
title: EVM Compatibility Overview
proofedDate: na
iterationBy: HB
includedInSite: true
approvedBy: na
comments: #1 we need a page on the not supported OpCodes Anton will send by slack #2 Requires supported precompiles Anton can provide by slack + explanation of WHY they are not supported #3 Requires a list of native precomiled contracts Anton can provide by slack [actually, the yellow paper https://ethereum.github.io/yellowpaper/paper.pdf is not a great source for the opcodes -- using docs instead]
---

## TL;DR

- Apply (most of) Ethereum's standard JSON RPC API methods
- Direct the calls to Neon Proxy
- Solana and Ethereum differ: consider those differences the limitations they enforce

## Introduction

Interacting with Neon EVM is essentially the same as interacting with the [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/).

Neon EVM provides a proxy service that accepts [Ethereum's standard RPC API](https://ethereum.github.io/execution-apis/api-documentation/). Your dApp can apply familiar methods: with your calls directed to the [Neon Proxy](../about/neon_ecosystem#neon-proxy) rather than an Ethereum L1 node.

In this way, Neon EVM provides a seamless developer experience. Note that there are some differences and considerations due to some signigicant differences between Solana transaction requirements and the equivalent in EVM. 

## Shared standards and features

Solidity or Vyper smart contracts, standard development and deployment tools and practices can all be applied on Neon EVM with minimal reconfiguration:

- Neon EVM accounts follow [Ethereum's account standards](https://ethereum.org/en/developers/docs/accounts/) 

>  The majority of [Ethereum OpCodes](https://ethereum.org/en/developers/docs/evm/opcodes) are represented verbatim on Neon EVM. Learn about stacks: 41, 44, 45, and 48 [OpCodes](opcodes).
 
- Apply Ethereum's standard JSON RPC API based on the Ethereum Client API, the Web3 Module API, and the Net Module API

> See the [supported JSON RPC API methods](./json_rpc_api_methods).

## Notable differences

Interoperability between Solana and Ethereum EVMs does require certain adaptations. In addition to Solana-specific restrictions, two major differences include:

### Precompiles
Neon supports all precompiled contracts defined on [evm.code](https://www.evm.codes/precompiled?fork=merge) that provide more advanced functionalities, with [certain limitations](./precompiles#limitations) on some precompiled contracts on Neon EVM.


Neon also supports native precompiled contracts that are available to our users.


### Gas calculation
The mechanism of gas consumption and calculation of gas fees on Neon EVM differ from Ethereum. Gas fees on Neon EVM are much cheaper than on Ethereum. 

<!-- Oleg could provide metrics on one transfer. Once mainnet launched can we compare Neon + Solana to L2 and Rollups Yuri has for tx such as transfers and swaps -->

> Learn more about the [NEON token and how gas fees work on Neon EVM](../../docs/tokens/gas_fees.md).

Several Solana-specific differences also impact smart contract development.

### Upper limit on number of accounts
<!-- link to solana tx renamed and relinked -->
Neon EVM uses [Solana Transaction V0](https://docs.solana.com/developing/versioned-transactions): limiting the maximum number of accounts used in a single transaction to 64. Solana requires that all accounts used in a transaction be specified in order; to ensure parallel execution of transactions.

<!-- go deeper on HOW to modify the contract to constrain account numbers Anton will pass in slack
  -->

### Heap size
Ethereum-like transactions are executed by Neon EVM inside [Solana's Berkeley Packet Filter (BPF)](https://docs.solana.com/developing/on-chain-programs/overview#berkeley-packet-filter-bpf). The BPF has heap memory limit of 256 KB. Consequently, the size of the heap allocated to a contract call, is limited to the same 256 KB.

To avoid the occurrence of a heap overflow error, it's recommended that you reduce the size of the:
- call stack
- contract

<!-- support users further on HOW to reduce heap size?

Can we show logs ?screenshot and name of service? to demonstrate when the issue is heap size? == detection method ?? Oleg should be able to provide -->


### Limitation on `block.timestamp` / `block.number` usage
Time-related methods in addresses for mapping indexes, namely `block.timestamp` and `block.number`, behave differently from Ethereum and developers are **strongly cautioned** against using them when developing on Neon EVM. 

The following code snippet is correct on Ethereum, but is **not** correct on Neon, due to the usage of `block.timestamp`.
```javascript
function create_new_element_timestamp() external {
	block_timestamp = block.timestamp;
	test_mapping[block_timestamp] = 100;
}
```

## Support

Should you require further advice to help troubleshoot, create a ticket in the support-tickets channel in Neon Lab's [Discord](https://discord.gg/neonevm).