---
phase: 04-seo-and-meta
plan: 02
subsystem: ui
tags: [nextjs, favicon, pwa, next-og, image-response, seo]

# Dependency graph
requires:
  - phase: 01-foundation
    provides: Next.js App Router project structure with src/app/ directory
provides:
  - Next.js file-based favicon (icon.tsx, 32x32) via ImageResponse
  - Next.js file-based Apple touch icon (apple-icon.tsx, 180x180) via ImageResponse
affects: [03-content-sections, 04-seo-and-meta]

# Tech tracking
tech-stack:
  added: []
  patterns: ["Next.js file-based icon convention using ImageResponse from next/og"]

key-files:
  created:
    - src/app/icon.tsx
    - src/app/apple-icon.tsx
  modified: []

key-decisions:
  - "Used absolute URL https://namnam.no/img/NamNamPizza&Grill.png in ImageResponse — Satori fetches images via URL, not local filesystem"
  - "No fallback placeholder needed — production URL is confirmed available"

patterns-established:
  - "Next.js file-based icons: export size, contentType, and default function returning ImageResponse"

requirements-completed: [SEO-04]

# Metrics
duration: 1min
completed: 2026-02-24
---

# Phase 4 Plan 02: Favicon and Apple Touch Icon Summary

**Next.js file-based favicon (32x32) and Apple touch icon (180x180) generated via ImageResponse from NamNamPizza&Grill.png absolute URL**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-24T18:29:22Z
- **Completed:** 2026-02-24T18:30:16Z
- **Tasks:** 1
- **Files modified:** 2

## Accomplishments
- Created `src/app/icon.tsx` — Next.js file convention, renders NamNamPizza&Grill.png at 32x32 for browser tab favicon
- Created `src/app/apple-icon.tsx` — Next.js file convention, renders NamNamPizza&Grill.png at 180x180 for iPhone home screen icon
- TypeScript type check passes with zero errors on both new files
- Next.js will auto-generate `<link rel="icon">` and `<link rel="apple-touch-icon">` tags from these files

## Task Commits

Each task was committed atomically:

1. **Task 1: Create icon.tsx and apple-icon.tsx using ImageResponse** - `c594104` (feat)

**Plan metadata:** TBD (docs: complete plan)

## Files Created/Modified
- `src/app/icon.tsx` — 32x32 favicon via ImageResponse; exports size, contentType, default Icon()
- `src/app/apple-icon.tsx` — 180x180 Apple touch icon via ImageResponse; exports size, contentType, default AppleIcon()

## Decisions Made
- Used absolute URL `https://namnam.no/img/NamNamPizza&Grill.png` as image source in ImageResponse — Satori (the renderer used by ImageResponse) fetches images via HTTP URL and cannot resolve local filesystem paths at build time.
- No fallback colored square placeholder was needed since the production domain is confirmed.

## Deviations from Plan

None — plan executed exactly as written.

**Note:** `npm run build` fails with a pre-existing error (`TypeError: generate is not a function` in Next.js `generate-build-id.js`) that exists before our changes. This is a Next.js 14.2.3 environment issue unrelated to the icon files. TypeScript type check (`npx tsc --noEmit`) passes cleanly.

## Issues Encountered
- `npm run build` produces a pre-existing `TypeError: generate is not a function` in Next.js internals — confirmed pre-existing by verifying the error occurs on the commit before our changes (git stash test). The error is in `next/dist/build/generate-build-id.js` and is unrelated to the icon files. TypeScript check passes with zero errors.

## User Setup Required
None — no external service configuration required.

## Next Phase Readiness
- Favicon and Apple touch icon are in place for Phase 4 plans 03 (Open Graph metadata)
- The pre-existing build error should be investigated before deploying (may be a Node.js or Next.js version mismatch)
- Both icon files follow the official Next.js file-based metadata convention and will work correctly once the build issue is resolved

---
*Phase: 04-seo-and-meta*
*Completed: 2026-02-24*
