---
title: Neon Transfer SDK
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: todo this requires overhaul
---

**NOTE**

The package is tested on [NeonPass](https://neonpass.live/) codebase, which use react hooks arch.
You can use clean core, but all important requirements you need to provide as params and see how it goes by yourself.

---

Module was used by the react wrapper `import {useNeonTransfer} from "neon-portal/src/react"`
For clean working configuration example we have to rebuild connect status buttons, their transfer callbacks and error handling.

## Installation and setup

Firstly, install the package:

```sh
npm install neon-portal --save
```

### For native

After installing you need to pass some required properties, when calling new instance, for properly working. Neon wallet interface based on Metamask. Module checks, is wallet objects - window.solana and window.ehtereum - really exists. If not - module will throw an error for you.  So, besides Solana Phantom wallet you need to connect Metamask wallet and get both user addresses, which you need to pass as properties.

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
    You can pass events as properties,
    but this functions will be call at portal context.
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

|                  Property name |   Type   |                                                                                                            Description                                                                                                            | is required |
|-------------------------------:| :------: |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|------------:|
|            solanaWalletAddress |  String  |                                                                                                    Address from solana wallet                                                                                                     |        true |
|              neonWalletAddress |  String  |                                                                                     Address of preconfigured for neon network metamask wallet                                                                                     |        true |
|                           web3 |  Object  |                                                                    Connection module of ethereum web3 framework. It needs for use Neon SDK network connection.                                                                    |        true |
|                     connection |  Object  |                       connection module of solana web3 framework. You have to provide your own connection, if it exists. Cause of context, if you won't, it should start working for other solana networks.                       |        true |
|     onBeforeCreateInstructions | function |                                                                   Function, which calls on start of init transfer functions. It uses in both transfer functions                                                                   |       false |
| onCreateNeonAccountInstruction | function |                                                       Function, which calls on instructions building, if neon account didn't find. It uses in transfer to neon from solana.                                                       |       false |
|        onBeforeSignTransaction | function |                                                                 Function, which calls before transaction will be sign by solana wallet. It uses in both transfers                                                                 |       false |
|               onBeforeNeonSign | function |                                                            Function, which calls before metamask will approve transfer. It uses when you transfer from neon to solana.                                                            |       false |
|                  onSuccessSign | function |       Function, which calls after sign the transfer. When you use it on transfer to neon, function get one argument - solana transaction sign. On transfer to solana it provides two arguments. Solana and Neon signatures.       |       false |
|                    onErrorSign | function |                                                                                 Function, which calls, if wallet throw an error after try to sign                                                                                 |       false |


### For React

You can use hook from package. This hook apply event parameters as object for argument. For clean code You should create your own hook and manipulate your states here.


Here is an example:


``` javascript
export const useTransfering = () => {
  const { setPending, setSign, setError } = useStates()
  const { publicKey } = useWallet()
  const { account, library } = useWeb3React();
  // please, add your own custom solana connection, if you use it in the context of your app. Pass it as second argument at neon transfer hook.
  const connection = useConnection()
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
    sig - phantom signature (solana)
    txHash - neon approve signature when transfer to solana
    */
      onSuccessSign: (sig, txHash) => {
        setSign(sig, txHash)
        setTransfering(false)
      },
      onErrorSign: (e) => {
        setError(e.message)
        setPending(false)
      },
      // yes, there
    },
    connection,
    library, // Web3 Library instance  
    publicKey, // you Phantom wallet public key
    account // you Metamask wallet public key
  )
  return { createNeonTransfer, createSolanaTransfer }
}
```
