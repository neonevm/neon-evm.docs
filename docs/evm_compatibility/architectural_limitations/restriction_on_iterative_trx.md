---
title: Restriction on Iterative Transactions
proofedDate: na
iterationBy: na
includedInSite: false
approvedBy: na
comment: 
---

Executing a transaction in iterative mode is a sequence of actions, each of which is performed by a separate account specified in it. The list of accounts is specified by the creator of the transaction.

### Description of the Problem
When executing a transaction in iterative mode via the Neon EVM, a user may receive the error with a message about a blocked account. In this case, further execution of the transaction is terminated. This can happen despite the fact that the execution of the same transaction on Ethereum completes successfully, which is confusing for users since they are sure of the correctness of the transaction they have created.

### Details
The error is not typical for Ethereum and only appears in the Neon EVM. The reason for the error with the message about blocked accounts lies in the processing of iterative transactions in the Neon EVM.

Processing an iterative transaction in the Neon EVM:
  * The Neon EVM receives the transaction for iterative execution and first marks the accounts specified in it for blocking.
  * When the next transaction enters the Neon EVM, the list of accounts specified in it and involved in its execution is viewed. If at this moment any listed account is in a blocked state for iterative execution in another transaction, the Neon EVM returns the error.
  * The first transaction that blocked accounts will unblock the accounts only when it is completed.

The point of this implementation for Mainnet is to have a consistent state for Solana accounts during the execution of the transaction until it is completed. Since the transaction is executed in iterative mode, there are time intervals between the steps being executed. Therefore, such a solution excludes the possibility of changing the data of Solana's accounts located in system state during these intervals.

### Solution
Issuing the error about blocked accounts when starting a transaction is a temporary workaround solution. The final decision will be made after MVP on Mainnet.
