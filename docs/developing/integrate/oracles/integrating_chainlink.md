---
title: Chainlink
proofedDate: 20230526
iterationBy: na
includedInSite: true
approvedBy: na
comment: todo boilerplate as Remix link also
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

[Chainlink data feeds](https://data.chain.link/) are the quickest way to connect your smart contracts to oracle data such as asset prices. 

Chainlink is implemented as a smart contract on Neon EVM, making Chainlink data feeds from the Solana network available for smart contracts to consume. 

Each Chainlink feed is available via its own contract. To use a feed, you create a "hybrid" smart contract, i.e. you build the integration with the feed contract into your own smart contract and deploy that. Learn more from [Chainlink's documentation](https://docs.chain.link/data-feeds/solana), or examine the [boilerplate provided](#boilerplate-contract).


## Deployed feeds

The Chainlink controller contract is deployed on Devnet. This contract implements the [`AggregatorV3Interface`](https://docs.chain.link/docs/price-feeds-api-reference/#aggregatorv3interface) to support the following feeds:

<Tabs>

  <TabItem value="Mainnet" label="Mainnet">

|Currency pair|Chainlink contract feed address|
|:----:|:-----:|
|AVAX/USD|0x1d6E632542B7E405FAA8D26C4805C981260A9e70|
|BTC/USD|0x002A8368a4fd76C1809765ea66a9AFa3D424d8e0|
|BNB/USD|0x3c864365f961f1fb31a6682EB388E84832fd159C|
|DAI/USD|0xa13Cbd21e5De770Bb9104B951B0b0a876c46ef85|
|ETH/USD|0xC55B1E0c36A69e2b40BD16759434B071F4bBe8df|
|LINK/USD|0x22eE81bFA94049c9d880e81c5d40b12423307DFb|
|MATIC/USD|0x5864ccda29c78845460639021287c3f192350816|
|OP/USD|0x996c00D1E9DDA20a6d0B7dd516394D5978AC0B92|
|SOL/USD|0x76721563EC3CF5fB94737Eb583F38f3cD166C7Bb|
|SRM/USD|0xd010175e4eA718569A105FCbeAa8db44c590730E|
|USDC/USD|0x8cb22a71AD5ef0384B85FF08Ba1343ec71880C35|
|USDT/USD|0xba92eACD3fb46661E130577cD03fa32E6D4D757a|


</TabItem>
  <TabItem value="Devnet" label="Devnet" default> 

|Currency pair|Chainlink contract feed address|
|:----:|:-----:|
|BTC/USD|0x878738FdbCC9Aa39Ce68Fa3B0B0B93426EcB6417|
|ETH/USD|0x7235B04963600fA184f6023696870F49d014416d|
|LINK/USD|0xc75E93c4593c23A50cff935F8916774e02c506C7|
|SOL/USD|0xec852B2A009f49E4eE4ffEddeDcF81a1AD1bbD6d|
|USDC/USD|0xedc0d80E85292fEf5B0946DEc957563Ceb7C8e6c|
|USDT/USD|0xE69C1E63ef3E95bE56A50f326aC97Bb7994890aD|

  </TabItem>
</Tabs>

## Boilerplate contract

[View in Remix](https://remix.ethereum.org/#url=https://github.com/neonevm/neon-evm.docs/blob/main/docs/code-samples/chainlink-btc-usd-pricefeed.sol&lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js)

```Solidity
SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: NeonEVM Devnet
     * Aggregator: BTC/USD
     * Address: 0x878738FdbCC9Aa39Ce68Fa3B0B0B93426EcB6417
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x878738FdbCC9Aa39Ce68Fa3B0B0B93426EcB6417
        );
    }

    /**
     * Returns the latest price.
     */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

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