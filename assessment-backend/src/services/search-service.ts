import type { FastifyInstance } from 'fastify';
import type {
  ITunesSearchResultItem,
  ITunesSearchResponse,
  SearchApiResponse,
} from '@thamanyah/shared-types';

const ITUNES_SEARCH_URL = 'https://itunes.apple.com/search';
const ITUNES_FETCH_TIMEOUT_MS = 10_000;

function sortSearchResults(data: ITunesSearchResponse): ITunesSearchResponse {
  const sorted = [...data.results].sort(
    (a: ITunesSearchResultItem, b: ITunesSearchResultItem) => {
      const titleA = (a.collectionName ?? a.trackName ?? '').trim();
      const titleB = (b.collectionName ?? b.trackName ?? '').trim();
      return titleA.localeCompare(titleB, undefined, { sensitivity: 'base' });
    }
  );
  return { resultCount: data.resultCount, results: sorted };
}

export type { SearchApiResponse as SearchResult };

/**
 * Normalizes search term for cache key: trim and lowercase for consistency.
 */
export function normalizeSearchTerm(term: string): string {
  return term.trim().toLowerCase() || '';
}

/**
 * Fetches search results from iTunes API with a timeout.
 */
async function fetchFromItunes(term: string): Promise<ITunesSearchResponse> {
  const url = new URL(ITUNES_SEARCH_URL);
  url.searchParams.set('term', term);
  url.searchParams.set('media', 'podcast');

  const controller = new AbortController();
  const timeoutId = setTimeout(
    () => controller.abort(),
    ITUNES_FETCH_TIMEOUT_MS
  );

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`iTunes API error: ${res.status} ${res.statusText}`);
    }
    const data = (await res.json()) as ITunesSearchResponse;
    return data;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Returns cached result by term, or null if not found or expired.
 * TTL: entries older than CACHE_TTL_HOURS are treated as miss (no cron needed).
 */
async function getCached(
  app: FastifyInstance,
  term: string,
  ttlHours: number
): Promise<ITunesSearchResponse | null> {
  const row = await app.pg.query(
    'SELECT result, created_at FROM search_cache WHERE term = $1',
    [term]
  );

  if (row.rows.length === 0) return null;

  const { result, created_at: createdAt } = row.rows[0] as {
    result: ITunesSearchResponse;
    created_at: string;
  };
  const ageMs = Date.now() - new Date(createdAt).getTime();
  if (ageMs >= ttlHours * 60 * 60 * 1000) return null;

  return result;
}

/**
 * Stores search result in cache.
 */
async function setCached(
  app: FastifyInstance,
  term: string,
  result: ITunesSearchResponse
): Promise<void> {
  await app.pg.query(
    `INSERT INTO search_cache (term, result)
     VALUES ($1, $2)
     ON CONFLICT (term) DO UPDATE SET result = $2, created_at = NOW()`,
    [term, JSON.stringify(result)]
  );
}

/**
 * Search: use cache if present, otherwise fetch from iTunes and cache.
 */
export async function search(
  app: FastifyInstance,
  rawTerm: string
): Promise<SearchApiResponse> {
  const term = normalizeSearchTerm(rawTerm);
  if (!term) {
    return {
      fromCache: false,
      data: { resultCount: 0, results: [] },
    };
  }

  const ttlHours = Number(app.config.CACHE_TTL_HOURS) || 4;
  const cached = await getCached(app, term, ttlHours);
  if (cached) {
    return { fromCache: true, data: sortSearchResults(cached) };
  }

  const raw = await fetchFromItunes(rawTerm.trim());
  const data = sortSearchResults(raw);
  await setCached(app, term, data);
  return { fromCache: false, data };
}
