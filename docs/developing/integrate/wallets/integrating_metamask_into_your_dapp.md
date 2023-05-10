---
title: MetaMask
---

## Introduction

This guide goes through the process of integrating MetaMask into your dApp so that users of your dApp can click on a `Connect to Neon` button and be prompted to connect to your dApp via MetaMask in an intuitive and accessible manner.

This guide assumes proficiency in JavaScript.

## Full JavaScript Code

This code is also available on [CodeSandbox](https://codesandbox.io/s/autumn-sky-0gkxs4).

```javascript
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
            chainName: "Neon DevNet",
            nativeCurrency: {
              name: "NEON",
              symbol: "NEON",
              decimals: 9
            },
            rpcUrls: ["https://proxy.devnet.neonlabs.org/solana"],
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
