# Migrating dapps to Neon EVM

*The purpose of this document is to share the experience with Ethereum users how easily their dapps can be ported to Neon EVM. Using [Neon Swap](https://doc.neonlabs.org/docs/glossary#neonswap) as an example, we just want to show you how to run dapps on [Solana](https://docs.solana.com/introduction) without any software code changes.*

Any dapp includes a contract and a software supporting that contract. In Neon EVM, all dapps are deployed via neon proxies. To deploy a dapp, it needs to send a request to a proxy, after which this proxy automatically will deploy contracts of the dapp in the Neon EVM environment. Contracts are loaded into a chain, and the software is deployed on a separate server for providing users interaction with these contracts.

In this description we show you how you can port uniswap services to the Neon EVM environment. Since we do not have native keys to Uniswap, we will use a fork of Uniswap-V2 called as [Neon Swap](https://doc.neonlabs.org/docs/glossary#neonswap).

Migrating dapps to Neon EVM is done in 3 stages:  
**Stage 1.** Deploying contracts in a Neon EVM environment.  
**Stage 2.** Check if the deployed contracts work correctly.  
**Stage 3.** Deploying the interface of the contracts.

## Stage 1. Deploying contracts in a Neon EVM environment

Using [Neon Swap](https://doc.neonlabs.org/docs/glossary#neonswap) as an example, we can demonstrate that no changes to software serving contracts are required to port dapps. Changes are made only to those components that are necessary for its operation on Neon EVM.

The contracts are built by a typical Solidity compiler used in Ethereum. After compilation, all the necessary contracts are deployed on Neon EVM using a [Web 3](https://doc.neonlabs.org/docs/glossary#web-3) proxy. This proxy provides a standard interface that Ethereum utilities and tools can use.

For example, Uniswap includes the following list of contracts that need to be deployed:
  * Governance
  * Uniswap-v2-periphery
  * Multicall

### Changes for deploying contracts

When deploying Uniswap in Neon EVM contracts, we made the following changes to them:
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

## Stage 2. Check if the deployed contracts work correctly

Contracts health checking is performed in a real chain, not in a test environment, which is fully managed.

Unlike the test environment, in a really working chain, the range of test operations cannot be performed in full (for example, operations such as generating a block with a specified number of transactions, etc., are excluded). In a chain, all operations rely on real-time and a user checking the contracts cannot influence the block generation.

To test [Neon Swap](https://doc.neonlabs.org/docs/glossary#neonswap), we use the entire set of uniswap-v2-core tests available in their repository and used for testing on Ethereum. The method of running these tests has been changed. Before running the tests, it is indicated that the deployment of contracts, calls to their methods, as well as testing takes place not in the test framework, but in the real blockchain.

> For testing, we use an unmanaged environment. However, in uniswap-v2-core tests (in contracts), there are sections of program code that contain environment management. In these pieces, we were able to successfully replace the environment management to expectation for a reaction from a chain. That is, where the block is to be generated, a delay is set. Then an action is performed and the reaction of the contract is evaluated, namely, whether it meets the expectation or not. At the same time, we believe that the number of blocks produced may be different.

The need to adapt tests is due to the fact that tests must issue correct results regardless of the run conditions.

### Changes for running the uniswap-v2-core test suite
 The following changes were made to run the uniswap-v2-core test suite in Neon EVM:
  * Increased timeouts when expanding contracts.
  * Changed ChainId.
  * Replaced the rcp-request libraries, including the following: `Web3Provider` and `MockProvider` replaced with `JsonRpcProvider`.
  * Changed the test using the `mineBlock()` method.
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

## Stage 3. Deploying the Uniswap interface
After we have managed to get the addresses of the contracts loaded into the Neon EVM, we can start deploying the Uniswap interface. It is necessary to specify that we use a real blockchain and our contracts are located in this blockchain.

### Changes for the Neon Swap interface
For the [Neon Swap](https://doc.neonlabs.org/docs/glossary#neonswap) interface to function successfully in Neon EVM, we were made the following changes:
  * Added a new testnet to the adapted Neon Swap interface code. The name of the new network with the new chain-ID is registered in all places where it was used, including:
    * Added `ChainId LOCAL` to dependent libraries and sources.
    * ChainID, url was specified in the .env file.
  * For the new network, a set of the loaded contracts was registered. In the directory `node_modules`, the addresses of contracts in the sources and dependent libraries were replaced.

****  

> **More details**  
> A quick guide to using Neon Swap, you can find in [How to Swap ERC-20 Tokens](https://docs.neon-labs.org/docs/software_manuals/how_to_guides/swap_erc20).  
>  
> All changes we made for porting the uniswap service to Neon EVM can be found in the [uniswap-v2-core repository](https://github.com/neonlabsorg/uniswap-v2-core).
