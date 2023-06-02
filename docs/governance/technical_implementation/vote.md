---
title: Vote
proofedDate: 20230602
iterationBy: HB
includedInSite: false
approvedBy: na
comments: todo in place todo throttle image sizes
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

## TL;DR

Managing MultiSig for the DAO requires:

- Setting up a Ledger hardware wallet
- Installing the Solana app on a Ledger hardware wallet
- Setting blind signing
- Installing Phantom
- Connecting Ledger to Phantom
- Transfer of assets using MultiSig

## Introduction

This tutorial covers setting up a Ledger wallet to apply MultiSig signing for the purposes of voting in the Neon DAO. This MultiSig is managed by the web app Squads. Squads provides a user-friendly interface for managing MultiSig wallets on the Solana blockchain. It allows multiple parties to manage a single address by requiring a specified number of signatures to complete a transaction.

> Learn [more about Squads](https://squads.medium.com/squads-101-the-two-types-of-squads-34b67d1a6641).

## Prerequisites

- Ledger Nano S Plus or Ledger Nano X

:::note
We used a Ledger Nano S Plus, but the steps for Ledger Nano X are identical.
::: 

- macOS

- It's strongly recommended that you use the Chromium-based browsers, Chrome or Brave


## Step 1: Configure your Ledger wallet

<Tabs>
  <TabItem value="Ledger" label="Ledger's configuration guide" default>

See Ledger's [configuration guide](https://support.ledger.com/hc/en-us/articles/4416927988625-Set-up-your-Ledger-Nano-S-Plus-?docs=true). 

  </TabItem>
  <TabItem value="Neon" label="Neon Guide">

Ledger maintains and curates their [documents](https://support.ledger.com/hc/en-us/articles/4416927988625-Set-up-your-Ledger-Nano-S-Plus-?docs=true) to provide you the best support possible. If you want to stay here, you are welcome to follow the Neon Guide.

> Be aware, we don't maintain and curate guides to partner interfaces following testing.

1.1 Unbox and charge your Ledger hardware wallet by connecting it to your computer with a USB-C cable.

1.2 Download the Ledger Live Mac app from [https://www.ledger.com/start](https://www.ledger.com/start). 

> Select “Mac app” from the dropdown menu after you click **Download**.

> <img src={appDownload} width="250" />

1.3 When your Ledger wallet is sufficiently charged and displays "Welcome to Ledger Nano S Plus Press right button to continue." 

> <img src={hardwareWallet} width="350" />

> Press the right physical button to navigate through the on-screen instructions, and then press both buttons simultaneously to choose the option **Set up as new device”**. 

1.4 Press the right or left button to select the first digit of your PIN code, and then press both buttons to enter a digit.

1.5 After you have confirmed your PIN code, your 24-word recovery phrase will now be displayed word by word on the Ledger device screen. The recovery phrase is the **only** backup of your private key and is crucial for accessing your wallet. It will be displayed only **once**, so it's vital to **write it down and store it in a secure location**.

> Ensure you:
>
> - Remember your PIN code
> - Store your 24-word recovery phrase in a safe and secure place

Your device will display **”Processing”** and then **Your device is now ready** to validate successful set up.
  </TabItem>
</Tabs>

## Step 2: Install the Solana app on your Ledger and enable blind signing

2.1 Install the Solana app on your Ledger hardware wallet by following the steps outlined in Ledger's official tutorial: [https://support.ledger.com/hc/en-us/articles/360016265659-Solana-SOL-?support=true](https://support.ledger.com/hc/en-us/articles/360016265659-Solana-SOL-?support=true)

> Ensure that blind signing is enabled during the installation process. **Blind signing** allows you to sign transactions without revealing the contents to the other parties involved in a MultiSig wallet.
> If you miss this step, enable it as per [Ledger's documentation](https://support.ledger.com/hc/en-us/articles/4499092909085-Allowing-blind-signing-in-the-Solana-SOL-app?support=true).

## Step 3: Install the Phantom wallet and connect Ledger to Phantom

3.1 Install the Phantom wallet on your browser by visiting the Phantom website: [https://phantom.app/](https://phantom.app/).

3.2 Next, connect your Ledger wallet as per [Ledger's documentation](https://support.ledger.com/hc/en-us/articles/4408131265169-Set-up-and-use-Phantom-to-access-your-Ledger-Solana-SOL-account?docs=true)

> Ensure you remember the password you set up for Phantom.

## Step 4: Access your squad on Squads

4.1 To access Squads on DevNet, go to [https://devnet.squads.so/connect-squad](https://devnet.squads.so/connect-squad). Click on **Connect wallet**, then **Agree and continue** when prompted to acknowledge the terms and conditions.

<!-- todo Yuri thinks there should be a mainnet url -->

> <img src={squadsConnectWallet} width="250" /> 

> Please do take care to read the Terms of Service and Squads Disclaimer first.

4.2 Select “Phantom” from the list of wallet applications.

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

## Step 5: Transfer assets using MultiSig on Squads

Due to the custody policy applied by the MultiSig wallet, you must both create *and* approve a transaction.


### 5.1 Create transaction

a. Click on the **Send** button

> <img src={vaultDashSend} width="600" /> 

b. Configure this transaction:

- Asset: the asset type to be sent
- Amount: the amount of assets to be sent
- To address: recipient of the assets
- (Optional): Description

c. Click **Send**.

> <img src={txSend} width="300" /> 

### 5.2 Approve transaction

A MultiSig wallet applies a threshold policy to allow greater control and security over transactions. While you may set up a MultiSig wallet to behave like a single-signature wallet by creating a threshold of "1 of 1", this is ill-advised. The following step provides your recently created transaction with an approval which will count toward the customized threshold for this Vault. Remember, you have connected your hardware wallet and Phantom wallet to manage your approval process; expect to use both to achieve the next step.

a. Click the **Transactions** tab on the left-hand side of the dash.

b. Click on your newly created tx, which has **Active** status. 

> <img src={activeTx} width="400" /> 

Under the **Results** section, you will see a number for *Confirmed* and a number for *Rejected*. When the transaction is first created, both numbers should be 0. 

c. Click **Confirm** to vote for the transaction, and **Reject** to vote against it.

> <img src={confirmTx} width="400" /> 

Squads will prompt you to approve the transaction using your Phantom wallet extension. 

d. Click **Approve**. 

> <img src={approveTx} width="200" /> 

To verify the transaction details on the Ledger device, connect your Ledger hardware wallet to the computer and open the Solana app. Approve the transaction using the physical buttons on the device.

> Remember, a transaction request won't be signed until approvals are provided by other parties and the minimum threshold specified in the MultiSig wallet is met. In this example, the threshold is 3, so 2 or more signatures are required to execute this transaction.

### 5.3 Execute transaction

Once the minimum threshold of signatures is collected, the transaction may be executed, and the assets will be transferred.

<!-- in some multisigs there is no need to execute -- ruleset is to execute once threshold is met pls verify this is valid -->

> Note that the previous step allowed the transaction to be signed. Initiating the "execute" allows this signed tx to be broadcast to the Solana network.

a. Click **Execute**.

> <img src={execute} width="500" /> 

Congratulations, your signed tx is now broadcast.

> Should your transaction be rejected (i.e. if the minimum threshold of votes against the tx was met), then the transaction enters the Cancelled status and will not be signed and, therefore, never executed.


## (Optional) Step 6: Verify transaction

You can either monitor the MultiSig wallet using a Solana block explorer, such as [Solana Explorer](https://explorer.solana.com/) or [Solscan](https://solscan.io/). Alternatively, you may verify in the Squads Vault that the assets transferred successfully.


