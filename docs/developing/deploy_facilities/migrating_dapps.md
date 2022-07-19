---
title: Migrating dApps to the Neon EVM
---

*The purpose of this document is to demonstrate to Ethereum users how easily their dApps can be ported to the Neon EVM. Using [Neon Swap](about/terminology.md#neonswap) as an example, we wil show you how to run dApps on [Solana](https://docs.solana.com/introduction) without any software code changes.*

Every dApp includes a contract and software supporting that contract. In the Neon EVM, all dApps are deployed via Neon proxies. To deploy a dApp, it needs to send a request to a proxy, after which the proxy will automatically deploy contracts of the dApp in the Neon EVM environment. Contracts are loaded into a chain, and the software is deployed on a separate server for providing users interaction with these contracts.

In this tutorial, you will learn how to port Uniswap services to the Neon EVM environment. Since we do not have native keys to Uniswap, we will use a fork of Uniswap-V2 called [NeonSwap](about/terminology.md#neonswap).

Migrating dApps to the Neon EVM is done in three stages: 

**Stage 1** - Deploying contracts in a Neon EVM environment  
**Stage 2** - Checking if the deployed contracts work correctly   
**Stage 3** - Deploying the interface of the contracts  

## Stage 1. Deploying Contracts in a Neon EVM Environment

Using [NeonSwap](about/terminology.md#neonswap) as an example, we can demonstrate that no changes to software serving contracts are required to port dApps. Changes are made only to those components that are necessary for its operation on he Neon EVM.

The contracts are built by a typical Solidity compiler used in Ethereum. After compilation, all the necessary contracts are deployed on the Neon EVM using a [Web3](about/terminology.md#web-3) proxy. This proxy provides a standard interface that Ethereum utilities and tools can use.

For example, Uniswap includes the following list of contracts that need to be deployed:
  * Governance
  * Uniswap-v2-periphery
  * Multicall

### Changes for Deploying Contracts

When deploying Uniswap in Neon EVM contracts, the following changes were made:
  * The timeout value was increased.
  * The number of repeated requests for transaction recipes was increased:  
```js
// The call  
    wait factoryV1.createExchange(WETHPartner.address, overrides)
// was replaced with  
    let id = await factoryV1.createExchange(WETHPartner.address, overrides) let receipt = await provider.waitForTransaction(id.hash, 3)
```
  * Added the `deploy contracts()` method.

Due to the fact that we did not have native keys to Uniswap, we had to change the addresses of the following uploaded contracts:
  * UNI_ADDRESS
  * TIMELOCK_ADDRESS
  * GOVERNANCE_ADDRESS
  * MULTICALL_ADDRESS
  * MIGRATOR_ADDRESS
  * FACTORY_ADDRESS
  * ROUTER1_ADDRESS
  * ROUTER_ADDRESS
  * V1_FACTORY_ADDRESS
  * WETH_ADDRESS

## Stage 2. Check if the Deployed Contracts Work Correctly

Contract health checks are performed in a real blockchain, not in a test environment, which is fully managed.

Unlike the test environment, in a real working blockchain the range of test operations cannot be performed in full. For example, operations such as generating a block with a specified number of transactions are excluded. In a blockchain, all operations are real-time, and a user checking the contracts cannot influence the block generation.

To test [NeonSwap](about/terminology.md#neonswap), we use the entire set of Uniswap-v2-core tests available in their repository for testing on Ethereum. The method of running these tests has been changed. Before running the tests, it is indicated that the deployment of contracts, calls to their methods, as well as testing takes place not in the test framework, but in the real blockchain.

> For testing, we use an unmanaged environment. However, in Uniswap-v2-core tests (in contracts), there are sections of program code that contain environment management. In these pieces, we were able to successfully replace the environment management to expectation for a reaction from a chain. That is, where the block is to be generated, a delay is set. Then an action is performed and the reaction of the contract is evaluated; namely, whether it meets the expectation or not. At the same time, we believe that the number of blocks produced may be different.

The need to adapt tests is because tests must issue correct results regardless of the run conditions.

### Changes for Running the Uniswap-v2-core Test Suite
 The following changes were made to run the Uniswap-v2-core test suite in the Neon EVM:
  * Increased timeouts when expanding contracts
  * Changed ChainId
  * Replaced the rcp-request libraries, including the following: `Web3Provider` and `MockProvider` replaced with `JsonRpcProvider`
  * Changed the test using the `mineBlock()` method
  * Increased the number of re-requests in the `ethereum-waffle` library for receiving transaction receipts, including the following:
```js
// In the file  
uniswap-v2-core/node_modules/@ethereum-waffle/chai/dist/cjs/matchers/emit.js  
// the line  
const derivedPromise = promise.then((tx) => contract.provider.getTransactionReceipt(tx.hash) ).then((receipt) => {  
// was replaced with  
const derivedPromise = promise.then((tx) => contract.provider.waitForTransaction(tx.hash, 3) ).then((receipt) => {  
```
  * Increased the value of `gasLimit` in the `ethereum-waffle` library.

## Stage 3. Deploying the Uniswap Interface
After the addresses of the contracts have been loaded into the Neon EVM, we can start deploying the Uniswap interface. It is necessary to recall that we are using a real blockchain, and our contracts are located in this blockchain.

### Changes for the NeonSwap Interface
For the [NeonSwap](about/terminology.md#neonswap) interface to function successfully in the Neon EVM, the following  were made:
  * Added a new testnet to the adapted NeonSwap interface code. The name of the new network with the new chain-ID is registered in all places where it was used:
    * Added `ChainId LOCAL` to dependent libraries and sources.
    * ChainID, url was specified in the .env file.
  * For the new network, a set of the loaded contracts was registered. In the `node_modules` directory, the addresses of contracts in the sources and dependent libraries were replaced.

****  

> **More details**  
> A quick guide to using NeonSwap can be found in [How to Swap ERC-20 Tokens](developing/utilities/neonswap.md).  
>  
> All changes we made for porting the Uniswap service to the Neon EVM can be found in the [Uniswap-v2-core Repository](https://github.com/neonlabsorg/uniswap-v2-core).
