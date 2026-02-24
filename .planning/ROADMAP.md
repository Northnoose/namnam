# Roadmap: Nam Nam Pizza & Grill

## Overview

A single-page restaurant website built on an existing Next.js 14 + Tailwind CSS template. The journey starts by hardening the foundation (dark theme, language, data architecture), adds the navigation shell that all sections anchor into, fills every content section including the full menu, and finishes with SEO and meta tags. The site's single job is to get visitors dialing 41 23 22 19 — every phase decision serves that conversion goal.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Fix dark-theme flash, set Norwegian language, establish typed menu data structure
- [x] **Phase 2: Navigation Shell** - Sticky navbar, sticky call bar, smooth scroll with correct anchor offsets
- [ ] **Phase 3: Content Sections** - Hero, Om oss, Menu (5 categories), Levering, Footer — the full page
- [ ] **Phase 4: SEO and Meta** - Title, description, Open Graph, favicon, LocalBusiness JSON-LD schema

## Phase Details

### Phase 1: Foundation
**Goal**: The technical base is stable and correct before any visible content is built
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05
**Success Criteria** (what must be TRUE):
  1. Page loads with a dark background on first visit — no white flash visible
  2. Browser dev tools show `<html lang="nb">` in the DOM
  3. Logo renders without layout shift (no CLS in Lighthouse) and is sharp on retina displays
  4. `src/data/menu.ts` exists and exports typed `MenuCategory[]` covering all 5 categories with correct TypeScript types
  5. Site layout renders correctly at 320px, 768px, and 1280px viewport widths
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — Fix layout.tsx FOUC + lang, replace navbar logo with next/image
- [x] 01-02-PLAN.md — Create src/data/menu.ts with TypeScript interfaces and 5-category stubs
- [x] 01-03-PLAN.md — Verify (and fix if needed) responsive layout at 320/768/1280px, human checkpoint

### Phase 2: Navigation Shell
**Goal**: Users can navigate the full page from anywhere, and the phone number is always one tap away
**Depends on**: Phase 1
**Requirements**: NAV-01, NAV-02, NAV-03, NAV-04, NAV-05
**Success Criteria** (what must be TRUE):
  1. Clicking a navbar link scrolls to the correct section and the section heading is fully visible (not hidden behind the sticky bar)
  2. On mobile, tapping the hamburger icon opens a menu with links to all four sections; tapping a link closes the menu and scrolls to the section
  3. The sticky call bar is visible at the bottom of the screen on mobile and top on desktop at all scroll positions, and tapping it initiates a phone call to 41 23 22 19
  4. Navbar background transitions from transparent to solid as the user scrolls down
**Plans**: 3 plans

Plans:
- [x] 02-01-PLAN.md — Rewrite Navbar.tsx: sticky, scroll-aware, Headless UI v2 API, four section links, desktop phone CTA, mobile auto-close menu (NAV-01, NAV-02, NAV-03)
- [x] 02-02-PLAN.md — Create CallBar.tsx, add scroll CSS to globals.css, data-scroll-behavior to layout.tsx, placeholder anchor sections in page.tsx (NAV-04, NAV-05)
- [x] 02-03-PLAN.md — Human visual verification of all Phase 2 navigation features across mobile and desktop (NAV-01 through NAV-05)

### Phase 3: Content Sections
**Goal**: Every piece of information a visitor needs to decide to order is visible on the page
**Depends on**: Phase 2
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-04, HERO-05, HERO-06, OM-01, OM-02, OM-03, OM-04, OM-05, MENU-01, MENU-02, MENU-03, MENU-04, MENU-05, MENU-06, MENU-07, MENU-08, MENU-09, MENU-10, MENU-11, MENU-12, MENU-13, LEV-01, LEV-02, LEV-03, LEV-04, LEV-05, FOOT-01, FOOT-02, FOOT-03, FOOT-04, FOOT-05, FOOT-06
**Success Criteria** (what must be TRUE):
  1. Hero shows the Nam Nam logo, the tagline, and two working buttons — "RING OG BESTILL" initiates a call, "SE MENYEN" scrolls to the menu; content fades in on first load
  2. Om oss section shows the address, opening hours (13:00-23:00 alle dager), a Google Maps link, and the 4.4/5 review badge
  3. Menu section shows all 5 category tabs; switching tabs renders the correct items with names, ingredients, and prices; the special offer banner (450,-) is visible; Nav Nam spesial and Lag din egen pizza have featured styling; menu cards show a hover effect
  4. Levering section explains the delivery process with the 99,- surcharge, Vipps/kontant payment options, and a tappable phone number
  5. Footer shows address, tappable phone number, opening hours, Facebook link, and parking note
**Plans**: 7 plans

Plans:
- [ ] 03-01-PLAN.md — Populate src/data/menu.ts with all 5 category arrays from BRIEF.md
- [ ] 03-02-PLAN.md — Rewrite Hero.tsx: logo, tagline, CTAs, motion fade-in animation
- [ ] 03-03-PLAN.md — Create OmOss.tsx and Levering.tsx static server components
- [ ] 03-04-PLAN.md — Rewrite Footer.tsx with real contact info and id="kontakt"
- [ ] 03-05-PLAN.md — Create Meny.tsx: Headless UI tabs, type-discriminated cards, featured styling
- [ ] 03-06-PLAN.md — Rewrite page.tsx to compose all sections, verify production build
- [ ] 03-07-PLAN.md — Human visual verification of all Phase 3 sections at mobile and desktop

### Phase 4: SEO and Meta
**Goal**: Search engines can correctly identify the business and the page is shareable with a proper preview
**Depends on**: Phase 3
**Requirements**: SEO-01, SEO-02, SEO-03, SEO-04, SEO-05
**Success Criteria** (what must be TRUE):
  1. Browser tab displays the full title "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum"
  2. Sharing the URL on social media renders a preview card with the correct title, description, and logo image
  3. Favicon displays in browser tab and as Apple touch icon on home screen saves
  4. Browser dev tools show a valid `<script type="application/ld+json">` block with `FastFoodRestaurant` type, address, telephone, and opening hours
**Plans**: 3 plans

Plans:
- [ ] 04-01-PLAN.md — Add metadata export (title, description, Open Graph) and JSON-LD script to layout.tsx
- [ ] 04-02-PLAN.md — Create src/app/icon.tsx and apple-icon.tsx for file-based favicon generation
- [ ] 04-03-PLAN.md — Human visual verification of all Phase 4 SEO requirements

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete | 2026-02-24 |
| 2. Navigation Shell | 3/3 | Complete | 2026-02-24 |
| 3. Content Sections | 6/7 | In Progress|  |
| 4. SEO and Meta | 0/TBD | Not started | - |
