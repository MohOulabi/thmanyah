# @thamanyah/shared-types

Shared TypeScript types for the Thamanyah assessment (client + backend). Types-only package.

## Contents

- **Search API** – `SearchApiResponse`, `ITunesSearchResponse`, `ITunesSearchResultItem` for `GET /api/search?term=...`

## Build

```bash
bun install
bun run build
```

## Use

- **Backend:** `import type { SearchApiResponse, ITunesSearchResponse } from '@thamanyah/shared-types'`
- **Client:** `import type { SearchApiResponse } from '@thamanyah/shared-types'` (and use in `src/lib/search-api.ts`)

## Adding more shared types

Add new files under `src/` and re-export from `src/index.ts`, then run `bun run build`.
