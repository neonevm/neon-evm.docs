---
title: Deploy with Hardhat
proofedDate: na
iterationBy: na
includedInSite: true
approvedBy: na
comment: 
---

*This page outlines the steps for deploying and testing contracts in the Neon EVM using the Hardhat tool.*

Before beginning the tutorial below, make sure that you have properly [configured Hardhat](configure_hardhat) for the Neon EVM.

## How to Use Hardhat: A Tutorial
The example this tutorial is based on is located in [this repository](https://github.com/neonlabsorg/examples/tree/main/simple-erc20-hardhat).

By the end of this tutorial, you will deploy a contract describing an ERC-20 token to the Neon Devnet. You will then test this contract by minting 10000 test tokens that are deposited to the first wallet specified in the configuration file (see above), and then transferred to the second wallet address.

### Step 1: Installation
> **Note:** This page is just a quickstart based on a specific example program. For more details on installing Hardhat, refer to the *[Hardhat documentation](https://hardhat.org/hardhat-runner/docs/getting-started#overview)*.

Using Git, clone the example Hardhat project from the remote repository and navigate to it:
```sh
git clone https://github.com/neonlabsorg/examples.git
cd examples/simple-erc20-hardhat
```

Then, run the following command:
```sh
npm install
```
This will install all the necessary packages to continue with the example. These packages include the `Hardhat` library.

If the above command results in an error, run:
```sh
npm cache clear --force
npm install
```

### Step 2: Set Up MetaMask Accounts
To interact with the soon-to-be-deployed contracts, you'll need to create two new accounts in MetaMask. Before you begin, make sure that MetaMask is connected to the Neon Devnet.

In MetaMask, create two new accounts. This can be done by clicking on your current account's icon in the top right of the MetaMask extension pop-up, and then clicking on 'Create an Account' in the drop-down menu that appears. Then, obtain some Devnet NEON tokens for these accounts (up to 100 NEON per account) using the [NeonFaucet](../utilities/faucet).

Finally, copy the new accounts' private keys and paste them into the `hardhat.config.js` file described above, replacing the placeholder text in lines 11 and 12 of that file. To obtain the private keys, click on the three vertical dots to the right of your currently displayed account name and wallet address. In this drop-down menu, click on 'Account Details', then on 'Export Private Key', and enter your password and click 'Confirm' to get access to the private key for that account.

> **Note:** When adding the private keys to the configuration file, make sure to add the prefix **0x** to the key obtained via MetaMask.

### Step 3: Compile Contracts
All of the contracts are located in the project's `contracts/` directory. Before these contracts can be run, they must first be compiled. To compile the project's contracts, run the following command:
```sh
./node_modules/.bin/hardhat compile
```

After running this step, you should see output similar to the following:
```
Compiled 2 Solidity files successfully
```

### Step 4: Run Tests
Make sure to test your code before you migrate it to the network. All test files should be located under the `test/` directory.

To run all tests, simply run the command below:
```sh
./node_modules/.bin/hardhat test
```

This command compiles all the contracts in the `contracts/`, deploys them to the Neon Devnet, and runs all the tests in the `test/` directory. The output should look something like this:
```
  Testing TestERC20 contract
    ✔ should successfully mint 10000 ERC20 in the first account (15967ms)
    ✔ should transfer token correctly (31327ms)


  2 passing (53s)
```

### Step 5: Deploy Contracts
To deploy the project's contracts, simply run the command below to run the deployment script in the `scripts/` directory:
```sh
./node_modules/.bin/hardhat run ./scripts/deploy.js
```

After running this command, you should see console output similar to the following:
```
Deploying contracts with the account: 0xf71c4DACa893E5333982e2956C5ED9B648818376
Contract address is:  0x49DCDEc367bba4271876259AE473890aa5AABc2e
Minting  100000000000  tokens...
```

### Step 6: Connect Project to MetaMask
To import your project as an asset in MetaMask, follow the instructions [here](https://support.metamask.io/hc/en-us/articles/360015489031-How-to-add-unlisted-tokens-custom-tokens-in-MetaMask#h_01FWH492CHY60HWPC28RW0872H) and use the contract address from the previous step as the 'Token Contract Address' in MetaMask.

Once you complete this final step, you will be able to see your new ERC-20 assets in the MetaMask profiles of the new test accounts.
