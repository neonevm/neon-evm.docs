---
title: Move Tokens Between Neon EVM and Solana
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

## Overview
This guide shows you how to transfer ERC-20 tokens between Solana and Neon EVM using [NeonPass](https://neonpass.live/). You can transfer tokens in either direction, but each transaction will incur a gas fee in either NEON or SOL tokens, depending on the source network. For example, moving tokens from Neon EVM to Solana requires two transactions, one for Neon EVM (which requires a fee in NEON) and another for Solana (which requires a fee in SOL).

To transfer ERC-20 tokens, you must:
* Have an account on the source network with the necessary token balance. This means that:
  * When transferring from Neon EVM to Solana, make sure your Neon EVM account has enough NEON and the token being moved to complete the transfer and cover the gas fee.
  * When transferring from Solana to Neon EVM, make sure your Solana account has enough SOL and the token being moved to complete the transfer and cover the gas fee.
* Use non-custodial browser-based wallet applications [MetaMask](https://metamask.io/) and [Phantom](https://phantom.app/), which are currently supported by NeonPass.
* Access the NeonPass page using a browser where your wallet applications are attached.

## Tutorial: Moving Tokens From Neon EVM to Solana
The following is an example of transferring NEON tokens from Neon EVM to Solana on Devnet.

### 1. Connect Wallets
Go to the [NeonPass](https://neonpass.live/) page in the browser to which the Phantom and MetaMask wallets are attached.

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](img/transfer-spl-1.png)

</div>

1. Make sure that the icons of these wallet extensions are displayed in the browser. For Chrome, they are in the top right corner.
2. By default, the direction of transferring tokens is set to be from `Solana` to `Neon`. For this tutorial, click on the arrow icon to reverse the forwarding direction so that it is from `Neon` to `Solana`.
3. Click `Connect Wallet` to connect your Phantom wallet to the NeonPass app. The Phantom window should pop up on the screen. Follow the login procedure to your wallet and make sure it is connected to Devnet. Also, make sure you have a non-zero SOL balance to pay the withdrawal approval fee.
4. Click `Connect Wallet` to connect your MetaMask wallet to the NeonPass app. The MetaMask window should pop up on the screen. Follow the login procedure to your wallet and make sure it is connected to Devnet. Also, make sure you have enough NEON tokens in your account to transfer and have a non-zero NEON balance to pay the withdrawal approval fee.

After successfully connecting your MetaMask and Phantom wallets to NeonPass, the `Connect Wallet` text will change to the name of the network (Solana or Neon), and the public key of your accounts will be displayed above.

### 2. Select Token
On the NeonPass screen, click `Choose token`. In the list that appears, select the desired token symbol and specify the quantity to be sent (in our example, it is 42 NEON).

<div className='neon-img-box-300' style={{textAlign: 'center'}}>

![](img/transfer-spl-3.png)

</div>

### 3. Approve Transaction and Complete Transfer
Click `Transfer` to begin the token transfer procedure. The transaction must then be confirmed in both the MetaMask and Phantom wallet windows which will pop up. Verify the transaction details and approve it if you wish to proceed. A loading screen will appear after you approve.

After the transaction has been processed successfully, you will see the following screen indicating that the transfer is complete.

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](img/transfer_complete.png)

</div>

Click on `View on Neon Explorer` and confirm on NeonScan that the tokens have been moved. In this case, 42 NEON was transferred out of the origin wallet.

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](img/confirmation_transfer_neonscan.png)

</div>

Let's also check the destination Solana wallet address on [Solana Explorer](https://explorer.solana.com/) to see if the 42 NEON tokens have been transferred, and indeed they have. 

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](img/confirmation_transfer_solana.png)

</div>