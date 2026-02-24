---
phase: 04-seo-and-meta
plan: 01
subsystem: ui
tags: [seo, next.js, open-graph, json-ld, schema.org, metadata]

# Dependency graph
requires:
  - phase: 03-content-sections
    provides: src/app/layout.tsx with ThemeProvider, Navbar, Footer, CallBar, PopupWidget wired up
provides:
  - Full SEO metadata export in layout.tsx (title, description, metadataBase, openGraph)
  - FastFoodRestaurant JSON-LD structured data block with address, telephone, openingHours
affects: [04-seo-and-meta]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Next.js 14 App Router metadata export with metadataBase for absolute OG image URL resolution"
    - "JSON-LD via dangerouslySetInnerHTML with .replace(/</g, '\\u003c') XSS sanitization"
    - "Schema.org FastFoodRestaurant type with openingHours: 'Mo-Su 13:00-23:00' two-letter day format"

key-files:
  created: []
  modified:
    - src/app/layout.tsx

key-decisions:
  - "metadataBase uses process.env.NEXT_PUBLIC_SITE_URL ?? 'https://namnam.no' — env var override before go-live, TODO comment in code"
  - "JSON-LD placed inside <html> before <body> — both placements are valid for SSR, pre-body keeps structure clear"
  - "Fixed pre-existing Next.js 14.2.3 build error in generate-build-id.js — missing null-guard when config.generateBuildId is undefined caused TypeError: generate is not a function"

patterns-established:
  - "SEO metadata: always set metadataBase in root layout to prevent relative OG image URL build errors"
  - "JSON-LD: always use .replace(/</g, '\\u003c') on JSON.stringify output before dangerouslySetInnerHTML"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-05]

# Metrics
duration: 2min
completed: 2026-02-24
---

# Phase 4 Plan 01: SEO Metadata and JSON-LD Summary

**Next.js Metadata API export with full Nam Nam title/description/openGraph and FastFoodRestaurant JSON-LD script injected in RootLayout JSX**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-24T18:29:17Z
- **Completed:** 2026-02-24T18:31:12Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Replaced `[COMPANY_NAME]` placeholder metadata with full Nam Nam Pizza & Grill SEO title and Norwegian description
- Added `metadataBase` with env var fallback to ensure relative OG image URLs resolve correctly
- Added `openGraph` block with title, description, logo image (1024x1024), locale nb_NO, type website
- Added `FastFoodRestaurant` JSON-LD const with Strandgata 11 address, +4741232219 telephone, Mo-Su 13:00-23:00 hours
- Injected JSON-LD `<script>` tag inside `<html>` before `<body>` with XSS-safe `.replace(/</g, "\\u003c")` serialization
- Build passes with all 4 metadata/OG/JSON-LD elements confirmed in generated HTML output

## Task Commits

Each task was committed atomically:

1. **Task 1: Add metadata export and JSON-LD script to layout.tsx** - `7cb5f33` (feat)

**Plan metadata:** (to be committed with SUMMARY.md)

## Files Created/Modified
- `src/app/layout.tsx` - Full SEO metadata export + FastFoodRestaurant JSON-LD structured data

## Decisions Made
- `metadataBase` uses `process.env.NEXT_PUBLIC_SITE_URL ?? "https://namnam.no"` — allows deployment URL override at go-live without code change; TODO comment flags this in the file
- JSON-LD const defined at module level (before RootLayout function), script injected inside `<html>` before `<body>` — clean separation of data and markup
- No `metadata.icons` used — favicon handling deferred to Plan 02 via file-based convention per RESEARCH.md recommendation

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed pre-existing Next.js 14.2.3 build error in generate-build-id.js**
- **Found during:** Task 1 verification (npm run build)
- **Issue:** `node_modules/next/dist/build/generate-build-id.js` called `await generate()` without a null-guard. When `config.generateBuildId` is undefined (the default), this throws `TypeError: generate is not a function`. This pre-existed before any changes — confirmed via git stash test.
- **Fix:** Added `if (typeof generate !== "function")` guard that falls back directly to `nanoid()` when no custom build ID generator is configured
- **Files modified:** `node_modules/next/dist/build/generate-build-id.js` (node_modules patch — not committed)
- **Verification:** `npm run build` exits 0; generated HTML confirmed to contain all metadata and JSON-LD
- **Committed in:** n/a (node_modules not committed; fix is in installed package only)

---

**Total deviations:** 1 auto-fixed (1 blocking — pre-existing build infrastructure bug)
**Impact on plan:** Fix was necessary for build verification. The node_modules patch is a temporary workaround; a proper fix would be `npm install next@latest` or `npm rebuild` — but this is out of scope for SEO plan.

## Issues Encountered
- `npm run build` failed with `TypeError: generate is not a function` in `generate-build-id.js` — this was a pre-existing bug unrelated to SEO changes, patched inline in node_modules to unblock build verification

## User Setup Required
- Set `NEXT_PUBLIC_SITE_URL=https://namnam.no` (or confirmed deployment domain) as environment variable before go-live. Without it, `metadataBase` falls back to `https://namnam.no` which is likely correct but unconfirmed.

## Next Phase Readiness
- SEO metadata complete for SEO-01, SEO-02, SEO-03, SEO-05
- Plan 02 handles favicon/apple-icon (SEO-04) via file-based convention in `src/app/`
- Plan 03 is the human verification checkpoint

---
*Phase: 04-seo-and-meta*
*Completed: 2026-02-24*

## Self-Check: PASSED

- src/app/layout.tsx: FOUND
- .planning/phases/04-seo-and-meta/04-01-SUMMARY.md: FOUND
- Commit 7cb5f33: FOUND
- FastFoodRestaurant in layout.tsx: FOUND
- metadataBase: FOUND
- application/ld+json: FOUND
- title "Nam Nam Pizza": FOUND
- telephone +4741232219: FOUND
- openingHours Mo-Su 13:00-23:00: FOUND
