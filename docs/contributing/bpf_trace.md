---
title: BPF Trace
proofedDate: na
iterationBy: na
includedInSite: false
approvedBy: na
comment: 
---

*During the runtime, the BPF interpreter can be configured to log a trace message for each BPF instruction executed. This can be very helpful for things like pinpointing the runtime context leading up to a memory access violation.*

The trace logs together with the ELF dump can provide a lot of insight.

To turn on BPF interpreter trace messages in a local cluster, specify the value `solana_rbpf` in `RUST_LOG` to trace. For example:
```sh
$ export RUST_LOG=solana_bpf_loader_program=trace
```

There is an additional level of control over this feature. To enable it, a local Solana cluster must be built with a specific `with-bpf-trace-control` feature:
```sh
$ cargo build --release --features with-bpf-trace-control
```

To turn it on, create another environment variable `SOLANA_BPF_TRACE_CONTROL`, which should contain a TCP port. For example:
```sh
$ export SOLANA_BPF_TRACE_CONTROL="8888"
```

The control config contains several settings to change the BPF tracing behavior without restarting a local cluster. Here is the default configuration as viewed with the `solana-bpf-trace-control` utility:
```
enable = true
filter =
output = /tmp/trace
binary = false
multiple_files = true
max_threads = 2
min_length = 1000000
```
This enables tracing without filtering, and redirects the output of each execution into a different file.

The following are examples of settings:

### Enable or Disable BPF Tracing Altogether
For example:
```
enable = true
```

### Filter BPF Tracing of a Certain Program
For example:
```
filter = evm_loader:3CMCRJieHS3sWWeovyFyH4iRyX4rHf3u2zbC5RCFrRex
```
The first part of the `filter` setting is an arbitrary string to be included in the trace file name. The second part is a program ID of interest. An empty `filter` setting passes any program.  

> Irrelevant information in the `filter` blocks any tracing.

### Redirect BPF Tracing into a File
For example:
```
output = /tmp/trace
```
An empty `output` setting means the tracing will be dumped to the standard output.

### Force Writing Binary Files
For example:
```
binary = true
```
Skips disassembling and formatting traces on write; write the raw binary data.

### Separate BPF Traces of Different Runs
For example:
```
multuple_files = true
```

Each new BPF trace will be written into a separate file. The names of these files will contain timestamps. Otherwise, the `multiple_files` setting causes all new traces to be added to a single file (if a `trace-file` is present).

### Limit Writing Threads
For example:
```
max_threads = 2
```
Allows you to run no more than two writing streams at the same time. If `multuple_files = false`, setting `max_threads` has no effect.

### Limit Program Trace Length
For example:
```
min_length = 1000000
```
Filters out too short (so less interesting) traces.

### The Control Tool: solana-bpf-trace-control
There is a special tool for viewing (a command without arguments) or changing (a command with arguments) settings. It can be found in the [temporary repo](https://github.com/vakond/solana-bpf-trace-control). Below are some usage examples of the tool.
```
solana-bpf-trace-control
```
Without arguments the current configuration is shown.

```
solana-bpf-trace-control enable
```

```
solana-bpf-trace-control enable false
```

```
solana-bpf-trace-control filter 'evm_loader:3CMCRJieHS3sWWeovyFyH4iRyX4rHf3u2zbC5RCFrRex'
```

```
solana-bpf-trace-control trace-file ''
```

```
solana-bpf-trace-control multiple-files false
```

> To clear a string setting just pass an empty quoted string as the argument.

### Performance Considerations

Writing a large trace file could be a substantially heavy task for the system, which can affect the overall performance. You should tweak `max-threads` and `min-length` settings to limit the number of writes. Increasing available RAM size and using SSD are also of great help.

The BPF Trace Monitoring service of the local cluster starts the OS thread and binds the socket. To minimize possible performance impact the service will actually start only after the first BPF execution. At the first execution, the default settings will be taken into account. You should run a small program like `memo` or `token` first to make sure the controlling service is up and running.
