---
title: SDK Solana Native
proofedDate: 20241312
iterationBy: na
includedInSite: false
approvedBy: na
comment:
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Library for Scheduled Neon EVM Transactions
Note: This package is under development, runs on the Neon test environment, and is not ready for production use.

[Solana Signer SDK Documentation](http://solana-signer.sdk.neonevm.org/)

### Installation and Testing
#### Install dependencies:
```
yarn install
```
#### Build the project:
```
yarn build
```
#### Run Tests:
Navigate to the packages/core folder and run:
```
yarn test
```
### Usage
#### Initialization

#### Setup Solana and Neon Providers:
```
const result = await getProxyState('<neon_proxy_rpc_url>');
const token = getGasToken(result.tokensList, NeonChainId.testnetSol);

const connection = new Connection('<solana_rpc_url>', 'confirmed');
const provider = new JsonRpcProvider('<neon_proxy_rpc_url>');
const neonClientApi = new NeonClientApi('<neon_client_api_url>');
const neonProxyRpcApi = result.proxyApi;
const neonEvmProgram = result.evmProgramAddress;

const chainId = Number(token.gasToken.tokenChainId);
const chainTokenMint = new PublicKey(token.gasToken.tokenMint);
```
#### Connect a Solana Wallet:
Example using Keypair:

```
const solanaPrivateKey = bs58.decode('<you_private_key_base58>');
const keypair = Keypair.fromSecretKey(solanaPrivateKey);
const solanaUser = SolanaNeonAccount.fromKeypair(
    keypair,
    neonEvmProgram,
    chainTokenMint,
    chainId
);
await solanaAirdrop(connection, solanaUser.publicKey, 1e9);
```
### Creating and Sending a Scheduled Transaction
#### Retrieve Nonce for Neon Wallet:
```
const nonce = Number(await neonProxyRpcApi.getTransactionCount(solanaUser.neonWallet));
```
#### Create a Scheduled Transaction:
```
const scheduledTransaction = new ScheduledTransaction({
    nonce: toBeHex(nonce),
    payer: solanaUser.neonWallet,
    target: '<contract_address>',
    callData: '<call_contract_data>',
    maxFeePerGas: toBeHex(0x77359400),
    chainId: toBeHex(NeonChainId.testnetSol)
});
```
#### Prepare Solana Transaction:
```
const transaction = await createScheduledNeonEvmTransaction({
    chainId,
    signerAddress: solanaUser.publicKey,
    tokenMintAddress: solanaUser.tokenMint,
    neonEvmProgram,
    neonWallet: solanaUser.neonWallet,
    neonWalletNonce: nonce,
    neonTransaction: scheduledTransaction.serialize()
});
```
#### Ensure Solana Balance Account is Initialized:
```
const account = await connection.getAccountInfo(solanaUser.balanceAddress);
if (account === null) {
    transaction.instructions.unshift(
        createBalanceAccountInstruction(
            neonEvmProgram,
            solanaUser.publicKey,
            solanaUser.neonWallet,
            solanaUser.chainId
        )
    );
}
```
#### Sign and Send the Transaction:
```
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;
transaction.sign({
    publicKey: solanaUser.publicKey,
    secretKey: solanaUser.keypair
});
const signature = await connection.sendRawTransaction(transaction.serialize());
console.log('Transaction signature', signature);
```
#### Monitor Scheduled Transaction Execution:
```
const [transaction] = await neonClientApi.waitTransactionTreeExecution(
    solanaUser.neonWallet,
    nonce,
    5e3
);
const { status, transaction_hash, result_hash } = transaction;
console.log('Scheduled transaction result', transaction);
console.log(await neonProxyRpcApi.getTransactionReceipt(`0x${transaction_hash}`));
```
### Building Documentation
To generate the documentation using TypeDoc:

#### Build All Packages:
```
yarn build:all
```
#### Generate Documentation:
```
yarn build:docs
```

### Components
#### Contracts

Initialization:
	•	Deploy contracts using:
```
yarn setup
```
•	Define and initialize contracts for scheduled transactions:
```
const baseContract = new BaseContract(chainId);
```
#### Example:
```
const scheduledTransaction = new ScheduledTransaction({
    nonce: toBeHex(nonce),
    payer: solanaUser.neonWallet,
    target: baseContract.address,
    callData: baseContract.transactionData(solanaUser.publicKey),
    chainId: toBeHex(NeonChainId.testnetSol)
});
```
#### Core
•	Provides functions for creating and sending Scheduled transactions.
Tests:
Navigate to packages/core and execute:
```
yarn test
```
#### UI
Configuration:
Define .env variables:
```
REACT_APP_SOLANA_URL=<solana_rpc_url>
REACT_APP_NEON_CORE_API_RPC_URL=<neon_core_api_rpc_url>
REACT_APP_NEON_CORE_API_URL=<neon_core_api_url>
```
Run the Project:
```
yarn install
yarn start
```
#### Configuration
Utilize tsconfig files to specify build targets and module configurations.

### Contributors
•	@oable (Igor Prokopev)
•	@eubash (Evgeniya)

### Languages
•	TypeScript: 59.6%
•	Solidity: 40.2%
•	JavaScript: 0.2%

For detailed implementation and updates, refer to the GitHub repository (https://github.com/neonlabsorg/neon-solana-signer)
