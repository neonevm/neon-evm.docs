---
title: Move Tokens Between Neon EVM and Solana
proofedDate: 20231207
iterationBy: na
includedInSite: true
approvedBy: VS
comment:
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import image1 from '@site/static/img/doc-images/neonpassV2/Connect_to_wallet.png';
import image2 from '@site/static/img/doc-images/neonpassV2/Neon_to_Solana.png';
import image3 from '@site/static/img/doc-images/neonpass/select_network.png';
import image4 from '@site/static/img/doc-images/neonpassV2/Solana_to_Neon_transfer.png';
import image5 from '@site/static/img/doc-images/neonpassV2/Transfer_completed_general.png';
import image6 from '@site/static/img/doc-images/neonpassV2/Transfer_completed_general.png';
import image7 from '@site/static/img/doc-images/neonpass/confirmation_transfer_neonscan.png';
import image8 from '@site/static/img/doc-images/neonpass/confirmation_transfer_solana.png';
import image9 from '@site/static/img/doc-images/neonpassV2/Not_Enough_SOL.png';
import image10 from '@site/static/img/doc-images/neonpassV2/Wrong_network.png';
import image11 from '@site/static/img/doc-images/neonpassV2/Transfer_completed.png';
import image12 from '@site/static/img/doc-images/neonpassV2/Transfer_failed.png';
import image13 from '@site/static/img/doc-images/neonpassV2/Homepage.png';
import image14 from '@site/static/img/doc-images/neonpassV2/Mobile Wallet connect.png';
import image15 from '@site/static/img/doc-images/neonpassV2/Transfer complete.png';
import image16 from '@site/static/img/doc-images/neonpassV2/Transfer_failed.png';

## TL;DR

<iframe width="560" height="315" src="https://www.youtube.com/embed/OPZwzh_9Qy4?si=Z1M904pYTlvDp0tM" title="How to Use NeonPass | Step-by-Step Guide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Overview

