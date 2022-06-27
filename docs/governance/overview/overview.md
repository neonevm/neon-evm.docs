---
title: Overview
---

## Introduction

The goal of Neon's decentralized governance system is to allow the community of token holders to have a say in how the protocol evolves. The governance process includes core developers, application developers, operators, users, and other contributors in order to come to a consensus on solving issues and developing rules for the functioning of governance. The rules can be changed by contractual amendments as decided by the stakeholders.

Neon governance is the process by which community stakeholders:
  * Reach consensus on solving issues that cannot be fully covered by software algorithms.
  * Develop rules for the functioning of governance in accordance with the decisions stakeholders make, and record and store rules within the blockchain.
  * Change the governance rules themselves through contractual amendments.

Since the results depend on Neon stability, a high level of coordination must be ensured when making changes to the management and technical processes to ensure that any changes to Neon are secure and approved by the community. It is also necessary to make the process of resolving issues related to Neon management transparent.

### Principles and Objectives

To ensure that Neon's governance process works smoothly and is effective at implementing the community's vision, there are a few guiding principles that people engaging with this governance process must follow. These include:

* Respecting the rights of all Neon community members
* Acting in good faith
* Seeking to resolve disputes in a constructive and collaborative manner
* Encouraging a diversity of perspectives
* Promoting openness and transparency

There are also more concrete prohibitions on improper behavior that must be kept in mind, including that:

* Members must not threaten other members.
* No member should improperly influence the vote of another.
* Members agree to hold software developers blameless for unintentional mistakes made by them in the expression of contractual intent, whether or not said mistakes were due to actual or perceived negligence.

## Governance on Neon: Organization

The Neon network is decentralized and its is economy fee-based, with NEON tokens being used for governance purposes. Following the same philosophy, Neon's governance framework is itself handled by a decentralized protocol with a clear and user-friendly process for proposing and voting for protocol improvements. It is organized as a series of DAOs (Decentralized Autonomous Organizations) that are each responsible for a different aspect of the decisionmaking process. While each DAO has different criteria for submitting proposals, eligibility for voting, and the scope of influence its decisions can have, they all follow the same basic formula, which is:

* Eligible users submit a proposal.
* DAO members discuss, review, and revise the proposal on off-chain platforms.
* The finalized proposal is taken to a simple "Accept"/"Reject" vote, and eligible voters can cast votes (in the form of NEON tokens) for their preferred option, with 1 NEON being equivalent to one vote.
* If the proposal's "Accept" votes pass a certain threshold, the proposal is passed and is ready for implementation. Otherwise, the proposal fails.

As mentioned, the decentralized aspect of Neon governance is only for the voting - the proposal discussion and review stage, on the other hand, must take place on another platform. 

For more details on Neon's DAOs and the differences and interactions between them, see the [following page](/docs/governance/neon_daos/).

## Submitting and Evaluating Proposals

Any Neon user can submit an idea, which is called a Neon Improvement Proposal. Each proposal is included in the list of promising solutions (use cases) and discussed on a forum. After a proposal is submitted, it goes through a formal life cycle of technical reviews, research, and discussions. The discussion stage allows management to exclude the implementation of inefficient or risky solutions in Neon.

Proposals can affect both the management and technical processes of Neon. If this is a proposal to change the logic of system contracts or to improve the technical capabilities of Neon, this proposal must be tested on either Devnet or Testnet. Proposals for the implementation of new features associated with risk or high labor costs go through the following formal process:

  * Substantiation of the need to implement this proposal, taking into account its labor intensity and relevance.
  * Development of technical specifications for the implementation of this proposal.
  * Appointment of a worker for the implementation of the proposal. The worker may be an individual, a group of individuals, or a third-party company.
  * Verification and decision on acceptance of the work done.

Stakeholders make the final decision to change the logic of system contracts, to implement new functionality associated with risks or high costs, and can also take action against community members whose actions may harm the development of Neon.

Stakeholders make all decisions through voting using the Neon Governance application. The status of current proposals and decisions on them are displayed on the main page of the *Neon Governance* application.

## Governance on Neon: Technical Implementation

The Neon DAOs are built using the [SPL Governance program](https://github.com/solana-labs/solana-program-library/tree/master/governance) - a versatile DAO creation tool for the Solana blockchain.

This program allows for the customisation of the following parameters:

* Pass threshold to accept a proposal
* Voting period
* Hold up period - the minimum time before executing an approved proposal
* Vote weight calculation (e.g. percentage of total supply, based on vested tokens)
* Whether to allow voting using a portion of vested tokens

## Quick Reference / Cheat Sheet

The following is a table with some important properties of the different Neon DAOs:

DAO Name | Pass Threshold | Voting Period | Hold Up Period | Threshold to Create Proposal
:-|:-|:-|:-|:-
Community DAO | 1% | 1 day | 2 days | 0.0003% (~$800)<br /> 3*10<sup>3</sup> NEON
Emergency DAO | 9% | 1 day | 0 days | 0.1% (~$250,000)<br /> 1*10<sup>6</sup> NEON
EVM Maintenance DAO | 1% | 1 day | 0 days | 0.002% (~$5,000)<br /> 2*10<sup>5</sup> NEON
Grants DAO | 1% | 1 day | 2 days | 0.0003% (~$800)<br /> 2*10<sup>3</sup> NEON


Below is a table of different proposal types that can be submitted to different DAOs, and what they affect:

DAO Name | Object of Proposal | Proposal Type
:-|:-|:-
Community DAO, Emergency DAO | NEON SPL Token | - Minting NEON tokens.<br />- Distributing NEON tokens according to the initial token distribution.<br />- Delegating mint authority.
Community DAO, Emergency DAO | Treasury Accounts | Transferring tokens to accounts, including:<br />- Allocating budgets for the Grants DAO and Bug Bounty Committee<br />- Rewards for community members.
EVM Maintenance DAO | EVM Maintenance contract | - Approving EVM version upgrades.<br />- Upgrading EVM to approved versions.<br />- Adding/removing private keys.<br />- Revoking upgrade authority from the "EVM Maintenance" contract<br />- Updating smart contracts.
All DAOs | Governance | - Updating the DAO's own Governance contract.<br />- Changing its own voting parameters.
Emergency DAO | Governance Neon Realm | - Changing Realm parameters.
Emergency DAO | SPL Governance contract | - Upgrading the smart contract.
Emergency DAO | Vesting add-in contract | - Upgrading the smart contract.
Grants DAO | Grants accounts | - Transfering tokens for grant initiative to an escrow account.<br />- Distributing tokens from escrow account to grantee.<br />Pay from bug bounty account to a bug hunter and Immunefi (for fees).
