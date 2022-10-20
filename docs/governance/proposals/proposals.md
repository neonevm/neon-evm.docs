---
title: Discussions and Proposals
---

## Introduction

Any Neon user can submit an idea for potential implementation by the Neon DAO, which is called a **proposal**. Each proposal is included in the list of promising solutions (use cases) and discussed on the DAO forum. After a proposal is submitted, it goes through a formal life cycle of technical reviews, research, and discussions. The discussion stage allows management to exclude the implementation of inefficient or risky solutions in Neon. After the discussion stage, proposals are put to a vote by the Assembly. Proposals that are approved according to the rules of their Assembly are then automatically implemented by Neon.

Current proposals are displayed on the main page of the *Neon DAO* section, under the "How to Participate" heading.

## DAO Forum

The DAO Forum is a place where Neon developers and third-party teams can discuss and debate ideas and express and articulate their opinions on proposals. This forum is a vital part of the Neon DAO, because it provides transparency and accountability, fosters constructive discourse, and helps ensure the decentralization of the project. 

Proposals can affect both the management and technical processes of Neon. If this is a proposal to change the logic of system contracts or to improve the technical capabilities of Neon, this proposal must be tested on either Devnet or Testnet. Proposals for the implementation of new features associated with risk or high labor costs go through the following formal process:

  * Substantiation of the need to implement this proposal, taking into account its labor intensity and relevance.
  * Development of technical specifications for the implementation of this proposal.
  * Appointment of a worker for the implementation of the proposal. The worker may be an individual, a group of individuals, or a third-party company.
  * Verification and decision on acceptance of the work done.

All these details are discussed, revised, and debated civilly on the DAO Forum.

### Rules and Etiquette

The DAO Forum is not the place for general discussions, advertising, off-topic conversations, or political discussions. The following are some basic rules that people posting on the DAO Forum are expected to follow.

1. All users have an equal say. No single user or group of users can have undue influence over the governance process.

2. Decisions are made based on consensus. All users have a say in the decision-making process, and decisions are only made when there is broad agreement among the community.

3. Transparency is key. All users must have access to all relevant information in order to make informed decisions. The governance process must be open and transparent to all.

4. Decentralized governance is flexible. The governance process should be flexible and adaptable to the ever-changing needs of the community.

5. Users are accountable for their actions. All users must be held accountable for their actions and decisions within the governance process. There must be mechanisms in place to ensure that users act in the best interests of the community.


## Voting

Once a proposal has reached its final form after discussions on the DAO Forum, it is ready to be put to a vote. The community of eligible voters in the relevant Assembly is then invited to cast their votes to either "Accept" or "Reject" this proposal. This is done by submitting NEON tokens to the desired option, with each NEON token being worth one vote.

Once the voting period is concluded, the votes are automatically counted. If the proposal's "Accept" votes pass the Assembly's required vote threshold, the proposal is passed and is ready for implementation. Otherwise, the proposal fails.

## Measures Against Abuse and Misuse

Like any governance system, the Neon DAO faces the risk of malicious actors being involved, which could jeopardize the Neon ecosystem as well as treasury or user funds if their subversive proposals are erronously passed. To reduce this risk, the Neon DAO has implemented defensive measures in three key areas, corresponding to stages along the process of a proposal becoming implemented. These areas are:

* Limiting the number of proposals
* Detecting malicious proposals
* Cancelling malicious proposals

### Limiting the Number of Proposals
Malicious actors have an easier time pushing through one of their proposals if they can submit as many proposals as they like. To prevent this, the Neon DAO's Assemblies have protections in place to limit the number of proposals an Assembly can accept from a given user. These measures include:

* SPL Governance's built-in limit of 10 active proposals per account
* A minimum amount of locked tokens necessary for a user to create a proposal (each Assembly has different requirements)
* Some Assemblies require a higher locked token threshold for creating proposals than for updating the Neon EVM

Beside preventing the proliferation of malicious proposals, these measures also reduce spam, making the governance system easier to use and more efficient.

### Detecting Malicious Proposals
All proposals to Neon DAO Assemblies are closely monitored by the Neon team, but this monitoring has its limits. We therefore also have a script in place to alert us if any proposal involves the address of a sensitive item, such as the EVM, a treasury account, an escrow account, or a user account. We also require all major proposals to add the Neon team as a signatory, which will make the team's approval necessary before the proposal goes to a vote.

### Cancelling Malicious Proposals
Once a malicious proposal is detected, usually on the Ecosystem Assembly, it must be stopped as soon as possible. This is accomplished by the Treasury Watchdog, which can cancel malicious proposals, withdraw money from compromised treasury accounts, or redelegate NEON mint authority within the holdup period of the malicious Ecosystem Assembly proposal.

## Emergency Scenarios
There are three main categories of "emergency scenarios" that could occur involving a Neon DAO Assembly, and each is dealt with in a unique way. These scenarios are the following:

### Stopping the EVM
In most cases involving a malicious transaction, the transaction can be prevented by stopping the EVM. This can be accomplished in one of two ways.

1. Via a proposal in the Development Assembly. This proposal must go through the standard proposal creation, voting, and acceptance process.
2. Via the Emergency Engineer multisig. These engineers, specially selected beforehand by the Development Assembly, are ready to spring into action and stop or update the EVM in an emergency scenario, especially when a proposal in the Assembly would take too long.

### Preventing Money Being Stolen from Treasury Accounts
This process, also known as "forking governance", is accomplished by abandoning the existing Ecosystem Assembly, now presumed to be compromised, and migrating the governance, treasury funds, and minting authority to a new set of Assemblies. This is accomplished by the following process:

1. Transfer tokens from the Ecosystem Assembly Treasury to the Treasury Watchdog, or delegate authority over the Ecosystem Assembly tokens to the Treasury Watchdog. This is accomplished via the standard proposal acceptance process on the Ecosystem Assembly.
2. Create a new Treasury Watchdog
3. Create a proposal to give the old Treasury Watchdog power over everything the old Ecosystem Assembly did.
4. Create a proposal to give the new Treasury Watchdog power over everything the old Treasury Watchdog did.

### Preventing EVM Being Updated with Malicious Code
This process is, like the scenario above, known as "forking governance", and is accomplished by abandoning the existing Development Assembly, now presumed to be compromised, and migrating the governance, treasury funds, and minting authority to a new set of Assemblies. This is accomplished by the following process:

1. Transfer tokens from the Development Assembly Treasury to the EVM Emergency Assembly, or delegate authority over the Ecosystem Assembly tokens to the EVM Emergency Assembly. This is accomplished via the standard proposal acceptance process on the Ecosystem Assembly.
2. Create a new EVM Emergency Assembly
3. Create a proposal to give the old EVM Emergency Assembly power over everything the old Development Assembly did.
4. Create a proposal to give the new EVM Emergency Assembly power over everything the old EVM Emergency Assembly did.
