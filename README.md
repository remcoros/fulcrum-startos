<p align="center">
  <img src="icon.png" alt="Fulcrum Logo" width="21%">
</p>

# Fulcrum (testnet4) on StartOS

> Everything not listed here behaves as upstream Fulcrum. See the Documentation section of `instructions.md` for upstream documentation.

This package indexes your Bitcoin Testnet4 node for Electrum-compatible wallets. It uses the upstream image, a read-only Bitcoin data mount for cookie authentication, and the Testnet4 package's own service IDs and ports.

## Image and Container Runtime

The unmodified `cculianu/fulcrum` image runs on x86_64 and aarch64. The `primary` daemon uses subcontainer `primary-sub` and runs `Fulcrum --ts-format none /data/fulcrum.conf`; StartOS supplies log timestamps. Cross-architecture emulation is disabled.

## Volume and Data Layout

The `main` volume is mounted at `/data`. It holds `fulcrum.conf`, optional `banner.txt`, `store.json`, the RocksDB index in `fulc2_db`, and the `latch` file.

Bitcoin (testnet4)'s `main` volume is mounted read-only at `/mnt/bitcoind-testnet`. Authentication reads `testnet4/.cookie` inside that mount. Mounting the directory lets Fulcrum read a replacement cookie after Bitcoin restarts.

`reindex.request` records a pending rebuild. It is removed only after the index has been deleted and the sync state reset.

## File Models

Three models describe the package's files. Configuration and state use loose schemas so writes preserve unmodeled keys.

| File | Format | Purpose |
| --- | --- | --- |
| `fulcrum.conf` | INI | Connection wiring and performance settings |
| `banner.txt` | Text | Custom banner served to wallets |
| `store.json` | JSON | `syncNotified`, the persistent sync-completion guard |

The package enforces `/data` as the data directory, plaintext listening on `0.0.0.0:60001`, cookie authentication, the banner path, and disabled peering and announcements. RPC username and password are empty because the cookie supplies authentication. The `bitcoind` address comes from Bitcoin (testnet4)'s live RPC bridge binding; it is omitted while the binding is unavailable.

Configure controls RPC timeout and client count, worker threads, database memory, open files, and maximum address history. Optional numeric values are omitted when unset, allowing Fulcrum's defaults to apply; invalid numeric text is not written back as `NaN`.

On a fresh install, `db_mem` is a quarter of system memory, capped at 2048 MiB. After indexing, the package reduces that value to at most 512 MiB. A custom value is preserved unless it equals a package-managed value: reindex raises the reduced value for the rebuild, and sync completion lowers the initial value again. The upgrade migration seeds memory only when absent; the post-sync reduction also applies to an existing value equal to the install default.

Changing the configuration restarts the daemon. Banner-only changes apply on the next banner request; clearing the field removes the file so Fulcrum serves its built-in banner.

## Dependencies

Bitcoin (testnet4), package ID `bitcoind-testnet`, is required with kind `running` and health check `bitcoind`. The supported version range is declared in `startos/dependencies.ts`.

Fulcrum requires pruning disabled, `txindex` enabled, and ZeroMQ enabled. A critical Auto-Configure task on Bitcoin requests those settings and returns if they drift. The RPC address is resolved with the provider's exported host ID and internal port over the StartOS bridge.

The compile-time dependency comes from `remcoros/bitcoind-testnet4-startos` on `31.x-testnet4`; `package-lock.json` fixes the commit. An npm override keeps a single SDK copy across the package and its dependencies.

## Network Access and Interfaces

The `main` interface on host `main` is **Electrum (SSL)**, type `api`. Preferred external ports are 60002 for TLS and 60001 for plaintext; StartOS may assign different ports. Fulcrum itself listens on 60001.

StartOS terminates TLS. LAN, `.local` and domain addresses use TLS, while plaintext is available to local services over the bridge. A Tor address added with SSL disabled selects plaintext. Address schemes are shown as `ssl://` or `tcp://`, matching the selected binding. Network exposure is controlled by the user's interface settings.

## Installation and First-Run Flow

Install seeds the configuration and sync-notification state. Bitcoin must be configured for Fulcrum and fully synced before indexing can finish. The dependency task requests the required settings; the dependency declaration itself does not gate daemon startup.

The Electrum port opens when the address index is ready. Sync Progress displays the latest complete `<Controller>` log line while indexing. A Sync Complete notification is sent once and recorded in `store.json`. If memory still equals the install default, Fulcrum restarts once to apply the lower cache size.

## Actions

Configure edits the banner and performance settings. Its form reads the banner contents separately from the configuration path. Saving performance changes restarts Fulcrum; saving the same settings is safe to repeat.

Reindex is recovery for a corrupted address index after checking Bitcoin sync, trying a restart, and ruling out drive errors. It writes `reindex.request` and restarts Fulcrum if running. Before the next daemon starts, the package deletes `fulc2_db`, the legacy `fulc2_db.testnet4` directory if present, and `latch`; it resets sync notification state and restores the larger cache if the value still equals the managed reduced value. Configuration and banner files are preserved.

A rebuild makes Fulcrum and its consumers unavailable for as long as indexing takes. Repeating Reindex before startup has no additional effect; repeating it after a rebuild has begun starts the rebuild over. If stopped, Fulcrum waits until its next start to delete the index.

## Tasks

One critical Auto-Configure task is raised on Bitcoin (testnet4) if pruning is enabled or transaction indexing or ZeroMQ is disabled. Accepting it applies the required settings. Fulcrum raises no local tasks.

## Health Checks

The `primary` check, displayed as Electrum (SSL), checks that port 60001 is listening. While the port is closed and indexing progress is available, it reports loading.

The `sync-progress` check, displayed as Sync Progress, reports success when the Electrum port opens. Until then it shows the latest complete controller log line, or Unknown status before one arrives. UTF-8 and partial lines are buffered separately for each daemon run.

## Backups and Restore

Backups include configuration, banner, and package state from `main`. They exclude `/fulc2_db`, `/fulc2_db.testnet4`, and `/latch`. Restoring rebuilds the index from Bitcoin; it does not restore the indexing work.

## Limitations and Differences

This package serves Testnet4 only. Mainnet Bitcoin dependencies and mainnet capacity estimates do not apply. Peer discovery and announcement are disabled, and the administrative RPC interface is not exposed. Only x86_64 and aarch64 are supported.

The address index is not backed up. Reindex and restore both require a fresh index build before wallets can use the server. Database cache limits do not cover all of Fulcrum's working memory.

## Quick Reference for AI Consumers

```yaml
package_id: fulcrum-testnet
image: cculianu/fulcrum
architectures: [x86_64, aarch64]
subcontainers: [primary-sub]
volumes:
  main: /data
file_models:
  - /data/fulcrum.conf
  - /data/banner.txt
  - /data/store.json
startos_managed_env_vars: []
dependencies:
  - bitcoind-testnet
interfaces:
  main: { type: api, port: 60002 }
actions: [configure, reindex]
tasks:
  - { action: autoconfig, severity: critical, package: bitcoind-testnet }
health_checks: [primary, sync-progress]
```
