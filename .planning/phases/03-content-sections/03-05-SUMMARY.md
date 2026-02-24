---
phase: 03-content-sections
plan: 05
subsystem: ui
tags: [react, headlessui, typescript, tailwind, tabs, menu]

# Dependency graph
requires:
  - phase: 03-01
    provides: menuCategories data with PizzaMenuItem, HamburgerMenuItem, and featured items populated from BRIEF.md

provides:
  - Meny.tsx: Accessible tabbed menu section with type-discriminated card rendering for all 5 categories

affects:
  - page assembly (any page.tsx that imports Meny)
  - Phase 04 (deployment) — Meny is primary content component, largest section on page

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Headless UI v2 TabGroup/TabList/Tab/TabPanels/TabPanel (named exports, not deprecated Tab.Group API)"
    - "Type guard pattern: isPizza() using 'priceLiten' in item, isHamburger() using 'variants' in item"
    - "Tab className function form: className={({ selected }) => ...} for render-prop-style active styling"
    - "Horizontal scroll tabs: overflow-x-auto whitespace-nowrap on TabList + shrink-0 on each Tab"

key-files:
  created:
    - src/components/Meny.tsx
  modified: []

key-decisions:
  - "Offer banner rendered twice: once above tabs (always visible) and once inside Pizza TabPanel (contextually relevant) — satisfies MENU-12 for all viewports"
  - "Calzone items stored as plain MenuItem (no priceLiten/priceStor) — isPizza() type guard returns false, renders single-price card as intended"
  - "Tab className uses function form rather than data-[selected] Tailwind modifier — function form is Headless UI v2 supported (ClassNameOverride type confirms it) and more readable"

patterns-established:
  - "Type guard pattern for union MenuItem types: use 'fieldName' in item property checks for safe narrowing"
  - "Headless UI v2 named exports only — Tab.Group, Tab.List deprecated API not used"

requirements-completed: [MENU-01, MENU-02, MENU-03, MENU-04, MENU-12, MENU-13]

# Metrics
duration: 5min
completed: 2026-02-24
---

# Phase 3 Plan 05: Meny Summary

**Headless UI v2 tabbed menu with type-discriminated card rendering — pizza liten/stor prices, hamburger weight badges, featured Anbefalt styling, and pizza offer banner**

## Performance

- **Duration:** 5 min
- **Started:** 2026-02-24T17:46:27Z
- **Completed:** 2026-02-24T17:51:00Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Created `Meny.tsx` as a "use client" Headless UI v2 tabs component covering all 5 menu categories
- Type guards `isPizza()` and `isHamburger()` enable three distinct card layouts without `as any` casts
- Full MENU-01 through MENU-13 requirement coverage: accessibility (ARIA via Headless UI), horizontal scroll on mobile, per-type card rendering, featured item styling, and offer banner
- TypeScript compilation passes with 0 errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Meny.tsx with Headless UI tabs and type-discriminated menu cards** - `b0c7987` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `src/components/Meny.tsx` — "use client" tabbed menu section with 5 categories, type-discriminated cards, offer banner, and hover animation

## Decisions Made

- Offer banner rendered twice (above tabs + inside Pizza panel) so it's visible regardless of which tab is active
- Calzone items correctly fall through to single-price rendering because they lack `priceLiten`/`priceStor` fields
- Tab `className` function form confirmed valid via Headless UI v2 `ClassNameOverride<TTag, TSlot>` type definition

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- Meny.tsx is ready to be imported and placed in page.tsx
- All 5 menu categories render with real data from menu.ts (populated in plan 03-01)
- Component is accessible, mobile-responsive, and visually interactive
- Phase 3 plan 06 (Levering section) or page assembly can proceed

---
*Phase: 03-content-sections*
*Completed: 2026-02-24*
