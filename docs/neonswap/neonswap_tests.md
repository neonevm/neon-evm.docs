# Integration tests

*This guide describes how to build and configure the Neon EVM to run integration tests on it.*  

> We want to demonstrate to Ethereum users that the neonswap infrastructure deployed on our Neon EVM ensures a passage of the *Uniswap-V2* integration tests suite. This means Ethereum users can successfully run their applications on Neon EVM.

## Prerequisites
It is assumed:
* You are already familiar with the document [Local Solana Cluster: Installation, Setup and Tests](https://docs.neonlabs.org/docs/solana_cluster/cluster_installation)
* Integration tests are performed on *NodeJS* (*v12* or higher) which should be installed in the system
* The local development *Solana* cluster should be up and active

## Prepare solana-program-library

Clone the project `https://github.com/neonlabsorg/solana-program-library`. Don't forget to clone the dependent project (EVM): `git submodule update --remote --init --recursive`.

## Deploy the EVM Loader

Build the EVM Loader:
```sh
$ ./do.sh update
$ ./do.sh build evm_loader
```
Directory `target/bpfel-unknown-unknown/release` should contain the resulting `evm_loader.so` file. Deploy it to the Solana cluster (which should be ready at this moment):
```sh
$ solana deploy evm_loader.so
```

## Prepare the proxy

Clone the project `https://github.com/neonlabsorg/proxy-model.py`.

## Launch the proxy

Export the EVM Loader program id before starting the proxy (replace the example address with the actual):
```sh
$ export EVM_LOADER="Hqg8EZdZZdXr5so55b9zpTUz1g68haMx44sgjqNLP1cK"
```
Start the proxy:
```sh
$ python3 -m proxy --hostname 127.0.0.1 --port 9090 --enable-web-server --plugins proxy.plugin.SolanaProxyPlugin --num-workers=1
```

## Prepare integration tests suite

Clone the project `https://github.com/neonlabsorg/uniswap-v2-core`. Build the tests (ignoring messages like "gyp ERR!"):
```sh
$ yarn install
```

## Run the tests

Now everything should be ready to run the integration tests of **Uniswap V2**:
```sh
$ yarn test
```
Individual test suites can be run with following command (replace the example test suite name with needed):
```sh
$ node node_modules/mocha/bin/mocha --grep "^UniswapV2Pair"
```

Results of the first test suite:  
<p align="center">  

![](img/neonswap-tests-1.png)</p>

Results of the second test suite:  
<p align="center">  

![](img/neonswap-tests-2.png)</p>

The absence of error messages indicates the successful completion of integration tests.