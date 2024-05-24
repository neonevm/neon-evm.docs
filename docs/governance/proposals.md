Here is the updated "Voting Process" page in its original Docusaurus format, with relevant image placeholders and wireframe references:

---
title: Voting Process
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: todo requires overhaul
---

import govern1 from '@site/static/img/doc-images/governance/proposals/GOV2/new_gov_ui_before_wallet2.png';
import govern2 from '@site/static/img/doc-images/governance/proposals/GOV2/new_gov_ui_wallet_connect2.png';
import govern3 from '@site/static/img/doc-images/governance/proposals/GOV2/new_gov_ui_wallet_balance2.png';

import govern5 from '@site/static/img/doc-images/governance/proposals/GOV2/new_gov_ui_add_new_proposal2.png';
import govern6 from '@site/static/img/doc-images/governance/proposals/GOV2/new_gov_ui_new_proposal_popup2.png';
import govern7 from '@site/static/img/doc-images/governance/proposals/GOV2/new_gov_ui_review_proposal_summary2.png';


## Introduction

Any Neon user can submit an idea for potential implementation by the Neon DAO. Each idea is included in the list of promising solutions and discussed on the DAO forum. After an idea is proposed, it goes through a formal life cycle of technical reviews, research, and discussions. This discussion stage allows DAO participants to exclude the implementation of inefficient or risky solutions in Neon. After the discussion stage, finalized ideas are reworked into concrete on-chain **proposals** and are put to a vote by the Assembly. Proposals that are approved according to the rules of their Assembly are then automatically implemented by Neon.

## Discussing on the DAO Forum

The DAO Forum is a place where Neon stakeholders, community members, developers, and third-party teams can discuss and debate ideas and express and articulate their opinions in preparation for becoming proposals. This forum is a vital part of the Neon DAO, as it provides transparency and accountability, fosters constructive discourse, and helps ensure the decentralization of the project. 

Potential proposals can affect both the management and technical processes of Neon. If this is a proposal to change the logic of system contracts or to improve the technical capabilities of Neon, the proposal contract must be tested on either Devnet or Testnet. Proposals for the implementation of new features associated with risk or high labor costs go through the following formal process:

  * Substantiation of the need to implement this proposal, taking into account its labor intensity and relevance.
  * Development of technical specifications for the implementation of this proposal.
  * Appointment of a worker for the implementation of the proposal. The worker may be an individual, a group of individuals, or a third-party company.
  * Verification and decision on acceptance of the work done.

All these details are discussed, revised, and debated civilly on the DAO Forum. To learn more about expectations on governance participants and discourse, refer to the [Principles and Objectives](principles.md) section.

## Connecting Wallet

:::tip
Interacting with Neon Governance requires the use of NEON tokens. Make sure you are connecting a wallet account **with NEON tokens available**.
:::

1. On the Neon Governance homepage, click on the "Connect Wallet" button.

> <img src={govern1} />

2. Select your preferred wallet from the list of options.

> <img src={govern2} />

3. Follow the prompts in your wallet application to approve the connection.

> <img src={govern3} />

You are now ready to interact with the Neon Governance system.

## Creating a Proposal

Once an idea has been finalized through discussions on the DAO Forum and has passed the formal review process, it can be submitted as an official proposal on the Neon Governance platform.

