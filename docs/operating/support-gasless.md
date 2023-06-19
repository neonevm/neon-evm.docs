---
title: Transaction gas
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

## TL;DR

Operators: 

- [Configure `PRX_OPERATOR_FEE`](#gas-price-the-operator-fee)
- [Set up price sources by network](#calculation-configuration)
- [May reject transactions based on gas price](#minimum-gas-price)
- [Can set gas to zero for test networks](#zero-gas-price-for-testing)
- Must configure the Proxy to accept no-fee transactions

<!-- Is this last item valid? Operators need to accept request to provide gasless (0 gas fee transaction). Is this handled by the Proxy without any configuration? -->

## Introduction to the Neon Operator economy

Neon Proxy enables Neon Operators to earn NEON tokens by processing transactions from Neon users.

The Neon Operator economy is based on providing a custom gas price returned by the eth_gasPrice method. The Neon Proxy calculates the gas price based on the assumption that it should cover the cost of transaction processing on the Solana cluster and include the profit of the Neon Operator. The Neon Operator should include all additional costs (such as hardware rent) plus profit in their Operator Fee. 

The Neon EVM calculates gas usage by tracking the SOL spent by the Neon Operator during transaction execution. The gas price includes the ratio of NEON and SOL tokens, so the payment from the Neon User to Neon Operator covers all spent SOLs. The ultimate gas price is variable because it depends on the prices of SOL and NEON. 

## Passing on gas savings

Because the Neon EVM operates on Solana, not Ethereum it takes advantage of Solana’s inexpensive transaction costs and favourable approach to only charge for storage allocation. This contrasts with Ethereum, where calculations require much more gas, and gas is charged for every change in data stored in Ethereum. As a result, gas usage on Solana is much cheaper than on Ethereum, and the Neon EVM passes these savings on to users.


## Gas price: the Operator fee

The Neon Proxy obtains the current prices of SOL and NEON tokens from the [pyth.network](http://pyth.network) oracles.

Gas price = $SOL / $NEON * (1 + `PRX_OPERATOR_FEE`)

> This ensures that the Neon Operator receives enough NEONs to cover the transaction cost in SOLs.

The Neon Operator configures the value of `PRX_OPERATOR_FEE` where 1.0 represents 100% of the potential fee extraction, i.e. PRX_OPERATOR_FEE = "1.0”  

For example:

- $NEON = $0.25
- $SOL = $10
- PRX_OPERATOR_FEE = "1"
- Gas price = 10 / 0.25 * (1 + 1) = 80 Galans

Neon recommends that Neon Operators should initiate their service with `PRX_OPERATOR_FEE` set to “1.0” for Mainnet launch. This will allow Operators to cover their hardware costs while transaction demands are low. As demand grows, Operators may adjust their fees in response.

> For example, `PRX_OPERATOR_FEE` = “0.1” → 10% of the total possible Neon Operator fee.

## Minimum gas price

An Operator has two options:

- **Recommended**: set up the `PRX_MINIMAL_GAS_PRICE` to 1 as per the default value in EVMs
- Set up the minimal gas price `PRX_MINIMAL_GAS_PRICE` to reject low offers. 

> For example, by setting the gas price minimum to 65 Galans, Neon Proxy rejects transactions with a gas price of less than 65.

If a transaction request arrives with a gas price below that of the Operator costs + Operator fee, but with a gas price larger than the designated `PRX_MINIMAL_GAS_PRICE`, the Neon Proxy accepts the transaction into mempool. 

The Neon transaction will only be executed when the gas price covers Operator costs + Operator fee. If the number of transactions in the mempool grows to the `PRX_MEMPOOL_CAPACITY` (by default =4096), Neon Proxy removes the transaction with the smallest gas price from the mempool to accept transactions with the higher gas price. Therefore, it is not critical to set the `PRX_MINIMAL_GAS_PRICE` to a small value. 


### Calculation configuration

The Neon Proxy has several settings accommodate the calculation of gas-price on your required network:

- `PRX_PP_SOLANA_URL`: the URL address of the Solana network with the main Pyth oracle contract that supplies $NEON and $SOL prices
- `PRX_PYTH_MAPPING_ACCOUNT`: address of the Pyth mapping account; check the address on (https://pyth.network/developers/accounts) based on the type of network (Devnet/Mainnet)
- `PRX_UPDATE_PYTH_MAPPING_PERIOD_SEC`: the time period to reread the Pyth mapping account. The Neon Proxy reads the Pyth mapping account at the start, gets the addresses of $NEON and $SOL accounts, and rechecks the address from the Pyth Mapping account only after `UPDATE_PYTH_MAPPING_PERIOD_SEC`. Recommend to set to some big number (1/3/10 hours), because the price feed accounts don’t change very often.
- `PRX_MINIMAL_GAS_PRICE`: the minimum gas price to accept transactions into the mempool for on-chain execution. 
> Let's take a closer look at the minimum gas price variable.

## Zero gas price for testing

For beta Mainnet testing purposes, the Neon Proxy can be configured to accept transactions with a 0 gas price: a balance of SOL has been made available to cover the transaction fees on Solana. The same method applies to Devnet.

To enable this configuration, the Neon Operator should set up the following parameters:

- PRX_PP_SOLANA_URL = ''
- PRX_PYTH_MAPPING_ACCOUNT = ''
- PRX_MINIMAL_GAS_PRICE = 0

As a result, the Neon Proxy returns the 0 gas price and accepts Neon transactions with the 0 gas price.