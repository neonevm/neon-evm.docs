---
title: WalletConnect
proofedDate: 20230427
iterationBy: HB
includedInSite: true
approvedBy: na
comment: TODO suggest a boilerplate ReactApp such as codepen be setup as an example to refer to -- this will then allow better support at Step 4 " connect your preferred wallet with Neon EVM DevNet within the WalletConnect interface. " to be included rather than just alluded to
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import devnet from '@site/static/img/doc-images/developing/integrate/protocols/walletconnect/devnet.png';
import projectid from '@site/static/img/doc-images/developing/integrate/protocols/walletconnect/projectid.png';
import connected from '@site/static/img/doc-images/developing/integrate/protocols/walletconnect/connected.png';


## Introduction

[WalletConnect](https://docs.walletconnect.com/2.0/) is a protocol providing a decentralized standard to connect Web3 wallets and dApps.

This guide lays out a step-by-step process to configure a React or HTML dApp on NeonEVM using WalletConnect's [Web3Modal SDK](https://docs.walletconnect.com/2.0/web3modal/about).

Web3Modal is a library that allows users to connect to any dApp via the WalletConnect interface. Check out its code on [GitHub](https://github.com/WalletConnect/web3modal). Web3Modal supports:

- [React](https://docs.walletconnect.com/2.0/web3modal/react/installation)
- [HTML](https://docs.walletconnect.com/2.0/web3modal/html-js/installation)
- [Standalone sign](https://docs.walletconnect.com/2.0/web3modal/advanced/standalone/sign/installation) / [Standalone auth](https://docs.walletconnect.com/2.0/web3modal/advanced/standalone/auth/installation)


## Get Started

### Step 1: Create a project 

Log into [WalletConnect Cloud](https://cloud.walletconnect.com/) to create a new project and copy the Project ID. 
 
<!-- following text style works -- not convinced image class is working >> alt is to use  docusaurus method -- but that means keeping images in static folder NOT granular as per current method applied in this site https://docusaurus.io/docs/static-assets -->

> <img src={projectid} width="450" />


### Step 2: Configure your project's chain

From WalletConnect's project page:

2.1 Click the **Explorer** tab and select the Neon chain you require from the **Chains** drop-down. For this guide, we will use the Neon EVM DevNet.

> <img src={devnet} width="400" />


### Step 3: Configure your app

For this guide, we are configuring a React App. 
<!-- yet we also provide a pure HTML path, yes?? -->

3.1 Install the required packages into your app:


<Tabs>
  <TabItem value="npm" label="npm" default>

```npm install @web3modal/ethereum @web3modal/react wagmi ethers@^5```
  </TabItem>
  <TabItem value="yarn" label="yarn">

```yarn add @web3modal/ethereum @web3modal/react wagmi ethers@^5```
  </TabItem>
</Tabs>


3.2 Set `projectId`={your_project_ID} in your .env file.

3.3 Import the following packages in your app.js file:

```
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { neonDevnet } from '@wagmi/chains'


const chains = [neonDevnet]
const projectId = “<import_from_env>”


const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)
```

3.4 Pass your ethereumClient and `projectId` to the Web3Modal component:

<Tabs>
  <TabItem value="React/Next" label="React/Next" default>

```JS
function App() 
  {
   return (
     <>
       <WagmiConfig client={wagmiClient}>
         <HomePage />
       </WagmiConfig>


       <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
     </>
   )
  }
```
  </TabItem>
  <TabItem value="HTML" label="HTML">

```HTML
export const web3Modal = new Web3Modal(
 {
   projectId,
 },
 ethereumClient
);

index.html

<body>
   <div id="app">
     <w3m-core-button></w3m-core-button>
   </div>
   <script type="module" src="main.js"></script>
 </body>
 ```
  </TabItem>
</Tabs>


### Step 4: Connect your wallet

Start your application:
 `npm start`/`yarn start`  

You may now  connect your preferred wallet with Neon EVM DevNet within the WalletConnect interface. 

<!-- would like to support the end user with details for this step also -->

> <img src={connected} width="300" />

