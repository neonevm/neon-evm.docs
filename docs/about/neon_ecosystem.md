---
title: Neon Ecosystem
---

## Neon EVM core

**Neon EVM program** is a smart contract on the Solana blockchain. This allows Neon EVM to receive Ethereum-like transactions and process them on Solana according to Ethereum rules. Ethereum transactions going through Neon EVM, called Neon Transactions, are used as inputs for the targeted Neon Clients.

**Neon Proxy** is an essential tool for packaging a Neon transaction into a Solana transaction. It improves the user experience for Operators in the Neon ecosystem, and it allows Ethereum dApps to be ported to Neon with virtually no code or configuration changes as all the “translating” is handled by the proxy.

**Neon Operator** run Neon Proxy servers, which helps facilitate seamless execution of Ethereum-like transactions on Solana. This allows Ethereum dApps to be ported to Neon with no code change.

**Tokens** - on Neon EVM you can use
* [NEON token](/docs/tokens/neon_token) as a gas
* [ERC-20 with SPL](/docs/developing/deploy_facilities/interacting_with_spl_tokens) under the hood

[**Gas fees**](/docs/tokens/gas_fees)

## Integrations

**Tracer API** is an extension for Neon Proxy: for historical requests Neon Labs implemented a Tracing API to help developers better test, debug, and understand their smart contracts on the Neon EVM. The API will give developers a full externality trace on any transaction executed on the chain. They’ll be able to rerun historic transactions, run new transactions on historic states, and analyze the state of the blockchain after the execution of each instruction.

More details are available in [our blog](https://medium.com/neon-labs/neon-proxy-tracing-api-fdb3842a80fa)

**Oracles** provide a way for the decentralized Web3 ecosystem to access price feeds and other external (off-chain) data sources. Neon EVM supports querying data from Solana deployed Oracles:  
* [Chainlink](/docs/developing/integrate/oracles/integrating_chainlink)
* [Pyth](/docs/developing/integrate/oracles/integrating_pyth)
