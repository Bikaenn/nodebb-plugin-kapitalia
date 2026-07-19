# nodebb-plugin-kapitalia

**Kapitalia** – Ein Browser-Finanz-MMO als NodeBB-Plugin.

Spieler verdienen Geld durch Arbeitsaufgaben, investieren in Aktien, kaufen Unternehmen für passives Einkommen und treten im Ranglisten-Wettbewerb an.

---

## Voraussetzungen

- NodeBB v4.14.0+
- Node.js 18+

---

## Installation

```bash
# Im NodeBB-Wurzelverzeichnis:
cd node_modules
git clone https://github.com/your-org/nodebb-plugin-kapitalia
cd nodebb-plugin-kapitalia
npm install

# Zurück im NodeBB-Verzeichnis:
cd ../../
./nodebb build
./nodebb restart
```

Dann im Admin-Bereich (ACP → Plugins) **Kapitalia** aktivieren. Beim ersten Aktivieren werden automatisch Aktien, Unternehmen und Missionen als Seed-Daten angelegt.

---

## Plugin-Struktur

```
nodebb-plugin-kapitalia/
├── plugin.json              # Hook-Definitionen, Assets
├── library.js               # Einstiegspunkt: Routes, Jobs, Hooks
├── routes/index.js          # GET-Seiten + POST-API-Routes
├── controllers/             # Template-Daten aufbereiten
│   ├── dashboard.js
│   ├── career.js
│   ├── market.js
│   ├── portfolio.js
│   ├── business.js
│   ├── missions.js
│   ├── ranking.js
│   └── api/                 # POST-Endpunkte (work, market, business)
├── services/                # Businesslogik (nur hier werden Daten verändert)
│   ├── PlayerService.js
│   ├── CareerService.js
│   ├── EconomyService.js
│   ├── StockService.js
│   ├── CompanyService.js
│   ├── MissionService.js
│   └── LeaderboardService.js
├── models/                  # Defaults, Serialisierung, statische Definitionen
│   ├── Player.js
│   ├── Stock.js
│   ├── Company.js
│   └── Mission.js
├── modules/
│   ├── work/                # Work-Engine + Task-Typen
│   │   ├── WorkEngine.js
│   │   └── tasks/
│   │       ├── financial_analysis.js   # KGV-Vergleich (valuation)
│   │       ├── accounting.js           # Gewinn/Verlust-Berechnung
│   │       └── market_analysis.js      # Strategie-Fragen
│   ├── stocks/
│   │   ├── StockEngine.js
│   │   └── providers/
│   │       ├── FictionalProvider.js    # Random-Walk-Simulation (v0.1)
│   │       └── MarketDataProvider.js   # Stub für Echtdaten (v0.2)
│   └── events/
│       └── EventBus.js                 # Forum-XP Stub (v0.2)
├── jobs/
│   ├── stockTick.js                    # Alle 5 Min: Kurse aktualisieren
│   └── incomeTick.js                   # Alle 1 Min: Rangliste + Missionen
├── templates/kapitalia/
│   ├── dashboard.tpl
│   ├── career.tpl
│   ├── market.tpl
│   ├── portfolio.tpl
│   ├── business.tpl
│   ├── missions.tpl
│   ├── ranking.tpl
│   └── partials/
│       ├── nav.tpl
│       ├── stats-bar.tpl
│       └── alerts.tpl
├── templates/plugins/
│   └── kapitalia-profile.tpl           # NodeBB-Profil-Integration
├── public/
│   ├── css/kapitalia.scss
│   └── js/kapitalia.js
└── languages/de.json
```

---

## Routen

