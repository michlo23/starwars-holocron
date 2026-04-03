#!/bin/bash

# Setup script for Star Wars Holocron database
# This script creates the database on the shared PostgreSQL instance

set -e

echo "🗄️  Star Wars Holocron - Database Setup"
echo "======================================="
echo ""

# Check if we're in the right directory
if [ ! -f "schema.sql" ]; then
    echo "❌ Error: schema.sql not found. Run this from the project root."
    exit 1
fi

# Database connection info
DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-5432}"
ADMIN_USER="${ADMIN_USER:-postgres}"
ADMIN_DB="${ADMIN_DB:-postgres}"

echo "📡 Connecting to PostgreSQL at $DB_HOST:$DB_PORT..."
echo ""
echo "This script will create:"
echo "  - User: holocron"
echo "  - Database: holocron"
echo "  - Tables: posts"
echo ""
echo "⚠️  You'll be prompted for the postgres superuser password."
echo ""

# Create user and database
echo "Creating user and database..."
psql -h "$DB_HOST" -p "$DB_PORT" -U "$ADMIN_USER" -d "$ADMIN_DB" << SQL
-- Create user if not exists
DO \$\$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'holocron') THEN
        CREATE USER holocron WITH PASSWORD 'holocron_secret_pw_2026';
        RAISE NOTICE 'User holocron created';
    ELSE
        RAISE NOTICE 'User holocron already exists';
    END IF;
END
\$\$;

-- Create database if not exists
SELECT 'CREATE DATABASE holocron OWNER holocron'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'holocron')
\\gexec

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE holocron TO holocron;
SQL

echo ""
echo "✅ User and database created!"
echo ""

# Create schema
echo "Creating schema..."
psql -h "$DB_HOST" -p "$DB_PORT" -U holocron -d holocron < schema.sql

echo ""
echo "✅ Schema created!"
echo ""
echo "📊 Database ready. You can now:"
echo "  1. Deploy the app"
echo "  2. Run the seed script: npm run seed"
echo ""
echo "Connection string:"
echo "  postgresql://holocron:holocron_secret_pw_2026@$DB_HOST:$DB_PORT/holocron"
echo ""
