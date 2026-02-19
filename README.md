# BelloBito 💘

Site de compatibilité amoureuse simple et élégant.

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

- Interface simple et intuitive
- Calcul de compatibilité amoureuse basé sur les prénoms
- Design moderne et responsive
- Animations fluides

## Structure du projet

```
bellobito/
├── server.js          # Serveur Express
├── package.json       # Dépendances
└── public/
    ├── index.html     # Page principale
    ├── style.css      # Styles
    └── script.js      # Logique JavaScript
```

## Technologie

- Node.js
- Express.js
- HTML5/CSS3/JavaScript


**Base de données**

Le projet utilise maintenant PostgreSQL. Un schéma Postgres est fourni dans `db/init_postgres.sql` et vous pouvez l'initialiser via le script npm `init:pg`.

- Initialiser via le script (recommandé) :

```bash
# exporter DATABASE_URL ou PG_* (voir exemple ci-dessous)
npm run init:pg
```

- Ou avec `psql` :

```bash
# (se positionner à la racine du projet)
psql "postgresql://user:password@host:5432/dbname" -f db/init_postgres.sql
```

- Variables d'environnement acceptées :

```env
# Option A (connexion unique)
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Option B (variables distinctes)
PGHOST=localhost
PGUSER=postgres
PGPASSWORD=yourpassword
PGDATABASE=bellobito
PGPORT=5432
```

Le serveur utilise `src/db.js` (module `pg`) pour se connecter. Les endpoints exposés :

- `POST /api/tests` — enregistrer un test (body JSON: `name1`, `name2`, `score`, `method`, `extras`).
- `GET /api/tests?limit=50` — récupérer l'historique (par défaut 50, max 100).

