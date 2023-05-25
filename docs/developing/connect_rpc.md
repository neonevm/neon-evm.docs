---
title: Connect to Neon RPC
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

import chainlist_raw from '@site/static/img/doc-images/developing/chainlist/chainlist-raw-2.png';

This tutorial provides an overview of how to connect to a Neon RPC via Chainlink. You will:
- [Select a Neon Proxy](https://chainlist.org/?chain=245022926&testnets=true&search=Neon+EVM)
- Connect an EVM-compatible wallet to that Proxy

> The [Proxy Operator you choose](#choose-a-remote-proxy) is responsible for settling your Neon transactions on Solana.

## Connect via Chainlink
To connect an EVM-compatible wallet such as MetaMask to Neon EVM:  

1.1 Visit [Neon's Chainlist](https://chainlist.org/?chain=245022926&testnets=true&search=Neon+EVM) page.

1.2 Expand the card the details the network of your choice. 

> <img src={chainlist_raw} width="450" />

Notice, that should several Proxy Operators offer public RPC endpoints, this means you have a choice over who to use.

1.3 Accept the default Proxy Operator

If your chosen Proxy Operator is not the default proivded during the wallet connection step, you will need to [connect manually](#connect-manually).

> See the section below to understand more about [choosing a Proxy](#choose-a-remote-proxy).

1.4 Connect your wallet

Click "Approve" to connect your wallet.

### Choose a remote Proxy

Before sending a transaction to the Neon EVM, users should choose the Operator that is optimal for them to perform the transaction. The Operator is not chosen directly, but through the proxies they serve.

The Proxy interacts with one EVM loader, which can be deployed in different Solana chains. This interaction allows the Proxy to be used on different networks (currently, Testnet, Devnet, Mainnet Beta).


## Connect dev tools to Neon EVM

To connect to a proxy using Remix, Truffle, or Hardhat, check out the following resources:
* [Using Remix](developing/deploy_facilities/using_remix.md)
* [Using Truffle](developing/deploy_facilities/using_truffle.md)
* [Using Hardhat](developing/deploy_facilities/using_hardhat.md)

Please note that, for Truffle and Hardhat, you need to configure the configuration file by setting either the `HDWalletProvider` provider (for Truffle) or the URL and the `network_id`/`chainId` to the RPC URL (and ID) selected from the table above. This is described in detail in the relevant tutorial sections.

## Connect manually
The above steps demonstrate how to connect to a Solana cluster via Chainlist. Alternatively, you can connect to the Neon EVM manually. While steps may differ slightly according to your EVM-compatible wallet, the principles will closely match the tutorial on connecting [manually via MetaMask](wallet/metamask_setup.md#option-b-manual-configuration).
