---
title: Connect to Neon RPC
---

This tutorial will give an overview of how to connect to a Neon RPC, resulting in a network confirguation where Neon is connected to a remote Proxy and to remote Solana.

At the end of this tutorial, your network configuration should assure the following:
  * The [Solana cluster](https://docs.solana.com/cluster/overview) being accessible via a proxy hosted on a remote virtual server.
  * Solana working in test mode (recommended) and the proxy interacting with it through the Neon EVM.

### Step 1: Connect MetaMask to the Neon EVM Devnet
Go to [Chainlist](https://chainlist.org/) and type `Neon` in the search bar. You should see `Neon EVM Devnet` and `Neon EVM MainNet`.

Select `Neon EVM Devnet` and click `Connect Wallet`. A MetaMask pop-up window will show. Click `Next` and then `Connect`. You can now access the [Solana cluster](https://docs.solana.com/clusters) and carry out transactions.

### Step 2: Choosing a Remote Proxy
Before sending a transaction to the Neon EVM, users should choose the operator that is optimal for them to perform the transaction. The operator is not chosen directly, but through the proxies they serve.

A table of RPC proxies operated by Neon Labs, shown below, has the following columns:
  * `Network (Chain ID)` — the Solana network and its identifier; the network determines what RPC URL proxy can be used.
  * `Operator name` — the name of the operator providing the proxy.
  * `RPC URL` — the address for interacting with the required proxy.

<table>
    <tr>
        <th >Network (Chain ID)</th>
        <th>Operator name</th>
        <th>RPC URL</th>
    </tr>
    <tr>
        <th>Mainnet (245022934)</th>
        <td><a href="https://neon-labs.org">Neon Labs</a></td>
        <td>https://mainnet.neonevm.org</td>
    </tr>
    <tr>
        <th>Devnet (245022926)</th>
        <td><a href="https://neon-labs.org">Neon Labs</a></td> 
        <td>https://devnet.neonevm.org</td>
    </tr>
    <tr>
        <th>Testnet (245022940)</th>
        <td><a href="https://neon-labs.org">Neon Labs</a></td>
        <td>https://testnet.neonevm.org	</td>
    </tr>
</table>

The proxy interacts with one EVM loader, which can be deployed in different Solana chains. This interaction allows the proxy to be used on different networks (Testnet, Devnet, Mainnet Beta).

For a complete table of the [RPC](about/terminology.md#remote-procedure-call-rpc) URLs of all available proxies, see [here](/docs/clusters/neon_proxy_rpc_endpoints/).

### Step 3: Connecting to a Proxy

To connect to a proxy using Remix, Truffle, or Hardhat, check out the following resources:
* [Using Remix](developing/deploy_facilities/using_remix.md)
* [Using Truffle](developing/deploy_facilities/using_truffle.md)
* [Using Hardhat](developing/deploy_facilities/using_hardhat.md)

Please note that, for Truffle and Hardhat, you need to configure the configuration file by setting the either the `HDWalletProvider` provider (for Truffle) or the URL and the `network_id`/`chainId` to the RPC URL (and ID) selected from the table above. This is described in detail in the relevant tutorial sections.

## Connecting Manually with MetaMask
The above steps demonstrate how to connect to the Solana Devnet cluster via Chainlist. Alternatively, you can connect to the Neon EVM Devnet [manually via MetaMask](wallet/metamask_setup.md#setting-up-an-rpc-network).