#!/bin/bash

echo "🚀 Initialisation de la base de données PostgreSQL..."
npm run init:pg

if [ $? -eq 0 ]; then
  echo "✅ Base de données initialisée avec succès!"
  echo ""
  echo "🌟 Démarrage du serveur..."
  npm start
else
  echo "❌ Erreur lors de l'initialisation de la base de données"
  exit 1
fi
