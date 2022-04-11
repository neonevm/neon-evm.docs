---
title: Ethereum transaction
---

An Ethereum transaction is a cryptographically signed instruction from an account. The account initiates a transaction to update the state of the Ethereum network. An Ethereum transaction refers to an action initiated by an external account, i.e. an account managed by a person, not a contract.  

A transaction, which changes the state of the EVM, needs to be broadcast to the whole network. Any node can broadcast a request for a transaction to be executed on the EVM. Transactions require a fee and must be mined to become valid.

## What is in a transaction?

A transaction includes the following information:
* **Recipient** – recipient address
* **Signature** – identifier of the sender (sender's signature with a private key)
* **Value** – amount of coins to transfer from sender to recipient
* **Data** – arbitrary data (optional field)
* **GasLimit** – maximum amount of gas units that can be consumed by the transaction
* **GasPrice** – fee the sender pays per unit of gas

## Note
* The block that your transaction is placed in can also contain many other transactions. Checking such a block for the validity of transactions may take more time. Higher-priority transactions are served first.
* If the network is busy and miners aren't able to keep up, they always prioritize transactions with higher GasPrice because they get to keep the fees.
* A transaction gets a block confirmation number. This is the number of blocks created since the block that this transaction was included in. The higher the number, the greater the certainty that the transaction was processed and recognized by the network. For higher value transactions, more block confirmations may be desired.


> **More details**  
> [Transactions](https://ethereum.org/en/developers/docs/transactions/)
