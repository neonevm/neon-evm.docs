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

|                                                                                                                                          | Token           | Mainnet ERC-20 interface address             | SPL address                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------- | -------------------------------------------- | ---------------------------------------------- |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wrapped-neon-logo.svg" className="coin-icon" />         | wNEON           | `0x202C35e517Fa803B537565c40F0a6965D7204609` |                                                |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/solana-wsol-logo.svg" className="coin-icon" />          | wSOL            | `0x5f38248f339Bf4e84A2caf4e4c0552862dC9F82a` | `So11111111111111111111111111111111111111112`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/usd-coin-usdc-logo.svg" className="coin-icon" />        | USDC            | `0xEA6B04272f9f62F997F666F07D3a974134f7FFb9` | `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/tether-usdt-logo.svg" className="coin-icon" />          | USDT            | `0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a` | `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wormhole-weth-logo.svg" className="coin-icon" />        | WETH (Wormhole) | `0xcFFd84d468220c11be64dc9dF64eaFE02AF60e8A` | `7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wrapped-btc-wormhole-logo.svg" className="coin-icon" /> | WBTC            | `0x16a3Fe59080D6944A42B441E44450432C1445372` | `3NZ9JMVBmGAqocybic2c7LQCJScmgsAZ6vQqTDzcqmJh` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/liquid-staking-token-logo.svg" className="coin-icon" /> | LST             | `0x14CCfFC97aC156A7f1E3183adAa8E7CC888AD162` | `LSTxxxnJzKDFSLr4dUkPcmCf5VyryEqzPLz5j4bpxFp`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/jitosol-token-logo.svg" className="coin-icon" />        | JitoSOL         | `0xFA8fB7e3bd299B2A9693B1BFDCf5DD13Ab57007E` | `J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/marinade-staked-sol-logo.svg" className="coin-icon" />  | mSOL            | `0x6EFFb385713f22df4846d8156451a5efEC22a4c8` | `mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/bonk-token-logo.svg" className="coin-icon" />           | Bonk            | `0xD4B6520f7Fb78E1EE75639F3376c581a71bcdb0E` | `DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/Mellivora-token-logo.svg" className="coin-icon" />      | MELL            | `0x26320e7ffd9be68ca61c1C75b3Be4aAb0AA98E1f` | `MELLd8PyFoeNW3D5VaUe7L96eZeihtrzgLWrbKz5DR2`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/mango-token-logo.svg" className="coin-icon" />          | MNGO            | `0x6d12eAA69f8e4902D3F83d546B31F7318717014C` | `MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/fidelion-token-logo.svg" className="coin-icon" />       | 2080            | `0x96e636d3Ef60ee9745945120010c73619144632C` | `Dwri1iuy5pDFf2u2GwwsH2MxjR6dATyDv9En9Jk8Fkof` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/pyth-token-logo.svg" className="coin-icon" />           | PYTH            | `0x0575dD4AFD93B7522fEE4e0179f243ecA3856137` | `HZ1JovNiVvGrGNiiYvEozEVgZ58xaU3RKwX8eACQBCt3` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/blaze-token-logo.svg" className="coin-icon" />          | BLZE            | `0x09F8A075D6fca984EA0bAda25A64326DF00691A4` | `BLZEEuZUBVqFhj8adcCFPJvPVCiCyVmh3hkJMrU8KuJA` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/jsol-logo.svg" className="coin-icon" />                 | JSOL            | `0x7b9f9033afcf602b556a7aeac5871a52b56a06ee` | `7Q2afV64in6N6SeZsAAB81TJzwDoD6zpqmHkzi9Dcavn` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/cgt-token-logo.svg" className="coin-icon" />            | CGT             | `0x9950ef047D87599EB28bF5E9Fc7F63cEd1b5F4AE` | `5qkTJu3hVd3SYToWpyHUmGfiLR48jj9oSz1WniV1UcgS` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/jupiter-logo.svg" className="coin-icon" />              | JUP             | `0x9F0fCE2AB962984b1EE50108A8510eA190BeEb8d` | `JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/dogwifhat-logo.png" className="coin-icon" />            | $WIF            | `0xF86934c2b05c31f3bBE3BCd6E3a8aA7790cAd9c1` | `EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wen-logo.png" className="coin-icon" />                  | WEN             | `0xc61e8aB62666D25F0854C5723587507A7E92E289` | `WENWENvqqNya429ubCdR81ZmD69brwQaaBYY6p3LCpk`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/popcat-logo.svg" className="coin-icon" />               | POPCAT          | `0xb89c62e960457d1d2c5f20135bedfd215d2466de` | `7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/whale-token-logo.svg" className="coin-icon" />          | WHALE           | `0x663572b924db12e0e3822c6160df29154630c8e3` | `9uhHjyfc5tKdaZnjstLLKoLGcF889ub8zX9wtwhtzgK6` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/hege-token-logo.svg" className="coin-icon" />           | HEGE            | `0x6Eb3d07B0E3A9b432A0e3828820e7c9cbEDfcD0B` | `ULwSJmmpxmnRfpu6BjnK6rprKXqD5jXUmPpS1FxHXFy`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/kart-token-logo.svg" className="coin-icon" />           | KART            | `0xdDFC206c7fd2B99C87a12eC5A3599C350D6d13c7` | `GDzfemoYR5GkbK4YupYpyq3E8Du9fSfKXxKDpkdrqGjs` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/solerium-logo.svg" className="coin-icon" />             | SOLE            | `0xc901d4d435a5f9b5a4c8b4074624b867d5295034` | `H2fjXJsDJq2ghbXzcYJzQ73sWj6A26qZouLtx6wmrd6`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/rz-token-logo.svg" className="coin-icon" />             | RZ              | `0x8fd74165048af8f63e0e2c8a0f7a80706e689265` | `874mHtP579VYPxjthdrVU286Qk9fDPaZkw6KPnpZqPJf` |

</TabItem>
<TabItem value="devnet" label="Devnet">

**Chain ID: 245022926**

|                                                                                                                                   | Token | Devnet ERC-20 interface address              | SPL address                                    |
| --------------------------------------------------------------------------------------------------------------------------------- | ----- | -------------------------------------------- | ---------------------------------------------- |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/wrapped-neon-logo.svg" className="coin-icon" />  | wNEON | `0x11adC2d986E334137b9ad0a0F290771F31e9517F` |                                                |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/solana-wsol-logo.svg" className="coin-icon" />   | wSOL  | `0xc7Fc9b46e479c5Cb42f6C458D1881e55E6B7986c` | `So11111111111111111111111111111111111111112`  |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/tether-usdt-logo.svg" className="coin-icon" />   | USDT  | `0x6eEf939FC6e2B3F440dCbB72Ea81Cd63B5a519A5` | `3vxj94fSd3jrhaGAwaEKGDPEwn5Yqs81Ay5j1BcdMqSZ` |
| <img src="https://raw.githubusercontent.com/neonlabsorg/token-list/master/assets/usd-coin-usdc-logo.svg" className="coin-icon" /> | USDC  | `0x512E48836Cd42F3eB6f50CEd9ffD81E0a7F15103` | `F4DgNXqiT3zUQA7dhqN5VzEPkRcd8vtqFwpJSwEEvnz5` |

</TabItem>
</Tabs>
