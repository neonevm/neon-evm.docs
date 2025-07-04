---
title: JSON-RPC API Methods
proofedDate: na
iterationBy: HB
includedInSite: true
approvedBy: na
comments: TODOs inline 
---

This page presents the full list of JSON-RPC methods. Each of them is in one of three states:

<!-- todo Andrey can help by providing the deviations fr0m ETH standard methods / Neon equivalent will send 1n Slack todo Neon methods missing -- needs update == Andrey?? 

Split this into standard ETH-supported methods // Not supported methods // AND a Neon EVM specific table https://www.notion.so/neonlabs/Neon-Specific-API-methods-3402baaad8fa4daeb12642495cf85eb3 -->

|![done](img/done.ico)| — done|![in progress](img/inprogress.ico) | — in progress|![not supported](img/false-copy.png) | — not supported|
|--|--|--|--|--|--|

## JSON-RPC Methods According to [Ethereum Client API](https://ethereum.org/en/developers/docs/apis/json-rpc/)


| Num | Method                                                                      | Description                                                                                                                                                   | Status                             |
|-----|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------|
| 1   | [eth_getBlockByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbyhash)                      | _Returns information about a block by hash_                                                                                                                   | ![done](img/done.ico)              |
| 2   | [eth_getBlockByNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblockbynumber)                    | _Returns information about a block by number_                                                                                                                 | ![done](img/done.ico)              |
| 3   | [eth_getBlockTransactionCountByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbyhash)      | _Returns the number of transactions in a block from a block matching the given block hash_                                                                    | ![done](img/done.ico)              |
| 4   | [eth_getBlockTransactionCountByNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getblocktransactioncountbynumber)    | _Returns the number of transactions in a block matching the given block number_                                                                               | ![done](img/done.ico)              |
| 5   | [eth_getUncleCountByBlockHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclecountbyblockhash)            | _Returns the number of uncles in a block from a block matching the given block hash_                                                                          | ![not supported](img/false-copy.png)              |
| 6   | [eth_getUncleCountByBlockNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getunclecountbyblocknumber)          | _Returns the number of uncles in a block from a block matching the given block number_                                                                        | ![not supported](img/false-copy.png)|
| 7   | [eth_protocolVersion](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_protocolversion)                     | _Returns the current Ethereum protocol version_                                                                                                               | ![not supported](img/false-copy.png)              |
| 8   | [eth_chainId](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainId)                             | _Returns the chain ID of the current network_                                                                                                                 | ![done](img/done.ico)              |
| 9   | [eth_syncing](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_syncing)                             | _Returns an object with data about the sync status or false-copy_                                                                                                  | ![done](img/done.ico)              |
| 10  | [eth_coinbase](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_coinbase)                            | _Returns the client Coinbase address_                                                                                                                         | ![not supported](img/false-copy.png)              |
| 11  | [eth_accounts](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)                            | _Returns a list of addresses owned by client_                                                                                                                 | ![done](img/done.ico)              |
| 12  | [eth_blockNumber](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_blocknumber)                         | _Returns the number of most recent block._                                                                                                                    | ![done](img/done.ico)              |
| 13  | [eth_call](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_call)                                | _Executes a new message call immediately without creating a transaction on the blockchain_                                                                   | ![done](img/done.ico)              |
| 14  | [eth_estimateGas](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_estimategas)                         | _Generates and returns an estimate of how much gas is necessary to allow the transaction to complete._                                                        | ![done](img/done.ico)              |
| 15  | [eth_gasPrice](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gasprice)                            | _Returns the current price per gas in wei_                                                                                                                    | ![done](img/done.ico)              |
| 17  | [eth_newFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newfilter)                           | _Creates a filter object, based on filter options, to notify when the state changes (logs)_                                                                   | ![not supported](img/false-copy.png)              |
| 18  | [eth_newBlockFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newblockfilter)                      | _Creates a filter in the node, to notify when a new block arrives_                                                                                            | ![not supported](img/false-copy.png)              |
| 19  | [eth_newPendingTransactionFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_newpendingtransactionfilter)         | _Creates a filter in the node, to notify when new pending transactions arrive_                                                                                | ![in progress](img/inprogress.ico) |
| 20  | [eth_uninstallFilter](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_uninstallfilter)                     | _Uninstalls a filter with given id_                                                                                                                           | ![in progress](img/inprogress.ico) |
| 21  | [eth_getFilterChanges](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterchanges)                    | _Polling method for a filter, which returns an array of logs which occurred since last poll_                                                                  | ![not supported](img/false-copy.png)              |
| 22  | [eth_getFilterLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getfilterlogs)                       | _Returns an array of all logs matching filter with given id. Can compute the same results with an `eth_getLogs call`_                                         | ![not supported](img/false-copy.png)              |
| 23  | [eth_getLogs](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getlogs)                             | _Anytime a transaction is mined, we can see event logs for that transaction by making a request to eth_getLogs and then take actions based off those results_ | ![done](img/done.ico)              |
| 24  | [eth_mining](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_mining)                              | _Returns whether the client is actively mining new blocks_                                                                                                    | ![done](img/done.ico)              |
| 25  | [eth_hashrate](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_hashrate)                            | _Returns the number of hashes per second that the node is mining with_                                                                                        | ![done](img/done.ico)              |
| 29  | [eth_sign](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sign)                                | _Returns an EIP-191 signature over the provided data._                                                                                                        | ![done](img/done.ico)              |
| 30  | [eth_signTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_signtransaction)                     | _Signs and submits a transaction_                                                                                                                             | ![done](img/done.ico)              |
| 31  | [eth_getBalance](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getbalance)                          | _Returns the balance of the account of given address_                                                                                                         | ![done](img/done.ico)              |
| 32  | [eth_getStorageAt](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getstorageat)                        | _Returns the value from a storage position at a given address_                                                                                                | ![done](img/done.ico)              |
| 33  | [eth_getTransactionCount](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactioncount)                 | _Returns the number of transactions sent from an address_                                                                                                     | ![done](img/done.ico)              |
| 34  | [eth_getCode](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_getcode)                             | _Returns code at a given address_                                                                                                                             | ![done](img/done.ico)              |
| 35  | [eth_sendTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)                     | _Signs and submits a transaction_                                                                                                                             | ![done](img/done.ico)              |
| 36  | [eth_sendRawTransaction](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)                  | _Submits a raw transaction_                                                                                                                                   | ![done](img/done.ico)              |
| 37  | [eth_getTransactionByHash](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyhash)                | _Returns the information about a transaction requested by transaction hash_                                                                                   | ![done](img/done.ico)              |
| 38  | [eth_getTransactionByBlockHashAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyblockhashandindex)   | _Returns information about a transaction by block hash and transaction index position_                                                                        | ![done](img/done.ico)              |
| 39  | [eth_getTransactionByBlockNumberAndIndex](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionbyblocknumberandindex) | _Returns information about a transaction by block number and transaction index position_                                                                      | ![done](img/done.ico)              |
| 40  | [eth_getTransactionReceipt](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_gettransactionreceipt)               | _Returns the receipt of a transaction by transaction hash_                                                                                                    | ![done](img/done.ico)              |

