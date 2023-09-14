---
title: ERC-20 Token List
proofedDate: 20230526
iterationBy: na
includedInSite: true
approvedBy: na
updateDetails: This source provides the NeonPass-supported tokens <!-- https://github.com/neonlabsorg/neonpass-ui/blob/5588478e7d421d07dd21b8440e6e0d6dd91d5fca/src/token-transfer/services/tokens-list.service.ts#L175-L184 --> HOWEVER not clear on the token naming (e.g. what is W_BTC? also not clear on which chain this applies to also not clear how bridger is identified -- what would SOETH look like compared to WETH -- sollet vs wormhole wrapped ETH?)
comment: TODO source of truth for <!-- https://github.com/neonlabsorg/token-list/blob/17a7b46f5786f3ae05e68db927e6629ba397459e/tokenlist.json --> needs programmatic update from this page -- want to include bridger info too when that applies -- is this possible? NB only full code block results in copy option -- tried this in HTML table and it is not compatible
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


To use SPL or ERC-20 tokens from a Neon account, you need to transact via the token's ERC-20 interface. This page provides the supported token's interface addresses. 

<!-- When performing operations on tokens in the Neon EVM, it is important to know which token symbol or address can be used. Having a list of possible tokens available, you can easily navigate when choosing the token you need. -->

For the most up-to-date list of tokens whose contracts are deployed in Neon EVM and are available, call the list with the [Factory contract](docs/developing/deploy_facilities/interacting_with_spl_tokens.md).

<!-- todo problem >> the repo is set to private, so end user does not have this option!
  For the most up-to-date list of tokens whose contracts are deployed in Neon EVM and are available, see the [neonlabsorg/token-list](https://github.com/neonlabsorg/token-list/) repository, or call the list with the [Factory contract](docs/developing/deploy_facilities/interacting_with_spl_tokens.md). 
-->

## Token list: NeonPass-supported tokens

The following tables provide the addresses of ERC-20 interface contracts for the tokens available through [NeonPass](docs/developing/integrate/neon_transfer.mdx).

## ERC-20 interface addresses on Neon

<Tabs>
  <TabItem value="mainnet" label="Mainnet" default>

**Chain ID: 245022934**

|                                                                                                                                   | Token           | Mainnet ERC-20 interface address             | SPL address                                    |
|-----------------------------------------------------------------------------------------------------------------------------------|-----------------|----------------------------------------------|------------------------------------------------|
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wrapped-neon-logo.svg" className="coin-icon" />  | wNEON           | `0x202C35e517Fa803B537565c40F0a6965D7204609` |                                                |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/solana-wsol-logo.svg" className="coin-icon" />   | wSOL            | `0x5f38248f339Bf4e84A2caf4e4c0552862dC9F82a` | `So11111111111111111111111111111111111111112`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/usd-coin-usdc-logo.svg" className="coin-icon" /> | USDC            | `0xEA6B04272f9f62F997F666F07D3a974134f7FFb9` | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/tether-usdt-logo.svg" className="coin-icon" />   | USDT            | `0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a` | `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/sollet-wbtc-logo.svg" className="coin-icon" />   | BTC (Sollet)    | `0x54EcEC9D995A6CbFF3838F6a8F38099E518805d7` | `9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wormhole-weth-logo.svg" className="coin-icon" /> | WETH (Wormhole) | `0xcFFd84d468220c11be64dc9dF64eaFE02AF60e8A` | `7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs` |
</TabItem>
<TabItem value="devnet" label="Devnet">

**Chain ID: 245022926**

|                                                                                                                                   | Token | Devnet ERC-20 interface address              | SPL address                                    |
|-----------------------------------------------------------------------------------------------------------------------------------|-------|----------------------------------------------|------------------------------------------------|
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wrapped-neon-logo.svg" className="coin-icon" />  | wNEON | `0x11adC2d986E334137b9ad0a0F290771F31e9517F` |                                                |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/solana-wsol-logo.svg" className="coin-icon" />   | wSOL  | `0xc7Fc9b46e479c5Cb42f6C458D1881e55E6B7986c` | `So11111111111111111111111111111111111111112`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/tether-usdt-logo.svg" className="coin-icon" />   | USDT  | `0x6eEf939FC6e2B3F440dCbB72Ea81Cd63B5a519A5` | `3vxj94fSd3jrhaGAwaEKGDPEwn5Yqs81Ay5j1BcdMqSZ` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/usd-coin-usdc-logo.svg" className="coin-icon" /> | USDC  | `0x512E48836Cd42F3eB6f50CEd9ffD81E0a7F15103` | `F4DgNXqiT3zUQA7dhqN5VzEPkRcd8vtqFwpJSwEEvnz5` |
</TabItem>
</Tabs>
