---
title: Command Line Flags
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

## Introduction
When spinning up your own Neon proxy, there are some flags that can be used. This guide covers some of the most common flags and show you how they work with the configuration file.

## Command Line Flags

* `-f` - Variables file
* `-i` - Initialize setup 
* `-r` - Read-only mode. This means that no operator keys are required
* `-S` - `SOLANA_URL`
* `-s` - `PP_SOLANA_URL`
* `-e` - Set environment (`"devnet"`, `"testnet"`, or `"mainnet"`)
* `-p` - Set postgres admin password (can be used only with the `-i` flag)
* `-v` - Set vault root token (experimental)
* `-m` - Use this option to set migrations
* `-k` - Set keys directory
* `-y` - Assume "yes" as answer, run non-interactively