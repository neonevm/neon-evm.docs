---
title: Setting up the Development Environment
---

As a new, aspiring Neon developer, your first step of exploring the Neon EVM framework is to set up your development environment. As mentioned in the Introduction, you need to have a [**proxy**](architecture/neon_evm_arch.md/#neon-web3-proxy-proxy), which wraps Ethereum-like transactions into Solana transactions and sends them, and a **Solana cluster**, where the resulting transactions are executed.

There are several ways to do set up proxy and Solana cluster:
  * [Option 1:](developing/dev_environment/op1_remote_proxy_remote_solana.md) The proxy is hosted on a remote virtual server. Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used.
  * [Option 2:](developing/dev_environment/op2_local_proxy_remote_solana.md) The proxy is hosted locally. Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used.
  * [Option 3:](developing/dev_environment/op3_local_proxy_local_solana.md) Both the proxy and Solana are hosted locally. (Debug mode, which allows you to configure your node locally.)

> **Note:** [Testnet](https://docs.solana.com/clusters#testnet), like [Devnet](https://docs.solana.com/clusters#devnet), is an alternative cryptocurrency chain exclusively for developers. It allows developers to run their node on a test blockchain and experiment and develop without losing real currency to gas fees and other endeavors. The Mainnet, Testnet, and Devnet tokens are incompatible with each other. Testnet and Devnet tokens have no value, and developers cannot transfer Mainnet tokens to Testnet/Devnet. Conversely, Testnet/Devnet tokens cannot be transfered to Mainnet. It is recommended for developers to use the Devnet rather than the Testnet when testing their code.

It is important to set up the most appropriate development environment for your purposes and use cases. Refer to the [Choosing a Neon Proxy](developing/dev_environment/choosing_proxy.md) section to learn more about which Neon proxy to connect to. 