# Assessment Backend

A Fastify API with PostgreSQL caching that proxies the iTunes Search API for podcast discovery.

## Tech Stack

- **Runtime:** Node.js 20+
- **Framework:** Fastify 5
- **Database:** PostgreSQL (with JSONB caching)
- **Language:** TypeScript (ESM)
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- PostgreSQL database

### Installation

```bash
bun install
```

### Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Configure your environment:

```env
# Server
NODE_ENV=development
PORT=8080

# PostgreSQL (use PG_* or DATABASE_URL)
PG_USER=postgres
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=assessment
PG_PASSWORD=

# Or use a connection string
# DATABASE_URL=postgresql://user@localhost:5432/assessment

# Rate limiting (optional)
RATE_LIMIT_MAX=100
RATE_LIMIT_TIME_WINDOW_MS=60000

# Cache TTL (optional, default: 4 hours)
CACHE_TTL_HOURS=4
```

### Database Setup

Run the migration to create the cache table:

```bash
bun run db:migrate
```

### Development

```bash
bun dev
```

API available at [http://localhost:8080](http://localhost:8080)

## Scripts

| Command                  | Description                     |
| ------------------------ | ------------------------------- |
| `bun dev`                | Start with hot reload (tsx)     |
| `bun build`              | Compile TypeScript              |
| `bun start`              | Run compiled app                |
| `bun run db:migrate`     | Create `search_cache` table     |
| `bun run db:clear-cache` | Clear all cached search results |
| `bun run lint`           | Run ESLint                      |
| `bun run lint:fix`       | Fix ESLint issues               |
| `bun run format`         | Format code with Prettier       |

## API Endpoints

### Health Check

```
GET /health
```

**Response:**

```json
{ "status": "ok" }
```

### Search Podcasts

```
GET /api/search?term=<query>
```

| Parameter | Type   | Required | Description         |
| --------- | ------ | -------- | ------------------- |
| `term`    | string | Yes      | Search query string |

**Response:**

```json
{
  "fromCache": true,
  "data": {
    "resultCount": 50,
    "results": [...]
  }
}
```

- `fromCache: true` — Result served from PostgreSQL cache
- `fromCache: false` — Fresh result from iTunes API (now cached)

**Example:**

```bash
curl "http://localhost:8080/api/search?term=jack+johnson"
```

## Project Structure

```
src/
├── index.ts                 # Entry point, starts server
├── app.ts                   # Fastify app builder, plugin registration
├── config/
│   ├── env-schema.ts        # Environment variable schema
│   ├── load-env.ts          # Dotenv loader
│   └── connection-string.ts # PostgreSQL connection builder
├── db/
│   ├── schema.sql           # Database schema (search_cache table)
│   ├── migrate.ts           # Migration script
│   └── clear-cache.ts       # Cache cleanup script
├── routes/
│   └── search/
│       ├── index.ts         # Search route handler
│       └── search-schema.ts # Request/response schemas
└── services/
    └── search-service.ts    # iTunes API + caching logic
```

## Database Schema

```sql
CREATE TABLE search_cache (
  id         SERIAL PRIMARY KEY,
  term       TEXT NOT NULL UNIQUE,
  result     JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

- **term** — Normalized search term (lowercase, trimmed)
- **result** — Full iTunes API response as JSONB
- **created_at** — Timestamp for TTL expiration

## Caching Strategy

1. Search terms are normalized (lowercase, trimmed)
2. Cache lookup by term
3. If cached and within TTL → return cached result
4. If miss or expired → fetch from iTunes, store, return
5. Results are sorted alphabetically for consistency

**TTL:** Configurable via `CACHE_TTL_HOURS` (default: 4 hours)

## Security

| Feature        | Description                                   |
| -------------- | --------------------------------------------- |
| **Helmet**     | HTTP security headers                         |
| **CORS**       | Permissive in dev, restrictive in production  |
| **Rate Limit** | Configurable per-IP rate limiting             |
| **Sensible**   | Consistent error handling (4xx/5xx responses) |

## Type Safety

Uses shared types from `@thamanyah/shared-types`:

- `ITunesSearchResponse` — iTunes API response shape
- `ITunesSearchResultItem` — Individual search result
- `SearchApiResponse` — API response with cache metadata
