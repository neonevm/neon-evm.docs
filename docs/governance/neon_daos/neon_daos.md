---
title: Neon DAO Assemblies
---

The Neon DAO model is based on the interplay and synergy of several decentralized Assemblies. In a nutshell, Assemblies are member-owned communities that serve as a safe and effective way for like-minded indivuals to constructively work together and engage in collective decision-making. Assemblies function by accepting proposals from eligible members, which are put to a vote after a discussion phase. This vote, between Accepting and Rejecting the proposal, is conducted by eligible Assembly members submitting an arbitrary amount of NEON tokens toward either option, with each NEON token being worth one vote. If the `Accept` option receives more than the threshold required, the proposal passes; otherwise, it fails.

The Neon DAO consists of the following Assemblies:

- [Ecosystem Assembly](#ecosystem-assembly)
- [Treasury Watchdog](#treasury-watchdog)
- [Development Assembly](#development-assembly)
- [EVM Emergency Assembly](#evm-emergency-assembly)
- [Grants Assembly](#grants-assembly)
- [Bug Bounty Committee](#bug-bounty-committee)

![](img/dao_organization.png)

## Ecosystem Assembly

The Ecosystem Assembly is the main part of the Neon DAO. Proposals submitted to this Assembly can distribute funds to and from Neon treasury accounts, user accounts, and escrow funds. It uses this power to incentivize Neon ecosystem projects.

### Usage Scenarios
Most Ecosystem Assembly proposals can reduced to distributing tokens from one treasury account to another. The following are some examples:
* Allocating tokens for the Grants budget
* Allocating tokens for the Bug Bounty budget
* Rewarding users with tokens, whether proactively or retroactively
* Depositing funds at an interest rate

Like all Neon DAO Assemblies, the Ecosystem Assembly also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## Treasury Watchdog

The Treasury Watchdog is meant as a check on the Ecosystem Assembly, to make sure no malicious actors attempt to withdraw funds from any treasury accounts by taking advantage of the Ecosystem Assembly's decentralized nature. The Treasury Watchdog's main function is to prevent money from being maliciously withdrawn from treasury accounts normally controlled by the Ecosystem Assembly. A Treasury Watchdog proposal to prevent such a withdrawal must be undertaken before or during the hold up period of the malicious Ecosystem Assembly proposal.

### Usage Scenarios
Like all Neon DAO Assemblies, the Treasury Watchdog also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## Development Assembly

The Development Assembly is responsible for overseeing upgrades to the Neon EVM, as well as for preventing money from being maliciously withdrawn from dApps on Neon. When upgrading the Neon EVM, Development Assembly cannot change the source code. Instead, it loads an approved precompiled version of the EVM. It can also add and remove precompiled Neon EVM versions from its approved version list. The Development Assembly also has the power to appoint Emergency Engineers that have the power to upgrade the EVM to an approved version without the Assembly's approval.

To prevent malicious withdrawals, the Development Assembly can either stop the Neon EVM via emergency mode or move it to maintenance mode in order to prevent the transfers from going through. Maintenance mode is when the EVM finalizes transactions that have started, but declines any new transactions, whereas emergency mode is when all transactions are declined.

### Usage Scenarios
The Development Assembly allows for proposals dealing with the following:
* Approval of new EVM versions for any of the three modes (normal, maintenance, emergency). This allows the Assembly to later upgrade the EVM using these versions.
* Upgrading the EVM for approved EVM versions.
* Adding or removing Emergency Engineer multisig private keys, allowing them to upgrade the EVM (to already approved EVM versions) without the Assembly's approval.
* Revoking upgrade authority from the “EVM Maintenance” smart contract.
* Updating the “EVM Maintenance” smart contract.


A typical scenario, updating the EVM version, would have the proponent proceed as follows:
1. Load the new EVM version byte code to the Solana buffer.
2. Create a proposal to approve this version of the EVM.
3. The proposal is voted on and, if approved, leads to the addition of the new EVM version to the 'approved' list.
4. Create a proposal to upgrade the EVM for the relevant mode to this new version.
5. The proposal is voted on and, if approved, leads to the upgrade of the EVM to the new version.

Like all Neon DAO Assemblies, the Development Assembly also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## EVM Emergency Assembly
The EVM Emergency Assembly is meant as a check on the Development Assembly, to make sure no malicious actors attempt to submit a malicious upgrade to the Neon EVM by taking advantage of the Development Assembly's decentralized nature. The EVM Emergency Assembly's main function is to prevent the Neon EVM being upgraded with malicious code. An EVM Emergency Assembly proposal to prevent such a withdrawal must be undertaken before or during the hold up period of the malicious Development Assembly proposal.

### Usage Scenarios
Like all Neon DAO Assemblies, the EVM Emergency Assembly also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## Grants Assembly

The Grants Assembly controls the Grants Treasury, which is used to distribute grants and rewards for a variety of community initiatives. These funds are deposited in an escrow account and subsequently released to the relevant grantees.

This Assembly works closely with the Bug Bounty Committee, in that it enables the distribution of rewards to white-hat hackers who found vulnerabilities in the Neon EVM, as determined by the members of the Bug Bounty Committee. This Bug Bounty Committee has its own budget which is separate from the Grants Treasury.

### Usage Scenarios
Most usage scenarios of the Grants Assembly involve a prospective grantee petitioning for funds, according to the following steps:
1. The grantee creates a proposal for the Assembly to:
    1. Sign an offer, with a link to the offer included in the proposal,
    2. Create Escrow accounts, and
    3. Transfer tokens from Treasury accounts to the Escrow accounts.
2. The Assembly's Grants Manager adds information about the Escrow accounts to the Initiative Board.
3. The grantee now creates a proposal to get money from Escrow for work they did or for achieving some milestone.
4. Alternatively, the Grants Manager can create a proposal to revert money from the Escrow Account back to the Budget if the Grantee isn’t able to finish their work.

Like all Neon DAO Assemblies, the Grants Assembly also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

## Bug Bounty Committee

The Bug Bounty Committee, while not strictly a decentralized Assembly, is a critical component of Neon's governance structure. This committee, the members of which are limited to people invited by the Neon team, vote on the distribution of funds from the Bug Bounty Budget to deserving hackers who discover vulnerabilities in the Neon EVM. The funds themselves are released by the Grants Assembly.

