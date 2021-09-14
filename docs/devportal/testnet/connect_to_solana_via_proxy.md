# Connecting to the Solana cluster via proxy server

## Goal

Depending on the tasks to be solved, as well as on the location of the proxy and [Solana](https://docs.solana.com/introduction), you can use one of 3 options for configuring the network:
  * [Option 1:](#option-1-interaction-with-the-solana-cluster-via-a-proxy-hosted-on-a-remote-virtual-server) The proxy is hosted on a remote virtual server; either Solana Testnet or Solana Devnet is used.
  * [Option 2:](#option-2-running-solana-testnet-via-a-proxy-hosted-locally) The proxy is hosted locally; either Solana Testnet or Solana Devnet is used.
  * [Option 3:](#option-3-running-solana-via-a-proxy-when-both-are-hosted-locally) Both the proxy and Solana are hosted locally (debug mode, which allows you to configure your node locally).

[Solana Testnet](https://docs.solana.com/clusters#testnet), like [Solana Devnet](https://docs.solana.com/clusters#devnet), is an alternative cryptocurrency chain exclusively for developers. It allows developers to run their node in a test blockchain and experiment without losing real currency.  
The mainnet, testnet, and devnet coins are incompatible with each other. Testnet and devnet coins have no value and developers cannot treansfer mainnet coins to testnet/devnet. Likewise, they cannot transfer testnet/devnet coins to mainnet.

## Requirements for your device

The MetaMask wallet must be installed on your device.  

> Although this tutorial uses the *Ubuntu* platform, the instructions provided can be applied to other Linux platforms.  

## Option 1: Interaction with the Solana cluster via a proxy hosted on a remote virtual server

**The network configuration:**
  * [Solana cluster](https://docs.solana.com/cluster/overview) is accessed via a proxy hosted on a remote virtual server.
  * Solana works in test mode and the proxy interacts with it through the EVM-loader.

#### Step 1
Open your MetaMask wallet and in the upper-right corner, click the identical.  
Click `Create Account` in the dropdown menu and add one more account to interact with the network configured.  

#### Step 2
Open your wallet under the new account and click `Settings` in the dropdown menu.  
The settings menu window to selecting a network should open.  

#### Step 3
Click `Add Network` in the top-right corner.  
To connect to the [Solana Testnet cluster](https://docs.solana.com/clusters#testnet), in the window opened fill in the fields, for example:
  * `Network Name`: "remote proxy - solana testnet"
  * `New RPC URL`: `https://proxy.testnet.neonlabs.org/solana`
  * `Chain ID`: 111
  * `Currency Symbol`: SYM

To connect to the [Solana Devnet cluster](https://docs.solana.com/clusters#devnet), in the window opened fill in the fields, for example:
  * `Network Name`: "remote proxy - solana devnet"
  * `New RPC URL`: `https://proxy.devnet.neonlabs.org/solana`
  * `Chain ID`: 110
  * `Currency Symbol`: SYM

#### Step 4
After filling in the field click `Save`. Now you have access to the [Solana cluster](https://docs.solana.com/clusters) and can carry out transactions.

## Option 2: Running Solana cluster via a proxy hosted locally

**The network configuration:**
  * Solana cluster is accessed via the proxy hosted locally.
  * Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet) is used and the proxy interacts with it through the EVM-loader.

#### Step 1
Before you start, make sure that you have a daemon running. If you see something like:  
```sh
$ docker info
Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
you need to run the daemon first:
```sh
$ sudo systemctl start docker
```

#### Step 2

Start the proxy and connect it to the Docker network:
```sh
$ sudo docker run --rm -ti --network=host -e CONFIG=<network mode> cybercoredev/proxy:v0.2.0
```

**The command line options:**  
  * `--rm`: delete a container when the command is completed.
  * `-ti`: allocate a pseudo-TTY connected to the container’s stdin; creating an interactive bash shell in the container.
  * `--network host`: use host network.
  * `-e`: set environment variables.
  * `CONFIG=<network mode>`: specifies a solana operating mode; either `CONFIG=devnet` or `CONFIG=testnet` is recommended.
  * `cybercoredev/proxy:v0.2.0`: specific proxy name.

The EVM-loader address is registered inside `cybercoredev/proxy:v0.2.0`, so the proxy knows which EVM-loader is running in Solana cluster.

After executing this command, the proxy will be available at `http://localhost:9090/solana`. This address is set by default.

A proxy connects to public [Solana cluster RPC endoint](https://docs.solana.com/cluster/rpc-endpoints) depending on the *SOLANA_URL* value set. The table below shows *endpoint* value that are set automatically when specifying *CONFIG*.

CONFIG | RPC endpoint
:-|:-
devnet | `https://api.devnet.solana.com`
testnet | `https://api.testnet.solana.com`

To use a different endpoint, you need to specify the variable `-e SOLANA_URL='http://<Solana-node RPC endpoint>'` on the command line.

When a proxy is deployed, it generates a wallet containing a key pair. If you do not need the new wallet and want to use the keys you already have, then you need to specify the path to your wallet on the command line. In this case, the poxy will not create a new key pair. The command line will look like the following:  

```sh
$ sudo docker run --rm -d --network=host -v ~/.config/solana/id.json:/root/.config/solana/id.json --name proxy cybercoredev/proxy:v0.2.0
```

**The command line options:**
  * `-d`: detach a terminal.
  * `~/.config/solana/id.json`: the path to your key pair.
  * `--name proxy`: specify the proxy name.

## Option 3: Running Solana via a proxy when both are hosted locally

**The network configuration:**
  * Both the Solana cluster and the proxy are hosted locally.
  * The proxy interacts with Solana through the EVM-loader.

Upload the docker-compose-test.yml file to your currently directory using the following command:
```sh
$ wget https://raw.githubusercontent.com/neonlabsorg/proxy-model.py/master/proxy/docker-compose-test.yml
```
Execute the command:
```sh
$ sudo REVISION=stable docker-compose -f docker-compose-test.yml up -d
```
As soon as the latest command is completed, the proxy will start to deploy the EVM-loader in a local solana node. After that, the proxy and Solana will be available at the URLs `http://localhost:9090/solana` and `http://localhost:8899`, respectively.

