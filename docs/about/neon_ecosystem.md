---
title: Quick Look at Neon EVM
---

<div className='neon-img-box-300' style={{textAlign: 'center', width: 700, display: 'block', margin: 'auto'}}>

![](img/neon_ecosystem.png)

</div>

## Neon EVM Core

**​​Neon EVM** facilitates the usage of Ethereum tooling by dApp developers to scale and access liquidity on Solana. Neon EVM offers Ethereum ecosystem dApp developers increased throughput and swift block time on Solana, with low gas prices and no need for changing code – anyone can run Ethereum contracts on Solana with Neon EVM.

**Ethereum Tooling**: [MetaMask](/docs/wallet/metamask_setup), [Hardhat](/docs/developing/deploy_facilities/using_hardhat), [Truffle](/docs/developing/deploy_facilities/using_truffle), [Remix](/docs/developing/deploy_facilities/using_remix)

**The Neon EVM program** is a smart contract on the Solana blockchain. This allows Neon EVM to receive Ethereum-like transactions and process them on Solana according to Ethereum rules. Ethereum transactions going through Neon EVM, called Neon Transactions, are used as inputs for the targeted Neon clients.

The [NEON token](/docs/tokens/neon_token) is used to pay the [gas fees](/docs/tokens/gas_fees) required for transaction execution
**Neon Proxy** is an essential tool for packaging a Neon transaction into a Solana transaction. It improves the user experience for operators in the Neon ecosystem, and it allows Ethereum dApps to be ported to Neon with virtually no code or configuration changes, as all the “translating” is handled by the proxy.

**Neon operators** run Neon Proxy servers, which helps facilitate seamless execution of Ethereum-like transactions on Solana. This allows Ethereum dApps to be ported to Neon with no code change.

**Tokens** - on Neon EVM you can use:
* [NEON token](/docs/tokens/neon_token) as a gas
* [ERC-20 with SPL](/docs/developing/deploy_facilities/interacting_with_spl_tokens) under the hood
* [NeonPass](/docs/token_transferring/neonpass_usage) to transfer tokens between Solana and Neon EVM


## Integrations

**Tracing API** is an extension for Neon Proxy. For historical requests, Neon Labs implemented a Tracing API to help developers better test, debug, and understand their smart contracts on Neon EVM. The API will give developers a full externality trace on any transaction executed on the chain. They’ll be able to rerun historic transactions, run new transactions on historic states, and analyze the state of the blockchain after the execution of each instruction. More details are available in [our blog](https://medium.com/neon-labs/neon-proxy-tracing-api-fdb3842a80fa)

**Oracles** provide a way for the decentralized Web3 ecosystem to access price feeds and other external (off-chain) data sources. Neon EVM supports querying data from Solana deployed Oracles:  
* [Chainlink](/docs/developing/integrate/oracles/integrating_chainlink)
* [Pyth](/docs/developing/integrate/oracles/integrating_pyth)
