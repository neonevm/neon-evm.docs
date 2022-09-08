---
title: Gas Metering
---

## Introduction
Neon's gas metering system is part of the Neon Proxy's functionality, and is what allows proxies to create estimates for how much gas a transaction will cost before it is actually executed. This helps users determine how much gas to use when submitting their transaction to make sure that it is successful. Without this estimate, they may underestimate the required gas, which would result in the failure of the transaction; or they may overestimate the gas and end up overpaying for their transaction's execution.

While Neon's gas metering system looks similar to Ethereum's gas estimation, they are in fact completely different. For example, the cost of gas in the Neon EVM is significantly lower than on Ethereum as it is based on Solana’s gas price. This is because Neon uses Solana to execute transactions on the native blockchain level. The Neon gas price is determined by taking into consideration the following:
* The cost of executing a Solana transaction, which depends on the number of signatures specified in the transaction. This factor includes the execution as well as storage costs for each required Solana transaction.
* A fee to be paid to Neon EVM governance that keeps Neon EVM running.
* A fee to the Neon EVM operator that executes the transaction.

The amount of gas for the first factor, the Solana execution cost, is equivalent to the number of lamports used to execute the same transactions natively on Solana. Each lamport is worth 0.000000001 SOL.

The payment method is to be determined by the Neon EVM user - by default, the Neon EVM user pays the Neon EVM operator in NEON tokens. However, Neon EVM provides users with an option to choose any other ERC-20 token to pay for Neon transactions. These payment preferences are stored in the Solana state.

## Gas Amount
To calculate the required gas fee for an action on Neon, one must first determine how many units of gas it will use. To illustrate how the estimated gas unit amount is calculated, we will demonstrate the formula by using familiar examples.

Many simple actions on Neon are considered the building blocks of more complex processes, and therefore their gas unit consumption is a stable 5,000 gas units each. These actions are:
* Verification of a Solana signature
* Verification of an Ethereum signature
* Using a treasury account

For more complex instructions, such as an asset transfer between wallets, the amount of gas units necessary to execute them is calculated as follows:
* 3 \* 5000 = 15,000 (for non-iterative transactions)

For example, a simple asset transfer consumes around 15,000 gas units.

The 3x multiplier includes the fee for the Neon governance structure as well as the fee required to check the Ethereum signature.

For an iterative Neon transaction, use the following calculation instead:
* 2 \* 5000 \* Number_of_iterations (for iterative transactions)

For something even more complex, such as dApp deployment, the gas consumption is steeper due to the additional expense of data storage. The gas units needed for storage are calculated as follows:
* Bytes \* 6960

This sum is added to the above amount to yield the total amount of gas required to execute a Neon deployment.

Deploying a dApp with a 10Kb size, for example, mainly consists of the gas required for storage: 10Kb \* 6960 = approximately 7 * 10^6 gas units for storage, much more than what is required for the execution.

A token swap on Neon may require 10 Solana transactions and 100 bytes of storage, as follows:
* 10 \* 10,000 for verifying the Solana signatures.
* 10 \* 10,000 for using the treasury account.
* 100 \* 6960 = aprox 700,000
This comes out to a total of 100,000 + 100,000 + 700,000 = 900,000 gas units.

## Gas Price
To determine the final transaction fee estimate provided to the user, it is necessary to multiply the required amount of gas units (calculated above) by the price per gas unit. The price per unit of gas, in Alans, is calculated as follows:
* Gas price = (1 + Operator_fee) * NEON_to_SOL_rate

One Alan is equivalent to 10^-18 NEON tokens per lamport (fraction of SOL).

For example, for the token transfer example described above, we must multiply the 900,000 gas units by the price per gas unit to get the gas price. Let's assume that the operator's fee is 870 and the NEON to SOL rate is 167,000,000:1. This gives us a gas price of
* (1 + 870) * 167,000,000 = 145,457,000,000 Alans

Then, multiplying this amount by 900,000 and by 10^-18 yields the following amount in NEON tokens:
* 145,457,000,000 \* 900,000 \* 10^-18 = 0.1309113 NEON

Thus, executing a token swap on Neon would cost around 0.13 NEON as the transaction fee.

## Details on How Gas is Calculated
The transaction fee on Neon is calculated based on the Solana transaction cost (proportional to the number of iterative transactions required, if any), the Neon EVM governance pool fee, and the Neon Proxy operator fee (which each operator sets for themselves). The estimated gas amount is calculated as follows:

First, the amount of gas units necessary to execute Ethereum instructions is calculated as follows:
* 2 \* 5000 \* Number_of_iterations (for iterative transactions)
* 3 \* 5000 (for non-iterative transactions)

The 2x or 3x multiplier includes the fee for the Neon governance structure as well as the fee required to check the Ethereum signature.

Then, the gas units required to increase the storage size are **added** to the amount above, if necessary. The gas units needed for storage are calculated as follows:
* Bytes \* 6960

The amount of gas units needed is proportionate to the amount of lamports needed to execute the same action on Solana.

The price per unit of gas, in Alans, is calculated as follows:
* Gas price = (1 + Operator_fee) * NEON_to_SOL_rate

One Alan is equivalent to 10^-18 NEON tokens per lamport.

> Note: The operator's fee is set by individual operators. Its amount may vary depending on the operator.

This price per gas unit is multiplied by the number of gas units (as well as the NEON price factor 10^-18) to produce the final gas price, in NEON tokens, displayed to the user. The formula to calculate the gas price for non-iterative transactions is therefore:
* (15,000 + (Bytes \* 6960)) \* ((1 + Operator) * NEON_to_SOL_rate) \* 10^-18

And the formula for iterative transactions is:
* ((10,000 \* Number_of_iterations) + (Bytes \* 6960)) \* ((1 + Operator) * NEON_to_SOL_rate) \* 10^-18

## The Neon Proxy's Gas Estimation Procedure
The gas metering system on Neon works by following these steps:

1. The user interacts with a Neon EVM dApp and initiates a Neon transaction using MetaMask.
2. Before the user signs the Neon transaction, MetaMask will send the Neon transaction details to the Web3 Proxy.
3. The Web3 Proxy runs these details through its internal emulator to estimate:
   - The amount of storage needed to carry out the underlying Solana transactions, and
   - The number of Solana transactions required to complete the entire Neon transaction.
4. The Web3 Proxy’s internal Gas Metering System produces an estimate for the gas needed to execute the Neon transaction. This gas estimate includes a fee to Solana, a fee to Neon EVM Governance, and a fee to the Neon operator that helps facilitate the transaction.
5. The Proxy sends the gas estimate back to MetaMask via the Web3 API. This estimate is in lamports.
6. MetaMask sends a request to the proxy, via the Web3 API, for the gas cost in NEON tokens for the specified amount of lamports, providing the price of a lamport in NEON tokens.
7. The proxy sends MetaMask the gas price in NEON. It adds a fee to the gas price (in NEON tokens) based on what the operator requests for their services. The default fee charged by operators is 10%, but this value may vary.
8. MetaMask displays the estimated cost to the user.
9. When the user signs/approves the Neon transaction via MetaMask, MetaMask will send the signed transaction to the Proxy. The Proxy will package the original Neon transaction into Solana transactions with the additional information gathered by the Gas Metering System.
10. Neon EVM cannot consume more gas than what is specified in the Neon transaction. If the execution requires more gas than specified in the Neon transaction, the transaction will fail, and the user will only pay for the estimated gas.
    - The transaction will not fail if the estimated amount provided to MetaMask by the Proxy is used.
    - If the user edits the gas limit above the estimated cost, the transaction may fail.