---
title: (Optional) Choosing a Remote Neon Proxy RPC
---

*This guide describes how to choose a Neon proxy to send a transaction to Solana.*

Before sending a transaction to the Neon EVM, users can choose the operator that is optimal for them to perform the transaction. The operator is not chosen directly, but through the proxies they serve.

The Neon EVM provides users with a [table](clusters/neon_proxy_rpc_endpoints.md) containing the [RPC](about/terminology.md#remote-procedure-call-rpc) URLs of all available proxies, each served by a separate operator. Each URL corresponds to the operator's public key, which it uses to sign and send a transaction to the Neon EVM.

The proxy interacts with one EVM loader, which can be deployed in different Solana chains. This interaction allows the proxy to be used on different networks (Testnet, Devnet, Mainnet Beta).

> **Note:**  
> Currently, the table contains only a list of URLs of proxies using [MVP](about/terminology.md#minimum-viable-product-mvp) on Mainnet. With the development of the Neon EVM, this table will be supplemented with statistical indicators evaluating the operator's service and the capabilities of their proxy. A user will choose an operator based on these indicators. Depending on the resources (proxy capabilities) provided by operators, the "gas price" will be different for each operator. Hence, the transaction cost will also be different and will depend on the RPC URL selected from this [table](clusters/neon_proxy_rpc_endpoints.md).
>
> *For instance,* if a transaction does not require huge resources, a user can choose the URL with the lowest "gas price", that is, choose a proxy with limited resources. To perform important operations, it will make sense for the user to choose the URL with the highest "gas price", that is, to choose the operator providing the highest quality service.
>
> The table data will be provided to users in real time.

To connect to a proxy using MetaMask/Truffle, follow the instructions below.

## Connecting to a Proxy Using MetaMask

To connect to a proxy using MetaMask, follow the instruction [Installing and Setting Up MetaMask](wallet/metamask_setup.md). You need to specify the `New RPC URL` field selected from the [table](clusters/neon_proxy_rpc_endpoints.md), and also specify the `Chain ID`.

## Connecting to a Proxy Using Truffle

To connect to a proxy using Truffle, follow the instructions [Using Truffle](developing/deploy_facilities/using_truffle.md). You need to configure `truffle-config.js` by setting the HDWalletProvider library to the RPC URL selected from the [table](clusters/neon_proxy_rpc_endpoints.md).

To deploy dApps using Truffle, please refer to the [Using Truffle](../deploy_facilities/using_truffle.md) guide.

## Connecting to a Proxy using Hardhat

To connect to a proxy using Hardhat, follow the instructions [Using Hardhat](developing/deploy_facilities/using_hardhat.md). You need to configure `hardhat.config.js` by setting the URL, network_id/chainId to RPC URL selected from the [table](clusters/neon_proxy_rpc_endpoints.md).

To deploy dApps using Hardhat, please refer to the [Using Hardhat](../deploy_facilities/using_hardhat.md) guide.
