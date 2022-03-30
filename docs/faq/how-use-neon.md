---
title: How can I use Neon?
---

  * [How do I start using dApps deployed on Neon EVM?](#how-do-i-start-using-dapps-deployed-on-neon-evm)
  * [What tools does a Neon EVM user need to start using the Neon EVM?](#what-tools-does-a-neon-evm-user-need-to-start-using-the-neon-evm)
  * [What tools does a Neon EVM operator need to run the Neon EVM?](#what-tools-does-a-neon-evm-operator-need-to-run-the-neon-evm)
  * [How do Neon EVM users pay for using dApps deployed on Neon EVM?](#how-do-neon-evm-users-pay-for-using-dapps-deployed-on-neon-evm)
  * [What happens if no Neon EVM operators accept my requested Neon transaction?](#what-happens-if-no-neon-evm-operators-accept-my-requested-neon-transaction)
  * [How do I transfer the token contracts deployed on the proxy network to my Phantom wallet?](#how-do-i-transfer-the-token-contracts-deployed-on-the-proxy-network-to-my-phantom-wallet)

### How do I start using dApps deployed on Neon EVM?

To start using a dApp deployed on Neon EVM as a user, you should have an account within
with a balance in NEON.

### What tools does a Neon EVM user need to start using the Neon EVM?

As a user, all you need is a MetaMask wallet pointed to the Neon network. For a description of how to set
up this configuration, check out this [quick tutorial](https://www.youtube.com/watch?v=ry2yGhWmGRw).

### What tools does a Neon EVM operator need to run the Neon EVM?

A Neon EVM operator needs the following:

  1. The Neon Web3 Proxy. A dedicated RPC Solana node for Operators is highly desirable.
  2. A Solana account (wallet) funded with SOL tokens.

See details [here](operating/operator_guide.md).

### How do Neon EVM users pay for using dApps deployed on Neon EVM?

A Neon EVM user would simply transfer funds to the address of the dApp (contract).

### What happens if no Neon EVM operators accept my requested Neon transaction?

In this scenario, a Neon EVM user will have two options:

  1. Increase the fee to be paid for the successful execution of their transaction.
  2. Perform the Neon transaction on their own.

### How do I transfer the token contracts deployed on the proxy network to my Phantom wallet?

Solana wallets do not work with Neon EVM. You need to use MetaMask.
In the future SOL/SPL tokens will be available in MetaMask.
