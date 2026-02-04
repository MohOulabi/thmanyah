import Fastify from 'fastify';
import fastifyEnv from '@fastify/env';
import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import compress from '@fastify/compress';
import rateLimit from '@fastify/rate-limit';
import sensible from '@fastify/sensible';
import postgres from '@fastify/postgres';
import { envSchema, type EnvConfig } from '@/config/env-schema';
import { buildPgConnectionString } from '@/config/connection-string';
import { searchRoute } from '@/routes/search';

declare module 'fastify' {
  interface FastifyInstance {
    config: EnvConfig;
  }
}

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(fastifyEnv, {
    confKey: 'config',
    schema: envSchema,
    dotenv: true,
  });

  const config = app.config;
  const pgConnectionString = buildPgConnectionString(config);
  const rateLimitMax = Number(config.RATE_LIMIT_MAX) || 100;
  const rateLimitTimeWindowMs =
    Number(config.RATE_LIMIT_TIME_WINDOW_MS) || 60_000;

  await app.register(helmet, {
    global: true,
    contentSecurityPolicy: false,
  });

  await app.register(compress, {
    global: true,
  });

  await app.register(cors, {
    origin: config.NODE_ENV === 'production' ? false : true,
    credentials: true,
  });

  await app.register(rateLimit, {
    max: rateLimitMax,
    timeWindow: rateLimitTimeWindowMs,
  });

  await app.register(sensible);

  await app.register(postgres, {
    connectionString: pgConnectionString,
  });

  await app.register(searchRoute, { prefix: '/api' });

  app.get('/health', async (_request, reply) => {
    try {
      await app.pg.query('SELECT 1');
      return reply.send({ status: 'ok', database: 'connected' });
    } catch {
      return reply
        .status(503)
        .send({ status: 'error', database: 'disconnected' });
    }
  });

  return app;
}
