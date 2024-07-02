---
title: 'Transfer SPL Token between accounts'
proofedDate: 20240627
iterationBy: na
includedInSite: false
approvedBy: na
---

## Introduction

This tutorial will walk you through the steps of creating two accounts on Solana using the `createAccountWithSeed` instruction, minting an SPL token to one account and then transferring the SPL token from that account to another using a solidity smart contract on Neon EVM Devnet.

This example code is based on the script [TransferSPLTokenBetweenAccounts.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/TransferSPLTokenBetweenAccounts.js). This script demonstrates creating two accounts on Solana using the `createAccountWithSeed` instruction, minting tokens to one account, and transferring those tokens to another account. It illustrates the process of handling SPL Token transfers between accounts. For this example, we are using an SPL Token with account address `8LkbY4Q1jGEF1BwedHz1ALM3q4zZRhZpCMWRe6SbrbKj` on Solana Devnet.

## How the script works

Let us breakdown the main components of the script `TransferSPLTokenBetweenAccounts.js` to get into more depth of the process of minting and transferring of an SPL Token from one account to another.

### Importing Dependencies

```jsx
const { ethers } = require('hardhat');
const web3 = require('@solana/web3.js');
const { config } = require('./config');
const {
  ACCOUNT_SIZE,
  TOKEN_PROGRAM_ID,
  createMintToInstruction,
  createTransferInstruction,
  createInitializeAccount2Instruction
} = require('@solana/spl-token');
```

These lines import the necessary libraries: `ethers` for Ethereum-related operations, `@solana/web3.js` and `@solana/spl-token` for Solana operations, and the configuration file.

### Establishing Connection

```jsx
const connection = new web3.Connection(config.SOLANA_NODE, 'processed');
```

This establishes a connection to the Solana node specified in the configuration file.

### Getting Signers, Contract Factory and the SPL Token account

```jsx
const [user1, user2] = await ethers.getSigners();
const tokenMintPublicKey = '8LkbY4Q1jGEF1BwedHz1ALM3q4zZRhZpCMWRe6SbrbKj';
if (tokenMintPublicKey == '') {
  return console.error(
    'Before proceeding with instructions execution please set value for the tokenMintPublicKey variable.'
  );
}
const token = new web3.PublicKey(tokenMintPublicKey);

const TestCallSolanaFactory = await ethers.getContractFactory('TestCallSolana');
```

This gets the signers from the `ethers` library, retrieves the contract factory for deploying or interacting with the `TestCallSolana.sol` contract and also retrieves the SPL Token account public key.

### Deploying or Attaching to the Contract

```jsx
let TestCallSolanaAddress = config.CALL_SOLANA_SAMPLE_CONTRACT;
let TestCallSolana;
let solanaTx;
let tx;
let receipt;

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

### Checking and Creating Accounts (ATAs and Token Accounts) if Necessary

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
      lamports: minBalance,
      space: ACCOUNT_SIZE,
      programId: TOKEN_PROGRAM_ID
    })
  );

  solanaTx.add(
    createInitializeAccount2Instruction(SenderAccount, token, new web3.PublicKey(contractPublicKey))
  );

  [tx, receipt] = await config.utils.batchExecuteComposabilityMethod(
    solanaTx.instructions,
    [minBalance, 0],
    TestCallSolana,
    undefined,
    user1
  );
  console.log(tx, 'tx');
  console.log(receipt.logs[0].args, 'receipt args');
  console.log(receipt.logs[1].args, 'receipt args');
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
      lamports: minBalance,
      space: ACCOUNT_SIZE,
      programId: TOKEN_PROGRAM_ID
    })
  );

  solanaTx.add(
    createInitializeAccount2Instruction(
      ReceiverAccount,
      token,
      new web3.PublicKey(contractPublicKey)
    )
  );

  [tx, receipt] = await config.utils.batchExecuteComposabilityMethod(
    solanaTx.instructions,
    [minBalance, 0],
    TestCallSolana,
    undefined,
    user1
  );
  console.log(tx, 'tx');
  console.log(receipt.logs[0].args, 'receipt args');
  console.log(receipt.logs[1].args, 'receipt args');
}

console.log(await connection.getAccountInfo(SenderAccount), 'getAccountInfo SenderAccount');
console.log(await connection.getAccountInfo(ReceiverAccount), 'getAccountInfo SenderAccount');
```

