---
title: 'Associated Token program composability library'
proofedDate: 20250618
iterationBy: na
includedInSite: true
approvedBy: Greg
---

# Associated Token program composability library

## Repository

[Associated Token program Solidity libraries](https://github.com/neonevm/neon-contracts/tree/main/solidity-composability-libraries/contracts/composability/libraries/associated-token-program/README.md)

## Exmaple contract
[CallAssociatedTokenProgram](https://github.com/neonevm/neon-contracts/tree/main/solidity-composability-libraries/contracts/composability/CallAssociatedTokenProgram.sol) - example contract demonstrating how the Associated Token program Solidity libraries can be used in practice to interact with Solana's Associated Token program.

## Associated Token program library
    
This library provides helper functions for formatting instructions to be executed by _Solana_'s **Associated Token** 
program.

### Available Associated Token program instructions

- `create`: creates and initializes a canonical _Associated Token account_ on _Solana_. Such an account holds 
data related to an SPL token holder. See [instruction formatting](https://github.com/neonevm/neon-contracts/tree/main/solidity-composability-libraries/contracts/composability/libraries/associated-token-program/LibAssociatedTokenProgram.sol).
