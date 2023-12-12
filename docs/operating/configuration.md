---
title: Variable Configuration
proofedDate: 20230622
iterationBy: na
includedInSite: true
approvedBy: na
comment: Need a location for the API calls https://www.notion.so/neonlabs/Neon-Specific-API-methods-3402baaad8fa4daeb12642495cf85eb3
---

## Configuration of Neon Proxy

The following variables may be configured to customize your Neon Proxy implementation:

|Variable|Description/Link                         |
|-----|:-----------------------------------------|
|`PRX_PERM_ACCOUNT_LIMIT` |[Sets number of holder accounts / TPS](accounts#holder-accounts) to provide 100 TPS, PRX_PERM_ACCOUNT_LIMIT = 32|
|`PRX_MINIMAL_GAS_PRICE`| [Hard set for minimum gas price to tx to mempool](transaction-gas#minimum-gas-price)|
|`PRX_OPERATOR_FEE`|Sets [Operator fee](transaction-gas#gas-price-the-operator-fee) as a fraction of 100%, 0.1 = 10% fee|
|`PRX_PP_SOLANA_URL`|[HTTP/S address of the Solana network with the main Pyth oracle contract](transaction-gas#calculation-configuration), e.g. this [Devnet](https://api.devnet.solana.com) address|
|`PRX_PYTH_MAPPING_ACCOUNT`|[Solana address of the Pyth mapping account](transaction-gas#calculation-configuration), e.g. this Devnet address `BmA9Z6FjioHJPpjT39QazZyhDRUdZy2ezwx4GiDdE2u2` as per the Pyth account data page, [pyth.network/developers/accounts](https://pyth.network/developers/accounts?cluster=devnet)|
|`PRX_UPDATE_PYTH_MAPPING_PERIOD_SEC`|[Time period to reread the Pyth mapping account](transaction-gas#calculation-configuration)|
|`PRX_HOLDER_SIZE`|[Holder account](/docs/architecture/solana-accounts/#holder-account-size) size. Defaults to 262,144 bytes|
|`FAUCET_URL`|For use in Devnet and Testnet: URL to the faucet service for distributing NEON tokens to the users|
|`INDEXER_ERC20_WRAPPER_WHITELIST`|A comma-separated list of ERC20-for-Spl wrapped tokens for transfer (those transactions which trigger the service to allow gas-less transactions). The gas-tank looks for the first transfers of such tokens from Solana to Neon (those transfers that lead to the creation of Neon accounts).|
|`PORTAL_BRIDGE_CONTRACTS`|A comma-separated list of Portal Bridge contracts|
|`PORTAL_BRIDGE_TOKENS_WHITELIST`|An allowlist of tokens for the transfer which will trigger gas-less transactions. This set should contain "tokenChain:tokenAddress", where: tokenChain is an original token chain number in terms of Portal bridge numbers tokenAddress is the address of the token in hexadecimal lowercase form with a '0x' prefix. Alt: provide the ANY value to accept any token.|
|`ERC20_BRIDGE_CONTRACTS`|A comma-separated list of Common ERC20 Bridge contracts|
|`ERC20_BRIDGE_TOKENS_WHITELIST`|An allowlist of tokens whose transfer triggers the providing of gasless transactions. Comma-separated ERC20 addresses. Alt: provide the `ANY` value to accept any token.|

## Gotchas

`PORTAL_BRIDGE_CONTRACTS` & `PORTAL_BRIDGE_TOKENS_WHITELIST` should both be specified. If either is missed, the gas tank doesn't analyze Portal Bridge transfers.

`ERC20_BRIDGE_CONTRACTS` & `ERC20_BRIDGE_TOKENS_WHITELIST` should both be specified. If they are missed, the gas tank doesn't analyze common ERC20 transfers.

## What next?

A full list of the parameters are available in the [sample configuration](https://github.com/neonlabsorg/infrastructure-kubernetes/blob/main/config.ini.sample).

