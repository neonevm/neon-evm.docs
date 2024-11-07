---
title: 'Configure Foundry'
proofedDate: 20231116
iterationBy: na
includedInSite: true
approvedBy: na
comment: Trying to return link that was killing the build todo test
---

Foundry is a blazing fast, portable,modular toolkit for Ethereum application development written in Rust.

## Introduction

This page details several parameters required to configure Foundry. The Foundry framework isn't described here; find that in the [Foundry documentation](https://book.getfoundry.sh).

## Prerequisites

- cURL

## Foundry configuration

Unlike other toolkits, Foundry doesn't have a config file to hold the chain parameters, instead, parameters are passed into commands.

1. The following command deploys a contract using a script:

```
forge script script/TestERC20/DeployTestERC20.s.sol:DeployTestERC20Script --broadcast --rpc-url $RPC_URL_DEVNET --legacy --skip-simulation
```

The parameters for `forge script` command include:

- `--rpc-url`: RPC URL
- `--skip-simulation`: This parameter skips the on-chain simulation which doesn't work on Neon EVM.
- `--broadcast`: This parameter broadcasts the transaction.
- `--legacy`: This parameter is being passed to use legacy transactions _(Neon EVM currently [doesn't support EIP-1559 transactions](/docs/evm_compatibility/overview#shared-standards-and-features))_

2. The following command deploys a contract directly without a script:

```
forge create --rpc-url $RPC_URL_DEVNET \
--private-key $PRIVATE_KEY \
--constructor-args "Test ERC20 Token" "TERC20" --legacy \
src/TestERC20/TestERC20.sol:TestERC20
```

The parameters for `forge create` command include:

- `--rpc-url`: RPC URL
- `--private-key`: The private key of the transaction signer
- `--constructor-args`: The constructor arguments to be passed to the contract that is being deployed
- `--legacy`: This parameter is being passed to use legacy transactions _(Neon EVM currently [doesn't support EIP-1559 transactions](/docs/evm_compatibility/overview#shared-standards-and-features))_

3. The following command fetches the total supply of wNEON from Neon Mainnet contract:

```
$ cast call --rpc-url https://neon-proxy-mainnet.solana.p2p.org/ 0x202C35e517Fa803B537565c40F0a6965D7204609 "totalSupply()" --trace
```

This will output the result as:

```
Traces:
  [327] 0x202C35e517Fa803B537565c40F0a6965D7204609::totalSupply()
    └─ ← [Return] 0x000000000000000000000000000000000000000000007df4c0bc89d9a1ce65b6

Transaction successfully executed.
Gas used: 21391
```

The parameters for `forge create` command include:

- `--rpc-url`: RPC URL
- `--trace`: Flag used to display the stack trace of the function call

:::important
`--trace` flag is mandatory for the `cast call` command to get the result of the function call.
:::

### What next? See the [tutorial on how to use Foundry](/docs/developing/deploy_facilities/using_foundry) to deploy on Neon EVM.
