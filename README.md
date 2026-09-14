# Portfoli X

Portfolio and content site for Anuj Joshi, built with Next.js App Router, React, TypeScript, Tailwind CSS, local Markdown content, Drizzle/PostgreSQL, Upstash Redis/QStash, Nodemailer, and Sentry.

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create `.env` with the required local values. Public values use `NEXT_PUBLIC_*`; server-only mail, database, Redis, QStash, and cron values must stay unprefixed.

3. Run the app:

   ```bash
   pnpm dev
   ```

## Scripts

- `pnpm dev`: start the local Next.js dev server.
- `pnpm lint`: run ESLint 9 with the flat config.
- `pnpm typecheck`: run TypeScript without emitting files.
- `pnpm build`: build the production app.
- `pnpm start`: start the production server after a build.
- `pnpm db:generate`: generate Drizzle migrations.
- `pnpm db:push`: push schema changes.
- `pnpm db:migrate`: run migrations.
- `pnpm db:studio`: open Drizzle Studio.

## Content Workflow

Local content lives in `content/` and is read through server-only collection helpers in `lib/content` and feature projection modules under `features/*/lib`.

- Blog posts: `content/blog/*.md`
- Projects: `content/projects/*.md`
- About data: `content/experience`, `content/education`, and `content/testimonials`
- Algorithm articles: `content/algorithms/*.md`
- Public content assets: use `_assets` paths that resolve to `/_assets/...`

Markdown rendering is handled by `lib/content/markdown`, with plugins split by callouts, wikilinks, algorithm embeds, and reading stats.

## Architecture

See `ARCHITECTURE.md` for directory ownership and import conventions. In short:

- `app/` owns routing and thin route composition.
- `features/` owns domain-specific content, search, and feature logic.
- `components/ui/` owns reusable primitives.
- `components/layout/` owns the site shell.
- `lib/content/` owns generic content parsing and rendering.
- `lib/server/` owns server integrations.
- `lib/utils/` owns small shared utilities grouped by purpose.

Prefer direct imports from concrete modules. Avoid new generic barrels unless the module has a stable cohesive public API.

## Verification

Before shipping a refactor, run:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Current lint output may include warnings for unused values in algorithm visualizers and generated declaration comments; these are non-blocking and should be cleaned up when those modules are touched.

## Troubleshooting

- If `pnpm build` changes `tsconfig.json`, keep Next.js mandatory compiler settings unless they break local tooling.
- If QStash newsletter dispatch runs locally, the webhook URL must be publicly reachable through a tunnel.
- If content appears missing, confirm `content/` exists and is populated; the content root helper also checks `../portfolio-content` as a fallback.
- If email fails, confirm mail credentials and display addresses in `.env`.
