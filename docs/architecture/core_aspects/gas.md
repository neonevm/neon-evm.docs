---
title: Gas
proofedDate: na
iterationBy: na
includedInSite: false
approvedBy: na
comment: 
---

Gas is required for the Ethereum network. This is the fuel that allows it to work, just as a car needs gasoline to run.  

## What is gas?

Gas is a unit of measurement that determines the amount of computational effort required to perform certain operations on the Ethereum network.  

Since each transaction requires computational resources to execute, each transaction requires a fee. Gas refers to the fee required to successfully conduct a transaction on the network.  

Performing any operation on Ethereum requires gas consumption. This includes calculations, storing or manipulating data, or transferring tokens, each consuming different amounts of "gas" units. As dApp functionality becomes more complex, the number of operations a smart contract performs grows too, and all of them lead to large amounts of gas that must be paid for.

## What is gas limit?

Gas limit means the maximum amount of gas you are willing to consume on a transaction. A higher gas limit means more computational work can be done while interacting with smart contracts.  

For example, if you put a gas limit of 50,000 for a simple coin transfer, the coins would consume 21,000, and you would get back the remaining 29,000. However, if you specify too little gas, for example, a gas limit of 20,000 for a simple coin transfer, the coins will consume your 20,000 gas units attempting to fulfill the txn, but the transfer will not be completed. The EVM then reverts any changes, but since 20,000 gas units worth of work has already been done, that gas is consumed.

> **More details**  
> [GAS and FEES](https://ethereum.org/en/developers/docs/gas/)
