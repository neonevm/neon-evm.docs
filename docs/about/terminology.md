---
title: Terminology
---

### Application Binary Interface (ABI)
A JSON-based description on how to convert user actions between their JSON and binary representations. The ABI may also describe how to convert the database state to/from JSON. Once you have described your contract via an ABI, this allows developers and users to interact with your contract seamlessly via JSON.  

---  

### Account
A unique identifier that is required to interact with Solana. Unlike most other cryptocurrencies, transfers are sent to a readable account name instead of a public key, while keys attributed to the account are used to sign transactions.  

---  

### Block
A special structure for recording a group of transactions in blockchain systems. A block consists of a header and a list of transactions. The block header includes its hash, the hash of the previous block, transaction hashes, and additional overhead information.  

---  

### Blockchain
A database with a strict structure and certain rules for building chains of transactions and accessing information which excludes data theft, fraud, violation of property rights, and more.  

---  

### Block log
An append-only log of blocks written to disk and containing all the irreversible blocks.  

---  

### Berkeley Packet Filter (BPF)
A technology used in computer operating systems to analyze network traffic. It provides a raw interface to data link layers, permitting raw link-layer packets to be sent and received.  

---  

### Container
An object created using a Docker image and containing all the necessary components for the operation of the application. The container is a secure platform for the operation of the application.  

---  

### Cryptographic Hash Function (CHF)
A type of hash function that takes an input (or `message`) and returns a fixed-size alphanumeric string. The alphanumeric string is called the `hash value`, `message digest`, `digital fingerprint`, `digest`, or `checksum`.  

---  

### Daemon
A program on Linux systems that is launched by the system itself and runs in the background without direct user interaction.  

---  

### Decentralized Application (dApp)
An application built on a decentralized network that combines a smart contract and a frontend user interface.  

---  

### Digital signature
A mathematical algorithm used to verify the authenticity and integrity of digital messages or documents. A valid digital signature helps to reassure the recipient that the message was created by a known sender, and that the message was not altered in transit. Digital signatures are a standard feature of most cryptographic protocol suites, and are also commonly used for software distribution, financial transactions, contract management software, and other cases where it is important to detect and/or prevent forgery or tampering.  

---  

### Docker
Software used to automate application installation in the virtualization environment at the operating system level. Packages an application, along with all its environments and dependencies, into a container that can be ported to any Linux system with cgroups support in the kernel, and also provides a container management environment.  

---  

### Docker Compose
A command line tool for managing multiple Docker multi-container applications.  

---  

### Dockerfile
A file containing instructions and parameters for creating a Docker image for specific tasks.  

---  

### Docker image
A read-only template on the Docker platform that is used to create containers.  

---  

### Delegated Proof-of-Stake (DPoS)
A consensus algorithm initially developed by Daniel Larimer in 2013 for BitShares. It is sometimes referred to as the more “democratic” version of Proof-of-Stake (PoS).  

---  

### ERC-20
The token standard used for Ethereum smart contracts. Developed in 2015, ERC-20 defines a common list of rules that Ethereum tokens must implement. This gives developers the ability to program how new tokens will function within the Ethereum ecosystem.  

---  

### ERC-721
A more complex token standard than ERC-20 that is split across a number of contracts with multiple optional extensions. Unlike ERC-20, tokens of this standard are not interchangeable. No two ERC-721 tokens are the same, and each have different characteristics.  

---  

### Gwei
A denomination, or smaller unit, of the cryptocurrency ETH, which is used on the Ethereum network. Gwei is the most commonly used unit of ETH because gas prices are easily specified in gwei. For example, instead of saying that your gas costs *0.000000001* ETH, you can say your gas costs *1* gwei.  

---  

### Head block
The head block is the last block written to the blockchain, stored in reversible blocks.  

---  

### Key
A string of characters (bit string) that is used by the cryptographic algorithm for encrypting and decrypting messages, setting and verifying digital signatures, and identification. Keys are symmetric (the same key is used for encryption and decryption), and asymmetric (public and private).  

---  

### Merkle Mountain Range
A type of merkle tree that can be visualized as many (perfect) merkle trees which are then combined into 1, by creating a single root from all of their peaks.  

---  

### Merkle-Patricia Tree
A hash tree that stores key-value pairs, with the keys being represented in binary form. The nodes of this tree consist of two types: prefix nodes that contain part of the path, and end nodes that contain the stored value.  

---  

### MetaMask
A software cryptocurrency wallet that is used to interact with the Ethereum blockchain. It allows users to access their Ethereum wallet through a browser extension or mobile app, which can then be used to interact with decentralized applications.  

