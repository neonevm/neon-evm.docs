---
title: Vote
proofedDate: 20230602
iterationBy: HB
includedInSite: false
approvedBy: na
comments: 
boilerPlatable: no
reference: 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import appDownload from '@site/static/img/doc-images/governance/appDownload.png';
import hardwareWallet from '@site/static/img/doc-images/governance/hardwareWallet.png';
import squadsConnectWallet from '@site/static/img/doc-images/governance/squads-connect-wallet.png';
import squadsSelectPhantom from '@site/static/img/doc-images/governance/squads-select-phantom.png';
import squads5owners from '@site/static/img/doc-images/governance/squads-5-owners.png';
import vaultDash from '@site/static/img/doc-images/governance/squads-vault-dash.png';
import vaultDashSend from '@site/static/img/doc-images/governance/squads-vault-dash-send.png';
import txSend from '@site/static/img/doc-images/governance/txSend.png';
import activeTx from '@site/static/img/doc-images/governance/active-tx.png';
import confirmTx from '@site/static/img/doc-images/governance/confirm-tx.png';
import approveTx from '@site/static/img/doc-images/governance/approve-tx.png';
import execute from '@site/static/img/doc-images/governance/execute-tx.png';
import delegatedTx from '@site/static/img/doc-images/governance/delegated-create-tx.png';
import delegatedTransfer from '@site/static/img/doc-images/governance/delegated-tx-transfer.png';
import delegatedProposal from '@site/static/img/doc-images/governance/delegated-proposal.png';


## TL;DR

To manage a MultiSig wallet to engage in the Neon DAO you must:

- Set up a Ledger hardware wallet with the Solana app
- Set blind signing
- Install and connect Phantom
- Transfer assets using MultiSig: i.e. set up, vote on, and execute transactions

## Introduction

This tutorial covers setting up a Ledger wallet to apply MultiSig signing for the purposes of voting in the Neon DAO. This MultiSig is managed by the web app *Squads*. Squads provides a user-friendly interface for managing MultiSig wallets on the Solana blockchain. It allows multiple parties to manage a single address by requiring a specified number of signatures to complete a transaction.

Within Squads the lifecycle of a transaction is creation, approval/rejection, and, if approved, execution.

