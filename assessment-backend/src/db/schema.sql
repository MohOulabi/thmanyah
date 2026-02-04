-- Search cache: one row per search term, stores raw iTunes API response.
CREATE TABLE IF NOT EXISTS search_cache (
  id         SERIAL PRIMARY KEY,
  term       TEXT NOT NULL UNIQUE,
  result     JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_search_cache_term ON search_cache (term);
