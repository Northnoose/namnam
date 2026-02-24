---
phase: 01-foundation
plan: 01
subsystem: ui
tags: [next.js, next-themes, next/image, fouc, dark-mode, i18n]

# Dependency graph
requires: []
provides:
  - Dark-mode forced via ThemeProvider defaultTheme="dark" enableSystem=false (no FOUC)
  - html lang="nb" Norwegian Bokmål language attribute set globally
  - Nam Nam PNG logo rendered in navbar via next/image with priority and 1:1 aspect ratio
affects: [02-menu-data, 03-homepage, 04-deployment]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ThemeProvider must use defaultTheme=\"dark\" enableSystem={false} to prevent FOUC on SSR pages"
    - "next/image with explicit width/height matching intrinsic dimensions prevents CLS"

key-files:
  created: []
  modified:
    - src/app/layout.tsx
    - src/components/Navbar.tsx

key-decisions:
  - "lang=\"nb\" (Norwegian Bokmal) chosen over lang=\"no\" — more precise for screen readers"
  - "enableSystem={false} required alongside defaultTheme=\"dark\" to prevent OS light-mode causing white flash before hydration"
  - "Logo displayed at 120x120px with width/height matching PNG intrinsic ratio (1024x1024 = 1:1) to eliminate CLS"
  - "priority prop added to logo Image — navbar is above the fold, logo is an LCP candidate"

patterns-established:
  - "Pattern 1: FOUC prevention — ThemeProvider with defaultTheme + enableSystem=false is the correct pattern for forced dark mode in next-themes"
  - "Pattern 2: Logo images use next/image with priority for above-fold renders"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03]

# Metrics
duration: 1min
completed: 2026-02-24
---

# Phase 1 Plan 01: Technical Shell Fix Summary

**FOUC eliminated and Norwegian locale set via ThemeProvider defaultTheme="dark" enableSystem={false} and html lang="nb"; Nam Nam PNG logo live in navbar via next/image with priority**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-24T07:21:44Z
- **Completed:** 2026-02-24T07:22:52Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Eliminated white flash on dark-mode pages by adding `defaultTheme="dark" enableSystem={false}` to ThemeProvider
- Set `html lang="nb"` for correct Norwegian Bokmal screen reader pronunciation
- Replaced SVG placeholder logo and `[COMPANY_NAME]` text span with `next/image` rendering `NamNamPizza&Grill.png` at 120x120px
- TypeScript compiles with zero errors after both changes

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix layout.tsx — FOUC prevention and Norwegian language attribute** - `bd8d927` (fix)
2. **Task 2: Replace navbar logo — next/image with NamNamPizza&Grill.png** - `b9e16d4` (feat)

**Plan metadata:** (see final metadata commit)

## Files Created/Modified
- `src/app/layout.tsx` - Added `lang="nb"` and `ThemeProvider defaultTheme="dark" enableSystem={false}`
- `src/components/Navbar.tsx` - Replaced placeholder logo/text with `next/image` of NamNamPizza&Grill.png

## Decisions Made
- `lang="nb"` (Norwegian Bokmal) preferred over `lang="no"` — more precise, correct screen reader pronunciation
- `enableSystem={false}` is required alongside `defaultTheme="dark"` — without it, next-themes reads `prefers-color-scheme`, causing a white flash on light-mode OS before hydration sets the dark class
- Logo width/height set to 120 matching 1:1 intrinsic ratio of the 1024x1024 PNG — prevents Cumulative Layout Shift
- `priority` prop added since navbar logo is above the fold and a likely LCP candidate

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Installed missing npm dependencies to run TypeScript check**
- **Found during:** Task 2 (overall verification step)
- **Issue:** `node_modules` not present; `npx tsc --noEmit` failed because TypeScript was not installed
- **Fix:** Ran `npm install` to install all dependencies. TypeScript binary then found at `node_modules/typescript/bin/tsc`. Ran check successfully (zero errors).
- **Files modified:** `node_modules/` (not committed — gitignored)
- **Verification:** `node node_modules/typescript/bin/tsc --noEmit` exited 0
- **Committed in:** Not committed (node_modules is gitignored)

---

**Total deviations:** 1 auto-fixed (1 blocking — missing dependencies for verification)
**Impact on plan:** Dependency install was required for verification only. No source code changes beyond plan scope.

## Issues Encountered
- `npx tsc` failed with "This is not the tsc command you are looking for" — npx downloaded a stub package. Resolved by running tsc directly from `node_modules/typescript/bin/tsc` after installing dependencies.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Layout foundation is solid: dark theme enforced, correct language, real logo displayed
- Ready for Phase 1 Plan 02 (menu data and content)
- No blockers from this plan

## Self-Check: PASSED

- FOUND: src/app/layout.tsx
- FOUND: src/components/Navbar.tsx
- FOUND: .planning/phases/01-foundation/01-01-SUMMARY.md
- FOUND commit: bd8d927 (fix(01-01): FOUC prevention and Norwegian language attribute)
- FOUND commit: b9e16d4 (feat(01-01): replace navbar logo with NamNamPizza&Grill.png via next/image)

---
*Phase: 01-foundation*
*Completed: 2026-02-24*
