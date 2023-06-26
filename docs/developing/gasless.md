---
title: Gasless transactions
proofedDate: na
iterationBy: HB
includedInSite: true
approvedBy: na
comment: 
---

## TL;DR

- You may arrange a starter pack of gasless transactions within Neon EVM from info@neonevm.org

## Introduction

What happens if you do not yet own enough (or any) NEON to pay for your user's first transactions? Don't worry, we have you covered with a starter pack of gasless transactions.

These transactions are still handled by your chosen [Proxy Operator](docs/developing/connect_rpc.md), however, the transaction cost is covered by us. 

## How does it work?

1. The end-user initiates a transaction via your dApp.

> dApps or end-users may use NeonPass to move SPL tokens from Solana or bridge assets across with a partner's bridge

2. Your dApp makes an RPC request to the Proxy Operator for the gas price.

:::note

A code example is provided below to demonstrate how to make a request for the user's transaction to be considered eligible for gasless.

:::

3. The Proxy Operator accepts the gasless request, and nominates the Neon account as eligible for N gasless transactions.

> If the account is not eligible, the gas is calculated as per the [normal flow](/docs/tokens/gas_fees).

4. The dApp supporting the transaction is provided a gas cost of zero for the applicable transactions.

6. The user signs the transaction with the zero gas price.

7. The Proxy Operator executes the transaction.

> The Proxy Operator pays the SOL gas fee as usual, but the commission is extracted from Neon Foundation, not the end user.

## How do I arrange to have gasless transactions?

If you are interested in a starter pack, then reach out to info@neonevm.org.

You may be wondering does "N" stand for? The minimum number of gasless transactions is 3 per novel Neon Account (i.e. per end user). However, favoured partners may negotiate better deals.


## Request gasless transactions

The following is an extract from a [boilerplate React App](https://codesandbox.io/s/t3fid3?file=/src/hooks/useEthereumTransaction.ts:937-1484) setup to undertake a [Neon swap](https://thirdweb.com/neon-evm-devnet/0xF3eBc32292F4BbFB83DECB97Eb42d95da968f775/sources).

<!-- New link for the React App, but it still reveals devs real name!! https://codesandbox.io/s/stupefied-leavitt-d7p4r9 -->

```JavaScript
	try 
	{
        // Get gasless transaction if user account is eligible
		const rawGasPrice = await axios.post(rpcApiUrl, {
          method: 'neon_gasPrice',
          params: [{ from: address }],
          jsonrpc: "2.0",
          id: new Date().getTime()
        })

        tx.gasPrice = rawGasPrice.data?.result;
      } catch (e) {
        //Else, get standard GAS price
        setError('Can\'t retrieve gas price for transaction')

        const rawGasPrice = await web3.eth.getGasPrice();

        tx.gasPrice = web3.utils.toHex(rawGasPrice);
      } finally {
        setTx(tx)
      }
```
