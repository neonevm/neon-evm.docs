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
- [DAO Scenarios](#dao-scenarios)
  - [Regular Scenarios](#regular-scenarios)
  - [Community DAO](#community-dao-1)
  - [Grants DAO](#grants-dao-1)
  - [All DAOs](#all-daos)
  - [EVM Maintenance Scenarios](#evm-maintenance-scenarios)
  - [Maintenance scenarios](#maintenance-scenarios)

![](img/dao_organization.png)

## Community DAO

The Community DAO is the main part of Neon's governance structure. Proposals submitted to this DAO can update the Neon EVM code, mint NEON tokens & delegate minting authority to other parties, and distribute funds from Neon treasury accounts.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 2 days, and the proposal creation threshold is 3*10<sup>3</sup> NEON.

## Emergency DAO

The Emergency DAO is meant as a check on the entire DAO system, to make sure no malicious actors attempt to withdraw funds from any treasury accounts by taking advantage of the Community DAO's decentralized nature. The Emergency DAO's only function is to prevent money from being maliciously withdrawn from treasury accounts normally controlled by the Community DAO. An Emergency DAO proposal to prevent such a withdrawal must be undertaken before or during the hold up period of the malicious Community DAO proposal, which is 1 day.

For this DAO, the pass threshold is 9%, proposals have a voting period of 1 day and a hold up period of 0 days, and the proposal creation threshold is 1*10<sup>6</sup> NEON.

## EVM Maintenance DAO

The EVM Maintenance DAO is responsible for preventing money from being maliciously withdrawn from dApps on Neon. It can accomplish this by stopping the Neon EVM or moving it to maintenance mode in order to prevent the transfers from going through. However, unlike the Community DAO, it cannot change the source code of the Neon EVM.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 0 days, and the proposal creation threshold is 2*10<sup>5</sup> NEON.

## Grants DAO

The Grants DAO controls the Grants Treasury, which is used to distribute grants and rewards for a variety of community initiatives. These funds are deposited in an escrow account and subsequently released to the relevant grantees.

This DAO works closely with the Bug Bounty Committee, in that it enables the distribution of rewards to white-hat hackers who found vulnerabilities in the Neon EVM, as determined by the members of the Bug Bounty Committee. This Bug Bounty Committee has its own budget which is separate from the Grants Treasury.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 2 days, and the proposal creation threshold is 2*10<sup>3</sup> NEON.

## Bug Bounty Committee

The Bug Bounty Committee, while not strictly a DAO, is a critical component of Neon's governance structure. This committee, the members of which are limited to people invited by the Neon team, vote on the distribution of funds from the Bug Bounty Budget to deserving hackers who discover vulnerabilities in the Neon EVM. The funds themselves are released by the Grants DAO.

## DAO Scenarios

### Regular Scenarios

### Community DAO

Almost all scenarios are reduced to distributing tokens from Treasury accounts to another. The following are some examples of this action:
* Allocation tokens for Grants budget
* Allocation tokens for the Bug Bounty budget
* Rewarding users proactively or retrospectively
* Depositing funds at an interest rate


### Grants DAO

To get funds for each initiative, mainly Grantee performs the following actions:
1. Grantee create a proposal to
    1. sign an offer (put a link to the offer in the proposal)
    2. create Escrow accounts
    3. transfer tokens from the Treasury accounts to the Escrow accounts
2. Grants Manager adds information about the Escrow accounts to Initiative Board
3. Grantee creates a proposal to get money from Escrow for work done / achieving milestone
4. (alternative) Grants Manager creates a proposal to revert money from Escrow Account to the Budget if Grantee isn’t able to finish work

### All DAOs

* Changing voting parameters (any DAO)
    * “Create, vote & execute proposal” to change these parameters
* Proposals monitoring (all DAO) ‣
    * subscribe to notifications
    * receive notifications for new proposals and voting results

### EVM Maintenance Scenarios

1. We are able to run EVM Program in the following modes (separate EVM contract for each mode)
   1. normal mode
   2. maintenance mode - EVM finalizes the Tx that has started, but declines new Tx. This mode can be used to perform some maintenance work, for instance, to update account structure.
   3. emergency mode - EVM declines all Tx: new and ongoing Tx
2. For each mode (normal, maintenance, emergency) we have compiled versions of EVM. The emergency version of EVM should be preloaded to speed up EVM stopping
3. Also, we use the “EVM Maintenance” smart contract that
   1. mark EVM versions as approved (preserve check-sums for code of approved versions)
   2. allows upgrading EVM Program only to approved EVM versions and one of
        1. Maintenance DAO
        2. Emergency maintenance DAO
        3. 2 out of N for Emergency engineers (MultiSig)
   3. has authority to upgrade EVM Program
4. Maintenance DAO and Emergency maintenance DAO are able to
    1. approve EVM versions, i.e. allows upgrading EVM using these versions
    2. upgrade EVM for approved EVM versions
    3. add / remove private keys to allow EVM upgrading for them
    4. revoke upgrade authority from “EVM Maintenance” smart contract
    5. update “EVM Maintenance” smart contract
5. The emergency engineer with multi-sig (using 2 out of N private keys) is only able to
    1. switch between approved versions of EVM

### Maintenance scenarios
1. Maintenance DAO or Emergency maintenance DAO - updating EVM program
   * load EVM program byte code to Solana buffer
   * “Create, vote & execute proposal” for updating EVM code and switching to this version
2. Maintenance DAO or Emergency maintenance DAO - adding / removing EVM maintenance keys

