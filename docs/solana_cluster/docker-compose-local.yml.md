```yml
version: "3"

services:
  solana:
    container_name: solana
    image: neonlabsorg/solana:v1.7.9-testnet
    environment:
      SOLANA_URL: http://solana:8899
      RUST_LOG: solana_runtime::system_instruction_processor=trace,solana_runtime::message_processor=debug,solana_bpf_loader=debug,solana_rbpf=debug
    networks:
      - net
    healthcheck:
      test: [ CMD-SHELL, "solana cluster-version -u http://solana:8899" ]
      interval: 5s
      timeout: 10s
      retries: 10
      start_period: 10s
    volumes:
      - "./solana_state:/opt/solana/config/"

  evm_loader:
    container_name: evm_loader
    image: neonlabsorg/evm_loader:latest
    environment:
      - SOLANA_URL=http://solana:8899
    networks:
      - net
    depends_on:
      solana:
        condition: service_healthy
    command: bash -c "create-test-accounts.sh 1 && deploy-evm.sh"

  postgres:
    container_name: postgres
    image: postgres:14.0
    command: postgres -c 'max_connections=1000'
    environment:
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
    hostname: postgres
    healthcheck:
      test: [ CMD-SHELL, "pg_isready -h postgres -p 5432" ]
      interval: 5s
      timeout: 10s
      retries: 10
      start_period: 5s
    networks:
      - net

  proxy:
    container_name: proxy
    image: neonlabsorg/proxy:latest
    environment:
      SOLANA_URL: http://solana:8899
      POSTGRES_DB: neon-db
      POSTGRES_USER: neon-proxy
      POSTGRES_PASSWORD: neon-proxy-pass
      POSTGRES_HOST: postgres
      NEW_USER_AIRDROP_AMOUNT: 100
      LOG_SENDING_SOLANA_TRANSACTION: YES
      LOG_NEON_CLI_DEBUG: YES
      EVM_LOADER: 53DfF883gyixYNXnM7s5xhdeyV8mVk9T4i2hGV9vG9io
    depends_on:
      postgres:
        condition: service_healthy
      evm_loader:
        condition: service_completed_successfully
    ports:
      - 127.0.0.1:9090:9090
    networks:
      - net
    entrypoint: proxy/run-test-proxy.sh

networks:
  net:
```