This checks if the accounts already exist. If not, it creates them using the `createAccountWithSeed` instruction. This also creates a Token Account for the `SenderAccount` and `ReceiverAccount` for the SPL Token with respect to the contract.

### Minting Tokens to the SenderAccount

```jsx
console.log('Minting SPL Tokens to SenderAccount and transferring them to ReceiverAccount...');
solanaTx = new web3.Transaction();
solanaTx.add(
  createMintToInstruction(
    token,
    SenderAccount,
    new web3.PublicKey(contractPublicKey),
    1000 * 10 ** 9 // mint 1000 tokens
  )
);
```

This block of code mints 1000 tokens to `SenderAccount`.

### Transferring Tokens from SenderAccount to ReceiverAccount

```jsx
solanaTx.add(
  createTransferInstruction(
    SenderAccount,
    ReceiverAccount,
    contractPublicKey,
    10 * 10 ** 9, // transfers 10 tokens
    []
  )
);
```

This code block transfers 10 tokens from `SenderAccount` to `ReceiverAccount`.

### Executing Transactions

```jsx
console.log('Executing batchExecuteComposabilityMethod ...');
[tx, receipt] = await config.utils.batchExecuteComposabilityMethod(
  solanaTx.instructions,
  [0, 0, 0, 0, 0],
  TestCallSolana,
  undefined,
  user1
);
```

This executes the batch of transactions, including minting SPL Token to the `SenderAccount` and transferring SPL Token from `SenderAccount` to the `ReceiverAccount`.

## How to run the script

To test the example script `TransferSPLTokenBetweenAccounts.js` , run this command in the terminal -

```bash
npx hardhat run scripts/TestCallSolana/TransferSPLTokenBetweenAccounts.js --network neondevnet
```

After running the above command successfully, you should get the output similar to this -

