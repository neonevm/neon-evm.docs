---
title: Installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Operator Requirements

### Kubernetes

Our operators are based on three kind of kubernetes providers: 
* Local development, using tools such as [microk8s](https://microk8s.io/), [kind](https://kind.sigs.k8s.io/), [minikube](https://minikube.sigs.k8s.io/docs/start/), and [k3s](https://k3s.io/)
* Managed Kubernetes environment with [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine), based on [Google Cloud Platform (GCP)](https://cloud.google.com/)
* Managed Kubernetes environment with [Elastic Kubernetes Service (EKS)](https://aws.amazon.com/eks/), based on [Amazon Web Services (AWS)](https://aws.amazon.com/)

This means that the following components need to be installed on your device prior to proceeding:
* [Kubernetes](https://kubernetes.io/docs/setup/) version > 1.21
* [Helm 3](https://helm.sh/docs/intro/install/), Kubernetes' package manager
* [kubectl](https://kubernetes.io/docs/reference/kubectl/), a command-line tool for Kubernetes' control plane
* [jq](https://stedolan.github.io/jq/), a command-line JSON processor

### Hardware Recommendations

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

This is where you configure various aspects of how you wish to run your proxy. Open it with your text editor of choice.

### Configuration

`config.ini` contains environment variables that dictate how the services within the proxy are run. It is organized into the following sections:
* [`General`](#general)
* `Solana`
* `Proxy`
* [`Postgres`](#postgres)
* `Vault`
* `Prometheus`
* `Grafana`

#### `General`

* `P_ENV` - decides which environment you will connect to: `devnet`, `testnet`, or `mainnet`.
* `INGRESS_ENABLED` - enables/disables the ingress for the cluster
* `VAULT_ENABLED` - enables/disables [Hashicorp Vault](https://www.vaultproject.io/) container inside your cluster as a service
* `NEON_PROXY_ENABLED` - enables/disables neonlabs proxy container
* `POSTGRES_ENABLED` - enables/disables local Postgresql pods (see the [`Postgres` section](#postgres))
* `CLUSTER_TYPE` - indicates the Kubernetes provider used. Options are `"eks"`, `"gke"` or `"localhost"` (see the [Kubernetes section](#kubernetes))
* `NAMESPACE` - indicates the namespace that the proxy will be deployed inside the cluster. Default is `neon-proxy`
* `KEY_DIR` - path to the directory containing your neon-labs operator keys, relative to the current directory
* `KEY_MASK` - regular expression that finds your operator key JSON files

#### `Solana`
The proxy database is based on [Postgres](https://www.postgresql.org/). For database, we have two options:

Here you need to set your ***neon_evm*** host or;

| CONFIG | SOLANA_URL | NEON_CLIT_TIMEOUT | CANCEL_TIMEOUT | 
| --- | --- | --- | --- |
| devnet | https://api.devnet.solana.com/ | 10 | 60 (slot) | 
| testnet | https://api.testnet.solana.com/ | 15 | 60 (slot) | 
| local | http://localhost:8899 | 1 | 10 (slot) | 

#### `Postgres`
The proxy database is based on [Postgres](https://www.postgresql.org/). For database, we have two options:

##### Option 1: Run Postgres database inside Kubernetes as a pod
To run the Postgresql database inside Kubernetes as a pod, simply set 

```bash
POSTGRES_ENABLED="true"
```

##### Option 2: Run your own external Postgres database
Alternatively, you can use your external database from the Kubernetes cluster to your own PostgreSQL database such as RDS(AWS), CloudSQL(GCP) or other bare metal or Virtual Machine-based installation. (Recommended for production)  and then set the following to point to your Postgres database:
```bash
POSTGRES_ENABLED="false" # Set this to false to use your own Postgres database
POSTGRES_HOST="postgres" # Replace with hostname
POSTGRES_DB="neon-db" # Replace with name of database
POSTGRES_USER="neon-proxy" # Replace with database username
```

### Running `neon-proxy.sh`

Once Kubernetes pulls the necessary images, your Neon proxy will start, displaying a myriad of information, such as the chain specification, node name, role, genesis state, and more:

## Examples

### Fresh installation in read-only mode without keys

In this option, no operator key is passed to the command, and the proxy runs in read-only mode (`-r`)

[![asciicast](https://asciinema.org/a/aQygYbL2dnszJNm5Pw1f8rGZ7.svg)](https://asciinema.org/a/aQygYbL2dnszJNm5Pw1f8rGZ7)

### Fresh installation with operator keys

Running an operator for the first time and all provisioned migrations (`-i`), with operator keys inside `operator-keypairs-full` path (`-k`) and using a local configuration file (`-f`) named `config.ini.local`

[![asciicast](https://asciinema.org/a/Wr91t5WbJBaWs7AH5m7VXbMBG.svg)](https://asciinema.org/a/Wr91t5WbJBaWs7AH5m7VXbMBG)


