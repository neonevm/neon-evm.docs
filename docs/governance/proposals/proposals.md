---
title: Proposals
---

## Introduction

Proposals on Neon's DAOs are known as Neon Improvement Proposals (NIPs).

## User Scenarios

### Measures Against Abuse and Misuse

Like any governance system, Neon's governance faces the risk of malicious actors being involved, which could jeopardize the Neon ecosystem as well as treasury or user funds if their subversive proposals are erronously passed. To reduce this risk, Neon's DAOs have implemented defensive measures in three key areas, corresponding to stages along the process of a proposal becoming implemented. These areas are:

* Limiting the number of proposals
* Detecting malicious proposals
* Cancelling malicious proposals

#### Limiting the Number of Proposals
Malicious actors have an easier time pushing through one of their proposals if they can submit as many proposals as they like. To prevent this, Neon's DAOs have protections in place to limit the number of proposals a DAO can accept from a given user. These measures include:

* SPL Governance's built-in limit of 10 active proposals per account
* A minimum amount of locked tokens necessary for a user to create a proposal (each DAO has different requirements)
* Some DAOs require a higher locked token threshold for creating proposals than for updating the Neon EVM

Beside preventing the proliferation of malicious proposals, these measures also reduce spam, making the governance system easier to use and more efficient.

#### Detecting Malicious Proposals
All proposals to Neon DAOs are closely monitored by the Neon team, but this monitoring has its limits. We therefore also have a script in place to alert us if any proposal involves the address of a sensitive item, such as the EVM, a treasury account, an escrow account, or a user account. We also require all major proposals to add the Neon team as a signatory, which will make the team's approval necessary before the proposal goes to a vote.

#### Cancelling Malicious Proposals
Once a malicious proposal is detected, usually on the Community DAO, it must be stopped as soon as possible. This is accomplished by the Emergency DAO, which can cancel malicious proposals, withdraw money from compromised treasury accounts, or redelegate NEON mint authority within the holdup period of the malicious Community DAO proposal (1 day).

### Emergency Scenarios
There are three main categories of "emergency scenarios" that could occur involving a Neon DAO, and each is dealt with in a unique way. These scenarios are the following:

#### Stopping the EVM
In most cases involving a malicious transaction, the transaction can be prevented by stopping the EVM. This can be accomplished in one of two ways.

1. Via a proposal in the EVM Maintenance DAO. This proposal must go through the standard proposal creation, voting, and acceptance process.
2. Via the 'Emergency Engineer' multisig. These engineers, specially selected beforehand by the EVM Maintenance DAO, are ready to spring into action and stop or update the EVM in an emergency scenario, especially when a proposal in the DAO would take too long.

#### Preventing Money Being Stolen from Treasury Accounts
This process, also known as "forking governance", is accomplished by abandoning the existing Community DAO, now presumed to be compromised, and migrating the governance, treasury funds, and minting authority to a new set of DAOs. This is accomplished by the following process:

1. Transfer tokens from the Community DAO Treasury to the Emergency DAO, or delegate authority over the Community DAO tokens to the Emergency DAO. This is accomplished via the standard proposal acceptance process on the Community DAO.
2. Create a new Emergency DAO
3. Create a proposal to give the old Emergency DAO power over everything the old Community DAO did.
4. Create a proposal to give the new Emergency DAO power over everything the old Emergency DAO did.

#### Preventing EVM Being Updated with Malicious Code
This process is, like the scenario above, known as "forking governance", and is accomplished by abandoning the existing EVM Maintenance DAO, now presumed to be compromised, and migrating the governance, treasury funds, and minting authority to a new set of DAOs. This is accomplished by the following process:

1. Transfer tokens from the EVM Maintenance DAO Treasury to the Emergency DAO, or delegate authority over the Community DAO tokens to the Emergency DAO. This is accomplished via the standard proposal acceptance process on the Community DAO.
2. Create a new Emergency DAO
3. Create a proposal to give the old Emergency DAO power over everything the old EVM Maintenance DAO did.
4. Create a proposal to give the new Emergency DAO power over everything the old Emergency DAO did.
