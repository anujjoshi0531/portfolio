---
name: portfolio-excalidraw-thumbnails
description: Create, edit, validate, and wire Portfolio blog thumbnails whose editable sources are Excalidraw files under content/_assets/thumbnails and whose generated web assets are served from public/_assets/thumbnails.
---

# Portfolio Excalidraw Thumbnails

Use this skill when creating, editing, converting, or wiring blog thumbnails from Excalidraw sources in this repository.

## Diagram quality

- Make the diagram communicate a visual argument, not merely display labels. The structure should still suggest the relationships or flow if the text is removed.
- Choose the depth first: use simple abstract shapes for conceptual thumbnails and concrete examples for technical systems, workflows, or tutorials.
- For technical diagrams, research and use real event names, API methods, formats, and data examples when those details are part of the article. Prefer evidence artifacts such as small code, JSON, input/output, or event-sequence examples over generic placeholder boxes.
- Use shapes according to meaning: ellipses for origins/results, rectangles for processes, diamonds for decisions, and lines plus text for timelines and hierarchies. Default to free-floating text when a container adds no meaning.
- Make the eye flow obvious, use arrows for relationships, vary visual patterns where concepts differ, and preserve whitespace around the focal point. Prefer clean modern styling (`roughness: 0`, `opacity: 100`) unless the article calls for a hand-drawn look.
- For a large or comprehensive drawing, build one logical section at a time with descriptive IDs and collision-free IDs/seeds, then review cross-section bindings before rendering.

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
5. Render the Excalidraw source to PNG and inspect the image. Fix clipping, overlap, unreadable text, incorrect arrow landing, cramped spacing, or imbalance; re-render until the result is presentation-ready.

Avoid slow per-run `npx` conversion in the authoring loop. Prefer a pinned local script or dependency with incremental checks based on source/output modified time.

## Checks

- Compare source and generated assets:
  `Compare-Object (Get-ChildItem content\_assets\thumbnails -File | % Name) (Get-ChildItem public\_assets\thumbnails -File | % Name)`
- Check article references:
  `rg -n "thumbnail: _assets/thumbnails" content/blog`
- For platform changes, run the relevant `pnpm` checks from `package.json`.

## Render validation

Use the repository's available Excalidraw renderer or the renderer supplied with the diagram skill. If no renderer is configured, identify that limitation rather than treating JSON inspection as visual validation. For every rendered thumbnail, check that text is readable at card/Open Graph size, no elements overlap unintentionally, arrows connect to the intended targets, and the composition is balanced.

Keep the source JSON valid and ensure text fields contain only readable words (`text` and `originalText` should agree). Do not write scripts that obscure the final drawing when a small hand-authored edit is clearer.
