---
title: How does Neon work?
proofedDate: na
iterationBy: na
includedInSite: false
approvedBy: na
comments: na
---

* [How does Neon the EVM interact with Solana?](#how-does-the-neon-evm-interact-with-solana)
* [How does the Neon EVM contract work?](#how-does-the-neon-evm-contract-work)
* [How does the Neon EVM enable the parallel execution of transactions?](#how-does-the-neon-evm-enable-the-parallel-execution-of-transactions)
* [What types of transactions can be executed in parallel?](#what-types-of-transactions-can-be-executed-in-parallel)
* [What types of transactions are executed iteratively the by Neon EVM, and why?](#what-types-of-transactions-are-executed-iteratively-by-the-neon-evm-and-why)
* [How do you ensure that iterative transactions are finalized by the Neon EVM operator?](#how-do-you-ensure-that-iterative-transactions-are-finalized-by-the-neon-evm-operator)
* [Why are Solana accounts "blocked" when iterative execution begins?](#why-are-solana-accounts-blocked-when-iterative-execution-begins)
* [Is the Neon EVM compatible with native Solana contracts such as SPL tokens?](#is-the-neon-evm-compatible-with-native-solana-contracts-such-as-spl-tokens)
* [Is it possible to call a function of a contract running on the Neon EVM from other Solana contracts?](#is-it-possible-to-call-a-function-of-a-contract-running-on-the-neon-evm-from-other-solana-contracts)
* [How are Neon EVM gas fees calculated?](#how-are-neon-evm-gas-fees-calculated)
* [How are gas costs paid on the Neon EVM?](#how-are-gas-costs-paid-on-the-neon-evm)
* [What are NEON tokens used for?](#what-are-neon-tokens-used-for)
* [Why do transactions go through the Neon Web3 Proxy before the Neon EVM by default?](#why-do-transactions-go-through-the-neon-web3-proxy-before-the-neon-evm-by-default)
* [What does it mean to "send a Solana transaction directly to a Solana node without the Neon Web3 Proxy"?](#what-does-it-mean-to-send-a-solana-transaction-directly-to-a-solana-node-without-the-neon-web3-proxy)
* [How can Neon transactions be performed without the Neon Web3 Proxy?](#how-can-neon-transactions-be-performed-without-the-neon-web3-proxy)
* [I am a dApp developer and I don't want to use the Neon Web3 Proxy. How will this impact my project?](#i-am-a-dapp-developer-and-i-dont-want-to-use-the-neon-web3-proxy-how-will-this-impact-my-project)
* [Are proxies custodial?](#are-proxies-custodial)
* [How do accounts work in the Neon EVM?](#how-do-accounts-work-in-neon-evm)
* [Is arbitrary data stored on a remote host and simply executed on Solana?](#is-arbitrary-data-stored-on-a-remote-host-and-simply-executed-on-solana)
* [Does the Neon EVM add complex virtualization requiring Solana validators to cooperatively execute Neon transactions across multiple blocks?](#does-the-neon-evm-add-complex-virtualization-requiring-solana-validators-to-cooperatively-execute-neon-transactions-across-multiple-blocks)
* [How does the transfer of funds from Ethereum to the Neon EVM occur?](#how-does-the-transfer-of-funds-from-ethereum-to-the-neon-evm-occur)
* [What infrastructure is available (wallets, blockchain explorers, oracles, etc.) for Neon EVM users?](#what-infrastructure-is-available-wallets-blockchain-explorers-oracles-etc-for-neon-evm-users)

### How does the Neon EVM interact with Solana?

The Alpha version of the Neon EVM has an interface that can interact with [SPL token](about/terminology.md#spl-token) accounts.
The Beta version of the Neon EVM will have an interface that can read data from Solana accounts and will facilitate the integration of Neon EVM contracts with Oracles on Solana.
In upcoming versions, Neon Labs plans to implement an interface for writing data to Solana accounts, which will allow the integration of Neon EVM contracts with Solana programs.

The Neon EVM works as a smart contract on the Solana blockchain. The contract can interact with and call other
smart contracts on Solana — for example, [SPL tokens](about/terminology.md#spl-token). The Neon EVM is able to access data stored on Solana accounts. Furthermore, every Ethereum-like account within the Neon EVM is stored in a corresponding Solana account.

### How does the Neon EVM contract work?

The Neon EVM is a smart contract on Solana acting as the Ethereum Virtual Machine. It is compiled into [Berkeley Packet Filter](about/terminology.md#berkeley-packet-filter-bpf) bytecode, a format that can be executed on Solana. This allows the Neon EVM to receive Solana transactions with wrapped Ethereum-like transactions and process them on Solana according to Ethereum rules.

### How does the Neon EVM enable the parallel execution of transactions?

Solana can process tens of thousands of contracts in parallel using as many cores as are available to its validator. This functionality is known as Sealevel. Parallel processing is possible because Solana transactions describe all the accounts a transaction will read or write while executing. This prevents transactions from overlapping, and allows independent transactions and those that are reading the same account to be executed concurrently.

Regarding parallel processing on the Neon EVM, Neon transactions are wrapped into Solana transactions by the Neon Web3 Proxy. The Neon EVM program is a smart contract on Solana, so Solana loads the Neon EVM program for each Neon transaction. This allows them to be executed in parallel by Solana.

### What types of transactions can be executed in parallel?

Transactions that do not change/write data to the same Solana accounts can be executed in parallel

### What types of transactions are executed iteratively by the Neon EVM, and why?

The Solana blockchain limits the resources (instructions) allocated to the execution of a single transaction to ensure optimal usage of hardware. Due to this restriction, Neon transactions that exceed Solana's resource limit are executed iteratively by the Neon EVM.

### How do you ensure that iterative transactions are finalized by the Neon EVM operator?

Neon EVM operators deposit their own funds at the start of the execution of iterative transactions. If the transaction isn't fully executed by the original operator, the deposit and the user's fee are granted to another operator who finalizes it.

Each operator has a financial interest in executing an operation that was not finalized by the original operator. This eliminates the appearance of unfinalized transactions.

### Why are Solana accounts "blocked" when iterative execution begins?

The "blocking" of Solana accounts supports the atomicity of entire Neon transactions by preventing modifications to the targeted accounts through other Neon transactions.

### Is the Neon EVM compatible with native Solana contracts such as SPL tokens?

Yes, the Neon EVM has compatibility with native Solana tokens.

### Is it possible to call a function of a contract running on the Neon EVM from other Solana contracts?

No, this is not possible in the Alpha version of the Neon EVM. We are working on an architecture that will allow the integration of Neon EVM contracts and Solana programs.

### How are Neon EVM gas fees calculated?

Neon EVM gas fees include three main components:
  1. The cost of executing a Solana transaction, which depends on the number of signatures specified in the
transaction.
  2. A fee paid to the Neon EVM governance body for using the Neon EVM.
  3. A fee paid to the Neon EVM operator that executes the transaction.

### How are gas costs paid on the Neon EVM?

Gas costs on the Neon EVM will be initially paid in NEON tokens. Eventually, payment will be accepted in NEON/ETH/ERC-20 at the discretion of the Neon EVM operator.

### What are NEON tokens used for?

The Neon economy is fee-based. The NEON token is a utility token that is needed to pay for the execution of Neon transactions. At launch, Neon governance will be handled by a multisig account whose keys are held by reputable individuals and entities with a vested interest in the success of Neon. Additionally, there will be a clear and user-friendly process for proposing and voting for protocol improvements.

Shortly after Mainnet launch, Neon governance will transition to a DAO, and the NEON token will be used for governance purposes as well.

### Why do transactions go through the Neon Web3 Proxy before the Neon EVM by default?

The Neon Web3 Proxy performs two main functions:
  * The first function is to enable interactions between Ethereum clients and a Solana cluster. An Ethereum client doesn’t know anything about the interaction protocol for the Solana node. The Solana node doesn't know anything about Ethereum-like transactions. The Neon Web3 Proxy provides an Ethereum-like RPC endpoint for Ethereum clients. When an Ethereum client sends a Neon transaction to the Neon Web3 Proxy, the Proxy packs the Neon transaction into a Solana transaction and sends the Solana transaction to the Solana cluster for on-chain execution.
  * The second function is to process big Ethereum-like transactions. Solana limits the amount of resources for the execution of a single Solana transaction. If an Ethereum-like transaction requires a lot of compute units, it cannot be performed within a single Solana transaction.

Therefore, the Neon EVM program saves the EVM state to the Solana storage, and when the Neon Web3 Proxy sends a command to the Solana cluster, the execution of the stored Neon transaction is renewed. So the Neon EVM program restores the EVM state on demand and continues the Neon transaction execution from the stopping point. This process continues until the Neon transaction is completed.

### What does it mean to "send a Solana transaction directly to a Solana node without the Neon Web3 Proxy"?

It means that a Neon user makes the Solana transactions needed to execute their Ethereum-like
transactions on their own. In this use case, the Neon operator is excluded from the process.

All fees tied to the Solana transactions for this use case must be paid for directly by the Neon user in SOL.

### How can Neon transactions be performed without the Neon Web3 Proxy?

The Solana transaction needs to be built on the client side (web/mobile) with a Neon transaction packed
within it. The Solana transaction can then be sent directly to a Solana node without the Neon Web3 Proxy.

When using this method, it’s important to understand that the sender (Neon user) is responsible for the
following items:

1. In cases where the Neon transaction is too large, it has to be executed [iteratively](architecture/value_token.md#token-circulation).
2. A list of all Neon accounts and contracts corresponding to the Neon transaction needs to be determined
on the client side.


### I am a dApp developer and I don't want to use the Neon Web3 Proxy. How will this impact my project?

The Neon Web3 Proxy can be implemented as a library, but implementation isn't simple. The most complex part of Neon Web3 Proxy implementation is the iterative transaction execution. The Neon Web3 Proxy forms Solana transactions, marking the number of VM steps to be executed without exceeding the BPF instruction limit of the Solana VM. The Neon Web3 Proxy traces the process of the Neon transaction execution, sending transactions for the continuation of the suspended Neon transaction, awaiting its full execution. So if you don't want to use the Neon Web3 Proxy, you will still need to implement its functionality in your client.

### Are proxies custodial?

Proxy operators are not gatekeepers. The Neon EVM ensures the independence of its operations by providing open access to its infrastructure to anyone who is willing to run and capable of running the Neon Web3 Proxy. Moreover, the Neon Web3 Proxy can be replaced with a client library by any Neon EVM client. The transactions received by the Neon EVM cannot be discriminated against because they do not have any attributes that determine their priority. The unchangeable nonce and user signature fields verified by the Neon EVM program guarantee the consistency of execution of Neon transactions and protect from re-execution.

### How do accounts work in the Neon EVM?

The Ethereum-like accounts are saved in Solana storage by the Neon EVM (Solana is agnostic to such data), and therefore there is no need to redesign or even to recompile Ethereum smart contracts.

### Is arbitrary data stored on a remote host and simply executed on Solana?

The Neon EVM stores all data in the Solana state. In terms of execution, the Neon EVM smart contract on Solana
handles and processes arbitrary data.

### Does the Neon EVM add complex virtualization requiring Solana validators to cooperatively execute Neon transactions across multiple blocks?

The Neon EVM Web3 Proxy handles all the transaction structuring and conversion work automatically.
There is no need for Solana validators to treat transactions from Neon EVM any differently. Anyone,
including Neon EVM clients or users, can launch and run the Neon Web3 Proxy.

### How does the transfer of funds from Ethereum to the Neon EVM occur?

This transfer is facilitated by the Wormhole bridge.

When ERC-20 tokens on layer 1 (L1) are sent across the Wormhole bridge, SPL tokens representing the
ERC-20 tokens are generated by an SPL token contract on Solana.

To enable the interaction between SPL tokens and the Neon EVM interface (along with smart contracts on
the Neon EVM), the original ERC-20 tokens are "wrapped" into SPL tokens. Once the ERC-20 tokens are
wrapped, they're able to operate on the Solana network. This "wrapper" is also used to transfer SOL/SPL
tokens to Ethereum wallets such as MetaMask.

After these two steps, the funds are considered to be transferred from Ethereum to a Neon user's wallet.

### What infrastructure is available (wallets, blockchain explorers, oracles, etc.) for Neon EVM users?

Blockchain explorers and oracles will be available in the future.
