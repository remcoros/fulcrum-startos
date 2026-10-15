# Updating the upstream version

Fulcrum is shipped as a prebuilt Docker image; the upstream project and the published image share the same version tag.

## Determining the upstream version

[cculianu/Fulcrum](https://github.com/cculianu/Fulcrum) — inspect recent stable releases (the Latest badge can lag):

```sh
gh release list -R cculianu/Fulcrum --limit 10
```

Cross-check against the [`cculianu/fulcrum`](https://hub.docker.com/r/cculianu/fulcrum/tags) Docker Hub tags (the image must be published before the bump can land):

```sh
curl -fsSL "https://hub.docker.com/v2/repositories/cculianu/fulcrum/tags?page_size=20&ordering=last_updated" | jq -r '.results[].name'
```

The pinned tag lives in `startos/manifest/index.ts` at `images.main.source.dockerTag`.

## Applying the bump

1. In `startos/manifest/index.ts`, set `images.main.source.dockerTag` to `cculianu/fulcrum:v<new version>`.
2. If the outgoing `startos/versions/current.ts` has a nonempty migration, preserve it in a historical version file and register it in the version graph before writing the new current version. Otherwise bump in place.
3. Set the new version to `<new version>:0` and write release notes in every supported locale, covering changes since the last published Testnet4 package.
4. Compare the official `Start9Labs/fulcrum-startos` package and bring over applicable changes. Preserve `fulcrum-testnet`, `bitcoind-testnet`, the Testnet4 cookie path, and ports 60001/60002. Do not copy mainnet capacity estimates or Bitcoin Core/Knots dependency ranges.
5. When refreshing the Bitcoin package source, select a verified commit from `remcoros/bitcoind-testnet4-startos`'s `31.x-testnet4` line. Check its exported RPC constants, cookie path and auto-configuration action, then update the exact commit in `package.json` and the lockfile.
6. For an SDK update, check the published npm version and its changelog. Keep the SDK exact and the shared SDK override. Run `npm install` until the lockfile stops changing; verify that only one SDK version is installed.
7. Run `make format` and `make x86`, then inspect the resulting package manifest. Install and exercise the package on a StartOS server when installation testing is authorized.
