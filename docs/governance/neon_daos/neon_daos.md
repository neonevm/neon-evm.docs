---
title: Neon DAO Framework
---

The Neon DAO model is based on the interplay and synergy of several decentralized Assemblies. In a nutshell, Assemblies are member-owned communities that serve as a safe and effective way for like-minded indivuals to constructively work together and engage in collective decision-making. Assemblies function by accepting proposals from eligible members, which are put to a vote after a discussion phase. This vote, between Accepting and Rejecting the proposal, is conducted by eligible Assembly members submitting an arbitrary amount of NEON tokens toward either option, with each NEON token being worth one vote. If the `Accept` option receives more than the threshold required, the proposal passes; otherwise, it fails.

![](img/dao_organization.png)

- [Ecosystem](#ecosystem)
  - [Ecosystem Assembly](#ecosystem-assembly)
    - [Usage Scenarios](#usage-scenarios)
  - [Ecosystem Foundation](#ecosystem-foundation)
- [Development](#development)
  - [Development Assembly](#development-assembly)
    - [Usage Scenarios](#usage-scenarios-1)
- [Security](#security)
  - [Treasury Watchdog](#treasury-watchdog)
    - [Usage Scenarios](#usage-scenarios-2)
  - [EVM Emergency Assembly](#evm-emergency-assembly)
    - [Usage Scenarios](#usage-scenarios-3)
- [DAO Parameters](#dao-parameters)
- [Creation of New DAOs](#creation-of-new-daos)

The Neon DAO consists of three (3) Departments that each carries out functions in an area of focus:
- Ecosystem
- Development
- Security

## Ecosystem

The Ecosystem department is charged with the promotion of sustainable, long-term growth of the Neon ecosystem. As the collective owner of the Neon Treasury, its duties and responsibilties consist of distribution of funds for grants, security audits, bug bounties, and other ecosystem initiatives.

Within the Ecosystem department, Ecosystem Assembly and Foundation work in collaboration to provide a frictionless experience for Ecosystem developers. Ecosystem Assembly provides custodial services to the Foundation: it holds Treasury (and NEON token itself) and distributes funds in accordance with assembly decisions under the supervision of the Ecosystem Foundation, which assumes the role of an agent for the Ecosystem Assembly.

### Ecosystem Assembly

The Ecosystem Assembly is the main part of the Neon DAO. Proposals submitted to this Assembly can distribute funds to and from Neon treasury accounts, user accounts, and escrow funds. It uses this power to incentivize Neon ecosystem projects.

#### Usage Scenarios
Most Ecosystem Assembly proposals deal with the matter of distributing tokens from one treasury account to another. The following are some examples:
* Allocating tokens for the Grants budget
* Allocating tokens for the Bug Bounty budget
* Rewarding users with tokens, whether proactively or retroactively
* Depositing funds at an interest rate

Like all Neon DAO Assemblies, the Ecosystem Assembly also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

### Ecosystem Foundation
The Ecosystem Foundation is a organization that acts as the Ecosystem Assembly's agent. As the Assembly's agent, the Foundation is responsible for required to implement Ecosystem Assembly proposals that cannot be done automatically. These responsibilities include:
* Performing necessary Know-Your-Customer (KYC) and Anti-Money Laundering (AML) processes for contractors and grantees
* Signing agreements with contractors on behalf of the Ecosystem Assembly
* Process signed agreements with regards to acceptance and payments 
* Bookkeeping and reporting pertinent information to the Ecosystem Assembly

The Ecosystem Foundation also has the power to enact token transfers between different accounts, just like the Ecosystem Assembly. However, since it is not an Assembly and therefore is not subject to a formal proposal vetting and approval process, such a transfer may be made very quickly.

## Development
As the owner of the Neon EVM program, the Development Assembly is the group that deals with the technical aspects of the Neon EVM. In break-glass emergency scenarios, Emergency Engineers with a 2 out of N multisig setup may elect to stop the Neon EVM if deemed necessary by the Development Assembly. They are also tasked with restarting the EVM after the emergency has been addressed appropriately.

### Development Assembly

The Development Assembly is responsible for overseeing upgrades to the Neon EVM, identifying and proritizing relevant feature upgrades, appointing Emergency Engineers, as well as for preventing funds from being maliciously withdrawn from dApps on Neon. 

When upgrading the Neon EVM, Development Assembly cannot change the source code. Instead, it loads an approved precompiled version of the EVM. It can also add and remove precompiled Neon EVM versions from its approved version list. The Development Assembly also has the power to appoint Emergency Engineers that have the power to upgrade the EVM to an approved version without the Assembly's approval.

To prevent malicious withdrawals, the Development Assembly can either stop the Neon EVM via emergency mode or move it to maintenance mode in order to prevent the transfers from going through. Maintenance mode is when the EVM finalizes transactions that have started, but declines any new transactions, whereas emergency mode is when all transactions are declined.

#### Usage Scenarios
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

## Security

The Security department's primary focus, as its name implies, is to monitor and prevent attacks on Treasury accounts and the Neon EVM program.

Within the Security department, the Treasury Watchdog and EVM Emergency Assembly provide additional assurances that attacks and other malicious actions may be monitored, detected, and rectified.

### Treasury Watchdog

The Treasury Watchdog is meant as a check on the Ecosystem Assembly, to make sure no malicious actors attempt to withdraw funds from any treasury wallets/accounts by taking advantage of the Ecosystem Assembly's decentralized nature. The Treasury Watchdog's main function is to identify malicious proposals that may target treasury accounts normally controlled by the Ecosystem Assembly. A Treasury Watchdog proposal to prevent such a withdrawal must be undertaken before or during the hold up period of the malicious Ecosystem Assembly proposal.

#### Usage Scenarios
Like all Neon DAO Assemblies, the Treasury Watchdog also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

### EVM Emergency Assembly
The EVM Emergency Assembly is meant as a check on the Development Assembly, to make sure no malicious actors attempt to submit a malicious upgrade to the Neon EVM by taking advantage of the Development Assembly's decentralized nature. The EVM Emergency Assembly's main function is to prevent the Neon EVM being upgraded with malicious code. An EVM Emergency Assembly proposal to prevent such a withdrawal must be undertaken before or during the hold up period of the malicious Development Assembly proposal.

#### Usage Scenarios
Like all Neon DAO Assemblies, the EVM Emergency Assembly also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results.

<!-- ## Grants Assembly

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

Like all Neon DAO Assemblies, the Grants Assembly also allows for changing the voting parameters and permits users to monitor existing proposals by opting to receive notifications for new proposals and voting results. -->

<!-- ## Bug Bounty Committee

The Bug Bounty Committee, while not strictly a decentralized Assembly, is a critical component of Neon's governance structure. This committee, the members of which are limited to people invited by the Neon team, vote on the distribution of funds from the Bug Bounty Budget to deserving hackers who discover vulnerabilities in the Neon EVM. The funds themselves are released by the Grants Assembly. -->

## DAO Parameters

The parameters pertaining to the Neon governance framework may be adjusted and voted on by the community.

The main goal, based on token distribution, the Governance parameters should be set to be sure that:

1. All proposals the community at-large is interested in will be approved in a given timeframe
    1. Every participant would prefer to vote with a weight less than a threshold
    2. Owners of public sale tokens will not be able to block approval
    3. Ideally, voting should be done without NeonLabs
2. NeonLabs or investors can block any malicious proposal
    1. Any malicious proposal can be blocked by any of top-4 main investors or us
3. To speed up the proposal approval process, the top-4 investors (Three Arrows Capital, Solana Ventures, Solana Foundation) may be involved to vote or use NeonLabs tokens

## Creation of New DAOs

A new DAO within the Neon governance framework can be created only by users with more than 1 * 10^6 NEON tokens. 