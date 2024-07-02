---
title: 'Transfer SOLs between accounts'
proofedDate: 20240627
iterationBy: na
includedInSite: false
approvedBy: na
---

## Introduction

This tutorial will walk you through the steps of creating two accounts on Solana using the `createAccountWithSeed` instruction and then transferring 1 SOL from one account to the other using a solidity smart contract on Neon EVM Devnet.

This example code is based on the script [TransferSOLsBetweenAccounts.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/TransferSOLsBetweenAccounts.js). This script is designed to demonstrate the creation of two accounts (SenderAccount and ReceiverAccount) on the Solana blockchain and perform a couple of SOL transfer transactions involving these accounts.

## How the script works

Let us breakdown the main components of the script `TransferSOLsBetweenAccounts.js` to get into more depth of the process of transferring of SOLs from one account to another.

### Importing Dependencies

```jsx
const { ethers } = require('hardhat');
const web3 = require('@solana/web3.js');
const { config } = require('./config');
```

These lines import the necessary libraries: `ethers` for Ethereum-related operations, `@solana/web3.js` for Solana operations, and the configuration file.

### Establishing Connection

```jsx
const connection = new web3.Connection(config.SOLANA_NODE, 'processed');
```

This establishes a connection to the Solana node specified in the configuration file.

### Getting Signers and Contract Factory

```jsx
const [user1] = await ethers.getSigners();
const TestCallSolanaFactory = await ethers.getContractFactory('TestCallSolana');
```

This gets the signer from the `ethers` library and retrieves the contract factory for deploying or interacting with the `TestCallSolana.sol` contract.

### Deploying or Attaching to the Contract

```jsx
let TestCallSolanaAddress = config.CALL_SOLANA_SAMPLE_CONTRACT;
let TestCallSolana;

if (ethers.isAddress(TestCallSolanaAddress)) {
  TestCallSolana = TestCallSolanaFactory.attach(TestCallSolanaAddress);
} else {
  TestCallSolana = await ethers.deployContract('TestCallSolana');
  await TestCallSolana.waitForDeployment();
  TestCallSolanaAddress = TestCallSolana.target;
  console.log(`TestCallSolana deployed to ${TestCallSolana.target}`);
}
```

This block of code either attaches to an existing contract or deploys a new one if the address is not valid.

### Getting Payer and Contract Public Key

```jsx
const payer = ethers.encodeBase58(await TestCallSolana.getPayer());
const contractPublicKeyInBytes = await TestCallSolana.getNeonAddress(TestCallSolanaAddress);
const contractPublicKey = ethers.encodeBase58(contractPublicKeyInBytes);
```

This retrieves the payer address and the public key of the contract in base58 encoding.

### Calculating Minimum Balance for Rent Exemption

```jsx
const minBalance = await connection.getMinimumBalanceForRentExemption(0);
```

This gets the minimum balance required for an account to be rent-exempt on Solana.

### Creating Accounts with Seed

```jsx
const seedSender = 'salt' + Date.now().toString();
const seedReceiver = seedSender + '1';

const SenderAccount = await web3.PublicKey.createWithSeed(
  new web3.PublicKey(contractPublicKey),
  seedSender,
  web3.SystemProgram.programId
);
const ReceiverAccount = await web3.PublicKey.createWithSeed(
  new web3.PublicKey(contractPublicKey),
  seedReceiver,
  web3.SystemProgram.programId
);
```

These lines generate unique seeds, `seedSender` and `seedReceiver` , for the sender and receiver accounts and create the public keys for these accounts using the seeds.

### Checking and Creating Accounts if Necessary

