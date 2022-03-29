---
title: Choosing a Neon Proxy
---

*This guide describes how to choose a Neon proxy to send a transaction to Solana.*

Before sending a transaction to Neon EVM, a user can choose an operator the most acceptable for them to perform the transaction. The operator is not chosen directly, but through the proxies they serves.

Neon EVM provides users with the [table](clusters/neon_proxy_rpc_endpoints.md) containing [RPC](about/terminology.md#remote-procedure-call-rpc) URLs of all available proxies, each served by a separate operator. Each URL corresponds to the operator's public key, which they uses to sign and send a transaction to Neon EVM.

Proxy interacts with one EVM loader, which can be deployed in different Solana chains. This interaction allows the proxy to be used on different networks (Testnet, Devnet, Mainnet Beta).

> **Note:**  
> Currently, the table contains just a list of URLs of proxies using in [MVP](about/terminology.md#minimum-viable-product-mvp) on Mainnet. With the development of Neon EVM, this table will be supplemented with statistical indicators evaluating the operator's service and the capabilities of their proxy. A user will choose an operator based on these indicators. Depending on the resources (proxy capabilities) provided by operators, the "gas price" will be different for each operator. Hence, the transaction cost will also be differ and depend on the RPC URL selected from the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table).
>
> *For instance.* If a transaction does not require huge resources, a user can choose the URL with the lowest "gas price", that is, choose a proxy with limited resources. To perform important operations, it will make sense for the user to choose URL with the higher "gas price", that is, to choose the operator providing the highest quality service.
>
> The table data will be provided to users in real time.

To connect to a proxy using Metamask/Truffle follow the instructions below.

## Connecting to a proxy using MetaMask

To connect to a proxy using Metamask follow the instruction [Installing and setting up MetaMask](wallet/metamask_setup.md). You need to specify the `New RPC URL` field selected from the [table](clusters/neon_proxy_rpc_endpoints.md), and also specify the `Chain ID`.

## Connecting to a proxy using Truffle

To connect to a proxy using Truffle follow the instruction [Debugging Contracts via Truffle](https://docs.neon-labs.org/docs/devportal/using_truffle). You need to configure `truffle-config.js` by setting the HDWalletProvider library to the RPC URL selected from the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table).

## Connecting to a proxy using Hardhat

To connect to a proxy using Hardhat follow the instruction [Debugging Contracts via Hardhat](https://docs.neon-labs.org/docs/devportal/using_hardhat). You need to configure `hardhat.config.js` by setting the url, network_id/chainId to RPC URL selected from the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table).
