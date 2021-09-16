# Quick operator's guide

*This guide will interest people who want to register with Neon EVM as a Proxy operator for processing transactions on Solana. It is assumed these people have experience compiling Solana-based blockchain nodes or have worked as blockchain validators.*

## Introduction
Ethereum users have the opportunity to run their applications based on smart contracts, on Solana via Neon EVM. Smart contracts generate transactions in accordance with the Ethereum rules and submit them to Neon EVM. Since the structures of Ethereum and Solana transactions differ from each other, Neon EVM contains special Proxy servers responsible for converting and executing transactions in Solana. These servers are configured and maintained by special staff of Neon EVM - proxy operators. 

This guide contains a list of the proxy operator duties, instructions to ensure the successful operation of a proxy and thus the successful execution of transactions.

## Duties of a proxy operator
The main task of a proxy operator is to install software on a server to accept a transaction formed according to Ehereum rules and ensure its execution in Solana, including:
 * Configuring a Proxy server to perform the following operations:
    * Receiving requests over Web3 API protocol.
    * Shaping responses using Web3 API protocol.
    * Converting transactions to Solana format.
 * Connecting a Proxy server to a Solana cluster RPC endoint.
 * Successful execution of transactions.

> All operations related to the execution of transactions on Solana are performed by the software installed on your node.

## Operator requirements

If you have not registered in Solana, you need to do this, that is, create an account with a balance for storing SOL tokens and get the public and private keys.

#### Minimum SOL requirements
There is no strict minimum amount of SOL required to run an operator on Neon EVM. However, you should take into account that you will need tokens to create accounts for new users, deploy contracts, and also to execute transactions.

#### Hardware recommendations
The minimum specifications recommended to choose your node:
  * CPU
    * High Clock Speed 4+ Cores, or more
    * 2.8 GHz, or faster
  * RAM
    * 16 GB, or more
  * Disk space amount
    * 80 GB, or more

#### Software recommendations
The following software should be installed on your node:
  * OS
    * Ubuntu 20.04, or later
    * MacOS Darwin 10.12, or later
  * Docker
  * Docker-compose

> Docker is used only for development purposes. Running an operator inside Docker for a live network is not recommended. This is due to Docker's overall containerization overhead and resultant performance degradation.

#### Networking
Internet service should be at least 300 Mbit/s.

## Installation

After you have choosed a node that meets the listed recommendations, you can start installing a proxy operator software on it.  

### Using Docker

#### Run a daemon

Make sure that you have a daemon running. If you see something like:  
```sh
$ docker info
Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
you need to run the daemon first:
```sh
$ sudo systemctl start docker
```

#### Clone the *proxy-model.py* repository from GitHub

```sh
$ git clone https://github.com/neonlabsorg/proxy-model.py.git
$ cd proxy-model.py
```

#### Start docker

Сreate an image of a machine on which the proxy will run.
When starting docker, you need to set the *CONFIG* environment variable, which can take one of the following values: *local*, *devnet*, *testnet*.

```sh
$ sudo docker run --rm -ti --network=host -e CONFIG=<network mode> cybercoredev/proxy:v0.2.0
```

**The command line options:**
  * `--rm`: delete a container when the command is completed.
  * `-ti`: allocate a pseudo-TTY connected to the container’s stdin; creating an interactive bash shell in the container.
  * `--network host`: use host network.
  * `-e`: set environment variables.
  * `CONFIG=<network mode>`: specifies a Solana cluster operating mode; either `CONFIG=devnet` or `CONFIG=testnet` is recommended.
  * `cybercoredev/proxy:v0.2.0`: the specific proxy name.

This command line will automatically perform all the actions required to launch a docker-conrainer and run a proxy.

To pass your private key (.json file) to the container, you also need to specify the option `-v (--volume)` in the command line:
```
 -v <path-to-keypair-file/id.json>:/root/.config/solana/id.json
```

#### CONFIG values
Each `CONFIG` value (devnet/testnet/local), by default, the corresponding variables are set:
  * `SOLANA_URL`
  * `NEON_CHAIN_ID`
  * `NEON_CLI_TIMEOUT`
  * `EVM_LOADER`
  * `COLLATERAL_POOL_BASE`
  * `ETH_TOKEN_MINT`

When you start docker, you can override all these parameters by specifying different values for them on the command line. The table below shows default values for the following variables:

CONFIG | SOLANA_URL | NEON_CHAIN_ID | NEON_CLI_TIMEOUT
:-|:-|:-|:-
devnet | `https://api.devnet.solana.com` | 0x6e | 10 s
testnet | `https://api.testnet.solana.com` | 0x6f | 15 s
local | `http://localhost:8899` | 0x6f | 0,9 s

**SOLANA_URL**  
Specifies a Solana RPC endpoint that a proxy is connecting to. If you specify `CONFIG=local` and `SOLANA_URL=<your node URL>`, then requests of a proxy will be sent to your node.  

**NEON_CHAIN_ID**  
You can run a proxy with your own chain by specifying `NEON_CHAIN_ID`.  

**NEON_CLI_TIMEOUT**  
In Neon EVM, a transaction is run for emulation before execution to determine accounts that will be involved in it. The `NEON_CLI_TIMEOUT` variable specifies the time (in seconds) required for a transaction to be executed.  

The emulation execution time is affected by the following factors:
  * The geographical distance between a node and proxy.
  * The load of the node due to processing requests at the moment.

Setting the `NEON_CLI_TIMEOUT` time too short may not be sufficient to complete a transaction and pack it into a block. Therefore, `NEON_CLI_TIMEOUT` is set to the smallest value for `CONFIG = local`. Setting the `NEON_CLI_TIMEOUT` value too high may block other users from accessing this node.  

**EVM_LOADER**  
`CONFIG` defaults the following values for the variable `EVM_LOADER`:

CONFIG | EVM_LOADER
:-|:-
devnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU
testnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU
local | deploy

If you set the value to `EVM_LOADER=deploy`, then the new Neon EVM will be deployed.  

**COLLATERAL_POOL_BASE**  
`CONFIG` defaults the following values for the variable `COLLATERAL_POOL_BASE`:

CONFIG | COLLATERAL_POOL_BASE
:-|:-
devnet | 7SBdHNeF9FFYySEoszpjZXXQsAiwa5Lzpsz6nUJWusEx
testnet | 7SBdHNeF9FFYySEoszpjZXXQsAiwa5Lzpsz6nUJWusEx
local | deploy

If you set the value to `COLLATERAL_POOL_BASE=deploy`, then the new collateral pool accounts will be created.  

**ETH_TOKEN_MINT**  
`CONFIG` defaults the following values for the variable `ETH_TOKEN_MINT`:

CONFIG | ETH_TOKEN_MINT
:-|:-
devnet | 89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g
testnet | 89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g
local | deploy

If you set the value to `ETH_TOKEN_MINT=deploy`, then the new collateral pool accounts will be created.
new token will be created.
