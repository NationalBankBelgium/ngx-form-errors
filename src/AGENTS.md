# AGENTS.md

## Scope

- This file applies to `src/`.

## What Lives Here

- The published Angular library source, including the public barrels, directives, interfaces, and services.

## Working Rules

- Keep the public barrels such as `src/ngx-form-errors.ts`, `src/directives.ts`, and `src/services.ts` aligned with the intended public API.
- Keep directive behavior and message-service behavior coherent instead of duplicating validation/message logic in multiple places.
- When changing exports or contracts, update docs and validate at least one demo consumer.

## Read Before Editing

- [directives/AGENTS.md](directives/AGENTS.md)
- [services/AGENTS.md](services/AGENTS.md)
