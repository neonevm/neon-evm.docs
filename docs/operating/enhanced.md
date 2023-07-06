---
title: 'Self-Managed: Build with Your Own k8s Cluster'
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comments: todo -- it may be more appropriate to have 1 page detailing all the environment variables common to both local and "enhanced" Proxy as they are the same tooling simply run in different environments
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Who Should Use This Guide

This guide provides instructions on how to run a self-managed instance of Neon Proxy that offers more flexibility, configurability, and control for its Operator. It is designed for:
* More **advanced** operators who would like to build their own Kubernetes clusters from scratch and run Neon Proxy on them
* **Enterprise** operators with cluster solutions on-premise or with third-party public cloud providers such as AWS, Google Cloud, and Microsoft Azure

Please note that operating a self-managed Neon Proxy requires certain technical expertise and a solid understanding of network and security protocols. The operator is responsible for ensuring the security and reliability of the proxy and the Kubernetes cluster it runs on, and will be well-advised to invest time and resources into managing and maintaining them.

## Operator Requirements

### Balance Recommendations

First, you must be **registered** in Solana, which involves creating an account with a balance for storing SOL tokens, and getting the account's public and private keys.

There is no strict minimum amount of SOL tokens required to run as an operator on the Neon EVM. However, you should take into account the fact that you will need SOL tokens to create accounts for new users, deploy contracts, and execute transactions.

In addition to the balance for storing SOL tokens, an operator must also have the `NEON_TOKEN_MINT` balance for storing value tokens. These tokens are used to pay funds from users to an operator for the successful execution of transactions. Depending on the chosen configuration, specific values for `NEON_TOKEN_MINT` are described in the table below.

CONFIG | NEON_TOKEN_MINT
:-|:-
devnet | 89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g
testnet | 89dre8rZjLNft7HoupGiyxu3MNftR577ZYu8bHe2kK7g
local | HPsV9Deocecw3GeZv1FkAPNCBRfuVyfw9MMwjwRe1xaU

To create the `NEON_TOKEN_MINT` balance, you can use the following command:
```bash
spl-token -u <Solana RPC node URL> create-account <NEON_TOKEN_MINT>
```

### Kubernetes