```bash
4FiNE9Rj3nKCBWmJgQVte7hRoSt2TeMNFe8FzZpsgnDD payer
54Mfrfbv16neQhrP7o29FnsAfEtmLitTDG7fuP71YKYL contractPublicKey
2039280 minBalance
PublicKey [PublicKey(5FhKDhKNZWtYq2mRUEm6FgwrFTMdu52bRqXss31wykw5)] {
  _bn: <BN: 3f32765caee0fe06ea9c34fc0fa68ef11468029c0a1e5b1b64b242eebeb012ec>
} SenderAccount
PublicKey [PublicKey(GJxCHgh814MgbzztZzzWNzHuS22PqvM8wW2Z3mNJMdib)] {
  _bn: <BN: e378961e4791977a2a9307ad30e8aae05652bbb1f46a3173c0970e8b709607cc>
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
  hash: '0xb091f3a5c3d4e000d95bd149c7f98ce518b60262311be5b490523a2d693a8dcb',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23139,
  gasLimit: 2234280n,
  gasPrice: 255970522754n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x59cfc5e400000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000054000000000000000000000000000000000000000000000000000000000000005a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a900000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000033057f6fad62a3ecae4e8d197bc418c4c578bca456ebeeaff45778fd91964ea30000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000013f32765caee0fe06ea9c34fc0fa68ef11468029c0a1e5b1b64b242eebeb012ec000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b90000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000033f32765caee0fe06ea9c34fc0fa68ef11468029c0a1e5b1b64b242eebeb012ec000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016d11232b2c3c728347030537ca3de7dbce997aed3dec98b863b180ab1192a32e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006a7d517192c5c51218cc94c3d4af17f58daee089ba1fd44e3dbd98a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000006d030000003c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b9110000000000000073616c7431373139343333383135363431f01d1f0000000000a50000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000021103c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000001f1df00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0x3e25ceffc80be57819cd45f98e2ebabb94ed77f00581caa9cccc92d55b52e211", s: "0x25f0f27067d0516e035057d6629a7c9c77ae285d281c1cb7180a7a9172fb1273", yParity: 0, networkV: 490045887 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args
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
  hash: '0x175650f95f0fcb89a5ff1792720474053672519ca6c8e7a375ecb26073112e55',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23140,
  gasLimit: 2234280n,
  gasPrice: 256208913865n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x59cfc5e400000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003e0000000000000000000000000000000000000000000000000000000000000054000000000000000000000000000000000000000000000000000000000000005a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a900000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000033057f6fad62a3ecae4e8d197bc418c4c578bca456ebeeaff45778fd91964ea3000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001e378961e4791977a2a9307ad30e8aae05652bbb1f46a3173c0970e8b709607cc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b9000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e378961e4791977a2a9307ad30e8aae05652bbb1f46a3173c0970e8b709607cc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016d11232b2c3c728347030537ca3de7dbce997aed3dec98b863b180ab1192a32e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006a7d517192c5c51218cc94c3d4af17f58daee089ba1fd44e3dbd98a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000006e030000003c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b9120000000000000073616c743137313934333338313536343131f01d1f0000000000a50000000000000006ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000021103c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000001f1df00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0xc3169850f21b5fa07a73db2357a74447cfe22f8386c4e4c47655e3f01194fef4", s: "0x20f8cfe17aa2e415d3ba96c8fc1fcd821c0679499ca9dca099b81dd68d110f80", yParity: 1, networkV: 490045888 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args
{
  data: <Buffer 6d 11 23 2b 2c 3c 72 83 47 03 05 37 ca 3d e7 db ce 99 7a ed 3d ec 98 b8 63 b1 80 ab 11 92 a3 2e 3c 4a dc 98 a3 37 24 50 da 1f 10 00 ba 8e c4 7c 94 f9 ... 115 more bytes>,
  executable: false,
  lamports: 2039280,
  owner: PublicKey [PublicKey(TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA)] {
    _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
  },
  rentEpoch: 18446744073709552000,
  space: 165
} getAccountInfo SenderAccount
{
  data: <Buffer 6d 11 23 2b 2c 3c 72 83 47 03 05 37 ca 3d e7 db ce 99 7a ed 3d ec 98 b8 63 b1 80 ab 11 92 a3 2e 3c 4a dc 98 a3 37 24 50 da 1f 10 00 ba 8e c4 7c 94 f9 ... 115 more bytes>,
  executable: false,
  lamports: 2039280,
  owner: PublicKey [PublicKey(TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA)] {
    _bn: <BN: 6ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9>
  },
  rentEpoch: 18446744073709552000,
  space: 165
} getAccountInfo SenderAccount
Minting SPLTokens to SenderAccount and transfering them to ReceiverAccount ...
Executing batchExecuteComposabilityMethod ...
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
  hash: '0x4f7b817631fcd27067c2d4aca5aa01ea2a77f8b198934b557d4e2a547bf1ccd2',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23141,
  gasLimit: 195000n,
  gasPrice: 256301137725n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x59cfc5e400000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000000004c00000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000000206ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a906ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a900000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000000036d11232b2c3c728347030537ca3de7dbce997aed3dec98b863b180ab1192a32e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013f32765caee0fe06ea9c34fc0fa68ef11468029c0a1e5b1b64b242eebeb012ec000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b90000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000033f32765caee0fe06ea9c34fc0fa68ef11468029c0a1e5b1b64b242eebeb012ec00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e378961e4791977a2a9307ad30e8aae05652bbb1f46a3173c0970e8b709607cc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b9000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000009070010a5d4e8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000090300e40b54020000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0xb50acd94d4c01c27a738206a37763f7cc45ee52b2f4c82975145603dbdfd9eb7", s: "0x7cef71ea1e788239c18ecc20becd6a651af87447f81b24bd7f171f79efe52917", yParity: 0, networkV: 490045887 },
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
