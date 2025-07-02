---
title: Solana Interactions (Neon EVM → Solana Programs)
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: Grzegorz
comment: na
---

### **Transactions & Transfers**

Neon EVM enables seamless asset transfers between Solana accounts by invoking Solana programs through the `ICallSolana` interface. Transactions on Solana consist of instructions processed sequentially with atomic execution, ensuring all instructions succeed or the transaction fails. The `AccountMeta` struct defines accounts involved in instructions, specifying their address, writability, and signer status.

### **Transferring SOL**

Transferring SOL between accounts involves creating accounts on Solana and executing transfers using a Solidity smart contract (`TestCallSolana.sol`) on Neon EVM Devnet.

**Steps:**

1. **Setup**: Configure an EVM-compatible wallet (e.g., MetaMask) with Neon Devnet funds. Store private keys in a `.env` file.  
2. **Install Dependencies**: Run `npm cache clear --force` and `npm install` to include `@solana/web3.js`.  
3. **Compile Contracts**: Compile Solidity contracts with `npx hardhat compile`.  
4. **Execute Script**: Use `TransferSOLsBetweenAccounts.js` to:  
   * Connect to Solana Devnet (`web3.Connection`).  
   * Deploy or attach to `TestCallSolana` contract.  
   * Create SenderAccount and ReceiverAccount using `createAccountWithSeed`.  
   * Fund SenderAccount with 1 SOL using `SystemProgram.transfer`.  
   * Transfer 1 SOL to ReceiverAccount.  
   * Execute transactions via `batchExecuteComposabilityMethod`.  
5. **Run**: Execute with `npx hardhat run scripts/TestCallSolana/TransferSOLsBetweenAccounts.js --network neondevnet`.

**Example Code:**

```javascript
const connection = new web3.Connection(config.SOLANA_NODE, 'processed');
const [user1] = await ethers.getSigners();
const TestCallSolana = await ethers.getContractFactory('TestCallSolana').attach(config.CALL_SOLANA-sample_CONTRACT);
const payer = ethers.encodeBase58(await TestCallSolana.getPayer());
const minBalance = await connection.getMinimumBalanceForRentExemption(0);
const seedSender = 'salt' + Date.now().toString();
const SenderAccount = await web3.PublicKey.createWithSeed(new web3.PublicKey(contractPublicKey), seedSender, web3.SystemProgram.programId);
const solanaTx = new web3.Transaction().add(
    web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(payer),
        toPubkey: SenderAccount,
        lamports: 1000000000
    })
);
await config.utils.batchExecuteComposabilityMethod(solanaTx.instructions, [1000000000], TestCallSolana, undefined, user1);
```

### **Transferring SPL Tokens**

SPL tokens, Solana’s equivalent to ERC-20 tokens, can be transferred using Neon EVM by interacting with the SPL Token Program.

**Steps:**

1. **Setup**: Same as for SOL transfer.  
2. **Install Dependencies**: Include `@solana/spl-token`.  
3. **Execute Script**: Use `TransferSPLTokenBetweenAccounts.js` to:  
   * Create SenderAccount and ReceiverAccount.  
   * Mint 1000 SPL tokens to SenderAccount using `createMintToInstruction`.  
   * Transfer 10 tokens to ReceiverAccount using `createTransferInstruction`.  
   * Execute via `batchExecuteComposabilityMethod`.  
4. **Run**: Execute with `npx hardhat run scripts/TestCallSolana/TransferSPLTokenBetweenAccounts.js --network neondevnet`.

**Example Code:**

```javascript
const tokenMintPublickey = '8LkbY4Q1jGEF1BwedHz1ALM3q4zZRhZpCMWRe6SbrbKj';
const token = new web3.PublicKey(tokenMintPublickey);
const solanaTx = new web3.Transaction().add(
    createMintToInstruction(token, SenderAccount, new web3.PublicKey(contractPublicKey), 1000 * 10 ** 9)
).add(
    createTransferInstruction(SenderAccount, ReceiverAccount, contractPublickey, 10 * 10 ** 9)
);
await config.utils.batchExecuteComposabilityMethod(solanaTx.instructions, [0, 0], TestCallSolana, undefined, user1);
```

### **DeFi & Integrations**

