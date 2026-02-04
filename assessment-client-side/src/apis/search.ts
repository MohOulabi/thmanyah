import type { SearchApiResponse } from '@thamanyah/shared-types';
import { api } from '@/lib/fetch';

const SEARCH_REVALIDATE_SECONDS = 300; // 5 minutes

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';
}

/**
 * Server-side search using Next.js fetch with cache revalidation.
 * Caches the response and revalidates every 5 minutes.
 */
export async function searchApiServer(
  term: string
): Promise<SearchApiResponse> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/api/search?term=${encodeURIComponent(term)}`;

  const res = await fetch(url, {
    next: { revalidate: SEARCH_REVALIDATE_SECONDS },
  });

  if (!res.ok) {
    throw new Error(`Search failed: ${res.status}`);
  }

  return res.json() as Promise<SearchApiResponse>;
}

/**
 * Client-side search using ky (e.g. for programmatic calls).
 * Uses shared types from @thamanyah/shared-types.
 */
export async function searchApi(term: string): Promise<SearchApiResponse> {
  const json = await api
    .get('api/search', { searchParams: { term } })
    .json<SearchApiResponse>();
  return json;
}
