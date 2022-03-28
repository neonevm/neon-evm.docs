# Introduction

> *Neon EVM is an [Ethereum virtual machine](https://ethereum.org/en/developers/docs/evm/) on Solana that enables dApp developers to use Ethereum tooling to scale and get access to liquidity on Solana.*

## Abstract

Neon EVM is a tool that allows Ethereum-like transactions to be processed on [Solana](https://docs.solana.com/introduction), taking full advantage of the functionality native to Solana, including the ability to execute transactions in parallel. As such, Neon EVM allows dApps to operate with the low gas fees, high transaction speed, and high throughput of Solana, while also offering access to the growing Solana market.

The Ethereum state is represented by a [Merkle-Patricia Trie](https://doc.neonlabs.org/docs/glossary/#merkle-patricia-trie) that stores key-value data for all smart contracts, and smart contracts written in Solidity do not have separate references to shared data and contracts’ code. Therefore, these smart contracts have to be executed in sequence to ensure deterministic behavior. This limits a throughput: highly optimized blockchains with EVM are capable of processing up to a maximum of 1,500 transactions per second (TPS).

Solana, however, is designed to support massive scaling of decentralized applications, with a maximum throughput of more than 50,000 TPS. To take full advantage of Solana's functionality, Neon EVM is built as a smart contract of Solana. This flexibility also ensures that: Neon EVM can be updated with ease when new Ethereum functionality is introduced.

In the case of Neon EVM, Ethereum-like transactions are wrapped into Solana transactions by an intermediary proxy server, and sent to Neon EVM, which executes them in parallel. To facilitate this parallel execution of smart contracts, Neon EVM ensures that each contract keeps its data in its own Solana storage, and account balances used to pay for Neon transactions are also separated.

The solution allows any Ethereum application to be run on Solana without any changes to its codebase, including Uniswap, SushiSwap, 0x, and MakerDAO. All key Ethereum dApp tools can also work on Solana, including Solidity, MetaMask, Remix, and Truffle.

Neon EVM is best suited to developers who want to enjoy a first-mover advantage and reach new customers on Solana, or those who want to scale with the low gas fees and high throughput that Solana provides. It is also good for developers looking to tap into liquidity on Solana.

## Why Neon EVM
Ethereum is set to remain booming blockchain ecosystem. The number of active dApps on Ethereum is hovering above 300 and the number of active users of these dApps is close to 6 million, with the number of transactions on the rise. Ethereum’s popularity is not only down to its processing of smart contracts, but also its sophisticated infrastructure for application development. 

Solana is one of the most technically advanced and innovative blockchains offering low gas fees and high throughput of transactions. Among these innovations is its Proof-of-Stake consensus system, which is reinforced via a Proof-of-History protocol, a transaction parallelization technology that optimizes resources and ensures that Solana can scale horizontally across GPUs and SSDs, along with an optimized mempool system that speeds up throughput. 

Neon EVM is a cross-chain solution that allows dApp developers to access the advantages of Solana to expand their services: to offer new products like arbitrage or high-frequency trading, grow their user base, and decrease costs where possible, including gas fees. Neon EVM enables full compatibility with Ethereum on Solana. 
