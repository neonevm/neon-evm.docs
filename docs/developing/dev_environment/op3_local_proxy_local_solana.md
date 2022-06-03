---
title: "Option 3: Local Proxy to Local Solana"
---

This option will let you connect to Solana via a proxy, when **both** are hosted locally. This option can be useful for developers that want to debug their Solidity contracts by hosting a proxy and a Solana node locally.

First, set up and host a proxy locally as per [this guide](local_proxy.md). After you complete the steps, a proxy will be available at `http://localhost:9090/solana`.

### Network Configuration
  * Both the Solana node and the proxy are hosted locally.
  * The proxy interacts with the Solana node through the Neon EVM.

Upload the docker-compose-test.yml file to your currently directory using the following command:
```bash
$ wget https://raw.githubusercontent.com/neonlabsorg/proxy-model.py/master/proxy/docker-compose-test.yml
```
Execute the command:
```bash
$ sudo REVISION=stable docker-compose -f docker-compose-test.yml up -d
```
As soon as the latest command is completed, the proxy will start to deploy the Neon EVM in a local Solana node. After that, the proxy and Solana will be available at the URLs `http://localhost:9090/solana` and `http://localhost:8899`, respectively.

---  

> **Note:**  
> For your proxy, you can use the dedicated Neon server, or a separate server that you will need to deploy and log into.
>
> For the Solana endpoint, you can use a separate node hosted on Devnet or Testnet.  
>
You can also use a Solana node that is not hosted on any network. In this case, you will need to configure this node and synchronize it with the Devnet or Testnet network. Then you will need to deploy the local proxy and configure it to work with this node. You will also need to connect to the EVM loader deployed within Devnet or Testnet.