#### **Swapping on Orca**

Swapping tokens on Orca DEX involves using the Whirlpool protocol to exchange tokens (e.g., devUSDC to devSAMO) on Solana Devnet.

**Steps:**

1. **Setup Environment**: Set `ANCHOR_PROVIDER_URL` and `ANCHOR_WALLET` for Solana Devnet.  
2. **Import Dependencies**: Include `@coral-xyz/anchor`, `@orca-so/whirlpools-sdk`.  
3. **Initialize Providers**: Set up Anchor provider and Whirlpool client.  
4. **Configure Swap**: Define token mints (e.g., devUSDC, devSAMO) and pool settings.  
5. **Check ATAs**: Ensure token accounts exist and have sufficient balance.  
6. **Execute Swap**: Get swap quote and execute using `WhirlpoolIx.SwapIx`.  
7. **Run**: Execute with `npx hardhat run scripts/TestCallSolana/OrcaSwap.js --network neondevnet`.

**Example Code:**

```javascript
const provider = AnchorProvider.env();
const whirlpoolProgramId = new web3.PublicKey('FcrweFY1G9HJAHG5inkGB6pkg1HZ6x9UC2WioAfWrGkR');
const whirlpool = await client.getPool(PDAUtil.getWhirlpool(whirlpoolProgramId, whirlpoolConfig, TokenB.mint, TokenA.mint, 64).publicKey);
const quote = await swapQuoteByInputToken(whirlpool, TokenB.mint, DecimalUtil.toBN(new Decimal(0.1), TokenB.decimals), Percentage.fromFraction(10, 1000));
const solanaTx = new web3.Transaction().add(WhirlpoolIx.SwapIx(whirlpool, {...}));
await config.utils.executeComposabilityMethod(solanaTx.instructions[0], 0, TestCallSolana, undefined, user1);
```

#### **Swapping on Raydium**

Swapping on Raydium DEX (e.g., wSOL to USDC) uses Solana Mainnet due to Devnet limitations.

**Steps:**

1. **Setup Environment**: Set variables for Solana Mainnet.  
2. **Import Dependencies**: Include `@raydium-io/raydium-sdk`.  
3. **Find Pool Info**: Use Raydium helper to locate pool for wSOL and USDC.  
4. **Check ATAs**: Verify token accounts and balances.  
5. **Execute Swap**: Create swap instruction with `Liquidity.makeSwapInstruction`.  
6. **Run**: Execute with `npx hardhat run scripts/TestCallSolana/RaydiumSwap.js --network neonmainnet`.

**Example Code:**

```javascript
const poolKeys = await config.raydiumHelper.findPoolInfoForTokens(swapConfig.liquidityFile, swapConfig.TokenA, swapConfig.TokenB);
const solanaTx = new web3.Transaction().add(Liquidity.makeSwapInstruction({...}));
await config.utils.executeComposabilityMethod(solanaTx.instructions[0], 0, TestCallSolana, undefined, user1);
```

### **Advanced Functionality**

#### **Using VRF**

The Verifiable Random Function (VRF) generates provably random numbers on Solana Devnet using the ORAO VRF program, useful for applications like NFTs or lotteries.

**Steps:**

1. **Setup Environment**: Set `ANCHOR_PROVIDER_URL` and `ANCHOR_WALLET`.  
2. **Initialize Providers**: Set up Anchor provider and ORAO VRF client.  
3. **Generate Seed**: Create a random keypair for the VRF seed.  
4. **Request Randomness**: Build and execute VRF request instruction.  
5. **Retrieve Randomness**: Wait for fulfillment and output result.  
6. **Run**: Execute with `npx hardhat run scripts/TestCallSolana/OraoNetworkVRF.js --network neondevnet`.

**Example Code:**

```javascript
const provider = AnchorProvider.env();
const vrf = new Orao(provider);
const seed = web3.Keypair.generate().publicKey;
const req = await vrf.request(seed);
const solanaTx = new web3.Transaction().add(req.build());
await config.utils.executeComposabilityMethod(solanaTx.instructions[0], 7103920, TestCallSolana, undefined, user1);
const randomness = await vrf.waitFulfilled(seed);
console.log(Buffer.from(randomness.randomness).readBigUInt64LE());
```
