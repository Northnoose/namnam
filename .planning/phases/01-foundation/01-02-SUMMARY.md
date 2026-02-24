---
phase: 01-foundation
plan: 02
subsystem: ui
tags: [typescript, menu, data-model, next.js]

# Dependency graph
requires: []
provides:
  - "src/data/menu.ts with MenuItem, PizzaMenuItem, HamburgerVariant, HamburgerMenuItem, MenuCategory TypeScript interfaces"
  - "menuCategories export with 5 category stubs (grill, hamburger, pizza, barnemeny, drikke)"
affects:
  - "Phase 3 MenuTabs component imports menuCategories from src/data/menu"
  - "Phase 3 MENU-06 uses HamburgerMenuItem variants field"
  - "Phase 3 MENU-07 uses PizzaMenuItem priceLiten/priceStor fields"

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Menu data modelled as TypeScript interfaces with discriminated subtypes — no use of 'any'"
    - "PizzaMenuItem extends MenuItem with priceLiten/priceStor for dual-price display"
    - "HamburgerMenuItem extends MenuItem with variants: HamburgerVariant[] for weight-class pricing"
    - "MenuCategory.items typed as union (MenuItem | PizzaMenuItem | HamburgerMenuItem)[]"

key-files:
  created:
    - "src/data/menu.ts"
  modified: []

key-decisions:
  - "Phase 1 creates type structure with empty stubs — Phase 3 populates item data from BRIEF.md"
  - "PizzaMenuItem has priceLiten + priceStor (not price: string) to keep strong typing for Phase 3"
  - "HamburgerMenuItem has variants: HamburgerVariant[] so weight-badge UI in Phase 3 has structured data"
  - "price: number kept required on all MenuItem subtypes — Phase 3 sets price = priceLiten on PizzaMenuItems"

patterns-established:
  - "Pattern: Menu data in src/data/menu.ts as TypeScript file (not JSON) — enables interface imports across components"

requirements-completed: [FOUND-04]

# Metrics
duration: 2min
completed: 2026-02-24
---

# Phase 1 Plan 02: Create src/data/menu.ts Summary

**TypeScript menu data model with 5 typed interfaces and 5 empty category stubs, ready for Phase 3 item population**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-24T07:21:51Z
- **Completed:** 2026-02-24T07:23:56Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Created `src/data/menu.ts` with 5 exported TypeScript interfaces covering all menu item shapes
- PizzaMenuItem has `priceLiten` and `priceStor` fields required by Phase 3 MENU-07
- HamburgerMenuItem has `variants: HamburgerVariant[]` required by Phase 3 MENU-06
- All 5 menu categories present as empty stubs: grill, hamburger, pizza, barnemeny, drikke
- TypeScript compilation passes with no errors (`tsc --noEmit` exit 0)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create src/data/menu.ts with TypeScript interfaces and category stubs** - `621edb5` (feat)

**Plan metadata:** `d72203e` (docs: complete menu data model plan)

## Files Created/Modified
- `src/data/menu.ts` - TypeScript interfaces (MenuItem, PizzaMenuItem, HamburgerVariant, HamburgerMenuItem, MenuCategory) and menuCategories export with 5 empty category stubs

## Decisions Made
- Phase 1 creates type structure only — empty `items: []` per category is correct; Phase 3 populates data from BRIEF.md
- `price: number` remains required on all subtypes; Phase 3 will set `price = priceLiten` on PizzaMenuItems for backward compatibility
- `HamburgerMenuItem.variants` provides structured weight/price data so Phase 3 can render weight badges from typed data

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- `node_modules` was not installed; ran `npm install` to restore dependencies before TypeScript check could run. TypeScript binary found at `node_modules/typescript/bin/tsc`. Not a deviation — environment setup is expected on fresh clone.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- `src/data/menu.ts` is complete and ready for Phase 3 import (`import { menuCategories } from '@/data/menu'`)
- Types are final — Phase 3 can add item data without breaking changes
- Phase 1 Plan 03 (responsive layout verification) is the final step before Phase 2

## Self-Check: PASSED

- FOUND: `src/data/menu.ts`
- FOUND: `01-02-SUMMARY.md`
- FOUND: commit `621edb5`
