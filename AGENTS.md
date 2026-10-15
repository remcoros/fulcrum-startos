# Fulcrum Testnet4 package

- Keep the Bitcoin dependency imports on `bitcoin-core-testnet-startos`; the mainnet package uses a different package ID, RPC cookie path and ports.
- Prefill Configure with only the declared input keys: `fulcrum.conf` stores the banner path, while the form needs the contents of `banner.txt`.
- Read the configuration with `.const(effects)` after writing the dependency address, so that write does not restart its own run.
