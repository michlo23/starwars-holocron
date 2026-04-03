# Manual Setup Instructions

## Current Status

✅ GitHub repository created: https://github.com/michlo23/starwars-holocron  
✅ Coolify application created (UUID: `rgcgsk4kkk0gs00oog8kckgg`)  
✅ Domain configured: `starwars.hezivio.com`  
✅ OPENAI_API_KEY environment variable set  
⏳ PostgreSQL database needs to be created  
⏳ DATABASE_URL needs to be set  
⏳ Application needs to be deployed  
⏳ Database needs to be seeded  

## Steps to Complete Deployment

### 1. Create PostgreSQL Database in Coolify UI

1. Log into Coolify web interface
2. Navigate to project "Star Wars Holocron"
3. Click "Add Resource" → "Database" → "PostgreSQL"
4. Configure:
   - Name: `holocron-db`
   - Database Name: `holocron`
   - Username: `holocron`
   - Password: (auto-generated - save this!)
   - Version: PostgreSQL 16
5. Click "Create" and wait for it to start
6. Note the internal connection string (should be something like `holocron-db:5432`)

### 2. Set DATABASE_URL Environment Variable

In Coolify UI for the Star Wars Holocron application:

1. Go to "Environment Variables"
2. Click "Add Variable"
3. Key: `DATABASE_URL`
4. Value: `postgresql://holocron:YOUR_PASSWORD@holocron-db:5432/holocron`
   - Replace `YOUR_PASSWORD` with the password from step 1
   - Replace `holocron-db` with the actual service name if different
5. Save

### 3. Deploy the Application

1. In Coolify UI, go to the application
2. Click "Deploy"
3. Wait for build and deployment to complete (~2-3 minutes)
4. Verify the app is running at `http://starwars.hezivio.com`

### 4. Seed the Database

Connect to the running container and execute the seed script:

```bash
# Get container ID
docker ps | grep starwars-holocron

# Execute seed script
docker exec -it <container_id> npm run seed
```

The seed script will:
- Create database tables (via `schema.sql`)
- Generate 20 Star Wars posts (characters, battles, ships, planets, lore)
- Write content in both English and Polish
- Generate images via OpenAI DALL-E 3 (takes ~3-5 minutes due to rate limiting)
- Save images as WebP to `public/images/posts/`
- Insert all data into PostgreSQL

**Expected output:**
```
🌌 Star Wars Holocron Seeder
==================================================
📊 Setting up database schema...
✓ Database schema ready

[1/20] Processing: Darth Revan: The Prodigal Knight
🎨 Generating image for darth-revan...
...
[20/20] Processing: The Chosen One Prophecy: Balance or Destruction?
🎉 Seeding complete!
✓ Successful: 20
✗ Failed: 0
📊 Total posts in database: 20
```

### 5. Verify Deployment

1. Visit https://starwars.hezivio.com
2. Confirm:
   - Homepage loads with hero banner
   - All 20 posts display with images
   - Post detail pages work
   - Category filtering works (`/category/character`, `/category/battle`, etc.)
   - Era filtering works (`/era/old_republic`, `/era/clone_wars`, etc.)
   - About page loads

## Troubleshooting

### Database Connection Errors

If you see "could not connect to database":
- Verify DATABASE_URL is correct
- Check that PostgreSQL database is running in Coolify
- Ensure the database service is on the same Docker network as the app (`coolify`)

### Image Generation Fails

If images don't generate during seeding:
- Check OPENAI_API_KEY is set correctly
- Verify API key has credits available
- Check OpenAI API rate limits (free tier: 5 requests/min)

### Build Failures

If Next.js build fails:
- Check build logs in Coolify
- Verify all dependencies installed correctly
- Ensure node version is 22+ (set in Dockerfile)

## Architecture

- **Frontend**: Next.js 15 (App Router)
- **Database**: PostgreSQL 16
- **Images**: OpenAI DALL-E 3 (generated once, stored locally)
- **Deployment**: Coolify (Docker + Traefik proxy)
- **Domain**: starwars.hezivio.com
- **Content**: 20 posts across 6 categories, 8 eras, Canon/Legends/Mixed

## Post-Deployment Tasks

Optional enhancements:
- [ ] Add language toggle functionality (EN/PL)
- [ ] Implement RSS feed at `/feed.xml`
- [ ] Add search functionality
- [ ] Create tag system
- [ ] Add more posts (target: 50-100)
