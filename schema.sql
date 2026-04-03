-- Star Wars Holocron Database Schema (idempotent)

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_enum') THEN
    CREATE TYPE category_enum AS ENUM ('character', 'battle', 'ship', 'planet', 'lore', 'timeline', 'scene');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'era_enum') THEN
    CREATE TYPE era_enum AS ENUM ('old_republic', 'prequel', 'clone_wars', 'imperial', 'rebellion', 'new_republic', 'first_order', 'legends');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'canon_status_enum') THEN
    CREATE TYPE canon_status_enum AS ENUM ('canon', 'legends', 'mixed');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_pl VARCHAR(255) NOT NULL,
    content_en TEXT NOT NULL,
    content_pl TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    excerpt_pl TEXT NOT NULL,
    category category_enum NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    image_prompt TEXT NOT NULL,
    era era_enum NOT NULL,
    canon_status canon_status_enum NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_era ON posts(era);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published_at);
