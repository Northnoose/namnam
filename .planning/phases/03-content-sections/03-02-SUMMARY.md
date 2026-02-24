---
phase: 03-content-sections
plan: 02
subsystem: ui
tags: [nextjs, react, tailwind, motion, hero]

# Dependency graph
requires:
  - phase: 02-navigation-shell
    provides: Sticky navbar consuming ~80px height — hero min-height calculation depends on this
provides:
  - Hero section with Nam Nam logo, Norwegian tagline, motion animation, and two CTA buttons
affects: [03-06-page-composition, visual-QA]

# Tech tracking
tech-stack:
  added: [motion@^12.34.3]
  patterns:
    - "motion/react staggered fade-in: logo at delay 0, tagline at delay 0.2, buttons at delay 0.4"
    - "min-h-[calc(100vh-80px)] accounts for sticky navbar height in full-viewport hero"

key-files:
  created: []
  modified:
    - src/components/Hero.tsx

key-decisions:
  - "Use motion/react (not framer-motion) — locked in STATE.md as the animation library choice"
  - "Single-column centered layout replaces the old two-column template layout"
  - "next/image with width/height intrinsic props + className for responsive display size"

patterns-established:
  - "use client on components that use motion/react or other browser APIs"

requirements-completed: [HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06]

# Metrics
duration: 5min
completed: 2026-02-24
---

# Phase 3 Plan 02: Hero Section Summary

**Hero.tsx rewritten with Nam Nam logo, tagline, subtext, RING OG BESTILL / SE MENYEN CTAs, and 3-stage staggered motion animation**

## Performance

- **Duration:** ~5 min
- **Completed:** 2026-02-24
- **Tasks:** 2 (motion install + Hero rewrite)
- **Files modified:** 1 (Hero.tsx) + package.json/yarn.lock for motion

## Accomplishments
- Installed `motion` package (v12.34.3)
- Replaced template placeholders with real Nam Nam brand content
- Logo: `/img/NamNamPizza&Grill.png` via next/image (HERO-01)
- Tagline: "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker!" (HERO-02)
- Subtext: "Du ringer – Vi bringer! 📞 41 23 22 19" (HERO-03)
- RING OG BESTILL button → `tel:+4741232219` (HERO-04)
- SE MENYEN button → `#meny` anchor scroll (HERO-05)
- Staggered fade-in/slide-up animation via motion/react (HERO-06)
- TypeScript compiles with 0 errors

## Task Commits

1. **Task 1: Install motion library** — `80635ae` (chore)
2. **Task 2: Rewrite Hero.tsx** — `7dd453a` (feat)

## Files Created/Modified
- `src/components/Hero.tsx` — Complete rewrite: "use client", motion/react, logo, tagline, CTAs

## Decisions Made
- `"use client"` at top — required for motion/react browser APIs
- `min-h-[calc(100vh-80px)]` — offsets sticky navbar height so hero fills viewport
- Stagger delays: 0s → 0.2s → 0.4s for natural cascade feel

## Deviations from Plan

None — plan executed exactly as written.

## Next Phase Readiness
- Hero fully functional; animation requires browser; `#meny` scroll depends on section id in page.tsx (plan 03-06)

---
*Phase: 03-content-sections*
*Completed: 2026-02-24*
