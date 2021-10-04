# Unsupported Tokens in Neon EVM

### Problem
In Testnet and Devnet, Neon EVM operates with those tokens that comply with the [ERC20](https://doc.neonlabs.org/docs/glossary#erc20) standard. Non-fungible tokens (NFT) generated in accordance with the [ERC721](https://doc.neonlabs.org/docs/glossary#erc721) standard are not processed by Neon EVM.

### Details
To support the [ERC20](https://doc.neonlabs.org/docs/glossary#erc20) token type, a separate component is implemented in the form of a wrapper over the Solana system frame named *[SPL Token](https://doc.neonlabs.org/docs/glossary#spl_token)*. This wrapper uses the API to access the SPL-token methods to obtain the account balance data.

To transfer tokens, wrapper calls the corresponding instruction in *[SPL Token](https://doc.neonlabs.org/docs/glossary#spl_token)*, which transfers funds from one account balance to another. Currently the wrapper is implemented to support the instruction set only of the RC20 standard.

### What happens if a user transfers NFT tokens from Ethereum to Solana
In this case, a contract will be created in Neon EVM to work with this type of tokens. Processing these tokens in *[SPL Token](https://doc.neonlabs.org/docs/glossary#spl_token)* will not comply with the standard adopted in Ethereum.

If you use the [ERC721](https://doc.neonlabs.org/docs/glossary#erc721) contract implemented in Ethereum, compile and run it in Neon EVM, then the tokens generated using this contract can only be liquid within the Neon EVM. These tokens cannot be transferred anywhere, including to the exchange, since there is no standard in Solana that supports this type of token. As a result, the tokens will not have any value.

### Proposed solution to support operations on non-fungible tokens in Neon EVM
It is proposed to integrate the [ERC721](https://doc.neonlabs.org/docs/glossary#erc721) standard with the core of those programs that work inside Solana.