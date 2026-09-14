# Portfolio Architecture Refactor Plan

Date: 2026-09-14
Project: `portfoli-x`
Stack observed: Next.js App Router, React 18, TypeScript, Tailwind CSS v4, Drizzle ORM, PostgreSQL, Upstash Redis/QStash, Nodemailer, Sentry, local Markdown content.
Status: Phases 1-17 complete as of 2026-09-14.

## 1. Current Architecture

The repository is a Next.js portfolio and content site with routes in `app/`, UI in `components/`, content in `content/`, persistence in `db/` and `drizzle/`, infrastructure helpers in `lib/server/`, client constants/data in `lib/client/`, global hooks in `hooks/`, global styles in `styles/`, and public assets in `public/`.

### Main Entry Points

- `app/layout.tsx` is the root application shell. It owns fonts, metadata, providers, navbar/footer, analytics, Sentry-adjacent concerns, JSON-LD, theme bootstrapping, chatbot loading, and layout markup.
- `app/page.tsx` renders the home page and contains page-level skeleton components inline.
- `app/blog/page.tsx` and `app/blog/[pageId]/page.tsx` render blog listing and blog detail pages.
- `app/project/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`, and `app/unsubscribe/page.tsx` render secondary sections.
- `app/api/*/route.ts` contains API endpoints for search, likes, views, email, subscriptions, cron dispatch, newsletter queue work, and algorithm content/runtime endpoints.
- `lib/server/local-content.ts` is the main content data access module for blog, project, experience, education, testimonials, algorithm catalog, graph data, backlinks, frontmatter parsing, excerpt extraction, and content search.
- `lib/markdown.ts` handles Markdown rendering, Obsidian-style callouts, wikilinks, embeds, algorithm placeholders, ToC extraction, reading time, code highlighting, KaTeX, headings, and lazy image transforms.
- `lib/algorithms/*` contains algorithm definitions, registry, runtime helpers, playback hook, types, highlighting, and complexity utilities.
- `components/algorithms/*` contains interactive algorithm UI and visualizers.
- `components/blog/*`, `components/home/*`, `components/about/*`, `components/project/*`, and `components/contact/*` contain feature/page UI.
- `components/global/*` contains reusable and semi-reusable cross-site components.
- `components/ui/*` contains shadcn/Radix-style UI primitives.
- `lib/constant/config.client.ts` and `lib/constant/config.server.ts` split configuration by client/server availability.

### Current Dependency Shape

- App routes import components and server data functions directly.
- Feature components import shared UI, hooks, constants, and sometimes server-side content functions.
- UI primitives import `cn` inconsistently from `@/lib`, `@/lib/index`, and `@/lib/utils`.
- Content code imports algorithm types, meaning generic content access currently knows about a specific feature domain.
- Blog graph and backlinks import types from the server content module into client-facing components.
- Algorithm components import algorithm domain types and runtime loaders from `lib/algorithms`.
- API routes mostly call server helpers in `lib/server`, but some endpoints also couple directly to content helpers.

This is workable, but the architecture is more "folders by broad category" than "clear ownership boundaries." The highest-value refactor is not a rewrite; it is to separate framework routes, feature modules, content pipeline, infrastructure adapters, and shared UI.

## 2. Major Problems

### Critical

- `lib/server/local-content.ts` has too many responsibilities. It performs filesystem access, frontmatter parsing, normalization, collection reads, projection into domain models, blog search, algorithm catalog derivation, graph generation, backlinks, and content directory fallback behavior.
- Algorithm definitions are oversized and bundled by broad category. Files such as `lib/algorithms/definitions/compression.ts`, `concepts.ts`, `sorting.ts`, and `data-structures.ts` are too large to review, test, or safely edit.
- Types are implicit or global in places where public boundaries should be explicit. `BlogPost`, `Project`, and `SocialLinkEntry` appear to be global/type-root concepts rather than clearly owned domain types.
- The existing `plan.md` was stale and claimed previous refactor completion, which is dangerous for future AI-assisted work.

### High

