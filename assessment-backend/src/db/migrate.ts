/**
 * One-off migration: creates search_cache table if it does not exist.
 * Run with: bun run db:migrate (or tsx src/db/migrate.ts)
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import pg from 'pg';
import { loadEnv } from '@/config/load-env';
import { buildPgConnectionString } from '@/config/connection-string';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function migrate() {
  const config = loadEnv();
  const connectionString = buildPgConnectionString(config);
  const client = new pg.Client({ connectionString });

  try {
    await client.connect();
    const sql = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(sql);
    console.log('Migration completed.');
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

migrate();
