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

It will deploy the following:
1. The `neon-proxy` namespace 
2. The `proxy-svc` Proxy service  
3. The `indexersvc` Indexer service  
4. For local tests: `airdropper` and `faucet` services (devnet and testnet)
5. Prometheus (used to gather application metrics from proxy and indexer services)
6. Loki (tool for log collection from all applications inside the cluster)
7. Grafana (visualization tool for monitoring metrics)

Next, copy and set environment variables:
```bash
cp config.ini.sample config.ini
```

### Configuration

`config.ini` contains environment variables.

`P_ENV` decides which environment you will connect to: devnet, testnet, or mainnet.

## Examples

### Fresh installation in read-only mode without keys

In this option, no operator key is passed to the command, and the proxy runs in read-only mode (`-r`)

[![asciicast](https://asciinema.org/a/aQygYbL2dnszJNm5Pw1f8rGZ7.svg)](https://asciinema.org/a/aQygYbL2dnszJNm5Pw1f8rGZ7)

### Fresh installation with operator keys

Running an operator for the first time and all provisioned migrations (`-i`), with operator keys inside `operator-keypairs-full` path (`-k`) and using a local configuration file (`-f`) named `config.ini.local`

[![asciicast](https://asciinema.org/a/Wr91t5WbJBaWs7AH5m7VXbMBG.svg)](https://asciinema.org/a/Wr91t5WbJBaWs7AH5m7VXbMBG)