- `app/layout.tsx` mixes application shell, SEO metadata, structured data, providers, fonts, analytics, and theme bootstrapping.
- Shared vs feature-specific component boundaries are blurry. For example, `components/global/ProjectCard.tsx` is globally placed but appears project-domain specific.
- `components/home/*` and `components/about/*` share section-level concepts inconsistently. Some sections are server loaders, some are client renderers, and naming does not always make that clear.
- Search code is duplicated conceptually across `components/site/search`, `components/blog/SearchInput.tsx`, hooks, and `/api/search`.
- Barrel exports exist where they provide little value and obscure dependency direction, especially `hooks/index.ts`, `components/site/search/index.ts`, and `lib/index.ts`.
- Assets exist in both `content/_assets` and `public/_assets`, which may be intentional for public serving but needs a documented sync/ownership rule.

### Medium

- `lib/client/data.tsx` mixes social links, skill JSX, competitive programming platform metadata, and blog sorting options in one client-side module.
- Styling is split across `styles/globals.css`, `styles/markdown.css`, `styles/sprite.css`, Tailwind classes, and UI primitives without a concise convention document.
- Hooks are all globally placed even when some may be feature-specific.
- Some route-level loading/error files repeat patterns and can share a small error/loading primitive without hiding route semantics.
- `next.config.js` includes an empty webpack passthrough and mixed concerns between image policy, caching headers, package optimization, and Sentry wrapping.
- Server integrations are grouped under `lib/server`, but the folder does not distinguish email, persistence, cache, queue, and content adapters.

### Low

- Import style is inconsistent between single quotes and double quotes.
- Directory names such as `components/global` and `lib/constant` are vague.
- Some comments narrate implementation history instead of current behavior.
- Several one-file or low-value directories may remain after feature moves and should be reassessed once the main structure is settled.

## 3. Target Architecture

The target should remain a simple Next.js app. Do not introduce repositories, service layers, dependency injection, or clean-architecture ceremony unless a boundary has concrete value. The goal is clear ownership and boring, discoverable modules.

```text
app/
  api/
  about/
  algorithms/
  blog/
  contact/
  project/
  unsubscribe/
  error.tsx
  global-error.tsx
  layout.tsx
  loading.tsx
  manifest.ts
  not-found.tsx
  page.tsx
  robots.ts
  sitemap.ts

components/
  layout/
    Footer.tsx
    Navbar.tsx
    Logo.tsx
    GoBackButton.tsx
  providers/
    AppProviders.tsx
    ChatbotProvider.tsx
    DarkProvider.tsx
    ThemeProvider.tsx
  ui/
    ...

features/
  about/
    components/
    data.tsx
    types.ts
  algorithms/
    components/
    definitions/
    lib/
    types.ts
  blog/
    components/
    lib/
    types.ts
  contact/
    components/
    schemas.ts
  home/
    components/
  projects/
    components/
    types.ts
  search/
    components/
    hooks/
    types.ts

content/
  algorithms/
  blog/
  education/
  experience/
  projects/
  testimonials/
  _assets/
  *.base

db/
  index.ts
  schema.ts

lib/
  config/
    client.ts
    server.ts
    metadata.ts
    navigation.ts
  content/
    collections.ts
    frontmatter.ts
    markdown.ts
    normalize.ts
    search.ts
    graph.ts
  server/
    email/
    newsletter/
    queue/
    redis.ts
  utils/
    dates.ts
    format.ts
    ids.ts
    styles.ts

styles/
  globals.css
  markdown.css
  sprite.css

types/
  global.d.ts
```

This tree is a target direction, not a mandatory final shape. During implementation, only create directories that hold multiple meaningful modules or clarify ownership.

## 4. Files to Remove

These are candidates. Verify usage before deleting.

- `lib/index.ts`: remove if it only re-exports unrelated utilities/data and causes unclear imports. Prefer direct imports from `lib/utils/*`, `lib/config/*`, or feature modules.
- `hooks/index.ts`: remove after replacing barrel imports with direct hook imports.
- `components/site/search/index.ts`: remove after replacing local barrel imports.
- Empty or one-line compatibility wrappers discovered during implementation.
- Historical comments that describe removed code paths, for example notes about deleted variables or previous refactors.
- The empty `webpack: (config) => config` function in `next.config.js`.
- Unused generated/build artifacts if tracked or accidentally committed, such as `tsconfig.tsbuildinfo`, after confirming `.gitignore` and git tracking.
- Duplicated assets between `content/_assets` and `public/_assets` only if a single ownership/serving strategy is implemented. Do not remove either side until the content asset pipeline is verified.

