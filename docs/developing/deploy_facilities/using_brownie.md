---
title: Deploy with Brownie
---

*This page outlines the steps for deploying and testing contracts in the Neon EVM using [Brownie](https://eth-brownie.readthedocs.io/en/stable/).*

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

[`brownie-config.yaml`](https://github.com/neonlabsorg/examples/blob/main/simple-spl-erc20-brownie/brownie-config.yaml) is Brownie's configuration file. You can learn more about how to configure Brownie [here](/docs/developing/deploy_facilities/configure_brownie).

This first line in `brownie-config.yaml` means that the `.env` file, if it exists, will be loaded by Brownie.
```bash
dotenv: .env # top-level key
```

`.env` specifies environment variables that will be used by Brownie. Let's create this file and edit it with your favorite text editor
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
Add your faucet URL to the `.env` file. This is the URL from which the contract code will request NEON tokens. You can use the [official Neon faucet URL](https://neonfaucet.org/), or your own faucet URL if you have one
```bash
export FAUCET_URL=https://neonfaucet.org/ # or a URL to your own faucet
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