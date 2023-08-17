---
title: The Graph
proofedDate: 20230728
iterationBy: na
includedInSite: true
approvedBy: na
comment: original item https://medium.com/neon-labs/the-graph-on-neon-evm-enabling-efficient-on-chain-dapp-data-querying-d5c73e3c6bb1 the examples repo has (out of date) full proxy local/Solana/Tracer/Indexer for Graph here https://github.com/neonlabsorg/examples/blob/main/the-graph-integration/README.md For the graph we will have separate RPC Endpoint not public 
---

*This page presents a high-level overview of how to create a subgraph for The Graph and the endpoint services provided by Neon EVM.*

## TL;DR

- Work from The Graph CLI

> `yarn global add @graphprotocol/graph-cli` or `npm install -g @graphprotocol/graph-cli`

- Send a request to info@neonevm.org to be added to the allowlist for The Graph endpoints:
    - IPFS: https://ipfs.neonevm.org
    - Graph UI: https://thegraph.neonevm.org
    - Deployment: https://thegraph.neonevm.org/deploy
    - GraphQL: https://thegraph.neonevm.org/index-node/graphql

## Prerequisites for standard flow

:::info 

The standard flow is where the end user deploys and collects data from their own contract. In the standard flow you: 

1. Deploy a contract to Neon EVM
2. Collect the contract's address and block number
3. [Configure your subgraph.yaml](#subgraph-overview) to collect data on events emitted by contract with value and block number from previous step
4. [Deploy your subgraph](#deploy-your-subgraph)

 The Graph is highly customizable and supports other flows; for example, it allows you to monitor [public contracts](#public-contracts) too. 

::: 

- Smart contract address on Neon EVM 
- ABI file for the deployed contract 
- Graph CLI: see [The Graph docs](https://thegraph.com/docs/en/cookbook/quick-start)

## Neon EVM-specific deviations

On the Solana blockchain, data accounts are used to temporarily store data with a history of days. While on the Ethereum blockchain, data is stored within smart contracts. Neon EVM offers an intermediate approach by storing Solana account data for an extended period to support tracing services.

This means that The Graph may not be able to acquire all data according to the block number assigned. It is important that end users consider what data they wish to extract and store from the API service provided by their subgraph for future use.

## Introduction

To extract, process, and store data from a dApp contract on Neon EVM using The Graph protocol, you must deploy a dedicated subgraph to a Graph node. 

:::info
Subgraphs map 1:1 with a dApp to provide Graph nodes with the information and logic needed to:
- Observe the blockchain for log events of smart contacts
- Translate the events into entities for storage

:::

### Subgraph overview

We need to create a subgraph to source data from the contract/s of interest that will constantly observe the blockchain using [your chosen Neon RPC](https://chainlist.org/?chain=245022926&testnets=true&search=Neon+EVM) for your events of interest. When one of these events is detected, the Graph node will extract the event log data and begin to process the information using a WebAssembly script defined in the subgraph.

The script uses a GraphQL schema file in the subgraph to produce records, called entities, that represent metadata related to your query. These entities are stored on a database, so they may be queried by API requests.

A subgraph is created using three main components: 
- Subgraph manifest
- GraphQL schema
- AssemblyScript mapping file


:::info

Learn more from [The Graph documentation](https://thegraph.com/docs/en/developing/creating-a-subgraph).

:::

### Subgraph manifest: important considerations

The subgraph manifest is defined by the subgraph.yaml file. The manifest defines the smart contract(s) the subgraph will index, what type of events the target smart contract(s) will emit, and how to convert event data into entities that the Graph Node processes and stores for querying.

The following subgraph manifest items deserve particular attention:

- `dataSources.source`
- `dataSources.network`
- `dataSources.source.address`

#### `dataSources.source`

`dataSources.source` provides both the (optional) address of the smart contract to watch and the ABI of the smart contract to use

> Omitting address allows you to index matching events from all contracts.

The ABI file is a JSON file created when a Solidity contract is compiled. It contains information on functions in the smart contract and types of events that will be emitted. 

Contracts fall into two broad types: personal, i.e. a contract that you have developed and deployed, and private. Let's consider how you collect ABI files for each.

##### Personal contracts

If you’re developing a subgraph for your own project, you generate the ABI files when you compile your smart contract.

##### Public contracts

If you’re developing a subgraph for an existing public project, you will need to download the project’s smart contract(s) and compile them, e.g. with truffle, to retrieve the ABI files.

#### `dataSources.networking`

`dataSources.networking` is important for deploying subgraphs on Neon EVM. The property maps to the network configuration provided in your project’s truffle.js file.

:::tip

If you set  `dataSources.networking` to `neonlabs.`, then the manifest file will pull the corresponding “neonlabs” network configurations as setup in your project’s truffle.js file. 

:::

#### `dataSources.source.address`

The address of the contract deployed to the `dataSources.network` in the subgraph.yaml manifest file. 

## Deploy your subgraph

When you have finished creating the subgraph manifest, the subgraph’s GraphQL schema, and the AssemblyScript Mapping file, you’re ready to deploy the subgraph.

### Step 1: request access

Access to the allowlist for The Graph endpoints must be made to info@neonevm.org. You will be added to the allowlist for:

- IPFS: https://ipfs.neonevm.org
- Graph UI: https://thegraph.neonevm.org
- Deployment: https://thegraph.neonevm.org/deploy
- GraphQL: https://thegraph.neonevm.org/index-node/graphql

### Step 2: create

For example, let's create a subgraph called `test-subgraph` on Neon EVM. From The Graph CLI, run:

```bash
graph create neonlabs/test-subgraph --node https://thegraph.neonevm.org/deploy/
```

### Step 3: instantiate 

In the CLI, instantiate `test-subgraph` with:

2.1 
```bash
graph codegen
```

2.2 
```bash
graph build
```

### Step 4: deploy

Deploy to the Graph node with:

```bash
graph deploy neonlabs/test-subgraph --ipfs https://ipfs.neonevm.org/ --node https://thegraph.neonevm.org/deploy/ --version-label="v0.0.1"
```

### Step 5: record

Finally, record the output of the previous command: the URL at which your subgraph provides the API service feed for your data.


## What next?

If you are new to The Graph and need further support, consider trying our [full walk-through](https://medium.com/neon-labs/the-graph-on-neon-evm-enabling-efficient-on-chain-dapp-data-querying-d5c73e3c6bb1) for setting up and deploying a subgraph on Neon EVM.


<!-- ## Gravity.sol overview

This overview discusses a simple Solidity smart contract called Gravity.sol. You can find the truffle project files [here](https://github.com/neonlabsorg/examples/tree/main/the-graph-integration).

Lets take a look at the contract we will use, paying particular attention to the events that it emits. Next we will consider the subgraph that listens to these events. 

Gravity.sol is a smart contract that links a blockchain address with a path to an image. It allows users to set avatars to their Ethereum/Neon EVM address. Each of these avatars are known as Gravatars. Gravatars include information such as owner, displayName, and imageUrl. The relationship between Gravatars and specific blockchain addresses are stored in an array.

Within Gravity.sol there are four functions that allow users to create, update, and retrieve Gravatars:

- `createGravatar`: on creation, `NewGravatar` event is emitted
- `getGravatar`
- `updateGravatarName`: on update, `UpdatedGravatar` event is emitted
- `updateGravatarImage`: on update, `UpdatedGravatar` event is emitted -->