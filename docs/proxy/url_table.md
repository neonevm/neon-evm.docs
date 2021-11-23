# URL Proxy Table

*The lookup table containing URLs of all available proxies in Neon EVM.*

<table>
    <tr>
        <th >Network (Chain ID)</th>
        <th>RPC URL</th>
        <th>Operator name</th>
        <th>Public key</th>
    </tr>
    <tr>
        <td rowspan="1">Testnet (245022940)</td>
        <td>https://proxy.testnet.neonlabs.org/solana</td>
        <td>Neon Labs</td>
        <td>
          See the full list of allowed keys <a href="#pubkeys-testnet">here</a>
        </td>
    </tr>
    <tr>
        <td rowspan="1">Devnet (245022926)</td>
        <td>https://proxy.devnet.neonlabs.org/solana</td>
        <td>Neon Labs</td>
        <td>
          See the full list of allowed keys <a href="#pubkeys-devnet">here</a>
        </td>
    </tr>
    <tr>
        <td rowspan="2">Mainnet Beta (245022934)</td>
        <td>https://proxy.mainnet.neonlabs.org/solana</td>
        <td>RPC Pool</td>
        <td>NeoQM3utcHGxhKT41Nq81g8t4xGcPNFpkAgYj1N2N8v</td>
    </tr>
    <tr>
        <td>https://neon-proxy.rbf.systems</td>
        <td>RBF</td>
        <td>Gw3Xiwve6HdvpJeQguhwT23cpK9nRjSy1NpNYCFY4XU9</td>
    </tr>
</table>


Semantic meaning of table columns:
  * `Network (Chain ID)` — Solana network and its identifier; the network determines what the RPC URL proxy can be used.
  * `RPC URL` — address for interacting with the required proxy.
  * `Operator name` — operator name providing the proxy.
  * `Public key` — public key granting access to a network; this is either a public key of an authorized Neon EVM operator, or a developer key used for access only to Testnet or Devnet.

<a id="pubkeys-testnet"></a>

### Public keys of authorized Neon EVM operators to work in Solana Testnet

  * NeoQM3utcHGxhKT41Nq81g8t4xGcPNFpkAgYj1N2N8v
  * Gw3Xiwve6HdvpJeQguhwT23cpK9nRjSy1NpNYCFY4XU9
  * EJUKLLjBMhFnkonfn7wcThnHyDewmhVmG9sEuVP9cvF8
  * 6ndMCacBc69VXqgNbcW3BLk2am9oeUDZa6SgBjHozDPd
  * GEsnEWcKapTk7cgRoixBvCDc7yYuhmoMjpJ2v7mvmsBZ
  * G5397iLxoKKYgMkFfkYBhJYEtErD7ygz8APmH59H8FM6
  * rDeo4nZPE2aWpBkqFXBH8ygh1cD63nEKZPiDrpmQad6
  * 8hipwtwcmRH3iypYModkYFNXYGUEbxvpfqRhxPxx5Amx
  * 4fvtx2gJYJVd4o6CQt8Bdnc7dg5p2cgnb8oNUs7BGdd5
  * 9EMY6Xx18hN39CnzM6D5y9vuPa3YJ5ttbWRPJp3SX1Qk
  * EMgay3kYFzHSh9PruAeRHxuGmNdsRQ6yPxzSAtU7PF7N
  * 4s5hHKLrfF7mcjfgwsRKdkubnC2VtswGpR2XGTCJaz3M
  * F3V1pCfk1ZNk7Sdyh9N1H5eMtJq9XfhHR83fF8qa41Vt


<a id="pubkeys-devnet"></a>

### Public keys of authorized Neon EVM operators to work in Solana Devnet

  * NeoQM3utcHGxhKT41Nq81g8t4xGcPNFpkAgYj1N2N8v
  * Gw3Xiwve6HdvpJeQguhwT23cpK9nRjSy1NpNYCFY4XU9
  * Fg4uzL4QDfL6x56YFUcJBJSK3PqV4yXoFmXzZQkxn2DK
  * 8Uh8Rp1FWBiaDejyrZZhRY448oeG7GwKUyPDufP2Xxu7
  * 6ndMCacBc69VXqgNbcW3BLk2am9oeUDZa6SgBjHozDPd
  * GEsnEWcKapTk7cgRoixBvCDc7yYuhmoMjpJ2v7mvmsBZ
  * G5397iLxoKKYgMkFfkYBhJYEtErD7ygz8APmH59H8FM6
  * rDeo4nZPE2aWpBkqFXBH8ygh1cD63nEKZPiDrpmQad6
  * 8hipwtwcmRH3iypYModkYFNXYGUEbxvpfqRhxPxx5Amx
  * 4fvtx2gJYJVd4o6CQt8Bdnc7dg5p2cgnb8oNUs7BGdd5
  * 9EMY6Xx18hN39CnzM6D5y9vuPa3YJ5ttbWRPJp3SX1Qk
  * EMgay3kYFzHSh9PruAeRHxuGmNdsRQ6yPxzSAtU7PF7N
  * 4s5hHKLrfF7mcjfgwsRKdkubnC2VtswGpR2XGTCJaz3M
  * F3V1pCfk1ZNk7Sdyh9N1H5eMtJq9XfhHR83fF8qa41Vt
