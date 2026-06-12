# AGENTS.md

## Scope

- This file applies to the whole `ngx-form-errors` repository.
- If a subfolder contains its own `AGENTS.md`, follow the closer file for that subtree.

## Repository Purpose

- `ngx-form-errors` is an Angular library for centralized reactive-form validation messages.
- The reusable library lives under `src/`, docs live under `docs/`, and compatibility/demo consumers live under `demo-app/`.

## Working Rules

- Do not edit generated outputs such as `dist/`, `reports/`, or `node_modules/` by hand.
- Keep the library public surface small and deliberate; consumer demos should prove the API rather than contain one-off workarounds.
- The `demo-app/` folders are compatibility consumers. If a library change affects them, validate the relevant demo too.
- Existing history uses conventional commits such as `fix(build): ...`, `feat(demo): ...`, and `chore(release): ...`.

## Validation

- `npm run build`
- `npm run lint`
- `npm run test:ci`

## Folder Map

- Read [src/AGENTS.md](src/AGENTS.md) before changing the published library.
- Read [docs/AGENTS.md](docs/AGENTS.md) before changing generated/manual docs.
- Read [demo-app/AGENTS.md](demo-app/AGENTS.md) before changing compatibility demos.
