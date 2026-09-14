# Working On Portfolio

This project is Anuj's technical blog and learning library, with portfolio pages alongside it. Support Leetcode, contests, low-level design, data engineering, and broader technical or personal writing without forcing every post into one format.

## Reusable Project Skill

Use [.agents/skills/portfolio-blog/SKILL.md](.agents/skills/portfolio-blog/SKILL.md) for blog authoring, article review, and blog-platform changes in this repository.

Example requests:

- `Use $portfolio-blog to draft a Leetcode solution article from this code.`
- `Use $portfolio-blog to write a data engineering tutorial about late-arriving events.`
- `Use $portfolio-blog to improve backlinks or article rendering.`

## Repository Rules

- Read `ARCHITECTURE.md` before application changes; current source takes precedence over historical plans in `docs/`, `plan.md`, and `better idea plan.md`.
- Content lives in this repository as ordinary tracked files. Check git status before edits. Maintain article assets in content/_assets/; pnpm assets:sync generates ignored public/_assets/ files.
- Draft articles belong in `docs/drafts/` by default. The current blog loader exposes all top-level `.md` files under `content/blog`; `draft: true`, status flags, and future dates do not hide them.
- Keep work within the requested scope. Authoring a post does not require implementing a CMS, adding a visualizer, or redesigning the site.
- Use the package manager and scripts from `package.json` (currently pnpm). For application changes, run relevant checks and report failures accurately. Documentation-only skill edits do not require an application build.
- Local writing/editing is distinct from deployment, Git pushes, newsletter sends, and changes to live data. Perform external actions only within the user's authorization.