Our operators are based on three kind of kubernetes providers: 
* Local development, using tools such as [microk8s](https://microk8s.io/), [kind](https://kind.sigs.k8s.io/), [minikube](https://minikube.sigs.k8s.io/docs/start/), and [k3s](https://k3s.io/)
* Managed Kubernetes environment with [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine), based on [Google Cloud Platform (GCP)](https://cloud.google.com/)
* Managed Kubernetes environment with [Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/), based on [Amazon Web Services (AWS)](https://aws.amazon.com/)

This means that the following components need to be **installed** on your device prior to proceeding:
* [Kubernetes](https://kubernetes.io/docs/setup/) version ≥ 1.21
* [Helm 3](https://helm.sh/docs/intro/install/), Kubernetes' package manager
* [kubectl](https://kubernetes.io/docs/reference/kubectl/), a command-line tool for Kubernetes' control plane
* [jq](https://stedolan.github.io/jq/), a command-line JSON processor

To set up Kubernetes with k0s, refer to [this guide](/docs/operating/installation/setup_kubernetes).

### Hardware Recommendations

The following table represents the minimum specifications that you need to have to ensure a smooth operator experience.

<Tabs>
  <TabItem value="production" label="Production" default>

|Component|Requirement                           |
|-----|:-----------------------------------------|
|Servers/VMs | At least two (2) with Intel Processor x86_64 |
|CPU | 16 vCPU (for each server/VM) |
|RAM | 32 GB (for each server/VM) |
|Storage | 1 TB |
  </TabItem>
  <TabItem value="development" label="Development/Local">

|Component|Requirement                           |
|-----|:-----------------------------------------|
|Servers/VMs | Intel Processor x86_64 |
|CPU | 8 vCPU |
|RAM | 16 GB |
|Storage | 128 GB |
  </TabItem>
</Tabs>

## Installation

A Neon proxy can be easily spun up using Kubernetes and the installation scripts at [neonlabsorg/infrastructure-kubernetes](https://github.com/neonlabsorg/infrastructure-kubernetes).

First, clone the repository from GitHub:
```bash
git clone https://github.com/neonlabsorg/infrastructure-kubernetes.git
cd infrastructure-kubernetes/
```

:::info
The scripts in [neonlabsorg/infrastructure-kubernetes](https://github.com/neonlabsorg/infrastructure-kubernetes) will deploy the following:
1. The `neon-proxy` namespace 
2. The `proxy-svc` Proxy service  
3. The `indexersvc` Indexer service  
4. For local tests: `airdropper` and `faucet` services (devnet and testnet)
5. Prometheus (used to gather application metrics from proxy and indexer services)
6. Loki (tool for log collection from all applications inside the cluster)
7. Grafana (visualization tool for monitoring metrics)

For the database service, there are two options available, both of which will be described in detail in the following section.
:::

Next, copy the configuration file into `config.ini`:
```bash
cp config.ini.sample config.ini
```

This is where you configure various aspects of how you wish to run your Proxy. Open it with your text editor of choice.

### Configuration

`config.ini` contains environment variables that dictate how the services within the Proxy are run. It is organized into the following sections:
* [`General`](#general)
* [`Solana`](#solana)
* [`Proxy`](#proxy)
* [`Indexer`](#indexer)
* [`Postgres`](#postgres)
* [`Vault`](#vault)

#### `General`

* `P_ENV` - specifies the Neon network environment you will connect to: `devnet`, `testnet`, or `mainnet`.
* `INGRESS_ENABLED` - enables/disables the ingress for the cluster
* `VAULT_ENABLED` - enables/disables [Hashicorp Vault](https://www.vaultproject.io/) container inside your cluster as a service
* `NEON_PROXY_ENABLED` - enables/disables Neon Proxy container
* `POSTGRES_ENABLED` - enables/disables local Postgresql pods (see the [`Postgres` section](#postgres))
* `CLUSTER_TYPE` - specifies the Kubernetes provider used. Options are `"eks"`, `"gke"` or `"localhost"` (see the [Kubernetes section](#kubernetes))
* `NAMESPACE` - specifies the namespace that the Proxy will be deployed inside the cluster. Default is `neon-proxy`
* `KEY_DIR` - path to the directory containing your neon-labs operator keys, relative to the current directory
* `KEY_MASK` - regular expression that finds your operator key JSON files

#### `Solana`

* `SOLANA_URL` - specifies the Solana URL RPC endpoint that a Proxy is connecting to
  * The public Solana endpoints have upper-bound limits for requests per minute (60)
  * It is best for the operator to use their **own** Solana node running on their infrastructure
  * For each endpoint's timeout values, see:

    | CONFIG | SOLANA_URL | NEON_CLIT_TIMEOUT | CANCEL_TIMEOUT | 
    | --- | --- | --- | --- |
    | devnet | https://api.devnet.solana.com/ | 10 | 60 (slot) | 
    | testnet | https://api.testnet.solana.com/ | 15 | 60 (slot) | 
    | local | http://localhost:8899 | 1 | 10 (slot) | 
* `PP_SOLANA_URL` - For standalone Solana, different values (`SOLANA_URL` and `PP_SOLANA_URL`) are necessary. For testnet/devnet/mainnet-beta, you can use the same value for `SOLANA_URL` **and** `PP_SOLANA_URL`. If left empty, `PP_SOLANA_URL`'s value will be the same as `SOLANA_URL`

#### `Proxy`

* `PROXY_VER` - specifies the Proxy/Docker image version
* `PROXY_COUNT` - specifies the the number of pods that you need to host in your cluster namespace
* `PROXY_COUNT` - specifies the number of keys that each pod will use from Hashicorp Vault
* `PROXY_HOST` - if you want to use an ingress to serve your own DNS name inside the cluster, set this variable to point to the host
* `PRX_FAUCET_URL` - specifies the internal name inside your namespace that calls the faucet application (only applicable to local development and devnet)
* `PRX_PROXY_URL` - specifies the address of local Neon Proxy that resides inside in your namespace service
* `PRX_LOG_NEON_CLI_DEBUG` - enables/disables debugging information in Neon CLI logs
* `PRX_PYTH_MAPPING_ACCOUNT` - specifies a [Pyth Network](https://pyth.network/) account
* `PRX_MINIMAL_GAS_PRICE` - specifies the lowest fee for gas price
* `PRX_ENABLE_PRIVATE_API` - allows/disallows use of private APIs
* `PRX_EVM_LOADER` - specifies which EVM loader to use (for local installations only)
  * For each network endpoint's `EVM_LOADER` values, see:  

    | CONFIG | EVM_LOADER | 
    | --- | --- |
    | devnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU | 
    | testnet | eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU | 
    | local | N/A | 
* `PRX_NEON_CLI_TIMEOUT` - sets the timeout limit for Proxy to Solana cluster connectivity
* `PRX_CONFIRM_TIMEOUT` - sets the confirm timeout for Proxy to Solana cluster connectivity

#### `Indexer`

* `IDX_GATHER_STATISTICS`
* `IDX_LOG_FULL_OBJECT_INFO`

#### `Postgres`
The Proxy database is based on [Postgres](https://www.postgresql.org/). For database, we have two options in terms of connectivity:

##### Option 1: Run Postgres database locally inside Kubernetes as a pod
To run the Postgresql database inside Kubernetes as a cluster pod ([StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)) with local storage, simply set 

```bash
POSTGRES_ENABLED="true"
```

##### Option 2: Run your own external Postgres database remotely
Alternatively, you can use your external database from the Kubernetes cluster to your own PostgreSQL database such as RDS(AWS), CloudSQL(GCP), or other bare metal or Virtual Machine-based installation. This option is **recommended** if running in a production environment. Set the following variables to point to your Postgres database:

```bash
POSTGRES_ENABLED="false" # In the "General" section
POSTGRES_HOST="postgres"
POSTGRES_DB="neon-db"
POSTGRES_USER="neon-proxy"
POSTGRES_PORT="5432"
POSTGRES_STORAGE_CLASS="host"
POSTGRES_PASSWORD="SOME_PASSWORD"
```

where
* `POSTGRES_HOST` - specifies the hostname/IP address of your database, if it is being run outside the cluster
* `POSTGRES_DB` - specifies the schema name that will generate inside your database
* `POSTGRES_USER` - specifies your database username
* `POSTGRES_PORT` - specifies your database's TCP port. Default is `5432`
* `POSTGRES_STORAGE_CLASS` - specifies the database's storage class. Options are `"host"` if you set up your database in your local cluster; and `"efs"` if you already have an [AWS Elastic File System (EFS)](https://aws.amazon.com/efs/) storage that will keep your database records
* `POSTGRES_PASSWORD` - specifies the database password of your choosing. If left empty, the password will be randomly generated. 
  * If the password is randomly generated, you can use `kubectl` to get from the secret object and see its value by running
    ```bash
    kubectl get secret postgres-secret #--template={{.data.POSTGRES_PASSWORD}} -n #neon-proxy | base64 --decode
    ```
:::info
**Disclaimer:** For production environments, we strongly recommend external PostgreSQL databases, such as AWS RDS, GCP CloudSQL, or your database installations.
:::

#### `Vault`

The vault component, built on [HashiCorp Vault](https://www.vaultproject.io/), stores your private keys using a secure standard.

* `VAULT_TYPE` - specifies what type of vault is used. Options are `"dev"`, `"standalone"`, or `"ha"`
  * `"dev"`: For local installation/development purposes
  * `"standalone"`: If you only want one container
  * `"ha"`: If you want high availability
* `VAULT_ROOT_TOKEN` - specifies the root token, which is a token that has the `root` policy attached to it, for the vault
* `VAULT_UNSEAL_KEY` - specifies the unseal key, which is a key for unsealing a vault and encrypting the root key

:::caution
Upon the **first** installation of Neon Proxy, a `vault-keys.json` file is generated, and it contains the values for `VAULT_ROOT_TOKEN` and `VAULT_UNSEAL_KEY`. Please make sure to **safeguard** them in a **secure** place and manner. These will be re-used in the future.

For subsequent installations/updates, please uncomment these two variables in `config.ini` and set their values accordingly.

Learn more about how to root token and unseal key work together [here](https://developer.hashicorp.com/vault/tutorials/operations/generate-root).
:::
* `VAULT_KEYS_FILE` - specifies the path to the `vault-keys.json` file
* `VAULT_DEV_TOKEN` - for development environments, use this variable to specify a simple token. Defaults to `"root"`
* `VAULT_KEY_SHARED` - specifies the number of key shares to split the generated master key into. This is the number of "unseal keys" to generate
* `VAULT_KEY_THRESHOLD` - specifies the number of key shares required to reconstruct the root key. This must be less than or equal to `VAULT_KEY_SHARED`
* `VAULT_HA_REPLICAS` - specifies the number of replicas of vault pods inside your cluster

### Running `neon-proxy.sh`
```bash
./neon-proxy.sh -i -f config.ini
```

<!-- retired to retire linked page 
For a list of flags for `neon-proxy.sh`, see the Command-Line Flags (operating/flags.md). -->

Once Kubernetes pulls the necessary images, your Neon proxy will start, displaying a myriad of information, such as the network environment, namespace, keys information, Solana URL, and more.

## Walkthroughs

### Fresh installation in read-only mode without keys

In this option, no operator key is passed to the command, and the proxy runs in read-only mode (`-r`)

[![asciicast](https://asciinema.org/a/aQygYbL2dnszJNm5Pw1f8rGZ7.svg)](https://asciinema.org/a/aQygYbL2dnszJNm5Pw1f8rGZ7)

### Fresh installation with operator keys

Running an operator for the first time and all provisioned migrations (`-i`), with operator keys inside `operator-keypairs-full` path (`-k`) and using a local configuration file (`-f`) named `config.ini.local`

[![asciicast](https://asciinema.org/a/Wr91t5WbJBaWs7AH5m7VXbMBG.svg)](https://asciinema.org/a/Wr91t5WbJBaWs7AH5m7VXbMBG)
