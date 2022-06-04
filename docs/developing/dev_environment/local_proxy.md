---
title: Setting up a Local Proxy
---

### Step 1: Docker
Docker images themselves are never "started" and never "running". The `docker run` command takes the Docker image as a template and produces a container from it. Before starting your proxy container, you need to start service containers.

Make sure that you have a daemon running. If you see something like:
```bash
$ docker info

Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
you need to run the daemon first:
```bash
$ sudo systemctl start docker
```

Currently, Neon EVM proxies are hardcoded to work with PostgreSQL. To connect the proxy to a database, you need to start a PostgreSQL container. For a quick start of PostgreSQL, most of the configurable parameters can be left as they are by default, with the exception of the password, which must be set explicitly. To start the PostgreSQL container, use the following command:

```bash
$ sudo docker run --rm -ti --network=host -e POSTGRES_HOST=localhost -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass --name=postgres postgres:14.0
```

If you want to use your proxy with other settings, you need to register as an operator so that the Neon EVM can recognize your keys.

> Only authorized operators can change the settings of these parameters.

### Step 2: Start and Configure the Proxy

Start the proxy and connect it to the Docker network:
```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.5.1
```

**Command Line Arguments**  
  * `CONFIG=<network>` — specifies a Solana network configuration; `CONFIG=devnet` is recommended.
  * `neonlabsorg/proxy:v0.5.1` — specific Neon EVM proxy.

The Neon EVM address is registered inside `neonlabsorg/proxy:v0.5.1`, so the proxy knows which Neon EVM is running in the Solana cluster.

After executing this command, the proxy will be available at `http://localhost:9090/solana`. This address and port are set by default.

### Step 3: Run Database Services

This container aims to handle the database that stores all the relevant Ethereum processing metadata linked to each other: **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`** etc. This data is consumed by the **indexer** service.

#### docker-compose.yml

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
          start_period: 5s
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
        depends_on:
          postgres:
            condition: service_healthy


    networks:
      net:
        external: yes
        name: local

#### How to Run it in Bash

    $ docker-compose -f postgres/docker-compose.yml pull
    $ docker-compose -f postgres/docker-compose.yml up -d

### Step 4: Run the Indexer Service

The indexer service indexes all the relevant Ethereum processing metadata consisting of **`signatures`**, **`transactions`**, **`blocks`**, **`receipts`**, **`accounts`**, etc. It gathers all this data from the Solana blockchain, filtering them by the EVM contract address. It also makes it possible to provide our users with the Ethereum API according to the data provided by the whole known operators.

#### docker-compose.yml

    version: "3"

    services:
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

    networks:
      net:
        external: yes
        name: local

#### How To Run it in Bash

    $ docker-compose -f indexer/docker-compose.yml pull
    $ docker-compose -f indexer/docker-compose.yml up -d

### Step 5: Run the Proxy Service

The Proxy service is a core service that allows Ethereum-like transactions to be processed on Solana, taking full advantage of the functionality native to Solana, including the ability to execute transactions in parallel. It's available on 9090 port.

#### docker-compose.yml

    version: "3"

    services:
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
        name: local

#### How to Run it in Bash

    $ docker-compose -f proxy/docker-compose.yml pull
    $ docker-compose -f proxy/docker-compose.yml up -d