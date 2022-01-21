# Transferring SPL Tokens via Neon Pass

## Overview
This guide provides instructions on how to transfer ERC-20 tokens between Solana and Neon EVM using Neon Pass. You can do it in any direction, i.e. transfer tokens from Solana to Neon EVM or withdraw them back. However, you need to take into account that a fee will be charged for each transaction in the form of SOL tokens.

Before you start to transfer ERC-20 tokens, you have to fulfill the following requirements:
  * You should already have accounts in Solana and Neon EVM with balances of the types of tokens that will be transferred. In addition, there are enough SOL tokens on the account balance in Solana to pay the fee.
  * Neon Pass uses [Metamask](https://docs.neon-labs.org/docs/glossary#metamask) and [Phantom](https://docs.neon-labs.org/docs/glossary#phantom) — two popular non-custodial browser based wallets.
  * The Neon Pass application is deployed in the browser to which your wallets are attached.

## Procedure
This procedure presents the example of transferring USDT tokens from Neon EVM to Solana in Devnet. The task is to transfer 5 USDT from Neon EVM to Solana.

Initial conditions:
  * Your Neon EVM account contains non-zero USDT-balance.
  * Your Solana account contains non-zero SOL-balance to pay fee.

Transferring tokens using Neon Pass takes 3 stages:
  * Source — connecting the Metamask wallet to Neon Pass and providing access to the sender's account balance.
  * Target — connecting the Phantom wallet to Neon Pass and providing access to the recipient's account balance.
  * Confirmation — signing the transaction and checking the result of transferring tokens.

### The Source stage

Go to the [Neon Pass](https://neonpass.live/) page in the browser to which the Phantom and Metamask wallets are attached. Make sure that the icons of these wallets are displayed at the top right. By default, the direction of transferring tokens is set from `Solana` to `Neon`. If this is not the case you have to click on the arrow icon to reverse the forwarding direction.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./img/transfer-spl-1.png)

</div>

Click `Connect Wallet` to connect your Metamask wallet to the Neon Pass app. The Metamask window should pop up on the screen. Follow the login procedure to your wallet and make sure it is connected to Devnet. Also make sure you have enough USDT tokens in your account to transfer (there are 987.9 USDT in our example). Upon successful connection of the Metamask wallet to Neon Pass and access to your account balance, the inscription `Connect Wallet` will change to the public key of your account in Neon EVM.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-2.png)

</div>

On the Neon Pass screen, click `Select a token`. In the list that appears, select the desired token symbol and specify the quantity to be sent (in our example, it is 5 USDT).

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-3.png)

</div>

Click `Next` to continue the token transfer procedure and proceed to the Target stage.

### The Target stage

The `Target` windows will appear on the Neon Pass screen. Click `Select Wallet` to connect your Phantom wallet to Neon Pass.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-4.png)

</div>

The Phantom window should pop up on the screen. Follow the login procedure to your wallet and make sure it is connected to Devnet. Also make sure you have non-zero SOL balance in your account to pay fee (there are 10 SOL in our example).

If you do not have the USDT balance in your account, it is time to create one. Open the `Add token metadata` page in Phantum and fill in the fields with the token data. You need to write down the SPL-address of the token's contract deployed in Devnet, token's symbol and name. You can take these data from the [token-list](https://github.com/neonlabsorg/token-list/blob/main/tokenlist.json) repository. Click `Add` to add USDT balance to your account in Devnet.

<div class='neon-img-width-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-5.png)

</div>

Upon successful connection of the Phantom wallet to Neon Pass and access to your account balance, the inscription `Select Wallet` will change to the public key of your account in Solana. This means that a user authorizes Neon Pass to use this key to sign transactions. Phantom stores sets of account keys, but does not store any balances. To obtain balances, Phantom will refer to the Solana blockchain.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-6.png)

</div>

Click `Next` to continue the token transfer procedure and proceed to the Confirmation stage.

### The Confirmation stage

Read the details of the upcoming transfer of tokens and click `Confirm`.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-7.png)

</div>

Metamask window will pop up on the Neon Pass screen with the amount of fee charged for using gas in Neon EVM. The fee is paid in NEON tokens. If you agree with these terms, click `Confirm`. The transaction will be signed automatically with the public key of your Neon EVM account.

<div class='neon-img-box-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-8.png)

</div>

You should also approve the transaction in the Phantom window, which will display the amount transferred and fee charged in SOL tokens. The transaction will be signed automatically with the public key of your Solana account.

<div class='neon-img-width-300' style={{textAlign: 'center'}}>

![](./img/transfer-spl-9.png)

</div>

You should receive a notification that the token transfer was successful. Open the `View on Solana Explorer` page to see the results of transferring funds using Neon Pass.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./img/transfer-spl-10.png)

</div>

The `Token Balance Change` tab shows the change in balances upon completion of the procedure.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./img/transfer-spl-11.png)

</div>

## Conclusion

We examined the use of Neon Pass in Devnet using the example of transferring USDT tokens from Neon EVM to Solana. The procedure for reverse transferring tokens from Solana to Neon EVM using Neon Pass is not much different from the one given, and therefore we do not consider it here. The main difference will be only in the order of connecting wallets to Neon Pass.

