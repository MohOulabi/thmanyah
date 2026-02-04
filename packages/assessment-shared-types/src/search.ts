/**
 * Shared types for the search API response.
 * Matches GET /api/search?term=... (iTunes Search API cached by the backend).
 *
 * Response shape verified against:
 * - term=shakira (movies, concerts)
 * - term=فنجان (tv-episodes, mixed media)
 */

/** Common fields present on most iTunes result items (tracks, movies, tv-episodes, etc.) */
export interface ITunesSearchResultItem {
  wrapperType?: string;
  kind?: string;
  artistId?: number;
  trackId?: number;
  collectionId?: number;
  artistName?: string;
  trackName?: string;
  collectionName?: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl?: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  releaseDate?: string;
  country?: string;
  currency?: string;
  primaryGenreName?: string;
  trackPrice?: number;
  collectionPrice?: number;
  trackHdPrice?: number;
  collectionHdPrice?: number;
  trackRentalPrice?: number;
  trackHdRentalPrice?: number;
  trackTimeMillis?: number;
  trackExplicitness?: string;
  collectionExplicitness?: string;
  contentAdvisoryRating?: string;
  shortDescription?: string;
  longDescription?: string;
  discCount?: number;
  discNumber?: number;
  trackCount?: number;
  trackNumber?: number;
  [key: string]: unknown;
}

/** Raw iTunes Search API response (resultCount + results array) */
export interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesSearchResultItem[];
}

/** Our backend wrapper: fromCache + iTunes data */
export interface SearchApiResponse {
  fromCache: boolean;
  data: ITunesSearchResponse;
}
