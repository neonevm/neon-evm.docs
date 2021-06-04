# An Ethereum account

An Ethereum account is an entity with an ETH balance that can send transactions on Ethereum. Accounts can be user-controlled or deployed as smart contracts.  

## Account types

Ethereum has two account types:
* **Externally-owned** – controlled by anyone with the private keys
* **Contract** – a smart contract deployed to the network, controlled by code

### Key differences

**Externally-owned**
* Creating an account costs nothing
* Can initiate transactions
* Transactions between externally-owned accounts can only be ETH transfers  

**Contract**
* Creating an account has a cost because you're using network storage
* Can only send transactions in response to receiving a transaction
* Transactions from an external account to a contract account can trigger code which can execute many different actions, such as transferring tokens or even creating a new contract

## An account examined

Ethereum accounts have four fields:
* **nonce** – a counter that indicates the number of transactions sent from the account. 
* **balance** – the number of wei owned by this address. Wei is a denomination of ETH and there are 1e+18 wei per ETH.
* **codeHash** – this hash refers to the code of an account on the Ethereum virtual machine (EVM). This EVM code cannot be changed unlike the other account fields. For externally owned accounts, the codeHash field is the hash of an empty string.
* **storageRoot** – it is known as a storage hash. A 256-bit hash of the root node of a Merkle Patricia trie that encodes the storage contents of the account (a mapping between 256-bit integer values), encoded into the trie as a mapping from the Keccak 256-bit hash of the 256-bit integer keys to the RLP-encoded 256-bit integer values. This trie encodes the hash of the storage contents of this account, and is empty by default.

## Externally-owned accounts

An account is made up of a cryptographic pair of keys: public and private. They help prove that a transaction was actually signed by the sender and prevent forgeries. Your private key is what you use to sign transactions, so it grants you custody over the funds associated with your account. You never really hold cryptocurrency, you hold private keys – the funds are always on Ethereum's ledger.

## Account creation

When you have to create an account most libraries will generate you a random private key.  
A private key is made up of 64 hex characters and can be encrypted with a password.  

Example:  
`ffffffffffffffffffffffffffffffff48a03bbfd25e8cd036415febaaedce6a`  

The public key is generated from the private key using the [Elliptic Curve Digital Signature Algorithm](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). To get a public address for your account, you need to add `0x ' before the last 20 bytes of the public key.

## Contract accounts

Contract accounts have a 42 character hexadecimal address:  

Example:  
`0x02042f8cf97ae237070f9587f8e7a266dbead5de`  

The contract address is given when a contract is deployed to the Ethereum Blockchain. The address comes from the creator's address and the number of transactions sent from that address (the `nonce`)  

> **Note**  
> An account is not a wallet. A wallet is the keypair associated with a user-owned account, which allow a user to make transactions from or manage the account.

> **More details**  
> [ETHEREUM ACCOUNTS](https://ethereum.org/en/developers/docs/accounts/)