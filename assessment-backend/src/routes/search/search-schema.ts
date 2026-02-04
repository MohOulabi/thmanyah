/**
 * Request/response types and JSON schemas for the search route.
 * Response type comes from shared package for consistency with the client.
 */

import type { SearchApiResponse } from '@thamanyah/shared-types';

export interface SearchQuerystring {
  term: string;
}

export type SearchResponse = SearchApiResponse;

export const searchQuerystringSchema = {
  type: 'object',
  properties: {
    term: { type: 'string', minLength: 1, maxLength: 200 },
  },
  required: ['term'],
  additionalProperties: false,
} as const;

export const searchResponseSchema = {
  200: {
    type: 'object',
    properties: {
      fromCache: { type: 'boolean' },
      data: {
        type: 'object',
        properties: {
          resultCount: { type: 'number' },
          results: { type: 'array', items: {} },
        },
        required: ['resultCount', 'results'],
        additionalProperties: true,
      },
    },
    required: ['fromCache', 'data'],
    additionalProperties: false,
  },
} as const;
