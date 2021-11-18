# Quick Operator's Guide

*This guide is for people who want to register with Neon EVM as a proxy operator for processing transactions on Solana. It is assumed these people have previous experience compiling Solana-based blockchain nodes or have worked as blockchain validators.*

## Introduction
Ethereum users have the opportunity to run their smart contract-based applications on Solana via Neon EVM. Smart contracts generate transactions in accordance with the Ethereum rules and submit them to Neon EVM. Since the structures of Ethereum and Solana transactions differ from each other, Neon EVM contains special proxy servers that are responsible for converting and executing transactions in Solana. These servers are configured and maintained by Neon EVM proxy operators.

This guide contains a list of the proxy operator’s duties, as well as instructions to ensure the successful operation of a proxy and the successful execution of transactions.

## Duties of a Proxy Operator
A proxy operator’s main task is to install software on a server to accept a transaction formed according to Ethereum rules, and to ensure its execution in Solana. This involves:
 * Configuring a proxy server to perform the following operations:
    * Receiving requests over Web3 API protocol.
    * Shaping responses using Web3 API protocol.
    * Converting transactions to Solana format.
 * Connecting a proxy server to a Solana cluster RPC endpoint.
 * Successfully executing transactions.

> All operations related to the execution of transactions on Solana are performed by the software installed on your node.

## Operator Requirements

First, you must be registered in Solana, which involves creating an account with a balance for storing SOL tokens, and getting the public and private keys.
There is no strict minimum amount of SOL required to run an operator on Neon EVM. However, you should take into account that you will need tokens to create accounts for new users, deploy contracts, and execute transactions.

