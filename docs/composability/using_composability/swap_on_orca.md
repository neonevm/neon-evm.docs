---
title: 'Swap on Orca DEX'
proofedDate: 20240627
iterationBy: na
includedInSite: false
approvedBy: na
---

## Introduction

This tutorial will walk you through the steps of performing a swap on The Orca DEX where the input swap token is **devUSDC** and the output swap token is **devSAMO.**

:::info
You can request devUSDCs and devSAMO from https://everlastingsong.github.io/nebula/
:::

This example code is based on the script [OrcaSwap.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/OrcaSwap.js). This script is designed to perform a token swap on the [Orca decentralized exchange (DEX)](https://www.orca.so/) on the Solana blockchain. It uses the Anchor SDK to interact with the blockchain and requires specific environment variables to be set for execution.

## How the script works

Let us breakdown the main components of the script `OrcaSwap.js` to get into more depth of the process of swapping tokens on Orca DEX.

### Initial Checks and Imports

```jsx
if (process.env.ANCHOR_PROVIDER_URL == undefined || process.env.ANCHOR_WALLET == undefined) {
  return console.log(
    "This script uses the @coral-xyz/anchor library which requires the variables ANCHOR_PROVIDER_URL and ANCHOR_WALLET to be set. Please create id.json in the root of the hardhat project with your Solana's private key and run the following command in the terminal in order to proceed with the script execution - export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com && export ANCHOR_WALLET=./id.json"
  );
}

const { ethers } = require('hardhat');
const web3 = require('@solana/web3.js');
const { getAssociatedTokenAddress, getAccount } = require('@solana/spl-token');
const { config } = require('./config');
const { AnchorProvider } = require('@coral-xyz/anchor');
const {
  WhirlpoolContext,
  buildWhirlpoolClient,
  ORCA_WHIRLPOOL_PROGRAM_ID,
  PDAUtil,
  swapQuoteByInputToken,
  IGNORE_CACHE,
  getAllWhirlpoolAccountsForConfig,
  WhirlpoolIx,
  SwapUtils
} = require('@orca-so/whirlpools-sdk');
const { DecimalUtil, Percentage } = require('@orca-so/common-sdk');
const { Decimal } = require('decimal.js');
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
    const connection = new web3.Connection(config.SOLANA_NODE, "processed");
    const provider = AnchorProvider.env();
    const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
    const client = buildWhirlpoolClient(ctx);
    const DEVNET_WHIRLPOOLS_CONFIG = new web3.PublicKey("FcrweFY1G9HJAHG5inkGB6pKg1HZ6x9UC2WioAfWrGkR");

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
        console.log(`TestCallSolana deployed to ${TestCallSolana.target}`);
    }
```

This block of code sets up the connection to the Solana blockchain and initializes the Anchor provider. It also creates or attaches to the already deployed `TestCallSolana` smart contract. It also defines the public key of the Orca pool contract account on Solana `DEVNET_WHIRLPOOLS_CONFIG` .

### Retrieving Contract Public Key and Token Mints

```jsx
const contractPublicKeyInBytes = await TestCallSolana.getNeonAddress(TestCallSolanaAddress);
const contractPublicKey = ethers.encodeBase58(contractPublicKeyInBytes);
console.log(contractPublicKey, 'contractPublicKey');

const TokenA = {
  mint: new web3.PublicKey('Jd4M8bfJG3sAkd82RsGWyEXoaBXQP7njFzBwEaCTuDa'),
  decimals: 9
}; // devSAMO
const TokenB = {
  mint: new web3.PublicKey('BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k'),
  decimals: 6
}; // devUSDC
```

This code block retrieves the public key for the `TestCallSolana` contract and sets up the token mint addresses for devSAMO and devUSDC.

### Whirlpool Configuration

```jsx
const whirlpool_pubkey = PDAUtil.getWhirlpool(
  ORCA_WHIRLPOOL_PROGRAM_ID,
  DEVNET_WHIRLPOOLS_CONFIG,
  TokenA.mint, // devSAMO
  TokenB.mint, // devUSDC
  64 // tick spacing
).publicKey;
const whirlpool = await client.getPool(whirlpool_pubkey);
```

This section configures the Whirlpool for the specified tokens and retrieves the Whirlpool client.

### Checking and Initializing Token Accounts

```jsx
const amountIn = new Decimal('0.1'); // 0.1 devUSDC

const ataContractTokenA = await getAssociatedTokenAddress(
  TokenA.mint,
  new web3.PublicKey(contractPublicKey),
  true
);
let ataContractTokenAInfo = await connection.getAccountInfo(ataContractTokenA);

const ataContractTokenB = await getAssociatedTokenAddress(
  TokenB.mint,
  new web3.PublicKey(contractPublicKey),
  true
);

let ataContractTokenBInfo = await connection.getAccountInfo(ataContractTokenB);
if (!ataContractTokenAInfo || !ataContractTokenBInfo) {
  if (!ataContractTokenAInfo) {
    console.log(
      'Account ' + contractPublicKey + ' does not have initialized ATA account for TokenA.'
    );
  }
  if (!ataContractTokenBInfo) {
    console.log(
      'Account ' + contractPublicKey + ' does not have initialized ATA account for TokenB.'
    );
  }
  return;
} else if (
  Number((await getAccount(connection, ataContractTokenB)).amount) <
  Number(DecimalUtil.toBN(amountIn, TokenB.decimals))
) {
  console.log(
    'Account ' +
      contractPublicKey +
      ' does not have enough TokenB amount to proceed with the swap execution.'
  );
  return;
}
```

This section computes the contract’s Associated Token Addresses (ATAs) for devSAMO and devUSDC and checks if they are initialized. It also ensures the contract's account has enough devUSDC balance for the swap.

If the contract’s ATA’s are not initialized for both the tokens devSAMO and devUSDC, then follow the steps below -

- Open `CreateATA.js` file and add devSAMO account address `Jd4M8bfJG3sAkd82RsGWyEXoaBXQP7njFzBwEaCTuDa` to this variable -
  ```jsx
  const tokenMintPublicKey = '';
  ```
  Run `npx hardhat run scripts/TestCallSolana/CreateATA.js --network neondevnet` and this will create an ATA for the contract for devSAMO.
- Repeat the previous step for devUSDC account address `BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k` to create an ATA for the contract for devUSDC.

### Swap Estimation and Execution

```jsx
    const quote = await swapQuoteByInputToken(
        whirlpool,
        TokenB.mint, // devUSDC
        DecimalUtil.toBN(amountIn, TokenB.decimals), // Input Token Mint amount
        Percentage.fromFraction(10, 1000), // Acceptable slippage (10/1000 = 1%)
        ctx.program.programId,
        ctx.fetcher,
        IGNORE_CACHE
    );
    console.log(quote, 'quote');

    console.log("estimatedAmountIn:", DecimalUtil.fromBN(quote.estimatedAmountIn, TokenB.decimals).toString(), "TokenB");
    console.log("estimatedAmountOut:", DecimalUtil.fromBN(quote.estimatedAmountOut, TokenA.decimals).toString(), "TokenA");
    console.log("otherAmountThreshold:", DecimalUtil.fromBN(quote.otherAmountThreshold, TokenA.decimals).toString(), "TokenA");

    console.log('Executing executeComposabilityMethod with Orca\'s swap instruction ...');
    solanaTx = new web3.Transaction();
    solanaTx.add(
        WhirlpoolIx.swapIx(
            ctx.program,
            SwapUtils.getSwapParamsFromQuote(
                quote,
                ctx,
                whirlpool,
                ataContractTokenB,
                ataContractTokenA,
                new web3.PublicKey(contractPublicKey)
            )
        )
    );

    [tx, receipt] = await config.utils.executeComposabilityMethod(
        solanaTx.instructions[0],
        0,
        TestCallSolana,
        undefined,
        user1
    );
    console.log(tx, 'tx');
    console.log(receipt.logs[0].args, 'receipt args');
}
```

This code block obtains a swap quote for the input amount, logs the estimation details, prepares the swap instruction, and executes the transaction.

## How to run the script

To test the example script `OrcaSwap.js` , run this command in the terminal -

```bash
npx hardhat run scripts/TestCallSolana/OrcaSwap.js --network neondevnet
```

After running the above command successfully, you should get the output similar to this -

```bash
54Mfrfbv16neQhrP7o29FnsAfEtmLitTDG7fuP71YKYL contractPublicKey
{
  estimatedAmountIn: <BN: 186a0>,
  estimatedAmountOut: <BN: 252477b8c>,
  estimatedEndTickIndex: -115126,
  estimatedEndSqrtPrice: <BN: cf57e213f78e19>,
  estimatedFeeAmount: <BN: c8>,
  amount: <BN: 186a0>,
  amountSpecifiedIsInput: true,
  aToB: false,
  otherAmountThreshold: <BN: 24c6530d1>,
  sqrtPriceLimit: <BN: fffec4b135bb7f32a81b33af>,
  tickArray0: PublicKey [PublicKey(9H4aVdyXbnnmbSJLjYahvZzrgdHyWVMq8i1v1fD7jqBt)] {
    _bn: <BN: 7afad55b43064520bec49256da6fc91853aa00fe5a354d830b032b08f3817427>
  },
  tickArray1: PublicKey [PublicKey(9H4aVdyXbnnmbSJLjYahvZzrgdHyWVMq8i1v1fD7jqBt)] {
    _bn: <BN: 7afad55b43064520bec49256da6fc91853aa00fe5a354d830b032b08f3817427>
  },
  tickArray2: PublicKey [PublicKey(9H4aVdyXbnnmbSJLjYahvZzrgdHyWVMq8i1v1fD7jqBt)] {
    _bn: <BN: 7afad55b43064520bec49256da6fc91853aa00fe5a354d830b032b08f3817427>
  }
} quote
estimatedAmountIn: 0.1 TokenB
estimatedAmountOut: 9.970350988 TokenA
otherAmountThreshold: 9.871634641 TokenA
Executing executeComposabilityMethod with Orca's swap instruction ...
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
  hash: '0x8c546929ba84ac22b38c310c2f670696a02c5594d9d006698e7c1c20d07e41b0',
  type: 0,
  to: '0x004FB641e6C998Fc7dbdfB595F723727c8d07535',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 23142,
  gasLimit: 165000n,
  gasPrice: 256947462431n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x121f31510e03685f8e909053e458121c66f5a76aedc7706aa11c82f8aa952a8f2b7879a900000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000004e000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b06ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003c4adc98a3372450da1f1000ba8ec47c94f9533127f4b2589a40ebe7424de9b900000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000cb644ca2669849d7472e9b7f94dcbe8368a8a265c3d2af8a922c7bb242d5dc2f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000017e232db5b493652f09b55c17fb53aab8443178034742f1526722752d6a9ecfd400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e88322e785613ef2c35786bf91d8006a035fb7312bc3a6684bffbda93b1ad6f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000179698dd5a7e6625086e3be1203de392b1a65a23a5d1099ec5a28318e2a4e88b800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001313e1c144a550aeaa99a29830910036800efbb8af592a87d705fe7938698f1c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000017afad55b43064520bec49256da6fc91853aa00fe5a354d830b032b08f3817427000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000017afad55b43064520bec49256da6fc91853aa00fe5a354d830b032b08f3817427000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000017afad55b43064520bec49256da6fc91853aa00fe5a354d830b032b08f38174270000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000127116a2b94f55339f566164cb265fd3ab70d4b91e594e8c555a3be76d69e9ecb00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002af8c69e91e17587c8a086010000000000d130654c02000000af331ba8327fbb35b1c4feff00000000010000000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022926n,
  signature: Signature { r: "0xfb762b500e4a7551102f7cebfe17d207317496853240ded7283f2851c07d41f2", s: "0x6adcaeb774f416206b4b2f6970b32a7d0573d3cc74a5465865040ef86f48ffe6", yParity: 1, networkV: 490045888 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args
```
