#!/bin/sh

# Attendre que PostgreSQL soit prêt
until pg_isready -h db -p 5432 -U "$POSTGRES_USER"; do
  echo "⏳ En attente de PostgreSQL..."
  sleep 1
done

echo "✅ PostgreSQL est prêt !"

# Lancer l'app (ou tests)
npm test
