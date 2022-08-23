---
title: Gas Metering
---

## Introduction
Neon's gas metering system is part of the Neon Proxy's functionality, and is what allows proxies to create estimates for how much gas a transaction will cost before it is actually executed. This helps users determine how much gas to use when submitting their transaction to make sure that it is successful. Without this estimate, they may underestimate the required gas, which would result in the failure of the transaction; or they may overestimate the gas and end up overpayinbg for their transaction's execution.

While Neon's gas metering system was created to mirror Ethereum's gas estimation functionality as closely as possible, the cost of gas in the Neon EVM is significantly lower than on Ethereum as it is based on Solana’s gas price. It is determined by taking into consideration the following:
* The cost of executing a Solana transaction, which depends on the number of signatures specified in the transaction.
* A fee to be paid to Neon EVM governance that keeps Neon EVM running.
* A fee to the Neon EVM operator that executes the transaction.

The payment method is to be determined by the Neon EVM user - by default, the Neon EVM user pays the Neon EVM operator in NEON tokens. However, Neon EVM provides users with an option to choose any other ERC-20 token to pay for Neon transactions. These payment preferences are stored in the Solana state.

## How Gas Metering Works on Neon
The gas metering system on Neon works by following these steps:

1. The user interacts with a Neon EVM dApp and initiates a Neon transaction using MetaMask.
2. Before the user signs the Neon transaction, MetaMask will send the Neon transaction details to the Web3 Proxy.
3. The Web3 Proxy runs these details through its internal emulator to estimate:
   - The amount of storage needed to carry out the underlying Solana transactions, and
   - The number of Solana transactions required to complete the entire Neon transaction.
4. The Web3 Proxy’s internal Gas Metering System produces an estimate for the gas needed to execute the Neon transaction. This gas estimate includes a fee to Solana, a fee to Neon EVM Governance, and a fee to the Neon operator that helps facilitate the transaction.
5. The Proxy sends the gas estimate back to MetaMask via the Web3 API. This estimate is in lamports (1 lamport is 0.000000001 SOL).
6. MetaMask sends a request to the proxy, via the Web3 API, for the gas cost in NEON tokens for the specified amount of lamports, providing the price of a lamport in NEON tokens.
7. The proxy sends MetaMask the gas price in NEON. It adds a fee to the gas price (in NEON tokens) based on what the operator requests for their services. The default fee charged by operators is 10%, but this value may vary.
8. MetaMask displays the estimated cost to the user.
9. When the user signs/approves the Neon transaction via MetaMask, MetaMask will send the signed transaction to the Proxy. The Proxy will package the original Neon transaction into Solana transactions with the additional information gathered by the Gas Metering System.
10. Neon EVM cannot consume more gas than what is specified in the Neon transaction. If the execution requires more gas than specified in the Neon transaction, the transaction will fail, and the user will only pay for the estimated gas.
    - The transaction will not fail if the estimated amount provided to MetaMask by the Proxy is used.
    - If the user edits the gas limit above the estimated cost, the transaction may fail.

## How Gas is Calculated
The transaction fee on Neon is calculated based on the Solana transaction cost (proportional to the number of iterative transactions required, if any), the Neon EVM governance pool fee, and the Neon Proxy operator fee (which each operator sets for themselves). The estimated gas amount is calculated as follows:

First, the gas necessary to execute Ethereum instructions is calculated as follows:
* 2 \* 5000 \* number_of_iterations (for iterative transactions)
* 3 \* 5000 (for non-iterative transactions)

Then, the gas required to increase the storage size is **added**, if necessary:
* Bytes \* 6960

The final gas price comes out to:
* Gas price = (1 + Operator fee) * SOL-to-NEON-rate + (the fee above)

> Note: The operator's fee is set by individual operators. Its amount may vary depending on the operator.

## Examples
The following are some examples of gas prices for common actions on Neon:

* A simple asset transfer consumes around 15,000 gas
* Verification of a Solana or Ethereum signature consumes around 5,000 gas
* Using a treasury account consumes around 5,000 gas

For dApp deployment, the gas prices are steeper. Deploying a dApp with a 10Kb size, for example, mainly consists of the gas cost for storage: 10Kb \* 6980 = approximately 70 * 10^6 gas.

A token swap on Neon may require requires 10 Solana transactions and 100 bytes of storage, as follows:
* 10 \* 10,000 for verifying the Solana signatures.
* 10 \* 10,000 for using the treasury account.
* 100 \* 6980 - aprox 700,000
This comes out to a total of 100,000 + 100,000 + 700,000 = 900,000 gas.