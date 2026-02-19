#!/bin/bash

echo "🔧 Installation et configuration de BelloBito"
echo ""

# Vérifier si PostgreSQL est installé
if ! command -v psql &> /dev/null; then
  echo "📦 Installation de PostgreSQL..."
  sudo apt update
  sudo apt install -y postgresql postgresql-contrib
  
  echo "🔐 Configuration de PostgreSQL..."
  sudo systemctl start postgresql
  sudo systemctl enable postgresql
  
  # Créer un utilisateur et une base de données
  echo "👤 Création de l'utilisateur et de la base de données..."
  sudo -u postgres psql -c "CREATE USER bellobito WITH PASSWORD 'bellobito';" 2>/dev/null || echo "User might already exist"
  sudo -u postgres psql -c "CREATE DATABASE bellobito OWNER bellobito;" 2>/dev/null || echo "Database might already exist"
  sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE bellobito TO bellobito;"
  
  echo "✅ PostgreSQL installé et configuré!"
else
  echo "✅ PostgreSQL déjà installé"
fi

echo ""

# Vérifier si node_modules existe
if [ ! -d "node_modules" ]; then
  echo "📦 Installation des dépendances npm..."
  npm install
  echo "✅ Dépendances installées!"
else
  echo "✅ Dépendances npm déjà installées"
fi

echo ""
echo "📝 Création du fichier .env..."
if [ ! -f ".env" ]; then
  cat > .env << EOL
DATABASE_URL=postgresql://bellobito:bellobito@localhost:5432/bellobito
PORT=3000
EOL
  echo "✅ Fichier .env créé!"
else
  echo "⚠️  Fichier .env existe déjà, non modifié"
fi

echo ""
echo "🎉 Setup terminé! Tu peux maintenant lancer:"
echo "   ./start.sh"
