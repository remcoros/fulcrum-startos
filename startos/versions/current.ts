import { VersionInfo } from '@start9labs/start-sdk'
import { defaultDbMem, fulcrumConf } from '../fileModels/fulcrum.conf'

export const current = VersionInfo.of({
  version: '2.1.3:0',
  releaseNotes: {
    en_US: `Updates Fulcrum to 2.1.3, including a Merkle-cache boundary fix, and Start SDK to 3.0.6. Requires StartOS 0.4.0.2 or later and Bitcoin (testnet4) 31.1:1 or later. Full upstream release notes: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2 and https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- Configure correctly loads and clears your server banner. Performance changes restart Fulcrum immediately, and Max Address History is available for busy addresses.
- Database memory is sized to your server on install and reduced after syncing; custom values are preserved, except values matching the package defaults around a reindex. Sync Progress handles split log lines, and a single notification announces completion.
- Reindex rebuilds a corrupted Testnet4 index while keeping your settings. It makes Fulcrum unavailable until the rebuild finishes.
- Wallet addresses show ssl:// or tcp:// so the required connection mode is clear.`,
    es_ES: `Actualiza Fulcrum a 2.1.3, con una corrección en los límites de la caché de Merkle, y Start SDK a 3.0.6. Requiere StartOS 0.4.0.2 o posterior y Bitcoin (testnet4) 31.1:1 o posterior. Notas completas: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2 y https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- Configurar carga y borra correctamente el banner. Los cambios de rendimiento reinician Fulcrum de inmediato y se añade Historial máximo de direcciones.
- La memoria de la base de datos se ajusta al servidor al instalar y se reduce al terminar la sincronización. Se conservan los valores personalizados, salvo los que coinciden con los predeterminados al reindexar. El progreso admite líneas de registro fragmentadas y una única notificación anuncia la finalización.
- Reindexar reconstruye un índice Testnet4 dañado y conserva los ajustes. Fulcrum no está disponible hasta que termina.
- Las direcciones para las carteras muestran ssl:// o tcp:// para indicar el modo de conexión.`,
    de_DE: `Aktualisiert Fulcrum auf 2.1.3 mit einer Korrektur an den Merkle-Cache-Grenzen und Start SDK auf 3.0.6. Erfordert StartOS ab 0.4.0.2 und Bitcoin (testnet4) ab 31.1:1. Vollständige Versionshinweise: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2 und https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- Konfigurieren lädt und löscht das Server-Banner korrekt. Leistungsänderungen starten Fulcrum sofort neu; die maximale Adresshistorie ist einstellbar.
- Der Datenbankspeicher wird bei der Installation an den Server angepasst und nach der Synchronisierung reduziert. Eigene Werte bleiben erhalten, außer wenn sie beim Neuindizieren den Paketvorgaben entsprechen. Der Fortschritt verarbeitet aufgeteilte Logzeilen; eine einmalige Benachrichtigung meldet den Abschluss.
- Neu indizieren baut einen beschädigten Testnet4-Index unter Beibehaltung der Einstellungen neu auf. Fulcrum ist bis zum Abschluss nicht verfügbar.
- Wallet-Adressen zeigen ssl:// oder tcp:// und kennzeichnen so den Verbindungsmodus.`,
    pl_PL: `Aktualizuje Fulcrum do 2.1.3 z poprawką błędu granicznego w pamięci podręcznej Merkle oraz Start SDK do 3.0.6. Wymaga StartOS 0.4.0.2 lub nowszego oraz Bitcoin (testnet4) 31.1:1 lub nowszego. Pełne informacje: https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2 i https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- Konfiguruj poprawnie wczytuje i usuwa baner. Zmiany wydajności od razu restartują Fulcrum; dodano limit historii adresu.
- Pamięć bazy danych jest dopasowywana do serwera przy instalacji i zmniejszana po synchronizacji. Własne wartości są zachowywane poza wartościami równymi domyślnym przy reindeksacji. Postęp obsługuje podzielone wiersze logów, a pojedyncze powiadomienie informuje o zakończeniu.
- Reindeksuj odbudowuje uszkodzony indeks Testnet4, zachowując ustawienia. Do zakończenia Fulcrum jest niedostępny.
- Adresy dla portfeli pokazują ssl:// lub tcp://, wskazując tryb połączenia.`,
    fr_FR: `Met à jour Fulcrum vers 2.1.3, avec une correction des limites du cache de Merkle, et Start SDK vers 3.0.6. Nécessite StartOS 0.4.0.2 ou ultérieur et Bitcoin (testnet4) 31.1:1 ou ultérieur. Notes complètes : https://github.com/cculianu/Fulcrum/releases/tag/v2.1.2 et https://github.com/cculianu/Fulcrum/releases/tag/v2.1.3

- Configurer charge et efface correctement la bannière. Les changements de performance redémarrent immédiatement Fulcrum ; la limite d'historique des adresses est réglable.
- La mémoire de la base est adaptée au serveur à l'installation puis réduite après synchronisation. Les valeurs personnalisées sont conservées, sauf celles identiques aux valeurs par défaut lors d'une réindexation. La progression traite les lignes de journal fragmentées ; une notification unique annonce la fin.
- Réindexer reconstruit un index Testnet4 corrompu en conservant les réglages. Fulcrum reste indisponible jusqu'à la fin.
- Les adresses des portefeuilles affichent ssl:// ou tcp:// pour indiquer le mode de connexion.`,
  },
  migrations: {
    up: async ({ effects }) => {
      if ((await fulcrumConf.read((c) => c.db_mem).once()) === undefined) {
        await fulcrumConf.merge(effects, { db_mem: defaultDbMem() })
      }
    },
    down: async () => {},
  },
})
