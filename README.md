# BelloBito 💘

Site de compatibilité amoureuse et de test de personnalité.

## Installation

```bash
npm install
```

## Démarrage

```bash
npm start
```

Le site sera accessible sur `http://localhost:3000`

## Fonctionnalités

- 🔥 **Test de Compatibilité** — Calculez votre compatibilité amoureuse basée sur vos prénoms
- 💍 **Mariable ?** — Questionnaire pour évaluer votre sérieux en amour (50 questions)
- 🎨 **Design moderne** — Interface intuitive et responsive avec animations fluides
- 🌙 **Mode sombre** — Thème clair/sombre intégré

## Structure du projet

```
bellobito/
├── server.js           # Serveur Express
├── package.json        # Dépendances
├── db/
│   └── init_postgres.sql  # Schéma PostgreSQL
└── public/
    ├── index.html      # Page principale
    ├── style.css       # Styles
    ├── script.js       # Logique test de compatibilité
    └── mariable.js     # Logique questionnaire "Mariable ?"
```

## Technologies

- **Backend** : Node.js, Express.js
- **Frontend** : HTML5, CSS3, JavaScript
- **Base de données** : PostgreSQL

## Configuration Base de Données

### Variables d'environnement

```env
# Option A (URL complète)
DATABASE_URL=postgresql://user:password@host:5432/bellobito

# Option B (variables distinctes)
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=yourpassword
PGDATABASE=bellobito
PGPORT=5432
```

### Initialisation

```bash
npm run init:pg
```

Ou avec `psql` :

```bash
psql "postgresql://user:password@host:5432/bellobito" -f db/init_postgres.sql
```

## API Endpoints

- `POST /api/tests` — Enregistrer un test (body: `name1`, `name2`, `score`, `method`, `extras`)
- `GET /api/tests?limit=50` — Récupérer l'historique (max 100)

