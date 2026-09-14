# Excalidraw Thumbnail Workflow Plan

## What Was Tested

- `content/_assets/thumbnails/lc.excalidraw.svg` does not exist.
- `public/_assets/thumbnails/lc.excalidraw.svg` does not exist.
- `public/_assets/thumbnails/lc.excalidraw` does not exist.
- The current site can resolve frontmatter like `thumbnail: _assets/thumbnails/lc.png` because `lib/content/normalize.ts` maps `_assets/...` to `/_assets/...`.
- Existing generated thumbnails are already present in `public/_assets/thumbnails`.
- The only files present in `content/_assets/thumbnails` but missing from `public/_assets/thumbnails` are the editable Excalidraw bases: `gfg.excalidraw` and `lc.excalidraw`.

Conclusion: appending `.svg` to an Excalidraw filename is not a website-safe conversion by itself. It may work in an editor integration that performs virtual export, but this Next.js site needs an actual generated file under `public`.

## Recommended Contract

- Source of truth: `content/_assets/thumbnails/*.excalidraw`.
- Served assets: `public/_assets/thumbnails/*.{webp,png,svg}`.
- Blog frontmatter: `thumbnail: _assets/thumbnails/<generated-file>`.

This keeps all editable thumbnail bases inside the content repository while preserving the current public URL contract used by the site.

## Faster Conversion Path

Implement a repo-owned conversion command instead of ad hoc manual exports:

1. Add a script such as `scripts/export-excalidraw-thumbnails.mjs`.
2. Scan `content/_assets/thumbnails/*.excalidraw`.
3. For each source, compute the target path in `public/_assets/thumbnails`.
4. Skip conversion when the target is newer than the source.
5. Generate `.webp` by default, or `.svg` when explicitly requested.
6. Add package scripts:
   - `thumbs:check` to list missing or stale generated assets.
   - `thumbs:build` to regenerate changed assets.

The important speed gain is incremental conversion: editing one base thumbnail should regenerate one output, not every blog thumbnail.

## Direct Excalidraw Editing

Direct changes are feasible because `.excalidraw` files are JSON. Simple edits such as changing text, colors, or dimensions can be scripted safely after parsing JSON. Structural drawing edits are still better done in an Excalidraw editor because element coordinates, grouping, seeds, and font metrics are easy to damage by hand.

## Open Decision

Choose the renderer:

- Best authoring loop: use a pinned local converter dependency and cache outputs.
- Most reliable visual parity: use the Excalidraw renderer in a headless browser or official export API path.
- Simplest manual fallback: export from editor to `public/_assets/thumbnails` and keep the `.excalidraw` base beside it in `content`.
