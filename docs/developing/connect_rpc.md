---
title: Connect to Neon RPC
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

import chainlist_raw from '@site/static/img/doc-images/developing/chainlist/chainlist.png';

This tutorial provides an overview of how to connect to a Neon RPC. You will:
- [Select a Neon Proxy](https://chainlist.org/?chain=245022926&testnets=true&search=Neon)
- Connect an EVM-compatible wallet to that Proxy

> The [Proxy Operator you choose](#choose-a-remote-proxy) is responsible for settling your Neon transactions on Solana

## Connect MetaMask to Neon EVM

1.1 Visit [Neon's Chainlist](https://chainlist.org/?chain=245022926&testnets=true&search=Neon) page.

1.2 Expand the card for the network of your choice. 

> <img src={chainlist_raw} width="450" />

Notice, that should several Proxy Operators offer public RPC endpoints, you may now select which you want.

1.3 Select Proxy Operator

> See the section below to understand more about [choosing a Proxy](#choose-a-remote-proxy).

1.4 Connect your wallet

**** 


## Choose a Remote Proxy

Before sending a transaction to the Neon EVM, users should choose the Operator that is optimal for them to perform the transaction. The Operator is not chosen directly, but through the proxies they serve.

The Proxy interacts with one EVM loader, which can be deployed in different Solana chains. This interaction allows the proxy to be used on different networks (Testnet, Devnet, Mainnet Beta).


## Connect Dev tools to Neon EVM

To connect to a proxy using Remix, Truffle, or Hardhat, check out the following resources:
* [Using Remix](developing/deploy_facilities/using_remix.md)
* [Using Truffle](developing/deploy_facilities/using_truffle.md)
* [Using Hardhat](developing/deploy_facilities/using_hardhat.md)

Please note that, for Truffle and Hardhat, you need to configure the configuration file by setting either the `HDWalletProvider` provider (for Truffle) or the URL and the `network_id`/`chainId` to the RPC URL (and ID) selected from the table above. This is described in detail in the relevant tutorial sections.

## Connect Manually with MetaMask
The above steps demonstrate how to connect to the Solana cluster via Chainlist. Alternatively, you can connect to the Neon EVM [manually via MetaMask](wallet/metamask_setup.md#setting-up-an-rpc-network).
