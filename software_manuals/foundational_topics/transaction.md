# An Ethereum Transaction

An Ethereum transaction is a cryptographically signed instruction from an account. The account initiates a transaction to update the state of the Ethereum network. Ethereum transaction refers to an action initiated by an external account, i.e. an account managed by a person, not a contract.  

A transaction, which changes the state of the EVM, needs to be broadcast to the whole network. Any node can broadcast a request for a transaction to be executed on the EVM. Transactions require a fee and must be mined to become valid.

## What is in a transaction?

A submitted transaction includes the following information:
* **recipient** – the receiving address.
* **signature** – the identifier of the sender (sender's signature with a private key).
* **value** – amount of coind to transfer from sender to recipient.
* **data** – (optional field) arbitrary data.
* **gasLimit** – the maximum amount of gas units that can be consumed by the transaction.
* **gasPrice** – the fee the sender pays per unit of gas.

## What is important to remember?
* The block that your transaction is placed in can also contain many other transactions. Checking such a block for the validity of transactions may take a more time. Higher priority transactions are served first.
* If the network is busy and miners aren't able to keep up, they always prioritise transactions with higher GASPRICE because they get to keep the fees.
* A transaction gets a block confirmation number. This is the number of blocks created since the block that this transaction was included in. The higher the number, the greater the certainty that the transaction was processed and recognised by the network. For higher value transactions, more block confirmations may be desired.


> **More details**  
> [Transactions](https://ethereum.org/en/developers/docs/transactions/)