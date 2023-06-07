---
title: Neon Transfer SDK
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: todo this requires overhaul 
---

This page provides you with the information required to pass tokens between Solana and Neon EVM programmatically. 

## TL;DR

- The tool is available as an npm package
- The package provides the same function as the [NeonPass UI](https://devnet.neonpass.live)

## Introduction

The following npm package provides a token pass tool: the same package provides the functionality to [NeonPass UI](https://devnet.neonpass.live). It's built to be compliant with the React hooks architecture, but you are welcome to use clean core functions.

You need to provide the addresses for a Solana-compatible wallet such as a Phantom wallet and an EVM-compatible wallet such as a MetaMask wallet. Both of these addresses are passed as required properties. The module checks whether both wallet objects: window.solana and window.ethereum, exist. If they don't, it throws an error. 

<!-- Is this relevant to end user?
  For clean working configuration example we have to rebuild connect status buttons, their transfer callbacks and error handling. -->

## Step 1: install and setup

Firstly, install the package:

```sh
npm install neon-portal --save
```

## Step 2: understand the parameters

The following table provides details of the required and optional parameters. 


|Property name |   Type|Description| is required |
|:-------------|:------:|:------------------------------------------------------------------------------:|:------------|
|solanaWalletAddress |  String  |Address for Solana-compatible wallet  |        true |
|neonWalletAddress |  String  | Address of existing EVM-compatible wallet associated with a Neon Account | true |
|web3 | Object| Connection module of Ethereum Web3.js framework. Connects the App to the Neon EVM network.| true |
|connection |  Object  | Connection module of Solana-Web3.js framework. You may connect to your own node if you have one. Else you will be provided with the default RPC.|        true |
|onBeforeCreateInstructions | function |Function executed at the start of transfer intitation. It's used in both transfer functions (`createNeonTransfer` and `createSolanaTransfer`).  | false |
|onCreateNeonAccountInstruction | function | Function, executed on instruction build <!-- todo find out more --> | false |
|onBeforeSignTransaction | function | Function called before transaction is signed by Solana-compatible wallet. <!-- todo unpack whether is used by "both" txs -->| false |
|onBeforeNeonSign | function |Function used when you transfer from Neon EVM to Solana. Called before request for tx approval.    |       false |
|onSuccessSign | function | Function, that extracts signatures after the tx is signed. With transfer to Neon, the function requires one argument - the Solana transaction signature. On transfer to Solana, it requires two arguments: Solana and Neon signatures. <!-- todo follow up and verify that this is genuine --> |false |
|onErrorSign | function | Function called if wallet throws an error after sign attempt. |false |

## Examples

### Vanilla JS

```javascript
import { NeonPortal } from "neon-portal"
//for transfer ERC20 tokens use:
import { MintPortal } from "neon-portal"

const eventParams = {
  onBeforeSignTransaction: () => {
    /* Your state changes here */
  },
  /* ... */
};
const portal = new NeonPortal({
  solanaWalletAddress: publicKey,
  neonWalletAddress: account,
  customConnection: connection,
  /*
    You can pass events as properties, but these functions will be called at portal context.
  */
  ...eventParams,
});
button.addEventListener("onClick", (e) => {
  /*
    If you want to save context of event function - pass it as first argument
    Else first argument should be undefined
  */
  portal.createNeonTransfer(eventParams, amount, splToken);
});
```

### React

You can use the React hook provided by the package. This hook allows you to pass event parameters as objects. The module can be used by the React wrapper:

```javascript
import {useNeonTransfer} from "neon-portal/src/react"
```


For example:


``` javascript
export const useTransfering = () => {
  const { setPending, setSign, setError } = useStates()
  const { publicKey } = useWallet()
  const { account, library } = useWeb3React();
  // The following function `useConnection` defaults to a publically-available RPC. If you are using your own Solana node in the context of your App, pass the RPC address as a second argument to the neon transfer hook. 
  const connection = useConnection()
  // The next line calls the React hook `useNeonTransfer`, this will import both functions: createNeonTransfer and createSolanaTransfer.
  const { createNeonTransfer, createSolanaTransfer } = useNeonTransfer(
    {
      onBeforeCreateInstruction: () => {
        setPending(true)
      },
      onBeforeSignTransaction: () => {
        setPending(false)
        setTransfering(true)
      },
      /*
    sig - Signature of the sending wallet, i.e. of the user approving the transaction request
    txHash - Identifier of the transaction on Neon EVM <!-- todo need to confirm is this a txHash on Neon NOT on Solana ?? -->
    */
      onSuccessSign: (sig, txHash) => {
        setSign(sig, txHash)
        setTransfering(false)
      },
      onErrorSign: (e) => {
        setError(e.message)
        setPending(false)
      },
    },
    connection,
    library, // Web3 Library instance  
    publicKey, // Phantom wallet public key
    account // MetaMask wallet public key associated with a Neon Account
  )
  return { createNeonTransfer, createSolanaTransfer }
}
```
