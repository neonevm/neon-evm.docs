## **ICallSolana Interface**

## **Introduction**

The `ICallSolana` interface is a standardized mechanism for enabling Ethereum-compatible smart contracts on Neon EVM to interact with Solana programs, facilitating cross-chain composability. It allows developers to leverage Solana’s high-performance blockchain while using familiar Ethereum tools, such as Solidity and Hardhat. The interface is likely implemented in the `ICallSolana.sol` contract, accessible via a precompile address (`0xFF00000000000000000000000000000000000006`), which enables Solidity contracts to execute Solana instructions through Cross Program Invocation (CPI).

This interface is critical for building decentralized applications (dApps) that combine the strengths of both ecosystems: Ethereum’s robust developer tooling and Solana’s scalability, high throughput, and low-latency transaction confirmations. By providing functions for address management, resource creation, and instruction execution, `ICallSolana` simplifies the process of integrating Neon EVM with Solana programs.

The interface is sourced from the provided documentation and is designed to be developer-friendly, with clear descriptions of structs and functions. For practical examples of its usage, such as transferring SOL, swapping tokens, or using Verifiable Random Function (VRF), developers can refer to related tutorials in the Neon EVM documentation.

## **Struct Variables**

The `ICallSolana` interface defines two key structs that are used to construct and execute instructions on Solana:

| Struct | Field | Type | Description |
| ----- | ----- | ----- | ----- |
| **AccountMeta** | account | bytes32 | The on-chain address of the account in bytes32 format. |
|  | is\_writable | boolean | Indicates whether the account’s data can be modified. |
|  | is\_signer | boolean | Indicates whether the account must sign the transaction. |
| **Instruction** | program\_id | bytes32 | The address of the program containing the instruction’s execution logic. |
|  | accounts | AccountMeta\[\] | A list of accounts required by the instruction. |
|  | instruction\_data | bytes | A byte buffer specifying the instruction handler and its arguments. |

These structs are essential for defining the accounts and data involved in Solana instructions, enabling precise and secure interactions between Neon EVM and Solana programs.


## **Functions**

The `ICallSolana` interface provides a comprehensive set of functions to facilitate interactions with Solana programs. Each function serves a specific purpose, from address conversion to executing complex instructions. Below is a detailed list of the functions and their use cases:

| Function | Description |
| ----- | ----- |
| `getNeonAddress(address) -> bytes32` | Converts a Neon EVM address to its corresponding Solana address in bytes32 format. Useful for mapping addresses between the two ecosystems. |
| `getResourceAddress(bytes32 salt) -> bytes32` | Returns the Solana address of a resource identified by the given salt. Helps in deterministically generating addresses for resources created on Solana. |
| `createResource(bytes32 salt, uint64 space, uint64 lamports, bytes32 owner) -> bytes32` | Creates a new resource on Solana with the specified salt, space, lamports, and owner, returning its address. Allows for the creation of new accounts or resources from Neon EVM contracts. |
| `getSolanaPDA(bytes32 program_id, bytes memory seeds) -> bytes32` | Generates a Program Derived Address (PDA) on Solana using the provided program ID and seeds. Essential for creating deterministic addresses controlled by programs rather than private keys. |
| `getExtAuthority(bytes32 salt) -> bytes32` | Returns the Solana address of an external authority based on the provided salt. Used for generating addresses for external authorities in program logic. |
| `getPayer() -> bytes32` | Retrieves the Solana address of the payer account, responsible for funding new accounts. Necessary for transactions requiring account creation. |
| `execute(uint64 lamports, Instruction memory instruction) -> bytes` | Executes a Solana instruction using a PDA for authorization, returning the executed data. Allows Neon EVM contracts to execute Solana instructions directly. |
| `executeWithSeed(uint64 lamports, bytes32 salt, Instruction memory instruction) -> bytes` | Executes a Solana instruction using an external authority derived from the salt. Provides an alternative authorization mechanism. |
| `execute(uint64 lamports, bytes memory instruction) -> bytes` | Executes a bincode-serialized instruction using a PDA for authorization. Supports efficient execution of pre-serialized instructions. |
| `executeWithSeed(uint64 lamports, bytes32 salt, bytes memory instruction) -> bytes` | Executes a bincode-serialized instruction using an external authority derived from the salt. Combines serialization with external authority authorization. |
| `getReturnData() -> bytes32, bytes` | Retrieves the program ID and data returned from the last executed instruction. Must be called after `execute` or `executeWithSeed` methods to process results. |

## **Conclusion**

The `ICallSolana` interface is a powerful tool for developers building cross-chain dApps that integrate Neon EVM with Solana. By providing a standardized way to manage accounts, generate addresses, and execute instructions, it simplifies the development process and enhances the capabilities of dApps. Developers can use this interface to perform tasks such as transferring SOL and SPL tokens, swapping tokens on decentralized exchanges (DEXs) like Orca and Raydium, and utilizing advanced features like Verifiable Random Function (VRF) for on-chain randomness.

For practical examples of how to use the `ICallSolana` interface, developers can refer to related tutorials in the Neon EVM documentation, such as those for transferring assets, swapping tokens, or generating random numbers. The interface contract, `ICallSolana.sol`, can be found in the \[Neon EVM GitHub repository\](\[invalid url, do not cite\]).

## **2\. Solana Interactions (Neon EVM → Solana Programs)**

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

## **3\. Solana Native SDK (Solana Wallet → Neon EVM Programs)**

### **Overview of Solana Native SDK**

The Solana Native SDK, also known as the Solana Signer SDK, enables Solana wallets (e.g., Phantom) to sign and interact with Neon EVM programs. It supports cross-program interactions, allowing Solana-native assets to be used in Ethereum-compatible smart contracts within Solana’s Layer 1 ecosystem.

**Key Features:**

* **Wallet Integration**: Connects Solana wallets for transaction signing.  
* **Scheduled Transactions**: Supports creating and sending scheduled transactions.  
* **Token Swaps**: Facilitates token swaps via DEXs on Neon EVM.  
* **SPL to ERC-20 Conversion**: Automatically wraps SPL tokens as ERC-20 tokens and unwraps them back within a single Solana transaction.

The Neon Solana Signature Demo showcases these capabilities, with versions for basic token transfers (v1) and advanced DEX swaps (v2).

### **Setup and Configuration**

**Steps:**

1. **Install Dependencies**:

```shell
yarn install
```

2. **Build Project**:

```shell
yarn build
```

3. **Run Tests**:

```shell
cd packages/core
yarn test
```

4. **Setup Providers**:

```javascript
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
const proxyApi = new NeonProxyRpcApi('https://proxy.devnet.neonlabs.org');
```

5. **Connect Wallet**:

```javascript
const solanaPrivateKey = bs58.decode('<your_private_key_base58>');
const keypair = Keypair.fromSecretKey(solanaPrivateKey);
const {chainId, solanaUser, provider} = await proxyApi.init(keypair);
await solanaAirdrop(connection, solanaUser.publicKey, 1e9);
```

6. **UI Configuration**:  
   * Set `.env` variables:

```
REACT_APP_SOLANA_URL=https://api.devnet.solana.com
REACT_APP_NEON_CORE_API_RPC_URL=https://proxy.devnet.neonlabs.org
REACT_APP_NEON_CORE_API_URL=https://api.devnet.neonlabs.org
```

   * Run UI:

```shell
yarn install
yarn start
```
