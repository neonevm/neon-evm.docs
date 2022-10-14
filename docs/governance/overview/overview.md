---
title: Overview
---

## Principles and Objectives

To ensure that the Neon DAO works smoothly and is effective at implementing the community's vision, there are a few guiding principles that people engaging with this DAO must follow. These include:

* Respecting the rights of all Neon community members
* Acting in good faith
* Seeking to resolve disputes in a constructive and collaborative manner
* Encouraging a diversity of perspectives
* Promoting openness and transparency

There are also more concrete prohibitions on improper behavior that must be kept in mind, including that:

* Members must not threaten other members.
* No member should improperly influence the vote of another.
* Members agree to hold software developers blameless for unintentional mistakes made by them in the expression of contractual intent, whether or not said mistakes were due to actual or perceived negligence.

In addition, the NEON DAO is transparent and flexibile. All users have access to all relevant information in order to make well-informed decisions, and the governance process is adaptable to the ever-evolving needs of the community.

## Governance on Neon: Organization

Neon is decentralized and its economy fee-based, with NEON tokens being used for governance purposes. Following the same philosophy, the Neon DAO is itself handled by a decentralized protocol with a clear and user-friendly process for proposing and voting for protocol improvements. It is organized as a series of decentralized Assemblies that are each responsible for a different aspect of the decisionmaking process. While each Assembly has different criteria for submitting proposals, eligibility for voting, and the scope of influence its decisions can have, they all follow the same basic formula, which is:

* Eligible users submit a proposal.
* Assembly members discuss, review, and revise the proposal on off-chain platforms.
* The finalized proposal is taken to a simple "Accept"/"Reject" vote, and eligible voters can cast votes (in the form of NEON tokens) for their preferred option, with 1 NEON being equivalent to one vote.
* If the proposal's "Accept" votes pass a certain threshold, the proposal is passed and is ready for implementation. Otherwise, the proposal fails.

As mentioned, the decentralized aspect of Neon governance is only for the voting - the proposal discussion and review stage, on the other hand, must take place on another platform. 

For more details on Neon's Assemblies and the differences and interactions between them, see the [NEON Assemblies section](/docs/governance/neon_daos/).

## Submitting and Evaluating Proposals

Any Neon user can submit an idea for potential implementation by the DAO, which is called a **proposal**. Each proposal is included in the list of promising solutions (use cases) and discussed on the DAO forum. After a proposal is submitted, it goes through a formal life cycle of technical reviews, research, and discussions. The discussion stage allows management to exclude the implementation of inefficient or risky solutions in Neon.

Proposals can affect both the management and technical processes of Neon. If this is a proposal to change the logic of system contracts or to improve the technical capabilities of Neon, this proposal must be tested on either Devnet or Testnet. Proposals for the implementation of new features associated with risk or high labor costs go through the following formal process:

  * Substantiation of the need to implement this proposal, taking into account its labor intensity and relevance.
  * Development of technical specifications for the implementation of this proposal.
  * Appointment of a worker for the implementation of the proposal. The worker may be an individual, a group of individuals, or a third-party company.
  * Verification and decision on acceptance of the work done.

Stakeholders make the final decision to change the logic of system contracts, to implement new functionality associated with risks or high costs, and can also take action against community members whose actions may harm the development of Neon.

Stakeholders make all decisions through voting using the Neon DAO application. Current proposals are displayed on the main page of the *Neon DAO* section, under the "How to Participate" heading.

## Governance on Neon: Technical Implementation

The Neon Assemblies are built using the [SPL Governance program](https://github.com/solana-labs/solana-program-library/tree/master/governance) - a versatile DAO creation tool for the Solana blockchain.

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
Ecosystem Assembly, Treasury Watchdog | Treasury Accounts | Transferring tokens to accounts, including:<br />- Allocating budgets for the Grants Assembly and Bug Bounty Committee<br />- Rewards for community members
Ecosystem Assembly | Transaction Fees | - Changing transaction fees on Neon
Treasury Watchdog | Ecosystem Assembly | - Preventing hostile proposals on the Ecosystem Assembly
Development Assembly, EVM Emergency Assembly | EVM Maintenance contract | - Approving EVM version upgrades<br />- Upgrading EVM to approved versions<br />- Adding/removing Emergency Engineers<br />- Revoking upgrade authority from the "EVM Maintenance" contract
EVM Emergency Assembly | Development Assembly | - Preventing hostile proposals on the Development Assembly
Grants Assembly | Grants accounts | - Transfering tokens for grant initiatives to an escrow account<br />- Distributing tokens from escrow accounts to grantees<br />Pay from bug bounty account to a bug bounty hunter and Immunefi (for fees)
All Assemblies | Governance | - Updating the Assembly's own Governance contract<br />- Changing its own voting parameters
