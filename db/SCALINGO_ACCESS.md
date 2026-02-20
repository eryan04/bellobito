# Accès aux Bases de Données Scalingo

## Base de données PROD (bellobito)
**Région**: osc-fr1
**Type**: DB avec données existantes

### Déploiement
```bash
git push scalingo main
```

### Console PostgreSQL
```bash
scalingo -a bellobito --region osc-fr1 pgsql-console
```

### Tunnel DB
```bash
scalingo -a bellobito --region osc-fr1 db-tunnel SCALINGO_POSTGRESQL_URL
```

---

## Base de données PREPROD (bellobitoprod)
**Région**: osc-fr1
**Type**: Nouvelle DB vide (init_scalingo.sql)

### Déploiement du code
```bash
git push prod preprod:main
```

### Initialiser la DB (première fois uniquement)
```bash
scalingo -a bellobitoprod --region osc-fr1 pgsql-console < db/init_scalingo.sql
```

### Console PostgreSQL
```bash
scalingo -a bellobitoprod --region osc-fr1 pgsql-console
```

### Tunnel DB
```bash
scalingo -a bellobitoprod --region osc-fr1 db-tunnel SCALINGO_POSTGRESQL_URL
```

---

## Fichiers d'initialisation

- **init_scalingo.sql** - Schema propre pour PREPROD (nouvelle DB vide)
- **init_postgres.sql** - Schema de base (développement local)
- **schema.sql** - Schema initial

## Notes

- La DB **bellobitoprod (PREPROD)** est la nouvelle base de données vide
- Utiliser `init_scalingo.sql` pour initialiser la PREPROD uniquement
- La PROD (bellobito) conserve ses données existantes

## Workflow de déploiement

1. Tu développes en local sur la branche `preprod`
2. Tu testes sur **PREPROD** : `git push prod preprod:main` → bellobitoprod (DB vide)
3. Une fois validé, tu déploies sur **PROD** : `git push scalingo main` → bellobito (DB avec données)