Methods `eth_getTransactionByHash`,  `eth_getTransactionByBlockHashAndIndex`, `eth_getTransactionByBlockNumberAndIndex`, `eth_getBlockByHash` and `eth_getBlockByNumber` also return the `chainId` property in addition to the [specified](https://ethereum.org/en/developers/docs/apis/json-rpc) output.

## JSON-RPC methods according to the [Web3 Module API](https://openethereum.github.io/JSONRPC-web3-module)

| Num | Method                                                                                       | Description                                                            | Status                         |
|-----|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------|--------------------------------|
| 1   | [web3_clientVersion](https://openethereum.github.io/JSONRPC-web3-module#web3_clientversion)  | _Returns the current client version_                                   | ![done](img/done.ico)          |
| 2   | [web3_sha](https://openethereum.github.io/JSONRPC-web3-module#web3_sha3)                     | _Returns Keccak-256 (not the standardized SHA3-256) of the given data_ | ![done](img/done.ico)          |



## JSON-RPC methods according to the [Net Module API](https://openethereum.github.io/JSONRPC-net-module)

| Num | Method                                                                           | Description                                                            | Status                         |
|-----|----------------------------------------------------------------------------------|------------------------------------------------------------------------|--------------------------------|
| 1   | [net_listening](https://openethereum.github.io/JSONRPC-net-module#net_listening) | _Returns true if client is actively listening for network connections_ | ![done](img/done.ico)          |
| 2   | [net_peerCount](https://openethereum.github.io/JSONRPC-net-module#net_peercount) | _Returns number of peers currently connected to the client_             | ![done](img/done.ico)          |
| 3   | [net_version](https://openethereum.github.io/JSONRPC-net-module#net_version)     | _Returns the current network protocol version_                        | ![done](img/done.ico)          |
