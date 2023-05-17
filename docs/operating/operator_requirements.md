---
title: Operator Requirements
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comments: HB not sure how this page is being used in site map -- renders without sidebar TODO fix 
---

## Prerequisites

You must be registered in Solana, i.e. have access to public and private keys of an account with a balance of SOL tokens.

### Balance Recommendations

There is no strict minimum amount of SOL required to run as an operator on the Neon EVM. However, you should take into account that you will need tokens to create accounts for new users, deploy contracts, and execute transactions.

In addition to the balance for storing SOL tokens, an operator must also have the `NEON_TOKEN_MINT` balance for storing value tokens. These tokens are used to pay funds from users to an operator for the successful execution of transactions. Depending on the chosen configuration, specific values for `NEON_TOKEN_MINT` are indicated in the [table](operating/operator_guide.md#neon_token_mint).
<!-- bust link -->
To create the `NEON_TOKEN_MINT` balance, you can use the following command:
```
spl-token -u <Solana RPC node URL> create-account <NEON_TOKEN_MINT>
```

### Hardware Recommendations
We do not have strict hardware recommendations. The device specifications below are based on information obtained from official Solana [documentation](https://docs.solana.com/running-validator/validator-reqs).

#### The specifications recommended for your Neon EVM proxy are:

<table>
  <tbody>
    <tr><th></th><th>Minimum</th><th>Optimal</th><th>Points</th></tr>
    <tr><th align="right">CPU cores</th><td align="center">8</td><td align="center">16</td><td> >=2.8 GHz</td></tr>
    <tr><th align="right">RAM GB</th><td align="center">16</td><td align="center">32</td><td></td></tr>
    <tr><th align="right">Disk GB</th><td colspan="2" align="center">100</td><td></td></tr>
    <tr><th align="right"><a href="">Operator keys</a></th><td align="center"> 10-20</td><td align="center"> >20</td><td></td></tr>
  </tbody>
</table>

> Do not use a public or shared Solana RPC node for your Neon EVM proxy. Use only a device that you control.

In addition to the Neon EVM proxy, you need a Solana RPC node. It should be a dedicated RPC node with low latency to interact with your Neon EVM proxy.

The minimum specifications recommended to your Solana RPC node are:
  * CPU
    * 16 cores
    * EPYC Gen 2 or Gen 3
    * Core isolation
  * RAM
    * 256 GB memory
    * [Tmpfs](about/terminology.md#tmpfs)
  * Disk space
    * Depends on the transaction history required for storage

### Software Recommendations
The following software should be installed on your Neon EVM proxy:
  * OS
    * Ubuntu 20.04 or later
    * macOS Darwin 10.12 or later
  * Docker
  * Docker Compose

### Solana Cluster Requirements (optional)
If you want to use a local Solana cluster, you need to meet the following requirements:
  * Solana cluster with `--enable-rpc-transaction-history` enabled.
  * Solana cluster with `--enable-rpc-bigtable-ledger-storage` enabled.

### Networking
Internet service should be at least 300 Mbps.
