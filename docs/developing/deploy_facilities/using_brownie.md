---
title: Deploy with Brownie
---

*This page outlines the steps for deploying and testing contracts in the Neon EVM using [Brownie](https://eth-brownie.readthedocs.io/en/stable/), a Python-based development and testing framework for smart contracts targeting the Ethereum Virtual Machine.*

Before beginning the tutorial below, make sure that you have [Brownie](https://eth-brownie.readthedocs.io/en/stable/install.html) installed. To check, simply run in your command-line tool

```bash
$ brownie
Brownie - Python development framework for Ethereum

Usage:  brownie <command> [<args>...] [options <args>]
```

## How to Use Brownie: A Tutorial
The example this tutorial is based on is located in [this repository](https://github.com/neonlabsorg/examples/tree/main/simple-spl-erc20-brownie).

By the end of this tutorial, you will deploy a contract describing an SPL token and ERC-20 version of it to the Neon Devnet.

### Step 1: Cloning the Repository
> **Note:** For more details on working with Brownie, refer to *[Brownie Quickstart](https://eth-brownie.readthedocs.io/en/stable/quickstart.html)*.

Using Git, clone the example Brownie project from the remote repository and navigate to it:
```bash
git clone https://github.com/neonlabsorg/examples.git
cd examples/simple-spl-erc20-brownie
```

### Step 2: Configuration

Run the following command to import [`network-config.yaml`](https://github.com/neonlabsorg/examples/blob/main/simple-spl-erc20-brownie/network-config.yaml), the network configuration file for Neon Devnet
```bash
brownie networks import ./network-config.yaml
```

[`brownie-config.yaml`](https://github.com/neonlabsorg/examples/blob/main/simple-spl-erc20-brownie/brownie-config.yaml) is Brownie's configuration file. You can learn all about it [here](https://eth-brownie.readthedocs.io/en/stable/config.html). It contains `networks` information, which corresponds to what's under `networks` in [`network-config.yaml`](https://github.com/neonlabsorg/examples/blob/main/simple-spl-erc20-brownie/network-config.yaml). 

This following line means that the `.env` file, if it exists, will be loaded by Brownie.
```bash
dotenv: .env
```

Let's create it and edit it with your favorite text editor
```bash
touch .env
subl .env # or any editor of choice
```

#### Accounts
Add your sender and recipient accounts to the `.env` file 
```bash
export ACC1=0x......... # sender account address
export ACC2=0x......... # recipient account address
```

#### Faucet
Add your faucet URL to the `.env` file
```bash
export FAUCET_URL={your faucet URL}
```

### Step 3: Compilation and Deployment

Compile the contract source files by running
```bash
brownie compile
```

Deploy the ERC contracts by running
```bash
brownie run scripts/deploy.py
```

### Step 4: Testing
Run tests if needed
```bash
brownie test
```