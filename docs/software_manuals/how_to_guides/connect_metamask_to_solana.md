# How to Connect Metamask to Solana's Network

## Goal
To connect Metamask to Solana's network via Neon EVM.

## Before you begin
  * Understand the following:
    * What is the [Solana network](https://docs.solana.com/clusters).
    * What is the [Metamask](https://metamask.io).
  * Metamask must be installed on your device and can be accessed from the browser you are using.

## Steps

### Step 1
Open https://chainlist.org/ web page. In the `Search Networks` field, type the NEON token symbol. 
The search will select three Neon EVM networks with their corresponding ChainIDs in which this token can be circulated.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./images/connect-metamask-1.png)

</div>

### Step 2
In the upper right corner, click `Connect Wallet`. This field should display the address of your Metamask wallet, accessible from your browser.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./images/connect-metamask-2.png)

</div>

### Step 3
Select the Neon EVM network to which you are going to connect your wallet to perform operations and click `Add To Metamask` (for debugging or testing contracts, it is recommended to use Neon EVM Devnet). The Metamask window should appear with the selected network ID and proxy address.

Check that the data in the Metamask fields correspond to the network you need. Click `Approve` to complete the Metamask connection to the Neon EVM network.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./images/connect-metamask-3.png)

</div>

The Metamask window will display a list of your accounts (in our case, this will be "Account 1").


<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./images/connect-metamask-4.png)

</div>

You can start performing all operations inherent in your wallet, including creating new accounts. For debugging work in the Neon EVM Devnet/Testnet networks, 5 tokens will be credited to each account balance. These tokens can only be used within Devnet/Testnet.

If you connect to the Neon EVM Mainnet, NEON tokens will not be credited. How to credit NEON tokens to an account balance on Mainnet, you can find in **the instruction** (will be aded later).

### Step 4
If you want to switch Metamask to another network, you need to click `Add To Metamask` on the new network and click `Switch network` in the Metamask window.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./images/connect-metamask-5.png)

</div>

### Step 5
You can close the browser window and reopen it at any time. Do not worry, your metamask will keep access to the connected network. To return to the Neon EVM network session, simply open the browser to which your wallet is attached and click on the Metamask icon in the upper right corner.

<div class='neon-img-box-600' style={{textAlign: 'center'}}>

![](./images/connect-metamask-6.png)

</div>