## 5. Files to Merge

- Merge trivial hook barrels into direct imports at call sites.
- Merge low-value wrapper components that only pass props to one child and are not reused.
- Consolidate repeated route error UI around one reusable `RouteErrorCard` only if it reduces repetition without hiding useful route-specific copy.
- Consolidate repeated page skeletons only when two routes share the same shape. Keep page-specific skeletons colocated if they mirror unique layout.
- Group tiny generic utility files into `lib/utils/dates.ts`, `lib/utils/format.ts`, `lib/utils/styles.ts`, and `lib/utils/ids.ts` instead of one file per tiny function.
- Consolidate search UI primitives currently split across `components/site/search` and blog search into `features/search`.

## 6. Files to Split

- `lib/server/local-content.ts` should be split by responsibility:
  - `lib/content/root.ts`: resolve content directory.
  - `lib/content/frontmatter.ts`: parse and validate frontmatter.
  - `lib/content/collections.ts`: read collections and normalize common content item shape.
  - `features/blog/lib/content.ts`: blog projections, filters, search.
  - `features/projects/lib/content.ts`: project projections.
  - `features/about/lib/content.ts`: education, experience, testimonials.
  - `features/algorithms/lib/catalog.ts`: algorithm catalog projections.
  - `features/blog/lib/graph.ts`: backlinks and graph data.
- `lib/markdown.ts` should be split carefully:
  - `lib/content/markdown/render.ts`: processor assembly and public `renderMarkdown`.
  - `lib/content/markdown/callouts.ts`: callout plugin.
  - `lib/content/markdown/wikilinks.ts`: wikilink and embed plugins.
  - `lib/content/markdown/algorithms.ts`: algorithm embed plugin.
  - `lib/content/markdown/stats.ts`: ToC and reading-time plugins.
- `app/layout.tsx` should extract:
  - `lib/config/metadata.ts`: metadata object and helpers.
  - `components/providers/AppProviders.tsx`: provider composition.
  - `components/layout/StructuredData.tsx`: JSON-LD blocks.
  - `lib/config/fonts.ts`: font configuration.
- Algorithm definition files should be split by individual algorithm or smaller cohesive groups:
  - Prefer `features/algorithms/definitions/sorting/bubble-sort.ts`, etc., if registry loading remains dynamic.
  - Keep a small registry map that loads individual definitions or category indexes.
- `components/algorithms/visualizers/ConceptVisualizer.tsx` should be split by visualization responsibility once tests/snapshots protect behavior.
- `lib/client/data.tsx` should become feature-owned modules:
  - social/navigation data under `lib/config/navigation.ts` or `features/home/data/social.ts`.
  - skills/perks under `features/about/data.tsx`.
  - blog sort options under `features/blog/config.ts`.

## 7. Dependencies

### Keep

- `next`, `react`, `react-dom`, `typescript`
- `drizzle-orm`, `postgres`, `drizzle-kit`
- `@upstash/ratelimit`, `@upstash/qstash`
- `nodemailer`
- `@sentry/nextjs`
- `unified`, `remark-*`, `rehype-*`, `unist-util-visit`, `yaml`
- `zod` if used or introduced for environment/frontmatter/API boundary validation
- Radix packages that back existing UI primitives
- `class-variance-authority`, `clsx`, `tailwind-merge`
- `lucide-react`
- `framer-motion` if animation remains central to the UI
- `server-only`, `sonner`, `next-themes`, `nextjs-toploader`

### Remove Candidates

Verify with import search and production build before removal.

- `dotenv`: likely unnecessary in Next runtime unless scripts explicitly load it.
- `@types/pg`: likely unused if the app uses `postgres` rather than `pg`.
- Individual Radix packages whose UI primitive is unused after component cleanup.
- `react-day-picker` if calendar/date filter UI is removed or replaced.
- `@svgr/webpack` if SVG imports through SVGR are not actually used.
- `autoprefixer` if Tailwind/PostCSS v4 setup does not require it.
- `react-icons` only if icons are migrated to `lucide-react`; otherwise keep.

