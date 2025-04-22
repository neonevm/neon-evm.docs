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

📄[Solana Signer SDK Documentation](http://solana-signer.sdk.neonevm.org/)

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


### Solana Native – Use Case Demos
The Neon Solana Signature Demo is a web-based application that illustrates how to sign and send Neon EVM transactions using a Solana wallet. The demo showcases how Solana-native user authentication can be used to interact with Ethereum-compatible smart contracts on Neon EVM. It serves as an educational tool for developers exploring cross-runtime composability between Solana and EVM ecosystems.

#### Demo 1: Simple Swap

Description:  
Use Solana wallet (e.g., Phantom) and Solana-native assets (e.g., USDC, wSOL) to perform token swaps on a DEX running on Neon EVM. This demo shows how Neon EVM allows Solana-native user authentication and asset usage in Ethereum-compatible environments.

📄[Live Demo](https://neon-solana-signature-demo.neontest.xyz/)
📄[GitHub Repository](https://github.com/neonlabsorg/neon-solana-signature-demo)

### Application Flow (Simplified Overview)

1. Wallet Connection  
   - Upon opening the demo, users are prompted to connect a Solana-compatible wallet (e.g., Phantom).  
   - Once connected, the app detects the wallet and fetches relevant token balances on Neon EVM (e.g., USDC, wSOL).

2. Token Selection and Swap
   - Users select a source and destination token (e.g., USDC → wSOL), input the amount, and initiate the swap.  
   - The transaction is signed by the connected Solana wallet, then executed on Neon EVM.

3. Transaction Confirmation  
   - The wallet prompts the user to approve the transaction.  
   - Upon approval, the app displays a confirmation and updates the balances accordingly.

4. Optional: Verify on Neonscan  
   - Since the transaction runs on Neon EVM, users can view it via [https://neonscan.org](https://neonscan.org) by pasting their **Neon wallet address (derived from their Solana keypair).

#### Integration Insights
Developers can apply the concepts demonstrated in this application to build **EVM-compatible dApps running on Neon EVM** that use **Solana wallets for transaction signing**.
  •	Establishing connections with Solana-compatible wallets.
  •	Constructing and signing messages and transactions programmatically.
  •	Handling user approvals and displaying transaction outcomes.
GitHub Repository: The source code for the Solana signature demo can be found on GitHub (https://github.com/neonlabsorg/neon-solana-signature-demo)

### Swap UI Demo — Version Breakdown

#### **v1 – Solana Wallet → Transfer SDK (Basic Demo)**

📄 [Spec](https://www.notion.so/neonfoundation/Solana-signature-V1-Solana-Wallet-Transfer-SDK-165d6d79e4eb802f8239ed681d7d32e9?pvs=4)

This version demonstrates **basic Neon EVM integration** using a **Solana wallet** for **transferring tokens**, without swap logic or interaction with DEX contracts.

##### v1 Flow:
1. **Connect Phantom Wallet**  
   User connects a Solana-compatible wallet to the dApp.

2. **Enter Destination & Token Info**  
   Select a destination address (Neon EVM-compatible), specify amount and token.

3. **Sign with Solana Wallet**  
   The transfer is signed using the Solana private key but executed on Neon EVM.

4. **Broadcast Transaction**  
   Transaction is sent to Neon EVM RPC for execution.

5. **View Confirmation**  
   The result is shown to the user. Transaction can be verified on Neonscan.

#### **v2 – Solana Wallet → Swap SDK with ERC-20 Migration Support**

📄 [Spec](https://www.notion.so/neonfoundation/Solana-signature-V2-Solana-Wallet-SDK-new-ERC20-tokens-migration-184d6d79e4eb80559c33da736f200509?pvs=4)

This advanced version builds on v1 by adding:
- Support for **Neon-compatible ERC-20 tokens** tied to Solana-native assets.
- Full **token swap functionality** via **DEX smart contracts** deployed on Neon EVM.

##### v2 Flow:
1. **Connect Phantom Wallet**  
   User connects a Solana wallet.

2. **Select Tokens for Swap**  
   Choose a source token (e.g., USDC v2) and a destination token (e.g., wSOL v2).

3. **Enter Amount to Swap**  
   Specify how much of the source token to convert.

4. **Sign with Solana Wallet**  
   The swap transaction is signed by the Solana wallet, but runs on Neon.

5. **Execute Swap via Neon DEX**  
   The transaction interacts with a DEX (e.g., CPMM pool) on Neon.

6. **View Success Message**  
   UI confirms success; balances update accordingly.

7. **Verify on Neonscan**  
   Since this is a Neon EVM transaction, users can verify it via [neonscan.org](https://neonscan.org).
