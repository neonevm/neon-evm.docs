---
title: "Local Proxy to Remote Solana"
proofedDate: 20230828
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

:::info
The [Proxy local testing tutorial](/docs/operating/basic) describes how to perform testing with a local Proxy to a local Solana node. This option can be useful for developers who want to debug their Solidity contracts by hosting both Proxy and Solana nodes locally. This page provides a tutorial that demonstrates how to transact from a local Proxy to a public, remote Solana.
:::


## Prerequisites
- [Docker](https://docs.docker.com/get-docker/); `docker-compose` v1.29 is recommended.
- Operator keys. Test [public keys are available](https://github.com/neonlabsorg/proxy-model.py/tree/develop/proxy/operator-keypairs).


## Network configuration
  * The target Solana cluster is accessed via the locally-hosted Proxy.
  * Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used, and the Proxy interacts with it through Neon EVM.

## Set up a local Proxy
First, set up and host a Proxy locally as per the following steps. After executing these commands, the Proxy is available at `http://localhost:9090/solana`. This address and port are set by default.

### Step 1: Docker
Docker images themselves are never "started" and never "running". The `docker run` command takes the Docker image as a template and produces a container from it. Before starting your Proxy container, you need to start service containers.

Make sure that you have a daemon running by executing the following command:
```bash
docker info
```

:::tip
If you see something like this:
```console
Can't connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
run the daemon first:
```bash
sudo systemctl start docker
```
:::

### Step 2: Run the Database, Indexer, and Proxy services
In this step, you will create the services necessary for the function of the Proxy (including Database and Indexer services), as well as the Proxy service itself. These services, whose functions follow, are controlled by a docker-compose.yml file.

#### Database Services
This container aims to handle the database that stores all the relevant Ethereum processing metadata linked to each other: **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`**, etc. This data is consumed by the **Indexer** service.

Currently, Neon EVM proxies are hard coded to work with PostgreSQL. To connect the Proxy to a database, you need to start a PostgreSQL container. The default settings are hard coded in the following docker-compose.yml file. If you want to use your Proxy with other settings, you need to register as an Operator so that Neon EVM can recognize your keys.

> Only authorized Operators can change the settings of these parameters. Learn more about [operating a Neon Proxy](/docs/operating/operator-introduction.md)

#### Indexer service
The Indexer service indexes all the relevant Ethereum processing metadata consisting of **`signatures`**, **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`**, etc. It gathers all this data from the Solana blockchain, filtering them by the EVM contract address. It enables us to provide our users with the Ethereum API.

#### Proxy service
The Proxy service is a core service that allows Ethereum-like transactions to be processed on Solana, taking full advantage of Solana-native functionality, including the ability to execute transactions in parallel.

The Neon EVM address is registered inside `neonlabsorg/proxy`, so the Proxy knows which Neon EVM is running in the Solana cluster. After executing this command, the Proxy will be available at `http://localhost:9090/solana`. This address and port are set by default.

#### Create and run services with Docker Compose
In order to create and run these services: 

1. Create a "keys" folder and put your allowlisted key into it. Note that the file with the Operator key should be named `id.json`.
```bash
mkdir keys
mv {PATH_TO_WHITELISTED_KEYS} keys/
```

2. Set the following environment variables
   - `EVM_LOADER`, i.e. the contract address for Neon EVM
     - For Devnet/Testnet, use: `eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU`
     - For Mainnet, use: `NeonVMyRX5GbCrsAHnUwx1nYYoJAtskU1bWUo6JGNyG`
   - `SOLANA_URL`
     - Refer to the [RPC Endpoints table](#rpc-endpoints)
   - `PROXY_VERSION`

For example,
```bash
export EVM_LOADER=eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU
export SOLANA_URL=http://api.devnet.solana.com/
export PROXY_VERSION=latest
```

3. Download the `docker-compose` [file](https://github.com/neonlabsorg/proxy-model.py/blob/develop/docker-compose/docker-compose-remote-solana.yml). This file should be placed in the same folder with the `keys/` directory.
```bash
wget https://raw.githubusercontent.com/neonlabsorg/proxy-model.py/develop/proxy/docker-compose-remote-solana.yml
```

4. Start the local environment.
```bash   
docker-compose -f docker-compose-remote-solana.yml up -d
```

If you want to destroy the local environment, run the following command:
```bash
docker-compose -f docker-compose-remote-solana.yml down
```

The console output should look like this:
```console
Creating postgres ... done
Creating dbcreation ... done
Creating indexer ... done
Creating proxy ... done
```

## Connect to a Solana cluster RPC endpoint

A Proxy connects to a public [Solana cluster RPC endpoint](https://docs.solana.com/cluster/rpc-endpoints) depending on the `SOLANA_URL` value set. The following table shows the *endpoint* value that's set automatically based on the value of the `CONFIG` flag.

### RPC endpoints
CONFIG | RPC Endpoint
:-|:-
Devnet | `https://api.devnet.solana.com`
Testnet | `https://api.testnet.solana.com`
Mainnet | `https://api.mainnet-beta.solana.com`

To use a different endpoint, you need to specify the variable `-e SOLANA_URL='http://<Solana node RPC endpoint>'` on the command line. For example, to use Devnet, add the flag `-e SOLANA_URL='https://api.devnet.solana.com'`.

When a Proxy is deployed, it generates a wallet containing a key pair. If you don't need the new wallet and want to use the keys you already have, you need to specify the path to your wallet on the command line.

**Command Line Options**
  * `~/.config/solana/id.json` — absolute path to your key pair file stored locally
  * `--name proxy` — specifies the Proxy name

<!-- retired to retire linked page If you are not registered as an operator, you can only use test public keys. A list of available public keys is accessible in the  {Neon Proxy RPC Endpoints} (clusters/neon_proxy_rpc_endpoints.md) section. You do not need to specify the key using the `-v` flag, since it is already hard-coded into the Devnet/Testnet containers. -->
