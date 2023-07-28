---
title: Connect to Neon RPC
proofedDate: 20230526
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

import chainlist_raw from '@site/static/img/doc-images/developing/chainlist/chainlist-raw-2.png';

## TL;DR
RPC endpoints are available on [Chainlist](https://chainlist.org/?chain=245022926&testnets=true&search=Neon+EVM).


## Introduction
This tutorial explains how to connect to a Neon RPC via Chainlist. You may connect an EVM-compatible wallet to a network and accept the default Proxy. Alternatively, you can mannually setup your Proxy Operator.

> The [Proxy Operator you choose](#choose-a-remote-proxy) is responsible for settling your Neon transactions on Solana. Chainlist will assign a default, but you can edit this later.

## Connect via Chainlist
To connect an EVM-compatible wallet such as MetaMask to Neon EVM:  

1.1 Visit [Neon's Chainlist](https://chainlist.org/?chain=245022926&testnets=true&search=Neon+EVM) page.

1.2 Click "Connect Wallet"

With most wallets, simply click "Approve" to connect your wallet.

> Chainlist assigns their default Proxy; you can reconfigure this.


## Choose a remote Proxy
Before sending a transaction to the Neon EVM, users should choose the Operator that's optimal for them to perform transactions. 

> Selecting the RPC address an Operator provides assigns your transactions to that Operator.

One Proxy may be available on different networks (i.e. Devnet and Mainnet). The Proxy interacts with one EVM loader, which can be deployed in different Solana chains. 

To view the available RPC endpoints, expand the card details of the network of your choice. 

> <img src={chainlist_raw} width="450" />

Notice that if several Proxy Operators offer public RPC endpoints, you have a choice over who to use.

If your chosen Proxy Operator isn't the default provided during the wallet connection step, you will need to [connect manually](#connect-manually).


## Connect manually
The preceding steps demonstrate how to connect to a Solana cluster via Chainlist. Alternatively, you can connect to the Neon EVM manually or edit your choice of Proxy. While steps may differ slightly according to your EVM-compatible wallet, the principles will closely match the tutorial on connecting [manually via MetaMask](wallet/metamask_setup.md#option-b-manual-configuration).

## Connect dev tools to Neon EVM
To connect to a Proxy using Remix, Truffle, or Hardhat, check out the following resources:
* [Using Remix](developing/deploy_facilities/using_remix.md)
* [Using Truffle](developing/deploy_facilities/using_truffle.md)
* [Using Hardhat](developing/deploy_facilities/using_hardhat.md)

Please note that, for Truffle and Hardhat, you need to set up the configuration file by setting either the `HDWalletProvider` provider (for Truffle) or the URL and the `network_id`/`chainId` to the RPC URL (and ID) selected from Chainlist. This is described in detail in the relevant tutorial sections.

## What next?

If you wish to transact via your RPC, then checkout the [supported RPC API methods](/docs/evm_compatibility/json_rpc_api_methods).