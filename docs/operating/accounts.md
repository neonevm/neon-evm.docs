---
title: Accounts & Payment
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: todo 1. dedicated script in text as wip 2. Link to Docker compose file wip
---

import solBal from '@site/static/img/doc-images/operating/sol-bal.png';
import neonBal from '@site/static/img/doc-images/operating/neon-bal.png';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## TL;DR

- Operator keys are whitelisted for Proxy access
- Key accounts provide SOL to support Neon EVM transactions
- Account balances may be queried and topped up
- Security of accounts is a consideration

## The Operator key

The Operator key is an account that is whitelisted by the Neon EVM. Neon Proxy creates several holder accounts linked to each Neon Operator key (if the Neon Operator key has enough SOLs).

> Neon DAO provides the governance to determine the whitelist.

:::info

Operator keys should be spread [evenly between Proxy instances](operator-introduction#redundancy).

:::

## Holder accounts

[Holder accounts](/docs/architecture/solana-accounts/#holder-accounts) are a crucial element of Neon EVM. Neon Proxy creates holder accounts with [rent-exempt balances](https://docs.solana.com/ru/developing/programming-model/accounts#rent) on start. The number of holder accounts created determines the TPS provided to users and can be configured with `PRX_PERM_ACCOUNT_LIMIT`. 

You may retrieve a list of Neon Operator key accounts and attached holder accounts (see [**Retrieve your balance**](#query-balance), below).


## Account balance

The Neon Operator maintains a balance of SOLs in the account associated with each Operator key to pay gas on Solana in SOLs to process Neon transactions.

### Required balance

We recommend maintaining a balance of 100—200 SOLs in Neon Operator key accounts.

:::caution

Best practice is to use the dedicated script (wip: coming soon!) to automatically transfer SOLs to your Neon Operator key accounts when the balance becomes too low. This security measure avoids storing excessive SOLs in Neon Operator key accounts, to protect them from a malicious user. The potential vulnerability arises because the Neon Proxy has access to Neon Operator keys. Therefore, should a hacker gain access to the Neon Operator server they may get access to the Neon Proxy configuration with the Neon Operator keys.

:::

Solana requires SOLs on the balance of any account, and the balance depends on the size of the account. So, the Neon Operator needs SOLs in place for Neon Proxy to create the holder accounts.

The number of required SOLs depends on:

- The size of the [holder account](/docs/architecture/solana-accounts/#holder-account-size)
- The number of holder accounts 

> Remember, the number of holder accounts correlates with the the TPS of the Neon Proxy instance.


<Tabs>
	<TabItem value="cost1" label="Solana standard rent" default>

For a rent-exempt account of 262,144 bytes, Solana requires:
- Solana rent 262144
- Rent per byte-year: 0.00000348 SOL
- Rent per epoch: 0.004997815 SOL
- Rent-exempt minimum: 1.82541312 SOL

</TabItem>
<TabItem value="calculate" label="Calculate SOL balance required" default>

To calculate the number of SOLs required by the Neon Operator, use the next formula:

- The TPS depends on the finalization time of the Solana, which is equal to 32 Solana blocks because the content of the holder account should be kept till the Neon transaction finalization
- The Solana block time is 400 ms. So in 1 second, Solana produces 1 / 0.4 = 2.5 blocks.

The formula to calculate the number of holder accounts and required SOLs.

```bash
Number-of-Holders = TPS / Solana-Blocks-per-Sec * Solana-Blocks-for-Finalization
- Solana-Blocks-per-Second = 2.5 (see above)
- Solana-Blocks-for-Finalization = 32 (see above)

SOLs-for-Holders = Rent-Exempt-Balance * Number-of-Holders
- Rent-Exempt-Balance = 1.82541312 SOL (see above)

Number-of-Holders-per-Operator-key = Number-of-Holders / Number-of-Operator-keys
```

For example, for 100 TPS and 40 Neon Operator keys:

```bash
Number-of-Holders = 100 / 2.5 * 32 = 1280
SOLs-for-Holders = 1.82541312 * 1280 = 2336.5287936 SOL
Number-of-Holders-per-Operator-key = 1280 / 40 = 32
```

For example, for 50 TPS and 40 Neon Operator keys:

```bash
Number-of-Holders = 50 / 2.5 * 32 = 640
SOLs-for-Holders = 1.82541312 * 640 = 1168,2643968 SOL
Number-of-Holders-per-Operator-key = 640 / 40 = 16
```

The Neon team recommendations are to provide:

- The number of Neon Operator keys = 40 (should be included in the whitelist in the NeonEVM program by the Neon Governance)
- The number of holders per Neon Operator key = 32 (to provide 100 TPS, the Neon Operator should setup PRX_PERM_ACCOUNT_LIMIT = 32)
- The Neon Operator should have 2336.5287936 SOL on the balance of Neon Operator keys, or 2336.5287936 / 40 = 58,41321984 SOLs on each Neon Operator key at the start
- The Neon Operator should have 200 SOLs available per month to process Neon transactions. That means the total balance on each Neon Operator key will be = 58,41321984 + 200 / 40 = 63,41321984 SOLs

</TabItem>
</Tabs>


### Query balance

You may query your account balances visually or programmatically.

<Tabs>
	<TabItem value="View" label="View your balance" default>

Neon Proxy provides a local Grafana dashboad which monitors statistics in the Prometheus/Grafana. They display metrics from operator_neon_balance and operator_sol_balance.

> <img src={solBal} />

> <img src={neonBal} />

</TabItem>
<TabItem value="Retrieve" label="Retrieve your balance" default>

The command that retrieves the list of Neon Operator key accounts and attached holder accounts provided by your Proxy instance:

- Docker
```bash
docker exec -ti proxy ./proxy-cli.sh info solana-accounts
```

- Kubernetes
```bash
kubectl -nneon-proxy exec -it neon-proxy-0 -- ./proxy-cli.sh info solana-accounts
```
Returns both the account address and the account balances.

```
BMp6gEnveANdvSvspESJUrNczuHz1GF5UQKjVLCkAZih	 499,845,973.855814040
holder:
	 2f372pRn7EMdw5zXg777AJT35KdjLSssFN5WF4tEwxLf	 0.913152000
	 AUWqkg2YCPXRzuszZX84rQ8WhCKLKk7751QQv8VbXUoD	 0.913152000
9kPRbbwKL5SYELF4cZqWWFmP88QkKys51DoaUBx8eK73	 5,997.928707200
holder:
	 5Hkx7V84kVPH1bhgnytS6GB7oH7yPXQ9Yvt6YML6SKcQ	 0.913152000
	 53ptDdWaL5w2kPHmhbewiu7TVBDpiL2fvEEPDFppqdhD	 0.913152000
....
total_balance	 499,991,914.067759640
resource_balance	 54.789120000

```

Alternatively, you may retrieve a structured JSON output with more detailed account information by using:

- Docker
```bash
docker exec -ti proxy ./proxy-cli.sh info | python3 -mjson.tool
```

- Kubernetes
```bash
kubectl -nneon-proxy exec -it neon-proxy-0 -- ./proxy-cli.sh info | python3 -mjson.tool
```

</TabItem>
</Tabs>

### Topup balance

Neon provides a docker compose file to add SOLs to your accounts. This is not released in the same cluster as the Proxy service, because it must access your SOL wallet. If you wish to use this tool,  choose a safe environment to run this.

> Link to Docker compose file wip and coming soon!