---  

### Minimum Viable Product (MVP)
A product with minimal features and/or functionality, but enough to satisfy early consumers. Its purpose is to gather feedback and learnings to inform further product development.  

---  

### NeonPass
An open-source service for transferring SPL tokens to Neon EVM.  

---  

### NeonSwap
An open-source service being a fork of [Uniswap V2](https://uniswap.org/blog/uniswap-v2) and modified to work with Neon EVM.  

---  

### Node
A separate software device that is connected to the blockchain network according to the client-server scheme. Nodes are active elements and form the basis of the blockchain network technology.  

---  

### Phantom
A software cryptocurrency wallet reimagined for DeFi. Phantom makes it safe and easy for you to store, send, receive, collect, and swap tokens on the Solana blockchain.  

---  

### Plugin
A software component built as a separate module that adds new capabilities to the main program.  

---  

### Private key
A secret number (code string) that you can use to securely access your wallet or bitcoin address, and do transactions.  

---  

### Proof-of-History (PoH)
The blockchain algorithm for time synchronization. Instead of using the traditional timestamps, PoH is able to prove that a message or event occurred at a certain time after one event, but before another.  

---  

### Public key
A publicly available key that is required for users to receive  transactions into their account. A public key can be inferred from a signature.  

---  

### Remix
An online Integrated Development Environment (IDE) used to write, compile, deploy, and debug Solidity code. This web tool can be connected with MetaMask and used to deploy smart contracts to both the Solana Testnet and Solana Mainnet.

---  

### Remote Procedure Call (RPC)
A system that lets users send queries and commands to a system remotely.  

---  

### Rivest-Shamir-Adleman (RSA)
A public key cryptosystem that is widely used for secure data transmission.  

---  

### Serialization
The process of turning an object in memory into a stream of bytes so it can be stored on disk or sent over the network.  

---  

### Signature
A mathematical algorithm used to demonstrate the authenticity of digital messages or documents.  

---  

### Slippage
The difference between where the computer signaled the entry and exit for a trade and where actual clients, with actual money, entered and exited the market using the computer’s signals.

---  

### Slot
The period of time during which a block is created. Collectively, slots create a logical clock. Slots are ordered sequentially and non-overlapping, comprising roughly equal time.  

---  

### Smart contract
A computer protocol intended to facilitate, verify, or enforce the negotiation or performance of a contract.  

---  

### Sollet
Sollet (Sollet.io) is browser-based wallet for Solana and SPL tokens. It was created by the Project Serum team.  

---  

### Solana Program Library (SPL)
A contract containing a system registry of tokens that are in the system along with the Solana balances of their accounts.  

---  

### SPL token
A token registered in the *[Solana Program Library (SPL)](https://spl.solana.com/token)*.  

---  

### Staked tokens
Tokens allocated for a stake acquisition that can’t be used for anything else in this state. The user can stake active tokens listed on their balance, or deposit them. The user can also perform the reverse operation: withdraw tokens from the staked state to active.  

---  

### Tmpfs
A temporary file storage paradigm implemented in many Unix-like operating systems. It is intended to appear as a mounted file system, but data is stored in volatile memory instead of a persistent storage device.  

---  

### Transaction
A combination of one or more actions that results in a complete all-or-nothing change to the blockchain. Usually the executional result of a smart contract.  

---  

### Uniswap
A decentralized exchange. Liquidity providers can earn fees by providing the required tokens or ETH for both sides of a trade. Uniswap is widely used and therefore has one of the highest liquidities for a wide range of tokens.  

---  

### USDT
USDT is the ticker symbol for the Tether stablecoin cryptocurrency.  

---  

### Wallet
Wallets are clients that store keys that may or may not be associated with the permissions of one or more accounts. Ideally a wallet has a locked (encrypted) and unlocked (decrypted) state, which is protected by a high entropy password.  

---  

### Web3
In the context of Ethereum, Web3 is a collection of decentralized apps that run on the blockchain and allow anyone to participate without monetizing their personal data.  

---  

### Wormhole
The Solana Wormhole is an Ethereum bridge that helps transfer wealth from the Ethereum blockchain to the Solana blockchain. It also helps transfer liquidity between the Ethereum ERC-20 token standard to the Solana SPL token standard.  

---  

### ZK-SNARK
Zero-Knowledge Scalable Transparent Argument of Knowledge (zk-SNARK) is a cryptographic protocol that uses public zero-knowledge probabilistically-verifiable proofs. This technology allows users to exchange verified information without disclosing it, or to perform computations with a third party without disclosing the computation.  

---  
