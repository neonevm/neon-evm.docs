---
title: "Local Proxy to Local Solana"
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

This option will let you connect to Solana via a proxy, when **both** are hosted locally. This option can be useful for developers that want to debug their Solidity contracts by hosting a proxy and a Solana node locally.

## Prerequisites
[Docker](https://docs.docker.com/get-docker/) must be already installed on your device. `docker-compose` v1.29 is recommended.

## Network Configuration
  * Both the Solana node and the proxy are hosted locally
  * The proxy interacts with the Solana node through the Neon EVM

## Setting up Local Proxy and Local Solana Node

Download the `docker-compose-test.yml` file to your currently directory using the following command:
```bash
wget https://raw.githubusercontent.com/neonlabsorg/proxy-model.py/master/proxy/docker-compose-test.yml
```

Execute the command:
```bash
sudo REVISION=stable docker-compose -f docker-compose-test.yml up -d --quiet-pull
```

The output should look like this:
```console
Creating solana ... done
Creating evm_loader ... done
Creating postgres ... done
Creating proxy ... done
Creating indexer ... done
```
As soon as the latest command is completed, the proxy will start to deploy the Neon EVM in a local Solana node. After that, the proxy and Solana will be available at the URLs `http://localhost:9090/solana` and `http://localhost:8899`, respectively. The Neon faucet will also be available at `http://localhost:3333`.

---  

> **Note:**  
> For your proxy, you can use the dedicated Neon server, or a separate server that you will need to deploy and log into.
>
> For the Solana endpoint, you can use a separate node hosted on Devnet or Testnet.  
>
You can also use a Solana node that is not hosted on any network. In this case, you will need to configure this node and synchronize it with the Devnet or Testnet network. Then you will need to deploy the local proxy and configure it to work with this node. In addition, you will also need to connect to the EVM loader deployed within Devnet or Testnet.
