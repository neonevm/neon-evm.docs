---
title: Why Neon EVM?
proofedDate: 20230426
iterationBy: HB
includedInSite: true
approvedBy: YYY
comments: na
---

import infographic from '@site/static/img/doc-images/about/infographic.png';

*Neon EVM is a low-friction solution to scale Ethereum dApps on Solana.*


<div className='neon-img-box-300' style={{textAlign: 'center', width: 600, display: 'block', margin: 'auto'}}>

<img src={infographic} />


</div>

## Neon EVM

Neon EVM is a fully compatible Ethereum environment solution built on the Solana blockchain. The platform allows developers to deploy Ethereum dApps without undertaking any reconfiguration. 

> Minimal reconfiguration required: Ethereum developers can build without Rust.

Neon EVM enables Solidity- and Vyper-based dApps to tap into Solana’s network benefits: low fees, high transaction speeds, and parallel transaction execution capabilities.

From a developer’s perspective, this means creating Solana-compatible contracts using tools you’re familiar with from the Ethereum Ecosystem. 

Neon EVM makes the key Ethereum dApp tools compatible with Solana, including Vyper, Solidity, [MetaMask](/docs/wallet/metamask_setup), [Hardhat](/docs/developing/deploy_facilities/using_hardhat), [Truffle](/docs/developing/deploy_facilities/using_truffle), and [Remix](/docs/developing/deploy_facilities/using_remix). The solution allows any Ethereum application to run on Solana with minimal reconfiguration required, this includes Uniswap, SushiSwap, 0x, and MakerDAO. 


### Who uses Neon EVM?

Neon EVM serves any developers or product teams who wish that their dApp could reach customers on Solana. Teams interested in the significant savings thanks to the low gas fees, or scaling with the high throughput that Solana provides are likely to be the first movers. Neon EVM also opens up the liquidity on Solana to DeFi products.

## The best from Ethereum

Ethereum has firmly established itself as a significant blockchain ecosystem, providing a robust settlement layer. However, Ethereum's gas prices and transaction speeds create such challenges for dApps that an entire L2 and rollup ecosystem has erupted to address these issues.

Neon EVM offers a better solution: by bringing Solana's sophisticated and low-cost transaction capabilities to Ethereum builders.

With Neon EVM, developers retain:

* Familiar languages: Solidity, Vyper
* Well-known Ethereum tools: MetaMask, Hardhat, Truffle, Remix, etc.
* Ethereum RPC API compatibility
* Ethereum Accounts, Signatures, Token standards (ERC-20 and ERC-721)


## The best from Solana

Solana is one of the most technically advanced and innovative blockchains: offering low gas fees and high throughput of transactions. Among these innovations is its Proof-of-Stake (PoS) consensus system, that is reinforced via a Proof-of-History (PoH) protocol. Solana's transaction parallelization technology optimizes resources and ensures horizontal scaling across GPUs and SSDs. Furthermore, Solana's optimized mempool system speeds up throughput.

Solana offers developers:

* Parallel execution of transactions (txs)
* Low gas fees: 0.000015 SOL/tx
* High transaction speed: 2,000+ tps
* Access to the growing Solana Ecosystem
* Solana's consensus mechanism and state, with no additional validators

## Public and audited

Not only is Neon EVM available on [GitHub](https://github.com/neonevm/neon-evm) for interested parties to examine and review, it has also passed several audits, such as:
- [Neon EVM audit](https://github.com/neonevm/neon-evm/tree/develop/audit)
- [Neon Proxy audit](https://github.com/neonevm/proxy-model.py/tree/develop/audit)
- [DAO governance protocol audit](https://github.com/neonevm/neon-spl-governance/tree/main/audit)


