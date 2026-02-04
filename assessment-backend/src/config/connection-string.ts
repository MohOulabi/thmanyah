import type { EnvConfig } from './env-schema';

/**
 * Builds PostgreSQL connection string from env config.
 * Uses DATABASE_URL if set, otherwise PG_* (with defaults for host/port/database).
 */
export function buildPgConnectionString(config: Partial<EnvConfig>): string {
  if (config.DATABASE_URL) return config.DATABASE_URL;
  const user = config.PG_USER ?? process.env.USER ?? 'postgres';
  const password = config.PG_PASSWORD;
  const host = config.PG_HOST ?? 'localhost';
  const port = config.PG_PORT ?? '5432';
  const database = config.PG_DATABASE ?? 'assessment';
  const auth =
    password && password.length > 0
      ? `${user}:${encodeURIComponent(password)}`
      : user;
  return `postgresql://${auth}@${host}:${port}/${database}`;
}
