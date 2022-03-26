# Choosing a Neon Proxy

*This guide describes how to choose a Neon proxy to send a transaction to Solana.*

Before sending a transaction to Neon EVM, a user can choose an operator the most acceptable for them to perform the transaction. The operator is not chosen directly, but through the proxies they serves.

Neon EVM provides users with the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table) containing [RPC](https://docs.neon-labs.org/docs/glossary#remote-procedure-call-rpc) URLs of all available proxies, each served by a separate operator. Each URL corresponds to the operator's public key, which they uses to sign and send a transaction to Neon EVM.

Proxy interacts with one EVM loader, which can be deployed in different Solana chains. This interaction allows the proxy to be used on different networks (Testnet, Devnet, Mainnet Beta).

> **Note:**  
> Currently, the table contains just a list of URLs of proxies using in [MVP](https://docs.neon-labs.org/docs/glossary#minimum-viable-product-mvp) on Mainnet. With the development of Neon EVM, this table will be supplemented with statistical indicators evaluating the operator's service and the capabilities of their proxy. A user will choose an operator based on these indicators. Depending on the resources (proxy capabilities) provided by operators, the "gas price" will be different for each operator. Hence, the transaction cost will also be differ and depend on the RPC URL selected from the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table).
>
> *For instance.* If a transaction does not require huge resources, a user can choose the URL with the lowest "gas price", that is, choose a proxy with limited resources. To perform important operations, it will make sense for the user to choose URL with the higher "gas price", that is, to choose the operator providing the highest quality service.
>
> The table data will be provided to users in real time.

To connect to a proxy using Metamask/Truffle follow the instructions below.

## Connecting to a proxy using MetaMask

To connect to a proxy using Metamask follow the instruction [Installing and setting up MetaMask](https://docs.neon-labs.org/docs/devportal/metamask_setup). You need to specify the `New RPC URL` field selected from the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table), and also specify the `Chain ID`.

## Connecting to a proxy using Truffle

To connect to a proxy using Truffle follow the instruction [Debugging Contracts via Truffle](https://docs.neon-labs.org/docs/devportal/using_truffle). You need to configure `truffle-config.js` by setting the HDWalletProvider library to the RPC URL selected from the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table).

## Connecting to a proxy using Hardhat

To connect to a proxy using Hardhat follow the instruction [Debugging Contracts via Hardhat](https://docs.neon-labs.org/docs/devportal/using_hardhat). You need to configure `hardhat.config.js` by setting the url, network_id/chainId to RPC URL selected from the [table](https://docs.neon-labs.org/docs/proxy/connect_to_solana_via_proxy#url_table).

# URL Proxy Table

*The lookup table containing URLs of all available proxies in Neon EVM.*

<table>
    <tr>
        <th >Network (Chain ID)</th>
        <th>Operator name</th>
        <th>RPC URL</th>
        <th>Public key</th>
    </tr>
    <tr>
        <th rowspan="3">Mainnet Beta (245022934)</th>
        <td><a href="https://neon-labs.org">Neon Labs</a></td>
        <td>https://proxy.mainnet.neonlabs.org/solana</td>
        <td>-</td>
    </tr>
        <tr>
            <td><a href="https://rpcpool.com/#/">RPC Pool</a></td>
            <td>-</td>
            <td>NeoQM3utcHGxhKT41Nq81g8t4xGcPNFpkAgYj1N2N8v</td>
        </tr>
        <tr>
            <td><a href="https://rbf.capital/">Rockaway Blockchain Fund</a></td>
            <td>https://neon-proxy.rbf.systems</td>
            <td>Gw3Xiwve6HdvpJeQguhwT23cpK9nRjSy1NpNYCFY4XU9</td>
        </tr>
    <tr>
        <th rowspan="19">Devnet (245022926)</th>
        <td rowspan="12"><a href="https://neon-labs.org">Neon Labs</a></td> 
        <td rowspan="12">https://proxy.devnet.neonlabs.org/solana</td>
        <td>Fg4uzL4QDfL6x56YFUcJBJSK3PqV4yXoFmXzZQkxn2DK</td>
    </tr>
            <tr><td>8Uh8Rp1FWBiaDejyrZZhRY448oeG7GwKUyPDufP2Xxu7</td></tr>
            <tr><td>6ndMCacBc69VXqgNbcW3BLk2am9oeUDZa6SgBjHozDPd</td></tr>
            <tr><td>GEsnEWcKapTk7cgRoixBvCDc7yYuhmoMjpJ2v7mvmsBZ</td></tr>
            <tr><td>G5397iLxoKKYgMkFfkYBhJYEtErD7ygz8APmH59H8FM6</td></tr>
            <tr><td>rDeo4nZPE2aWpBkqFXBH8ygh1cD63nEKZPiDrpmQad6</td></tr>
            <tr><td>8hipwtwcmRH3iypYModkYFNXYGUEbxvpfqRhxPxx5Amx</td></tr>
            <tr><td>4fvtx2gJYJVd4o6CQt8Bdnc7dg5p2cgnb8oNUs7BGdd5</td></tr>
            <tr><td>9EMY6Xx18hN39CnzM6D5y9vuPa3YJ5ttbWRPJp3SX1Qk</td></tr>
            <tr><td>EMgay3kYFzHSh9PruAeRHxuGmNdsRQ6yPxzSAtU7PF7N</td></tr>
            <tr><td>4s5hHKLrfF7mcjfgwsRKdkubnC2VtswGpR2XGTCJaz3M</td></tr>
            <tr><td>F3V1pCfk1ZNk7Sdyh9N1H5eMtJq9XfhHR83fF8qa41Vt</td></tr>
        <tr>
            <td><a href="https://rpcpool.com/#/">RPC Pool</a></td>
            <td>-</td>
            <td>NeoQM3utcHGxhKT41Nq81g8t4xGcPNFpkAgYj1N2N8v</td>
        </tr>
        <tr>
            <td><a href="https://rbf.capital/">Rockaway Blockchain Fund</a></td>
            <td>-</td>
            <td>Gw3Xiwve6HdvpJeQguhwT23cpK9nRjSy1NpNYCFY4XU9</td>
        </tr>
        <tr>
            <td><a href="https://brightlystake.com">Brightlystake</a></td>
            <td>http://65.21.110.127:9090/solana</td>
            <td>2GDfarSJnNC6ii5tQVE9rBH81Ny35LxrSCZ7tFhktSqi</td>
        </tr>
        <tr>
            <td><a href="https://stakeservice.com">Stake Service</a></td>
            <td>http://65.108.79.46:9090/solana</td>
            <td>4Mh3ik4iS6MBxHy1VBN89vBiiPRDkebtnybDWnfTtpfC</td>
        </tr>
        <tr>
            <td>Think Network</td>
            <td>http://194.149.135.44:9090/solana</td>
            <td>CyepBgaNezMJgLjy6Zyz9ECUia33dwDi9aXtRsZEhWX1</td>
        </tr>
        <tr>
            <td>NodesCrew</td>
            <td>http://51.222.40.26:9090/solana</td>
            <td>HN4FeaSXB8t3FDW85hRw8mK1hYETJGeqhkkxJr6j2GiV</td>
        </tr>
        <tr>
            <td>DSRV</td>
            <td>http://neon-devnet.allthatnode.com:9090/solana</td>
            <td>5kKd1iy6onhCkzDq6DBw6woHLas3fy6HX4Yz8t1VPc1r</td>
        </tr>
    <tr>
        <th rowspan="13">Testnet (245022940)</th>
        <td rowspan="11"><a href="https://neon-labs.org">Neon Labs</a></td>
        <td rowspan="11">https://proxy.testnet.neonlabs.org/solana</td>
        <td>EJUKLLjBMhFnkonfn7wcThnHyDewmhVmG9sEuVP9cvF8</td>
    </tr>
            <tr><td>6ndMCacBc69VXqgNbcW3BLk2am9oeUDZa6SgBjHozDPd</td></tr>
            <tr><td>GEsnEWcKapTk7cgRoixBvCDc7yYuhmoMjpJ2v7mvmsBZ</td></tr>
            <tr><td>G5397iLxoKKYgMkFfkYBhJYEtErD7ygz8APmH59H8FM6</td></tr>
            <tr><td>rDeo4nZPE2aWpBkqFXBH8ygh1cD63nEKZPiDrpmQad6</td></tr>
            <tr><td>8hipwtwcmRH3iypYModkYFNXYGUEbxvpfqRhxPxx5Amx</td></tr>
            <tr><td>4fvtx2gJYJVd4o6CQt8Bdnc7dg5p2cgnb8oNUs7BGdd5</td></tr>
            <tr><td>9EMY6Xx18hN39CnzM6D5y9vuPa3YJ5ttbWRPJp3SX1Qk</td></tr>
            <tr><td>EMgay3kYFzHSh9PruAeRHxuGmNdsRQ6yPxzSAtU7PF7N</td></tr>
            <tr><td>4s5hHKLrfF7mcjfgwsRKdkubnC2VtswGpR2XGTCJaz3M</td></tr>
            <tr><td>F3V1pCfk1ZNk7Sdyh9N1H5eMtJq9XfhHR83fF8qa41Vt</td></tr>
        <tr>
            <td><a href="https://rpcpool.com/#/">RPC Pool</a></td>
            <td>-</td>
            <td>NeoQM3utcHGxhKT41Nq81g8t4xGcPNFpkAgYj1N2N8v</td>
        </tr>
        <tr>
            <td><a href="https://rbf.capital/">Rockaway Blockchain Fund</a></td>
            <td>-</td>
            <td>Gw3Xiwve6HdvpJeQguhwT23cpK9nRjSy1NpNYCFY4XU9</td>
        </tr>
</table>


Semantic meaning of table columns:
  * `Network (Chain ID)` — Solana network and its identifier; the network determines what the RPC URL proxy can be used.
  * `Operator name` — operator name providing the proxy.
  * `RPC URL` — address for interacting with the required proxy.
  * `Public key` — public key granting access to a network; this is either a public key of an authorized Neon EVM operator, or a developer key used for access only to Testnet or Devnet.
