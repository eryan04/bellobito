#!/bin/bash

# Script d'accès rapide aux bases de données Scalingo
# Usage: ./db/scalingo_db.sh

echo "🗄️  BelloBito - Accès Scalingo DB"
echo "=================================="
echo ""
echo "Choisissez l'environnement:"
echo "1) PROD (bellobitoprod)"
echo "2) PREPROD (bellobito)"
echo ""
read -p "Environnement [1-2]: " env_choice

case $env_choice in
    1)
        APP_NAME="bellobitoprod"
        ENV_NAME="PROD"
        ;;
    2)
        APP_NAME="bellobito"
        ENV_NAME="PREPROD"
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac

echo ""
echo "Choisissez l'action:"
echo "1) Console PostgreSQL"
echo "2) Tunnel DB"
echo ""
read -p "Action [1-2]: " action_choice

case $action_choice in
    1)
        echo ""
        echo "🚀 Connexion à la console PostgreSQL ($ENV_NAME)..."
        scalingo -a "$APP_NAME" --region osc-fr1 pgsql-console
        ;;
    2)
        echo ""
        echo "🔌 Création du tunnel DB ($ENV_NAME)..."
        echo "💡 Une fois le tunnel créé, connectez-vous avec:"
        echo "   psql -U <user> -h 127.0.0.1 -p <port> <database>"
        echo ""
        scalingo -a "$APP_NAME" --region osc-fr1 db-tunnel SCALINGO_POSTGRESQL_URL
        ;;
    *)
        echo "❌ Choix invalide"
        exit 1
        ;;
esac
