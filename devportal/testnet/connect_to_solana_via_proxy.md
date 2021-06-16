# Connecting to Solana Testnet via a Proxy Server

## Goal

To connect to Solana EVM-loader through a proxy server and run Solana Testnet.  

Depending on the tasks to be solved, as well as on the location of the proxy and Solana, you can use one of 3 options for configuring the network:
  * *Option 1:* The proxy is hosted on a remote virtual server; Solana Testnet is used.
  * *Option 2:* The proxy is hosted locally; Solana Testnet is used.
  * *Option 3:* Both the proxy and Solana are hosted locally (debug mode, which allows you to configure your node locally).
  
Solana Testnet is an alternative cryptocurrency chain exclusively for developers. It allows developers to run their node in a test blockchain and experiment without losing real currency.  
The mainnet and testnet coins are incompatible with each other. Testnet coins have no value and developers cannot treansfer mainnet coins to testnet. Likewise, they cannot transfer testnet coins to mainnet.

## Requirements for your device

The MetaMask wallet must be installed on your device.  

> Although this tutorial uses the *Ubuntu* platform, the instructions provided can be applied to other Linux platforms.  

## Option 1: Interaction with Solana Testnet via a proxy hosted on a remote virtual server

**The network configuration:**
  * Solana cluster is accessed via a proxy hosted on a remote virtual server.
  * Solana works in test mode and the proxy interacts with it through the EVM-loader.

**Step 1.** Open your MetaMask wallet and in the upper-right corner, click the red apple view element.  
Click `Create Account` in the dropdown menu and add one more account to interact with the network configured.  

**Step 2.** Open your wallet under the new account and click `Settings` in the dropdown menu.  
The window with a settings menu for selecting a network should open.  

**Step 3.** Add the Network choosed and click `Add Network` in the top-right corner.
 In the window opened fill in the fields (an example of filling them is below):  
  * `Network Name` - "remote proxy - solana testnet"
  * `New RPS URL` - https://<remote proxy address>:<remote proxy port>/solana
  * `Chain ID` - 111
  * `Currency Symbol` - SYM

**Step 4.** After filling in the field click `Save` to keep settings. Now you have access to Solana Testnet and can make transactions.

## Option 2: Running Solana Testnet via a proxy hosted locally

**The network configuration:**
  * Solana cluster is accessed via the proxy hosted locally.
  * Solana Testnet is used and the proxy interacts with it through the EVM-loader.

**Step 1.** Before you start, make sure that you have a daemon running. If you see something like this one:  
```sh
$ docker info
Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
that means you need to run the daemon first.
```sh
$ sudo systemctl start docker
```

**Step 2.** Start the proxy and connect it to the Docker network:

```sh
$ sudo docker run --rm -d --network host --name proxy cybercoredev/proxy:latest
```

**The command line options:**
  * `--rm` - deleting a container when the command is completed.
  * `-d` - detach a terminal.
  * `--network host` - use host network.
  * `--name proxy` - this specifies the proxy name (`cybercoredev/proxy:latest` - this is the specific image name. The EVM-loader address is registered inside `cybercoredev/proxy:latest`, so the proxy knows which EVM-loader is running in Solana Testnet).

As soon as this command is completed, the proxy will be available at `http://localhost:9090/solana`. This address is set by default. To set a different address, you need to specify the variable `-e SOLANA_URL='http://localhost:<proxy address>'` on the command line.

## Option 3: Running Solana via a poxy when both are hosted locally

**The network configuration:**
  * Both the Solana cluster and the proxy are hosted locally.
  * The proxy interacts with Solana through the EVM-loader.

```sh
$ sudo docker compose app <filename>
```
>  The new command will be specified !!!!!!

As soon as this command is completed, the proxy will be available at `http://localhost:9090/solana`, Solana will be available at `http://localhost:8899`.



