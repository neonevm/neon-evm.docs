---
title: DAO Overview
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: Merged and updated based on initial Docusaurus pages and meeting notes
---

## The Neon DAO

The Neon DAO is a community-led, community-driven organization that fosters and enhances decentralization, resilience, and self-sustainability for the Neon EVM platform and ecosystem. The DAO is primarily focused on the Strategic DAO, which manages funds and voting contracts with different thresholds for each.

The Neon DAO's Assemblies are built using [SPL Governance](https://github.com/solana-labs/solana-program-library/tree/master/governance), a versatile DAO creation tool for the Solana blockchain.

## Voting Process Overview

1. DAO participants bring their ideas to the community via the Neon Forum on Discord. These ideas are discussed and evaluated by the community to gauge whether there is enough will and consensus to effect the changes and kick off the next stage. This stage is considered an example of **off-chain** governance.
2. If there is enough support, a DAO participant creates an official proposal on the Neon DAO. The idea now enters on-chain governance territory, and the components for it are implemented on Solana.  
3. Once the proposal has been made, DAO participants may temporarily lock up their NEON tokens and receive their respective voting rights to vote on the proposal. DAO participants vote on this proposal during a pre-defined voting period. Voting works as follows:
   * 1 NEON token = 1 vote
   * A proposal is accepted if
     1. The number of **"Accept"** votes exceeds a pre-determined threshold amount, and
     2. The number of **"Accept"** votes exceeds the number of **"Reject"** votes
   * Otherwise, the proposal is rejected
4. Any DAO member can execute an approved proposal after the **hold-up period** has passed.

All Neon DAO parameters, such as the pass threshold to accept a proposal, voting period, hold-up period, and the minimum token amount required to create a proposal, can be found on the Neon Governance UI.

Learn more about the [voting process](/docs/governance/proposals.md).

## Strategic DAO

The Strategic DAO is responsible for managing funds and voting contracts within the Neon DAO. It plays a crucial role in the governance and decision-making processes of the platform.

### Responsibilities
- Overseeing the distribution of funds for grants, security audits, bug bounties, and other ecosystem initiatives
- Setting and adjusting voting thresholds for various types of proposals
- Ensuring the secure and effective management of the Neon Treasury
- Promoting the sustainable, long-term growth of the Neon ecosystem

### Audit Information

The Neon DAO undergoes regular audits to ensure the security and integrity of its governance processes and smart contracts. Audit reports are made available to the community for transparency and to build trust in the platform.

The vesting contract was audited by the next teams:

* [Halborn at April 17th, 2022](https://github.com/neonlabsorg/neon-spl-governance/blob/main/audit/20220513-Halborn-Governance.pdf)
* [Ackee Blockchain at Jule 22th, 2022](https://github.com/neonlabsorg/neon-spl-governance/blob/main/audit/20220906-AckeeBlockchain.pdf)
* [Neodyme at June 7th, 2023](https://github.com/neonlabsorg/neon-spl-governance/blob/main/audit/20230607-Neodyme.pdf)

## Get Involved

To start working with the Neon DAO, follow these steps:

1. Join the Neon community on Discord and participate in discussions related to governance and ecosystem development.
2. Familiarize yourself with the Neon DAO's governance structure, voting process, and the responsibilities of the Strategic DAO.
3. Acquire NEON tokens to gain voting rights and actively participate in the decision-making process.
4. Stay informed about ongoing proposals, vote on them, and contribute to the growth and success of the Neon ecosystem.

The Neon DAO welcomes active participation from the community and encourages everyone to get involved in shaping the future of the platform.