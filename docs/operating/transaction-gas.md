---
title: Fees & Gas
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: wip items inline
---

## TL;DR

Operators: 

- [Configure the Operator fee](#gas-price-the-operator-fee)
- [Configure oracle price sources](#calculation-configuration)
- [May reject transactions based on gas price](#minimum-gas-price)
- [Can set gas to zero for testing](#zero-gas-price-for-testing)
- Must configure the Proxy to accept no-fee transactions

<!-- wip Support needed for last item>> Operators need to accept request to provide gasless (0 gas fee transaction). Is this handled by the Proxy without any configuration? -->

## The Neon Operator economy

Neon Proxy enables Neon Operators to earn NEON tokens by processing transactions from Neon users.

The Neon Operator economy is based on providing a custom gas price returned by the eth_gasPrice method. The Neon Proxy calculates the gas price based on the assumption that it should cover the cost of transaction processing on the Solana cluster and include the profit of the Neon Operator. The Neon Operator should include all additional costs (such as hardware rent) plus profit in their Operator Fee. 

The Neon EVM calculates gas usage by tracking the SOL spent by the Neon Operator during transaction execution. The gas price includes the ratio of NEON and SOL tokens, so the payment from the Neon User to Neon Operator covers all spent SOLs. The ultimate gas price is variable because it depends on the prices of SOL and NEON. 

### Pass on gas savings

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

Neon recommends that Neon Operators should initially set `PRX_OPERATOR_FEE` to “1.0” for Mainnet launch. This allows Operators to cover their hardware costs while transaction demands are low. As demand grows, Operators may adjust their fees in response.

> For example, `PRX_OPERATOR_FEE` = “0.1” → 10% of the total possible Neon Operator fee.

## Minimum gas price

An Operator has two options:

- **Recommended**: set up the `PRX_MINIMAL_GAS_PRICE` to 1 as per the default value in EVMs
- Set up the `PRX_MINIMAL_GAS_PRICE` to reject low offers 

> For example, by setting the gas price minimum to 65 Galans, Neon Proxy rejects transactions with a gas price of less than 65.

If a transaction request arrives with a gas price below that of the Operator costs + Operator fee, but with a gas price larger than the designated `PRX_MINIMAL_GAS_PRICE`, the Neon Proxy accepts the transaction into mempool. 

The Neon transaction will only be executed when the gas price covers Operator costs + Operator fee. If the number of transactions in the mempool grows to the `PRX_MEMPOOL_CAPACITY` (by default =4096), Neon Proxy removes the transaction with the smallest gas price from the mempool to accept transactions with the higher gas price. Therefore, it's not critical to set the `PRX_MINIMAL_GAS_PRICE` to a small value. 


## Calculation configuration

The Neon Proxy has several settings accommodate the calculation of gas-price on your required network:

- `PRX_PP_SOLANA_URL`: the HTTP/S address of the Solana node (Devnet/Mainnet) that provides the Pyth data account that supplies $NEON and $SOL prices
- `PRX_PYTH_MAPPING_ACCOUNT`: the Solana address of the Pyth mapping account; select the address on (https://pyth.network/developers/accounts) based on the type of network (Devnet/Mainnet)
- `PRX_UPDATE_PYTH_MAPPING_PERIOD_SEC`: the time period to reread the Pyth mapping account. The Neon Proxy reads the Pyth mapping account at the start, gets the addresses of $NEON and $SOL accounts, and rechecks the address from the Pyth Mapping account only after `UPDATE_PYTH_MAPPING_PERIOD_SEC`. It is recommend to set this generously (e.g. 1/3/10 hours), because the price feed accounts don’t change often.
- `PRX_MINIMAL_GAS_PRICE`: the minimum gas price to accept transactions into the mempool for on-chain execution
> Let's take a closer look at the minimum gas price variable.

## Zero gas price for testing

On Devnet test NEON is availiable, however, for beta Mainnet testing purposes, the Neon Proxy can be configured to accept transactions with a 0 gas price (a balance of SOL is available to cover the transaction fees on Solana). 

To enable this configuration, the Neon Operator should set up the following parameters:

- PRX_PP_SOLANA_URL = ''
- PRX_PYTH_MAPPING_ACCOUNT = ''
- PRX_MINIMAL_GAS_PRICE = 0

As a result, the Neon Proxy returns the 0 gas price and accepts Neon transactions with the 0 gas price.
