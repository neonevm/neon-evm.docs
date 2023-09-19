---
title: NeonPass FAQ
proofedDate: 20230919
iterationBy: na
includedInSite: true
approvedBy: na
comments: na
---

## NeonPass FAQ

This page answers some of the most commonly asked questions about NeonPass.

### How do I use NeonPass?

The [NeonPass](/docs/token_transferring/neonpass_usage) tutorial details the steps to use the NeonPass app. Alternatively, you may use the [npm package](/docs/developing/integrate/neon_transfer).


### Does NeonPass wrap my tokens?
No. The term wrapped is associated with the common practice of locking assets on one chain to mint their equivalent, “synthetic” asset on another chain. We prefer to describe the “packaging” of SPL tokens via the interface contract to distinguish the approach of NeonPass from that of traditional wrapping. NeonPass [transfers assets between accounts](/docs/tokens/token-accounts); it doesn't lock or mint tokens.


### What are the different account types in Solana and Neon EVM?
Solana has Associated Token Accounts (not to be confused with Solana User Accounts), which manage tokens. These Token Accounts are owned by the Solana Token Program, the default program in the Solana Blockchain. This provides authority to the User Solana Account according to the relationship between tokens and user accounts defined by the Associated Token Program, one of Solana’s default programs.


Neon EVM ERC-20 Token Accounts are not the same as Neon EVM’s User Accounts, i.e., those EVM-based wallet accounts. The former are created within the Neon EVM Ecosystem to store the assets associated with users’ Neon EVM-facing wallet accounts. 


### What accounts are created on my behalf?
When you transfer an asset to a Neon EVM account from Solana that doesn’t have any existing balance of that asset, a new Neon EVM ERC-20 Token Account is created to store the balance. This account is linked to your associated Neon EVM User Account. If the Neon Account does contain that asset’s balance, then the incoming assets are transferred to the existing Neon EVM ERC-20 Token Account associated with your Neon EVM User Account. 

Similarly, if a Solana account doesn't have an existing asset balance for the incoming asset, a new Solana Associated Token Account is created to store the new asset balance on behalf of your associated Solana User Account. And, if the asset balance exists already, then the incoming assets are transferred to the existing Associated Token Account that is associated with your Solana account.



