---
title: Gas Metering
---

<<<<<<< HEAD
## Introduction
=======
>>>>>>> 88b475d (Gas metering)
Neon's gas metering system is part of the Neon Proxy's functionality, and is what allows proxies to create estimates for the gas a transaction will cost before it is actually executed. This helps users determine how much gas to use when submitting their transaction to make sure that it is successful. Without this estimate, they may err on the side of underestimating the required gas, which would result in the failure of the transaction; or they may err on the side of overestimation and thereby grossly overpay for their transaction's execution.

While Neon's gas metering system was created to mirror Ethereum's gas estimation functionality as closely as possible, the cost of gas in Neon EVM is significantly lower than on Ethereum as it is based on Solana’s gas price. It is determined by taking into consideration the following:
* The cost of executing a Solana transaction, which depends on the number of signatures specified in the transaction.
* A fee to be paid to Neon EVM governance that keeps Neon EVM running.
* A fee to the Neon EVM operator that executes the transaction.

The payment means is to be determined by the Neon EVM user:
* By default, the Neon EVM user pays the Neon EVM operator in NEON tokens.
* However, Neon EVM provides users with an option to choose any other ERC-20 token to pay for Neon transactions.
* The payment preferences are stored in the Solana state.

## How Gas Metering Works on Neon
The gas metering system on Neon works by following these ten steps:

1. The end user interacts with the Neon EVM dApp and initiates a Neon transaction using MetaMask.
2. MetaMask will send Neon transaction details to the Web3 Proxy before the end user signs the Neon transaction.
3. The Web3 Proxy will run the Neon transactions details through its internal emulator to identify the estimated amount of storage needed in bytes to carry out the iterative transactions on Solana and the estimated amount of Solana iterative transactions required to complete the entire Neon transaction. The Web3 Proxy uses this data to perform a calculation for the amount of gas needed to execute the Neon transaction.
4. The Web3 Proxy’s internal Gas Metering System produces an estimated amount of gas needed to execute the Neon transaction for the end user.
   - This gas amount includes a fee to Solana, a fee to Neon EVM Governance, and a fee to the Neon operator that helps facilitate the transaction.
5. Information containing the estimated amount of gas is sent back to MetaMask via Web3 API from the proxy.
6. MetaMask will send a request to the proxy, via the Web3 API, for the gas cost in NEON tokens for the specified amount of lamports (cost of each lamport in NEON tokens).
7. The proxy will send MetaMask the gas price in NEON for each lamport needed. It adds a % fee to the gas price (in NEON tokens) for each lamport based on what the operator requests for their services. The default fee charged by operators is 10%; this value can vary.
8. MetaMask displays the estimated cost to the user.
9. When the user signs/approves the Neon transaction via MetaMask, MetaMask will send the signed transaction to the Proxy. The Proxy will package the original Neon transaction into a Solana transaction with the additional information gathered by the Gas Metering System.
10. Neon EVM cannot consume more gas than specified in the Neon transaction. If the execution requires more gas than specified in the Neon transaction, the transaction will fail, and the user will pay for all the gas.
    - The transaction will not fail if the estimated amount provided to MetaMask by the Proxy is used.
    - If the user edits the gas limit above the estimated cost, the transaction may fail.

## How Gas is Calculated
The transaction fee on Neon is calculated based on the Solana transaction cost (proportional to the number of iterative transactions required, if any), the Neon EVM governance pool fee, and the Neon Proxy operator fee (which each operator sets for themselves). The estimated gas amount is calculated as follows:

First, calculate the gas necessary to execute Ethereum instructions:
* 2 \* 5000 \* number_of_iterations (for iterative transactions)
* 3 \* 5000 (for non-iterative transactions)

Then, **add** the gas to increase the storage size, if necessary:
* Bytes \* 6960

The final gas price comes out to:
* Gas price = (1 + Operator fee) * SOL-to-NEON-rate + (the fee above)

> Note: The operator's fee is set by individual operators. Its amount may vary depending on the operator.