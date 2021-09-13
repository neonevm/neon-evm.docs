    
# Precision accuracy restriction

Recently, when using NeonSwap and other smart contracts that use Neon,  you'll see a warning that all the calculations should be **rounded up to 9 decimal digits **

#### Why is it needed?
While usual Etherium transactions keep accuracy up to 18 decimal digits, values passed by worm-hole can only take the first 9 decimal digits.

Neon EVM revokes and error in case there is a non-zero decimal digit after a nineth one, and transaction cannot be completed. 

Users' transactions only operate values that consist zeroes after ninth decimal digit. Therefore, this restriction does not block user's operations and tokens can freely be sent and recieved. Gas prices and all kinds of fees also consist zeroes after ninth decimal digit and thus there is no dificulty to calculate it. 

The only problem arives when a user  tries to convert tokens  from spl tokens to ETH and vice versa  while those token values are calculated automatically within a smart-contract transaction.



**Examples:**
Alice sends *0.000 000 000 123 456 789* (ETH) to Bob. After the transaction is completed, Bob's and Alice's balances stay unchanged.

Alice sends  *0.000 000 123 456 789 000* (ETH) to Bob. After the transaction Alice is credited by *0.000 000 123* (ETH) and Bob is debited by *0.000 000 123* (ETH) respectfully.

Alice sends 1.5 gweis to Bob
Alice is credited by 1 gwei
Bob is debited by 1 gwei








