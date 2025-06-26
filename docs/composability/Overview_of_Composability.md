# Understanding Composability on Solana and Neon EVM
## **Understanding Composability**

## **Introduction**

Composability is a core feature of the Solana blockchain, enabling different programs (smart contracts) to interact seamlessly. This allows developers to build complex decentralized applications (dApps) by combining functionalities from multiple programs. In the context of Neon EVM, composability integrates Ethereum-compatible smart contracts with Solana’s high-performance infrastructure, allowing developers to leverage familiar Ethereum tools while benefiting from Solana’s scalability and low-latency transaction confirmations.

This section provides a comprehensive overview of composability, detailing Solana’s core concepts—accounts, transactions, and Cross Program Invocation (CPI)—and explaining how Neon EVM integrates with Solana to enable cross-chain interactions.

## **What is Solana?**

Solana is a high-performance blockchain designed for widespread adoption, supporting applications in finance, NFTs, payments, and gaming. It operates as a single global state machine, emphasizing openness, interoperability, and decentralization. Solana’s parallel processing architecture delivers exceptional scalability, high throughput, and low-latency transaction confirmations, making it ideal for dApps requiring fast and efficient processing. Unlike Ethereum’s EVM, Solana’s architecture leverages an account-based structure, resembling a standard operating system where accounts function like system files. This design allows transactions that use different accounts to be processed in parallel, significantly enhancing performance.

Key features of Solana include:

* **Parallel Processing**: Utilizes parallelism across its framework to achieve high performance while maintaining decentralization and security.  
* **Scalability**: Supports thousands of transactions per second, far surpassing many other blockchains.  
* **Low Latency**: Ensures rapid transaction confirmations, critical for real-time applications.


## **Core Concepts of Solana**

### **Accounts**

Solana programs are stateless, meaning all data is stored in accounts, each uniquely identified by a 32-byte address formatted as an Ed25519 PublicKey. Accounts are central to Solana’s architecture, serving as containers for both executable code and program state. Some accounts, known as Program Derived Accounts (PDAs), are created by programs themselves and controlled by the program rather than private keys.

**Key Characteristics of Accounts:**

* **Storage Capacity**: Accounts can store up to 10MB of data, including executable program code or state information.  
* **Rent Deposit**: Accounts require a deposit in SOL, proportional to the stored data, which is refundable upon account closure.  
* **Ownership**: Each account has a program "owner" that can modify its data or reduce its lamport balance, though anyone can increase the balance.  
* **AccountInfo Structure**: Every account includes:  
  * `data`: A byte array holding the account’s state or executable code.  
  * `executable`: A boolean indicating whether the account is a program.  
  * `lamports`: The account’s balance in lamports (1 SOL \= 1 billion lamports).  
  * `owner`: The public key (program ID) of the owning program.

**Account Types:**

| Type | Description |
| ----- | ----- |
| **Executable Programs** | Contain code that can own and create other accounts for state storage. Written in languages like Rust and compiled into eBPF bytecode. Note: Code is generally immutable but may be updatable by the program owner under specific conditions (verify with Solana documentation). |
| **Native Programs** | Core Solana programs, such as the System Program for account creation and SOL transfers, or the Stake Program for staking. |
| **SPL Programs** | Facilitate token creation, swapping, lending, and other activities, e.g., the SPL Token Program for managing tokens. |
| **Custom Programs** | Developer-created smart contracts for specific use cases, such as the Neon EVM Program, which runs EVM bytecode on Solana. |
| **Non-executable Accounts** | Store data like token balances, NFTs, or program variables, reflecting state changes after transactions. |
| **System Accounts** | Managed by the Solana runtime for basic operations like account creation and transaction processing. |
| **Token Accounts** | Owned by the SPL Token Program, tracking token balances for specific mints. Associated Token Accounts (ATAs) are deterministically derived for user balances. |
| **Program Derived Address (PDA)** | Deterministic addresses controlled by programs, not private keys, used for secure program-owned accounts. |
| **Data Accounts** | Store data associated with Solana programs, crucial for dApp state management. |

For more details, refer to the [Solana Account Model](https://docs.solana.com/developing/programming-model/accounts).

### **Transactions and Instructions**

**Transactions**: On Solana, transactions are the mechanism for interacting with the network. Each transaction consists of one or more instructions, representing specific operations executed by programs.

**Key Points About Transactions:**

* **Execution Order**: Instructions within a transaction are processed sequentially.  
* **Atomicity**: All instructions must succeed for the transaction to complete; if any fails, the entire transaction fails.

**Instructions**: An instruction is the smallest unit of execution logic within a program, specifying:

* **Program Address**: The program being called.  
* **Accounts**: A list of accounts (via `AccountMeta` struct) that the instruction reads from or writes to.  
* **Instruction Data**: A byte array indicating the instruction handler and arguments.

The `AccountMeta` struct includes:

| Field | Type | Description |
| ----- | ----- | ----- |
| account | bytes32 | On-chain account address. |
| is\_writable | boolean | Indicates if the account’s data can be modified. |
| is\_signer | boolean | Indicates if the account must sign the transaction. |

For more details, refer to [Transactions and Instructions](https://docs.solana.com/developing/programming-model/transactions).

### **Cross Program Invocation (CPI)**

CPI is a mechanism that enables composability by allowing one Solana program to call instructions from another. This is critical for building interoperable dApps.

**Key Features of CPI:**

* **Direct Instruction Calls**: Programs can invoke instructions from other programs, enhancing interoperability.  
* **Signer Privileges**: The calling program extends its signer privileges to the called program, ensuring secure interactions.  
* **Program Derived Addresses (PDAs)**: Programs can sign on behalf of PDAs, providing controlled access.  
* **Depth Limitation**: CPI supports up to four nested calls to maintain computational efficiency.

For more details, refer to [Cross Program Invocation](https://docs.solana.com/developing/programming-model/calling-between-programs).


## **Neon EVM and Composability**

Neon EVM enables Ethereum-compatible smart contracts to run on Solana by converting EVM bytecode into Solana’s eBPF bytecode. The Neon EVM Proxy supports an EVM-compatible interface, allowing developers to use familiar Ethereum tools (e.g., Solidity, Hardhat) while leveraging Solana’s high-performance infrastructure.

**How Neon EVM Facilitates Composability:**

* **Precompile Integration**: Neon EVM uses a precompile (`0xFF00...`) to enable Solidity contracts to execute Solana instructions, bridging Ethereum and Solana ecosystems.  
* **Cross-Chain Interactions**: Developers can call Solana programs (e.g., SPL Token Program, Orca DEX) from Neon EVM smart contracts, combining Ethereum’s developer experience with Solana’s scalability.  
* **Use Cases**: Examples include transferring SOL or SPL tokens, swapping tokens on DEXs like Orca and Raydium, and using advanced features like Verifiable Random Function (VRF) for on-chain randomness.

**Example Workflow:**

1. A developer writes a Solidity smart contract on Neon EVM.  
2. The contract uses the `ICallSolana` interface to invoke a Solana program (e.g., System Program for SOL transfers).  
3. The precompile proxies the instruction to Solana for execution on-chain.  
4. The result is returned to the Neon EVM contract, enabling seamless integration.

This composability allows developers to build dApps that combine the strengths of both blockchains, such as Ethereum’s robust tooling and Solana’s high throughput.
