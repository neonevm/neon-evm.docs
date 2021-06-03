# Terminology Used

### ABI
The Application Binary Interface (ABI) is a JSON-based description on how to convert user actions between their JSON and binary representations. The ABI may also describe how to convert the database state to/from JSON. Once you have described your contract via an ABI this allows developers and users to interact with your contract seamlessly via JSON.  

---  

### Account
An account is a unique identifier and a requirement to interact with ??? blockchain. Unlike most other cryptocurrencies, transfers are sent to a human readable account name instead of a public key, while keys attributed to the account are used to sign transactions.  

---  

### Account Name
An account name is a human-readable identifier that is stored on the blockchain. Account names can consist of individual parts separated by the symbol "dot". Wherein, two "dot" symbols near each other are not allowed. Account names can only contain the alphanumeric characters, the "hyphen" symbol can be used as well, but should not be at the beginning or end of any account name part. Capital letters in an account user name are unacceptable.  

---  

### Action
Functionality exposed by a smart contract that is exercised by passing the correct parameters via an approved transaction to ??? network.  

---  

### Block
A special structure for recording a group of transactions in the Bitcoin system and similar ones. A block consists of a header and a list of transactions. The block header includes its own hash, the hash of the previous block, transaction hashes, and additional overhead information.  

---  

### Blockchain
A strictly structured database with certain rules for building chains of transactions and access to information that excludes data theft, fraud, violation of property rights, etc.  

---  

### Blockchain Application
A blockchain application is a software application that has integrated a blockchain in its architecture as the storage layer for part of, or, all of its data. This includes software applications that do not own their own contract on the blockchain and instead only interact with the system contracts of the blockchain.  

---  

### Block Log
The block log is an append only log of blocks written to disk and contains all the irreversible blocks.  

---  

### Community
A group of persons formed around some point of interest. Community can be created by any user or group of users. Each community has its own point and parameters.  

---  

### Community leader
A person registered in the Commun application as a leader and is on top-leaders list of the same community. Leader is responsible for setting community parameters and moderating message content. Community leaders are elected by users of the same community through endless voting.  

---  

### Community user
A person is considered a community user if the person is registered in the Commun application and has a balance with points of same community. A user can be a member of several communities simultaneously if the user has balances with points of the same communities. Community user able to perform the following operations: posting, voting for a content and a leader, creating a community.  

---  

### Container
An object created using a Docker image and containing all the necessary components for the operation of the application. The container is a secure platform for the operation of the application.  

---  

### CPU
CPU is processing power granted to an account by a ??? based blockchain. The amount of CPU an account has is measured in microseconds, and represents the amount of processing time an account has at its disposal when executing its actions. CPU is recalculated after each block is produced, based on the amount of system tokens the account staked for CPU bandwidth in proportion to the amount of total system tokens staked for CPU bandwidth at that time.  

---  

### Chain State
The chain state or database is a memory mapped file, storing the blockchain state of each block (account details, deferred transactions, transactions, data stored using multi index tables in smart contracts, etc.). Once a block becomes irreversible the chain state is not cached anymore.  

---  

### Cryptographic Hash
A cryptographic hash function is a hash function which takes an input (or `message`) and returns a fixed-size alphanumeric string. The alphanumeric string is called the `hash value`, `message digest`, `digital fingerprint`, `digest` or `checksum`.  

---  

### Daemon
A program on Linux systems, launched by the system itself and running in the background without direct user interaction.  

---  

### Deferred Action
Deferred actions are actions sent to a peer action that are scheduled to run, at best, at a later time, at a block validator's discretion. There is no guarantee that a deferred action will be executed. From the perspective of the originating action, i.e., the action that creates the deferred action, it can only determine whether the create request was submitted successfully or whether it failed (if it fails, it will fail immediately). Deferred actions carry the authority of the contract that sends them. A deferred action can also be cancelled by another action.  

---  

### Deserialization
Deserialization is the reverse process of serialization. It turns a stream of bytes into an object in memory. ??? structures are enhanced with two operators which implement the serialization and deserialization of data to and from the database.  

---  

### Digital Signature
A digital signature is a mathematical scheme for verifying the authenticity of digital messages or documents. A valid digital signature, where the prerequisites are satisfied, gives a recipient very strong reason to believe that the message was created by a known sender (authentication), and that the message was not altered in transit (integrity). Digital signatures are a standard element of most cryptographic protocol suites, and are commonly used for software distribution, financial transactions, contract management software, and in other cases where it is important to detect forgery or tampering.  

---  

