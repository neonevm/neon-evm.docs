---
title: "Option 2: Local Proxy to Remote Solana"
---

This option will let you connect to a remote Solana cluster via a proxy that is hosted locally.

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
This container aims to handle the database that stores all the relevant Ethereum processing metadata linked to each other: **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`** etc. This data is consumed by the **indexer** service.

Currently, Neon EVM proxies are hardcoded to work with PostgreSQL. To connect the proxy to a database, you need to start a PostgreSQL container. The default settings are hardcoded in the following docker-compose.yml file. If you want to use your proxy with other settings, you need to register as an operator so that the Neon EVM can recognize your keys.

> Only authorized operators can change the settings of these parameters.

#### Indexer Service
The indexer service indexes all the relevant Ethereum processing metadata consisting of **`signatures`**, **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`**, etc. It gathers all this data from the Solana blockchain, filtering them by the EVM contract address. It also makes it possible to provide our users with the Ethereum API according to the data provided by the whole known operators.

#### Proxy Service
The Proxy service is a core service that allows Ethereum-like transactions to be processed on Solana, taking full advantage of the functionality native to Solana, including the ability to execute transactions in parallel.

The Neon EVM address is registered inside `neonlabsorg/proxy`, so the proxy knows which Neon EVM is running in the Solana cluster. After executing this command, the proxy will be available at `http://localhost:9090/solana`. This address and port are set by default.

#### docker-compose.yml
To create these services, you need to run the `docker-compose` function on the following file, which you should save as docker-compose.yml.

```console
version: "3"

services:
  postgres:
    container_name: postgres
    image: postgres:14.0
    command: postgres -c 'max_connections=1000'
    environment:
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
    hostname: postgres
    healthcheck:
      test: [ CMD-SHELL, "pg_isready -h postgres -p 5432" ]
      interval: 5s
      timeout: 10s
      retries: 10
      # start_period: 5s
    networks:
      - net
    ports:
      - "127.0.0.1:5432:5432"
    expose:
      - "5432"

  dbcreation:
    container_name: dbcreation
    image: neonlabsorg/proxy:latest
    environment:
      SOLANA_URL: http://solana:8899
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
      POSTGRES_HOST: postgres
    entrypoint: proxy/run-dbcreation.sh
    networks:
      - net
    # depends_on:
    #   postgres:
    #     condition: service_healthy

  indexer:
    container_name: indexer
    image: neonlabsorg/proxy:latest
    environment:
      SOLANA_URL: http://solana:8899
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_HOST: postgres
      POSTGRES_PASSWORD: neon-proxy-pass
      CONFIG: ci
      START_SLOT: LATEST
    hostname: indexer
    entrypoint: proxy/run-indexer.sh

    networks:
      - net

  proxy:
    container_name: proxy
    image: neonlabsorg/proxy:latest
    environment:
      - POSTGRES_DB=neon-db
      - POSTGRES_USER=neon-proxy
      - POSTGRES_PASSWORD=neon-proxy-pass
      - POSTGRES_HOST=postgres
      - SOLANA_URL=http://solana:8899
      - EXTRA_GAS=5000
      - EVM_LOADER=53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
      - CONFIG=ci
      - LOG_NEON_CLI_DEBUG=YES
      - USE_COMBINED_START_CONTINUE=yes
      - NEON_CLI_TIMEOUT=60
      - NEW_USER_AIRDROP_AMOUNT=0
      - WRITE_TRANSACTION_COST_IN_DB=NO
      - START_SLOT=LATEST
      - PERM_ACCOUNT_LIMIT=16
    hostname: proxy
    entrypoint: ./proxy/run-proxy.sh
    ports:
      - "9090:9090"
    expose:
      - "9090"
    networks:
      - net


networks:
  net:
    external: yes
    # name: local
```
#### How to Run it in Bash
```bash
docker-compose up -d --quiet-pull
```
The output should look like this:
```console
Creating postgres ... done
Creating dbcreation ... done
Creating indexer ... done
Creating proxy ... done
```

## Network Configuration
  * Solana cluster is accessed via the locally-hosted proxy.
  * Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used, and the proxy interacts with it through the Neon EVM.

A proxy connects to a public [Solana cluster RPC endpoint](https://docs.solana.com/cluster/rpc-endpoints) depending on the *SOLANA_URL* value set. The table below shows the *endpoint* value that is set automatically based on the value of the *CONFIG* variable.

CONFIG | RPC Endpoint
:-|:-
devnet | `https://api.devnet.solana.com`
testnet | `https://api.testnet.solana.com`
mainnet | `https://api.mainnet-beta.solana.com`

To use a different endpoint, you need to specify the variable `-e SOLANA_URL='http://<Solana node RPC endpoint>'` on the command line. For example, in order to use devnet, add the flag `-e SOLANA_URL='https://api.devnet.solana.com'`.

When a proxy is deployed, it generates a wallet containing a key pair. If you do not need the new wallet and want to use the keys you already have, you need to specify the path to your wallet on the command line. In this case, the proxy will not create a new key pair. The command line will look like the following:  

```bash
sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass -v ~/.config/solana/id.json:/root/.config/solana/id.json --name proxy neonlabsorg/proxy:v0.5.1
```
Don't forget to specify the value of the CONFIG variable!

**Command Line Options**
  * `~/.config/solana/id.json` — the path to your key pair.
  * `--name proxy` — specify the proxy name.

If you are not registered as an operator, you can only use test public keys. (The list of available public keys is given in [this table](clusters/neon_proxy_rpc_endpoints.md).) You do not need to specify the key via the -v flag, since it is already hard-coded in the Devnet/Testnet containers. Use the following command:

```bash
sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.5.1
```
Don't forget to specify the value of the CONFIG variable!
