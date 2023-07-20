---
title: Variable Configuration
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: Do the API calls belong here too? <!-- https://www.notion.so/neonlabs/Neon-Specific-API-methods-3402baaad8fa4daeb12642495cf85eb3 -->
---

## Configuration of Neon Proxy

The following variables may be configured to customize your Neon Proxy implementation:

|Variable|Description/Link                         |
|-----|:-----------------------------------------|
|`PRX_PERM_ACCOUNT_LIMIT` |[Sets number of holder accounts / TPS](accounts#holder-accounts) to provide 100 TPS, PRX_PERM_ACCOUNT_LIMIT = 32|
|`PRX_MINIMAL_GAS_PRICE`| [Hard set for minimum gas price for tx](transaction-gas#minimum-gas-price)|
|`PRX_OPERATOR_FEE`|Sets [Operator fee](transaction-gas#gas-price-the-operator-fee) as fraction of 100%, 0.1 = 10% fee|
|`PRX_PP_SOLANA_URL`|[HTTP/S address of the Solana network with the main Pyth oracle contract](transaction-gas#calculation-configuration)|
|`PRX_PYTH_MAPPING_ACCOUNT`|[Solana address of the Pyth mapping account](transaction-gas#calculation-configuration)|
|`PRX_UPDATE_PYTH_MAPPING_PERIOD_SEC`|[Time period to reread the Pyth mapping account](transaction-gas#calculation-configuration)|
|`PRX_HOLDER_SIZE`|[Holder account](/docs/architecture/solana-accounts/#holder-account-size) size. Defaults to 262,144 bytes|


