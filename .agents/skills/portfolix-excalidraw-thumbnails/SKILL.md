---
name: portfolix-excalidraw-thumbnails
description: Manage Portfolio X blog thumbnails whose editable sources are Excalidraw files under content/_assets/thumbnails and whose generated web assets are served from public/_assets/thumbnails.
---

# Portfolio X Excalidraw Thumbnails

Use this skill when creating, editing, converting, or wiring blog thumbnails from Excalidraw sources in this repository.

## Storage Contract

- Keep editable base files in `content/_assets/thumbnails/*.excalidraw`.
- Export browser-ready images into `content/_assets/thumbnails/`, then run `pnpm assets:sync` to generate `public/_assets/thumbnails/`.
- Reference thumbnails in blog frontmatter as `_assets/thumbnails/<name>.<ext>`. The content loader normalizes this to `/_assets/thumbnails/<name>.<ext>`.
- Do not reference `.excalidraw` files directly from article frontmatter. They are source files, not reliable browser assets.
- Content and application files share this repository. Run `git status --short` before and after edits.

## Conversion Rule

The filename trick `drawing.excalidraw` -> `drawing.excalidraw.svg` is an editor/plugin convenience unless an actual `.svg` file exists. For the website, generate a real static asset and commit it into `content/_assets/thumbnails` and run `pnpm assets:sync`.

Preferred generated format:

- Use `.webp` for card and Open Graph thumbnails when raster output is acceptable.
- Use `.svg` only when the rendered result must remain vector-sharp and the SVG is generated as a real file.

## Fast Workflow

1. Edit the `.excalidraw` source in `content/_assets/thumbnails`.
2. Export changed drawings into `content/_assets/thumbnails`, then run `pnpm assets:sync`.
3. Update blog frontmatter to the generated asset path, not the source path.
4. Verify the public asset exists and the article thumbnail path resolves.

Avoid slow per-run `npx` conversion in the authoring loop. Prefer a pinned local script or dependency with incremental checks based on source/output modified time.

## Checks

- Compare source and generated assets:
  `Compare-Object (Get-ChildItem content\_assets\thumbnails -File | % Name) (Get-ChildItem public\_assets\thumbnails -File | % Name)`
- Check article references:
  `rg -n "thumbnail: _assets/thumbnails" content/blog`
- For platform changes, run the relevant `pnpm` checks from `package.json`.
