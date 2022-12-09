---
title: EVM Compatibility Overview
---

Neon EVM is designed to be compatible with the [Ethereum Virtual Machine (EVM)](https://ethereum.org/en/developers/docs/evm/) to provide a as seamless of a developer experience as possible, with some notable differences and considerations. 

## Shared Features
Coming from Ethereum, your Solidity smart contracts, development and deployment tools, and standard practices can be moved over to Neon EVM with minimal changes. Neon EVM accounts follow [Ethereum's account standards](https://ethereum.org/en/developers/docs/accounts/). All [Ethereum opcodes](https://www.evm.codes/?fork=merge) are represented verbatim on Neon EVM. 

## JSON RPC API
Neon EVM has its own set of [JSON RPC API methods](./json_rpc_api_methods). They are based on the Ethereum Client API, the Web3 Module API, and the Net Module API.

## Precompiles
Neon supports all precompiled contracts defined on [evm.code](https://www.evm.codes/precompiled?fork=merge) that provide more advanced functionalities, but there are [certain limitations](./precompiles#limitations) on some precompiled contracts on Neon EVM.

## Gas Calculation
The mechanism of gas consumption and calculation of gas fees on Neon EVM differ from Ethereum. You can learn more about the NEON token and how gas fees work on Neon EVM [here](../../docs/tokens/gas_fees.md).
<!-- https://docs.neon-labs.org/docs/tokens/gas_fees -->

## Other Neon-Specific Limitations

### Number of Accounts
Solana requires that all accounts used in a transaction be specified in order to ensure parallel execution of transactions. Using [Solana Transaction V2](https://docs.solana.com/proposals/transactions-v2), up to 64 accounts can be used in a single transaction. As Neon EVM uses Solana Transaction V2, it has the same limitation: the maximum number of accounts used in a single transaction is 64.

### Heap Size
Ethereum-like transactions are executed by Neon EVM inside [Solana's Berkeley Packet Filter (BPF)](https://docs.solana.com/developing/on-chain-programs/overview#berkeley-packet-filter-bpf). The BPF has a limit on heap memory of 256 KB. Consequently, the size of the heap allocated to a contract call, is limited to the same 256 KB.

To avoid the occurrence of a heap overflow error, it is recommended that you:
* Reduce the size of the call stack
* Reduce the number of variables used

### No `block.timestamp` / `block.number`
The usage of time-related methods, namely `block.timestamp` and `block.number`, in addresses for mapping indexes is **not** available.

The following code snippet is correct on Ethereum, but is **not** correct on Neon, due to the usage of `block.timestamp`.
```javascript
function create_new_element_timestamp() external {
	block_timestamp = block.timestamp;
	test_mapping[block_timestamp] = 100;
}
```
