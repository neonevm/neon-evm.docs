---
title: Setting up the Development Environment
---

As a new, aspiring Neon developer, you can begin by exploring the Neon EVM framework and setting up your development environment. In order to connect to a Solana cluster, you need a proxy. Depending on your purposes, there are several ways to do so:
  * [Option 1:](developing/dev_environment/op1_remote_proxy_remote_solana.md) The proxy is hosted on a remote virtual server. Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used.
  * [Option 2:](developing/dev_environment/op2_local_proxy_remote_solana.md) The proxy is hosted locally. Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used.
  * [Option 3:](developing/dev_environment/op3_local_proxy_local_solana.md) Both the proxy and Solana are hosted locally. (Debug mode, which allows you to configure your node locally.)

> **Note:** [Testnet](https://docs.solana.com/clusters#testnet), like [Devnet](https://docs.solana.com/clusters#devnet), is an alternative cryptocurrency chain exclusively for developers. It allows developers to run their node on a test blockchain and experiment and develop without losing real currency to gas fees and other endeavors. The Mainnet, Testnet, and Devnet tokens are incompatible with each other. Testnet and evnet tokens have no value, and developers cannot transfer Mainnet tokens to Testnet/Devnet. Conversely, Testnet/Devnet tokens cannot be transfered to Mainnet.

Some considerations that should go into setting up the most appropriate development environment are:

[🔘 Choosing a Neon Proxy](developing/dev_environment/choosing_proxy.md) — Describes how to connect to an existing Neon Proxy  
[🔘 Connecting to the Neon Proxy](developing/dev_environment/connect_to_solana_via_proxy.md) — If you know which Neon Proxy suits your needs the best, the next step is to connect to the Solana cluster via a local or remote proxy server  
[🔘 Setting up a local Solana cluster](developing/dev_environment/solana_cluster/cluster_installation.md) — Describes how to install, configure, and test the local Solana cluster with Neon EVM onboard  