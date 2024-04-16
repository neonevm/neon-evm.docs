---
title: 'Subsquid SDK Integration'
proofedDate: N/A
includedInSite: false
approvedBy: na
description: Serves historical on-chain data, including event logs, transaction receipts, traces and per-transaction state diffs.
---

_This page presents an example of how SDK packages can be combined into a working indexer (called squid) on Neon EVM Devnet. This squid example tracks transfers of WNEON on Neon EVM Devnet, then save the resulting data to PostgreSQL and serve it as a GraphQL API._

# Introduction

[Subsquid Network](https://docs.subsquid.io/) is a decentralized query engine optimized for batch extraction of large volumes of data. It currently serves historical on-chain data ingested from 100+ EVM and Substrate networks, including event logs, transaction receipts, traces and per-transaction state diffs.

Here's an example of how SDK packages can be combined into a working indexer (called squid). This example uses [WNEON contract](https://devnet.neonscan.org/address/0x11adc2d986e334137b9ad0a0f290771f31e9517f).

## Prerequisites

- NodeJS 16.x or newer
- Docker

## How to run a squid on Neon EVM Devnet

### Step 1: Initialize a node project

Create an empty project directory and navigate to it and run:

```sh
npm init
```

### Step 2: Install dependencies

```sh
npm i @subsquid/evm-processor @subsquid/typeorm-store @subsquid/typeorm-migration @subsquid/graphql-server

npm i typescript @subsquid/typeorm-codegen @subsquid/evm-typegen @@subsquid/util-internal-validation --save-dev
```

### Step 3: Add `tsconfig.json` to the project's root directory

```sh
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "lib",
    "module": "commonjs",
    "target": "es2020",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Step 4: Define the schema for both the database and the core GraphQL API in `schema.graphql` in the project's root directory

```sh
type Transfer @entity {
  id: ID!
  src: String! @index
  dst: String! @index
  wad: BigInt!
}
```

### Step 5: Generate TypeORM classes based on the schema

```sh
npx squid-typeorm-codegen
```

The TypeORM classes will be available at `src/model/index.ts`.

### Step 6: Prepare the database

6.1 Create `.env` file in the project's root directory and paste the following lines -

```sh
DB_NAME=squid
DB_PORT=23798
RPC_NEON_HTTP=https://devnet.neonevm.org
GQL_PORT=4350
```

6.2 Create `docker-compose.yaml` file in the project's root directory and paste the following lines -

```sh
version: "3"
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: "${DB_NAME}"
      POSTGRES_PASSWORD: postgres
    ports:
      - "${DB_PORT}:5432"
```

6.3 Start the database container -

```sh
docker compose up -d
```

6.4 Compile the TypeORM classes -

```sh
npx tsc
```

6.5 Generate the migration file -

```sh
npx squid-typeorm-migration generate
```

6.6 Apply the migration with -

```sh
npx squid-typeorm-migration apply
```

### Step 7: Generate utility classes for decoding WNEON contract data based on its ABI

7.1 Create a folder named `abi` under `src` (`src/abi`).

7.2 Create `wneon.json` file under `src/abi` (`src/abi/wneon.json`) and paste the contracts's ABI (https://devnet.neonscan.org/address/0x11adc2d986e334137b9ad0a0f290771f31e9517f#contract) into it.

7.3 Run -

```sh
npx squid-evm-typegen src/abi ./src/abi/wneon.json
```

The utility classes will be available at src/abi/wneon.ts.

### Step 8: Create an executable file `main.ts` under `src` folder (`src/main.ts`)

Paste the following lines of code into `main.ts` -

```sh
import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { TypeormDatabase } from "@subsquid/typeorm-store";
import * as wneonAbi from "./abi/wneon";
import { Transfer } from "./model";

const processor = new EvmBatchProcessor()
  .setGateway("https://v2.archive.subsquid.io/network/neon-devnet")
  .setRpcEndpoint({
    // set RPC endpoint in .env
    url: process.env.RPC_NEON_HTTP,
    //rateLimit: 10,
  })
  .setBlockRange({ from: 177455580 }) // Neon EVM Devnet genesis block
  .setFinalityConfirmation(75) // 15 mins to finality
  .addLog({
    address: ["0x11adC2d986E334137b9ad0a0F290771F31e9517F"], // WNEON contract address on Neon EVM Devnet
    topic0: [wneonAbi.events.Transfer.topic],
  });

const db = new TypeormDatabase();

processor.run(db, async (ctx) => {
  const transfers: Transfer[] = [];
  for (let block of ctx.blocks) {
    for (let log of block.logs) {
      let { src, dst, wad } = wneonAbi.events.Transfer.decode(log);
      transfers.push(
        new Transfer({
          id: log.id,
          src,
          dst,
          wad,
        })
      );
    }
  }
  await ctx.store.insert(transfers);
});
```

### Step 9: Compile the project and start the processor process

```sh
npx tsc
```

```sh
node -r dotenv/config lib/main.js
```

### Step 10: Start the GraphQL server

In a separate terminal, run the graphql server -

```sh
npx squid-graphql-server
```

The finished GraphQL API with GraphiQL will be available at localhost:4350/graphql.

:::info
Please follow the quick start github tutorial _[Subsquid SDK Example](https://github.com/neonlabsorg/neon-tutorials/tree/main/subsquid)_.
:::

## Changes needed to run a squid on Neon EVM Mainnet

To run a squid on Neon EVM Mainnet, there needs to be some changes to some of the above mentioned steps.

1. Replace `RPC_NEON_HTTP=https://devnet.neonevm.org` to `RPC_NEON_HTTP=https://neon-proxy-mainnet.solana.p2p.org` in the `.env` file in **Step 6.1**

2. Get the WNEON contract's ABI from the mainnet (https://neonscan.org/address/0x202c35e517fa803b537565c40f0a6965d7204609#contract) in **Step 7.2**

3. In **Step 8**, change to the following in the `src/main.ts` file:

- `setGateway("https://v2.archive.subsquid.io/network/neon-mainnet")`
- `setBlockRange({ from: 195350522 })` (Neon EVM Mainnet genesis block)
- `address: ["0x202c35e517fa803b537565c40f0a6965d7204609"]` (WNEON contract address on Neon EVM Mainnet)
