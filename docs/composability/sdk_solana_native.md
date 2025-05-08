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

Library for Scheduled Neon EVM Transactions:

* [Solana Signer SDK](https://www.npmjs.com/package/@neonevm/solana-sign)
* [Solana Signer SDK Documentation](http://solana-signer.sdk.neonevm.org/)

### Installation and Testing
#### Install dependencies:

```bash
yarn install
```

#### Build the project:

```bash
yarn build
```

#### Run Tests:

Navigate to the packages/core folder and run:

```bash
yarn test
```
### Usage
#### Initialization

#### Setup Solana and Neon Providers:

```typescript
const connection = new Connection(`<solana_rpc_url>`, 'confirmed');
const proxyApi = new NeonProxyRpcApi(`<neon_proxy_rpc_url>`);
```
#### Connect a Solana Wallet:

Example using Keypair:

```typescript
const solanaPrivateKey = bs58.decode(`<you_private_key_base58>`);
const keypair = Keypair.fromSecretKey(solanaPrivateKey);
const {chainId, solanaUser, provider, programAddress, tokenMintAddress} = await proxyApi.init(keypair);
await solanaAirdrop(connection, solanaUser.publicKey, 1e9);
```

### Creating and Sending a Scheduled Transaction
#### Retrieve Nonce for Neon Wallet:

```typescript
const nonce = Number(await neonProxyRpcApi.getTransactionCount(solanaUser.neonWallet));
```
#### Create a Scheduled Transaction:

```typescript
const transactionData = {
  from: solanaUser.neonWallet,
  to: `<contract_address>`,
  data: `<call_contract_data>`
};
```

#### Prepare Solana Transaction:

```typescript
const transactionGas = await proxyApi.estimateScheduledTransactionGas({
  solanaPayer: solanaUser.publicKey,
  transactions: [transactionData],
});

const { scheduledTransaction } = await proxyApi.createScheduledTransaction({
  transactionGas,
  transactionData,
  nonce
});
```
#### Ensure Solana Balance Account is Initialized:

```typescript
const account = await connection.getAccountInfo(solanaUser.balanceAddress);
if (account === null) {
  scheduledTransaction.instructions.unshift(
    createBalanceAccountInstruction(
      programAddress,
      solanaUser.publicKey,
      solanaUser.neonWallet,
      chainId
    )
  );
}
```

#### Sign and Send the Transaction:

```typescript
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
transaction.recentBlockhash = blockhash;
transaction.sign({ publicKey: solanaUser.publicKey, secretKey: solanaUser.keypair });
const signature = await connection.sendRawTransaction(scheduledTransaction.serialize());
console.log('Transaction signature', signature);
```

#### Monitor Scheduled Transaction Execution:

```typescript
const transactionStatus = await neonProxyRpcApi.waitTransactionTreeExecution(solanaUser.neonWallet, nonce, 1e5);
console.log(transactionStatus);

console.log(`Scheduled transactions result`, transactionStatus);
for (const { transactionHash, status } of transactionStatus) {
  const { result } = await neonProxyRpcApi.getTransactionReceipt(transactionHash);
  console.log(result);
}
```

### Creating Multiple Scheduled Transactions

**Multiple Scheduled Transactions** is an advanced use case for creating a **ScheduledTransaction**. It allows you to create a transaction that can execute multiple operations in a single transaction.

```typescript
const transactionsData = [{
  from: solanaUser.neonWallet,
  to: `<contract_address>`,
  data: `<call_contract_data>`
}, {
  from: solanaUser.neonWallet,
  to: `<contract_address>`,
  data: `<call_contract_data>`
}];

const transactionGas = await proxyApi.estimateScheduledTransactionGas({
  solanaPayer: solanaUser.publicKey,
  transactions: transactionsData
});

const { scheduledTransaction, transactions } = await proxyApi.createMultipleTransaction({
  transactionsData,
  transactionGas
});

await connection.sendRawTransaction(scheduledTransaction.serialize());
```

At this stage, you need to pass the Scheduled transaction to a specific method in the Neon Proxy RPC. If everything is done correctly, the Neon Proxy RPC will return the hash of the transaction.
```typescript
const result = await proxyApi.sendRawScheduledTransactions(transactions);
```

Next, you need to wait for the transaction to be executed.

```typescript
const transactionsStatus = await neonProxyRpcApi.waitTransactionTreeExecution(solanaUser.neonWallet, nonce, 1e5);
console.log(transactionsStatus);

console.log(`Scheduled transactions result`, transactionsStatus);
for (const { transactionHash, status } of transactionsStatus) {
  const { result } = await neonProxyRpcApi.getTransactionReceipt(transactionHash);
  console.log(result);
}
```

### Solana approving

The Solana approving process is a crucial step in the transaction lifecycle. It ensures that the transaction is valid and authorized by the necessary parties before it is executed on the Neon EVM.

This creates additional requirements for executing `ScheduledTransactions`, without Solana approving `estimateScheduledTransactionGas` won't work, and the transaction itself may be rejected by Neon EVM.

#### Example of Solana approving

```typescript
const tokenATA = getAssociatedTokenAddressSync(mintAddress, solanaUser.publicKey);
const [delegateAddress] = PublicKey.findProgramAddressSync([accountSeeds], programAddress);
const approveInstruction = createApproveInstruction(tokenATA, delegateAddress, solanaUser.publicKey, approveAmount);

const transactionGas = await proxyApi.estimateScheduledTransactionGas({
  solanaPayer: solanaUser.publicKey,
  transactions: transactionsData,
  preparatorySolanaTransactions: [{ instructions: prepareSolanaInstructions([approveInstruction]) }]
});

const { scheduledTransaction, transactions } = await proxyApi.createMultipleTransaction({
  nonce,
  transactionsData,
  transactionGas,
  solanaInstructions: [approveInstruction]
});
```

Similarly, it is necessary to pass any other Solana instructions that may be required for executing the `ScheduledTransaction`.

## Additional Resources

For further exploration and practical demonstration, check out the following resources:

•	Swap UI Demo: A live demonstration of the swap UI is available at Neon Solana Signature Demo (https://neon-solana-signature-demo.neontest.xyz/)

•	GitHub Repository: The source code for the Solana signature demo can be found on GitHub (https://github.com/neonlabsorg/neon-solana-signature-demo)
