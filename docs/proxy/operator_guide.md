### proxy-model.py/Dockerfile

RUN apt update && \
    DEBIAN_FRONTEND=noninteractive apt -y install \
            software-properties-common openssl curl \
            ca-certificates python3-pip python3-venv && \
    rm -rf /var/lib/apt/lists/*
   ...... 

### README

описание установки в разных вариантах: (forked from abhinavsingh/proxy.py)
 Using PIP
 Using Docker
 
### proxy-model.py/proxy/run-proxy.sh
используется ли этот скрипт ?


### proxy-model.py/proxy/deploy-test.sh
Check eth_estimateGas on deploying a contract
Check eth_estimateGas on deploying a contract with the empty value
Check eth_estimateGas on deploying a contract with the empty data
Check eth_estimateGas on deploying a contract with the empty data and valu

### proxy-model.py/proxy/docker-compose-test.yml
