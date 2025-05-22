---
title: Memecoin Launchpad & Raydium Integration
---

**Overview**

This project enables the creation, funding, and launch of memecoins on **Solana** using **Neon EVM**, with seamless integration to **Raydium** for automated liquidity provisioning. It combines Ethereum-style smart contracts with Solana’s native token and AMM (Automated Market Maker) infrastructure.

**Architecture Components**

**Ethereum Side (Neon EVM)**

* **TokenFactory.sol**

Smart contract for token creation, funding, and trading logic.

* **IERC20.sol & IERC20Metadata.sol**

Standard ERC-20 interfaces for token interactions.

* **Bonding Curve**

Custom algorithm for dynamic token pricing during funding.

**Solana Side**

* **WSOL Token Mint**

Used as the finding asset in the launchpad.

* **SPL Token Accounts (ATAs)**

Created for WSOL and the new memecoin to allow token transfers.

* **Raydium SDK v2**

Used for creating CPMM (Constant Product Market Maker) pools and managing liquidity.

**Deployment** 

**Prerequisites**

* Solana CLI installed  
* Node.js and npm  
* Hardhat setup for Neon EVM  
* Raydium SDK dependencies  
* ANCHOR\_WALLET environment variable pointing to your Solana wallet (e.g., ./id.json)  
* .env with private keys and sensitive config  
* Funded Solana and Neon accounts

**Deployment Steps**

**1\. Deploy Smart Contracts (Neon EVM)**

What it does:

* Deploys BondingCurve and TokenFactory  
* Saves addresses and config to config.json  
* Sets curve constants and fee logic

**Run this command:**

npx hardhat run scripts/MemecoinLaunchpad/deploy.js \--network neondevnet

**2\. Demo Token Launch with Raydium Integration**

What it does:

* Creates a new token via TokenFactory  
* Generates ATAs for WSOL \+ new token  
* Simulates:  
  * Partial token purchase (25%)  
  * Token sale (50%)  
  * Final purchase to meet funding goal

Automatically creates a CPMM pool on Raydium

* Locks liquidity into the pool  
* Changes token status to TRADING

**Run this command:**

npx hardhat run scripts/MemecoinLaunchpad/demo.js \--network neondevnet

**Alternative (with wallet):**

ANCHOR\_WALLET=./id.json node demo.js

**Contracts Overview**

**1\. BondingCurve.sol**

Implements the pricing algorithm:

price \= a \* supply^2 \+ b \* supply

Used during the funding phase for dynamic pricing.

**2\. TokenFactory.sol**

Manages:

* Token deployment  
* Token funding lifecycle  
* Raydium integration (via cross-chain calls)

**3\. ERC20ForSplMintable.sol**

ERC-20 compatible token backed by Solana’s SPL token mint.

**4\. CallSolana.sol**

Bridges Neon → Solana by issuing cross-chain messages using Neon’s composability.

**Solana Integration**

* Wraps WSOL into ERC20 format  
* Creates token ATAs  
* Interacts with Raydium pools programmatically  
* Converts between EVM hex and Solana base58 addresses

**Configuration Constants**

| Name | Value |
| ----- | ----- |
| WSOL\_TOKEN\_ADDRESS | 0xc7Fc9b46e479c5Cb42f6C458D1881e55E6B7986c |
| ERC20\_FOR\_SPL\_FACTORY\_ADDRESS | 0xF6b17787154C418d5773Ea22Afc87A95CAA3e957 |
| BONDING\_CURVE\_A | 1e15 |
| BONDING\_CURVE\_B | 2e15 |
| FEE\_PERCENT | 300 (3%) |
| FUNDING\_GOAL | 0.1 SOL |

**Testing Flow**

| Step | Description |
| ----- | ----- |
| Token Created | Using TokenFactory |
| Initial Buy | Funds 25% of goal |
| Token Sell | User sells 50% of tokens |
| Final Buy | Fills the remaining 75% |
| Pool Creation | Raydium CPMM pool created |
| Liquidity Lock | Funds locked into the Raydium pool |
| Status Update | Token enters TRADING phase |

**Wallet Setup**

Export Phantom Wallet private key:

	1\.	Copy private key from Phantom

	2\.	Edit convert-key.js:

const privateKey \= \[/\* your key array \*/\];

	3\.	Run:

node convert-key.js

	4\.	Secure it:

chmod 600 id.json

Set the wallet environment:
```
export ANCHOR\_WALLET=./id.json
```
**Troubleshooting**

| Issue | Solution |
| ----- | ----- |
| **Insufficient WSOL** | Ensure wallet is funded with SOL & WSOL |
| **Missing config.json** | Run deploy.js first |
| **Cross-chain error** | Check address formatting (hex vs base58) |
| **Raydium pool not created** | Confirm token is fully funded |

**Resources**

1. [Neon EVM Docs](https://neonlabs.org/docs/)  
2. [Raydium SDK](https://github.com/raydium-io/raydium-sdk)  
3. [Solana Dev Docs](https://docs.solana.com/)  
4. [Blockscout for Neon](https://neonscan.org/)

**Disclaimer**

This is a demo project for educational and testing purposes. Contracts have not been audited. Use at your own risk in production environments.

