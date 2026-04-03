# Star Wars Holocron - Quick Start

## Current Status

✅ **Code ready** - Next.js app, seed scripts, branding assets all generated  
✅ **Coolify app created** - UUID: `rgcgsk4kkk0gs00oog8kckgg`  
✅ **Environment variables set** - OPENAI_API_KEY, DATABASE_URL  
✅ **Git repository** - https://github.com/michlo23/starwars-holocron  
✅ **Branding assets** - Logo, favicon, hero banner, OG image all generated  
⏳ **Database** - Needs to be created manually  
❌ **Deployment** - Failed (database missing)  

## Next Steps

### 1. Create the Database

The easiest way is to use the provided setup script:

```bash
cd /home/node/.openclaw/workspace/starwars-holocron
./scripts/setup-database.sh
```

You'll be prompted for the `postgres` superuser password. If you don't have it:

**Alternative: Create via Coolify UI**
1. Go to Coolify → Star Wars Holocron project
2. Add Resource → Database → PostgreSQL
3. Name: `holocron-db`, User: `holocron`, DB: `holocron`
4. Update DATABASE_URL env var to point to the new service

### 2. Deploy

```bash
curl -s "http://localhost:8000/api/v1/deploy?uuid=rgcgsk4kkk0gs00oog8kckgg&force=true" \
  -H "Authorization: Bearer $(cat ~/.factory/coolify-token)"
```

### 3. Seed the Database

**Option A: Run in container (after deployment succeeds)**
```bash
docker exec -it <container_name> npm run seed
```

**Option B: Run locally (generates images locally, then commit them)**
```bash
cd /home/node/.openclaw/workspace/starwars-holocron
export OPENAI_API_KEY=$(cat ~/.factory/openai-api-key)
export DATABASE_URL="postgresql://holocron:holocron_secret_pw_2026@127.0.0.1:5432/holocron"
npx tsx scripts/seed.ts

# Takes ~5 minutes (20 images with 10s rate limiting)
# Then commit the generated images:
git add public/images/posts/
git commit -m "Add generated post images"
GIT_SSH_COMMAND="ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i /home/node/.ssh/github_morty" git push origin main
```

### 4. Verify

Visit https://starwars.hezivio.com

You should see:
- Homepage with hero banner
- 20 posts with AI-generated images
- Working navigation and categories
- Proper branding (logo, favicon, OG image)

## Troubleshooting

**Database connection errors:**
- Verify `holocron` database exists
- Check DATABASE_URL env var is correct
- Ensure database is accessible from the app container

**Deployment fails:**
- Check Coolify deployment logs
- Verify all env vars are set
- Ensure database is created before deploying

**Seed script fails:**
- Check OPENAI_API_KEY is valid
- Verify DATABASE_URL can connect
- If rate limited, wait and retry

## Architecture

- **Framework:** Next.js 15 (App Router, React Server Components)
- **Database:** PostgreSQL 16
- **Images:** WebP optimized, generated via OpenAI gpt-image-1.5
- **Deployment:** Coolify (Docker + Traefik)
- **Domain:** https://starwars.hezivio.com
- **Content:** 20 posts across 6 categories, 8 eras, bilingual (EN/PL)

## What Was Done

1. ✅ Fixed seed.ts - Changed model to `gpt-image-1.5`, size to `1536x1024`, b64_json response
2. ✅ Fixed generate-branding.ts - Same changes
3. ✅ Generated all branding assets (logo, icons, hero banner, OG image)
4. ✅ Updated layout.tsx with proper meta tags
5. ✅ Set DATABASE_URL environment variable
6. ✅ Committed and pushed all changes
7. ✅ Created setup-database.sh helper script
8. ⏳ Deployment triggered (failed due to missing database)

## Manual Action Required

**You need to:**
1. Create the `holocron` database (use setup-database.sh or Coolify UI)
2. Re-deploy the app
3. Run the seed script to populate content

That's it! 🚀
