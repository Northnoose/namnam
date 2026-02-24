---
phase: 02-navigation-shell
plan: 02
subsystem: ui
tags: [nextjs, tailwind, scroll, mobile, navigation]

# Dependency graph
requires:
  - phase: 02-navigation-shell/02-01
    provides: Sticky Navbar with desktop phone CTA rendered in layout.tsx

provides:
  - Fixed orange mobile-only call bar (CallBar.tsx) with tel: link to 41 23 22 19
  - CSS scroll-padding-top 80px and scroll-behavior smooth on html element
  - data-scroll-behavior attribute on html tag in layout.tsx
  - Four placeholder anchor sections in page.tsx (om-oss, meny, levering, kontakt)
  - Children wrapper pb-16 lg:pb-0 to prevent content obscured by call bar

affects: [03-content, anchor navigation, mobile layout]

# Tech tracking
tech-stack:
  added: []
  patterns: [fixed bottom mobile bar with lg:hidden, scroll-padding-top for sticky nav offset]

key-files:
  created:
    - src/components/CallBar.tsx
  modified:
    - src/app/layout.tsx
    - src/app/globals.css
    - src/app/page.tsx

key-decisions:
  - "CallBar uses lg:hidden so it only shows on mobile — desktop phone CTA is in the navbar (Plan 01)"
  - "z-40 on CallBar so navbar (z-50) draws on top"
  - "pb-16 lg:pb-0 on children wrapper reserves 64px bottom clearance on mobile for call bar"
  - "scroll-padding-top: 80px gives ~16px extra clearance above sticky navbar height (~64px)"
  - "data-scroll-behavior attribute added to html tag for CSS-controlled smooth scroll"

patterns-established:
  - "Mobile-only sticky bars: use lg:hidden + fixed bottom-0 + z-40"
  - "Anchor nav offset: scroll-padding-top on html matches approximate sticky nav height plus buffer"

requirements-completed: [NAV-04, NAV-05]

# Metrics
duration: 1min
completed: 2026-02-24
---

# Phase 2 Plan 02: CallBar, Scroll CSS, and Anchor Sections Summary

**Fixed orange mobile call bar with tel: link, smooth scroll CSS with 80px offset, and four placeholder anchor sections for NAV-04 and NAV-05**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-24T13:19:46Z
- **Completed:** 2026-02-24T13:20:47Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments

- Created CallBar.tsx — fixed orange bottom bar visible only on mobile (lg:hidden), links to tel:+4741232219, z-40 below navbar
- Wired CallBar into layout.tsx inside ThemeProvider with pb-16 lg:pb-0 on children wrapper
- Added scroll-padding-top: 80px and scroll-behavior: smooth to html element in globals.css
- Added data-scroll-behavior="smooth" attribute to html tag in layout.tsx
- Replaced upstream template content in page.tsx with four placeholder anchor sections (om-oss, meny, levering, kontakt)

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CallBar.tsx and wire into layout.tsx** - `a93d2ae` (feat)
2. **Task 2: Add scroll CSS, data-scroll-behavior, and anchor sections** - `ce7ff6f` (feat)

**Plan metadata:** (docs commit to follow)

## Files Created/Modified

- `src/components/CallBar.tsx` - Fixed orange mobile-only call bar with tel: link, lg:hidden, z-40, bg-orange-600
- `src/app/layout.tsx` - Added CallBar import/render, pb-16 lg:pb-0 on children wrapper, data-scroll-behavior on html tag
- `src/app/globals.css` - Split html,body rule; added scroll-padding-top: 80px and scroll-behavior: smooth to html
- `src/app/page.tsx` - Replaced upstream template with four placeholder anchor sections

## Decisions Made

- CallBar uses `lg:hidden` because desktop phone CTA is in the navbar (Plan 01) — no duplication needed
- `z-40` on CallBar keeps it below the navbar (`z-50`) so the navbar always draws on top
- `pb-16 lg:pb-0` on children wrapper ensures page content is not obscured by the fixed call bar on mobile
- `scroll-padding-top: 80px` on html accounts for the sticky navbar (~64px tall) plus ~16px buffer so headings land comfortably below the nav after anchor click

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- CallBar and scroll infrastructure in place; anchor sections ready for visual verification
- Phase 3 (content) can replace placeholder `<p>` elements in each section while keeping the `id` attributes intact
- No blockers

---
*Phase: 02-navigation-shell*
*Completed: 2026-02-24*
