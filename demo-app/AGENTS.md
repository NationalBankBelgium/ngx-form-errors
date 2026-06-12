# AGENTS.md

## Scope

- This file applies to `demo-app/`.

## What Lives Here

- Versioned consumer apps used to validate the library against specific Angular generations.

## Working Rules

- Treat these apps as downstream consumers, not as places to hide library fixes.
- The folder names are compatibility markers. If you add a new Angular support line, prefer creating a clearly named new demo rather than silently repurposing an older one.
- When the library public API changes, validate the affected demo(s).