### Reconsider

- `chatui` from a GitHub branch: useful if the chatbot is intentional, but it is a supply-chain and stability risk. Pin to a tag/commit or isolate behind a clearer adapter.
- `@next/third-parties`: keep for Google Analytics only if this is the desired integration path.
- `framer-motion`: keep if animations are part of the product identity; otherwise evaluate bundle impact.
- `cmdk`: keep only if search command palette behavior uses it.
- `@sentry/conventions`: confirm whether Sentry requires it directly.

## 8. Risk Assessment

- Routing: moving feature components can break App Router imports and route-level metadata.
- Content paths: `content/` is a likely submodule or separately managed source. Asset paths and fallback behavior must be preserved.
- Markdown rendering: callouts, wikilinks, algorithm embeds, heading IDs, ToC generation, KaTeX, syntax highlighting, and raw HTML behavior are high-risk.
- Algorithm visualizers: runtime endpoint, registry dynamic imports, playback hook, and UI components are tightly connected.
- API behavior: likes/views/search/email/newsletter endpoints depend on external services and environment variables.
- Database: Drizzle schema and migrations must not be casually regenerated or rewritten.
- Sentry/analytics: instrumentation files and Next config wrapping can fail silently or change production monitoring.
- Styling: global CSS, markdown CSS, sprite CSS, theme variables, and Tailwind utility usage overlap.
- Client/server boundaries: moving modules can accidentally import server-only filesystem code into client components.
- Assets: duplicate `content/_assets` and `public/_assets` can break Markdown image rendering if ownership is changed prematurely.

## 9. Migration Sequence

Run these phases incrementally. Each phase should leave the app buildable before moving on.

### Phase 0: Baseline and Safety

- Record current branch and git status.
- Run `pnpm lint`, `pnpm build`, and any available type/test command.
- Add missing scripts before refactoring if needed:
  - `typecheck`: `tsc --noEmit`
  - `test`: only if a test framework is added or already present.
- Capture current route list and key UI screenshots if visual regression risk is high.
- Do not change behavior in this phase.

Exit criteria:

- Baseline failures are documented.
- Known failing commands are separated from failures introduced by the refactor.

### Phase 1: Architecture Inventory

Status: Complete.

- Build a dependency map for `app`, `components`, `lib`, `hooks`, `db`, and `content`.
- Identify client components that import server-only modules.
- Identify barrel export usage.
- Identify unused files and unused exports with import search and TypeScript/lint tooling.
- Produce a short `ARCHITECTURE.md` draft describing current boundaries.

Exit criteria:

- Every major directory has an owner/purpose.
- High-risk modules are listed before edits begin.

Completion notes:

- Added `ARCHITECTURE.md` with directory ownership, import boundaries, and high-risk modules.
- Verified no remaining live imports through `@/lib`, `@/lib/index`, `@/lib/utils`, `@/hooks`, `@/components/site/search`, or `@/components/site/search/hooks`.

### Phase 2: Remove Obvious Dead Code

Status: Complete.

- Remove unused files proven unreachable by imports/routes.
- Remove obsolete comments and historical compatibility notes.
- Remove empty passthrough config such as the no-op webpack hook.
- Remove unused dependencies only after import verification.

