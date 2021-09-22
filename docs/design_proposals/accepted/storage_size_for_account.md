# Storage size limit for an account

## Problem
In Solana, the size of storage allocated for an account has a limit and it can not exceed *10 MB*. This means, the storage size of contracts placed on the account can also not exceed *10 MB*. This a threshold value limits an amount of records in a contract and can cause inconvenience to users.

## Suggested solutions
*Solution 1*. In Neon EVM storage, it is proposed to increase the amount of accounts by *1*. The implementation of this solution will be considered by the Neon EVM developers.  

*Solution 2*. In Solana storage, it is proposed to increase the threshold value of the account size, which will be more than *10 MB*. The implementation of this solution will be proposed by the Solana developers.  


It is assumed, at the startup of the [MVP](https://doc.neonlabs.org/docs/glossary#mvp) project, a contract can use no more *100 000* records for its data. It is not expected that this amount of records will be exceeded in a contract. Therefore, contracts that require a storage size of  more *10 MB* are not expected to appear.  
Therefore, in the first months of Neon EVM operation, the limit on the storage size allocated for one account will still remain the same *10 MB*.

