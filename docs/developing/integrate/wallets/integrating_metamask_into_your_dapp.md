---
title: MetaMask
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Introduction

This guide goes through the process of integrating MetaMask into your dApp so that users of your dApp can click on a `Connect to Neon` button and be prompted to connect to your dApp via MetaMask in an intuitive and accessible manner.

This guide assumes proficiency in JavaScript.

## Full JavaScript Code

This code is also available on [CodeSandbox](https://codesandbox.io/s/autumn-sky-0gkxs4).

<Tabs>
  <TabItem value="Mainnet" label="Mainnet" default>

```jsx
import detectEthereumProvider from "@metamask/detect-provider";

const configure = async () => {
  const provider = await detectEthereumProvider({ mustBeMetaMask: true });
  if (provider) {
    try {
      await provider.request({ method: "eth_requestAccounts" });
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + (245022934).toString(16),
            chainName: "Neon Mainnet",
            nativeCurrency: {
              name: "NEON",
              symbol: "NEON",
              decimals: 18
            },
            rpcUrls: ["https://neon-proxy-mainnet.solana.p2p.org"],
            blockExplorerUrls: ["https://neonscan.org/"]
          }
        ]
      });
    } catch (e) {
      alert("Error");
      console.error("configure provider error", e);
    }
  } else {
    alert("Please install MetaMask");
  }
};

export default function App() {
  return (
    <div className="App">
      <button onClick={configure}>Connect</button>
    </div>
  );
}
```
</TabItem>

<TabItem value="Devnet" label="Devnet" default>

```jsx
import detectEthereumProvider from "@metamask/detect-provider";

const configure = async () => {
  const provider = await detectEthereumProvider({ mustBeMetaMask: true });
  if (provider) {
    try {
      await provider.request({ method: "eth_requestAccounts" });
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + (245022926).toString(16),
            chainName: "Neon Devnet",
            nativeCurrency: {
              name: "NEON",
              symbol: "NEON",
              decimals: 18
            },
            rpcUrls: ["https://devnet.neonevm.org"],
            blockExplorerUrls: ["https://devnet.neonscan.org"]
          }
        ]
      });
    } catch (e) {
      alert("Error");
      console.error("configure provider error", e);
    }
  } else {
    alert("Please install MetaMask");
  }
};

export default function App() {
  return (
    <div className="App">
      <button onClick={configure}>Connect</button>
    </div>
  );
}
```
</TabItem>
</Tabs>