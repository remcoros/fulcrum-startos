import { setupManifest } from '@start9labs/start-sdk'
import {
  alertInstall,
  alertStart,
  bitcoindDescription,
  long,
  short,
} from './i18n'

export const manifest = setupManifest({
  id: 'fulcrum-testnet',
  title: 'Fulcrum (testnet4)',
  license: 'MIT',
  packageRepo: 'https://github.com/remcoros/fulcrum-startos/tree/testnet4',
  upstreamRepo: 'https://github.com/cculianu/Fulcrum',
  marketingUrl: 'https://github.com/cculianu/Fulcrum',
  donationUrl: 'https://github.com/cculianu/Fulcrum',
  description: { short, long },
  volumes: ['main'],
  images: {
    main: {
      source: {
        dockerTag: 'cculianu/fulcrum:v2.1.1',
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: alertInstall,
    update: null,
    uninstall: null,
    restore: null,
    start: alertStart,
    stop: null,
  },
  dependencies: {
    'bitcoind-testnet': {
      description: bitcoindDescription,
      optional: false,
      metadata: {
        title: 'Bitcoin Core (testnet4)',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-core-startos/refs/heads/30.x/dep-icon.svg',
      },
    },
  },
})