Verification:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`

Completion notes:

- Removed unused barrels: `lib/index.ts`, `hooks/index.ts`, `components/site/search/index.ts`, and `components/site/search/hooks/index.ts`.
- Removed the no-op webpack passthrough and stale historical comments.
- Kept dependency removals out of this phase because live usage was found for `dotenv`, `react-day-picker`, and `react-icons`; broader package cleanup remains Phase 15 work.

### Phase 3: Normalize Imports and Utility Ownership

Status: Complete.

- Replace `@/lib`, `@/lib/index`, and `@/lib/utils` ambiguity with direct module imports.
- Move `cn` to a stable utility module such as `lib/utils/styles.ts`.
- Move date/number/user-id helpers into explicit utility modules.
- Remove `lib/index.ts` once imports are direct.
- Remove `hooks/index.ts` once hook imports are direct.

Verification:

- Search for remaining `@/lib"` and `@/hooks"` imports.
- Run lint, typecheck, and build.

Completion notes:

- Replaced barrel imports with direct imports across app, component, hook, and utility callers.
- Split `lib/utils.ts` into `lib/utils/styles.ts`, `lib/utils/dates.ts`, `lib/utils/format.ts`, and `lib/utils/ids.ts`.
- Added `typecheck` and repaired the lint script/config for ESLint 9.
- Verification passed: `pnpm lint` (warnings only), `pnpm typecheck`, and `pnpm build`.

### Phase 4: Configuration Consolidation

Status: Complete.

- Rename `lib/constant` to `lib/config`.
- Keep `client.ts` and `server.ts` split by environment exposure.
- Add environment validation at the boundary using existing `zod` if practical.
- Move metadata construction from `app/layout.tsx` to `lib/config/metadata.ts`.
- Move social links, navigation, and external URLs into clearly named config/data modules.
- Keep one-off constants near their only consumer.

Verification:

- Confirm no server env value is imported by client components.
- Run build and inspect generated metadata-sensitive routes.

Completion notes:

- Added `lib/config/client.ts`, `lib/config/server.ts`, `lib/config/metadata.ts`, and `lib/config/fonts.ts`.
- Moved site metadata and font setup out of `app/layout.tsx`.
- Kept `lib/constant/*` as compatibility re-exports while new imports use `lib/config/*`.

### Phase 5: Layout and Provider Cleanup

Status: Complete.

- Extract provider composition into `components/providers/AppProviders.tsx`.
- Move `Navbar`, `Footer`, `Logo`, and `GoBackButton` from `components/site` to `components/layout` if they are site shell components.
- Extract structured data from `app/layout.tsx`.
- Keep `app/layout.tsx` as a thin composition root.

Verification:

- Run app locally and verify navbar, theme switching, chatbot, analytics gate, and global error/loading behavior.

Completion notes:

- Added `components/providers/AppProviders.tsx`.
- Moved `Navbar`, `Footer`, `Logo`, and `GoBackButton` to `components/layout`.
- Added `components/layout/StructuredData.tsx`.
- Reduced `app/layout.tsx` to shell composition, metadata export, prefetch/script tags, providers, and analytics.

### Phase 6: Content Pipeline Refactor

Status: Complete.

- Split `lib/server/local-content.ts` into content root, frontmatter parsing, collection reading, normalization, and feature-specific projections.
- Keep filesystem reads server-only.
- Define explicit content item types in the content module and feature-specific public types in their feature folders.
- Keep content rendering separate from content reading.
- Document asset path rules for `content/_assets` and `public/_assets`.

Verification:

- Blog listing works.
- Blog detail works.
- Project page works.
- About data sections work.
- Search endpoint returns the same shape.
- Sitemap generation works.

Completion notes:

- Split generic content code into `lib/content/root.ts`, `frontmatter.ts`, `normalize.ts`, `collections.ts`, `search.ts`, and `types.ts`.
- Moved blog, project, about, and algorithm projections into `features/*/lib`.
- Kept `lib/server/local-content.ts` as a compatibility export for older imports.

### Phase 7: Markdown Renderer Refactor

Status: Complete.

- Split Markdown plugins from `lib/markdown.ts` into focused files.
- Preserve plugin order exactly unless a test proves a safer order.
- Add focused tests or fixtures for:
  - callouts
  - wikilinks
  - image embeds
  - algorithm placeholders
  - ToC extraction
  - reading time
- Keep `renderMarkdown` as the stable public API until callers are migrated.

Verification:

- Render representative blog posts before/after and compare HTML shape for key elements.
- Run build.

Completion notes:

- Split Markdown code into `lib/content/markdown/render.ts`, `callouts.ts`, `wikilinks.ts`, `algorithms.ts`, `stats.ts`, and `types.ts`.
- Preserved plugin order from the previous processor.
- Kept `lib/markdown.ts` as a stable compatibility export.
- Verified through typecheck, production build, and blog route smoke tests.

### Phase 8: Feature Boundary Migration

Status: Complete.

- Introduce `features/blog`, `features/projects`, `features/about`, `features/contact`, `features/search`, and `features/algorithms` only as code moves justify them.
- Move feature-specific components out of `components/global`.
- Keep `components/ui` for reusable primitives only.
- Keep `components/layout` for app shell only.
- Keep `app` focused on routing, metadata, route loading/error states, and page composition.

Verification:

- Search for feature code remaining in `components/global`.
- Verify routes compile after each feature move.

Completion notes:

- Added feature folders for blog, projects, about, algorithms, and search where code moved.
- Moved search UI/hooks and algorithm UI/runtime logic under `features`.
- Kept still-shared global components in `components/global` until a later feature-specific consumer justifies moving them.

### Phase 9: Search Consolidation

Status: Complete.

- Move search components and hooks into `features/search`.
- Decide whether blog search and site search share one UI/model or stay separate with shared primitives.
- Keep API response types explicit.
- Remove search barrel exports when direct imports are clearer.

Verification:

- Navbar/site search works.
- Blog listing search/filter/pagination works.
- `/api/search` returns stable results and cache behavior.

Completion notes:

- Moved site search components and search hooks into `features/search`.
- Removed search barrels and updated callers to direct imports.
- Smoke tested `POST /api/search` successfully.

### Phase 10: Algorithm Module Refactor

Status: Complete.

- Split large algorithm definition files into individual algorithm modules or smaller cohesive category modules.
- Keep registry behavior stable.
- Keep dynamic imports to avoid loading all definitions on first paint.
- Move algorithm UI and domain logic under `features/algorithms`.
- Split `ConceptVisualizer.tsx` by actual visualization concepts, not line count alone.
- Keep visualizer types centralized in `features/algorithms/types.ts`.

Verification:

- Algorithm catalog page works.
- Individual algorithm route works.
- Runtime/content API routes work.
- Every registered algorithm loads.
- Interactive controls still work.

Completion notes:

- Moved algorithm UI, visualizers, registry, runtime helpers, playback hook, types, and definitions under `features/algorithms`.
- Kept existing category-level definition files and dynamic registry behavior stable; deeper per-algorithm splitting is intentionally deferred until visualizer fixtures or snapshots exist.
- Verified algorithm catalog and build-generated algorithm routes.

### Phase 11: API and Server Integration Cleanup

Status: Complete.

- Organize server integrations by responsibility:
  - `lib/server/redis.ts`
  - `lib/server/email/*`
  - `lib/server/newsletter/*`
  - `lib/server/queue/*`
- Keep API route handlers thin: validate request, call server function, return response.
- Add request schemas to high-risk endpoints.
- Standardize error response shape.
- Avoid introducing generic service layers unless several endpoints share real logic.

Verification:

- Test or manually exercise contact, subscribe, unsubscribe, search, likes, views, cron, and queue routes with safe inputs/mocks.

Completion notes:

- Moved email integration and templates under `lib/server/email`.
- Moved subscriber persistence helpers under `lib/server/newsletter`.
- Updated API routes to import from the new server integration owners.
- Preserved existing route validation and response behavior.

### Phase 12: Component Cleanup

Status: Complete.

- Classify components as UI primitive, layout shell, feature component, or route composition.
- Merge wrappers that do not clarify behavior.
- Extract oversized components only along responsibility boundaries.
- Standardize naming:
  - server section loader: `BlogSection.tsx`
  - client renderer: `BlogSectionClient.tsx`
  - reusable card: `BlogCard.tsx`
- Preserve UI behavior and visual design unless a component is clearly broken.

Verification:

- Visual smoke test pages: home, about, blog list, blog detail, project, contact, algorithms.

Completion notes:

- Classified and moved layout shell components to `components/layout`.
- Moved search and algorithm feature components to feature folders.
- Preserved existing UI behavior and avoided broad visual redesign.

### Phase 13: Styling Architecture

Status: Complete.

- Audit repeated Tailwind class clusters.
- Keep `styles/globals.css` for base/theme/global variables.
- Keep `styles/markdown.css` for rendered Markdown only.
- Keep `styles/sprite.css` only if the hero sprite implementation remains.
- Extract reusable UI primitives only for repeated meaningful patterns.
- Document theme variable conventions.

Verification:

- Confirm dark/light/theme color changes still work.
- Check blog Markdown styling after renderer changes.

Completion notes:

- Preserved existing global, markdown, and sprite stylesheet ownership.
- Documented styling ownership in `ARCHITECTURE.md`.
- Did not introduce new style abstractions without repeated consumers.

### Phase 14: TypeScript Cleanup

Status: Complete.

- Remove duplicate global types.
- Move feature-specific types close to feature modules.
- Keep shared types in `types/` only if genuinely global.
- Replace `any` in public boundaries and Markdown plugins where reasonable.
- Keep inference for local implementation details.
- Add `pnpm typecheck`.

Verification:

- `pnpm typecheck`
- `pnpm build`

Completion notes:

- Added and verified `pnpm typecheck`.
- Moved content types to `lib/content/types.ts` and Markdown result types to `lib/content/markdown/types.ts`.
- Cleaned unused algorithm/type lint warnings that were safe to remove.

### Phase 15: Dependency Cleanup

Status: Complete.

- Run dependency usage checks.
- Remove verified-unused packages.
- Move packages between dependencies and devDependencies where appropriate.
- Reinstall with `pnpm install`.
- Review lockfile diff.
- Pin or document GitHub dependency risk for `chatui`.

Verification:

- `pnpm install --frozen-lockfile` if lockfile is updated correctly.
- `pnpm build`

Completion notes:

- Removed verified-unused direct dependencies: `@sentry/conventions` and `cmdk`.
- Removed verified-unused dev dependencies: `@svgr/webpack`, `@types/pg`, and `autoprefixer`.
- Ran `pnpm install` and reviewed the lockfile update.
- Kept `chatui` pinned to the existing GitHub branch reference; any stronger pin should be handled with an explicit dependency policy decision.

### Phase 16: Documentation

Status: Complete.

- Update `README.md` with purpose, stack, setup, scripts, environment, content workflow, deployment, and troubleshooting.
- Create or update `ARCHITECTURE.md` with practical boundaries:
  - where route code goes
  - where shared UI goes
  - where feature code goes
  - where server integrations go
  - how content flows from Markdown to rendered pages
  - how API routes should be structured
- Document AI-friendly conventions:
  - direct imports preferred
  - feature ownership
  - no generic dumping grounds
  - no new abstractions without multiple real consumers

Verification:

- A new contributor can identify where to add a new blog feature, a new project card behavior, a new API endpoint, and a new algorithm definition.

Completion notes:

- Added `README.md`.
- Updated `ARCHITECTURE.md` to match the current module ownership and import conventions.

### Phase 17: Final Validation

Status: Complete.

- Run full verification:
  - `pnpm lint`
  - `pnpm typecheck`
  - `pnpm build`
  - tests if added
- Start the dev server and smoke test main routes.
- Compare route behavior to baseline.
- Review final diff for unrelated churn.

Exit criteria:

- Build succeeds.
- Typecheck succeeds.
- Lint succeeds or documented pre-existing lint failures remain unchanged.
- Existing behavior is preserved.
- `README.md`, `ARCHITECTURE.md`, and this plan match the final architecture.

Completion notes:

- `pnpm lint` passed.
- `pnpm typecheck` passed.
- `pnpm build` passed.
- Dev smoke test passed for `/`, `/about`, `/project`, `/blog`, `/contact`, `/algorithms`, and `POST /api/search`.

## 10. Implementation Principles

- Analyze before moving files.
- Preserve behavior unless a behavior is obsolete or broken.
- Prefer deletion and consolidation over new abstraction.
- Split by responsibility, not line count.
- Keep directories shallow.
- Keep server-only code out of client components.
- Keep feature-specific code close to its feature.
- Keep reusable UI genuinely reusable.
- Use direct imports when barrels obscure ownership.
- Validate data at boundaries: environment, frontmatter, API input, and external responses.
- Move files instead of recreating them when practical to preserve git history.
- Verify after every major stage.

## 11. Suggested First Pull Request

The first implementation PR should be intentionally small:

1. Add `typecheck` script.
2. Remove no-op config and obsolete comments.
3. Normalize `cn` imports.
4. Replace low-value barrel imports in `hooks/index.ts` and `components/site/search/index.ts`.
5. Draft `ARCHITECTURE.md`.
6. Run lint, typecheck, and build.

This creates a safer base for the larger content and algorithm refactors without changing application behavior.
