---
title: Getting Involved
---

## Introduction

Proposals on the Neon DAO are the way by which regular Assembly members can submit their own ideas for potential implementation by the Assembly the proposal is submitted to. Proposals are first discussed on the DAO forum, and then put to a vote by the Assembly. Proposals that are approved according to the rules of their Assembly are then automatically implemented by Neon.

## User Scenarios

### Measures Against Abuse and Misuse

Like any governance system, the Neon DAO faces the risk of malicious actors being involved, which could jeopardize the Neon ecosystem as well as treasury or user funds if their subversive proposals are erronously passed. To reduce this risk, the Neon DAO has implemented defensive measures in three key areas, corresponding to stages along the process of a proposal becoming implemented. These areas are:

* Limiting the number of proposals
* Detecting malicious proposals
* Cancelling malicious proposals

#### Limiting the Number of Proposals
Malicious actors have an easier time pushing through one of their proposals if they can submit as many proposals as they like. To prevent this, the Neon DAO's Assemblies have protections in place to limit the number of proposals an Assembly can accept from a given user. These measures include:

* SPL Governance's built-in limit of 10 active proposals per account
* A minimum amount of locked tokens necessary for a user to create a proposal (each Assembly has different requirements)
* Some Assemblies require a higher locked token threshold for creating proposals than for updating the Neon EVM

Beside preventing the proliferation of malicious proposals, these measures also reduce spam, making the governance system easier to use and more efficient.

#### Detecting Malicious Proposals
All proposals to Neon DAO Assemblies are closely monitored by the Neon team, but this monitoring has its limits. We therefore also have a script in place to alert us if any proposal involves the address of a sensitive item, such as the EVM, a treasury account, an escrow account, or a user account. We also require all major proposals to add the Neon team as a signatory, which will make the team's approval necessary before the proposal goes to a vote.

#### Cancelling Malicious Proposals
Once a malicious proposal is detected, usually on the Ecosystem Assembly, it must be stopped as soon as possible. This is accomplished by the Treasury Watchdog, which can cancel malicious proposals, withdraw money from compromised treasury accounts, or redelegate NEON mint authority within the holdup period of the malicious Ecosystem Assembly proposal.

### Emergency Scenarios
There are three main categories of "emergency scenarios" that could occur involving a Neon DAO Assembly, and each is dealt with in a unique way. These scenarios are the following:

#### Stopping the EVM
In most cases involving a malicious transaction, the transaction can be prevented by stopping the EVM. This can be accomplished in one of two ways.

1. Via a proposal in the Development Assembly. This proposal must go through the standard proposal creation, voting, and acceptance process.
2. Via the Emergency Engineer multisig. These engineers, specially selected beforehand by the Development Assembly, are ready to spring into action and stop or update the EVM in an emergency scenario, especially when a proposal in the Assembly would take too long.

#### Preventing Money Being Stolen from Treasury Accounts
This process, also known as "forking governance", is accomplished by abandoning the existing Ecosystem Assembly, now presumed to be compromised, and migrating the governance, treasury funds, and minting authority to a new set of Assemblies. This is accomplished by the following process:

1. Transfer tokens from the Ecosystem Assembly Treasury to the Treasury Watchdog, or delegate authority over the Ecosystem Assembly tokens to the Treasury Watchdog. This is accomplished via the standard proposal acceptance process on the Ecosystem Assembly.
2. Create a new Treasury Watchdog
3. Create a proposal to give the old Treasury Watchdog power over everything the old Ecosystem Assembly did.
4. Create a proposal to give the new Treasury Watchdog power over everything the old Treasury Watchdog did.

#### Preventing EVM Being Updated with Malicious Code
This process is, like the scenario above, known as "forking governance", and is accomplished by abandoning the existing Development Assembly, now presumed to be compromised, and migrating the governance, treasury funds, and minting authority to a new set of Assemblies. This is accomplished by the following process:

1. Transfer tokens from the Development Assembly Treasury to the EVM Emergency Assembly, or delegate authority over the Ecosystem Assembly tokens to the EVM Emergency Assembly. This is accomplished via the standard proposal acceptance process on the Ecosystem Assembly.
2. Create a new EVM Emergency Assembly
3. Create a proposal to give the old EVM Emergency Assembly power over everything the old Development Assembly did.
4. Create a proposal to give the new EVM Emergency Assembly power over everything the old EVM Emergency Assembly did.
