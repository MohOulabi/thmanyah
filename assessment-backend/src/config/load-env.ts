/**
 * Loads env for use outside Fastify (e.g. db/migrate.ts).
 * Uses dotenv then returns a partial EnvConfig from process.env.
 */
import 'dotenv/config';
import type { EnvConfig } from './env-schema';

export function loadEnv(): Partial<EnvConfig> {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    PG_USER: process.env.PG_USER,
    PG_HOST: process.env.PG_HOST,
    PG_PORT: process.env.PG_PORT,
    PG_DATABASE: process.env.PG_DATABASE,
    PG_PASSWORD: process.env.PG_PASSWORD,
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
    RATE_LIMIT_TIME_WINDOW_MS: process.env.RATE_LIMIT_TIME_WINDOW_MS,
  };
}
