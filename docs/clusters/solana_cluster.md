---
title: Solana Clusters
proofedDate: na
iterationBy: na
includedInSite: false
approvedBy: na
comment: todo find out whether this page should be included in site -- no sidebar for this
---

A Solana cluster is a set of independently owned computers working together to verify the output of user-submitted programs. A Solana cluster can be utilized any time a user wants to preserve an immutable record of events in time or programmatic interpretations of those events. 

It can also be argued that a Solana cluster is a set of validators that serve client transactions and maintain the integrity of the registry. Solana maintains several different clusters with different purposes.

Two or more clusters can coexist if they have a common genesis block. Otherwise, they simply ignore the existence of the other. Transactions sent to the wrong address are rejected.  

### Endpoints
Solana maintains dedicated API nodes to fulfill JSON-RPC requests for each public cluster, and third parties may as well. Here are the public RPC endpoints currently available and recommended for each public cluster:
  * Devnet endpoint  
`https://api.devnet.solana.com` — single Solana-hosted API node; rate-limited.  
Devnet serves as a playground for anyone who wants to take Solana for a test drive as a user, token holder, app developer, or validator. Tokens are not real.
  * Testnet endpoint  
`https://api.testnet.solana.com` — single Solana-hosted API node; rate-limited.  
Testnet is used to stress-test recent release features on a live cluster, with particular focus on network performance, stability, and validator behavior. Tokens are not real.
  * Mainnet Beta endpoints  
`https://api.mainnet-beta.solana.com` — Solana-hosted API node cluster backed by a load balancer; rate-limited.  
`https://solana-api.projectserum.com` — Project Serum-hosted API node.  
This is a permissionless, persistent cluster for early token holders and launch partners. Tokens are real SOL.

### Synchronization
Fast, reliable synchronization is one of the main challenges for achieving high throughput. Traditional blockchains synchronize on large chunks of transactions called blocks. As a consensus algorithm, they use *[Proof-of-Work](https://en.wikipedia.org/wiki/Proof_of_work)* or *[Proof-of-Stake](https://en.wikipedia.org/wiki/Proof_of_stake)*.  
Unlike traditional synchronization methods, Solana takes a complete approach, which it calls *[Proof-of-History](https://docs.solana.com/cluster/synchronization)*. Solana uses an optimistic method of processing blocks. (It was introduced in 1981 and is called [Optimistic Concurrency Control](https://en.wikipedia.org/wiki/Optimistic_concurrency_control).)  
The peculiarity of this method is that Solana technically never sends a *block*, but uses the term to describe the sequence of entries that validators vote on to achieve *confirmation*. By processing the transactions optimistically, there is effectively no delay between the time the last entry is received and the time when the node can vote. In the event consensus is not achieved, a node simply rolls back its state.


> **More details**  
> [A Solana cluster](https://docs.solana.com/cluster/overview)  
> [Solana clusters](https://docs.solana.com/clusters)  
> [Solana cluster RPC endpoints](https://docs.solana.com/cluster/rpc-endpoints)
