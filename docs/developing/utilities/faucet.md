---
title: Faucet
---

You can request Test NEON tokens on the Solana devnet using the Neon Faucet. There are two ways to use the Neon Faucet - on the Neon Faucet website, and using the Neon Faucet API.

## Requesting Test NEON Tokens via the User Interface

### Step 1
Set up MetaMask by following the [Setting up MetaMask](../../wallet/metamask_setup#installing-metamask) guide.

### Step 2
Go to the [Neonswap Faucet page](https://neonfaucet.org/) to request test tokens.

### Step 3
Connect your MetaMask wallet:
- Click on the `CONNECT WALLET` button to authorize the connection in the MetaMask pop-up.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./images/connect_wallet.png)

</div>

- In the MetaMask pop-up window, select one or more accounts and click `Next`.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./images/metamask_next.png)

</div>

- Сlick on the `Connect` button to confirm your selection.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./images/confirm_connection.png)

</div>

- In the form that appears, select the token and enter the amount of tokens you would like to request, and then click on the `SEND TEST TOKENS` button.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./images/get_tokens.png)

</div>


# Requesting Test NEON Tokens via HTTP API Endpoints

For this method, a client uses POST requests to send data to the server. Several endpoints are supported, as shown in the following table.

```
|------------------------------------------------------------------------------------------
| Endpoint               | Workload    | Description
|------------------------------------------------------------------------------------------
| request_ping           | text        | Requests ping to check availability of the service
| request_version        |             | Requests version of the service
| request_neon_in_galans | JSON        | Requests NEON tokens, amount in galans (fractions)
| request_neon           | JSON        | Requests NEON tokens
| request_erc20          | JSON        | Requests ERC20 tokens
|------------------------------------------------------------------------------------------
```

Some usage examples of the API method include the following:

An example of a JSON payload:
```
{ "wallet": "0x4570e07200b6332989Dc04fA2a671b839D26eF0E", "amount": 1 }
```

An example of ping request with **curl**:
```
curl -i -X POST -d 'Hello' 'http://localhost:3333/request_ping'
```

An example of version request with **curl**:
```
curl -i -X POST 'http://localhost:3333/request_version'
```

An example of NEON drop request with **curl**:
```
curl -i -X POST \
    -d '{"wallet": "0x4570e07200b6332989Dc04fA2a671b839D26eF0E", "amount": 1}' \
    'http://localhost:3333/request_neon'
```


# Configuration

The configuration file should be in the TOML format. A table containing all the configuration options with their descriptions is shown below.

```
|----------------------------------------------------------------------------------------------
| Option                  | Description
|----------------------------------------------------------------------------------------------
| rpc.bind                | Local interface TCP address
| rpc.port                | TCP port to listen
| rpc.allowed_origins     | List of client URLs that can send requests
| web3.enable             | Flag to toggle the entire web3 section
| web3.rpc_url            | Ethereum network endpoint
| web3.private_key        | Ethereum private key to support operations
| web3.tokens             | List of available ERC20 token addresses
| web3.max_amount         | Largest amount of ERC20 tokens to distribute with a single request
| solana.enable           | Flag to toggle the entire solana section
| solana.url              | Solana network endpoint
| solana.commitment       | Solana client commitment level
| solana.operator_keyfile | Solana keyfile to support operations
| solana.evm_loader       | Address of the EVM Loader program
| solana.max_amount       | Largest amount of NEONs to distribute with a single request
|----------------------------------------------------------------------------------------------
```

A sample configuration file is as follows:
```
[rpc]
bind = "0.0.0.0"
port = 3333
allowed_origins = ["http://localhost"]

[web3]
enable = true
rpc_url = "http://localhost:9090/solana"
private_key = "0x0000000000000000000000000000000000000000000000000000000000000Ace"
tokens = ["0x00000000000000000000000000000000CafeBabe",
          "0x00000000000000000000000000000000DeadBeef"]
max_amount = 1000

[solana]
enable = true
url = "http://localhost:8899"
commitment = "processed"
evm_loader = "EvmLoaderId11111111111111111111111111111111"
operator_keyfile = "operator_id.json"
max_amount = 10
```

The configuration file is optional and, if present, can be incomplete
(default values or environment variables will be used in such cases).

# Environment Variables

Environment variables, if present, take precedence and override the configuration file.

```
| Name                       | Overrides               | Value Example                         |
|----------------------------------------------------------------------------------------------|
| FAUCET_RPC_BIND            | rpc.bind                | `0.0.0.0`                             |
| FAUCET_RPC_PORT            | rpc.port                | `3333`                                |
| FAUCET_RPC_ALLOWED_ORIGINS | rpc.allowed_origins     | `["http://localhost"]`                |
| FAUCET_WEB3_ENABLE         | web3.enable             | `true`                                |
| WEB3_RPC_URL               | web3.rpc_url            | `http://localhost:9090/solana`        |
| WEB3_PRIVATE_KEY           | web3.private_key        | `0x00...0A`                           |
| NEON_ERC20_TOKENS          | web3.tokens             | `["0x00B", "0x00C"]`                  |
| NEON_ERC20_MAX_AMOUNT      | web3.max_amount         | `1000`                                |
| FAUCET_SOLANA_ENABLE       | solana.enable           | `true`                                |
| SOLANA_URL                 | solana.url              | `http://localhost:8899`               |
| SOLANA_COMMITMENT          | solana.commitment       | `processed`                           |
| EVM_LOADER                 | solana.evm_loader       | `EvmLoaderId11111111111111111111111111111111` |
| NEON_OPERATOR_KEYFILE      | solana.operator_keyfile | `operator_id.json`                    |
| NEON_ETH_MAX_AMOUNT        | solana.max_amount       | `10`                                  |
| NEON_LOG                   |                         | `json`                                |
| RUST_LOG                   |                         | `info`                                |
|----------------------------------------------------------------------------------------------|
```
