---
title: API3
proofedDate: 20240717
iterationBy: na
includedInSite: false
approvedBy: na
comment:
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import mm_p_key from '@site/static/img/doc-images/developing/deploy_facilities/foundry-metamask.png';

## Introduction

API3 dAPIs (decentralized APIs) offer a state-of-the-art solution for connecting off-chain data sources with on-chain applications. They use first-party oracles managed directly by API providers, ensuring reliable and continuously updated data feeds. These oracles provide cryptographically signed data, which is then aggregated on-chain into a secure and tamper-proof data feed known as a beacon set.

Developers can easily integrate dAPIs into their decentralized applications (dApps), enabling real-time access to off-chain data, such as price feeds, without requiring extensive technical implementation. The integration process is simplified through a proxy address that represents the dAPI requester, facilitating the interaction between the dApp and the data feed. API3 has made it straightforward for dApp owners to read on-chain values from these beacons, enhancing the functionality and reliability of their applications.

Each API3 data feed is available via its own proxy contract. To use a feed, you create a "hybrid" smart contract, i.e. you build the integration with the feed proxy contract into your own smart contract and deploy that. Learn more from [API3's documentation](https://docs.api3.org/explore/dapis/what-are-dapis.html), or examine the [boilerplate provided](#boilerplate-contract).

## Deployed feeds

:::important
Activation of API3 price feeds is permissionless and anyone can activate the price feeds with a transaction on Neon EVM Mainnet and Devnet.
:::

The proxy contract addresses of the price feeds are available both on Neon EVM Mainnet and Devnet.

<Tabs>

<TabItem value="Mainnet" label="Mainnet">

| Currency pair |      API3 proxy contract feed address      |
| :-----------: | :----------------------------------------: |
|   USDT/USD    | 0xF00249f594f11c3F98F2D73433274D10098906B6 |

</TabItem>

<TabItem value="Devnet" label="Devnet">

| Currency pair |      API3 proxy contract feed address      |
| :-----------: | :----------------------------------------: |
|    BTC/USD    | 0x81A64473D102b38eDcf35A7675654768D11d7e24 |
|    ETH/USD    | 0xa47Fd122b11CdD7aad7c3e8B740FB91D83Ce43D1 |
|    SOL/USD    | 0xCa81409D8dF6d34a21d93B5c0EF79557Bc5fb4be |
|   USDC/USD    | 0xa790a882bB695D0286C391C0935a05c347290bdB |
|   USDT/USD    | 0xF00249f594f11c3F98F2D73433274D10098906B6 |
|   NEON/USD    | 0x383CC331Cd5669b7B6460a24b1B45cD9220B28a8 |
|   LINK/USD    | 0xB102ec41347F26E8493B8C98cA1c10b69903Dc57 |

</TabItem>

</Tabs>

## Boilerplate contract

[View GitHub example](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/contracts/TestAPI3/TestAPI3.sol)

```
// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@api3/contracts/api3-server-v1/proxies/interfaces/IProxy.sol";

contract TestAPI3 {
    // Use your proxy address as the argument
    function readDataFeed(address proxy) public view returns (int224 value, uint32 timestamp) {
        (value, timestamp) = IProxy(proxy).read();
        // If you have any assumptions about `value` and `timestamp`, make sure
        // to validate them right after reading from the proxy. For example,
        // if the value you are reading is the spot price of an asset, you may
        // want to reject non-positive values...
        require(value > 0, "Value not positive");
        // ...and if the data feed is being updated with a one day-heartbeat
        // interval, you may want to check for that.
        require(
            timestamp + 1 days > block.timestamp,
            "Timestamp older than one day"
        );
    }
}
```

## How to integrate with the API3 contract

:::important
Before trying out the tutorial in the next steps, please make sure that the price feeds are activated for **[Neon EVM Mainnet](https://market.api3.org/neon-evm)** and **[Neon EVM Devnet](https://market.api3.org/neon-evm-testnet)**.
:::

The example this tutorial is based on is located in [this repository](https://github.com/neonlabsorg/neon-tutorials/tree/main/hardhat).

By the end of this tutorial, you will deploy a contract which reads API3 price feeds.

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

`NEON_CONFIG` contains the proxy price feed addresses on Neon EVM Mainnet and Devnet for reading API3 price feeds.

To deploy the project's hybrid contract, simply run the command below to run the deployment script in the `scripts/` directory:

```sh
npx hardhat run scripts/TestAPI3/deploy.js --network neondevnet
```

The output should look like:

```
TestAPI3 deployed to 0xB8747279e8029108720BcB5386511D70B9129D68
BTC_USD Result(2) [ 64547812100000000000000n, 1721241637n ]
ETH_USD Result(2) [ 3431460000000000000000n, 1721274476n ]
SOL_USD Result(2) [ 159776804400000000000n, 1721284955n ]
USDC_USD Result(2) [ 999900024820969500n, 1721220644n ]
USDT_USD Result(2) [ 1000188700000000000n, 1721220738n ]
NEON_USD Result(2) [ 392570000000000000n, 1721270758n ]
LINK_USD Result(2) [ 13807707000000000000n, 1721291017n ]
```

> The result represents an array with the following parameters:
>
> - 1st parameter - Price
> - 2nd parameter - Timestamp of the last price push

:::info
To deploy on Neon EVM Mainnet, change `--network neondevnet` to `--network neonmainnet` in the command line.
:::

:::important
If a dApp wants to recapture OEV (https://api3.org/oev/), they can contact us, and API3 will assist them in obtaining a unique proxy for their dApp. You can join their [Discord](https://discord.com/invite/qnRrcfnm5W) and reach out to the API3 team in the OEV section.
:::
