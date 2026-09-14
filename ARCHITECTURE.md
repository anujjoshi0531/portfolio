# Portfolio Architecture

This is a Next.js App Router portfolio and content site. The architecture favors clear ownership and direct imports over broad barrels or ceremony.

## Directory Ownership

- `app/`: framework-owned routing, layouts, route metadata, route errors/loading states, and API route handlers. Route files should stay thin and compose data loaders plus components.
- `features/blog/`: blog content projections, filters, search, graph data, backlinks, and future blog-specific code.
- `features/projects/`: project content projections and future project-specific code.
- `features/about/`: experience, education, testimonial content projections, and future about-specific code.
- `features/algorithms/`: algorithm UI, visualizers, catalog projections, registry, runtime helpers, playback hooks, types, and definitions.
- `features/search/`: site/blog search UI and search-specific hooks.
- `components/layout/`: site shell components such as navbar, footer, logo, back button, and structured data.
- `components/providers/`: root provider composition and provider wrappers.
- `components/ui/`: reusable shadcn/Radix-style primitives. These should not know about portfolio domains such as blogs, projects, or algorithms.
- `components/global/`: cross-feature components that are still shared today. New additions should be scrutinized; feature-specific components should move closer to their feature over time.
- `components/home/`, `components/about/`, `components/blog/`, `components/project/`, `components/contact/`: route or feature-specific presentation components that have not yet moved into `features/`.
- `hooks/`: generic client hooks used across non-search features. Prefer direct imports from the concrete hook file.
- `lib/config/`: client/server config, fonts, metadata, and future navigation/static config.
- `lib/content/`: generic content root resolution, frontmatter parsing, collection reads, normalization, excerpt extraction, and Markdown rendering.
- `lib/server/`: server-only integrations and adapters, including Redis, email, newsletter subscribers, and compatibility exports.
- `lib/utils/`: small shared utility modules grouped by purpose.
- `content/`: Markdown, Obsidian Base views, and article asset sources, tracked in this repository.
- `content/_assets/`: canonical article media and editable drawing sources. Export drawings to browser-ready images here.
- `public/_assets/`: ignored generated media, copied from `content/_assets/` by `pnpm assets:sync` before development and builds. Do not edit files here.
- `public/` outside `_assets/`: tracked site-wide static assets such as icons, hero media, and the resume.
- `scripts/`: build and authoring utilities, including content asset synchronization.
- `db/` and `drizzle/`: database schema and migrations.
- `styles/`: global CSS, markdown rendering styles, and sprite styles.
- `types/`: global TypeScript declarations only.

## Boundaries

- Server routes and server components may import `features/*/lib`, `lib/content/*`, and `lib/server/*`.
- Client components may import `lib/client/*`, `lib/config/client`, `lib/utils/*`, UI primitives, client-safe hooks, and feature components that start with `"use client"`.
- Client components must not import filesystem-backed collection readers, server integrations, or `server-only` config.
- UI primitives import only framework packages and utility modules, not feature data.
- `lib/server/local-content.ts` remains a compatibility export for older imports, but new code should import from `features/*/lib` or `lib/content/*` directly.
- `lib/markdown.ts` remains a compatibility export for older imports, but new code should import from `lib/content/markdown/*` directly.

## Import Conventions

- Import `cn` from `@/lib/utils/styles`.
- Import date helpers from `@/lib/utils/dates`.
- Import number and color formatting helpers from `@/lib/utils/format`.
- Import browser ID helpers from `@/lib/utils/ids`.
- Import search hooks from `@/features/search/hooks/*`.
- Import generic hooks from their concrete files, such as `@/hooks/useFilters`.
- Avoid new barrel files unless they represent a stable public API for a cohesive module.

## Content Flow

1. Markdown files live under `content/`.
2. `lib/content/root.ts` resolves this repository's content directory without external checkouts.
3. `lib/content/frontmatter.ts`, `normalize.ts`, `search.ts`, and `collections.ts` parse and normalize content items.
4. Feature modules project generic content into public feature shapes:
   - `features/blog/lib/content.ts`
   - `features/blog/lib/graph.ts`
   - `features/projects/lib/content.ts`
   - `features/about/lib/content.ts`
   - `features/algorithms/lib/catalog.ts`
5. `lib/content/markdown/render.ts` renders Markdown to HTML and reading metadata.

Blog playlists are Markdown records in `content/playlists/`, loaded by `features/blog/playlists/lib/playlists.ts` through the shared content root and frontmatter parser. Their frontmatter preserves playlist IDs and ordered sections/article slugs. `content/playlists.base` is an Obsidian management view over those records; Base files are not website data sources.

## API Routes

API routes should validate request input, call a server or feature helper, and return a response. Shared server behavior belongs under `lib/server`, grouped by integration responsibility:

- `lib/server/redis.ts`
- `lib/server/email/*`
- `lib/server/newsletter/*`

## High-Risk Modules

- `lib/content/markdown/*`: plugin order controls rendered Markdown, table of contents, embeds, and syntax/math output.
- `features/algorithms/lib/definitions/*`: large algorithm definitions loaded by the registry.
- `components/algorithms/visualizers/ConceptVisualizer.tsx`: contains multiple visualization responsibilities in one component.
- API routes under `app/api/`: depend on Redis, QStash, email, content, and environment variables.

## Styling

- `styles/globals.css` owns base styles, theme variables, and site-wide Tailwind setup.
- `styles/markdown.css` owns rendered Markdown only.
- `styles/sprite.css` owns the hero sprite implementation only.
- Reusable repeated UI patterns should become components before global CSS utilities.

## Dependency Notes

Verified-unused direct packages removed during this refactor:

- `@sentry/conventions`
- `cmdk`
- `@svgr/webpack`
- `@types/pg`
- `autoprefixer`

Kept because live imports or scripts use them:

- `dotenv`
- `react-day-picker`
- `react-icons`
- `framer-motion`
- `@next/third-parties`
