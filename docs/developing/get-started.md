---
title: Get Started on Neon EVM
proofedDate: 20230810
iterationBy: HB
includedInSite: true
approvedBy: na
comment: 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


:::note
This is a bare bones Get Started; alternatively browse the full support available here.
::: 

## Get test NEON for Neon Devnet

To populate the accounts with test NEON, visit [the faucet](https://neonfaucet.org), where you will be issued 100 NEONS at a time.

## Configure Neon network credentials in your framework's config file

<Tabs>
  <TabItem value="Hardhat" label="Hardhat" default>

The network credentials are configured under the “networks” property in the `hardhat.config.js`.

<Tabs>
  <TabItem value="Devnet" label="Devnet" default>


```jsx
neondevnet: {
      url: "https://devnet.neonevm.org",
      accounts: [Array_of_accounts_private_keys],
      chainId: 245022926,
      allowUnlimitedContractSize: false,
      gas: "auto",
      gasPrice: "auto",
      isFork: true,
},
```
</TabItem>

<TabItem value="Mainnet" label="Mainnet" default>

```jsx
neonmainnet: {
      url: "https://neon-proxy-mainnet.solana.p2p.org",
      accounts: [Array_of_accounts_private_keys],
      chainId: 245022934,
      allowUnlimitedContractSize: false,
      gas: "auto",
      gasPrice: "auto",
      isFork: true,
},
```
</TabItem>
</Tabs>

See the [Hardhat tutorial](https://docs.neonfoundation.io/docs/developing/deploy_facilities/configure_hardhat)

<!-- Docusaurus issue with tabs -- links not rendering See the [Hardhat tutorial](/docs/deploy_facilities/configure_hardhat). -->

</TabItem>
<TabItem value="Truffle" label="Truffle" default>

The network credentials can be configured under the “networks” property in the `truffle-config.js`.

<Tabs>
  <TabItem value="Devnet" label="Devnet" default>

```jsx
neondevnet: {
      provider: () => {
        return new HDWalletProvider(
          [Array_of_accounts_private_keys],
          "https://devnet.neonevm.org",
        );
      },
      network_id: 245022926
},
```

</TabItem>
<TabItem value="Mainnet" label="Mainnet" default>

```jsx
neondevnet: {
      provider: () => {
        return new HDWalletProvider(
          [Array_of_accounts_private_keys],
          "https://neon-proxy-mainnet.solana.p2p.org",
        );
      },
      network_id: 245022934
},
```
</TabItem>
</Tabs>

See the [Truffle tutorial](https://docs.neonfoundation.io/docs/developing/deploy_facilities/configure_truffle).

<!-- Docusaurus issue with relative links inside tabs>> See the [Truffle tutorial](/docs/developing/deploy_facilities/using_truffle). -->


</TabItem>
<TabItem value="Foundry" label="Foundry" default>

Foundry doesn’t have a config file like Hardhat or Truffle to configure the network settings. Rather, the RPC endpoint and the private key are specified in the command line when passing foundry commands. See the [Foundry tutorial](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-foundry).

</TabItem>
</Tabs>


## Verify contracts on Neon Devnet with Hardhat and NeonScan:

To verify contracts on Neon Devnet with NeonScan, add this configuration to `hardhat.config.js`:

```jsx
etherscan: {
  apiKey: {
    neonevm: "test"
  },
  customChains: [
    {
      network: "neonevm",
      chainId: 245022926,
      urls: {
        apiURL: "https://devnet-api.neonscan.org/hardhat/verify",
        browserURL: "https://devnet.neonscan.org"
      }
    }
  ]
}
```

The command for verifying a deployed contract is:

```jsx
./node_modules/.bin/hardhat verify <DEPLOYED_CONTRACT_ADDRESS> --network neonevm
```

Follow this GitHub tutorial for contract verification [github.com/neonscan/hardhat-integrate](https://github.com/neonscan/hardhat-integrate).

## Gotchas

You may encounter an error `The transaction requires too lot of accounts`, i.e. that the transaction has exceeded the account limit. This error refers to the fact that the transaction on Solana does not allow the number of accounts to be more than 64. If you do need more than 64 accounts, the smart contract function throwing the error needs to be optimized.

### Basic optimization of smart contracts

Consider applying the following optimization techniques:

1. Reduce the contract binary size.
2. Use indexed parameters for the events.
3. Use custom errors instead of require statements whenever possible.
4. Minimize function calls from within a function (this reduces the function call overload).
5. Avoid using strings as storage values and, instead use fixed-sized bytes32 whenever possible.
6. Avoid loops through long arrays and use mappings instead of loops.
7. Make revert and assert messages as short as possible.
8. Write a library for all the reusable codes.
9. Use memory locations wisely - calldata, memory, storage (order is cheapest to expensive).
10. Variables should be declared in order so that they use less storage slots.

Learn more about optimizations from the [EVM Compatibility Overview](/docs/evm_compatibility/overview).