### Docker
Software to automate the installation of the application in the virtualization environment at the operating system level. Provides installation of an application with all its environments and dependencies into a container that can be ported to any Linux system with cgroups support in the kernel, and also provides a container management environment.  

---  

### Docker-compose
Command line tool for managing multiple Docker multi-container applications.  

---  

### Docker-file
A file containing instructions and parameters for creating a Docker image for specific tasks.  

---  

### Docker image
Docker platform template, available only by reading and used to create containers.  

---  

### DPoS (Delegated Proof-of-Stake)
DPoS stands for "Delegated Proof of Stake" and is a consensus algorithm initially developed by Daniel Larimer in 2013 for Bitshares. It's sometimes referred to as "Democracy as Proof of Stake".  

---  

### Genesis (Greek genesis)
The beginning of the formation of any object or subject and the subsequent process of its development, which led to a certain state.  

---  

### Genesis Block
The genesis block is the very first block in the ??? blockchain. The subsequent block added after the genesis block becomes block `1` and continues the sequence. The genesis block lays the foundation for other blocks to be added to form a blockchain.  

---  

### Genesis Node
The genesis node is the first node in the blockchain network. The genesis node is used to perform a set of actions such as creating system accounts, initializing system, and token contracts in order to create a fully-functional blockchain with varying capabilities such as governance, resource allocation, and more.  

---  

### Head Block
The head block is the last block written to the blockchain, stored in reversible_blocks.  

---  

### Indices
In the context of a multiple index table, an index is a particular ordering of the elements in the table. Multiple index indices allow the same data in one table to be viewed as different data structures by specifying the specific index on the table.  

---  

### Inline Action
Inline actions request other actions that need to be executed as part of the original calling action. Inline actions operate with the same scopes and authorities of the original transaction, and are guaranteed to execute with the current transaction. These can effectively be thought of as nested transactions within the calling transaction. If any part of the transaction fails, the inline actions will unwind with the rest of the transaction.  

---  

### Irreversible Block
A block is considered irreversible (i.e. immutable) on blockchain when (2/3rd + 1) of the currently elected validators have acknowledged it.  

---  

### Key
A string of characters (bit string) used by the cryptographic algorithm for encrypting and decrypting messages, setting and verifying a digital signature, as well as identification. Keys are symmetric (the same key is used for encryption and decryption) and asymmetric (public and private).  

---  

### Multi-Index
??? wraps the boost multi-index library to provide in memory data persistence. A subset of the functionality provided by the boost multi-index is provided in the ??? multi-index.  

---  

### Multisig
`Multisig` or `msig` is a short term for multiple signatures. It is used to describe the case in which one requires more than one account's permission to execute a transaction. ??? provides the system account, which can be used to push onto the blockchain the `multisig` proposals and their corresponding account's permission required to approve the proposal. `Multisig`, when used properly, increases the security of an account, the security of a smart contract, and it's also the method by which validators are able to affect changes within blockchain.  

---  

### NET
NET required to store transactions on ??? blockchain. The amount of NET an account has is measured in bytes, representing the amount of transaction storage an account has at its disposal when creating a new transaction. NET is recalculated after each block is produced, based on the system tokens staked for NET bandwidth by the account. NET measures the size of the transactions and not contract state.  

---  

### Node
A separate (software) device that is connected to the blockchain network according to the client-server scheme. Nodes are active elements and form the basis of the blockchain network technology.  

---  

### Opus
Mosaic description type. It indicates what the mosaic describes, such as a post or comment.  

---  

### Pending Block
The pending block is the block currently being built by each node. Transactions are added to the pending block as they are received and processed. The pending block becomes the head block once it is written to the blockchain. Note that a head block is initially reversible.  

---  

### Permission
A weighted security mechanism that determines whether or not a message is properly authorized by evaluating its signature(s) authority. Every account has two default permissions, `owner` and `active`, but can also have custom permissions to further secure communications from an account to contracts. Every permission name has a "parent". Parents possess the authority to change any of the permissions settings for any and all of their children.  

---  

### Permission Threshold
The sum of permission weights necessary for a signature to be considered valid.  

---  

### Permission Weight
A permission weight is a value given to an account for authorization purposes. This is typically used in the context of a mutli-sig to give one or more accounts more control over a multi-sig than others.  

---  

### Permission level
Permissions are arbitrary names used to define the requirements for a transaction sent on behalf of that permission. Permissions can be assigned for authority over specific contract actions by "linking authorization" or linkauth. Every account has two native named permissions, `owner` and `active`.  

---  

### Plugin
A software component, made as a separate module and being an addition to the main program.  

