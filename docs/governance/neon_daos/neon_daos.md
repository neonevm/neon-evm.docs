---
title: Neon DAOs
---

Neon's governance model is based on an interplay of several Decentralized Autonomous Organizations (aka DAOs). These DAOs function by accepting proposals from eligible members, which are put to a vote after some discussion. This vote, between Accepting and Rejecting the proposal, is conducted by eligible DAO members submitting an arbitrary amount of NEON tokens toward either option, with each NEON token being worth one vote. If the Accept option receives more than the threshold required, the proposal passes; otherwise, it fails.

The Neon governance model consists of the following DAOs:

## Community DAO

The Community DAO is the main part of Neon's governance structure. Proposals submitted to this DAO can update the Neon EVM code, mint NEON tokens & delegate minting authority to other parties, and distribute funds from Neon treasury accounts.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 2 days, and the proposal creation threshold is 3*10<sup>^3</sup> NEON.

## Emergency DAO

The Emergency DAO is meant as a check on the entire DAO system, to make sure no malicious actors attempt to withdraw funds from any treasury accounts by taking advantage of the Community DAO's decentralized nature. The Emergency DAO's only function is to prevent money from being maliciously withdrawn from treasury accounts normally controlled by the Community DAO. An Emergency DAO proposal to prevent such a withdrawal must be undertaken before or during the hold up period of the malicious Community DAO proposal, which is 1 day.

For this DAO, the pass threshold is 9%, proposals have a voting period of 1 day and a hold up period of 0 days, and the proposal creation threshold is 1*10<sup>^6</sup> NEON.

## EVM Maintenance DAO

The EVM Maintenance DAO is responsible for preventing money from being maliciously withdrawn from dApps on Neon. It can accomplish this by stopping the Neon EVM or moving it to maintenance mode in order to prevent the transfers from going through. However, unlike the Community DAO, it cannot change the source code of the Neon EVM.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 0 days, and the proposal creation threshold is 2*10<sup>^5</sup> NEON.

## Grants DAO

The Grants DAO controls the Grants Treasury, which is used to distribute grants and rewards for a variety of community initiatives. These funds are deposited in an escrow account and subsequently released to the relevant grantees.

This DAO works closely with the Bug Bounty Committee, in that it enables the distribution of rewards to white-hat hackers who found vulnerabilities in the Neon EVM, as determined by the members of the Bug Bounty Committee. This Bug Bounty Committee has its own budget which is separate from the Grants Treasury.

For this DAO, the pass threshold is 1%, proposals have a voting period of 1 day and a hold up period of 2 days, and the proposal creation threshold is 2*10<sup>^3</sup> NEON.

## Bug Bounty Committee

The Bug Bounty Committee, while not strictly a DAO, is a critical component of Neon's governance structure. This committee, the members of which are limited to people invited by the Neon team, vote on the distribution of funds from the Bug Bounty Budget to deserving hackers who discover vulnerabilities in the Neon EVM. The funds themselves are released by the Grants DAO.