Before proceeding, ensure your wallet is [connected](#connecting-wallet).

To create a proposal:

1. Navigate to the Governance topic that best suits your proposal.

<!-- >> <img src={govern4} /> -->

2. Click on the "Create proposal" button.

> <img src={govern5} />

1. Fill in the proposal details, including the title.

> <img src={govern6} />

4. Review the proposal summary and click "Create proposal" to submit.

<img src={govern7} />

5. Approve the transaction in your wallet to finalize the proposal creation.

<!-- >> <img src={govern8} /> -->

Your proposal will now appear in the list of active proposals, ready for the voting process.

## Voting

Once a proposal is created, it enters the voting stage, where eligible voters in the relevant Assembly can cast their votes to either "Accept" or "Reject" the proposal. Each NEON token represents one vote.

To vote on a proposal:

1. Open the proposal you wish to vote on from the list of active proposals or by following a direct link.

<!-- >> <img src={govern9} /> -->

2. Choose "Positive" to vote in favor of the proposal or "Negative" to vote against it.

<!-- >> <img src={govern10} /> -->

3. Select the percentage of your NEON tokens you want to allocate to the vote and click "Confirm."

<!-- >> <img src={govern11} /> -->

4. Approve the voting transaction in your wallet.

Your vote has now been cast and will be counted towards the proposal's outcome.

:::note Priority Fee
Users can pay a higher fee to expedite the processing of their voting transactions. This new priority fee feature allows for faster inclusion of votes in the blockchain.
:::

:::note High Priority Voting
A high priority voting feature is available for executing critical changes to the Strategical DAO or smart contracts. This feature requires a higher token threshold (e.g., 1 million tokens) compared to regular voting.
:::

Once the voting period concludes, the votes are automatically tallied. If the proposal's "Accept" votes surpass the Assembly's required vote threshold, the proposal passes and is ready for implementation. Otherwise, the proposal fails.

<!-- ---
title: Voting Process
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: todo requires overhaul
---

import govern1 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_before_wallet.jpeg';
import govern2 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_wallet_connect.png';
import govern3 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_wallet_balance.png';
import govern4 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_governance_topic.jpeg';
import govern5 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_add_new_proposal.jpeg';
import govern6 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_new_proposal_popup.png';
import govern7 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_list_after_new_proposal.png';
import govern8 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_new_proposal_page.png';
import govern9 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_sign_off_popup.png';
import govern10 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_signed_off_proposal.png';

import govern11 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_cancel_proposal.png';

import govern12 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_proposal_voting.png';
import govern13 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_positive_popup.png';
import govern14 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_negative_popup.png';
import govern15 from '@site/static/img/doc-images/governance/proposals/new_gov_ui_voting_tipping_point.png';

## Introduction

Any Neon user can submit an idea for potential implementation by the Neon DAO. Each idea is included in the list of promising solutions and discussed on the DAO forum. After an idea is proposed, it goes through a formal life cycle of technical reviews, research, and discussions. This discussion stage allows DAO participants to exclude the implementation of inefficient or risky solutions in Neon. After the discussion stage, finalized ideas are reworked into concrete on-chain **proposals** and are put to a vote by the Assembly. Proposals that are approved according to the rules of their Assembly are then automatically implemented by Neon.

## Discussing on the DAO Forum

The DAO Forum is a place where Neon stakeholders, community members, developers, and third-party teams can discuss and debate ideas and express and articulate their opinions in preparation for becoming proposals. This forum is a vital part of the Neon DAO, as it provides transparency and accountability, fosters constructive discourse, and helps ensure the decentralization of the project. 

Potential proposals can affect both the management and technical processes of Neon. If this is a proposal to change the logic of system contracts or to improve the technical capabilities of Neon, the proposal contract must be tested on either Devnet or Testnet. Proposals for the implementation of new features associated with risk or high labor costs go through the following formal process:

  * Substantiation of the need to implement this proposal, taking into account its labor intensity and relevance.
  * Development of technical specifications for the implementation of this proposal.
  * Appointment of a worker for the implementation of the proposal. The worker may be an individual, a group of individuals, or a third-party company.
  * Verification and decision on acceptance of the work done.

All these details are discussed, revised, and debated civilly on the DAO Forum. To learn more about expectations on governance participants and discourse, refer to the [Principles and Objectives](principles.md) section.

## Connecting Wallet

:::tip
Interacting with Neon Governance requires the use of NEON tokens. Make sure you are connecting a wallet account **with NEON tokens available**.
:::

1. Click on "Connect" to connect your Solana wallet to the DAO website.

> <img src={govern1} />

2. Select the wallet application that you are using from the list.

> <img src={govern2} />

3. If you wish to continue, respond to your wallet application's prompt to allow connecting.
4. Confirm that you see your wallet address show up.

> <img src={govern3} />

You are now ready to interact with the Neon Governance UI.

## Creating a Proposal
Once an idea has reached its final form after discussions on the DAO Forum and the formal review process is complete, the proponent can create the actual proposal. The on-chain code to automatically implement the proposal that was tested and finalized on the DAO Forum is now ready to be included in a formal proposal on the Neon DAO website.

Before proceeding, please make sure [your wallet is connected](#connecting-wallet).

To create a proposal, follow the steps below.

1. On the Neon DAO website, select the Governance topic for which the proposal is best suited.

> <img src={govern4} />

2. Click on the "Add new proposal" button.

> <img src={govern5} />

3. In the "Add new proposal" popup, enter the name of your proposal and a description with a link to a relevant [GitHub Gist](https://docs.github.com/en/get-started/writing-on-github/editing-and-sharing-content-with-gists/creating-gists), if applicable. Click on "Add proposal".

> <img src={govern6} />
 
4. A transaction prompt will be displayed by your wallet application. If you have verified its details and wish to continue, approve it, then wait a few moments for the transaction to process.
5. After the transaction has been processed, you will see your proposal in the list of proposals. In this case, we created a proposal called `[Test] Test Proposal 2`.

> <img src={govern7} />

  Click on your proposal to see its details. This new proposal will be in the `Draft` state by default.

> <img src={govern8} />

You can then sign off on your proposal by clicking on the "Sign off" button. Click "Sign off" in the pop up that follows.

> <img src={govern9} />

6. A prompt by your wallet application will ask if you to approve the sign off transaction. If you have verified its details and wish to continue, approve it, then wait a few moments for the transaction to process.
7. After the sign off transaction has been processed, your proposal is now signed off by you and put forth to the community for a vote. Your proposal is now in the `Voting` state and the "Voting Time Left" clock has started counting down.

> <img src={govern10} />

8. Share the proposal link URL to the DAO Forum and elsewhere for the Neon community to vote on it.
9. (Optional) Alternatively, if you wish to cancel this proposal for whatever reason, click on the "Cancel proposal" button, click "Yes, Cancel" in the pop up that follows, and approve the cancel transaction.

> <img src={govern11} />

## Voting

After a proposal is created, it is ready to be put to a vote. The community of eligible voters in the relevant Assembly is then invited to cast their votes to either "Accept" or "Reject" this proposal. This is done by submitting NEON tokens to the desired option, with each NEON token being worth one vote.

To vote on a proposal, follow the following steps:

1. You might have been given a link to a proposal that is in the `Voting` state, or you might have clicked on a proposal in the `Voting` stage from the list of proposals. Either way, you should see a proposal page like this:

> <img src={govern12} />

2. Click on "Positive" or "Negative" depending on whether you are in favor of or against the proposal.
     1. If you choose "Positive", you will see a pop up as follows.

     > <img src={govern13} />

     2. If you choose "Negative", you will see a pop up very similar to the pop up above.

      > <img src={govern14} />

     3. You can then choose/customize the percentage of your NEON tokens you would like to commit for this vote
     4. Click "Confirm" once you are happy with your ballot.
3. A prompt by your wallet application will ask you to approve the voting transaction. If you have verified its details and wish to continue, approve it, then wait a few moments for the transaction to process.
5. You have now cast your vote on this proposal. 

> <img src={govern15} />

:::note Priority Fee
Users can pay a higher fee to expedite the processing of their voting transactions. This new priority fee feature allows for faster inclusion of votes in the blockchain.
:::

:::note High Priority Voting
A high priority voting feature is available for executing critical changes to the Strategical DAO or smart contracts. This feature requires a higher token threshold (e.g., 1 million tokens) compared to regular voting.
:::

Once the voting period is concluded, the votes are automatically counted. If the proposal's "Accept" votes pass the Assembly's required vote threshold ("Vote tipping point" in the image below), the proposal is passed and is ready for implementation. Otherwise, the proposal fails. -->