This guide demonstrates how to transfer tokens between Solana and Neon EVM using the [NeonPass](https://neonpass.live/) UI. The same tooling is available as an [npm package](/docs/developing/integrate/neon_transfer).

You can transfer tokens in either direction, but each transaction incurs a gas fee in either NEON or SOL or the token of your choice with which you are transacting.

:::info
 Neon EVM's Devnet now supports a feature providing the option to pay the gas fees with the [token of transaction](https://neonevm.org/blog/feature-alternative-gas-fee-token), rather than only NEON or SOL.
:::

:::important
When transferring tokens from Neon EVM to Solana for the first time, ensure that you have SOL in your Solana wallet to cover the transaction costs. This is a one-time requirement for the initial transfer.
:::

## Prerequisites

- Neon EVM-compatible wallet (e.g. Atomic Wallet, MetaMask, Rabby Wallet, WalletConnect, Trust Wallet, Ledger, etc.)
- Solana-compatible wallet (e.g. Phantom, Solfare, etc.)
- Browser with both wallet applications attached
- Token balance to pay gas fees

## Transfer tokens with NeonPass

### Step 1: Set up wallets

1.1 Navigate to [NeonPass](https://neonpass.live/).

1.2 Add your required Neon EVM Network in your Neon compatible wallet through [Chainlist.org/chain/245022934](https://chainlist.org/?chain=245022934&search=Neon+EVM&testnets=true).

> For further help, see our [wallet setup walkthrough](/docs/wallet/metamask_setup).

### Step 2: Connect wallets to NeonPass

:::tip
Remember to use a browser to which both your Solana and Neon EVM compatible wallets are attached.
:::

2.1 Click **Connect Wallet** to connect your Solana compatible wallet to NeonPass. Follow the login procedure in your wallet's popup window and ensure it's connected to the network you require (e.g. Mainnet).

<img src={image1} width="450" style={{ display: 'block', margin: '10px auto' }} />

2.2 Repeat this step for your Neon EVM compatible wallet.

### Step 3: Conduct transfer

<Tabs>

 <TabItem value="neontosolana" label="Neon EVM to Solana" default>

3.1 Select the transfer direction from Neon EVM to Solana.

<img src={image2} width="450" style={{ display: 'block', margin: '10px auto' }} />

:::important
Your first ever transaction from your wallet includes a one time fee to generate the Solana account linked to your address. Therefore the first transaction will be more expensive than the subsequent ones.
:::

3.2 Choose the token and enter the amount to transfer.

3.3 Click **Transfer** and sign the transaction in your connected wallets.

3.4 Review the transaction summary and enjoy your tokens in Solana!

 </TabItem>

 <TabItem value="solanatoneon" label="Solana to Neon EVM">

3.1 Select the transfer direction from Solana to Neon EVM.

<img src={image4} width="450" style={{ display: 'block', margin: '10px auto' }} />

3.2 Choose the token, enter the amount, and select the gas token (NEON or SOL).

3.3 Are you an expert user? Click on 'Advanced Mode' and select a different priority fee to speed up 

3.4 Click **Transfer** and sign the transaction in your connected wallets.

3.5 Review the transaction summary and enjoy your tokens in Neon EVM!

 </TabItem>

</Tabs>

**Verify the transaction on [NeonScan](https://neonscan.org/) or [Blockscout](https://neon.blockscout.com/).**

We hope that you love NeonPass and that you are ready to leverage the full potential of Neon EVM by facilitating hassle-free transfers of assets to and from Solana.

## Gas Fees and Priority Selection

<Tabs>

<TabItem value="neontosolana" label="Neon EVM to Solana" default>

When transferring tokens from Neon EVM to Solana:
- You can pay gas fees in NEON or the token of transaction.
- If you're withdrawing to a new Solana account or an existing account that has never received the specific ERC-20 token before, ensure that you have sufficient SOL in your Solana wallet to cover the gas fees.

</TabItem>

<TabItem value="solanatoneon" label="Solana to Neon EVM">

When transferring tokens from Solana to Neon EVM:
- For sending NEON tokens, you can choose between NEON and SOL as the gas token.
- For sending SPL tokens (e.g., USDC), only SOL can be used as the gas token.

</TabItem>

</Tabs>

:::important
Please be aware of the gas fee specificities for each transfer direction. Always ensure you have sufficient funds in the appropriate token to cover gas fees before initiating a transfer.
:::

## Edge Cases

1. Insufficient funds for gas fees
   
  <img src={image9} width="450" style={{ display: 'block', margin: '10px auto' }} />

2. Wallet connection issues
   
   <img src={image10} width="450" style={{ display: 'block', margin: '10px auto' }} />

3. Transfer completion and failure
   
   <img src={image11} width="450" style={{ display: 'block', margin: '10px auto' }} /> 
   
   <img src={image12} width="450" style={{ display: 'block', margin: '10px auto' }} />

:::info
If you encounter any persistent issues or have questions about edge cases not covered here, please reach out to our [support team](http://discord.com/invite/neonevm) for assistance.
:::

## Using NeonPass on Mobile Devices

NeonPass is designed to be responsive and user-friendly across various devices, including mobile phones.

<img src={image13} width="190" style={{ display: 'block', margin: '5px auto' }} /> 

1. Connecting wallets on mobile
   
  <img src={image14} width="190" style={{ display: 'block', margin: '10px auto' }} /> 

   :::tip
   Make sure you have your mobile wallet apps installed and set up before attempting to connect them to NeonPass.
   :::

2. Selecting tokens and entering amounts

3. Initiating and confirming transfers
  
  <img src={image15} width="190" style={{ display: 'block', margin: '10px auto' }} /> 

   :::important
   Always double-check the transaction details before confirming a transfer, especially on mobile devices where screen sizes are smaller.
   :::

4. Track transfer progress and history in a dedicated explorer

<!--    <img src={image16} width="450" style={{ display: 'block', margin: '10px auto' }} /> -->

By following these steps, you can easily transfer tokens using NeonPass on your mobile device, enjoying a seamless and user-friendly experience on the go.

## Under the hood

Neon EVM isn't a blockchain, and so it follows that NeonPass isn't a conventional blockchain bridge. Your assets are not wrapped. Instead, Neon EVM applies an ERC-20 interface, making SPL tokens behave like Ethereum-natives when in the Neon network. [Learn more about how NeonPass works](/docs/tokens/token-accounts).