import { autoconfig } from 'bitcoin-core-testnet-startos/startos/actions/config/autoconfig'
import { i18n } from './i18n'
import { bitcoindDescription } from './manifest/i18n'
import { sdk } from './sdk'

const bitcoind = sdk.Dependency.required('bitcoind-testnet', {
  description: bitcoindDescription,
  metadata: {
    title: 'Bitcoin (testnet4)',
    icon: 'https://raw.githubusercontent.com/remcoros/bitcoind-testnet4-startos/f174ba0a95d531f28d29e7390cd29482a08775bc/icon.svg',
  },
  kind: 'running',
  versionRange: '>=31.2:0',
  healthChecks: ['bitcoind'],
}).withInit(async (effects) => {
  await sdk.action.createTask(
    effects,
    'bitcoind-testnet',
    autoconfig,
    'critical',
    {
      input: {
        kind: 'partial',
        accept: [{ prune: 0, txindex: true, zmqEnabled: true }],
        set: { prune: 0, txindex: true, zmqEnabled: true },
      },
      reason: i18n(
        'Pruning must be disabled, txindex and ZMQ must be enabled for Fulcrum to function properly.',
      ),
      when: { condition: 'input-not-matches', once: false },
    },
  )
})

export const dependencies = sdk.Dependencies.of().addDependency(bitcoind)
