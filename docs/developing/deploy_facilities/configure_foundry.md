---
title: "Configure Foundry"
proofedDate: 20231116
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

Foundry is a blazing fast, portable,modular toolkit for Ethereum application development written in Rust.

## Introduction

This page details several parameters required to configure Foundry. The Foundry framework isn't described here; find that in the [Foundry documentation](https://book.getfoundry.sh).

## Prerequisites
- cURL

## Foundry configuration

Unlike other toolkits, Foundry doesn't have a config file to hold the chain parameters, instead, parameters are passed into commands. For example, this comand deploys a smart contract:

```
forge create --rpc-url $RPC_URL_DEVNET \
--private-key $PRIVATE_KEY \
--constructor-args "Test ERC20 Token" "TERC20" --legacy \
src/TestERC20/TestERC20.sol:TestERC20
```

The parameters for `forge create` command include:
* `--rpc-url`: RPC URL
* `--private-key`: The private key of the transaction signer
* `--constructor-args`: The constructor arguments to be passed to the contract that is being deployed
* `--legacy`: This parameter is being passed to use legacy transactions _(Neon EVM currently [doesn't support EIP-1559 transactions](/docs/evm_compatibility/overview#shared-standards-and-features))_

## What next?

See the [tutorial on how to use Foundry](/docs/developing/deploy_facilities/using_foundry) to deploy to Neon EVM].
