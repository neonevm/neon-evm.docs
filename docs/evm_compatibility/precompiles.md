---
title: Precompiles
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: We need to get the custom precompile addresses
---

## Precompiled EVM contracts

Neon EVM supports the majority of Ethereum's [precompiled contracts](https://www.evm.codes/precompiled?fork=merge)

| Address | Name             | Compatibility                        |
| ------- | ---------------- | ------------------------------------ |
| 0x01    | ecRecover        | ![Supported](img/done.ico)           |
| 0x02    | SHA2-256         | ![Supported](img/done.ico)           |
| 0x03    | RIPEMD-160       | ![Supported](img/done.ico)           |
| 0x04    | identity         | ![Supported](img/done.ico)           |
| 0x05    | modexp           | ![Not Supported](img/false-copy.png) |
| 0x06    | ecAdd            | ![Supported](img/done.ico)           |
| 0x07    | ecMul            | ![Supported](img/done.ico)           |
| 0x08    | ecPairing        | ![Supported](img/done.ico)           |
| 0x09    | blake2f          | ![Supported](img/done.ico)           |
| 0x0a    | point evaluation | ![Not Supported](img/false-copy.png) |


Neon EVM extends EVM functionality with custom precompiles that enable integration with Solana's advanced features. The table below details each precompile:

| Address                                    |	Purpose                                                                                                |	Use case                                                                                                              |	Code reference                                                                                                       |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 0xff00000000000000000000000000000000000001 |	Deprecated – Previously supported ERC20ForSPL.  No longer in use.                                      | Not applicable.                                                                                                        |	Not available.                                                                                                       |
| 0xff00000000000000000000000000000000000002 |	Reads data from Solana accounts by specifying byte offsets and lengths.	                               | Enables integrations with Chainlink and Pyth by extracting precise account data.                                       |	[QueryAccount.sol](https://github.com/neonlabsorg/neon-contracts/blob/main/contracts/precompiles/QueryAccount.sol)   |
| 0xff00000000000000000000000000000000000003 |	Facilitates native token transfers between Neon and Solana.                                            |	Powers NeonPass and the @neonevm/token-transfer-core library for seamless token transfers.                            |	[INeonWithdraw.sol](https://github.com/neonlabsorg/neon-contracts/blob/main/contracts/precompiles/INeonWithdraw.sol) |
| 0xff00000000000000000000000000000000000004 |	Acts as a Solidity interface to the SPLToken program on Solana.                                        |	Allows Solidity developers to mint, transfer, and manage SPLTokens directly within the Neon EVM.                      |	[ISPLToken.sol](https://github.com/neonlabsorg/neon-contracts/blob/main/contracts/precompiles/ISPLToken.sol)         |
| 0xff00000000000000000000000000000000000005 |	Provides a Solidity interface for the Metaplex program on Solana.                                      |	Empowers developers to set and manage metadata for SPLTokens, enabling advanced token customization.                  |	[IMetaplex.sol](https://github.com/neonlabsorg/neon-contracts/blob/main/contracts/precompiles/IMetaplex.sol)         |
| 0xff00000000000000000000000000000000000006 |	Enables composability by initiating Solana instructions and receiving responses at the Solidity level. |	Supports various actions such as SPLToken transfers, DEX swaps, and interactions with Solana-based lending protocols. |	[ICallSolana.sol](https://github.com/neonlabsorg/neon-contracts/blob/main/contracts/precompiles/ICallSolana.sol)     |
