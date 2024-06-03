---
title: Vesting
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
---

## Vesting

### View Vesting Information and Withdraw Locked Tokens

The main part of the NEON tokens is in a locked state and will be issued in parts according to a certain schedule. For their storage and release at the required time, the vesting contract is used (https://github.com/neonlabsorg/neon-spl-governance/tree/main/addin-vesting, commit `1fc1ad6a21aebd13911db7f60ca7099a6ad61b92`). This contract was deployed at address `919AnvG1Vi9ekoxQs6d6SYQiRmYMcinw4U6bzL2YNoFM` in Solana Mainnet (https://solscan.io/account/919AnvG1Vi9ekoxQs6d6SYQiRmYMcinw4U6bzL2YNoFM).

To view information about vesting, its quantity, and output schedule, you can use the `vesting-contract-cli` utility (its sources are located at https://github.com/neonlabsorg/neon-spl-governance/tree/main/addin-vesting/cli).

```
vesting-contract-cli --url https://api.mainnet-beta.solana.com info --governance_program_id DRJeCVsc33fDT2khezFiMQpQiuoucFrji1A62QfbxPPT --vesting_program_id 919AnvG1Vi9ekoxQs6d6SYQiRmYMcinw4U6bzL2YNoFM --vesting_address `VESTING_ADDRESS`
```

The `VESTING_ADDRESS` is taken from the `Address` column of the token holders page https://solscan.io/token/NeonTjSjsuo3rexg9o6vHuMXw62f9V7zvmu8M8Zut44#holders.

Output example:
```
vesting-contract-cli --url https://api.mainnet-beta.solana.com info --governance_program_id DRJeCVsc33fDT2khezFiMQpQiuoucFrji1A62QfbxPPT --vesting_program_id 919AnvG1Vi9ekoxQs6d6SYQiRmYMcinw4U6bzL2YNoFM --vesting_address A5zrmTFMPpTWhSxay8gDr3rLr4WguCPYp8um5ywRFeCT
---------------VESTING--CONTRACT--INFO-----------------
Program ID: 919AnvG1Vi9ekoxQs6d6SYQiRmYMcinw4U6bzL2YNoFM
Vesting Account Pubkey: FbVwXodUY8m4WrZDZCEDzUeHWLA7LuTpqqQLke1wngQf
Vesting Token Account Pubkey: A5zrmTFMPpTWhSxay8gDr3rLr4WguCPYp8um5ywRFeCT
Vesting Owner Address: DZ7GXB26tC6DmCNDEj9wd9qYg2NfnTmE1wjPBVE95buz
Vesting Mint Address:  NeonTjSjsuo3rexg9o6vHuMXw62f9V7zvmu8M8Zut44
Vesting Token Address: A5zrmTFMPpTWhSxay8gDr3rLr4WguCPYp8um5ywRFeCT
Vesting Realm: Some(9AQvVMCTEBqKFzPRG9inL9ssSVJeQhWQVARHBMy3Fo1V)
Schedule:
   0: amount 3541666666666666, timestamp 1723053458 (2024-08-07 17:57:38)
   1: amount 3541666666666667, timestamp 1725731858 (2024-09-07 17:57:38)
   2: amount 3541666666666667, timestamp 1728323858 (2024-10-07 17:57:38)
   3: amount 3541666666666666, timestamp 1731002258 (2024-11-07 17:57:38)
   4: amount 3541666666666667, timestamp 1733594258 (2024-12-07 17:57:38)
   5: amount 3541666666666667, timestamp 1736272658 (2025-01-07 17:57:38)
   6: amount 3541666666666666, timestamp 1738951058 (2025-02-07 17:57:38)
   7: amount 3541666666666667, timestamp 1741370258 (2025-03-07 17:57:38)
   8: amount 3541666666666667, timestamp 1744048658 (2025-04-07 17:57:38)
   9: amount 3541666666666666, timestamp 1746640658 (2025-05-07 17:57:38)
  10: amount 3541666666666667, timestamp 1749319058 (2025-06-07 17:57:38)
  11: amount 3541666666666667, timestamp 1751911058 (2025-07-07 17:57:38)
Total amount: 42500000000000000
```

To run `vesting-contract-cli`, you can use the ready-made docker image `neonlabsorg/launch-script:v1.0.0`. We suggest running it with the command:
```
docker run -ti --rm --network host neonlabsorg/launch-script:v1.0.0
```

Alternatively, you can build the `vesting-contract-cli` utility from source:
```
git clone git@github.com:neonlabsorg/neon-spl-governance.git
git submodule update --init
cargo build --release --bin vesting-contract-cli
```

### Using the Vesting UI

In addition to the command line utility, you can also view and manage your locked tokens using the Vesting UI within the DAO interface. The Vesting section allows you to:

- Access the Vesting UI by navigating to the designated section within the DAO interface
- View your locked tokens from repurchases, LTI bonuses, or main net bonuses
- See a visual representation of your locked token allocations
- Get detailed information for each locked token allocation, such as the allocation type, amount, unlock date, or other relevant information
- See your vesting schedule and the unlock timeline for your locked tokens
- Withdraw the available portions of your locked tokens as they become unlocked
- Benefit from a user-friendly interface for managing and viewing your locked tokens
- Easily access and manage your locked tokens while participating in other DAO-related activities, thanks to the integration with the overall DAO functionalities