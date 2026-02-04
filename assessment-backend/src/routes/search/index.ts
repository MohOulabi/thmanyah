import type { FastifyInstance, FastifyRequest } from 'fastify';
import { search } from '@/services/search-service';
import {
  type SearchQuerystring,
  searchQuerystringSchema,
  searchResponseSchema,
} from './search-schema';

/** Validates search term meets basic requirements */
function isValidSearchTerm(term: string): boolean {
  const trimmed = term.trim();
  // Reject empty, whitespace-only, or excessively short terms
  if (trimmed.length < 1) return false;
  // Reject terms that are only special characters
  if (!/[\p{L}\p{N}]/u.test(trimmed)) return false;
  return true;
}

export async function searchRoute(app: FastifyInstance): Promise<void> {
  type Request = FastifyRequest<{ Querystring: SearchQuerystring }>;

  app.get<{ Querystring: SearchQuerystring }>(
    '/search',
    {
      schema: {
        querystring: searchQuerystringSchema,
        response: searchResponseSchema,
      },
    },
    async (request: Request, reply) => {
      const { term } = request.query;

      if (!isValidSearchTerm(term)) {
        return reply.badRequest(
          'Search term must contain at least one letter or number'
        );
      }

      const result = await search(app, term);
      return reply.send(result);
    }
  );
}
