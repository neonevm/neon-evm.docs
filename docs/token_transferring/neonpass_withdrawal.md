---
title: NeonPass Withdrawal UI
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment:
---

import image1 from '@site/static/img/doc-images/neonpass_withdrawal/connect_wallets.png';
import image2 from '@site/static/img/doc-images/neonpass_withdrawal/neon_to_solana.png';
import image3 from '@site/static/img/doc-images/neonpass_withdrawal/connect_evm_wallet.png';
import image4 from '@site/static/img/doc-images/neonpass_withdrawal/connect_solana_wallet.png';
import image5 from '@site/static/img/doc-images/neonpass_withdrawal/transfer_form.png';
import image9 from '@site/static/img/doc-images/neonpass_withdrawal/insufficient_neon.png';
import image10 from '@site/static/img/doc-images/neonpass_withdrawal/wrong_network.png';
import image11 from '@site/static/img/doc-images/neonpass_withdrawal/transfer_completed.png';
import image12 from '@site/static/img/doc-images/neonpass_withdrawal/transfer_failed.png';
import image13 from '@site/static/img/doc-images/neonpass_withdrawal/mobile_home.png';
import image14 from '@site/static/img/doc-images/neonpass_withdrawal/mobile_wallet_connect.png';
import image15 from '@site/static/img/doc-images/neonpass_withdrawal/mobile_transfer_completed.png';

## Overview

This guide demonstrates how to withdraw tokens from Neon EVM to Solana using the [NeonPass](https://neonpass.live/) UI.

Each withdrawal incurs a gas fee in NEON or in the token of transaction.

:::important
When withdrawing tokens from Neon EVM to Solana for the first time, ensure that you have SOL in your Solana wallet to cover the transaction costs. This is a one-time requirement for the initial withdrawal.
:::

## Prerequisites

- Neon EVM-compatible wallet (e.g. Atomic Wallet, MetaMask, Rabby Wallet, WalletConnect, Trust Wallet, Ledger, etc.)
- Solana-compatible wallet (e.g. Phantom, Solfare, etc.)
- Browser with both wallet applications attached
- Token balance to pay gas fees

## Withdraw tokens with NeonPass

### Step 1: Set up wallets

1.1 Navigate to [NeonPass](https://neonpass.live/).

1.2 Add your required Neon EVM Network in your Neon compatible wallet through [Chainlist.org/chain/245022934](https://chainlist.org/?chain=245022934&search=Neon+EVM&testnets=true).

> For further help, see our [wallet setup walkthrough](/docs/wallet/metamask_setup).

### Step 2: Connect wallets to NeonPass

:::tip
Remember to use a browser to which both your Solana and Neon EVM compatible wallets are attached.
:::

2.1 Click **Connect EVM Wallet** in the **From** field to connect your Neon EVM compatible wallet to NeonPass.

<img src={image1} width="450" style={{ display: 'block', margin: '10px auto' }} />

2.2 Select your wallet from the list, follow the login procedure in your wallet's popup window and ensure it's connected to the network you require (e.g. Mainnet).

<img src={image3} width="450" style={{ display: 'block', margin: '10px auto' }} />

2.3 Click **Connect Solana Wallet** in the **To** field and repeat this step for your Solana compatible wallet.

<img src={image4} width="450" style={{ display: 'block', margin: '10px auto' }} />

### Step 3: Withdraw tokens

3.1 Make sure the transfer direction is from Neon (**From**) to Solana (**To**). Since deposits are closed, this is the only direction available.

<img src={image2} width="450" style={{ display: 'block', margin: '10px auto' }} />

:::important
Your first ever transaction from your wallet includes a one time fee to generate the Solana account linked to your address. Therefore the first transaction will be more expensive than the subsequent ones.
:::

3.2 Choose the token and enter the amount to withdraw. NeonPass shows the estimated time, the gas token, the gas fees and the amount you will receive.

<img src={image5} width="450" style={{ display: 'block', margin: '10px auto' }} />

3.3 Click **Transfer** and sign the transaction in your connected wallets.

3.4 Review the transaction summary and enjoy your tokens in Solana!

**Verify the transaction on [Blockscout](https://neon.blockscout.com/).**

## Gas Fees

When withdrawing tokens from Neon EVM to Solana:
- You can pay gas fees in NEON or the token of transaction.
- If you're withdrawing to a new Solana account or an existing account that has never received the specific ERC-20 token before, ensure that you have sufficient SOL in your Solana wallet to cover the gas fees.

:::important
Always ensure you have sufficient funds in the appropriate token to cover gas fees before initiating a withdrawal.
:::

## Edge Cases

1. Insufficient funds for gas fees
   
  <img src={image9} width="450" style={{ display: 'block', margin: '10px auto' }} />

2. Wallet connection issues: if your EVM wallet is connected to an unsupported network, click **Switch to Neon EVM**
   
   <img src={image10} width="450" style={{ display: 'block', margin: '10px auto' }} />

3. Withdrawal completion and failure
   
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

3. Initiating and confirming withdrawals
  
  <img src={image15} width="190" style={{ display: 'block', margin: '10px auto' }} /> 

   :::important
   Always double-check the transaction details before confirming a withdrawal, especially on mobile devices where screen sizes are smaller.
   :::

4. Track withdrawal progress and history in a dedicated explorer

By following these steps, you can easily withdraw tokens using NeonPass on your mobile device.

## Under the hood

Neon EVM isn't a blockchain, and so it follows that NeonPass isn't a conventional blockchain bridge. Your assets are not wrapped. Instead, Neon EVM applies an ERC-20 interface, making SPL tokens behave like Ethereum-natives when in the Neon network. [Learn more about how NeonPass works](/docs/tokens/token-accounts).

## Previous version

[NeonPass UI](/docs/token_transferring/neonpass_usage) <span className="badge badge--warning">Deprecated</span> — the previous guide, which also covers deposits from Solana to Neon EVM. Deposits have been permanently disabled.
