---
title: ERC-20 Token List
proofedDate: 20230526
iterationBy: na
includedInSite: true
approvedBy: na
comment: TODO source of truth for https://github.com/neonlabsorg/token-list/blob/17a7b46f5786f3ae05e68db927e6629ba397459e/tokenlist.json needs programmatic update from this page -- want to include bridger info too when that applies -- is this possible? NB only full code block results in copy option -- tried this in HTML table and it is not compatible
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


To use SPL or ERC-20 tokens from a Neon account, you need to transact via the token's ERC-20 interface. This page provides the supported token's interface addresses. 
<!-- When performing operations on tokens in the Neon EVM, it is important to know which token symbol or address can be used. Having a list of possible tokens available, you can easily navigate when choosing the token you need. -->


## Token list
<!-- This source of truth is not currently truthful
  For the most up-to-date list of tokens whose contracts are deployed in Neon EVM and are available, see the [neonlabsorg/token-list](https://github.com/neonlabsorg/token-list/) repository. -->

## ERC-20 interface addresses on Neon

<Tabs>
  <TabItem value="mainnet" label="Mainnet Beta" default>
Chain ID: 245022934

|Token:Bridge|Mainnet ERC-20 interface address          |SPL address|
|-----|:-----------------------------------------|------|
|wNEON|0x202C35e517Fa803B537565c40F0a6965D7204609||
|AAVE |||
|wBAL |||
|BTC:Sollet|`0x54EcEC9D995A6CbFF3838F6a8F38099E518805d7`|`9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E`|
|wCRV |||
|wDAI |||
|WETH:Wormhole |`0xcFFd84d468220c11be64dc9dF64eaFE02AF60e8A`|`7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs`|
|USDC |`0xEA6B04272f9f62F997F666F07D3a974134f7FFb9`|`EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v`|
|USDT |`0x5f0155d08eF4aaE2B500AefB64A3419dA8bB611a`|`Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB`|
|SUSHI|||
|wSOL |`0x5f38248f339Bf4e84A2caf4e4c0552862dC9F82a`|`So11111111111111111111111111111111111111112`|
  </TabItem>
  <TabItem value="devnet" label="Devnet">
Chain ID: 245022926

|Token|Devnet ERC-20 interface address           |SPL address|
|-----|:-----------------------------------------|---|
|wNEON |`0x11adC2d986E334137b9ad0a0F290771F31e9517F`||
|AAVE |`0x10D486dD3B38a304cF61e8dA70ADED03D9a7787A`|`HdvHZXp5F4ZPxb5V7xG4gpBnwmbzMite85NSg3aycmhi`|
|wBAL:Wormhole |`0x7047dcc44E38798AC0CB9DE465609A7dd95d04dC`|`HU4jzc8c716ryzkfKYtg8PeJfYhjFmkmd3BGUh84fXq`Q|
|wWBTC:Wormhole|`0x2B86AEf728405F8F6597e5896a1844E36ddE77aD`|`AaymAPLHxVh68UJU4TkmSDZRnmebWPi8yxP5tmXv5xVU`|
|wCRV:Wormhole |`0x4cfb9dffB6998fB74c89a094E3A8373EA3C081ff`|`FTC9uerzkKGM2FzysdnxpPQMttkMDmjxsuiyGT5AmBnL`|
|wDAI |`0xC989FfF9d02C459117A2EaBb8dA3f03DFd9045DE`|`8QTYE7jw4oVYLqgNaks2Uu2S6VfboGcfpQ8Nvvta35Nc`|
|wETH:Sollet|`0x46E986B5b0f87F1026ff52Ce20340467199F891D`|`8F4V6tmyCgM4jnabiv8ohAGsLNrNWnwMrrXrY3LQwnwP`|
|USDC |||
|USDT |`0x6eEf939FC6e2B3F440dCbB72Ea81Cd63B5a519A5`|`3vxj94fSd3jrhaGAwaEKGDPEwn5Yqs81Ay5j1BcdMqSZ`|
|wWBTC |||
|SUSHI:Sollet|`0x72a3DD8111813d9B29ACAB4b90622Ba95BDF1414GhFhboJyEt1iHYu6r563y3PxZQ4j8YserdF7YiCYcJUX`|
|wSOL |`0xc7Fc9b46e479c5Cb42f6C458D1881e55E6B7986c`|`So11111111111111111111111111111111111111112`| 
  </TabItem>

</Tabs>
