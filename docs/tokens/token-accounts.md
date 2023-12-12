---
title: NeonPass and token accounts
proofedDate: 20230928
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---
import image1 from '@site/static/img/doc-images/neonpass/NeonPass.png';

## TL;DR

NeonPass seamlessly transfers assets between Solana’s Associated Token Accounts and Neon EVM’s ERC-20 token accounts. 

## Overview

This page takes you under the hood of [NeonPass](/docs/token_transferring/neonpass_usage) as an excellent lens to examine how tokens are handled on Solana vs. Neon EVM. 

### How does NeonPass work?

NeonPass isn't a conventional blockchain bridge. When working with ERC-20 assets in Neon EVM, they're not wrapped; instead, they're compatible with Neon EVM thanks to Neon EVM's interface contract and an account storage strategy.

#### Account storage

On Solana, SPL assets are stored within Solana Associated Token Accounts. For an SPL token, i.e. a Solana-native token, to interact with Ethereum-native Neon EVM, the token must be packaged in an ERC-20 interface that's deployed in the Factory contract of Neon EVM. Once packed, such assets are then transferred to Neon EVM ERC-20 token accounts. These token accounts are specialized Solana accounts that are instantiated within the Neon EVM Ecosystem. These are compatible with Solidity dApps and behave like any Ethereum account. 

### Moving SPL tokens between Neon EVM and Solana

This transfer of SPL tokens between account types is a different approach to that provided by blockchain Bridges. Bridges lock the assets on the source blockchain and mint corresponding assets on the target blockchain. NeonPass moves tokens *between* accounts. Move an SPL token into your EVM-based wallet such as MetaMask and, under the hood, the source account is your Solana Associated Token Account, and the target is your Neon EVM ERC-20 Token Account that stores the assets associated with your EVM-based wallet.


<img src={image1} style={{ display: 'block', margin: '10px auto' }} />

This transfer process also works in reverse. Neon EVM assets can be unpackaged into the SPL standard and transferred back to the Associated Solana Token Account. This allows the assets to seamlessly transition between Neon EVM and Solana accounts within Solana’s L1 Blockchain. 


The [NeonPass FAQ](/docs/faq/neonpass) provides further details of how NeonPass functions.
