# Unsupported Tokens in Neon EVM

### Problem
In Testnet and Devnet, Neon EVM operates with those tokens that comply with the [ERC-20](https://doc.neon-labs.org/docs/glossary#erc-20) standard. Non-fungible tokens (NFT) generated in accordance with the [ERC-721](https://doc.neon-labs.org/docs/glossary#erc-721) standard are not processed by Neon EVM.

### Details
To support the [ERC-20](https://doc.neon-labs.org/docs/glossary#erc-20) token type, a separate component is implemented in the form of a wrapper over the Solana system frame named *[SPL Token](https://doc.neon-labs.org/docs/glossary#solana-program-library-token-spl-token)*. This wrapper uses the API to access the SPL-token methods to obtain the account balance data.

To transfer tokens, wrapper calls the corresponding instruction in *[SPL Token](https://doc.neon-labs.org/docs/glossary#solana-program-library-token-spl-token)*, which transfers funds from one account balance to another. Currently the wrapper is implemented to support the instruction set only of the ERC-20 standard.

### What happens if a user transfers NFT tokens from Ethereum to Solana
In this case, a contract will be created in Neon EVM to work with this type of tokens. Processing these tokens in *[SPL Token](https://doc.neon-labs.org/docs/glossary#solana-program-library-token-spl-token)* will not comply with the standard adopted in Ethereum.

If you use the [ERC-721](https://doc.neon-labs.org/docs/glossary#erc-721) contract implemented in Ethereum, compile and run it in Neon EVM, then the tokens generated using this contract can only be liquid within the Neon EVM. These tokens cannot be transferred anywhere, including to the exchange, since there is no standard in Solana that supports this type of token. As a result, the tokens will not have any value.

### Proposed solution to support operations on non-fungible tokens in Neon EVM
It is proposed to integrate the [ERC-721](https://doc.neon-labs.org/docs/glossary#erc-721) standard with the core of those programs that work inside Solana.