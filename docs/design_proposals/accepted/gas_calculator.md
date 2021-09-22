# Neon and Ethereum gas calculators give different results

### Problem
In Neon EVM, a calculator is implemented to account the gas consumption.
Despite the fact that this calculator is implemented in the same way as in Ethereum, sometimes it shows different results in gas calculations on tests.  

Since contracts for Neon EVM can be created using various languages (including *Solidity/Viper/others*), these contracts can implement their own gas counting method.  

Let's assume that the Ethereum network contract implements the following operations:
  * Calculation of gas consumption using their own methods.
  * Calculation of gas consumption using the EVM calculator.
  * Comparison of the results obtained.

Since the results may be different, this method will not be able to work.

At the moment, the following is known about this bug:
  * The error is in the Neon EVM code.
  * The error does not affect the stability of the code.
  * The error appears if:
    * a contract independently calculates gas consumption.
    * in the contract, the calculation is checked with issuing a message like this: "the gas has been calculated correctly".

Due to a bug in the Neon EVM code, the result of such checks may be incorrect.

### When the bug is expected to be fixed
Investigating and fixing the bug will start after MVP on Mainnet.

