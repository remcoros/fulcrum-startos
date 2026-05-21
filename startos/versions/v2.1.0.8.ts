import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { rm } from 'fs/promises'

export const v_2_1_0_8 = VersionInfo.of({
  version: '2.1.0:8',
  releaseNotes: {
    en_US: 'Bump SDK to 1.5.1, remove deprecated docsUrls',
    es_ES:
      'Actualización del SDK a 1.5.1, eliminación del campo docsUrls obsoleto',
    de_DE: 'SDK auf 1.5.1 aktualisiert, veraltetes docsUrls-Feld entfernt',
    pl_PL: 'Aktualizacja SDK do 1.5.1, usunięcie przestarzałego pola docsUrls',
    fr_FR:
      'Mise à jour du SDK vers 1.5.1, suppression du champ docsUrls obsolète',
  },
  migrations: {
    up: async ({ effects }) => {
      // remove old start9 dir
      await rm('/media/startos/volumes/main/start9', {
        recursive: true,
      }).catch(console.error)
    },
    down: IMPOSSIBLE,
  },
})
