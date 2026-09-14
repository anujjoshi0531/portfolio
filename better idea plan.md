# Better Idea Plan: Blog Playlists

Date: 2026-09-14
Project: `portfoli-x`
Decision: playlists belong to the blog only.

## 1. Product Direction

The blog should not be only a reverse-chronological list of isolated posts. It should also support curated reading paths made from existing blog posts.

The important rule is:

```text
One blog post, many blog playlists.
```

Playlists should improve discovery for contest writeups, DSA posts, and themed problem-solving notes without duplicating Markdown content.

## 2. Scope

In scope:

- blog-only playlists
- YAML playlist manifests
- `/blog/playlists`
- `/blog/playlists/[slug]`
- a `Part of` block on blog detail pages
- playlist-aware previous and next links

Out of scope for now:

- algorithm visualizer pages
- top-level `/playlists` routes
- learning paths
- collections
- graph visualization
- login or synced progress
- database-backed playlist editing

## 3. Source of Truth

Blog posts remain in:

```text
content/blog/
```

Playlist ordering lives in:

```text
data/blog-playlists/
```

This keeps ordering out of post frontmatter, which makes playlists easier to reorder as they grow.

## 4. Playlist Manifest Shape

Example:

```yaml
id: dynamic-programming-practice
title: Dynamic Programming Practice
description: Blog posts that build dynamic programming intuition through solved problems.
summary: Start with divisibility and range-value problems, then move into contest-style optimization.
sections:
  - title: Core Problems
    items:
      - greatest-sum-divisible-by-three
      - sum-of-subarray-minimums
      - maximum-total-value-k-subarrays
  - title: Adjacent Patterns
    items:
      - subarrays-with-first-element-minimum
```

Each item must be a slug from `content/blog`.

## 5. Routes

Add:

```text
/blog/playlists
/blog/playlists/[slug]
```

Do not add:

```text
/playlists
/learn
/collections
```

## 6. Blog Detail Experience

When a blog post appears in one or more playlists, show a compact `Part of` block before the article body.

It should include:

- playlist chips
- previous post in the active playlist
- next post in the active playlist
- link back to the full playlist

Playlist context is passed with:

```text
/blog/post-slug?from=playlist-id
```

## 7. Implementation Shape

Feature code should live in:

```text
features/blog/playlists/
```

Recommended files:

```text
features/blog/playlists/types.ts
features/blog/playlists/lib/playlists.ts
features/blog/playlists/components/BlogPlaylistContexts.tsx
features/blog/playlists/components/BlogPlaylistSummaryCard.tsx
```

The playlist reader should:

- read YAML files from `data/blog-playlists`
- validate manifest shape
- resolve slugs against `getBlogs()`
- throw clear development errors for missing slugs
- expose reverse lookup for blog detail pages

## 8. First Playlists

Start with:

```text
data/blog-playlists/dynamic-programming-practice.yaml
data/blog-playlists/contest-writeups.yaml
```

These should only reference existing blog slugs.

## 9. Success Criteria

The feature is working when:

- `/blog/playlists` lists all blog playlists
- `/blog/playlists/[slug]` renders ordered sections
- playlist items link to canonical blog posts
- blog posts show `Part of` when included in playlists
- previous and next links respect the active playlist
- algorithm pages are untouched by playlist behavior

## 10. Later Enhancements

Good follow-ups after the MVP:

- add a featured playlist section to the blog page
- add estimated reading time per playlist
- add local progress tracking
- add playlist filters by tag/category
- split long contest posts into standalone blog posts only when the problem deserves it
