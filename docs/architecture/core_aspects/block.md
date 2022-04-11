---
title: Block
---

*Blocks are batches of transactions with a hash of the previous block in the chain. Hashes link blocks together (in a chain) because they are cryptographically derived from the block data. One change in any block in history will invalidate all the following blocks. This feature protects the blocks in a chain from tampering.*  

*To preserve the transaction history, blocks are strictly ordered (every new block created contains a reference to its parent block), and transactions within blocks are strictly ordered, too.*

## What is in a block?

* **Timestamp** – the time at which the block was mined.
* **Block number** – the length of the blockchain in blocks.
* **Difficulty** – the effort required to mine the block.
* **MixHash** – a unique identifier for that block.
* **Parent hash** – the unique identifier for the block that came before. (This is how blocks are linked in a chain.)
* **Transactions list** – the transactions included in the block.
* **State root** – the entire state of the system: account balances, contract storage, contract code, and account nonces.
* **Nonce** – a hash that, when combined with the mixHash, proves that the block has gone through proof of work.

## Block Size

Blocks themselves are bound in size. Each block has a block gas limit which is set by the network and the miners collectively. The total amount of gas expended by all transactions in the block must be less than the block gas limit.

> **More details**  
> [Blocks](https://ethereum.org/en/developers/docs/blocks/)
