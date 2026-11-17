import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '2.1.4:0',
  releaseNotes: {
    en_US:
      'Requires StartOS 0.4.2 or later and Bitcoin (testnet4) 31.2:0 or later. Updates Fulcrum to 2.1.4 with faster wallet history and subscription queries. [Upstream release notes](https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4).\n\n- Electrum now listens over IPv4 and IPv6. Rebuilding with the current runtime fixes a case where Fulcrum could stop responding until restarted.\n- Sync Progress identifies waits for historical blocks from Bitcoin. Reindex requests made while Fulcrum is starting are retained.\n- Preserves the existing testnet4 index, banner, custom settings, cookie authentication and connection addresses. Reindex remains an explicit recovery action; an ordinary upgrade does not rebuild the index.',
    es_ES:
      'Requiere StartOS 0.4.2 o posterior y Bitcoin (testnet4) 31.2:0 o posterior. Actualiza Fulcrum a 2.1.4 con consultas más rápidas del historial y las suscripciones de carteras. [Notas de la versión](https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4).\n\n- Electrum escucha por IPv4 e IPv6. Corrige un bloqueo que podía requerir reiniciar Fulcrum.\n- El progreso indica cuándo espera bloques históricos de Bitcoin. Conserva las solicitudes de reindexación hechas durante el arranque.\n- Conserva el índice testnet4, el banner, los ajustes, la autenticación por cookie y las direcciones. Una actualización normal no reconstruye el índice.',
    de_DE:
      'Erfordert StartOS ab 0.4.2 und Bitcoin (testnet4) ab 31.2:0. Aktualisiert Fulcrum auf 2.1.4 mit schnelleren Wallet-Verlaufs- und Abonnementabfragen. [Versionshinweise](https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4).\n\n- Electrum lauscht über IPv4 und IPv6. Behebt einen Stillstand, der einen Neustart von Fulcrum erfordern konnte.\n- Der Synchronisierungsfortschritt zeigt Wartezeiten auf historische Bitcoin-Blöcke. Während des Starts angeforderte Neuindizierungen bleiben erhalten.\n- Bestehender testnet4-Index, Banner, Einstellungen, Cookie-Authentifizierung und Verbindungsadressen bleiben erhalten. Ein normales Update baut den Index nicht neu auf.',
    pl_PL:
      'Wymaga StartOS 0.4.2 lub nowszego i Bitcoin (testnet4) 31.2:0 lub nowszego. Aktualizuje Fulcrum do 2.1.4 z szybszymi zapytaniami o historię i subskrypcje portfeli. [Informacje o wydaniu](https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4).\n\n- Electrum nasłuchuje przez IPv4 i IPv6. Usuwa zawieszanie się Fulcrum wymagające restartu.\n- Postęp synchronizacji wskazuje oczekiwanie na historyczne bloki Bitcoin. Zachowuje żądania reindeksacji podczas uruchamiania.\n- Zachowuje indeks testnet4, baner, ustawienia, uwierzytelnianie cookie i adresy. Zwykła aktualizacja nie przebudowuje indeksu.',
    fr_FR:
      'Nécessite StartOS 0.4.2 ou ultérieur et Bitcoin (testnet4) 31.2:0 ou ultérieur. Met à jour Fulcrum vers 2.1.4 avec des requêtes plus rapides pour les historiques et abonnements des portefeuilles. [Notes de version](https://github.com/cculianu/Fulcrum/releases/tag/v2.1.4).\n\n- Electrum écoute en IPv4 et IPv6. Corrige un blocage pouvant nécessiter un redémarrage de Fulcrum.\n- Le suivi indique les attentes de blocs historiques de Bitcoin. Les demandes de réindexation faites pendant le démarrage sont conservées.\n- Préserve l’index testnet4, la bannière, les réglages, l’authentification par cookie et les adresses. Une mise à jour normale ne reconstruit pas l’index.',
  },
  migrations: {
    up: async () => {},
    down: async () => {},
  },
})
