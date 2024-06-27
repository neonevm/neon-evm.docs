---
title: 'ICallSolana Interface'
proofedDate: 20240627
iterationBy: na
includedInSite: false
approvedBy: na
---

## Introduction

To use the **Composability** feature of Solana, let us learn about the interface and the functions included in the interface that will be used to interact with the Solana programs via the precompile `0xFF00000000000000000000000000000000000006`.

The interface contract `ICallSolana.sol` can be found in this [Github Repository](https://github.com/neonlabsorg/neon-tutorials/blob/add/call-solana/hardhat/contracts/TestCallSolana/interfaces/ICallSolana.sol).

## Struct Variables

1. `AccountMeta` : For each account needed by an instruction, the following details must be provided -
   - **account:** The account's on-chain address in bytes32.
   - **is_writable:** Indicates if the account's data will be modified in boolean.
   - **is_signer:** Indicates if the account needs to sign the transaction in boolean.
2. `Instruction` : Instruction struct variable includes the following -
   - **program_id:** The address of the program that contains the execution logic for the invoked instruction.
   - **accounts:** Contains the AccountMeta for each account required by an instruction.
   - **instruction_data:** The instruction data as a buffer of bytes.

## Functions

| getNeonAddress(address) -> bytes32                                                 |
| :--------------------------------------------------------------------------------- |
| This function returns the Solana address in bytes32 format for a Neon EVM address. |

| getResourceAddress(bytes32 salt) -> bytes32                                                                     |
| :-------------------------------------------------------------------------------------------------------------- |
| This function returns the Solana address in bytes32 format of a resource represented by the salt for contracts. |

| createResource(bytes32 salt, uint64 space, uint64 lamports, bytes32 owner) -> bytes32                                              |
| :--------------------------------------------------------------------------------------------------------------------------------- |
| This function creates a resource with the specified salt and returns the Solana address of the created resource in bytes32 format. |

| getSolanaPDA(bytes32 program_id, bytes memory seeds) -> bytes32                                               |
| :------------------------------------------------------------------------------------------------------------ |
| This function returns the Solana PDA in bytes32 format generated from the specified `program_id` and `seeds`. |

| getExtAuthority(bytes32 salt) -> bytes32                                                                      |
| :------------------------------------------------------------------------------------------------------------ |
| This function returns the Solana address in bytes32 format of the external authority represented by the salt. |

| getPayer() -> bytes32                                                                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This function returns the Solana address of the payer account in bytes32 format. payer account is required if an instruction needs an account to fund newly created accounts. |

| execute(uint64 lamports, Instruction memory instruction) -> bytes                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| This function executes the instruction with a call to the Solana program and returns the data of the executed instruction in bytes format. The `lamports` parameter specifies the amount of lamports that will be required to create new accounts during execution. These lamports are transferred to the `payer` account. The `instruction` parameter is the struct variable with the values of program_id, accounts and instruction_data. |

| executeWithSeed(uint64 lamports, bytes32 salt, Instruction memory instruction) -> bytes                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This function executes the instruction with a call to the Solana program and returns the data of the executed instruction in bytes format. The `lamports` parameter specifies the amount of lamports that will be required to create new accounts during execution. These lamports are transferred to the `payer` account. The `salt` parameter is to generate an address of external authority. The `instruction` parameter is the struct variable with the values of program_id, accounts and instruction_data. |

| execute(uint64 lamports, bytes memory instruction) -> bytes                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This function executes the instruction with a call to the Solana program and returns the data of the executed instruction in bytes format. The `lamports` parameter specifies the amount of lamports that will be required to create new accounts during execution. These lamports are transferred to the `payer` account. The `instruction` is the bincode serialized instruction which needs to be executed. This method uses PDA of the sender to authorize the operation. |

| executeWithSeed(uint64 lamports, bytes32 salt, bytes memory instruction) -> bytes                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This function executes the instruction with a call to the Solana program and returns the data of the executed instruction in bytes format. The `lamports` parameter specifies the amount of lamports that will be required to create new accounts during execution. These lamports are transferred to the `payer` account. The `salt` parameter is to generate an address of external authority. The `instruction` is the bincode serialized instruction which needs to be executed. This method uses external authority to authorize the operation. |

| getReturnData() -> bytes32, bytes                                                                                                                                          |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| This function returns the `program_id` and returned data of the last executed instruction. Note: This method should be called after `execute` / `executeWithSeed` methods. |
