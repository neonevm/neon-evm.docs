---
title: Technical Implementation
---

The Neon DAO's Assemblies are built using the [SPL Governance program](https://github.com/solana-labs/solana-program-library/tree/master/governance) - a versatile DAO creation tool for the Solana blockchain.

This program allows for the customization of the following parameters:

* Pass threshold to accept a proposal
* Voting period
* Hold up period - the minimum time before executing an approved proposal
* Vote weight calculation (e.g. percentage of total supply, based on vested tokens)
* Whether to allow voting using a portion of vested tokens