# Deployment Status

## ✅ Completed

1. **Fixed seed script model** - Changed from `dall-e-3` to `gpt-image-1.5`, size to `1536x1024`, quality to `high`, updated to use b64_json response
2. **Fixed generate-branding script** - Same model/size changes
3. **Generated branding assets** - All 4 images created successfully:
   - Logo: `public/images/branding/logo.webp` (24KB)
   - Logo header: `public/images/branding/logo-header.webp` (4.5KB)
   - Favicon: `public/favicon.ico` (624B)
   - Icon variants: `public/images/branding/icon-192.webp` (5.3KB), `icon-512.webp` (24KB)
   - Hero banner: `public/images/branding/hero-banner.webp` (348KB)
   - OG Image: `public/images/branding/og-image.webp` (225KB)
   - Apple touch icon: `public/apple-touch-icon.png` (12KB)
   - Icon 192: `public/icon-192.png` (13KB)
4. **Updated layout.tsx** - Added proper favicon/meta tags (apple-touch-icon reference)
5. **Set DATABASE_URL env var** - Added to Coolify app via API
6. **Git commit and push** - All branding images and code changes committed to `michlo23/starwars-holocron`

## ⏳ Pending Manual Steps

### Database Setup Required

The shared PostgreSQL instance (`postgresql-database-u0k0cooks8k4kcwsgkgkkogc`) is accessible but I don't have the postgres superuser password to create a new database.

**Two options:**

#### Option A: Create holocron database manually
1. Connect to the shared PostgreSQL instance:
   ```bash
   # Find the postgres password (it's stored in Coolify)
   # Then connect:
   psql -h 127.0.0.1 -p 5432 -U postgres -d postgres
   ```
2. Create the database and user:
   ```sql
   CREATE USER holocron WITH PASSWORD 'holocron_secret_pw_2026';
   CREATE DATABASE holocron OWNER holocron;
   GRANT ALL PRIVILEGES ON DATABASE holocron TO holocron;
   ```

#### Option B: Create separate PostgreSQL database in Coolify UI
1. Log into Coolify web interface
2. Navigate to project "Star Wars Holocron"
3. Click "Add Resource" → "Database" → "PostgreSQL"
4. Configure:
   - Name: `holocron-db`
   - Database Name: `holocron`
   - Username: `holocron`
   - Password: `holocron_secret_pw_2026` (or auto-generate)
   - Version: PostgreSQL 16
5. Click "Create" and wait for it to start
6. Update the DATABASE_URL env var in the app to use the new database's internal hostname

### Current DATABASE_URL
Set to: `postgresql://holocron:holocron_secret_pw_2026@postgresql-database-u0k0cooks8k4kcwsgkgkkogc:5432/holocron`

This assumes:
- Database `holocron` exists on the shared instance
- OR you create a new database service and update this env var

## 🚀 Ready to Deploy

Once the database is created, you can:

1. **Deploy the app:**
   ```bash
   curl -s "http://localhost:8000/api/v1/deploy?uuid=rgcgsk4kkk0gs00oog8kckgg&force=true" \
     -H "Authorization: Bearer $(cat ~/.factory/coolify-token)"
   ```

2. **Run seed script** (after first successful deployment):
   - Option A: Exec into the running container
     ```bash
     docker exec -it starwars-holocron npm run seed
     ```
   - Option B: Run locally and commit images
     ```bash
     cd /home/node/.openclaw/workspace/starwars-holocron
     export OPENAI_API_KEY=$(cat ~/.factory/openai-api-key)
     export DATABASE_URL="postgresql://holocron:holocron_secret_pw_2026@127.0.0.1:5432/holocron"
     npx tsx scripts/seed.ts
     # This will generate 20 post images (~5 minutes with rate limiting)
     git add public/images/posts/
     git commit -m "Add generated post images"
     git push
     ```

## 📊 What's Left

- [ ] Create holocron database
- [ ] Deploy app to Coolify
- [ ] Run seed script to populate content and generate post images
- [ ] Verify at https://starwars.hezivio.com

## 🎯 Expected Result

- **Deployed URL:** https://starwars.hezivio.com
- **Posts:** 20 articles with AI-generated images
- **Branding:** Complete visual identity
- **Performance:** Optimized WebP images, responsive design
