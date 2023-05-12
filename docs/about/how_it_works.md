---
title: How It Works
proofedDate: 20230427
iterationBy: HB
includedInSite: true
approvedBy: YYY
comments: #1 TODO see inline comment 2.3
---

import architecture from '@site/static/img/doc-images/about/how-it-works.png';

<div className='neon-img-box-300' style={{textAlign: 'center', width: 900, display: 'block', margin: 'auto'}}>

<img src={architecture} />

</div>

This page provides a high-level overview of how Neon coordinates communication between Ethereum dApps and Solana.

## Neon's transaction lifecycle

Effecting a user-initiated transaction (tx) from an Ethereum dApp on Solana requires three main steps:

1. The user initiates a tx. A tx is a signed Ethereum-like tx directed to a Neon RPC endpoint.  

> See [How to Connect to the Neon RPC](/docs/wallet/metamask_setup) via an Ethereum-compatible wallet.

The Ethereum API passes the tx to the Neon Proxy via the [Neon API service](https://docs.neon-labs.org/docs/developing/connect_rpc).

2. This request is received by the Neon Proxy.

   > 2.1 The Neon Proxy processes the request, providing:
   > - Gas usage estimate for tx execution
   > - Broadcast initiation: wrapping the Ethereum-like tx as a Solana tx
   
   > 2.2. The Neon Proxy passes the wrapped tx to the Neon EVM program hosted on Solana. This results in the following:
   > - A Solana receipt
   > - A corresponding Neon EVM receipt
     
   > 2.3 The Neon smart contract then:   
   > - Unwraps the tx and checks the user's signature
   > - Loads the EVM state, including account data and the smart contract's code, from Solana storage
   > - Executes the tx inside [Solana BPF](https://docs.solana.com/developing/runtime-facilities/programs#bpf-loader)
   > - Updates Solana's state to reflect the new Neon EVM state 
   <!-- missing logical link here as tx execution impact on Neon EVM not made clear -->

3. Solana and Neon EVM undertake a state change.

This completes the tx request.
