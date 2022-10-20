---
title: Overview
---

## The Neon DAO

The Neon DAO is the name given to Neon's community governance structure. It is a collection of organizations that allow Neon community stakeholders to:
  * Reach consensus on solving issues that cannot be fully covered by software algorithms
  * Develop rules for the functioning of the Neon DAO, and record and store these rules on the blockchain
  * Change the governance rules themselves through contractual amendments

As the body that represents the Neon community's decisions on key issues, its conclusions are binding on the Neon team, which promptly implements the desired changes.

## Neon DAO Organization

Neon is decentralized and its economy is fee-based, with NEON tokens being used for governance purposes. Following the same philosophy, the Neon DAO is itself handled by a decentralized protocol with a clear and user-friendly process for proposing and voting for protocol improvements. It is organized as a series of decentralized Assemblies that are each responsible for a different aspect of the decisionmaking process. These Assemblies are grouped into the following three Departments:

### Ecosystem Department

The [Ecosystem Department](/docs/governance/neon_daos/#ecosystem-department) contains the Assemblies responsible for the promotion of Neon community initiatives and incentivizing long-term ecosystem growth. The use cases involving this Department include [rewarding users and teams for creating Neon ecosystem projects](/docs/governance/neon_daos/#usage-scenarios).

### Development Department

The [Development Department](/docs/governance/neon_daos/#development-department) contains the Assembly responsible for the technical aspects of the Neon EVM. An example of a use case involving this Department is [updating the Neon EVM version](/docs/governance/neon_daos/#usage-scenarios-1).

### Security Department

The [Security Department](/docs/governance/neon_daos/#security-department) contains the Assemblies responsible for monitoring activity in the other two Departments to stop malicious actors attempting to exploit the Neon DAO. A use case example involving this Department is [preventing the Neon EVM being updated with malicious code](/docs/governance/proposals/#preventing-evm-being-updated-with-malicious-code).

For more details on Neon's Assemblies and the differences and interactions between them, see the [NEON Assemblies section](/docs/governance/neon_daos/).

## Governance on Neon: Technical Implementation

The Neon DAO's Assemblies are built using the [SPL Governance program](https://github.com/solana-labs/solana-program-library/tree/master/governance) - a versatile DAO creation tool for the Solana blockchain.

This program allows for the customization of the following parameters:

* Pass threshold to accept a proposal
* Voting period
* Hold up period - the minimum time before executing an approved proposal
* Vote weight calculation (e.g. percentage of total supply, based on vested tokens)
* Whether to allow voting using a portion of vested tokens

## Quick Reference / Cheat Sheet
Below is a table of different proposal types that can be submitted to different Assemblies, and what they affect:

Assembly Name | Object of Proposal | Proposal Type
:-|:-|:-
Ecosystem Assembly | Treasury Accounts | Transferring tokens to accounts, including:<br />- Allocating budgets for the Grants Assembly and Bug Bounty Committee<br />- Rewards for community members
Ecosystem Foundation | Transaction Fees | - Changing transaction fees on Neon version upgrades<br />- Upgrading EVM to approved versions<br />- Adding/removing Emergency Engineers<br />- Revoking upgrade authority from the "EVM Maintenance" contract  
Treasury Watchdog | Ecosystem Assembly | - Preventing hostile proposals on the Ecosystem Assembly
Development Assembly | EVM Maintenance contract | - Approving EVM  
EVM Emergency Assembly | Development Assembly | - Preventing hostile proposals on the Development Assembly
All Assemblies | Governance | - Updating the Assembly's own Governance contract<br />- Changing its own voting parameters
