/**
 * Environment schema for @fastify/env.
 * Single source of truth for env vars and their types/defaults.
 */

export const envSchema = {
  type: 'object',
  required: [],
  properties: {
    NODE_ENV: {
      type: 'string',
      default: 'development',
    },
    PORT: {
      type: 'string',
      default: '8080',
    },
    DATABASE_URL: { type: 'string' },
    PG_USER: { type: 'string' },
    PG_HOST: { type: 'string' },
    PG_PORT: { type: 'string' },
    PG_DATABASE: { type: 'string' },
    PG_PASSWORD: { type: 'string' },
    RATE_LIMIT_MAX: { type: 'string' },
    RATE_LIMIT_TIME_WINDOW_MS: { type: 'string' },
    CACHE_TTL_HOURS: {
      type: 'string',
      default: '4',
    },
  },
  additionalProperties: false,
} as const;

export interface EnvConfig {
  NODE_ENV: string;
  PORT: string;
  DATABASE_URL?: string;
  PG_USER?: string;
  PG_HOST?: string;
  PG_PORT?: string;
  PG_DATABASE?: string;
  PG_PASSWORD?: string;
  RATE_LIMIT_MAX?: string;
  RATE_LIMIT_TIME_WINDOW_MS?: string;
  CACHE_TTL_HOURS: string;
}
