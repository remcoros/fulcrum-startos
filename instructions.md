# Fulcrum (testnet4)

## Documentation

- [Start9 Bitcoin Guides](https://docs.start9.com/bitcoin-guides/) — wallet connection, SSL certificates, and Tor; use a Testnet4-compatible wallet with this service.
- [Fulcrum documentation](https://github.com/cculianu/Fulcrum/tree/master/doc) — configuration, operation, and tuning.

## What you get on StartOS

Fulcrum indexes your Bitcoin Testnet4 node and provides an **Electrum (SSL)** interface for compatible wallets. The connection to Bitcoin (testnet4) and cookie authentication are configured automatically.

The index needs additional disk space beyond your Bitcoin node. Database Memory starts at up to a quarter of your server's memory, capped at 2048 MiB, and drops to at most 512 MiB after indexing. Fulcrum also needs working memory beyond that cache.

## Getting set up

1. Install Bitcoin (testnet4) and let it sync.
2. Resolve any setup request on Bitcoin (testnet4) to disable pruning and enable transaction indexing and ZeroMQ.
3. Start Fulcrum (testnet4) and watch **Sync Progress** while it builds its index.
4. Wait for **Fulcrum is synced** before connecting a wallet. A **Sync Complete** notification announces completion; Fulcrum may restart once to apply a lower memory setting.

## Using Fulcrum (testnet4)

### Connecting a wallet

Use a wallet that supports **Testnet4**, select that network, and enter an address from **Electrum (SSL)**. Copy the host and assigned port from the address. An `ssl://` address needs SSL enabled and the wallet must trust the certificate StartOS serves; see the wallet connection guide above. A `tcp://` Tor address needs SSL disabled.

### Configure

Run **Configure** to adjust:

- **Server Banner** — text shown to connecting wallets. Clear it to restore Fulcrum's default banner.
- **Bitcoin RPC Timeout** and **Bitcoin RPC Clients** — increase these only when Bitcoin timeouts or indexing performance call for it. The form explains their limits.
- **Worker Threads** — leave at `0` to use the available CPU cores, or set a limit.
- **Database Memory** — the cache size in MiB. A custom value is kept except when it matches the package's own initial or reduced value: Reindex raises the reduced value for the rebuild, then lowers the initial value when indexing completes.
- **Database Max Open Files** — raise it if logs report too many open files.
- **Max Address History** — increase it if a very busy address returns incomplete history or appears to have missing funds.

Saving performance changes restarts Fulcrum. Changing only the banner applies immediately.

### Reindex

Run **Reindex** if Fulcrum keeps crashing and its logs report a corrupted database or ask you to delete the data directory and resync. It rebuilds the index while keeping your settings and banner.

Check that Bitcoin is fully synced and try a restart first. If logs report input/output errors, check the drive before rebuilding.

Fulcrum and anything using it are unavailable until the rebuild finishes. Watch **Sync Progress** as during the initial build. If Fulcrum is stopped, the rebuild begins the next time you start it.

## Limitations

- This service supports Testnet4; mainnet and older testnet wallets cannot use it.
- Peer discovery and announcements are disabled.
- The administrative RPC interface is not exposed.
- Backups preserve settings and the banner. Restoring requires rebuilding the index before wallets can connect.
