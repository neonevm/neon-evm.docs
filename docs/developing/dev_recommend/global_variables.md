---
title: Global Variables & Oracle Integration Optimizations
proofedDate: 20240708
iterationBy: AI
includedInSite: true
approvedBy: TBD
comment: Formatted based on template, updated with 'important' boxes
---

## TL;DR

- Global variables in Neon EVM can cause issues with transaction processing
- Oracle price feeds from Pyth and Chainlink are particularly affected
- Developers should follow best practices to optimize for parallel execution

## Overview

This document discusses global variables issues in the Neon EVM ecosystem — specifically price feeds from Oracles and transaction processing. Most of these insights were derived from root-cause analysis of specific problems protocols like LendOS and Lumen encountered after the Mainnet upgrade.

## Background

After a recent Mainnet upgrade, reports emerged of transaction error processing in protocols using Oracle price feeds — notably Pyth and Chainlink. For most, the underlying issue was how global variables are updated in the new optimistic transaction processing model.

## The Problem of Updating Global Variables and Restarting Transactions

In simple terms, the problem lies in how changes to global variables are processed during the execution of a transaction in the Neon EVM. When a contract reads in an external variable, for instance, an oracle price feed, at the beginning of its execution, the EVM would recheck if this variable changed at the beginning of each subsequent iteration. If this occurs, it is considered to start over the transaction.

This is a serious issue, particularly when it comes to oracles, as their price updates are by nature quite dynamic. For instance:

- Pyth oracles updates NEON/ USD price feed once a minute..
- Chainlink price feeds on Solana are updated around 5 times/ minute..

This means any transaction that relies on these frequently updating price feeds will likely reset due to a failed or stuck transaction.

:::important
Frequent updates to global variables like oracle price feeds can cause transaction restarts and performance issues in the Neon EVM.
:::

## Protocol Impact

- **LendOS**: Experienced issues for both USDC and wSOL borrows, which were dependent on the Chainlink oracle.
- **Lumen**: Faced similar problems due to heavy reliance on Chainlink oracles.

## Technical Analysis

### EVM Behavior

The Neon EVM computes the account hashes from the other programs and is not owned directly by the Neon EVM. This means that external changes to these accounts can provoke a restart of transactions.

```rust
// From neon-evm/evm_loader/program/src/account/state.rs
pub fn hash(&self) -> [u8; 32] {
    let mut hasher = Sha256::new();
    hasher.update(&self.lamports.to_le_bytes());
    hasher.update(&self.data);
    hasher.update(&self.owner.to_bytes());
    hasher.update(&[self.executable as u8]);
    hasher.update(&self.rent_epoch.to_le_bytes());
    hasher.finalize().into()
}
```

This hashing scheme propagates to accounts owned by other programs and results in potential problems. Directly reading from the Pyth contract, which added 20+ Solana accounts to transactions, caused choke-ups during testnet.

## Oracle Integration Challenges

### Pyth Oracle

- Direct reading from the Pyth contract added 20+ Solana accounts on transactions, which caused blockages during testnet.
- A caching mechanism was implemented in LendOS (PythAggregator contract) to avoid frequent price updates.

### Chainlink Oracle

- Frequent updates (~ 5 times/minute) result in transaction restarts in the new optimistic processing model.

:::tip
Implementing caching mechanisms for oracle data can help mitigate frequent transaction restarts.
:::

## Best Practices for Developers

When working in parallel execution environments like Neon EVM, developers should adopt the following best practices to fully benefit from parallel processing:

### Good Practices

- **Avoid Shared Resources**: Implement practices that use shared account data very little.
- **User-Specific Data Structures**: Implement isolating user data structures. For example, in ERC20 tokens:
  - Use mappings: `user_address → user_metadata`. This way, the transaction for a particular user may change only its specific data without interfering with transactions of other users.

### Practices to Avoid

- **Global Smart Contract Variables**: When data is stored as global variables for the smart contract, it results in performance issues.
- **Frequent Global Updates**: Updating global variables (such as price feeds) with every user transaction entails that all user transactions are queued and executed serially. This kills parallel execution.

:::info
Adopting user-specific data structures and minimizing global variables can significantly improve parallel execution performance.
:::

### Recommendations

- **Minimize Global Variables**: Avoid global smart contract variables, especially for write operations.
- **Read-Only Operations**: The above recommendations are primarily valid for write operations and are less critical for read-only operations.

## Proposed Solutions

1. **Disable Specific Account Type Checks**: Disable the change check for accounts of the particular type. For instance, in the case of SPL Token accounts owned by Neon EVM, turn off change checking. This may be inappropriate if Neon EVM does not own an account.

2. **Selective Account Checking**: Modify the EVM to omit read-only accounts for selective checks and only check accounts the action interacts with. This can potentially avoid unnecessary restarts for read-only data like price feeds.

3. **Implement a Particular Account Type**: Define a new type of NeonEVM account that can only be used for holding data, such as prices, where change checking does not make sense. This solution requires careful design and auditing.

4. **Optimize Oracle Integration**:
   - **For Pyth**: Directly read from the Solana account, potentially without a middle caching layer.
   - **For Chainlink**: Explore optimizations on how frequently it checks against the quickly updating price feeds.

5. **Refactor Existing Contracts**: 
   - Examine and modify current smart contracts to bring them into compliance with the previously mentioned best practices.
   - When feasible, employ user-specific data structures in place of global variables.

:::tip
Implementing these solutions can help optimize transaction processing and reduce issues related to global variables in the Neon EVM ecosystem.
:::