---
title: Governance User Interface
---

The Neon Governance application is an open source service designed to provide a convenient forum for submitting proposals to improve Neon EVM and for voting on the acceptance of these proposals.

Any Neon user can submit a proposal to improve the Neon EVM governance, but only stakeholders can make the final decision on whether to implement the proposal or not. Submitting proposals and voting on them are carried out using the Neon Governance application.

## Proposal Submission Procedure

> Currently, the procedure for submitting and considering proposals is being finalized and therefore some actions may differ from the ones described below. If you encounter an issue, feel free to contact *community* for help.

### Posting an Article on the Neon Forum
The first thing to do is to go to the [Neon forum](https://forum.neon-labs.org) and post an article describing your proposal. If you are not yet registered, you must do so. Then click `New Topic` and put your content in the pop-up window.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./img/govern-ui-1.png)

</div>

The topic of your proposal should concern Neon EVM governance. Proposal content may contain a textual description of your idea, illustrations, and links to your prepared and tested program code. If you have the code, you must provide brief instructions for installing it and checking the features that it performs.

Here is an example of the article "Execute new proposal" published on the forum:

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./img/govern-ui-2.png)

</div>

### Submitting a Proposal to Neon Governance

If after being discussed on the forum, an article receives positive reviews, it can be submitted for consideration to stakeholders. Currently, only the Neon EVM network administrator can register a submission in Governance UI. The author of the article should notify the administrator of the intention to create a proposal.

The proposal should match the recommended template and contain the following fields:
  * `Summary` — a brief description
  * `Instructions` — the sequence of actions for installing and running program code, if it is in the proposal.
  * `Discussion` — feedback and comments from stakeholders

Once the proposal is registered in Governance UI, a new line with data about it will appear in the list of [Governance Proposals](https://governance.neon-labs.org).

<div class='neon-img-width-600' style={{textAlign: 'center'}}>

![](./img/govern-ui-3.png)

</div>

### Monitoring the Status of the Submitted Proposal
The page [Governance Proposals](https://governance.neon-labs.org) contains the list of all proposals, including their names, identifiers, and current states. Authors have the ability to track the status of their proposals and monitor the voting processes. To get up-to-date information about the proposal, click on its status field.

As an example, the following figure shows the page containing detailed information about the "Execute new proposal" with the status `Voting`.

<div class='neon-img-width-600' style={{textAlign: 'center'}}>

![](./img/govern-ui-4.png)

</div>

Page fields and their functional meanings:

  1. Reverse arrow icon — by clicking on it you go to the `Governance Proposals` page
  1. `Proposer` — public key of the proposer
  1. Name of the proposal
  1. Current status of the proposal
  1. Proposal ID in Neon Governance
  1. The date of the last vote, after which no votes are accepted
  1. `See in forum` — link to forum post for further discussion
  1. Voting scale, visually displaying the voting process. It also displays the percentage of `Approve` and `Deny` votes scored.
  1. `Approval quorum` — displays the percentage of votes required to approve a proposal and the minimum number of approve votes required. Once the approval quorum is greater than or equal to the specified value, the proposal is eligible to pass.
  1. `Cast your vote` — button to open the pop-up voting window. Only stakeholders are allowed to vote.
  1. `Approvals` — list of voters with their votes given. The first numeric value means the number of stakeholders who voted `Approve`. The second numeric value means the total number of stakeholders who have the right to vote.

Here is the list of possible states of proposals and their functional meaning:
  * `Draft` — The proposal is in the preparation stage.
  * `Voting` — Stakeholders are voting to accept the proposal.
  * `Cancelled` — The proposal was not approved on the forum.
  * `Execution errors` — Attempting to execute the program code attached to the proposal ended with an error.
  * `Defeated` — The number of `Deny` votes was at least 50% of the total number of stakeholders allowed to vote.
  * `Approved` — The number of `Approve` votes has reached the `Approval quorum` threshold.
  * `Succeeded` — The proposal was approved but not yet implemented.
  * `Completed` — The proposal was approved and has been implemented.
  * `Voting ended` — The time allotted for voting has expired.

### Stakeholder Voting
If you are a stakeholder and you are allowed to vote, you should be here. Others can skip this section.

You should first open the list of proposals to view their current status, and select the proposal with `Voting` that you wish to vote on or view. The voting progress page will open.

<div class='neon-img-width-600' style={{textAlign: 'center'}}>

![](./img/govern-ui-5.png)

</div>

Then you should click `See in forum` to view the content of the proposal. To vote on the proposal, you must click `Cast your vote`. A pop-up box will appear.

<div class='neon-img-width-600' style={{textAlign: 'center'}}>

![](./img/govern-ui-6.png)

</div>

 Click `Approve` or `Decline` to vote on the proposal. Next, you will be asked to confirm and you will have the option to add a message to your vote.
