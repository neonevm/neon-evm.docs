---
title: Pyth
proofedDate: 20240502
iterationBy: HB
includedInSite: true
approvedBy: na
comment:
---

import mm_p_key from '@site/static/img/doc-images/developing/deploy_facilities/foundry-metamask.png';

## Introduction

[Pyth](https://pyth.network/) is an open-source real-time on-chain market data feed. Neon EVM can read Pyth Solana Mainnet and Devnet price feeds natively with precompiles.

Next, your contract should query the Solana Pyth Contract that holds this updated data for the token prices you require. The price feed IDs are available for -

- [Solana Mainnet Beta](https://pyth.network/developers/price-feed-ids#solana-mainnet-beta)
- [Solana Devnet](https://pyth.network/developers/price-feed-ids#solana-devnet)

## Boilerplate contract

[View GitHub example](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/contracts/TestReadSolanaData/TestReadPythPriceFeed.sol)

```
// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "./SolanaDataConverterLib.sol";
import "./QueryAccount.sol";


contract TestReadPythPriceFeed {
    using SolanaDataConverterLib for bytes;
    using SolanaDataConverterLib for uint64;
    using SolanaDataConverterLib for uint32;

    /// @notice This method serves to read the bytes length of a Solana data account
    /// @param solanaAddress The Solana data account address of the price feed
    function readSolanaDataAccountLen(bytes32 solanaAddress) public view returns(uint256) {
        (bool success, uint256 data) = QueryAccount.length(uint256(solanaAddress));
        require(success, "failed to query account data");

        return data;
    }

    /// @notice This method serves to read the raw data of a Solana data account
    /// @param solanaAddress The Solana data account address of the price feed
    /// @param offset The offset in bytes, starting to read from the byte
    /// @param len The length of the Solana data account
    function readSolanaDataAccountRaw(bytes32 solanaAddress, uint64 offset, uint64 len) public view returns(bytes memory) {
        (bool success, bytes memory data) = QueryAccount.data(uint256(solanaAddress), offset, len);
        require(success, "failed to query account data");

        return data;
    }

    /// @notice This method serves to read from Pyth price feeds price, prevPublishTimestamp and status
    /// @param solanaAddress The Solana data account address of the price feed
    /// @param offset The offset in bytes, starting to read from the byte
    /// @param len The length of the Solana data account
    /// @return Price
    /// @return Timestamp
    /// @return Status - could be UNKNOWN, TRADING, HALTED, AUCTION
    function readSolanaPythPriceFeed(bytes32 solanaAddress, uint64 offset, uint64 len) public view returns(int64, uint64, uint32) {
        (bool success, bytes memory data) = QueryAccount.data(uint256(solanaAddress), offset, len);
        require(success, "failed to query account data");

        return (
            (data.toUint64(208)).readLittleEndianSigned64(),
            (data.toUint64(200)).readLittleEndianUnsigned64(),
            (data.toUint32(224)).readLittleEndianUnsigned32()
        );
    }
}
```

:::important
`TestReadPythPriceFeed.sol` contract imports `QueryAccount.sol` and `SolanaDataConverterLib.sol` which are the required libraries to read data from Solana accounts natively.
:::

## How to integrate with the Pyth contract

The example this tutorial is based on is located in [this repository](https://github.com/neonlabsorg/neon-tutorials/tree/main/hardhat).

By the end of this tutorial, you will deploy a contract which reads Pyth Solana price feeds.

### Step 1: Installation

> **Note:** This page is just a quickstart based on a specific example program. For more details on installing Hardhat, refer to the _[Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started#overview)_.

Using Git, clone the example Hardhat project from the remote repository and navigate to it:

```sh
git clone https://github.com/neonlabsorg/neon-tutorials
cd neon-tutorials/hardhat
```

Then, run the following command:

```sh
npm install
```

This will install all the necessary packages to continue with the example. These packages include the `Hardhat` library.

If the above command results in an error, run:

```sh
npm cache clear --force
npm install
```

### Step 2: Set Up MetaMask Accounts

:::info
This step requires an EVM-compatible wallet such as MetaMask, connected to Neon Devnet, with a balance in Devnet NEON available from [NeonFaucet](https://neonfaucet.org/).

The following tutorials assist you to meet these prerequisites:

- Learn how to [install a MetaMask wallet and connect it to Devnet](/docs/wallet/metamask_setup)

  > Or [connect an existing wallet to Devnet](/docs/developing/connect_rpc#connect-via-chainlist)
  > :::

  2.1 Obtain the private key for your wallet account.

> To obtain the private key from MetaMask, from the hamburger menu, click **Account Details** > **Show Private Key**, enter your password, and click **Confirm** for access to the private key for that account.
> <img src={mm_p_key} width="250" />

2.2 Create a .env file and add these lines:

```
PRIVATE_KEY_OWNER=`YOUR_PRIVATE_KEY`
```

:::important
Replace `YOUR_PRIVATE_KEY` with your data.
:::

### Step 3: Compile Contracts

All of the contracts are located in the project's `contracts/` directory. Before these contracts can be run, they must first be compiled. To compile the project's contracts, run the following command:

```sh
npx hardhat compile
```

After running this step, you should see output similar to the following:

```
Compiled 23 Solidity files successfully
```

### Step 4: Deploy Contract

`NEON_CONFIG` contains the proxy contract addresses on Devnet and Mainnet, and the price ids for reading Pyth prices.

To deploy the project's contract for Solana Pyth price, simply run the command below to run the deployment script in the `scripts/` directory:

```sh
npx hardhat run scripts/TestReadSolanaData/TestReadPythPriceFeed.js --network neondevnet
```

The output should look like:

```
TestReadPythPriceFeed deployed to 0x7068EbfED06C7a87ba23e339199FACeF76515Df2
Result(3) [ 102486086n, 1714670447n, 1n ] neonPrice
Result(3) [ 13932481388n, 1714670448n, 1n ] solPrice
Result(3) [ 299735750000n, 1714670448n, 1n ] ethPrice
Result(3) [ 5919709374999n, 1714670448n, 1n ] btcPrice
```

> The result represents an array with the following parameters:
>
> - 1st parameter - Price
> - 2nd parameter - Timestamp of the last price push
> - 3rd parameter - Status (0 = UNKNOWN, 1 = TRADING, 2 = HALTED, 3 = AUCTION)
>
> For validating the correct price, a check for the timestamp or status can be implemented in the code.

:::info
To deploy on Neon EVM Mainnet, change `--network neondevnet` to `--network neonmainnet` in the command line.
:::

It's **strongly recommended** that you follow the [consumer best practices](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices) when consuming Pyth data.
