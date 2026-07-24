import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.1:1',
  releaseNotes: {
    en_US:
      'Adds StartOS 0.4.0-beta.10 and Start SDK 2 compatibility with dynamic Bitcoin Core (testnet4) bridge routing.',
    es_ES:
      'Añade compatibilidad con StartOS 0.4.0-beta.10 y Start SDK 2 con enrutamiento dinámico a Bitcoin Core (testnet4).',
    de_DE:
      'Fügt Kompatibilität mit StartOS 0.4.0-beta.10 und Start SDK 2 sowie dynamisches Routing zu Bitcoin Core (testnet4) hinzu.',
    pl_PL:
      'Dodaje zgodność ze StartOS 0.4.0-beta.10 i Start SDK 2 oraz dynamiczny routing do Bitcoin Core (testnet4).',
    fr_FR:
      'Ajoute la compatibilité avec StartOS 0.4.0-beta.10 et Start SDK 2 avec routage dynamique vers Bitcoin Core (testnet4).',
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
