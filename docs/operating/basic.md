---
title: 'Basic: Local Build in Read-Only Mode'
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

*This guide sets you up with a functional, running neon-proxy on your local machine with `docker-compose` in a matter of minutes with minimal user input required.* 

## Operator requirements

### Hardware requirements

|Component|Requirement                           |
|-----|:-----------------------------------------|
|Operating System | Linux (Ubuntu/CentOS recommended) |
|CPU | 8 vCPU |
|RAM | 16 GB |
|Storage | 500 GB |

### Software requirements

Make sure the following components are **installed** on your device prior to proceeding:
* [Docker Engine](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/) > [v2.12.1](https://docs.docker.com/compose/release-notes/#2121)

## Install and run read-only proxy locally

This part consists of three components: `evm_loader`, `neon_test_invoke_program`, and `proxy`, each of which produces a Docker image of the same name.

### evm_loader

1. Clone the neon-evm GitHub repository
```bash
git clone https://github.com/neonlabsorg/neon-evm.git
```

2. Change directory into the neon-evm repository
```bash
cd neon-evm
```

3. Check out the v0.14.x Git branch
```bash
git checkout v0.14.x
```

4. Update the Git submodule 
```bash
git submodule update --init
```

5. Export Solana-specific environment variables
```bash
export SOLANA_REVISION=v1.11.10
export SOLANA_IMAGE=solanalabs/solana:v1.11.10
export REVISION=v0.14.1
```

6. Build the evm_loader Docker image
```bash
docker build --build-arg SOLANA_REVISION=$SOLANA_REVISION --build-arg SOLANA_IMAGE=$SOLANA_IMAGE --build-arg REVISION=$REVISION --tag neonlabsorg/evm_loader:v0.14.1 .
```

:::info
You can safely ignore errors like the following:
> ```Error: Function _ZN8evm_core15primitive_types4U51215overflowing_pow17hb39293b73e96c896E Stack offset of 4312 exceeded max offset of 4096 by 216 bytes, please minimize large stack variables```
:::


### neon_test_invoke_program
1. Clone the neon-test-invoke-program GitHub repository
```bash
git clone https://github.com/neonlabsorg/neon-test-invoke-program.git
```

2. Change directory into the neon-test-invoke-program repository
```bash
cd neon-test-invoke-program
```

3. Build the neon_test_invoke_program Docker image
```bash
docker build --tag neonlabsorg/neon_test_invoke_program:develop .
```

### proxy

1. Clone the proxy-model.py GitHub repository
```bash
git clone https://github.com/neonlabsorg/proxy-model.py.git
```

2. Change directory into the proxy-model.py repository
```bash
cd proxy-model.py
```

3. Export Neon proxy environment variables
```bash
export NEON_EVM_COMMIT=v0.14.1
export PROXY_REVISION=v0.14.5
export PROXY_LOG_CFG=log_cfg.json
```

4. Build the proxy Docker image
```bash
docker build --build-arg NEON_EVM_COMMIT=$NEON_EVM_COMMIT --build-arg PROXY_REVISION=$PROXY_REVISION --build-arg PROXY_LOG_CFG=$PROXY_LOG_CFG --tag neonlabsorg/proxy:v0.14.5 .
```

### Run Proxy in read-only mode
With the required Docker images built, you can now run `docker-compose` with `sudo` to run the proxy in read-only mode
```bash
sudo SOLANA_URL="https://api.devnet.solana.com" REVISION="v0.14.5" docker-compose -f docker-compose-operator-ro.yaml up -d
```
where:

* `SOLANA_URL` is your RPC endpoint of choice.
* `REVISION` is the version of choice or `"stable"` to use the stable version

<!-- retired to retire linked page
 and can be found in {the RPC endpoints table}(/docs/clusters/neon_proxy_rpc_endpoints.md)
* `REVISION` is the version of choice or `"stable"` to use the stable version -->

### Database
The Docker Composer will use your local disk as storage for the proxy's PostgreSQL database:
```yaml
volumes:
    - db:/var/lib/postgresql/data
```

The `db` scheme is related to local driver from the Docker daemon:
```yaml
volumes:
  db:
    driver: local
```

### Environment variables
Some container environments need attention for production, such as:

```yaml
POSTGRES_DB: neon-db
POSTGRES_USER: neon-proxy
POSTGRES_PASSWORD: neon-proxy-pass
POSTGRES_HOST: postgres
```

For read-only mode,   ``` ENABLE_SEND_TX_API: "NO" ``` should stay as "NO" for correct usage. This is how application works without operator-keys.

#### PYTH_MAPPING_ACCOUNT

The `PYTH_MAPPING_ACCOUNT` environment variable follow the current structure from [the Pyth Network documentation](https://pyth.network/developers/accounts). For Neon's networks, its respective values are:

|Network|`PYTH_MAPPING_ACCOUNT`                           |
|-----|:-----------------------------------------|
|Devnet | BmA9Z6FjioHJPpjT39QazZyhDRUdZy2ezwx4GiDdE2u2 |
|Testnet | AFmdnt9ng1uVxqCmqwQJDAYC5cKTkw8gJKSM5PnzuF6z |
|mainnet-beta | AHtgzX45WTKfkPG53L6WYhGEXwQkN1BVknET3sVsLL8J |

#### EVM_LOADER

The `EVM_LOADER` environment variable's values are:

|Network|`EVM_LOADER`                         |
|-----|:-----------------------------------------|
|Devnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU |
|Testnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU |

### Execute the install script and monitor logs

Run the install script
```bash
./install.sh
```

In another terminal, check your containers' logs
```bash
$ docker logs -f proxy --tail 10
2022-11-25 12:07:19.294 I run-proxy.sh:3 1 Proxy:StartScript {} Start Proxy service
2022-11-25 12:07:19.296 I run-proxy.sh:5 1 Proxy:StartScript {} Init environment set
Config File: /root/.config/solana/cli/config.yml
RPC URL: https://api.devnet.solana.com 
WebSocket URL: ws:https://api.devnet.solana.com
Keypair Path: /root/.config/solana/id.json 
Commitment: confirmed 
2022-11-25 12:07:19.303 I run-proxy.sh:7 1 Proxy:StartScript {} run-proxy
```

Voila, the endpoint [http://127.0.0.1:9090/solana](http://127.0.0.1:9090/solana) can be now accessed with your local MetaMask for testing purposes.
