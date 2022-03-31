---
title: Connecting to the Neon Proxy
---

*This section can be useful as a reference for:*
  * *authorized operators for connecting their proxies to solana nodes so that they can stream requests to Neon EVM through the proxies to a solana network.*
  * *users who intend to become proxy operators; they can learn how to connect a proxy to [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet).*
  * *developers to debug their solidity contracts by hosting a proxy and a solana node locally.*
## Goal
*Connect to the Solana cluster via a proxy server.*

Depending on the tasks to be solved, as well as on the location of the proxy and [Solana](https://docs.solana.com/introduction), you can use one of 3 options for configuring the network:
  * [Option 1:](#option-1-interaction-with-the-solana-cluster-via-a-proxy-hosted-on-a-remote-virtual-server) The proxy is hosted on a remote virtual server; Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used.
  * [Option 2:](#option-2-running-solana-cluster-via-a-proxy-hosted-locally) The proxy is hosted locally; Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used.
  * [Option 3:](#option-3-running-solana-via-a-proxy-when-both-are-hosted-locally) Both the proxy and Solana are hosted locally (debug mode, which allows you to configure your node locally).

[Testnet](https://docs.solana.com/clusters#testnet), like [Devnet](https://docs.solana.com/clusters#devnet), is an alternative cryptocurrency chain exclusively for developers. It allows developers to run their node in a test blockchain and experiment without losing real currency.  
The mainnet, testnet, and devnet coins are incompatible with each other. Testnet and devnet coins have no value and developers cannot treansfer mainnet coins to testnet/devnet. Likewise, they cannot transfer testnet/devnet coins to mainnet.

## Requirements for your device

The MetaMask wallet must be installed on your device.  

> Although this tutorial uses the *Ubuntu* platform, the instructions provided can be applied to other Linux platforms.

## Option 1: Interaction with the Solana cluster via a proxy hosted on a remote virtual server

### The network configuration
  * [Solana cluster](https://docs.solana.com/cluster/overview) is accessed via a proxy hosted on a remote virtual server.
  * Solana works in test mode (recommended) and the proxy interacts with it through Neon EVM.

### Step 1
Open your MetaMask wallet and in the upper-right corner, click the identical.  
Click `Create Account` in the dropdown menu and add one more account to interact with the network configured.

### Step 2
Open your wallet under the new account and click `Settings` in the dropdown menu.  
The settings menu window to selecting a network should open.  

### Step 3
Click `Add Network` in the top-right corner.  
To connect to the Solana [Devnet](https://docs.solana.com/clusters#devnet) cluster, in the window opened fill in the fields, for example:
  * `Network Name`: "remote proxy — solana devnet"
  * `New RPC URL`: `https://proxy.devnet.neonlabs.org/solana`
  * `Chain ID`: 245022926
  * `Currency Symbol`: NEON

To connect to the Solana [Testnet](https://docs.solana.com/clusters#testnet) cluster, in the window opened fill in the fields, for example:
  * `Network Name`: "remote proxy — solana testnet"
  * `New RPC URL`: `https://proxy.testnet.neonlabs.org/solana`
  * `Chain ID`: 245022940
  * `Currency Symbol`: NEON

> **Note:** We recommend that you use Devnet instead of Testnet, as Devnet is more stable and reliable.

To connect to the Solana [Mainnet](https://docs.solana.com/clusters#mainnet-beta) cluster, in the window opened fill in the fields, for example:
  * `Network Name`: "remote proxy — solana mainnet-beta"
  * `New RPC URL`: (will be published after MVP on Mainnet)
  * `Chain ID`: 245022934
  * `Currency Symbol`: NEON

> Only authorized operators can connect proxies to Mainnet, since access to any solana node through Neon EVM is possible only with an operator's private key.

### Step 4
After filling in the field click `Save`. You can now access to the [Solana cluster](https://docs.solana.com/clusters) and carry out transactions.

## Option 2: Running Solana cluster via a proxy hosted locally

### The network configuration
  * Solana cluster is accessed via the proxy hosted locally.
  * Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used and the proxy interacts with it through Neon EVM.

### Step 1
Docker images themselves are never "started" and never "running". The docker run command takes the Docker image as a template and produces a container from it. Before starting your proxy container, you need to start service containers.

Make sure that you have a daemon running. If you see something like:
```bash
$ docker info

Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
you need to run the daemon first:
```bash
$ sudo systemctl start docker
```
Currently, Neon EVM proxies are hard-coded to work with PostgreSQL. To connect the proxy to DB, you also need to start the PostgreSQL container before. For a quick start of PostgreSQL, most of the configurable parameters can be left as they are, by default, with the exception of the password, which must be set explicitly. To start the PostgreSQL container, you can use the following command:

```bash
$ sudo docker run --rm -ti --network=host -e POSTGRES_HOST=localhost -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass --name=postgres postgres:14.0
```

If you want to use your proxy with other settings, you need to register as an operator so that the Neon EVM can recognize your  keys.

> Only authorized operators can change the settings of these parameters.

### Step 2

Start the proxy and connect it to the Docker network:
```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.5.1
```

**The command line parameters:**  
  * `CONFIG=<network>` — specifies a Solana network configuration; `CONFIG=devnet` is recommended.
  * `neonlabsorg/proxy:v0.5.1` — specific Neon EVM proxy.

The Neon EVM address is registered inside `neonlabsorg/proxy:v0.5.1`, so the proxy knows which Neon EVM is running in Solana cluster.

After executing this command, the proxy will be available at `http://localhost:9090/solana`. This address is set by default.

A proxy connects to public [Solana cluster RPC endoint](https://docs.solana.com/cluster/rpc-endpoints) depending on the *SOLANA_URL* value set. The table below shows *endpoint* value that are set automatically when specifying *CONFIG*.

CONFIG | RPC endpoint
:-|:-
devnet | `https://api.devnet.solana.com`
testnet | `https://api.testnet.solana.com`
mainnet | `https://api.mainnet-beta.solana.com`

To use a different endpoint, you need to specify the variable `-e SOLANA_URL='http://<Solana-node RPC endpoint>'` on the command line.

When a proxy is deployed, it generates a wallet containing a key pair. If you do not need the new wallet and want to use the keys you already have, then you need to specify the path to your wallet on the command line. In this case, the proxy will not create a new key pair. The command line will look like the following:  

```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass -v ~/.config/solana/id.json:/root/.config/solana/id.json --name proxy neonlabsorg/proxy:v0.5.1
```

**The command line options:**
  * `~/.config/solana/id.json` — the path to your key pair.
  * `--name proxy` — specify the proxy name.

If you is not registered as an operator, you can only use test public keys (the list of available public keys is given in the [table](clusters/neon_proxy_rpc_endpoints.md)). You do not need to specify the key via the -v flag, since it is already hard-coded in Devnet/Testnet containers. Use the following command:

```bash
sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.5.1
```

## Option 3: Running Solana via a proxy when both are hosted locally
This option can be useful for developers who want to debug their solidity contracts by hosting a proxy and a solana node locally.

### The network configuration
  * Both the Solana node and the proxy are hosted locally.
  * The proxy interacts with the Solana node through Neon EVM.

Upload the docker-compose-test.yml file to your currently directory using the following command:
```bash
$ wget https://raw.githubusercontent.com/neonlabsorg/proxy-model.py/master/proxy/docker-compose-test.yml
```
Execute the command:
```bash
$ sudo REVISION=stable docker-compose -f docker-compose-test.yml up -d
```
As soon as the latest command is completed, the proxy will start to deploy Neon EVM in a local solana node. After that, the proxy and Solana will be available at the URLs `http://localhost:9090/solana` and `http://localhost:8899`, respectively.

---  

> **Note:**  
> As a proxy, you can use the dedicated neon server, or a separate server that you will need to deploy and log into it.
>
> As a Solana endpoint, you can use a separate node hosted on devnet or testnet.  
> You can also use a Solana node that is not hosted on any network. In this case, you will need to configure this node and synchronize it with the devnet or testnet network. Then you will need to deploy the local proxy and configure it to work with this node. You will also need to connect to the EVM loader deployed within devnet or testnet.
