import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const electrumPort = 60001
export const mainHostId = 'main'

export function bridgeAddress(
  effects: T.Effects,
  opts: { packageId: string; hostId: string; internalPort: number },
) {
  const watchable = async () => {
    const osIp = await sdk.getOsIp(effects)
    return sdk.host.get(
      effects,
      { packageId: opts.packageId, hostId: opts.hostId },
      (host) => {
        const port = host?.bindings[opts.internalPort]?.net.assignedPort
        return port == null ? null : `${osIp}:${port}`
      },
    )
  }
  return {
    const: async () => (await watchable()).const(),
    once: async () => (await watchable()).once(),
  }
}
