---
title: Neon DAOs
---

Neon's governance model is based on an interplay and synergy of several Decentralized Autonomous Organizations (DAOs). In a nutshell, DAOs are member-owned communities that serve as a safe and effective way for like-minded indivuals to constructively work together and engage in collective decision-making. DAOs function by accepting proposals from eligible members, which are put to a vote after a discussion phase. This vote, between Accepting and Rejecting the proposal, is conducted by eligible DAO members submitting an arbitrary amount of NEON tokens toward either option, with each NEON token being worth one vote. If the `Accept` option receives more than the threshold required, the proposal passes; otherwise, it fails.

The Neon governance model consists of the following DAOs:

- [Community DAO](#community-dao)
- [Emergency DAO](#emergency-dao)
- [EVM Maintenance DAO](#evm-maintenance-dao)
- [Grants DAO](#grants-dao)
- [Bug Bounty Committee](#bug-bounty-committee)

![](img/dao_organization.png)

## Community DAO

The Community DAO is the main part of Neon's governance structure. Proposals submitted to this DAO can update the Neon EVM code, mint NEON tokens & delegate minting authority to other parties, and distribute funds from Neon treasury accounts.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 2 days, and the proposal creation threshold is 3*10<sup>3</sup> NEON.

### Usage Scenarios
Most Community DAO proposals can reduced to distributing tokens from one treasury account to another. The following are some examples:
* Allocating tokens for the Grants budget
* Allocating tokens for the Bug Bounty budget
* Rewarding users with tokens, whether proactively or retroactively
* Depositing funds at an interest rate

Like all Neon DAOs, the Community DAO also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## Emergency DAO

The Emergency DAO is meant as a check on the entire DAO system, to make sure no malicious actors attempt to withdraw funds from any treasury accounts by taking advantage of the Community DAO's decentralized nature. The Emergency DAO's main function is to prevent money from being maliciously withdrawn from treasury accounts normally controlled by the Community DAO. An Emergency DAO proposal to prevent such a withdrawal must be undertaken before or during the hold up period of the malicious Community DAO proposal, which is 1 day.

For this DAO, the pass threshold is 9%, proposals have a voting period of 1 day and a hold up period of 0 days, and the proposal creation threshold is 1*10<sup>6</sup> NEON.

### Usage Scenarios
Like all Neon DAOs, the Emergency DAO also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## EVM Maintenance DAO

The EVM Maintenance DAO is responsible for preventing money from being maliciously withdrawn from dApps on Neon. It can accomplish this by stopping the Neon EVM via emergency mode or moving it to maintenance mode in order to prevent the transfers from going through. Maintenance mode is when the EVM finalizes transactions that have started, but declines any new transactions, whereas emergency mode is when all transactions are declined. However, unlike the Community DAO, the EVM Maintenance DAO cannot change the source code of the Neon EVM. Instead, it loads a precompiled version of the EVM when switching modes.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 0 days, and the proposal creation threshold is 2*10<sup>5</sup> NEON.

### Usage Scenarios
The EVM Maintenance DAO allows for proposals dealing with the following:
* Approval of new EVM versions for any of the three modes (normal, maintenance, emergency). This allows the DAO to later upgrade the EVM using these versions.
* Upgrading the EVM for approved EVM versions.
* Adding or removing 'Emergency Engineer' multisig private keys, allowing them to upgrade the EVM (to already approved EVM versions) without the DAO's approval.
* Revoking upgrade authority from the “EVM Maintenance” smart contract.
* Updating the “EVM Maintenance” smart contract.


A typical scenario, updating the EVM version, would have the proponent proceed as follows:
1. Load the new EVM version byte code to Solana buffer.
2. Create a proposal to approve this version of the EVM.
3. The proposal is voted on and, if approved, leads to the addition of the new EVM version to the 'approved' list.
4. Create a proposal to upgrade the EVM for the relevant mode to this new version.
5. The proposal is voted on and, if approved, leads to the upgrade of the EVM to the new version.

Like all Neon DAOs, the EVM Maintenance DAO also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## Grants DAO

The Grants DAO controls the Grants Treasury, which is used to distribute grants and rewards for a variety of community initiatives. These funds are deposited in an escrow account and subsequently released to the relevant grantees.

This DAO works closely with the Bug Bounty Committee, in that it enables the distribution of rewards to white-hat hackers who found vulnerabilities in the Neon EVM, as determined by the members of the Bug Bounty Committee. This Bug Bounty Committee has its own budget which is separate from the Grants Treasury.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 2 days, and the proposal creation threshold is 2*10<sup>3</sup> NEON.

### Usage Scenarios
Most usage scenarios of the Grants DAO involve a prospective grantee petitioning for funds, according to the following steps:
1. The grantee creates a proposal for the DAO to:
    1. Sign an offer, with a link to the offer included in the proposal,
    2. Create Escrow accounts, and
    3. Transfer tokens from Treasury accounts to the Escrow accounts.
2. The DAO's Grants Manager adds information about the Escrow accounts to the Initiative Board.
3. The grantee now creates a proposal to get money from Escrow for work they did or for achieving some milestone.
4. Alternatively, the Grants Manager can create a proposal to revert money from the Escrow Account back to the Budget if the Grantee isn’t able to finish their work.

Like all Neon DAOs, the Grants DAO also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## Bug Bounty Committee

The Bug Bounty Committee, while not strictly a DAO, is a critical component of Neon's governance structure. This committee, the members of which are limited to people invited by the Neon team, vote on the distribution of funds from the Bug Bounty Budget to deserving hackers who discover vulnerabilities in the Neon EVM. The funds themselves are released by the Grants DAO.