```jsx
const senderAccountData = await connection.getAccountInfo(SenderAccount);
const receiverAccountData = await connection.getAccountInfo(ReceiverAccount);

// if sender's account has not been created yet
if (senderAccountData == null) {
  console.log('Creating SenderAccount through createAccountWithSeed instruction ...');
  solanaTx = new web3.Transaction();
  solanaTx.add(
    web3.SystemProgram.createAccountWithSeed({
      fromPubkey: new web3.PublicKey(payer),
      basePubkey: new web3.PublicKey(contractPublicKey),
      newAccountPubkey: SenderAccount,
      seed: seedSender,
      lamports: minBalance, // rent exempt
      space: 0,
      programId: web3.SystemProgram.programId
    })
  );
  [tx, receipt] = await config.utils.executeComposabilityMethod(
    solanaTx.instructions[0],
    minBalance,
    TestCallSolana,
    undefined,
    owner
  );
  console.log(tx, 'tx');
  console.log(receipt.logs[0].args, 'receipt args');
}

// if receiver's account has not been created yet
if (receiverAccountData == null) {
  console.log('Creating ReceiverAccount through createAccountWithSeed instruction ...');
  solanaTx = new web3.Transaction();
  solanaTx.add(
    web3.SystemProgram.createAccountWithSeed({
      fromPubkey: new web3.PublicKey(payer),
      basePubkey: new web3.PublicKey(contractPublicKey),
      newAccountPubkey: ReceiverAccount,
      seed: seedReceiver,
      lamports: minBalance, // rent exempt
      space: 0,
      programId: web3.SystemProgram.programId
    })
  );
  [tx, receipt] = await config.utils.executeComposabilityMethod(
    solanaTx.instructions[0],
    minBalance,
    TestCallSolana,
    undefined,
    owner
  );
  console.log(tx, 'tx');
  console.log(receipt.logs[0].args, 'receipt args');
}
```

This checks if the accounts already exist. If not, it creates them using the `createAccountWithSeed` instruction.

### Funding Sender Account with SOL

```jsx
const amount = 1000000000; // 1 SOL
solanaTx = new web3.Transaction();
solanaTx.add(
  web3.SystemProgram.transfer({
    fromPubkey: new web3.PublicKey(payer),
    toPubkey: new web3.PublicKey(SenderAccount),
    lamports: amount
  })
);
```

This funds the `SenderAccount` with 1 SOL from the payer.

### Transferring SOL from Sender to Receiver

```jsx
solanaTx.add(
  web3.SystemProgram.transfer({
    fromPubkey: SenderAccount,
    basePubkey: new web3.PublicKey(contractPublicKey),
    toPubkey: ReceiverAccount,
    lamports: amount,
    seed: seedSender,
    programId: web3.SystemProgram.programId
  })
);
```

This adds an instruction to transfer 1 SOL from the `SenderAccount` to the `ReceiverAccount`.

### Executing Transactions

```jsx
console.log('Executing batchExecuteComposabilityMethod with all instructions ...');
[tx, receipt] = await config.utils.batchExecuteComposabilityMethod(
  solanaTx.instructions,
  [amount, 0],
  TestCallSolana,
  undefined,
  owner
);
```

This executes the batch of transactions, including funding the `SenderAccount` and transferring SOL to the `ReceiverAccount`.

## How to run the script

To test the example script `TransferSOLsBetweenAccounts.js` , run this command in the terminal -

```bash
npx hardhat run scripts/TestCallSolana/TransferSOLsBetweenAccounts.js --network neondevnet
```

After running the above command successfully, you should get the output similar to this -

