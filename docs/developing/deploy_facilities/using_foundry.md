---
title: Deploy with Foundry
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

*This page outlines the steps for deploying and testing contracts in the Neon EVM using the Foundry tool.*

## How to Use Foundry: A Tutorial
The example this tutorial is based on is located in [this repository](https://github.com/neonlabsorg/neon-tutorials).

By the end of this tutorial, you will deploy a contract describing an ERC-20 token to the Neon Devnet. You will then test this contract by transfering tokens to random generated wallet.

### Step 1: Installation
> **Note:** This page is just a quickstart based on a specific example program. For more details on installing Foundry, refer to the *[Foundry documentation](https://book.getfoundry.sh/getting-started/installation)*.
Using Git, clone the example Foundry project from the remote repository and navigate to it:
```sh
git clone https://github.com/neonlabsorg/neon-tutorials
cd neon-tutorials/foundry
```

Then, run the following command:
```sh
curl -L https://foundry.paradigm.xyz | bash
foundryup
```
First command will install install Foundryup and `foundryup` will install the latest _(nightly)_ precompiled binaries: forge, cast, anvil, and chisel.

Next action is to install required libraries:
```sh
forge install foundry-rs/forge-std --no-commit
forge install openzeppelin/openzeppelin-contracts --no-commit
```


### Step 2: Set up the local environment file
To interact with the soon-to-be-deployed contracts, you'll need to create new wallet. For this you can use MetaMask or any other wallet provider.

In MetaMask this can be done by clicking on your current account's icon in the top right of the MetaMask extension pop-up, and then clicking on 'Create an Account' in the drop-down menu that appears. Then, obtain some Devnet NEON tokens for these accounts _(up to 100 NEON per account)_ using the [NeonFaucet](https://neonfaucet.org/) _(without having NEON balance you won't be able to sign and submit transactions)_. 

To obtain the private key from MetaMask, click on the three vertical dots to the right of your currently displayed account name and wallet address. In this drop-down menu, click on 'Account Details', then on 'Export Private Key', and enter your password and click 'Confirm' to get access to the private key for that account.

Now that you have your private key create a .env file and add these lines:
```
RPC_URL_DEVNET=https://devnet.neonevm.org
CHAIN_ID_DEVNET=245022926
RPC_URL_MAINNET=https://neon-proxy-mainnet.solana.p2p.org
CHAIN_ID_MAINNET=245022934
PRIVATE_KEY=<YOUR_PRIVATE_KEY>
VERIFIER_URL_BLOCKSCOUT=https://neon-devnet.blockscout.com/api
```

After creating the `.env` file next command to run is:
```
source .env
```


### Step 3: Compile Contracts
All of the contracts are located in the project's `src/` directory. Before these contracts can be run, they must first be compiled. To compile the project's contracts, run the following command:
```sh
forge build
```

After running this step, you should see output similar to the following:
```
[⠢] Compiling...
[⠒] Compiling 24 files with 0.8.21
[⠃] Solc 0.8.21 finished in 2.48s
Compiler run successful!
```

Testing the smart contracts can be done with command:
```sh
forge test
```


### Step 4: Deploy Contracts
To deploy the project's contracts, simply run the command :
```sh
forge create --rpc-url $RPC_URL_DEVNET --private-key $PRIVATE_KEY src/TestERC20/TestERC20.sol:TestERC20 --constructor-args "Test ERC20 Token" "TERC20" --legacy
```

After successfully running this step you should get console output similar to:
```
[⠰] Compiling...
No files changed, compilation skipped
Deployer: 0x4455E84Eaa56a01676365D4f86348B311969a4f4
Deployed to: 0x5537599aa2F97Dd60a66342522a465A7f2e40Ff9
Transaction hash: 0x6de9dab8a526cbac33008056d185b93dff725605efb791bf116b6bece4f0c486
```


### Step 6: Neonscan contract verification
In this step we will verify our freshly deployed smart contract on our explorer Neonscan. This can be done by running the following command:
```sh
forge verify-contract --chain-id $CHAIN_ID_DEVNET <contract_address> src/TestERC20/TestERC20.sol:TestERC20 --verifier-url $VERIFIER_URL_BLOCKSCOUT --verifier blockscout
```
You have to replace `<contract_address>` with your smart contract address.

After successfully running this step you should get console output similar to:
```
Start verifying contract `0x5537599aa2F97Dd60a66342522a465A7f2e40Ff9` deployed on 245022926
Submitting verification for [src/TestERC20/TestERC20.sol:TestERC20] "0x5537599aa2F97Dd60a66342522a465A7f2e40Ff9".
Submitted contract for verification:
	Response: `OK`
	GUID: `5537599aa2f97dd60a66342522a465a7f2e40ff9654118b3`
	URL:
        https://neon-devnet.blockscout.com/api?/address/0x5537599aa2f97dd60a66342522a465a7f2e40ff9
```

Now copy paste this link in your browser and also replace <CONTRACT_ADDRESS> with your freshly deployed contract address:

https://neon-devnet.blockscout.com/address/<CONTRACT_ADDRESS>