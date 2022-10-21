---
title: Overview
---

## Quick Links


* [Choosing an Assembly](/docs/governance/neon_daos/#focus-areas-overview)
  * [Ecosystem Focus Area](/docs/governance/neon_daos/#ecosystem-focus-area)
  * [Development Focus Area](/docs/governance/neon_daos/#development-focus-area)
  * [Security Focus Area](/docs/governance/neon_daos/#security-focus-area)
* [Discussing Ideas](/docs/governance/proposals/#dao-forum)
* [Creating a Proposal](/docs/governance/proposals/#creating-a-proposal)
* [Voting](/docs/governance/proposals/#voting)
* Use Cases
  * [Transfer Money](/docs/governance/neon_daos/#usage-scenarios)
  * [Update EVM](/docs/governance/neon_daos/#usage-scenarios-1)


## The Neon DAO

The Neon DAO is the name given to Neon's community governance structure. It is a collection of organizations that allow Neon community stakeholders to:
  * Reach consensus on solving issues that cannot be fully covered by software algorithms
  * Develop rules for the functioning of the Neon DAO, and record and store these rules on the blockchain
  * Change the governance rules themselves through contractual amendments

As the body that represents the Neon community's decisions on key issues, its conclusions are binding on the Neon team, which promptly implements the desired changes.

## Neon DAO Organization

Neon is decentralized and its economy is fee-based, with NEON tokens being used for governance purposes. Following the same philosophy, the Neon DAO is itself handled by a decentralized protocol with a clear and user-friendly process for proposing and voting for protocol improvements. It is organized as a series of decentralized Assemblies that are each responsible for a different aspect of the decisionmaking process. These Assemblies are grouped into the following three Focus Areas:

### Ecosystem Focus Area

The [Ecosystem Focus Area](/docs/governance/neon_daos/#ecosystem-focus-area) contains the Assemblies responsible for the promotion of Neon community initiatives and incentivizing long-term ecosystem growth. The use cases involving this Focus Area include [rewarding users and teams for creating Neon ecosystem projects](/docs/governance/neon_daos/#usage-scenarios).

### Development Focus Area

The [Development Focus Area](/docs/governance/neon_daos/#development-focus-area) contains the Assembly responsible for the technical aspects of the Neon EVM. An example of a use case involving this Focus Area is [updating the Neon EVM version](/docs/governance/neon_daos/#usage-scenarios-1).

### Security Focus Area

The [Security Focus Area](/docs/governance/neon_daos/#security-focus-area) contains the Assemblies responsible for monitoring activity in the other two Focus Areas to stop malicious actors attempting to exploit the Neon DAO. A use case example involving this Focus Area is [preventing the Neon EVM being updated with malicious code](/docs/governance/proposals/#preventing-evm-being-updated-with-malicious-code).

For more details on Neon's Assemblies and the differences and interactions between them, see the [NEON Assemblies section](/docs/governance/neon_daos/).

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