```bash
4FiNE9Rj3nKCBWmJgQVte7hRoSt2TeMNFe8FzZpsgnDD payer
54Mfrfbv16neQhrP7o29FnsAfEtmLitTDG7fuP71YKYL contractPublicKey
890880 minBalance
PublicKey [PublicKey(5YqXxPNAy8kd2WZRR3mPsE6iUbX7uiFo7oDtzWfKkh8r)] {
  _bn: <BN: 4396a149293487b0ac9142284b9d73c18be3cf3ac873be72ae4f338f66fa93bf>
} SenderAccount
PublicKey [PublicKey(7EhujXfAQ16KAoyLBtHyukkWTf6m9v1Hx9Jix1DSP1qB)] {
  _bn: <BN: 5ca8eda1bd5f2405805847cbecab552247f8cfb6ae4ac9862bf67477d9a670ea>
} ReceiverAccount
Creating SenderAccount through createAccountWithSeed instruction ...
ContractTransactionResponse {
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]
    },
    _networkName: 'neondevnet',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: [],
    _isHardhatNetworkCached: false,
    _transactionHashPollingTimeout: undefined
  },
  blockNumber: null,
  blockHash: null,
  index: undefined,
  hash: '0xf13646a5ee2131f34bfa4c56774c6a2d5ef372036a74af53bcae1096466e819f',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23127,
  gasLimit: 980880n,
  gasPrice: 240531817980n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x121f3151000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000d9800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000033057f6fad62a3ecae4e8d197bc418c4c578bca456ebeeaff45778fd91964ea30000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000014396a149293487b0ac9142284b9d73c18be3cf3ac873be72ae4f338f66fa93bf000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006d030000003c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b9110000000000000073616c743137313932333237343230303500980d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0x57a11b47d638cdae7d67e747548a501dd4ea5e8605ca11f80cfdf0f621d5792e", s: "0x677db2cb039f71ca3f1dcc058d1c71484d3ebf05df03ceb93794b7542d43217b", yParity: 1, networkV: 490045888 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args
Creating ReceiverAccount through createAccountWithSeed instruction ...
ContractTransactionResponse {
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]
    },
    _networkName: 'neondevnet',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: [],
    _isHardhatNetworkCached: false,
    _transactionHashPollingTimeout: undefined
  },
  blockNumber: null,
  blockHash: null,
  index: undefined,
  hash: '0x293eeda18afee57a5f23aa61f2f52ea3e7f2680719fcbec0dc4d384e009cf660',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23128,
  gasLimit: 980880n,
  gasPrice: 240433899348n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x121f3151000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000d9800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000033057f6fad62a3ecae4e8d197bc418c4c578bca456ebeeaff45778fd91964ea30000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000015ca8eda1bd5f2405805847cbecab552247f8cfb6ae4ac9862bf67477d9a670ea000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006e030000003c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b9120000000000000073616c74313731393233323734323030353100980d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0xabd472ac74b40a5431e3c526bc5cee9346ece8b5b1050b55275a97e89e55a5e4", s: "0x41602c22715ea1987526419f22ca42ae3ada06e80bcd262c63689292cb07f8df", yParity: 1, networkV: 490045888 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args
{
  data: <Buffer >,
  executable: false,
  lamports: 890880,
  owner: PublicKey [PublicKey(11111111111111111111111111111111)] {
    _bn: <BN: 0>
  },
  rentEpoch: 18446744073709552000,
  space: 0
} getAccountInfo SenderAccount
{
  data: <Buffer >,
  executable: false,
  lamports: 890880,
  owner: PublicKey [PublicKey(11111111111111111111111111111111)] {
    _bn: <BN: 0>
  },
  rentEpoch: 18446744073709552000,
  space: 0
} getAccountInfo SenderAccount
Executing batchExecuteComposabilityMethod with all instructions ...
ContractTransactionResponse {
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]
    },
    _networkName: 'neondevnet',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: [],
    _isHardhatNetworkCached: false,
    _transactionHashPollingTimeout: undefined
  },
  blockNumber: null,
  blockHash: null,
  index: undefined,
  hash: '0x266e43f084a81bba13d7da77d808029d3502acd6edcc333453733f862cf89daf',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23129,
  gasLimit: 1000185000n,
  gasPrice: 240400985720n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x59cfc5e400000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000004a0000000000000000000000000000000000000000000000000000000000000050000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000000023057f6fad62a3ecae4e8d197bc418c4c578bca456ebeeaff45778fd91964ea30000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000014396a149293487b0ac9142284b9d73c18be3cf3ac873be72ae4f338f66fa93bf0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000034396a149293487b0ac9142284b9d73c18be3cf3ac873be72ae4f338f66fa93bf000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b9000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000005ca8eda1bd5f2405805847cbecab552247f8cfb6ae4ac9862bf67477d9a670ea00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000c0200000000ca9a3b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000450b00000000ca9a3b00000000110000000000000073616c743137313932333237343230303500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000003b9aca000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0x2b3a2fba9eeed450aefd68097add3a0aba34b6a8b7d67c327bf627253ec2c2aa", s: "0x6ae14fe47acf41ffb71d01eb0cafc70f0fd2657fcfd41629f09ef8f71d85090b", yParity: 1, networkV: 490045888 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
]  receipt args instruction # 0
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
]  receipt args instruction # 1
```

:::important
The full code of the script can be viewed here [TransferSOLsBetweenAccounts.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/TransferSOLsBetweenAccounts.js).
:::
