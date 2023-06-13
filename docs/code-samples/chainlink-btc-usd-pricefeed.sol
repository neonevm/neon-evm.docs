// SPDX-License-Identifier: MIT
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