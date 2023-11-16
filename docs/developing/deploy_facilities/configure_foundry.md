---
title: "Configure Foundry"
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.

Details on how to use the Foundry framework will not be described here. You can find all necessary information by reading the [Foundry documentation](https://book.getfoundry.sh).

For a tutorial on how to use Foundry to deploy on the Neon EVM, see [here](/docs/developing/deploy_facilities/using_foundry).

## Prerequisites
Before you start, make sure the following software is installed on your device:
  * `cURL` - You will need cURL to install Foundery, some operating systems ship curl by default. If your terminal doesn't support it you have to install it.

## The Foundry Configuration
Unlike other toolkits Foundry doesn't have a config file which is holding the chain parameters, instead everything is being passed into commands. This command is an example of how to deploy a smart contract:
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
* `--legacy`: This parameter is being passed to use legacy transactions _( Neon EVM currently doesn't support EIP-1559 transactions )_