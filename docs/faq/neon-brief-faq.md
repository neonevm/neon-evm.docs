---
title: FAQ
proofedDate: 20230919
iterationBy: na
includedInSite: true
approvedBy: na
comments: todo Roadmap links to Neon Labs page -- should this be updated to EVM site (issue is that roadmap there is on landing page and has no unique URL to link user to). todo? core dev Anton has asked for BPF to be removed from articles in the past -- what is the status on this?
---

This page answers frequently asked questions (FAQs).

## Technology

### What is Neon EVM?

Neon EVM is an Ethereum Virtual Machine operating as a smart contract on Solana. It gives developers the power to directly deploy Ethereum dApps with minimal code reconfiguration while benefiting from Solana's technical advantages. Neon EVM is built with security, decentralization, and sustainability in mind.

### How does Neon EVM Work?

Neon EVM is a smart contract on Solana acting as the Ethereum Virtual Machine. It's compiled into Berkeley Packet Filter bytecode, a format that can be executed on Solana. This allows Neon EVM to receive Solana transactions that contain wrapped Ethereum-like transactions and process them on Solana according to Ethereum rules. Get more details [here](https://docs.neonfoundation.io/docs/about/how_it_works).

### How can I start building on Neon?

To begin building on Neon, follow our [Quick Start Guide](/docs/quick_start). Porting and deploying your existing EVM contracts onto Neon using Truffle, Remix, or Hardhat is a seamless process.

### Why is Neon good for Ethereum dApps?

As a smart contract on Solana, Neon EVM benefits from Solana’s low gas fees (no less than 0.000015 SOL per transaction) and high throughput (+2,000 TPS). This arguably makes it the cheapest and most efficient way to run Ethereum dApps.

Neon EVM doesn't require any significant changes to run existing Ethereum smart contracts, with all the advantages and innovations of Solana. In addition, the Neon EVM provides access to many familiar Ethereum developer tools, including MetaMask, Remix, Hardhat, Truffle, and Brownie. Neon is the perfect platform for Ethereum dApps to tap into the Solana ecosystem.

### What makes Neon EVM so special?

Neon EVM is unique in combining the powerful technical advantages of Solana with the vibrant development community and expertise of Ethereum. In general, it's much easier to port over existing EVM smart contract code than to build natively on Solana from scratch.

### What Neon-native tools are currently available?

The following tools are available on Neon:
* [NeonScan](https://neonscan.org/): Neon EVM’s block explorer
* NeonPass: A tool for transferring tokens between Solana and Neon: available as an [App](https://neonpass.live/) and an [npm package](/docs/developing/integrate/neon_transfer)
* [Neon Faucet](https://neonfaucet.org/): Provides NEON tokens on Devnet for testing purposes

### How do I transfer SPL tokens between Solana and Neon?

[NeonPass](/docs/token_transferring/neonpass_usage) is an open-source service that facilitates token transfers between Solana and Neon EVM, including the NEON SPL token. To use NeonPass, you must have access to two wallets: a Solana wallet, such as [Phantom](https://phantom.app/), and an EVM wallet, such as [MetaMask](https://metamask.io/).

### What is Neon's roadmap?

You can view our roadmap on our [Home Page](https://neon-labs.org/).

## Community

### How can I join the Neon community?

Neon has an active community: check out our [community page](https://neonevm.org/community) and join any platform that interests you.

### Where can I see a list of projects in the ecosystem?

You can see the list of projects building on Neon [here](https://docs.neonfoundation.io/docs/about/neon_ecosystem).

### Where can I see a list of upcoming events involving Neon?

Upcoming events in the Neon community are listed on our [events page](https://neonevm.org/events). 

<!-- You can also sign up for Neon’s newsletter to stay in the loop. If an in-person Neon event is happening near you, why not come and say hello? -->

## What next?

If you still have a question about the Neon EVM that isn't answered in the following FAQ pages, please join us on our [Discord server](https://discord.gg/neonevm). Our AI support channel, `#ai-support`, will answer your questions day or night. If the AI is not smart enough, don't worry; our support team will be glad to help you.

> Discord [invite link](https://discord.com/invite/ApZRBDqYcN)