/**
 * Truncates the search_cache table (manual cache clear).
 * Run with: bun run db:clear-cache (or tsx src/db/clear-cache.ts)
 */
import pg from 'pg';
import { loadEnv } from '@/config/load-env';
import { buildPgConnectionString } from '@/config/connection-string';

async function clearCache() {
  const config = loadEnv();
  const connectionString = buildPgConnectionString(config);
  const client = new pg.Client({ connectionString });

  try {
    await client.connect();
    await client.query('TRUNCATE search_cache RESTART IDENTITY');
    console.log('Search cache cleared.');
  } catch (err) {
    console.error('Clear cache failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

clearCache();
