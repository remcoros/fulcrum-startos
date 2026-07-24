import { autoconfig } from 'bitcoin-core-testnet-startos/startos/actions/config/autoconfig'
import { i18n } from './i18n'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  await sdk.action.createTask(
    effects,
    'bitcoind-testnet',
    autoconfig,
    'critical',
    {
      input: {
        kind: 'partial',
        accept: [
          {
            prune: 0,
            txindex: true,
            zmqEnabled: true,
          },
        ],
        set: {
          prune: 0,
          txindex: true,
          zmqEnabled: true,
        },
      },
      reason: i18n(
        'Pruning must be disabled, txindex and ZMQ must be enabled for Fulcrum to function properly.',
      ),
      when: { condition: 'input-not-matches', once: false },
    },
  )

  return {
    'bitcoind-testnet': {
      kind: 'running',
      versionRange: '>=28.3:5',
      healthChecks: ['bitcoind'],
    },
  }
})
