#!/usr/bin/env tsx
import postgres from 'postgres';

// Connect to the shared PostgreSQL instance as superuser
const adminSql = postgres('postgresql://postgres:postgres@127.0.0.1:5432/postgres', {
  ssl: false,
});

async function createDatabase() {
  try {
    console.log('Creating holocron database and user...');
    
    // Create user
    await adminSql.unsafe(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'holocron') THEN
          CREATE USER holocron WITH PASSWORD 'holocron_secret_pw_2026';
        END IF;
      END
      $$;
    `);
    console.log('✓ User holocron created/verified');
    
    // Create database
    await adminSql.unsafe(`
      SELECT 'CREATE DATABASE holocron OWNER holocron'
      WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'holocron')
      \\gexec
    `);
    console.log('✓ Database holocron created');
    
    // Grant privileges
    await adminSql.unsafe(`GRANT ALL PRIVILEGES ON DATABASE holocron TO holocron`);
    console.log('✓ Privileges granted');
    
    console.log('\n✅ Database setup complete!');
    console.log('Connection string for local testing:');
    console.log('postgresql://holocron:holocron_secret_pw_2026@10.0.1.1:5432/holocron');
    console.log('\nConnection string for Coolify app (internal):');
    console.log('postgresql://holocron:holocron_secret_pw_2026@postgresql-database-u0k0cooks8k4kcwsgkgkkogc:5432/holocron');
    
  } catch (error: any) {
    // Ignore "already exists" errors
    if (error.message?.includes('already exists')) {
      console.log('✓ Database already exists');
      console.log('\nConnection string for local testing:');
      console.log('postgresql://holocron:holocron_secret_pw_2026@10.0.1.1:5432/holocron');
      console.log('\nConnection string for Coolify app (internal):');
      console.log('postgresql://holocron:holocron_secret_pw_2026@postgresql-database-u0k0cooks8k4kcwsgkgkkogc:5432/holocron');
    } else {
      console.error('Error:', error);
      process.exit(1);
    }
  } finally {
    await adminSql.end();
  }
}

createDatabase();
