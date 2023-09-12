---
title: Operate a Neon Proxy
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

*This guide is for people who want to register with Neon EVM as a Proxy Operator for processing transactions on Solana. We assume you have prior experience compiling Solana-based blockchain nodes, or have worked as a blockchain validator.*

## Introduction
Ethereum dApps may run their smart contract-based applications on Solana via Neon EVM. Modified smart contracts generate transactions in accordance with the Ethereum rules. These are submitted to the Neon EVM and broadcast as Neon transactions. Since the structures of Ethereum and Solana transactions differ from each other, Neon EVM contains special Proxy servers that are responsible for packing and executing transactions in Solana. These servers are configured and maintained by Neon EVM Proxy Operators.

This page introduces the Proxy Operator's duties, and the following pages provide instructions to ensure the successful operation of a Proxy; including the successful execution of transactions.

## Duties of a Proxy Operator
A Proxy Operator's main task is to install software on a server in order to provide an RPC endpoint to accept transactions formed according to Ethereum rules, and ensures their execution in Solana. 

This involves:
 * Configuring at least [2 instances of the proxy server](#redundancy) to perform the following operations:
    * Receive requests over Web3 API protocol
    * Shape responses using Web3 API protocol
 * Connect a Proxy server to a Solana cluster RPC endpoint
 * Successfully execute transactions

:::note
All operations related to the execution of transactions on Solana are performed by the software installed on your node.
:::

### Hardware requirements

Please make sure you have hardware that meets the corresponding minimum requirements before proceeding.

<Tabs>
  <TabItem value="basic" label="Basic" default>

For testing, the minimum recommended hardware is:

|Component|Requirement                           |
|-----|:-----------------------------------------|
|Operating System | Linux (Ubuntu/CentOS recommended) |
|CPU | 4 vCPU |
|RAM | 8 GB |
|Storage | 500 GB |
  </TabItem>
  <TabItem value="self-managed" label="Self-Managed">

To provide a public Proxy service, the minimum recommended hardware is:

|Component|Requirement                           |
|-----|:-----------------------------------------|
|Servers/VMs | At least two (2) with Intel Processor x86_64 |
|CPU | 16 vCPU (for each server/VM) |
|RAM | 32 GB (for each server/VM) |
|Storage | 1 TB |
  </TabItem>
</Tabs>

### Redundancy

To provide fault tolerant (24x7) Neon Proxy availability, the Neon team recommends that Neon Operators run two instances of the Neon Proxy, each with the same number of [Neon Operator keys](accounts#the-operator-key). This maintains the service even if one of the servers should fail. Each Neon Proxy can process 350 TPS. 

> For example, if the Neon Operator has 40 keys, our recommendation is to run each instance of the Neon Proxy with 20 keys. 

As a Kubernetes service, Neon Proxy instances will rebalance user requests and user transactions.

## Testing

Running a local node of Solana, Proxy, and the Neon EVM supports users who are interested in testing, developing, and learning how to interact with Neon EVM. Whether you wish to deploy smart contracts, conduct transactions, or interact with the deployed NeonEVM smart contract, running a local Proxy solution will assist. 

To use Neon EVM's Mainnet entry point to Proxy, you must be on the allowlist, *whereas* running your own local installation does not require approval. 

While Solana does not recommend running a Solana instance from a container, it does work and is useful for testing. Running Solana in a container also allows users to quickly reset the Solana state and retrieve the hardware space claimed by the node.

There are several options available to developers who wish to test transactions on Neon EVM.

## 1. Local Neon Proxy to local Solana

[This page](basic.md) provides a walk-through for option 1.

## 2. Local Neon Proxy to remote Solana

It is also possible to run Neon Proxy locally and configure it to use a public RPC endpoint to access Solana.

## 3. Remote Neon Proxy to remote Solana

Most dApps will use this service model to process their transactions via Neon EVM.

> Prior to Neon EVM's Mainnet launch, options 2 and 3 are available for Solana's Testnet and Devnet.