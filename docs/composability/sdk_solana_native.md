---
title: SDK Solana Native
proofedDate: 20241903
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


### Neon Solana Signature Demo
The Neon Solana Signature Demo is a web-based application that illustrates the process of signing messages and transactions on the Solana blockchain using the Neon EVM. This demo serves as an educational tool for developers aiming to understand the integration of Solana’s signing mechanisms within Ethereum-compatible environments.

#### Accessing the Demo
The application is accessible at: (https://neon-solana-signature-demo.neontest.xyz/)

#### Application Flow
1. Wallet Connection:
	•	Upon accessing the demo, users are prompted to connect their Solana-compatible wallet (e.g., Phantom).
	•	The application detects the wallet and establishes a connection, enabling interaction with the user’s Solana account.
2. Message Signing:
  •	Users can input a custom message into the provided text field.
  •	By clicking the “Sign Message” button, the application sends a signature request to the connected wallet.
  •	The wallet prompts the user to approve the signing request.
  •	Once approved, the application displays the signed message and its corresponding signature.
3.	Transaction Signing:
  •	The demo allows users to create a sample transaction, such as transferring a nominal amount of SOL to a predefined address.
  •	Upon initiating the transaction, the application constructs the transaction object and sends a signing request to the connected wallet.
  •	The wallet prompts the user to approve the transaction.
  •	After approval, the signed transaction is displayed, and users have the option to submit it to the Solana network.
4.	Signature Verification:
  •	The application provides functionality to verify the authenticity of signed messages.
  •	Users can input a signed message and its signature to validate that the signature corresponds to the original message and was signed by the correct public key.

#### Integration Insights
  Developers can utilize the concepts demonstrated in this application to integrate Solana’s signing functionalities into their own dApps. Key takeaways include:
  •	Establishing connections with Solana-compatible wallets.
  •	Constructing and signing messages and transactions programmatically.
  •	Handling user approvals and displaying transaction outcomes.
GitHub Repository: The source code for the Solana signature demo can be found on GitHub (https://github.com/neonlabsorg/neon-solana-signature-demo)

### Swap UI Demo — Step-by-Step Guide
This guide describes how to perform a token swap using the Neon EVM Swap UI Demo (https://neon-solana-signature-demo.neontest.xyz/).
#### Step 1: Open the Swap Demo Interface
	•	Navigate to https://neon-solana-signature-demo.neontest.xyz.
	•	You’ll see the Swap Demo interface.
	•	Choose the desired contract version (e.g., v2 for the latest demo).
	•	You will see fields to select:
	  • Token to swap from (e.g., USDC (v2 Demo))
	  •	Token to swap to (e.g., wSOL (v2 Demo))

#### Step 2: Connect Your Wallet
  •	Click the “Select Wallet” button in the top-right corner.
  •	Connect your preferred Solana-compatible wallet (e.g., Phantom).
  •	After connection, the token balances (e.g., USDCV2DEMO, wSOLV2DEMO) will be displayed.
  •	You should be in Testnet Mode (displayed in the wallet interface).

#### Step 3: Initiate a Swap
  •	Enter the amount of the source token you wish to swap (e.g., 10 USDC).
  •	Click the Swap (⇄) button.
  •	The app will prompt your wallet to confirm the transaction.
    
#### Step 4: Confirm Transaction in Wallet
  •	Approve the transaction in your wallet (e.g., Phantom).
  •	Once confirmed, the transaction will be processed via Neon EVM.

#### Step 5: View Success Confirmation
  •	After successful execution, a “Success” message will appear in the UI.
  •	Token balances in your wallet will update accordingly.

#### Step 6: Verify on Neonscan
	•	You can verify your swap transaction on Neonscan(https://neonscan.org) by:
	 •	Copying your wallet address.
	 •	Searching it in Neonscan to view the transaction history and status.
