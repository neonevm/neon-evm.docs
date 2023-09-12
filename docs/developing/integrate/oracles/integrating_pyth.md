---
title: Pyth
proofedDate: 20230606
iterationBy: HB
includedInSite: true
approvedBy: na
comment: 
---

## TL;DR

- First call `pyth.updatePriceFeeds`
- Next call `pyth.getPrice`
- Find price feed addresses on [Devnet](https://pyth.network/developers/price-feed-ids/#neon-evm-devnet) and [Mainnet](https://pyth.network/developers/price-feed-ids/#neon-evm-mainnet)

## Introduction

[Pyth](https://pyth.network/) is an open-source real-time on-chain market data feed. To use Pyth prices, you must call the function `updatePriceFeeds `, which submits the price update data to the Pyth contract in your target chain. 

> Your contract interacts with the Pyth contract to request a data refresh. This interaction also provides an opportunity to validate that the updates you received are authentic.

Next, your contract should query the Pyth Contract that holds this updated data for the token prices you require. The price feed IDs are available for Neon EVM:
- [Pyth on Devnet](https://pyth.network/developers/price-feed-ids/#neon-evm-devnet)
- [Pyth on Mainnet](https://pyth.network/developers/price-feed-ids/#neon-evm-mainnet)


## How to integrate with the Pyth contract

Because Pyth is an on-demand oracle, you must first retrieve the price feeds before calling the token's price based on the price feed ID for the token symbol/s you are interested in.

Let's examine an extract of a swap function (for the full contract, [see Pyth's example](https://github.com/pyth-network/pyth-crosschain/blob/main/target_chains/ethereum/examples/oracle_swap/contract/src/OracleSwap.sol)):

```SOL showLineNumbers
SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

function swap(
        bool isBuy,
        uint size,
        bytes[] calldata pythUpdateData
    ) external payable {
    // Ensure the contract on Neon EVM has the current data.
        uint updateFee = pyth.getUpdateFee(pythUpdateData);
        pyth.updatePriceFeeds{value: updateFee}(pythUpdateData);
    // Retrieve the token price for the tokens you need.
        PythStructs.Price memory currentBasePrice = pyth.getPrice(
            baseTokenPriceId
        );
        PythStructs.Price memory currentQuotePrice = pyth.getPrice(
            quoteTokenPriceId
        );
```

Line 7 refreshes the data held by the Pyth contract, and line 13-15 retrieves the first of the token prices required for the swap logic.

## Considerations for using Pyth on Neon EVM

Pyth maintains the contracts on Neon EVM, with the repo maintained by Pyth on GitHub at [pyth-network/pyth-neon](https://github.com/pyth-network/pyth-neon).

It's **strongly recommended** that you follow the [consumer best practices](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices) when consuming Pyth data.

:::note
While Pyth provides a sane default for the staleness threshold and a fallback process if feed data is stale, users may configure this functionality.
:::

## What next?

To learn more about Pyth's architecture, see their video: [How to use Pyth's on-demand model](https://www.youtube.com/watch?v=qdwrs23Qc9g).

<!-- ### How to Deploy to Neon EVM

1. Create a `.secret` file containing the private key or mnemonic of the account you want to use to deploy the
   contracts.
2. (Optional) Edit `truffle-config.js` to add the NEON network you want to deploy to.
3. Run `truffle migrate --network neon_devnet` -->
