---
title: Transfer Tokens Between Solana and EVMs
---

The ERC-20 wrapper allows users to manipulate balances inside SPL tokens. The user runs an application inside the Neon EVM with logic that releases new coins. To transfer these coins to the outside world, they need to use the ERC-20 bridge implementation. Inside the Neon EVM, these coins will be blocked and transferred inside the SPL token to different addresses. They will become liquid inside Solana, but under a different token name, which is registered inside Solana.

A user can also transfer part of the funds to their balance inside Neon EVM and convert it into a new token using a token exchange algorithm of their choice.

<div className='neon-img-box-600' style={{textAlign: 'center'}}>

![](./img/sol-evm.png)

Fig. 1 — Process for transferring tokens between Solana and Ethereum.

</div>

Ethereum tokens are generated in accordance with the ERC-20 standard. Therefore, to transfer tokens between the Solana and Ethereum blockchains, a separate ERC-20 wrapper must be deployed for each Solana token. The ERC-20 wrapper’s job is to ensure that the Solana applications interact with EVM (Solidity, Vyper, etc.) bytecode contracts, as well as to transfer funds in Solana tokens using Ethereum wallets such as MetaMask.

The main interacting component in the token transfer is the ERC-20 bridge, which is a separate contract. When it’s called, it generates a Solana token, which represents the corresponding ERC-20 token in the SPL token contract. The Solana tokens registered in the SPL token contract can be transferred to Solana contracts.
Bridge operators are responsible for the ERC-20 bridge operation. They get fees from the conversion of tokens.
