# Deployment Guide - Star Wars Holocron

## Prerequisites

1. Coolify instance with PostgreSQL support
2. OpenAI API key
3. GitHub repository access

## Deployment Steps

### 1. Create PostgreSQL Database in Coolify UI

- Navigate to your Coolify project
- Create a new PostgreSQL 16 database
- Name: `holocron-db`
- Database: `holocron`
- User: `holocron`
- Password: (auto-generated)
- Note the internal connection string

### 2. Configure Application in Coolify

The application has been created via API:
- UUID: `rgcgsk4kkk0gs00oog8kckgg`
- Repository: `https://github.com/michlo23/starwars-holocron`
- Branch: `main`

### 3. Set Environment Variables

In Coolify UI for the application, set:

```
DATABASE_URL=postgresql://holocron:PASSWORD@holocron-db:5432/holocron
OPENAI_API_KEY=sk-proj-...
```

Replace:
- `PASSWORD` with the actual database password from step 1
- `holocron-db` with the actual database service name (or use `10.0.1.1` if external)
- OpenAI key with your actual key

### 4. Configure Domain

In Coolify UI:
- Set domain: `starwars.hezivio.com`
- Enable HTTPS
- Deploy

### 5. Initialize Database

After first deployment, connect to the app container and run:

```bash
npm run seed
```

This will:
1. Create database tables
2. Generate 20 posts with content (EN + PL)
3. Generate images via OpenAI DALL-E 3
4. Populate the database

**Note:** Image generation takes ~3-5 minutes (rate limiting: 10s between requests).

## Database Schema

The seed script will create:
- `posts` table with all content
- `tags` table (for future use)
- `post_tags` junction table
- Proper indexes

## Container Networking

The app uses `10.0.1.1` for container→host communication as per Coolify standards.

## Post-Deployment

1. Verify site loads at `https://starwars.hezivio.com`
2. Check all 20 posts have images
3. Test language toggle (future feature)
4. Verify category and era filtering

## Troubleshooting

- If images don't generate: Check OPENAI_API_KEY env var
- If database connection fails: Verify DATABASE_URL and network connectivity
- If build fails: Check Next.js build logs in Coolify
