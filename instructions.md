# Fulcrum (testnet4)

## Documentation

- [Fulcrum documentation](https://github.com/cculianu/Fulcrum/tree/master/doc) — upstream docs covering configuration, operation, and tuning.

## What you get on StartOS

- A high-performance **Electrum server** indexing your own Bitcoin Core (testnet4) node, exposed as the **Electrum (SSL)** interface for wallets to connect to.
- Automatic wiring to Bitcoin Core (testnet4): the RPC endpoint and cookie authentication are configured for you — no manual node setup required.

## Getting set up

Fulcrum requires a fully indexed Bitcoin Core (testnet4) node. If Bitcoin Core needs different settings, StartOS will ask you to apply them.

1. Install Bitcoin Core (testnet4) if you have not already.
2. Follow any setup request shown for Bitcoin Core (testnet4).
3. Start Fulcrum (testnet4). The initial index build takes many hours.
4. Watch **Sync Progress**. It switches to **Synced** when wallets can connect.

## Using Fulcrum (testnet4)

### Connecting a wallet

Open the **Electrum (SSL)** interface and copy its address into your wallet, such as Sparrow, Electrum, or BlueWallet.

### Configure

Run the **Configure** action to set:

- **Server Banner** — custom text shown to connecting Electrum clients.
- **Bitcoin RPC Timeout**, **Bitcoin RPC Clients** — how Fulcrum talks to Bitcoin Core (testnet4).
- **Worker Threads** — leave at `0` to let Fulcrum auto-detect, or pin a specific number.
- **Database Memory** — the RocksDB cache size in MiB. Raise it to trade RAM for faster queries.
- **Database Max Open Files** — raise this if the logs complain about too many open files.

## Limitations

- Peer discovery and network announcement are disabled; this server does not advertise itself to the Electrum peer-to-peer network.
- The administrative RPC interface is not exposed.
