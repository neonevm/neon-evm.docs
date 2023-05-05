---
title: "Local Proxy to Remote Solana"
---

## Prerequisites
[Docker](https://docs.docker.com/get-docker/) must be already installed on your device. `docker-compose` v1.29 is recommended.

## Network Configuration
  * The target Solana cluster is accessed via the locally-hosted proxy.
  * Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used, and the proxy interacts with it through the Neon EVM.

## Setting up a Local Proxy
First, set up and host a proxy locally as per the following steps. After executing these commands, the proxy will be available at `http://localhost:9090/solana`. This address and port are set by default.

### Step 1: Docker
Docker images themselves are never "started" and never "running". The `docker run` command takes the Docker image as a template and produces a container from it. Before starting your proxy container, you need to start service containers.

Make sure that you have a daemon running by executing the following command:
```bash
docker info
```
If you see something like this:
```console
Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
you need to run the daemon first:
```bash
sudo systemctl start docker
```

### Step 2: Run the Database, Indexer, and Proxy Services
In this step, you will create the services necessary for the function of the proxy (including database and indexer services), as well as the proxy service itself. These services, the functions of which are described below, will be created from a docker-compose.yml file.

#### Database Services
This container aims to handle the database that stores all the relevant Ethereum processing metadata linked to each other: **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`** etc. This data is consumed by the **Indexer** service.

Currently, Neon EVM proxies are hardcoded to work with PostgreSQL. To connect the proxy to a database, you need to start a PostgreSQL container. The default settings are hardcoded in the following docker-compose.yml file. If you want to use your proxy with other settings, you need to register as an operator so that the Neon EVM can recognize your keys.

> Only authorized operators can change the settings of these parameters.

#### Indexer Service
The indexer service indexes all the relevant Ethereum processing metadata consisting of **`signatures`**, **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`**, etc. It gathers all this data from the Solana blockchain, filtering them by the EVM contract address. It also makes it possible to provide our users with the Ethereum API according to the data provided by the whole known operators.

#### Proxy Service
The Proxy service is a core service that allows Ethereum-like transactions to be processed on Solana, taking full advantage of Solana-native functionality, including the ability to execute transactions in parallel.

The Neon EVM address is registered inside `neonlabsorg/proxy`, so the proxy knows which Neon EVM is running in the Solana cluster. After executing this command, the proxy will be available at `http://localhost:9090/solana`. This address and port are set by default.

#### Create and Run Services with Docker Compose
In order to create and run these abovementioned services, 

1. Create "keys" folder and put your whitelisted key into it. Note that the file with operator key should be named `id.json`.
```bash
mkdir keys
mv {PATH_TO_WHITELISTED_KEYS} keys/
```

2. Set the following environment variables
   - `EVM_LOADER`
     - For devnet/testnet, it should be `eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU`
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

## Connecting to Solana Cluster RPC Endpoints

A proxy connects to a public [Solana cluster RPC endpoint](https://docs.solana.com/cluster/rpc-endpoints) depending on the `SOLANA_URL` value set. The table below shows the *endpoint* value that is set automatically based on the value of the `CONFIG` flag.

### RPC Endpoints
CONFIG | RPC Endpoint
:-|:-
devnet | `https://api.devnet.solana.com`
testnet | `https://api.testnet.solana.com`
mainnet | `https://api.mainnet-beta.solana.com`

To use a different endpoint, you need to specify the variable `-e SOLANA_URL='http://<Solana node RPC endpoint>'` on the command line. For example, in order to use devnet, add the flag `-e SOLANA_URL='https://api.devnet.solana.com'`.

When a proxy is deployed, it generates a wallet containing a key pair. If you do not need the new wallet and want to use the keys you already have, you need to specify the path to your wallet on the command line.

**Command Line Options**
  * `~/.config/solana/id.json` — absolute path to your key pair file stored locally
  * `--name proxy` — specifies the proxy name

If you are not registered as an operator, you can only use test public keys. A list of available public keys is accessible in the [Neon Proxy RPC Endpoints](clusters/neon_proxy_rpc_endpoints.md) section. You do not need to specify the key using the `-v` flag, since it is already hard-coded into the Devnet/Testnet containers.
