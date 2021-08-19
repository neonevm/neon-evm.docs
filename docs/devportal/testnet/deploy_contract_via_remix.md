# Deploying smart contracts on Solana Testnet via Remix

This tutorial will show you step by step how to use Remix and Metamask to create and deploy a simple smart contract on Solana's Testnet.

## Requirements
Before you start, make sure of the following:
  * MetaMask is installed on your device.  
  * You have provided online access to remix.ethereum.org to use the `Remix - Ethereum IDE` open source web application.
  * MetaMask is configured for both proxy and EVM-loader (regardless of how proxy and EVM-loader run, MetaMask wallet must always be configured for them).

**The network configuration:**
  * Solana cluster is accessed via a proxy.
  * Solana works in test mode and the proxy interacts with it through the EVM-loader.

## Steps to complete

### Step 1. Set the Remix environment

For Remix to be used to load a smart contract into the EVM-loader, Remix must be connected to your MetaMask wallet and run in the `Injected Web3` environment.  
Go to http://remix.ethereum.org/ and open the `Remix - Ethereum IDE` web application. In the left side menu, select `File explorers`. The `FILE EXPLOPERS` menu will be active (Fig. 1).  

<p align="center">  

![](./images/remix-1.png)  
Fig. 1 - Connecting to localhost </p>  

### Step 2. Create a simple smart contract at Remix

Click on the icon `Create New File` and type the file name in the field that appears below it. For example helloWorld.sol  
For now, it is an empty file. To fill it with content, click on the created file name and type the text on the right side of the explorer (or copy your pre-prepared text there)(Fig. 2).  

<p align="center">  

![](./images/remix-2.png)  
Fig. 2 - Loading the helloWorld smart contract </p>  

### Step 3. Compile a smart contract

In the left side menu select the `Solidity compiler`. The `SOLIDITY COMPILER` menu will be active.  
Click on the `Compile helloWorld.sol` button to compile the loaded smart contract helloWorld (Fig. 3).  

<p align="center">  

![](./images/remix-3.png)  
Fig. 3 - Compiling helloWorld smart contract </p>  

If the compilation is successful, a green icon will appear near the `Solidity compiler` button.  
You can also get detailed information about the compilation process by clicking `Compilation Details` (Fig. 4).  

<p align="center">  

![](./images/remix-4.png)  
Fig. 4 - Compilation Details </p>  

### Step 4. Connect Remix to MetaMask

Interaction with the EVM-loader is carried out through MetaMask. Choose the `Injected Web3` environment to connect Remix with an active account in Metamask (Fig. 5).  

<p align="center">  

![](./images/remix-5.png)  
Fig. 5 -Injected Web3 connects Remix with an active account in Metamask </p>  

The MetaMask window should appear. It should display a list of available accounts (in our case, only one account will be displayed). Choose this account and click `Next` (Fig. 6).  

<p align="center">  

![](./images/remix-6.png)  
Fig. 6 - Selecting an account to interact with Remix </p>  
 
Click `Connect` to connect to this account (Fig. 7).  

<p align="center">  

![](./images/remix-7.png)  
Fig. 7 </p>  

### Step 5. Deploy a smart contract in Solana Testnet

In the left side menu, select `Deploy & run transactions`. The `DEPLOY & RUN TRANSACTIONS` menu will become active.  

In our case there is only one smart contract to deploy. Therefore, it is automatically selected from the dropdown and Remix will automatically generate a transaction.  

The `Account` field will display the amount in the wallet account. This data is taken from MetaMask.  

Click `Deploy` (Fig. 8).  

<p align="center">  

![](./images/remix-8.png)  
Fig. 8 - Deploying the smart contract </p>  

MetaMask will send a notification in the form of a pop-up window to confirm the transaction. Click `Confirm` (Fig. 9).  

<p align="center">  

![](./images/remix-9.png)  
Fig. 9 - MetaMask notification </p>  

Once the transaction is confirmed, you can check it in the messages on the bottom right (Fig. 10).  

<p align="center">  

![](./images/remix-10.png)  
Fig. 10 </p>  

After successfully deploying the smart contract, you will see a message containing the name and address of the smart contract where it was uploaded (Fig. 11).  

<p align="center">  

![](./images/remix-11.png)  
Fig. 11 - Deployed the smart contract data </p>  

If all the steps have been completed successfully, a green icon will appear near the `Deploy & run transactions` button (Fig. 12).

<p align="center">  

![](./images/remix-12.png)  
Fig. 12 - Final view of the Remix panel </p>  

Congratulations! You can now call methods of the helloWorld smart contract deployed on the Solana Testnet (Fig. 13 shows the result of your smart contract — the text string "Hello World!").  

<p align="center">  

![](./images/remix-13.png)  
Fig. 13 - Calling the smart contract methods </p>  

----  

> **Useful links**  
> https://ethereum.org/en/developers/tutorials/deploying-your-first-smart-contract/
