---
title: Pyth
proofedDate: 20230606
iterationBy: HB
includedInSite: true
approvedBy: na
comment: todo the <!-- https://github.com/pyth-network/pyth-neon_ --> is an archive
---

import mm_p_key from '@site/static/img/doc-images/developing/deploy_facilities/foundry-metamask.png';

## TL;DR

- First call `pyth.updatePriceFeeds`
- Next call `pyth.getPrice`
- Find price feed IDs on Neon EVM Mainnet and Devnet [here](https://pyth.network/developers/price-feed-ids#pyth-evm-stable).

## Introduction

[Pyth](https://pyth.network/) is an open-source real-time on-chain market data feed. To use Pyth prices, you must call the function `updatePriceFeeds `, which submits the price update data to the Pyth contract in your target chain.

> Your contract interacts with the Pyth contract to request a data refresh. This interaction also provides an opportunity to validate that the updates you received are authentic.

Next, your contract should query the Pyth Contract that holds this updated data for the token prices you require. The price feed IDs are available for Neon EVM [here](https://pyth.network/developers/price-feed-ids#pyth-evm-stable).

## Boilerplate contract

[View GitHub example](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/contracts/TestPyth/TestPyth.sol)

```
// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";

contract TestPyth {
    address public immutable pyth;

    constructor(address _pyth) {
        pyth = _pyth;
    }

    /// @notice Returns the price and confidence interval.
    /// @dev Reverts if the price has not been updated within the last `getValidTimePeriod()` seconds.
    function getPrice(bytes32 id) external view returns (PythStructs.Price memory) {
        return IPyth(pyth).getPrice(id);
    }

    /// @notice Returns the price of a price feed without any sanity checks.
    /// @dev This function returns the most recent price update in this contract without any recency checks.
    /// This function is unsafe as the returned price update may be arbitrarily far in the past.
    function getPriceUnsafe(bytes32 id) external view returns (PythStructs.Price memory) {
        return IPyth(pyth).getPriceUnsafe(id);
    }

    /// @notice Returns the required fee to update an array of price updates.
    function getUpdateFee(bytes[] calldata updateData) external view returns (uint) {
        return IPyth(pyth).getUpdateFee(updateData);
    }

    /// @notice Update price feeds with given update messages.
    /// This method requires the caller to pay a fee in wei; the required fee can be computed by calling
    /// `getUpdateFee` with the length of the `updateData` array.
    /// Prices will be updated if they are more recent than the current stored prices.
    /// The call will succeed even if the update is not the most recent.
    /// @dev Reverts if the transferred fee is not sufficient or the updateData is invalid.
    function updatePriceFeeds(bytes[] calldata updateData) external payable {
        IPyth(pyth).updatePriceFeeds{value: msg.value}(updateData);
    }
}
```

The constructor in the smart contract takes the proxy contract address as an argument.

| Location | Proxy Contract address                     |
| :------- | :----------------------------------------- |
| Devnet   | 0x0708325268dF9F66270F1401206434524814508b |
| Mainnet  | 0x7f2db085efc3560aff33865dd727225d91b4f9a5 |

## How to integrate with the Pyth contract

The example this tutorial is based on is located in [this repository](https://github.com/neonlabsorg/neon-tutorials/tree/main/hardhat).

By the end of this tutorial, you will deploy a contract which reads Pyth price feeds.

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

2.3 Run:

```
source .env
```

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

`NEON_COFIG` contains the proxy contract addresses on Devnet and Mainnet, and the price ids for reading Pyth prices.

To deploy the project's contract for Pyth price, simply run the command below to run the deployment script in the `scripts/` directory:

```sh
npx hardhat run scripts/TestPyth/deploy.js --network neondevnet
```

After running this command and deploying our TestPyth smart contract now we can take the newly deployed contract address and included it inside `scripts/TestPyth/getPrice.js` where we can initiate getting the Pyth price feeds:

```sh
npx hardhat run scripts/TestPyth/getPrice.js --network neondevnet
```

The output should look like:

```
BTC_USD Result(4) [ 6997401314334n, 3802014633n, -8n, 1711403472n ]
ETH_USD Result(4) [ 359529041250n, 172892485n, -8n, 1711403472n ]
SOL_USD Result(4) [ 19007398487n, 20190280n, -8n, 1711403472n ]
LINK_USD Result(4) [ 1930030964n, 2261590n, -8n, 1711403472n ]
USDC_USD Result(4) [ 99989324n, 49324n, -8n, 1711403472n ]
USDT_USD Result(4) [ 100035012n, 35012n, -8n, 1711403472n ]
```

It's **strongly recommended** that you follow the [consumer best practices](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices) when consuming Pyth data.

:::note
While Pyth provides a sane default for the staleness threshold and a fallback process if feed data is stale, users may configure this functionality.
:::

## What next?

To learn more about Pyth's architecture, see their video: [How to use Pyth's on-demand model](https://www.youtube.com/watch?v=qdwrs23Qc9g).
