# The SPL-token Precision in Neon EVM

### Problem
Calculations within Ethereum users' contracts are performed with an accuracy of *18* digits after the decimal point. In transactions created according to the Ethereum rules, tokens can be accurate to *18* characters after the decimal point. When these tokens are transferred to account balances in Solana via [Wormhole](https://doc.neon-labs.org/docs/glossary#wormhole), their accuracy is limited to *9* digits after the decimal point.

> Inside Neon EVM, numericals are limited to *9* decimal places. If a numerical contains from *10* to *18* digits after the decimal point other than zero, then these digits are discarded. No message is issued to a user.

### What can be affected by such a limitation of accuracy

  * There is no problem when calculating fee, gas-price, [gwei](https://doc.neon-labs.org/docs/glossary#gwei) is used as the calculation unit and, therefore, digits *10* to *18* always contain zeros after the decimal point.
  * There is no problem when transferring tokens in manual mode, since the transferred amount of tokens usually contains zero values after the 9th digit.
  * The problem can arise with numerical values that are obtained as a result of calculations by automated smart contracts.
  * The problem can arise when a user tries to convert [SPL-tokens](https://doc.neon-labs.org/docs/glossary#spl-token) to ETH and vice versa while those token values are calculated automatically within a smart-contract.

> It makes sense for users to store [SPL-tokens](https://doc.neon-labs.org/docs/glossary#spl-token) on their Solana account balances only with an accuracy of *9* digits!

### Examples with rounding values

*Example 1*
Alice sends *0.000 000 000 123 456 789 ETH* to Bob using NeonSwap.
After the transaction is completed, Bob's and Alice's balances stay unchanged.

*Example 2*
Alice sends *0.000 000 123 456 789 000 ETH* to Bob using NeonSwap.
After the transaction is completed, Alice's balance is debited by *0.000 000 123 ETH* and Bob's balance is credited by *0.000 000 123 ETH*.

*Example 3*
Alice sends *1.5 [gwei](https://doc.neon-labs.org/docs/glossary#gwei)* to Bob using NeonSwap.
After the transaction is completed, Alice's balance is debited by *1 [gwei](https://doc.neon-labs.org/docs/glossary#gwei)* and Bob's balance is credited by *1 [gwei](https://doc.neon-labs.org/docs/glossary#gwei)*.

### When will the problem be fixed
The search for a solution to fix this problem will start after MVP on Mainnet.
