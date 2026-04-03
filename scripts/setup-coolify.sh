#!/bin/bash
# Helper script to set up Star Wars Holocron in Coolify

APP_UUID="rgcgsk4kkk0gs00oog8kckgg"
COOLIFY_TOKEN="${COOLIFY_API_TOKEN:-$(cat ~/.factory/coolify-token 2>/dev/null)}"
COOLIFY_URL="http://localhost:8000/api/v1"

if [ -z "$COOLIFY_TOKEN" ]; then
  echo "Error: COOLIFY_API_TOKEN not set"
  exit 1
fi

echo "🌌 Star Wars Holocron - Coolify Setup"
echo "======================================"
echo ""
echo "App UUID: $APP_UUID"
echo ""

# Function to update app settings
update_app_settings() {
  echo "📝 Updating app settings..."
  
  curl -s -X PATCH \
    -H "Authorization: Bearer $COOLIFY_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "fqdn": "starwars.hezivio.com",
      "is_static": false,
      "build_pack": "nixpacks",
      "ports_exposes": "3000"
    }' \
    "$COOLIFY_URL/applications/$APP_UUID" | python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin), indent=2))"
}

# Function to add environment variable
add_env_var() {
  local key=$1
  local value=$2
  local is_secret=${3:-false}
  
  echo "Adding env var: $key"
  
  curl -s -X POST \
    -H "Authorization: Bearer $COOLIFY_TOKEN" \
    -H "Content-Type: application/json" \
    -d "{
      \"key\": \"$key\",
      \"value\": \"$value\",
      \"is_build_time\": false,
      \"is_preview\": false,
      \"is_secret\": $is_secret
    }" \
    "$COOLIFY_URL/applications/$APP_UUID/envs" | python3 -c "import sys,json; print(json.dumps(json.load(sys.stdin), indent=2))" 2>/dev/null || echo "  (env var might already exist)"
}

# Update app settings
update_app_settings

echo ""
echo "🔐 Setting environment variables..."
echo ""

# Set DATABASE_URL (you need to replace with actual connection string)
echo "⚠️  You need to manually set DATABASE_URL after creating the PostgreSQL database"
echo "    Format: postgresql://holocron:PASSWORD@DATABASE_HOST:5432/holocron"
echo ""

# Set OPENAI_API_KEY
if [ -f ~/.factory/openai-api-key ]; then
  OPENAI_KEY=$(cat ~/.factory/openai-api-key)
  add_env_var "OPENAI_API_KEY" "$OPENAI_KEY" "true"
  echo "✓ OPENAI_API_KEY set"
else
  echo "⚠️  OPENAI_API_KEY not found in ~/.factory/openai-api-key"
fi

echo ""
echo "📊 Next steps:"
echo "1. Create PostgreSQL database in Coolify UI"
echo "2. Set DATABASE_URL environment variable"
echo "3. Deploy the application"
echo "4. Run seed script: docker exec <container> npm run seed"
echo ""
echo "Done!"