---  

### Point
Main payment unit used for payments within a separate community. Point is not a token and can not be used in exchange trading. Points are used as coins to encourage community members and applied only within the community.  

---  

### Private key
A code string with which you can access your wallet or bitcoin address. Required for transactions.  
A private key is a secret key used to sign transactions. In ???, a private key's authority is determined by it's mapping to a ??? account name.  

---  

### Proxy account
An account empowered with a specific voting authorization during the voting process. A proxy account can be declared by any user who is ready to accept votes from other users and vote for the validators on their behalf.  

---  

### Public key
A publicly available key that can be authorized to permissions of an account and can be used to identify the origin transaction. A public key can be inferred from a signature.  

---  

### P2P
A peer-to-peer computer network in which all participants (nodes) are equal in rights and can interact with each other, being a client and server simultaneously.  

---  

### RAM
RAM is a part of the bandwidth resources allocated to an account for the duration of a transaction for storing consensus information.  

---  

### Reversible Block
Any block on blockchain with a block number greater than the last irreversible block. Reversible blocks are blocks that are not currently guaranteed to be on the blockchain.  

---  

### Safe
Functionality allowing a user to manipulate funds in order to preserve them, namely to lock funds and withdrawal operations on them, including transfer, selling points to buy tokens. Access to funds is possible only after they are unlocked by the safe owner.  

---  

### Scope
Scope is a region of data within a contract. Contracts can only write to regions in their own contracts but they can read from any other contract's regions. Proper scoping allows transactions to run in parallel for the same contract because they do not write to the same regions. Scope is not to be conflated with an account name, but contracts can use the same value for both for convenience.  

---  

### Serialization
Serialization is the process of turning an object in memory into a stream of bytes so it can be stored on disk or sent over the network.  

---  

### Signature
A signature is a mathematical scheme for demonstrating the authenticity of digital messages or documents.  

---  

### Smart Contract
A smart contract is a computer protocol intended to facilitate, verify, or enforce the negotiation or performance of a contract.  

---  

### Stake
A share of bandwidth resources (RAM, NET, CPU and Storage) allocated to a user. The user can manage the share of resources allocated to him both independently and entrust its use to another user (delegate the share of resources).  

---  

### Staked tokens
Tokens allocated for a stake acquisition that can’t be used for anything else in this state. The user can stake active tokens listed on his/her balance or deposit them. Also, the user can perform the reverse operation — withdraw tokens from the staked state to active.  

---  

### Storage
Storage is a part of the bandwidth resources allocated to an account for storing personal account information.  

---  

### System Contract
The design of the ??? blockchain calls for a number of smart contracts that are run at a privileged permission level in order to support functions such as validator registration and voting, token staking for CPU and network bandwidth, RAM purchasing, multi-sig, etc. These smart contracts are referred to as the system contracts and are the following, `bios`, `domain-names` `govern`, `multi-signature`, `stake` and `tokens` contracts.  

---  

### Tables
Tables in ??? blockchain are achieved via Multiple Index Table.

---  

### Test Network
A test network or `testnet` is an instantiation of the ??? platform that is intended for testing purposes. Generally, the native token has no value and is given away to developers so they can test. Some features of a testnet may be disabled such as consensus and governance.  

---  

### Transaction
A complete all-or-nothing change to the Blockchain. A combination of one or more actions. Usually the execution result of a Smart Contract.  

---  

### Trusted Community Client
A person appointed by commun leaders to make decisions within the dApp application.  

---  

### Validator
A validator (or a block producer) is an identifiable entity composed of one or more individuals that express interest in participating in running ??? network. By participating it is meant these entities will provide a full node, gather transactions, verify their validity, add them into blocks, and propose and confirm these blocks. A block producer is generally required to have experience with system administration and security as it is expected that their full-node have constant availability.  

---  

### Validator Schedule
The list of validators who currently have the possibility of being selected to produce the next block. This list changes with every new block.  

---  

### WASM (Web-Assembly Machine)
WASM stands for WebAssembly. WASM is an emerging web standard with widespread support of Google, Microsoft, Apple, and others.  

---  

### WIF
WIF stands for Wallet Import Format and is an encoding for a private key. The following is an example of a WIF Private Key: 5HprTdeuiow57FgeRt39Bnmf4nEB3kEsreAbuatmU.  

---  

### Wallet
Wallets are clients that store keys that may or may not be associated with the permissions of one or more accounts. Ideally a wallet has a locked (encrypted) and unlocked (decrypted) state that is protected by a high entropy password.  

---  
