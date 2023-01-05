---
title: How It Works
---

<div className='neon-img-box-300' style={{textAlign: 'center', width: 900, display: 'block', margin: 'auto'}}>

![](img/how_it_works.png)

</div>

1. User sends signed Ethereum-like Tx (using an Ethereum-compatible wallet) to Neon RPC end-point  ([How to Connect to Neon RPC](/docs/wallet/metamask_setup))
2. Neon Proxy
   * Estimates gas usage for transaction execution
   * Wraps Ethereum-like Tx into Solana Tx
   * Sends it to Solana RPC, calling Neon EVM program
   * Extracts Neon EVM receipt from Solana receipt and passes it to the client
3. Neon EVM program
   * Unwraps Ethereum-like Tx and **checks user signature**
   * Loads EVM state, including account data and smart contracts code, from Solana storage
   * Executes Ethereum-like Tx inside Solana BPF
   * Saves new EVM state back into Solana state