In addition to the balance for storing SOL tokens, an operator must also have the `ETH_TOKEN_MINT`balance for storing value tokens. These tokens are used to pay funds from users to an operator for the successful execution of transactions. Depending on the chosen configuration, specific values for `ETH_TOKEN_MINT` are indicated in the [table](#eth_token_mint) below.

To create the `ETH_TOKEN_MINT` balance, you can use the following command:
```
spl-token -u <Solana RPC node URL> create-account <ETH_TOKEN_MINT>
```

### Hardware recommendations
The minimum specifications recommended to your Neon EVM proxy:
  * CPU
    * High clock speed: 4+ cores or more
    * 2.8 GHz or faster
  * RAM
    * 16 GB or more
  * Disk space
    * 80 GB or more

> Do not use a public or shared Solana RPC node for your Neon EVM proxy. Use only the device that you control.

In addition to the Neon EVM proxy you need a Solana RPC node. It should be a dedicated RPC node with low latency to interact with your Neon EVM proxy.

The minimum specifications recommended to your Solana RPC node:
  * 256 GB memory
  * 16 cores
  * EPIC Gen 2 or Gen 3
  * Core isolation
  * [Tmpfs](https://docs.neon-labs.org/docs/glossary#tmpfs)

### Software recommendations
The following software should be installed on your Neon EVM proxy:
  * OS
    * Ubuntu 20.04 or later
    * macOS Darwin 10.12 or later
  * Docker
  * Docker Compose

> Docker is used only for development purposes. Running an operator inside Docker for a live network is not recommended due to Docker's overall containerization overhead and the resulting performance degradation.

### Networking
Internet service should be at least 300 Mbps.

## Installation Using Docker

After you have chosen the node (Neon EVM proxy) that meets the listed recommendations, you can start installing a proxy operator software on it.

### Run a daemon

Make sure that you have a daemon running. If you see something like:

```bash
$ docker info

Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```

you need to run the daemon and PostgreSQL services first:

```bash
$ sudo systemctl start docker
$ sudo docker run --rm -ti --network=host -e POSTGRES_HOST=<localhost|postgres> -e POSTGRES_DB=<database> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> --name=postgres postgres:14.0
```

**The command line options:**
  * `--rm` — delete a container when the command is completed.
  * `-ti` — allocate a pseudo-TTY connected to the container’s stdin; creating an interactive bash shell in the container.
  * `--network host` — use host network.
  * `-e POSTGRES_HOST=<localhost|postgres>` — specifies DB hosting; `localhost` is set by default and is recommended; the parameter can be skipped if you use PostgreSQL hosted locally.
  * `-e POSTGRES_DB=<database>` — specifies the name of DB; `neon-db` is recommended.
  * `-e POSTGRES_USER=<username>` — specifies a username of DB; `neon-proxy` is recommended.
  * `-e POSTGRES_PASSWORD=<password>` — specifies a username's password; `neon-proxy-pass` is recommended.
  * `--name=postgres` — specifies a version of PostgreSQL; `postgres:14.0` is recommended.

*Example:*
```bash
$ sudo docker run --rm -ti --network=host -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass --name=postgres postgres:14.0
```

### Start a proxy in a Docker container

Create and run a proxy container on the daemon.
When starting Docker, you need to set the *CONFIG* environment variable, which can take one of the following values: *local*, *devnet*, *testnet*.

```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=<database> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -v <path-to-keypair-file/id.json>:/root/.config/solana/id.json neonlabsorg/proxy:v0.4.0
```

**The command line options:**
  * `-e CONFIG=<network>` — specifies a Solana network configuration; `CONFIG=devnet` is recommended.
  * `-v <path-to-keypair-file/id.json>:/root/.config/solana/id.json` — specifies the path to the .JSON file where your keypair is stored and passes your private key to the container.
  * `neonlabsorg/proxy:v0.4.0` — the specific proxy image.

> The option `-v <path-to-keypair-file>` is only relevant for authorized operators. If you are not yet registered as an operator and are just about to become one, you do not need to specify this option.

This command line will automatically perform all the actions required to launch a Docker container and run a proxy.

*Example:*
```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=devnet -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.4.0
```

### CONFIG values
Each `CONFIG` value (devnet/testnet/local), by default, the corresponding variables are set:
  * `SOLANA_URL`
  * `NEON_CLI_TIMEOUT`
  * `CANCEL_TIMEOUT`
  * `POSTGRES_HOST`
  * `MINIMAL_GAS_PRICE`
  * `EVM_LOADER`

When you start Docker, you can override all these parameters by specifying different values for them on the command line. The table below shows default values for the following variables:

CONFIG | SOLANA_URL | NEON_CLI_TIMEOUT | CANCEL_TIMEOUT | POSTGRES_HOST | MINIMAL_GAS_PRICE
:-|:-|:-|:-|:-|:-
devnet | `https://api.devnet.solana.com` | 10 (s) | 60 (slot) | localhost | 1
testnet | `https://api.testnet.solana.com` | 15 (s) | 60 (slot) | localhost | 1
local | `http://localhost:8899` | 0,9 (s) | 10 (slot) | localhost | 0

#### SOLANA_URL
Specifies a Solana RPC endpoint that a proxy is connecting to. If you specify `CONFIG=local` and `SOLANA_URL=<your node URL>`, then requests of a proxy will be sent to your node.

#### NEON_CLI_TIMEOUT
In Neon EVM, a transaction is run for emulation before execution to determine the accounts that will be involved in it. The `NEON_CLI_TIMEOUT` variable specifies the time (in seconds) required for a transaction to be executed.

The emulation execution time is affected by the following factors:
  * The geographical distance between a node and proxy.
  * The load of the node due to processing requests at the moment.

Setting the `NEON_CLI_TIMEOUT` time too short may not be sufficient to complete a transaction and pack it into a block. Therefore, `NEON_CLI_TIMEOUT` is set to the smallest value for `CONFIG = local`. Setting the `NEON_CLI_TIMEOUT` value too high may block other users from accessing this node.

#### CANCEL_TIMEOUT
This parameter limits the time (in [slots](https://docs.neon-labs.org/docs/glossary#slot)) for blocking an account. If the blocking time for the account exceeds the time specified in this parameter, an attempt will be made to cancel the transaction that blocked this account.

#### MINIMAL_GAS_PRICE
This parameter sets the lowest possible gas price specified in a transaction.

#### EVM_LOADER
`CONFIG` defaults the following values for the variable `EVM_LOADER`:

CONFIG | EVM_LOADER
:-|:-
devnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU
testnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU
local | —
