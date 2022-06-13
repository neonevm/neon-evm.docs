---
title: (Optional) Setting up Faucet and Full Test Suite Services
---

*This **optional** step-by-step guide describes how to set up faucet and full test suite services. It assumes that a proxy and a connection to a Solana cluster have already been established, either locally or remotely.*

## Faucet Service
The Faucet service provides liquidity in 'NEON' to all the accounts that are mentioned in the incoming requests.

#### docker-compose.yml

    version: "3"

    services:

      faucet:
        container_name: faucet
        image: neonlabsorg/faucet:latest
        environment:
          - FAUCET_RPC_BIND=0.0.0.0
          - FAUCET_RPC_PORT=3333
          - SOLANA_URL=http://solana:8899
          - NEON_ETH_MAX_AMOUNT=50000
          - EVM_LOADER=53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
          - FAUCET_RPC_ALLOWED_ORIGINS=["https://neonswap.live"]
          - FAUCET_WEB3_ENABLE=false
          - FAUCET_SOLANA_ENABLE=true
          - NEON_OPERATOR_KEYFILE=/opt/faucet/id.json
          - SOLANA_COMMITMENT=confirmed
        entrypoint: /opt/faucet/faucet --config /opt/proxy/faucet.conf run
        ports:
          - 3333:3333
        expose:
          - "3333"
        networks:
          - net

    networks:
      net:
        external: yes
        # name: local

Save the above content in faucet/docker-compose.yml.

##### How to Run it in Bash
```bash
docker-compose -f faucet/docker-compose.yml up -d --quiet-pull
```
The output should look like this:
```console
Creating faucet ... done
```

## Full Test Suite Service

The full test suite, generally speaking, provides the [OpenZeppelin tests](https://docs.openzeppelin.com/learn/writing-automated-tests) to make sure the infrastructure deployed by this guide works properly. At the end, the `full test suite` outputs the result in the following form:
```console
    Full test passing - 1743
    Full test threshold - 1700
    Check if 1743 is greater or equal 1700
```
#### full_test_suite/docker-compose.yml

    version: "3"

    services:

      full_test_suite:
        container_name: ${FTS_CONTAINER_NAME:-full_test_suite}
        image: ${FTS_IMAGE:-neonlabsorg/full_test_suite:develop}
        entrypoint: ./run-full-test-suite.sh 2>/dev/null
        environment:
          - NETWORK_NAME=${NETWORK_NAME}
          - PROXY_URL=${PROXY_URL}
          - NETWORK_ID=${NETWORK_ID}
          - REQUEST_AMOUNT=${REQUEST_AMOUNT}
          - FAUCET_URL=${FAUCET_URL}
          - USE_FAUCET=${USE_FAUCET}
          - SOLANA_URL=${SOLANA_URL}
          - FTS_USERS_NUMBER=${FTS_USERS_NUMBER}
          - FTS_JOBS_NUMBER=${FTS_JOBS_NUMBER}

        networks:
          - net

    networks:
      net:
        external: yes
        # name: local

#### full_test_suite/local.env

    NETWORK_NAME=local
    PROXY_URL=http://proxy:9090/solana
    NETWORK_ID=111
    REQUEST_AMOUNT=20000
    FAUCET_URL=http://faucet:3333/request_neon
    USE_FAUCET=true
    SOLANA_URL=http://solana:8899
    FTS_USERS_NUMBER=15
    FTS_JOBS_NUMBER=8

#### How to Run it in Bash
```bash
docker-compose -f full_test_suite/docker-compose.yml --env-file full_test_suite/local.env up
```
The outpur should show a summary of the test results at the end.
