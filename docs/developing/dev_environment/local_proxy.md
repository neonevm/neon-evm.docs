---
title: Setting up a Local Proxy
---

### Step 1: Docker
Docker images themselves are never "started" and never "running". The `docker run` command takes the Docker image as a template and produces a container from it. Before starting your proxy container, you need to start service containers.

Make sure that you have a daemon running. If you see something like:
```bash
$ docker info

Cannot connect to the Docker daemon at <docker.sock>. Is the docker daemon running?
```
you need to run the daemon first:
```bash
$ sudo systemctl start docker
```

Currently, Neon EVM proxies are hardcoded to work with PostgreSQL. To connect the proxy to a database, you need to start a PostgreSQL container. For a quick start of PostgreSQL, most of the configurable parameters can be left as they are by default, with the exception of the password, which must be set explicitly. To start the PostgreSQL container, use the following command:

```bash
$ sudo docker run --rm -ti --network=host -e POSTGRES_HOST=localhost -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass --name=postgres postgres:14.0
```

If you want to use your proxy with other settings, you need to register as an operator so that the Neon EVM can recognize your keys.

> Only authorized operators can change the settings of these parameters.

### Step 2: Start and Configure the Proxy

Start the proxy and connect it to the Docker network:
```bash
$ sudo docker run --rm -ti --network=host -e CONFIG=<network> -e POSTGRES_DB=neon-db -e POSTGRES_USER=neon-proxy -e POSTGRES_PASSWORD=neon-proxy-pass neonlabsorg/proxy:v0.5.1
```

**Command Line Arguments**  
  * `CONFIG=<network>` — specifies a Solana network configuration; `CONFIG=devnet` is recommended.
  * `neonlabsorg/proxy:v0.5.1` — specific Neon EVM proxy.

The Neon EVM address is registered inside `neonlabsorg/proxy:v0.5.1`, so the proxy knows which Neon EVM is running in the Solana cluster.

After executing this command, the proxy will be available at `http://localhost:9090/solana`. This address and port are set by default.