---
title: Unsupported Tokens in the Neon EVM
proofedDate: na
iterationBy: na
includedInSite: false
approvedBy: na
comment: 
---

### Problem
In Testnet and Devnet, the Neon EVM operates with tokens that comply with the [ERC-20](about/terminology.md#erc-20) standard. Non-fungible tokens (NFTs) generated in accordance with the [ERC-721](about/terminology.md#erc-721) standard are not processed by the Neon EVM.

### Details
To support the [ERC-20](about/terminology.md#erc-20) token type, a separate component is implemented in the form of a wrapper over the Solana system frame named *[SPL Token](about/terminology.md#spl-token)*. This wrapper uses the API to access the SPL-token methods to obtain the account balance data.

To transfer tokens, the wrapper calls the corresponding instruction in *[SPL Token](about/terminology.md#spl-token)*, which transfers funds from one account balance to another. Currently the wrapper is implemented to support only the instruction set of the ERC-20 standard.

### What happens if a user transfers NFT tokens from Ethereum to Solana?
In this case, a contract will be created in Neon EVM to work with these types of tokens. Processing these tokens in *[SPL Token](about/terminology.md#spl-token)* will not comply with the standard adopted in Ethereum.

If you use the [ERC-721](about/terminology.md#erc-721) contract implemented in Ethereum and compile and run it in the Neon EVM, then the tokens generated using this contract can only be liquid within the Neon EVM. These tokens cannot be transferred anywhere, including to the exchange, since there is no standard in Solana that supports this type of token. As a result, the tokens will not have any value.

### Proposed Solution to Support Operations on Non-fungible Tokens in Neon EVM
It is proposed to integrate the [ERC-721](about/terminology.md#erc-721) standard with the core of those programs that work inside Solana.
