---
title: Chainlink
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

## Introduction

[Chainlink Data Feeds](https://data.chain.link/) are the quickest way to connect your smart contracts to oracle data such as asset prices. 

Chainlink is implemented as a smart contract on Neon EVM making Chainlink Data Feeds from the Solana network available for smart contracts to consume. 


Each Chainlink feed is available via its own contract. To use a feed, you create a "hybrid" smart contract, i.e. you build the integration with the feed contract into your own smart contact and deploy that. Learn more from [Chainlink's documentation](https://docs.chain.link/data-feeds/solana).


## Deployed feeds

The Chainlink controller contract is deployed on [Devnet](https://devnet.neonscan.org/address/0x878738FdbCC9Aa39Ce68Fa3B0B0B93426EcB6417). This contract implements the [`AggregatorV3Interface`](https://docs.chain.link/docs/price-feeds-api-reference/#aggregatorv3interface) to support the following feeds:

### Devnet

|Currency pair|Chainlink contract feed address|
|:----:|:-----:|
|BTC/USD|0x878738FdbCC9Aa39Ce68Fa3B0B0B93426EcB6417|
|ETH/USD|0x7235B04963600fA184f6023696870F49d014416d|
|LINK/USD:0xc75E93c4593c23A50cff935F8916774e02c506C7|
|SOL/USD|0xec852B2A009f49E4eE4ffEddeDcF81a1AD1bbD6d|
|USDC/USD|0xedc0d80E85292fEf5B0946DEc957563Ceb7C8e6c|
|USDT/USD|0xE69C1E63ef3E95bE56A50f326aC97Bb7994890aD|


<!-- 
The following is advice on deploying the Chainlink contract NOT deploying a hybrid contract setup to consume chainlink feeds. This may be of use to NLabs devs, but is not end-user material:

## How to Use

You can learn more from the [hoodieshq/chainlink-neon](https://github.com/hoodieshq/chainlink-neon) repo.

Once deployed, the contract implements [`AggregatorV3Interface`](https://docs.chain.link/docs/price-feeds-api-reference/#aggregatorv3interface) in accordance with the best practices of the Chainlink Data Feeds
usage. Follow the official Chainlink documentation to get the [latest](https://docs.chain.link/docs/get-the-latest-price/) or [historical](https://docs.chain.link/docs/historical-price-data/) prices from the data feeds.

Below is an example

```js
// Consuming data example using JavaScript

// Input is expected to be passed via environment variables for the sake of brevity
// `ORACLE_ADDRESS` – deployed address of the contract
// `ROUND` – identifier of the round.

const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3(new Web3.providers.HttpProvider("https://proxy.devnet.neonlabs.org/solana"));
const aggregatorV3InterfaceABI = JSON.parse(fs.readFileSync("./AggregatorV3Interface.json"));

const contract = new web3.eth.Contract(aggregatorV3InterfaceABI, process.env.ORACLE_ADDRESS)

contract.methods.version().call().then((version) => { console.log("version:", version) })
contract.methods.description().call().then((description) => { console.log("description:", description) })
contract.methods.decimals().call().then((decimals) => { console.log("decimals:", decimals) })
contract.methods.latestRoundData().call().then(({ roundId, answer, startedAt, updatedAt, answeredInRound }) => {
  console.log("latestRoundData:", { roundId, answer, startedAt, updatedAt, answeredInRound })
})

contract.methods.getRoundData(process.env.ROUND).call()
  .then(({ roundId, answer, startedAt, updatedAt, answeredInRound }) => {
  console.log("getRoundData:", { roundId, answer, startedAt, updatedAt, answeredInRound })
  })
  .catch(console.log)
```

### How to Deploy

1. Create a `.secret` file with a mnemonic passphrase of the account you want to deploy the oracle contract from.
2. Edit `truffle-config.js` to set the Neon EVM network you want to deploy to. Neon EVM devnet is already available there as `devnet`.
3. Choose [Chainlink Data Feed address](https://docs.chain.link/docs/solana/data-feeds-solana/) on the corresponding Solana network from [devnet](https://docs.chain.link/docs/solana/data-feeds-solana/#Solana%20Devnet) or [mainnet](https://docs.chain.link/docs/solana/data-feeds-solana/#Solana%20Mainnet)
4. Convert the address from Solana format (base58 encoded) to 32 bytes hex. You can use [online CyberChef converter](https://gchq.github.io/CyberChef/#recipe=From_Base58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',true)To_Hex('None',0)).
5. Deploy the contract using

```sh
$ FEED_ADDRESS=<address> truffle migrate --network <network>
```
 -->