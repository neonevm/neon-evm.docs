---
title: Solana Native SDK (Solana Wallet → Neon EVM Programs)
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: Grzegorz
comment: na
---

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
