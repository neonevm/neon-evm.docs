---
title: Deploy with Remix
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

*This tutorial demonstrates step by step how to use Remix and MetaMask to create and deploy a simple smart contract on Solana. Although the instructions use Solana's [Devnet](https://docs.solana.com/clusters#devnet), they may also be applicable to Solana's [Testnet](https://docs.solana.com/clusters#testnet) or Solana's [Mainnet Beta](https://docs.solana.com/clusters#mainnet-beta).*

## Requirements
Before you start, make sure that the following is true:
  * MetaMask is installed on your device. To install MetaMask, follow [this guide](wallet/metamask_setup.md#installing-metamask).
  * MetaMask is configured for the Neon EVM.

## Network Configurations
  * [Solana cluster](https://docs.solana.com/clusters) is accessed via a proxy.
  * Solana works in test mode and the proxy interacts with it through the Neon EVM.

## How to Use Remix

### Step 1: Set up the Remix Environment

For Remix to be used to load a smart contract into Neon EVM, Remix must be connected to your MetaMask wallet and run in the `Injected Web3` environment.  

Go to https://remix.ethereum.org and go over the tutorial walkthrough if you are unfamiliar with Remix. Open the `Remix - Ethereum IDE` web application. In the left sidebar menu, select `File explorers`. The `FILE EXPLOPERS` menu will be active (Fig. 1).  

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-1.png)

Fig. 1 — Connecting to localhost

</div>

### Step 2: Create a Simple Smart Contract in Remix

Click on the icon `Create New File` and type in the file name in the field that appears below it. For example, `helloWorld.sol`, shown below:

#### helloWorld.sol
```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

contract helloWorld {
  string public text = "Hello World!";

  function callHelloWorld() public view returns (string memory) {
    return text;
  }
}
```

At this point, it is an empty file. To fill it with content, click on the created file name and type the text shown above (or copy your pre-prepared text there) (Fig. 2).  

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-2.png)

Fig. 2 — Loading the helloWorld smart contract

</div>

### Step 3: Compile the Smart Contract

In the left side menu, select the `Solidity compiler` tab. The `SOLIDITY COMPILER` menu will be active.  

Click on the `Compile helloWorld.sol` button to compile the loaded smart contract helloWorld (Fig. 3).  

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-3.png)

Fig. 3 — Compiling helloWorld smart contract

</div>

If the compilation is successful, a green icon will appear near the `Solidity compiler` button.  
You can also get detailed information about the compilation process by clicking `Compilation Details` (Fig. 4).  

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-4.png)

Fig. 4 — Compilation details

</div>

### Step 4: Connect Remix to MetaMask

Interactions with Neon EVM are carried out through MetaMask. In the left sidebar menu, select `Deploy & run transactions`. The `DEPLOY & RUN TRANSACTIONS` menu will become active.

Choose the `Injected Provider - Metamask` environment to connect Remix with an active account in MetaMask (Fig. 5). Make sure that your MetaMask wallet is set to display the Neon Devnet network before you do this step.

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-5.png)

Fig. 5 — "Injected Provider" connects Remix with an active account in Metamask

</div>

The MetaMask window should appear. It will display a list of available accounts, if you have multiple accounts. In our case, only one account will be displayed. Choose this account and click `Next` (Fig. 6).  

<div className='neon-img-box-300' style={{textAlign: 'center'}}>

![](img/remix-6.png)

Fig. 6 — Selecting an account to interact with Remix

</div>

Click `Connect` to connect to this account (Fig. 7).

<div className='neon-img-box-300' style={{textAlign: 'center'}}>

![](img/remix-7.png)

Fig. 7

</div>

### Step 5: Deploy a Smart Contract on Solana Devnet
In our case, there is only one smart contract to deploy, therefore it is automatically selected from the dropdown and Remix will automatically generate a transaction.  

The `Account` field will display the amount in the wallet account. This data is taken from MetaMask.  

Click `Deploy` (Fig. 8).  

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-8.png)

Fig. 8 — Deploying the smart contract

</div>

MetaMask will send a notification in the form of a pop-up window to confirm the transaction. Click `Confirm` to execute it (Fig. 9).  

<div className='neon-img-box-300' style={{textAlign: 'center'}}>

![](img/remix-9.png)

Fig. 9 — MetaMask notification

</div>

Once the transaction is confirmed, you can see its status in the messages on the bottom right (Fig. 10).  

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-10.png)

Fig. 10

</div>

After successfully deploying the smart contract, you will see a message containing the name and address of the smart contract where it was uploaded (Fig. 11).  

<div className='neon-img-width-300' style={{textAlign: 'center'}}>

![](img/remix-11.png)

Fig. 11 — Deployed the smart contract data

</div>

If all the steps have been completed successfully, a green icon will appear near the `Deploy & run transactions` button (Fig. 12).

<div className='neon-img-width-600' style={{textAlign: 'center'}}>

![](img/remix-12.png)

Fig. 12 — Final view of the Remix panel

</div>

Congratulations! You can now call methods of the helloWorld smart contract deployed on the Solana network. (Fig. 13 shows the result of your smart contract — the text string "Hello World!".)  

<div className='neon-img-width-300' style={{textAlign: 'center'}}>

![](img/remix-13.png)

Fig. 13 — Calling the smart contract methods

</div>

----

> **Useful Links**  
> https://ethereum.org/en/developers/tutorials/deploying-your-first-smart-contract/
