---
title: "Configure Brownie"
---

[Brownie](https://eth-brownie.readthedocs.io/en/stable/) is a Python-based development and testing framework for smart contracts targeting the Ethereum Virtual Machine.

With [Brownie](https://eth-brownie.readthedocs.io/en/stable/#features), you get:
* Full support for Solidity and Vyper
* Contract testing via pytest, including trace-based coverage evaluation
* Property-based and stateful testing via hypothesis
* Powerful debugging tools, including python-style tracebacks and custom error strings
* Built-in console for quick project interaction
* Support for ethPM packages

For a tutorial on how to use Brownie to deploy on the Neon EVM, see [here](/docs/developing/deploy_facilities/using_brownie).

## Prerequisites
Before you start, make sure the following software is installed on your device:
  * [`eth-brownie`](https://eth-brownie.readthedocs.io/en/stable/install.html)

Also make sure that the following is true:
  * MetaMask is installed on your device. To install MetaMask, follow [this guide](wallet/metamask_setup.md#installing-metamask). 
  * MetaMask is configured for the Neon EVM.

## Network Configurations
  * [Solana cluster](https://docs.solana.com/clusters) is accessed via a proxy.
  * Solana works in test mode and the proxy interacts with it through Neon EVM.

## The Brownie Configuration File

To deploy a contract to the Neon EVM with Brownie, some Neon-specific information must be specified in a configuration file. This configuration YAML file is called `brownie-config.yaml` and is located at the root of your project directory. Its file schema, variables, and other documentation can be found on the [official Brownie website](https://eth-brownie.readthedocs.io/en/stable/config.html). Please note that the deployer wallet address needs to have enough NEON tokens to cover the gas cost of the deployment. NEON tokens for Devnet can be obtained using the [NeonFaucet](developing/utilities/faucet.md).

The following is a full example, configured for the example below, of the `brownie-config.yaml` configuration file for connecting Brownie to a devnet-proxy:

```yaml
dotenv: .env
networks:
    default: neon-devnet
    neon-devnet:
        chainid: 245022926
        host: https://devnet.neonevm.org
        id: neon-devnet
        name: Devnet
        default_contract_owner: false
        gas_buffer: 1.1
        gas_limit: auto
        gas_price: auto
        max_fee: null
        priority_fee: null
        reverting_tx_gas_limit: false
```

## Importing a Network Separately

Alternatively, it is possible to add networks to Brownie via the command line, without using the `brownie-config.yaml` configuration file. When adding a public network, Brownie requires at the very minimum `chainid`, `host`, and `id` (the network ID). To do so, create a configuration file (e.g., `network-config.yaml`) with the network information, and run
```bash
brownie networks import ./network-config.yaml
```
