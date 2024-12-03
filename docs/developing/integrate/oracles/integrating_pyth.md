---
title: Pyth
proofedDate: 20240502
iterationBy: HB
includedInSite: true
approvedBy: na
comment:
---

import mm_p_key from '@site/static/img/doc-images/developing/deploy_facilities/foundry-metamask.png';

## Introduction

[Pyth](https://pyth.network/) is an open-source real-time on-chain market data feed. Neon EVM can read Pyth Solana Mainnet and Devnet price feeds natively with precompiles.


## Deployed feeds

The Pyth on Neon EVM supports the following feeds:

<Tabs>

  <TabItem value="Mainnet" label="Mainnet">

| <div style="width:100px">Price feed</div> | Neon EVM address | Price feed ID |
| ------- | --- | --- |
| SOL/ USDC | [0x66d23fc4521d75613921f6475ce1776ed4a8f109](https://neon.blockscout.com/address/0x66d23fc4521d75613921f6475ce1776ed4a8f109) | 0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d |
| USDC/USD | [0x94CDaE0758F7dA5EcA97646A665345BC20f72D53](https://neon.blockscout.com/address/0x94CDaE0758F7dA5EcA97646A665345BC20f72D53) | 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a |
| USDT/USD | [0xb22f95f4F203646ffe5752A5C1142A359c82cD47](https://neon.blockscout.com/address/0xb22f95f4F203646ffe5752A5C1142A359c82cD47) | 0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b |
| ETH/USD | [0x9ca5Ae7Fdc9Ef33fd8B86634678252Af052cF920](https://neon.blockscout.com/address/0x9ca5Ae7Fdc9Ef33fd8B86634678252Af052cF920) | 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace |
| NEON/ USD | [0x5418Bd0bd3A43D6DcC486fb374a2346BE5e07A0D](https://neon.blockscout.com/address/0x5418Bd0bd3A43D6DcC486fb374a2346BE5e07A0D) | 0xd82183dd487bef3208a227bb25d748930db58862c5121198e723ed0976eb92b7 |
| BTC/USD | [0x4359E879c83fB21e33BB62061bf22806873F06d6](https://neon.blockscout.com/address/0x4359E879c83fB21e33BB62061bf22806873F06d6) | 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43 |
| WBTC/USD | [0x8C96809746B45e1506007613d6Ec035cA41bEcB4](https://neon.blockscout.com/address/0x8C96809746B45e1506007613d6Ec035cA41bEcB4) | 0xc9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33 |
| JITOSOL/USD | [0x05CE377b7df379460EdEcB2baa3Ca18fB59b082C](https://neon.blockscout.com/address/0x05CE377b7df379460EdEcB2baa3Ca18fB59b082C) | 0x67be9f519b95cf24338801051f9a808eff0a578ccb388db73b7f6fe1de019ffb |
| MSOL/USD | [0x47b1aD7a08D026a54DEd3d9C3935173FEdfbD2CF](https://neon.blockscout.com/address/0x47b1aD7a08D026a54DEd3d9C3935173FEdfbD2CF) | 0xc2289a6a43d2ce91c6f55caec370f4acc38a2ed477f58813334c6d03749ff2a4 |
| BONK/USD | [0x3d22FD7e59D19e08a6D5f55aD720549339fc8544](https://neon.blockscout.com/address/0x3d22FD7e59D19e08a6D5f55aD720549339fc8544) | 0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419 |
| JUP/USD | [0xD98d90B922C0a7112825232C7380B99176F090A7](https://neon.blockscout.com/address/0xD98d90B922C0a7112825232C7380B99176F090A7) | 0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996 |
| INF/USD | [0x4Ff8DfecEb1d29bbF58e92Cc9847fd20b51406aD](https://neon.blockscout.com/address/0x4Ff8DfecEb1d29bbF58e92Cc9847fd20b51406aD) | 0xf51570985c642c49c2d6e50156390fdba80bb6d5f7fa389d2f012ced4f7d208f |

</TabItem>
  <TabItem value="Devnet" label="Devnet"> 

| <div style="width:100px">Price feed</div> | Neon EVM address | Price feed ID |
| ------- | --- | --- |
| SOL/USDC | [0x19c6315fCb69aAE8eB74f0c8a6c1a1DD9540F64f](https://neon.blockscout.com/address/0x19c6315fCb69aAE8eB74f0c8a6c1a1DD9540F64f) | 0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d |
| USDC/USD | [0xdc339bBBFfab4ED48F387e2247f5e2a19EFD33D1](https://neon.blockscout.com/address/0xdc339bBBFfab4ED48F387e2247f5e2a19EFD33D1) | 0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a |
| USDT/USD | [0xDea4B3Dd378DDeB434D3ed99E42F323E724776a8](https://neon.blockscout.com/address/0xDea4B3Dd378DDeB434D3ed99E42F323E724776a8) | 0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b |
| ETH/USD | [0x89B341c29272bb8e769F237238E6176D9d55f57e](https://neon.blockscout.com/address/0x89B341c29272bb8e769F237238E6176D9d55f57e) | 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace |
| NEON/USD | [0xE587137a76dF04Bf25A9a83e681d6814f312500f](https://neon.blockscout.com/address/0xE587137a76dF04Bf25A9a83e681d6814f312500f) | 0xd82183dd487bef3208a227bb25d748930db58862c5121198e723ed0976eb92b7 |
| BTC/USD | [0x125BCeDd1C104024904E4Ee376c4B0e58620677C](https://neon.blockscout.com/address/0x125BCeDd1C104024904E4Ee376c4B0e58620677C) | 0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43 |
| WBTC/USD | N/A | 0xc9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33 |
| JITOSOL/USD | [0xb7B6AF71eB684d2594EDC5Bc7812ad4937864561](https://neon.blockscout.com/address/0xb7B6AF71eB684d2594EDC5Bc7812ad4937864561) | 0x67be9f519b95cf24338801051f9a808eff0a578ccb388db73b7f6fe1de019ffb |
| MSOL/USD | [0xeafBBf2E99403516A28Bf6556477472580739c06](https://neon.blockscout.com/address/0xeafBBf2E99403516A28Bf6556477472580739c06) | 0xc2289a6a43d2ce91c6f55caec370f4acc38a2ed477f58813334c6d03749ff2a4 |
| BONK/USD | [0xed78C14f68D65157b64C9Cf2FadD0b89f2043eD4](https://neon.blockscout.com/address/0xed78C14f68D65157b64C9Cf2FadD0b89f2043eD4) | 0x72b021217ca3fe68922a19aaf990109cb9d84e9ad004b4d2025ad6f529314419 |
| JUP/USD | [0x127063555ecF8B20aBFa6169fD3A70CeA30e17fB](https://neon.blockscout.com/address/0x127063555ecF8B20aBFa6169fD3A70CeA30e17fB) | 0x0a0408d619e9380abad35060f9192039ed5042fa6f82301d0e48bb52be830996 |
| INF/USD | [0x06D84D91d003013Bafc550f907A728413bfdb342](https://neon.blockscout.com/address/0x06D84D91d003013Bafc550f907A728413bfdb342) | 0xf51570985c642c49c2d6e50156390fdba80bb6d5f7fa389d2f012ced4f7d208f |

  </TabItem>
</Tabs>


## How to integrate with the Pyth contract

You can use this [Boilerplate code](https://github.com/neonlabsorg/neon-contracts/blob/main/contracts/oracles/Pyth/PythAggregatorV3.sol) for your contract to use the Pyth feeds on Neon EVM.

If you wish to have access over a not yet Neeon-deployed price feed from Solana, you can leverage this [script](https://github.com/neonlabsorg/neon-contracts/blob/main/scripts/oracles/Pyth/PythAggregatorV3.js) to deploy the price feed.


:::important
It's recommended to follow the [consumer best practices](https://docs.pyth.network/documentation/pythnet-price-feeds/best-practices) when consuming Pyth data.
:::
