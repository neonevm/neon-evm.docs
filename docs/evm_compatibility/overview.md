---
title: EVM Compatibility Overview
proofedDate: na
iterationBy: HB
includedInSite: true
approvedBy: na
comments: Missing -- details of tracer for source of historical data. Where in docs can this live?
---

import heap from '@site/static/img/doc-images/evm-compat/heap-overflow-error.png';


## TL;DR

- Apply (most of) Ethereum's standard [JSON RPC API methods](/docs/evm_compatibility/json_rpc_api_methods)
- Direct the calls to a [Neon RPC](/docs/developing/connect_rpc) via a Proxy Operator
- Solana and Ethereum differ: consider those differences and the limitations they enforce
- EIP-1559 not supported

## Introduction

Interacting with Neon EVM is essentially the same as interacting with any [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/).

Neon EVM provides a proxy service that accepts [Ethereum's standard RPC API methods](https://ethereum.github.io/execution-apis/api-documentation/). 

> Your dApp can apply familiar methods: with your calls directed to the [Neon Proxy](../about/neon_ecosystem#neon-proxy) rather than an Ethereum L1 node.

In this way, Neon EVM provides a seamless developer experience. Note that there are some differences and considerations due to some signigicant differences between Solana transaction requirements and the equivalent in EVM. 

## Shared standards and features

Solidity or Vyper smart contracts, standard development and deployment tools and practices can all be applied on Neon EVM with minimal reconfiguration of the code.

- Neon EVM accounts follow [Ethereum's account standards](https://ethereum.org/en/developers/docs/accounts/) 

>  Only a few [OpCodes](#opcodes) are not handled verbatim.

- Neon EVM supports type 0 / legacy transaction requests

> An Ethereum transaction request is either formed as an EIP-1559 transaction or a legacy transaction. For now, the Neon EVM accepts the legacy/type 0 and type 1 transaction formats.
 
- Apply Ethereum's standard JSON RPC API based on the Ethereum Client API, the Web3 Module API, and the Net Module API

> See the [supported JSON RPC API methods](./json_rpc_api_methods).

## Notable differences

Interoperability between Solana and Ethereum EVMs requires certain adaptations. In addition to Solana-specific restrictions, two major differences include:

### Precompiles

Neon supports all precompiled contracts defined on [evm.code](https://www.evm.codes/precompiled?fork=merge) that provide more advanced functionalities, with [certain limitations](./precompiles#limitations) on some precompiled contracts on Neon EVM.

Neon also supports native precompiled contracts that are available to our users.

<!-- todo once we have the details on this can link to page -->

### Opcodes

While the majority of OpCodes are supported verbatim, there are some that are handled differently. Learn about those [variant OpCodes](opcodes).

### Gas calculation

The mechanism of gas consumption and calculation of gas fees on Neon EVM differ from Ethereum. Gas fees on Neon EVM are much cheaper than on Ethereum because Solana is the settlement layer. 

> Learn more about the [NEON token and how gas fees work on Neon EVM](../../docs/tokens/gas_fees).

### Reentrancy-safe approaches

:::caution

Due to the difference in how gas is calculated in Neon EVM, Solidity's transfer() and send() are NOT reentrancy safe methods.
:::

Hardcoding gas is one method that programmers may apply to prevent reentrancy attacks. Within the Ethereum/Solidity ecosystem, it is possible to default gas to 2300 gwei by using `transfer()`and `send()`. However, since gas costs are now variable, these methods are [no longer advised](https://consensys.net/diligence/blog/2019/09/stop-using-soliditys-transfer-now/).

### Storage

Several Solana-specific differences also impact smart contract development. In Ethereum EVMs, there are two types of accounts, both of which are associated with a storage map which can be used to read and write arbitrary data:

- Basic accounts store an account balance
- Code accounts store EVM code

Solana’s Sealevel also provides two accounts which are assigned up to 256 consecutive storage slots; but they have different purposes: 

 - Executable

 > Executable accounts provide immutable storage of executable byte code or an (immutable) proxy address of an account which stores mutable executable byte code.

 - Non-executable

> Since executable accounts are immutable, their application state is stored in non-executable accounts.

The differences go deeper still. In an Ethereum EVM, contracts can only read and write their own storage. In Sealevel, any account’s data can be read or written to by a contract. However, the runtime enforces that only an account’s “owner” is allowed to modify it. Changes by any other programs will be reverted and cause the transaction to fail.


### Upper limit on number of accounts

When a contract requires storage slots within Solana, it may create Solana accounts and access these random addresses. However, this must be done with an awareness of the upper limit on the number of accounts. 

Neon EVM uses [Solana Transaction V0](https://docs.solana.com/developing/versioned-transactions): limiting the maximum number of accounts used in a single transaction to 64. Solana requires that all accounts used in a transaction be specified in order; to enable parallel execution of transactions.


:::info
Each Ethereum account involved in a transaction must be mapped to a corresponding Solana account. Any call made to the Ethereum account (e.g. to read balance, execute a transaction, etc.) requires that the Solana account is included to make use of the storage provided.

:::
<!-- based on item in Slack https://neonlabsworkspace.slack.com/archives/C03CQ8A6WTT/p1683107335962669  -->
<!-- go deeper on HOW to modify the contract to constrain account numbers -->

By constructing the contract logic differently, fixed-sized values and arrays can fit into a significantly smaller number of accounts.

```Solidity
 /*1 account: */
uint256[] list;
...

for (uint256 i = 0; i < 32; i++) {
   list[i] = i;
}
```

```Solidity
/* 32 accounts: */
mapping(uint256 => uint256) map;
...

for (uint256 i = 0; i < 32; i++) {
   map[i] = i;
}
```

<!-- todo looks like these code snippets will benefit at least a sentence to explain list vs map which is better and why -->

### Heap size
Ethereum-like transactions are executed by Neon EVM inside [Solana's Berkeley Packet Filter (BPF)](https://docs.solana.com/developing/on-chain-programs/overview#berkeley-packet-filter-bpf). The BPF has heap memory limit of 256 KB, i.e. the size of the heap allocated to a contract call, is limited to 256 KB.

:::info

This [Neon transaction](https://neonscan.org/tx/0x6bdc50921eaa8981e2f534e09139840fd176bf092bd835393ee4bab998409c0a) failed due to a heap overflow error. By viewing the [transaction on Sol scan](https://solscan.io/tx/3fuTXn8SiAwTrpG96VmhvuHQe9tssFv7y2yHFynVpM4d51uBZerehxZebPTFvKLs8b2wmnXmhxu5yhAwWdnUJLVC?cluster=devnet) you can access the log for the final (failing) transactions and view the "out of memory" errors.

<img src={heap} width="450" />

:::

Consider the following techniques if you need to troubleshoot a heap overflow error:

- Transactions: reduce the calldata size
- Deploying/calling contracts, reduce the:
	- Call depth
	- Contract binary size
	- Size of the function/constructor arguments
- Event emission
	- Use indexed parameters
	- Avoid strings, arrays, and mappings
- Returning values from a function
	- Don't return data you don't use!
	- Avoid strings, arrays, and mappings
- Local variables: avoid strings, arrays, and mappings


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

Should you require further advice to help troubleshoot, create a ticket in the support-tickets channel in [Neon's Discord](https://discord.gg/neonevm).