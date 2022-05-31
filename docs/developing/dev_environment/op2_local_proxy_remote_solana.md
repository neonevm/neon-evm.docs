---
title: "Option 2: Local Proxy to Remote Solana"
---

This option will let you connect to a remote Solana cluster via a proxy that is hosted locally.

### Network Configuration
  * Solana cluster is accessed via the proxy hosted locally.
  * Solana [Testnet](https://docs.solana.com/clusters#testnet)/[Devnet](https://docs.solana.com/clusters#devnet)/[Mainnet](https://docs.solana.com/clusters#mainnet-beta) is used, and the proxy interacts with it through the Neon EVM.

First, set up and host a proxy locally as per [this guide](local_proxy.md). After you complete the steps, a proxy will be available at `http://localhost:9090/solana`.

A proxy connects to a public [Solana cluster RPC endpoint](https://docs.solana.com/cluster/rpc-endpoints) depending on the *SOLANA_URL* value set. The table below shows *endpoint* value that are set automatically when specifying *CONFIG*.

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

**Command Line Options**
  * `~/.config/solana/id.json` — the path to your key pair.
  * `--name proxy` — specify the proxy name.

If you are not registered as an operator, you can only use test public keys. (The list of available public keys is given in the [table](clusters/neon_proxy_rpc_endpoints.md).) You do not need to specify the key via the -v flag, since it is already hard-coded in Devnet/Testnet containers. Use the following command:

```bash
sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.5.1
```