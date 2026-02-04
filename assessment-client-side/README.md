# Assessment Client Side

A modern Next.js 16 application with TypeScript, Tailwind CSS v4, and full internationalization support (English/Arabic with RTL).

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (base-nova style)
- **State Management:** Zustand, React Query (TanStack Query)
- **Forms:** React Hook Form + Zod validation
- **i18n:** next-intl (EN/AR with RTL support)
- **HTTP Client:** Ky
- **Package Manager:** Bun

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+
- Backend API running on `http://localhost:8080`

### Installation

```bash
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Scripts

| Command            | Description               |
| ------------------ | ------------------------- |
| `bun dev`          | Start development server  |
| `bun build`        | Create production build   |
| `bun start`        | Start production server   |
| `bun run lint`     | Run ESLint                |
| `bun run lint:fix` | Fix ESLint issues         |
| `bun run format`   | Format code with Prettier |
| `bun run shad`     | Add shadcn/ui components  |

## Project Structure

```
src/
├── @types/              # TypeScript type declarations
├── apis/                # API service functions
│   ├── index.ts         # API exports
│   └── search.ts        # Search API (server & client)
├── app/                 # Next.js App Router
│   ├── [locale]/        # Localized routes (en/ar)
│   │   ├── layout.tsx   # Root locale layout
│   │   ├── page.tsx     # Home page
│   │   ├── login/       # Login page
│   │   ├── signup/      # Signup page
│   │   └── search/      # Search page
│   ├── globals.css      # Global styles
│   └── layout.tsx       # Root layout
├── components/
│   ├── common/          # Shared components
│   │   ├── controllers/ # Form controllers
│   │   └── locale-switcher.tsx
│   ├── icons/           # Custom SVG icons
│   ├── layouts/         # Layout components
│   │   └── main-layout/ # Main app layout with sidebar
│   ├── providers/       # React context providers
│   │   ├── query-provider.tsx
│   │   └── search-transition-provider.tsx
│   ├── screens/         # Page-level components
│   │   ├── login-screen/
│   │   ├── signup-screen/
│   │   └── search-screen/
│   └── ui/              # shadcn/ui components
├── hooks/               # Custom React hooks
│   ├── use-dir.tsx      # RTL direction hook
│   └── use-mobile.tsx   # Mobile detection hook
├── i18n/                # Internationalization config
│   ├── request.ts       # Server request locale
│   └── routing.ts       # Locale routing setup
├── lib/                 # Utility functions
│   ├── fetch/           # HTTP client setup (Ky)
│   ├── i18n.ts          # i18n helpers
│   ├── search-utils.ts  # Search utilities
│   └── utils.ts         # General utilities (cn, etc.)
├── zod/                 # Zod validation schemas
│   ├── login.ts
│   └── signup.ts
└── proxy.ts             # API proxy configuration
```

```
messages/                # i18n translation files
├── en.json              # English translations
└── ar.json              # Arabic translations
```

## Key Features

- **Internationalization:** Full EN/AR support with RTL layout
- **Search:** Server-side and client-side search with caching
- **Authentication:** Login and signup flows with form validation
- **UI Components:** Pre-built shadcn/ui components with RTL support
- **Type Safety:** Shared types via `@thamanyah/shared-types` package

## Component Guidelines

### Adding UI Components

Use shadcn/ui CLI to add new components:

```bash
bun run shad button
bun run shad input
```

### Creating New Screens

1. Create folder in `src/components/screens/`
2. Add main component and `index.ts` barrel export
3. Create page in `src/app/[locale]/`

### Adding Translations

Add keys to both `messages/en.json` and `messages/ar.json`.

## Fonts

- **English:** Plus Jakarta Sans
- **Arabic:** IBM Plex Sans Arabic
