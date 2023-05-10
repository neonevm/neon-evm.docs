---
title: Chainlink
---

## Introduction

[Chainlink Data Feeds](https://data.chain.link/) are the quickest way to connect your smart contracts to real-world data, such as asset prices. It supports Neon EVM and is implemented as a smart contract making Chainlink Data Feeds from Solana network available on Neon EVM. You can learn more from the [hoodieshq/chainlink-neon](https://github.com/hoodieshq/chainlink-neon) repo.

## How to Use

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
