import type { ITunesSearchResultItem } from '@thamanyah/shared-types';

export type SearchResultItem = {
  id: string;
  title: string;
  artist: string;
  image: string;
  genre: string;
};

export function mapItunesResultsToItems(
  results: ITunesSearchResultItem[]
): SearchResultItem[] {
  const items: SearchResultItem[] = [];

  for (const item of results) {
    const title = item.collectionName ?? item.trackName ?? '';
    const artist = item.artistName ?? '';
    const rawImage =
      item.artworkUrl600 ??
      item.artworkUrl100 ??
      item.artworkUrl60 ??
      item.artworkUrl30 ??
      '';
    const image = typeof rawImage === 'string' ? rawImage : '';
    const genre = item.primaryGenreName ?? '';

    if (!title || !image) continue;

    const id = String(
      item.collectionId ?? item.trackId ?? item.artistId ?? Math.random()
    );

    items.push({ id, title, artist, image, genre });
  }

  return items;
}
