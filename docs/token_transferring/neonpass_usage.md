---
title: Move Tokens Between Neon EVM and Solana
proofedDate: 20230928
iterationBy: na
includedInSite: true
approvedBy: na
comment: Step 3 previous txt said both confirm in wallets, latest tutorial says EVM-compatible, I am assuming that neither is true == and the sending wallet must confirm
---

import image1 from '@site/static/img/doc-images/neonpass/connect-wallets.png';
import image2 from '@site/static/img/doc-images/neonpass/transfer.png';

## TL;DR

- Transfer tokens to and from Solana and Neon networks with our [intuitive UI](https://neonpass.live/)
- No wrapping


## Overview
This guide demonstrates how to transfer tokens between Solana and Neon EVM using the [NeonPass](https://neonpass.live/) UI. The same tooling is available as an [npm package](/docs/developing/integrate/neon_transfer).

## Prerequisites

- EVM-compatible wallet (e.g. Atomic Wallet, MetaMask, etc.)
- Solana-compatible wallet (e.g. Phantom, Solfare, etc.) 
- Token balance to pay gas fees

## Fees

You can transfer tokens in either direction, but each transaction incurs a gas fee in either NEON or SOL; you decide. 

> Under the hood, moving tokens from Neon EVM to Solana requires two transactions: one for Neon EVM (which requires a fee in NEON) and another for Solana (which requires a fee in SOL). However, NeonPass consolidates these payments, which may be made in the token of your choosing.

<!-- Retiring this, believe it is out dated in terms of payment

For example, moving tokens from Neon EVM to Solana requires two transactions, one for Neon EVM (which requires a fee in NEON) and another for Solana (which requires a fee in SOL). -->

<!-- is this no longer true -- rather than account required, just wallet required? 
* Have an account on the source network with the necessary token balance. This means that:
  * When transferring from Neon EVM to Solana, make sure your Neon EVM account has enough NEON and the token being moved to complete the transfer and cover the gas fee.
  * When transferring from Solana to Neon EVM, make sure your Solana account has enough SOL and the token being moved to complete the transfer and cover the gas fee.
* Use non-custodial browser-based wallet applications [MetaMask](https://metamask.io/) and [Phantom](https://phantom.app/), which are currently supported by NeonPass.
* Access the NeonPass page using a browser where your wallet applications are attached.

## Tutorial: Moving Tokens From Neon EVM to Solana
The following is an example of transferring NEON tokens from Neon EVM to Solana on Devnet.

-->

## Transfer tokens with NeonPass

### Step 1: Set up wallets

1.1 Navigate to [NeonPass](https://neonpass.live/).

1.2 Add your required Neon EVM network in your EVM-compatible wallet through [chainlist.org/chain/245022934](https://chainlist.org/?chain=245022934&search=Neon+EVM&testnets=true).

> For further help, see our [wallet setup walkthrough](/docs/wallet/metamask_setup).

### Step 2: Connect wallets to NeonPass 

:::tip

Remember to use a browser to which both your Solana- and EVM-compatible wallets are attached.

:::

<img src={image1} width="450" style={{ display: 'block', margin: '10px auto' }} />


2.1 Click **Connect Wallet** to connect your Solana-compatible wallet to NeonPass. Follow the login procedure in your wallet's popup window and ensure it's connected to the network you require (e.g. Mainnet). 

:::tip

Ensure you have enough SOL/NEON to pay the withdrawal approval fee.

:::

2.2 Repeat this step for your EVM-compatible wallet. 

After successfully connecting your wallets to NeonPass, the **Connect Wallet** text changes to the name of the network (Solana or Neon), and the public key of your accounts is displayed.

### Step 3: Conduct transfer

3.1 Use the arrow to determine the direction of transfer (from Solana to Neon EVM or vice versa).

<img src={image2} width="450" style={{ display: 'block', margin: '10px auto' }} />

3.2 Use the drop-down to select the token you want to transfer and enter the amount you want to send.

3.3 Click **Transfer**. 

3.4 Confirm the transaction in your sending wallet.


> Always verify the transaction details and only approve if you wish to proceed. 

A successful transaction is confirmed.

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](img/transfer_complete.png)

</div>

We hope that you love NeonPass and that you are ready to leverage the full potential of Neon EVM by facilitating hassle-free transfers of assets to and from Solana. 

## Don't trust: verify

If you wish to verify the transaction, click **View on Neon Explorer** to confirm on [NeonScan](https://neonscan.org) that the tokens were transferred. In the following example, 42 NEON was transferred out of  Neon EVM.

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](img/confirmation_transfer_neonscan.png)

</div>

Let's also check the destination Solana wallet address on [Solana Explorer](https://explorer.solana.com/) to verify the arrival of those 42 NEON tokens. 

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](img/confirmation_transfer_solana.png)

</div>

:::tip
Alternatively, use Blockscout's dedicated explorer [Neon.blockscout.com](https://neon.blockscout.com) to search by transaction hash.
:::

## Under the hood

Neon EVM isn't a blockchain, and so it follows that NeonPass isn't a conventional blockchain bridge. Your assets are not wrapped. Instead, Neon EVM applies an ERC-20 interface, making SPL tokens behave like Ethereum-natives when in the Neon network. [Learn more about how NeonPass works](/docs/tokens/token-accounts).