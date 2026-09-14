---
name: portfolio-blog
description: Draft, edit, review, or implement Anuj's portfolio blog content and platform features, including Leetcode, contests, LLD, data engineering, tutorials, and article rendering.
---

# Portfolio Blog

Use this skill for work in this repository's blog system: drafting articles, improving existing posts, reviewing technical writing, and changing the blog platform that renders or connects articles.

## Project Shape

- Treat the product as a technical blog and learning library with portfolio pages alongside it.
- Keep article work and platform work scoped to the user's request. Writing a post does not imply building CMS features, visualizers, or a redesign.
- Read the source for current behavior. Historical plans can explain intent, but `ARCHITECTURE.md`, `lib/content/*`, `features/blog/*`, and the actual renderer define what works now.
- `content` is a separate repository/submodule. When touching published content, check both the main repository status and `content` repository status.

## Content Rules

- Use `docs/drafts/<descriptive-kebab-slug>.md` for drafts unless the user asks to publish into the collection.
- Published site articles live as flat Markdown files in `content/blog/<slug>.md`. The loader does not recurse into topic folders or read `.mdx`.
- There is no draft or scheduled-publication filter. `draft: true`, status fields, and future dates do not hide top-level files under `content/blog`.
- Slugs default to filenames; frontmatter `slug` overrides the URL. Preserve existing URLs unless the user asks for a rename and references are handled.
- Use body headings from `##` downward because the page supplies the title. Do not add a manual index; the page already renders one when enough headings are present.

Suggested frontmatter:

```yaml
---
title: "Descriptive article title"
description: "The specific question answered or outcome taught."
tags:
  - Data Engineering
category: Blog
---
```

Add `published` or `updated` only when the date is known from the task or an actual source. Preserve existing dates. Do not invent engagement counts, accepted status, ranks, solve times, benchmarks, or production outcomes.

## Writing Guidance

- For Leetcode, GFG, contests, and algorithm posts, verify the problem, constraints, platform details, and code against supplied material or primary sources. Paraphrase statements, explain the invariant or recurrence, include complexity, and say clearly when validation is local rather than judge acceptance.
- For contest posts, distinguish a personal recap from an editorial or upsolving journal. Do not invent rank, solve order, emotions, or timing.
- For LLD articles, make object responsibilities, contracts, state transitions, and tradeoffs explicit. Include only concurrency, persistence, or distributed behavior that the design actually needs.
- For data engineering posts, state schema, grain, assumptions, and expected output. Use small reproducible fixtures for SQL, modeling, orchestration, streaming, or reliability examples. Verify dialect and version-sensitive behavior.
- For general tutorials and essays, lead with the concrete question or lesson, connect examples to the reader's next action, and avoid stuffing the post into a DSA structure.

## Rendering And Links

- Markdown supports GFM tables, language-tagged code fences, math, callouts, wikilinks, and algorithm embeds. It is not arbitrary MDX.
- Mermaid is not currently rendered as a diagram; use a table, text diagram, image, or implement Mermaid support as a platform change.
- Resolve real slugs before adding `[[slug]]` or `[[slug|label]]`. Wikilinks target `/blog/`; use normal links for `/algorithms/<slug>`.
- `![[...]]` resolves assets, not note transclusion. Prefer ordinary Markdown images with alt text and verified public paths.
- Before adding an algorithm embed, check `features/algorithms/lib/registry.ts` and confirm the visualizer matches the explanation.

Supported simple embed:

~~~markdown
```algo:binary-search
Watch the search interval shrink after each comparison.
```
~~~

## Platform Changes

- Blog playlists live in `content/playlists/*.md`, with `id`, `title`, `description`, optional `summary`, and ordered `sections` (`title` and article-slug `items`) in frontmatter. Edit nested sections in the note source. `content/playlists.base` provides Obsidian views; the website reads the Markdown records, not the Base configuration. Keep playlist IDs and section/item order stable unless intentionally changing navigation.

- For renderer, navigation, search, backlinks, playlists, metadata, sitemap, feed, or newsletter work, inspect the exact modules involved before editing.
- Preserve the authoring contract when behavior changes. If visibility, metadata, links, or embeds change, update this skill or `AGENTS.md` so future agents do not rely on stale rules.
- Run relevant checks from `package.json` for application changes. Use focused tests or previews for changed behavior; documentation-only edits only need Markdown/link validation.

## Handoff

Report the changed artifact paths, whether work is draft or published content, what was verified, and any factual gaps. Do not publish, push, deploy, or send newsletters unless the user explicitly asked for that action.
