# Testing: website_template

## Status

**No testing framework configured.** This is a starter template with no test files or testing infrastructure.

## Current State

- No test files exist in the codebase
- No testing framework installed (no Jest, Vitest, Cypress, Playwright, etc.)
- No test scripts in `package.json`
- No test configuration files

## What Would Need Testing

### Key Areas

| Area | Priority | Notes |
|------|----------|-------|
| Form validation (react-hook-form) | High | Complex validation logic |
| Theme switching (ThemeChanger) | High | State + localStorage |
| PopupWidget async behavior | Medium | Fetch calls |
| Component rendering | Medium | Basic smoke tests |

## Recommended Setup (When Needed)

### Framework
**Vitest** — compatible with Vite/Next.js, fast, minimal config

### Test Structure
Co-locate tests with components:
```
src/
  components/
    ThemeChanger/
      ThemeChanger.tsx
      ThemeChanger.test.tsx
```

### Mocking Needs
- `fetch` — for PopupWidget
- `localStorage` — for theme persistence
- Next.js router — for navigation components

---
*Mapped: 2026-02-23*
*Status: No tests exist — greenfield testing setup required*
