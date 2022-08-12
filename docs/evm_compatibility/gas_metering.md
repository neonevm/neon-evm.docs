---
title: Gas Metering
---

## intro

The cost of gas in Neon EVM is significantly lower than on Ethereum as it is based on Solana’s
gas price. It is to be determined taking into consideration:
● The cost of executing a Solana transaction, which depends on the number of signatures
specified in the transaction — as mentioned earlier, in Solana transactions only one
signature (that of the Neon EVM operator) is specified because Neon signatures are
verified in Neon EVM (see the above section on iterative execution of transactions).
● A fee to be paid to Neon EVM governance that keeps Neon EVM running.
● A fee to the Neon EVM operator that executes the transaction.
The payment means is to be determined by the Neon EVM user:
● By default, the Neon EVM user pays the Neon EVM operator in ETH tokens.
● However, Neon EVM provides users with an option to choose any other ERC20 token to
pay for Neon transactions.
● The payment preferences are stored in the Solana state.

## How Gas Metering Works on Neon

1. The end-user interacts with the Neon EVM dApp and initiates a Neon transaction using MetaMask.
2. MetaMask will send Neon transaction details to the Web3 Proxy before the end-user signs the Neon transaction.
3. The Web3 Proxy will run the Neon transactions details through its internal emulator to identify the estimated amount of storage needed in bytes to carry out the iterative transactions on Solana and the estimated amount of Solana iterative transactions required to complete the entire Neon transaction. The Web3 Proxy uses this data to perform a calculation for the amount of Gas needed to execute the Neon transaction
4. The Web3 Proxy’s internal Gas Metering System produces an estimated amount of gas needed to execute the Neon transaction for the end-user.
- This gas amount includes a fee to Solana, a fee to Neon EVM Governance, and a fee to the Neon operator that helps facilitate the transaction.
5. Information containing the estimated amount of gas is sent back to MetaMask via Web3 API from the proxy.
6. MetaMask will send a request to the proxy, via web3 API, for the gas cost in NEON tokens for the specified amount of lamports (cost of each lamport in NEON tokens).
7. The proxy will send MetaMask the gas price in NEON for each lamport needed. It adds a % fee to the gas price (in NEON tokens) for each lamport based on what the operator requests for their services. The default fee charged by operators is 10%; this value can vary.
8. MetaMask displays the estimated cost to the user.
9. When the user signs/approves the Neon transaction via MetaMask, MetaMask will send the signed transaction to the Proxy. The Proxy will package the original Neon transaction into a Solana transaction with the additional information gathered by the Gas Metering System.
10. Neon EVM can’t consume more gas than specified in the Neon transaction. If the execution requires more gas than specified in the Neon transaction, the transaction will fail, and the user will pay for all the gas.
- The transaction will not fail if the estimated amount provided to MetaMask by the Proxy is used.
- If the user edits the gas limit above the estimated cost, the transaction may fail.

## How Gas is Calculated

The transaction fee on Neon is calculated based on the Solana transaction cost (proportional to the number of iterative transactions required, if any), the Neon EVM governance pool fee, and the Neon Proxy operator fee (which each operator sets for themselves). 

Gas amount is calculated as follows:

First, calculate gas for “Execute Eth Instructions”

2 * 5000 * iter_count (for an iterative transaction)
3 * 5000 (for a non-iterative transaction)
Then, add gas for “Extend Storage Size”

Bytes * 6960
Gas price = (1 + Operator fee) * SOL-to-NEON-rate

Note: the operators fee is set by individual operators