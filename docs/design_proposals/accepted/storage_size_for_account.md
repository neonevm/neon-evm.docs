---
title: Storage Size Limit for an Account
---

### Problem
In Solana, the size of storage allocated for an account has a limit and it can not exceed *10 MB*. This means that the storage size of contracts placed on the account can also not exceed *10 MB*. This threshold value limits the amount of records in a contract and can be an inconvenience to users.

### Suggested Solutions
*Solution 1*. In Neon EVM storage, it is proposed to increase the amount of accounts by *1*. The implementation of this solution will be considered by the Neon EVM developers.

*Solution 2*. In Solana storage, it is proposed to increase the threshold value of the account size to more than *10 MB*. The implementation of this solution will be proposed by the Solana developers.

The *10 MB* limit means that about *100,000* records can be used by the contract for its data. This limitation is set directly in Solana. It is large enough and not critical. At the startup of the [MVP](about/terminology.md#minimum-viable-product-mvp) project, we do not expect contracts with sizes exceeding *10 MB* to appear.

Therefore, in the first months of Neon EVM operation, the limit on the storage size allocated for one account will remain at *10 MB*.
