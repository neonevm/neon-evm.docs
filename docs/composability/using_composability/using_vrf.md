---
title: 'Using Verifiable Random Function (VRF)'
proofedDate: 20240627
iterationBy: na
includedInSite: false
approvedBy: na
---

## Introduction

This tutorial will walk you through the steps of requesting on-chain randomness on Solana using ORAO VRF (Verifiable Random Function) program.

This example code is based on the script [OraoNetworkVRF.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/OraoNetworkVRF.js). This script is designed to submit a VRF request to the ORAO VRF network program. You can generate on-chain randomness on Solana with ORAO's Verifiable Random Function. This tool offers unbiased, fast, and affordable randomness for your Solana programs. You can use it to create unique NFT characteristics, generate random levels for games and weapons, randomize airdrops, and provide secure, verifiable lotteries. It is built using the Anchor framework.

## How the script works

Let us breakdown the main components of the script `OraoNetworkVRF.js` to get into more depth of the process of generating randomness on Solana using ORAO’s VRF.

### Initial Checks and Imports

```jsx
if (process.env.ANCHOR_PROVIDER_URL == undefined || process.env.ANCHOR_WALLET == undefined) {
  return console.log(
    "This script uses the @coral-xyz/anchor library which requires the variables ANCHOR_PROVIDER_URL and ANCHOR_WALLET to be set. Please create id.json in the root of the hardhat project with your Solana's private key and run the following command in the terminal in order to proceed with the script execution - export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com && export ANCHOR_WALLET=./id.json"
  );
}

const { ethers } = require('hardhat');
const web3 = require('@solana/web3.js');
const { config } = require('./config');
const { AnchorProvider } = require('@coral-xyz/anchor');
const { Orao } = require('@orao-network/solana-vrf');
```

This code block checks if the required environment variables `ANCHOR_PROVIDER_URL` and `ANCHOR_WALLET` are set. It then imports necessary libraries and modules. `ANCHOR_PROVIDER_URL` is Solana's RPC URL and `ANCHOR_WALLET` is Solana's private key in json byte array format.

- Store your Solana’s private key in the file `id.json` and place it in the root of your hardhat project folder. This key will be used only for the Anchor SDK initialization, and not for signing or submitting any transactions.
- Run this in your terminal -
  ```bash
  export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
  export ANCHOR_WALLET=./id.json
  ```

### Setup and Initialization

```jsx
async function main() {
    const [user1] = await ethers.getSigners();
    const provider = AnchorProvider.env();
    const vrf = new Orao(provider);

    const TestCallSolanaFactory = await ethers.getContractFactory("TestCallSolana");
    let TestCallSolanaAddress = config.CALL_SOLANA_SAMPLE_CONTRACT;
    let TestCallSolana;
    let solanaTx;
    let tx;
    let receipt;

    if (ethers.isAddress(TestCallSolanaAddress)) {
        TestCallSolana = TestCallSolanaFactory.attach(TestCallSolanaAddress);
    } else {
        TestCallSolana = await ethers.deployContract("TestCallSolana");
        await TestCallSolana.waitForDeployment();

        TestCallSolanaAddress = TestCallSolana.target;
        console.log(
            `TestCallSolana deployed to ${TestCallSolana.target}`
        );
    }
```

This block of code sets up the connection to the Solana blockchain and initializes the Anchor provider and an Orao VRF instance. It also creates or attaches to the already deployed `TestCallSolana` smart contract.

### Getting Payer and Contract Public Key

```jsx
const payer = ethers.encodeBase58(await TestCallSolana.getPayer());
console.log(payer, 'payer');

const contractPublicKeyInBytes = await TestCallSolana.getNeonAddress(TestCallSolanaAddress);
const contractPublicKey = ethers.encodeBase58(contractPublicKeyInBytes);
console.log(contractPublicKey, 'contractPublicKey');
```

This block of code retrieves the payer and contract public key from the `TestCallSolana` contract.

### Generating VRF Seed and Building Request

```jsx
const randomKeypair = web3.Keypair.generate();
const seed = randomKeypair._keypair.publicKey; // use new generated keypair publicKey as VRF seed

let req = await vrf.request(seed);
let instruction = await req.build();
```

This code block generates a random keypair, and its public key is used as the VRF seed. A VRF request is then built using this seed.

### Preparing and Submitting the Transaction

```jsx
const data = vrf.coder.instruction.encode('requestV2', { seed: instruction._args[0] });
const programId = vrf.programId;
const keys = [
  { pubkey: new web3.PublicKey(payer), isSigner: true, isWritable: true },
  { pubkey: instruction._accounts.networkState, isSigner: false, isWritable: true },
  { pubkey: instruction._accounts.treasury, isSigner: false, isWritable: true },
  { pubkey: instruction._accounts.request, isSigner: false, isWritable: true },
  { pubkey: web3.SystemProgram.programId, isSigner: false, isWritable: false }
];

solanaTx = new web3.Transaction();
solanaTx.add(
  new web3.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  })
);

[tx, receipt] = await config.utils.executeComposabilityMethod(
  solanaTx.instructions[0],
  7103920,
  TestCallSolana,
  undefined,
  user1
);
console.log(tx, 'tx');
console.log(receipt.logs[0].args, 'receipt args');
```

This section of code encodes the VRF request and prepares a transaction instruction, including the necessary keys and program ID. It then submits the transaction.

### Waiting for Randomness and Outputting the Result

```jsx
    const randomness = await vrf.waitFulfilled(seed);
    console.log(Buffer.from(randomness.randomness).readBigUInt64LE(), 'randomness');
}
```

This section of code waits for the VRF request to be fulfilled and then outputs the generated randomness.

## How to run the script

To test the example script `OraoNetworkVRF.js` , run this command in the terminal -

```bash
npx hardhat run scripts/TestCallSolana/OraoNetworkVRF.js --network neondevnet
```

After running the above command successfully, you should get the output similar to this -

```bash
4FiNE9Rj3nKCBWmJgQVte7hRoSt2TeMNFe8FzZpsgnDD payer
54Mfrfbv16neQhrP7o29FnsAfEtmLitTDG7fuP71YKYL contractPublicKey
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
  hash: '0x9ddfafcab442ba954b8ff5100187c8f78c727f75a852c3605d86e9c050370552',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23138,
  gasLimit: 7213920n,
  gasPrice: 253928464918n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x121f31510747b11afa91b4d1f922f27b0ebac1dab23b2129a4bef34f32a47b58f5cefc7800000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000000000000000000000000000000000000006c65b0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000053057f6fad62a3ecae4e8d197bc418c4c578bca456ebeeaff45778fd91964ea30000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000013ede735db98b5ca2accac3bc1269e54b5409e5ea2c2bf6b2be0d80db10ee8f8c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000017f2dcd2aa425a24abf0d8fe12b60aa8f4768370d0fd99c738aefe6f2150f03b800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b245c746e0e26b8dc90f054fc08abda07b00ef400837ba3a9cd018f7825a02500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000282697d106c3661cd9809d438e6a37aa86282621e719d1722e68e08dcf77f8fbc2df49bf340145006b000000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0xb53f1976bcf6795a7c5468045782747995acc6e099c2acc77ad97793712fcd15", s: "0x78bcbc24ae253083588e6624725ed2000e580bcd7f81eadb04e7a127effcf43a", yParity: 0, networkV: 490045887 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args
17369911603807770235n randomness
```

:::important
The full code of the script can be viewed here [OraoNetworkVRF.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/OraoNetworkVRF.js).
:::