| Route                          | Beschreibung                   |
|-------------------------------|-------------------------------|
| `GET /kapitalia`               | Redirect → Dashboard          |
| `GET /kapitalia/dashboard`     | Übersicht (Vermögen, Missionen)|
| `GET /kapitalia/career`        | Karriere & Arbeitsaufgaben     |
| `GET /kapitalia/market`        | Börse (Aktienkurse, Kauf)     |
| `GET /kapitalia/portfolio`     | Portfolio (Aktienbestand, Verkauf)|
| `GET /kapitalia/business`      | Unternehmen kaufen             |
| `GET /kapitalia/missions`      | Missionen & Fortschritt        |
| `GET /kapitalia/ranking`       | Top-100-Rangliste              |
| `POST /api/kapitalia/work/submit` | Aufgabe beantworten         |
| `POST /api/kapitalia/market/buy`  | Aktie kaufen                |
| `POST /api/kapitalia/market/sell` | Aktie verkaufen             |
| `POST /api/kapitalia/business/buy`| Unternehmen kaufen           |

---

## Datenbankschlüssel (NodeBB DB Layer)

```
kapitalia:player:{uid}            Hash: cash, level, xp, career, skills, companies[], holdings{}, lastIncomeTick
kapitalia:players                 Sorted Set: uid → netWorth (Rangliste)
kapitalia:stock:{symbol}          Hash: price, change, category, updatedAt
kapitalia:stock:history:{symbol}  Sorted Set: timestamp → price
kapitalia:work:task:{uid}         Hash: aktuelle Aufgabe
kapitalia:work:history:{uid}      Sorted Set: Aufgaben-Historie
kapitalia:mission:def:{id}        Hash: Missions-Definition
kapitalia:mission:progress:{uid}  Hash: Fortschritt pro Mission
kapitalia:meta                    Hash: lastStockTick, version
```

---

## Karrierestufen

| Stufe       | Label         | Level | Nettovermögen | Freigeschaltete Aufgaben                                    |
|-------------|---------------|-------|---------------|-------------------------------------------------------------|
| employee    | Angestellter  | 1     | 0 €           | valuation (KGV-Analyse)                                    |
| freelancer  | Selbstständig | 5     | 3.000 €       | + accounting (Gewinn/Verlust)                              |
| entrepreneur| Unternehmer   | 10    | 15.000 €      | + market_analysis (Strategie)                              |
| investor    | Investor      | 20    | 50.000 €      | + purchase_decision                                        |
| mogul       | Finanzmogul   | 40    | 200.000 €     | + management                                               |

---

## Unternehmen (Alpha)

| ID               | Name          | Preis      | Einkommen/min |
|-----------------|---------------|-----------|---------------|
| kiosk           | Kiosk         | 500 €      | 5 €           |
| cafe            | Café          | 2.000 €    | 20 €          |
| restaurant      | Restaurant    | 10.000 €   | 100 €         |
| investment_firm | Investmentfirma| 100.000 € | 1.000 €       |

---

## Aktien (Alpha)

TechNova, GreenVolt, EuroBank, CloudSoft, AutoLux, HealthOne, FinAI, EnergyX  
Kurse werden per Random-Walk alle 5 Minuten aktualisiert.

---

## Seed-Missionen

| Mission                       | Belohnung            |
|------------------------------|----------------------|
| Erste Arbeitsaufgabe lösen   | 200 € + 50 XP        |
| Erste Aktie kaufen           | 300 € + 75 XP        |
| Erstes Unternehmen kaufen    | 500 € + 100 XP       |
| 5.000 € Vermögen erreichen   | 1.000 € + 200 XP     |

---

## Multi-Instance / Cluster

Jobs (Cron) starten nur auf der Instanz mit `nconf.get('runJobs') === true`.  
Setze in `config.json`:

```json
{
  "runJobs": true
}
```

---

## Sicherheit

- Alle Geldbewegungen nur serverseitig in Services
- CSRF auf allen POST-Routen (NodeBB v4 `setupApiRoute`)
- Rate-Limit auf Work-Submit: max 1 Aufgabe / 10 Sekunden pro UID
- Keine negativen Cash-Werte
- Input-Validierung vor jeder Transaktion

---

## Erweiterungen (v0.2+)

- `MarketDataProvider` für Echtzeit-Börsendaten
- `EventBus` Forum-XP (Hook `filter:post.save` ist vorbereitet)
- Zusätzliche Aufgaben-Typen: `purchase_decision`, `management`
- Investment-Clubs, Community-Events

---

## Lizenz

MIT
