# Phase-Wise Content Cleanup & GitHub Actions Deployment Implementation Plan

This plan details a phase-wise roadmap to clean up stray Git artifacts from the `content/` directory, set up the dedicated `portfolio-content` repository integration via Git Submodules, and replace ArgoCD with **GitHub Actions workflows** for automated content synchronization, build validation, and continuous deployment.

## User Review Required

> [!IMPORTANT]
> **Git Metadata Cleanup**: The items `hooks/`, `info/`, `objects/`, `refs/`, `config`, `description`, and `.git/` currently inside `content/` are remnants of an accidental git initialization. Phase 1 removes them safely without deleting any markdown articles or media assets.
> 
> **GitHub Actions CI/CD Pipeline**: ArgoCD is replaced with GitHub Actions. Content changes pushed to the `portfolio-content` repository trigger a Repository Dispatch event to auto-update the Git Submodule, run `npm run build` verification, and deploy the application automatically.

---

## Phase 1: Content Directory Cleanup

In this phase, we clean up the local `content/` workspace by removing stray git metadata while preserving all valid portfolio markdown files and media assets.

### Proposed Changes

#### [DELETE] Stray Git Metadata Directories
- Delete [hooks](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/hooks)
- Delete [info](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/info)
- Delete [objects](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/objects)
- Delete [refs](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/refs)
- Delete `.git` folder inside `content/`

#### [DELETE] Stray Git Metadata Files
- Delete [config](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/config)
- Delete [description](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/description)

#### [PRESERVED] Core Content Folders & Files
- Keep [blog/](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/blog)
- Keep [projects/](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/projects)
- Keep [education/](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/education)
- Keep [experience/](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/experience)
- Keep [testimonials/](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/testimonials)
- Keep [_assets/](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/content/_assets)
- Keep `*.base` Obsidian database view files

---

## Phase 2: Content Repository & Submodule Integration

In this phase, we establish the clean repository structure for `portfolio-content` and configure the main repository to handle content updates cleanly.

### Proposed Changes

#### [NEW] [.gitmodules](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/.gitmodules)
- Configure `content` as a Git Submodule pointing to `https://github.com/Anujjoshi3105/portfolio-content.git`.

#### [MODIFY] [local-content.ts](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/lib/server/local-content.ts)
- Ensure fallback resolution handles submodule and standalone content directories smoothly.

---

## Phase 3: GitHub Actions CI/CD Infrastructure (Replacing ArgoCD)

In this phase, we replace ArgoCD manifests with GitHub Actions workflows to handle automated submodule syncing, testing, building, and deployment.

### Proposed Changes

#### [NEW] [deploy.yml](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/.github/workflows/deploy.yml)
- Create main GitHub Actions workflow triggered on push to `main` branch or repository dispatch.
- Key jobs:
  1. **Checkout & Submodule Init**: Checkout workspace recursively including the `content` Git Submodule.
  2. **Build & Verify**: Install dependencies, run `npm run build` and linting to ensure no missing content or syntax errors.
  3. **Deploy**: Continuous deployment step targeting host environment.

#### [NEW] [sync-submodule.yml](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/.github/workflows/sync-submodule.yml)
- Create dedicated GitHub Actions workflow to auto-update the `content` Git Submodule on dispatch from `portfolio-content` commits or on schedule.
- Automatically commits updated submodule pointer to `main` branch.

---

## Phase 4: CI/CD Workflow & Verification

In this phase, we connect the workflows and verify full end-to-end automation.

### Proposed Changes

#### [MODIFY] [sync-content.yml](file:///d:/Anuj%20Joshi/Portfolio%20Data/portfoli-x/.github/workflows/sync-content.yml)
- Update workflow triggers and steps to orchestrate automatic submodule synchronization and deployment triggers.

---

## Verification Plan

### Phase 1 Verification
- Check `content/` folder to confirm only valid content folders (`blog`, `projects`, `education`, `experience`, `testimonials`, `_assets`) remain.
- Run `npm run build` locally to verify `local-content.ts` parses all content without errors.

### Phase 2 & 3 Verification
- Validate `.github/workflows/deploy.yml` and `.github/workflows/sync-submodule.yml` syntax.
- Test submodule checkout (`git submodule update --init --recursive`) and `npm run build` locally.
- Test manual trigger of GitHub Actions workflows to confirm build and deploy completion.
