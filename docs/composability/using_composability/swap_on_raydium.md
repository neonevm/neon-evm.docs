---
title: 'Swap on Raydium DEX'
proofedDate: 20240801
iterationBy: na
includedInSite: false
approvedBy: na
---

## Introduction

This tutorial will walk you through the steps of performing a swap on The Raydium DEX where the input swap token is **wSOL** and the output swap token is **USDC**.

This example code is based on the script [RaydiumSwap.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/RaydiumSwap.js). This script is designed to perform a token swap on the [Raydium decentralized exchange (DEX)](https://raydium.io/) on the Solana blockchain. It uses the Raydium SDK to interact with the blockchain.

:::important
**Raydium** doesn't support Solana's Devnet environment to test, so we will be using Solana's Mainnet environment for the following tutorial.
:::

## How the script works

Let us breakdown the main components of the script `RaydiumSwap.js` to get into more depth of the process of swapping tokens on Raydium DEX.

### Initial Checks and Imports

```jsx
const { ethers } = require('hardhat');
const web3 = require('@solana/web3.js');
const { getAssociatedTokenAddress, getAccount } = require('@solana/spl-token');
const { Liquidity } = require('@raydium-io/raydium-sdk');
const { config } = require('./config');
```

This code block imports necessary libraries like `ethers` for interacting with Ethereum-based contracts, `@solana/web3.js` for Solana interactions, and `@raydium-io/raydium-sdk` for Raydium DEX functionality.

### Swap configuration

```jsx
const swapConfig = {
  tokenAAmount: 0.0001, // Amount of WSOL to swap
  TokenA: 'So11111111111111111111111111111111111111112', // WSOL address
  TokenB: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // USDC address
  direction: 'in', // Direction of swap
  liquidityFile: 'https://api.raydium.io/v2/sdk/liquidity/mainnet.json',
  slippage: 5 // Slippage tolerance in percentage
};
```

This code block Defines the parameters for the swap, including the amount to swap, token addresses, and the liquidity pool configuration.

### Setup and Initialization

```jsx
const TestCallSolanaFactory = await ethers.getContractFactory('TestCallSolana');
let TestCallSolanaAddress = config.CALL_SOLANA_SAMPLE_CONTRACT_MAINNET;
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

This block of code creates or attaches to the already deployed `TestCallSolana` smart contract.

### Retrieving Contract Public Key

```jsx
const contractPublicKeyInBytes = await TestCallSolana.getNeonAddress(TestCallSolanaAddress);
const contractPublicKey = ethers.encodeBase58(contractPublicKeyInBytes);
console.log(contractPublicKey, 'contractPublicKey');
```

This code block retrieves the public key for the `TestCallSolana` contract.

### Finding Pool Information

```jsx
const poolKeys = await config.raydiumHelper.findPoolInfoForTokens(
  swapConfig.liquidityFile,
  swapConfig.TokenA,
  swapConfig.TokenB
);
if (!poolKeys) {
  console.error('Pool info not found');
  return 'Pool info not found';
} else {
  console.log('Found pool info');
}
```

This code block fetches the necessary pool information for the tokens involved in the swap from Raydium's API.

### Token Account Checks

```jsx
const ataContractTokenA = await getAssociatedTokenAddress(
  new web3.PublicKey(swapConfig.TokenA),
  new web3.PublicKey(contractPublicKey),
  true
);
const ataContractTokenAInfo = await connection.getAccountInfo(ataContractTokenA);
const ataContractTokenB = await getAssociatedTokenAddress(
  new web3.PublicKey(swapConfig.TokenB),
  new web3.PublicKey(contractPublicKey),
  true
);
const ataContractTokenBInfo = await connection.getAccountInfo(ataContractTokenB);

if (!ataContractTokenAInfo || !ataContractTokenBInfo) {
  if (!ataContractTokenAInfo) console.log('Account does not have initialized ATA for TokenA.');
  if (!ataContractTokenBInfo) console.log('Account does not have initialized ATA for TokenB.');
  return;
} else if (
  Number((await getAccount(connection, ataContractTokenA)).amount) <
  swapConfig.tokenAAmount * 10 ** amountIn.currency.decimals
) {
  console.log('Not enough TokenA amount to proceed with the swap.');
  return;
}
```

This block of code checks if the contract’s account has Associated Token Accounts (ATAs) for both WSOL and USDC, which are necessary for the swap. It also verifies if the account holds enough WSOL for the swap.

### Creating and Executing the Swap Instruction

```jsx
const ins = await Liquidity.makeSwapInstruction({
  poolKeys: poolKeys,
  userKeys: {
    tokenAccountIn: ataContractTokenA,
    tokenAccountOut: ataContractTokenB,
    owner: new web3.PublicKey(contractPublicKey)
  },
  amountIn: amountIn.raw,
  amountOut: minAmountOut.raw,
  fixedSide: 'in'
});

console.log("Executing executeComposabilityMethod with Raydium's swap instruction ...");
solanaTx = new web3.Transaction();
solanaTx.add(ins.innerTransaction.instructions[0]);

[tx, receipt] = await config.utils.executeComposabilityMethod(
  solanaTx.instructions[0],
  0,
  TestCallSolana,
  undefined,
  user1
);
console.log(tx, 'tx');
console.log(receipt.logs[0].args, 'receipt args');
```

This block of code creates a swap instruction using Raydium's `Liquidity` module. The instruction is then added to a Solana transaction, which is then executed via a composability method.

## How to run the script

To test the example script `RaydiumSwap.js` , run this command in the terminal -

```bash
npx hardhat run scripts/TestCallSolana/RaydiumSwap.js --network neonmainnet
```

After running the above command successfully, you should get the output similar to this -

```bash
EPE8HRAM9d3N5xHeQnYzESVgKNSvbyP5JEfMAgXUHsS3 contractPublicKey
Found pool info
Executing executeComposabilityMethod with Raydium's swap instruction ...
ContractTransactionResponse {
  provider: HardhatEthersProvider {
    _hardhatProvider: LazyInitializationProviderAdapter {
      _providerFactory: [AsyncFunction (anonymous)],
      _emitter: [EventEmitter],
      _initializingPromise: [Promise],
      provider: [BackwardsCompatibilityProviderAdapter]
    },
    _networkName: 'neonmainnet',
    _blockListeners: [],
    _transactionHashListeners: Map(0) {},
    _eventListeners: [],
    _isHardhatNetworkCached: false,
    _transactionHashPollingTimeout: undefined
  },
  blockNumber: null,
  blockHash: null,
  index: undefined,
  hash: '0xd166fcd39bc6cd93a75d14d39694fbfe33641ba134c15966dc0b851641d28c86',
  type: 0,
  to: '0xEf7b3ed123d2c51c780F8684B0DD7c0b4bd89190',
  from: '0x9CE2A03A7a258fB96d04Afb8Dd84b69A748B5959',
  nonce: 340,
  gasLimit: 300000n,
  gasPrice: 598145095750n,
  maxPriorityFeePerGas: null,
  maxFeePerGas: null,
  maxFeePerBlobGas: null,
  data: '0x121f31514bd949c43602c33f207790ed16a3524ca1b9975cf121a2a90cffec7df8b68acd00000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000078000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001206ddf6e1d765a193d9cbe146ceeb79ac1cb485ed5f5b37913a8cf5857eff00a9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003d6e472e67a46ea6b4bd0bab9dfd35e2b4c72f1d6d59c2eab95c942573ad22f1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014157b0580f31c5fce44a62582dbcf9d78ee75943a084a393b350368d2289930800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f92f390ff9609e8ad437bb8e4c1f1aa43ac05d24308cca77de8512c5509292d300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001abe43c7c1e21eaa6f97c8bd355e21bd1279674756c1c8e106c6e712ba116d97000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b870e12dd379891561d2e9fa8f26431834eb736f2f24fc2a2a4dff1fd5dca4df00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001f2cbb9b760eddb185706303063ad33d7b57296ea02d4e0335e31ceafa4cc42dd000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010d0751a8282da61305fe299c37b998e58471db1135037310f8be1045a60af6ee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006ac4c3cefa9f19bf54c8dc0f5e4d1ceee5327d26482b29d2b13cbaa43447218d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000146527949e0a7a659f8aadc86bc53cc7c42469a17765a9bad62b1b05bc868b5ee00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c9beb9b16d18a8273976ef89b7fde84aec9baaca0db173db8fda4ae0de478a34000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016b103231c975050cec8da6de40357c9bca60ef9e8f33165a255665652a82533b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a84bb6466246781d7a9adab8588ba86b2acce51358c844f5444e40640875fd5a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014c9d997d2ec43bdc0d236269cfb0d08391afd103fd8fbd63453ff58b6e23a92000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001aa5a31cb020bb002985ca929908171940fe635cb76e99ce4fb8805428bb8254a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000095b12c2855d4bce649b9fd852608e747f546f049d78a2beff1600295f3f3c772000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014f3c9bd3d0fd35e6dfb74137337d2f72e81721438d527b147e9a32949a59172a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c6d98c89611168a9961be2aa24bedbac9fd195d6337013a8a9cd74e3993040e400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001109a0860100000000008336000000000000000000000000000000000000000000',
  value: 0n,
  chainId: 245022934n,
  signature: Signature { r: "0x210b95035a1228647cd21e686ff577b0861da3a900f90e7b349bd005dc9b2ea6", s: "0x0c0609fdfb647e8db94beb9f07a38b73ba7fcdd2e5ca040c9951abf61724622f", yParity: 0, networkV: 490045903 },
  accessList: null,
  blobVersionedHashes: null
} tx
Result(3) [
  '0x',
  '0x0000000000000000000000000000000000000000000000000000000000000000',
  '0x'
] receipt args

```

:::important
The full code of the script can be viewed here [RaydiumSwap.js](https://github.com/neonlabsorg/neon-tutorials/blob/main/hardhat/scripts/TestCallSolana/RaydiumSwap.js).
:::
