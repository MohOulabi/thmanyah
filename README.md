# Thamanyah Assessment

A monorepo containing a podcast search application with a Next.js frontend and Fastify backend.

## Overview

| Package                   | Description                           | Port |
| ------------------------- | ------------------------------------- | ---- |
| `assessment-client-side`  | Next.js 16 frontend with i18n (EN/AR) | 3000 |
| `assessment-backend`      | Fastify API with PostgreSQL caching   | 8080 |
| `@thamanyah/shared-types` | Shared TypeScript types               | -    |

## Tech Stack

- **Monorepo:** Bun workspaces + Turborepo
- **Frontend:** Next.js 16, Tailwind CSS 4, shadcn/ui, React Query
- **Backend:** Fastify 5, PostgreSQL, iTunes Search API
- **Language:** TypeScript (ESM)

## Quick Setup

### Prerequisites

- [Bun](https://bun.sh/) 1.3+
- PostgreSQL

### 1. Install Dependencies

```bash
bun install
```

### 2. Setup Backend

```bash
# Copy env file
cp assessment-backend/.env.example assessment-backend/.env

# Edit .env with your PostgreSQL credentials

# Run database migration
bun run --filter=assessment-backend db:migrate
```

### 3. Setup Frontend

```bash
# Create env file
echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > assessment-client-side/.env.local
```

### 4. Run Development

```bash
# Run all packages
bun dev

# Or run individually
bun run dev:backend   # Backend only
bun run dev:client    # Frontend only
```

## Scripts

| Command               | Description                  |
| --------------------- | ---------------------------- |
| `bun dev`             | Run all packages in dev mode |
| `bun run dev:client`  | Run frontend only            |
| `bun run dev:backend` | Run backend only             |
| `bun build`           | Build all packages           |
| `bun run lint`        | Lint all packages            |
| `bun run format`      | Format all packages          |

## Project Structure

```
thamanyah/
├── assessment-client-side/     # Next.js frontend
├── assessment-backend/         # Fastify backend
├── packages/
│   └── assessment-shared-types/  # Shared TypeScript types
├── package.json                # Root workspace config
└── turbo.json                  # Turborepo config
```

## Documentation

- [Frontend README](./assessment-client-side/README.md)
- [Backend README](./assessment-backend/README.md)
- [Shared Types README](./packages/assessment-shared-types/README.md)
