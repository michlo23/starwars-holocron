import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL || '';

export const sql = postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export type Category = 'character' | 'battle' | 'ship' | 'planet' | 'lore' | 'timeline' | 'scene';
export type Era = 'old_republic' | 'prequel' | 'clone_wars' | 'imperial' | 'rebellion' | 'new_republic' | 'first_order' | 'legends';
export type CanonStatus = 'canon' | 'legends' | 'mixed';

export interface Post {
  id: number;
  slug: string;
  title_en: string;
  title_pl: string;
  content_en: string;
  content_pl: string;
  excerpt_en: string;
  excerpt_pl: string;
  category: Category;
  image_url: string;
  image_prompt: string;
  era: Era;
  canon_status: CanonStatus;
  featured: boolean;
  created_at: Date;
  published_at: Date;
}