> Learn [more about Squads](https://squads.medium.com/squads-101-the-two-types-of-squads-34b67d1a6641).

## Prerequisites

- Ledger Nano S Plus or Ledger Nano X

:::note
We used a Ledger Nano S Plus, but the steps for Ledger Nano X are identical.
::: 

- macOS

- It's strongly recommended that you use the Chromium-based browsers, Chrome or Brave

## Set up wallets and transact


#### Step 1: Configure your Ledger wallet

Ledger maintains and curates their to provide you the best support possible. However, if you want to stay here, you are welcome to follow the Neon Guide.


<Tabs>
  <TabItem value="Ledger" label="Ledger's configuration guide" default>

See Ledger's [configuration guide](https://support.ledger.com/hc/en-us/articles/4416927988625-Set-up-your-Ledger-Nano-S-Plus). 

  </TabItem>
  <TabItem value="Neon" label="Neon Guide">


> Be aware, we don't maintain and curate guides to partner interfaces following testing.

1.1 Unbox and charge your Ledger hardware wallet by connecting it to your computer with a USB-C cable.

1.2 Download the Ledger Live Mac app from [https://www.ledger.com/start](https://www.ledger.com/start). 

> Select “Mac app” from the dropdown menu after you click **Download**.

> <img src={appDownload} width="250" />

1.3 When your Ledger wallet is sufficiently charged and displays "Welcome to Ledger Nano S Plus Press right button to continue." 

> <img src={hardwareWallet} width="350" />

> Press the right physical button to navigate through the on-screen instructions, and then press both buttons simultaneously to choose the option **Set up as new device”**. 

1.4 Press the right or left button to select the first digit of your PIN code, and then press both buttons to enter a digit.

1.5 After you have confirmed your PIN code, your 24-word recovery phrase is displayed word by word on the Ledger device screen. The recovery phrase is the **only** backup of your private key and is crucial for accessing your wallet. It will be displayed only **once**, so it's vital to **write it down and store it in a secure location**.


> Ensure you:
>
> - Remember your PIN code
> - Store your 24-word recovery phrase in a safe and secure place

Your device will display **”Processing”** and then **Your device is now ready** to validate successful set up.
  </TabItem>
</Tabs>

#### Step 2: Install the Solana app on your Ledger and enable blind signing

2.1 Install the Solana app on your Ledger hardware wallet by following the steps outlined in [Ledger's official tutorial](https://support.ledger.com/hc/en-us/articles/360016265659-Solana-SOL)

> Ensure that blind signing is enabled during the installation process. **Blind signing** allows you to sign transactions without revealing the contents to the other parties involved in a MultiSig wallet.
> If you miss this step, enable it as per [Ledger's documentation](https://support.ledger.com/hc/en-us/articles/4499092909085-Allowing-blind-signing-in-the-Solana-SOL-app).

#### Step 3: Install the Phantom wallet and connect Ledger to Phantom

3.1 Install the Phantom wallet on your browser by visiting the Phantom website: [https://phantom.app/](https://phantom.app/).

3.2 Next, connect your Ledger wallet as per [Ledger's documentation](https://support.ledger.com/hc/en-us/articles/4408131265169-Set-up-and-use-Phantom-to-access-your-Ledger-Solana-SOL-account)

> Ensure you remember the password you set up for Phantom.

#### Step 4: Access your squad on Squads

4.1 Access Squads on:

- [Devnet](https://devnet.squads.so/connect-squad) 
- [Mainnet](https://v3.squads.so/connect-squad). 

4.2 Click on **Connect wallet**, then **Agree and continue** when prompted to acknowledge the terms and conditions.

> <img src={squadsConnectWallet} width="250" /> 

> Please do take care to read the Terms of Service and Squads Disclaimer first.

4.3 Select “Phantom” from the list of wallet applications.

> <img src={squadsSelectPhantom} width="200" /> 

> A list of Vaults/Squads your wallet address is a signatory of is now available. 

:::note 

Example Squads Dash
> In the following example, the Squad dashboard shows a Vault with 5 owners.
> <img src={squads5owners} width="600" /> 
> Clicking on the Vault drills the dash down to show the details for this Vault. 
> <img src={vaultDash} width="600" /> 

:::

Find out more about Vaults in the [Squads documentation](https://docs.squads.so/squads-v3-docs/navigating-your-squad/transactions). Take some time to familiarize yourself with this interface.

#### Step 5: Create a transfer proposal


This next step covers creating a transaction, note that the flow is slightly different from the perspective of the account owner vs. a delegated owner. Choose the path that applies to you.

Due to the custody policy applied by the MultiSig wallet, you must both create *and* approve a transaction.

This step covers creating a transaction, note that the flow is slightly different from the perspective of the account owner vs. a delegated owner. Choose the path that applies to you.

<Tabs>
  <TabItem value="Account owner" label="Account owner" default>

  **Create transaction**

  a. Within the **Vault** tab, click on the **Send** button.

  > <img src={vaultDashSend} width="600" /> 

  b. Configure this transaction:

  - Asset: the asset type to be sent
  - Amount: the amount of assets to be sent
  - To address: recipient of the assets
  - (Optional): description

  c. Click **Send**.

  > <img src={txSend} width="300" /> 

 

</TabItem>
<TabItem value="Delegated account" label="Delegated account" default>

  While an account owner may create a transaction and broadcast that for votes, as a delegate you must create a proposal first. For this tutorial, we will select to **Transfer** from **Token Program** template.

  **Create proposal**

  a. Within the **TX Builder** tab, click on the **Create transaction** button or select from the templates available in the dashboard: we will select the **Token Program** template. 

  > <img src={delegatedTx} width="500" /> 

  b. Choose the **Transfer** instruction from the list.

  > <img src={delegatedTransfer} width="500" /> 

  c. Configure this transaction proposal:

  > Note, the Token Program works with the DAO token, i.e. NEON, therefore, the token is already identified.

  - Amount: the amount of the asset to be sent, detailed to the required decimal places
  - Source: account holding the tokens to be transferred
  - Destination: recipient of the assets

  > <img src={delegatedProposal} width="500" /> 

  d. Click **Save draft**.

  e. You may either **Run Simulation** to verify the transaction is executable, or **Initate Transaction**.

</TabItem>
</Tabs>


## Vote

A MultiSig wallet applies a threshold policy to allow greater control and security over transactions. While you may set up a MultiSig wallet to behave like a single-signature wallet by creating a threshold of "1 of 1", this is ill-advised. The following steps provides a recently created transaction with an approval which will count toward the customized threshold for this Vault. Remember, you have connected your hardware wallet and Phantom wallet to manage your approval process; expect to use both to achieve the next step.

a. From the **Transactions** tab, select the **Active** proposal you are interested in. 

> <img src={activeTx} width="400" /> 

Under the **Results** section, you will see a number for *Confirmed* and a number for *Rejected*. When the transaction is first created, both numbers should be 0. 

b. Click **Confirm** to vote for the transaction, and **Reject** to vote against it.

> <img src={confirmTx} width="400" /> 

Squads will prompt you to approve the transaction using your Phantom wallet extension. 

c. Click **Approve**. 

> <img src={approveTx} width="200" /> 

To verify the transaction details on the Ledger device, connect your Ledger hardware wallet to the computer and open the Solana app. Approve the transaction using the physical buttons on the device.

> Remember, a transaction request won't be signed until approvals are provided by other parties and the minimum threshold specified in the MultiSig wallet is met. In this example, the threshold is 3, so 2 or more signatures are required to execute this transaction.

## Execute a transaction

Once the minimum threshold of signatures is collected, the transaction may be executed, and the assets will be transferred.

> Note that the previous step allowed the transaction to be signed. Initiating the "execute" allows this signed transaction to be broadcast to the Solana network.

a. Click **Execute**.

> <img src={execute} width="500" /> 

Congratulations, your signed tx is now broadcast.

> Should your transaction be rejected (i.e. if the minimum threshold of votes against the transaction was met), then the transaction enters the **Cancelled** status and will not be signed and, therefore, never executed.

## Verify transaction

If you wish to verify a transaction, you can either monitor the MultiSig wallet using a Solana block explorer, such as [Solana Explorer](https://explorer.solana.com/) or [Solscan](https://solscan.io/). Alternatively, you may verify in the Squads Vault that the assets transferred successfully.

