# Project Research Summary

**Project:** Nam Nam Pizza & Grill — Restaurant SPA
**Domain:** Local fastfood / restaurant single-page website (Norwegian market)
**Researched:** 2026-02-23
**Confidence:** MEDIUM-HIGH (stack and architecture HIGH; features MEDIUM due to unavailable web search)

## Executive Summary

Nam Nam Pizza & Grill is a single-location fastfood restaurant in Åmot, Norway operating on a phone-ordering model ("Du ringer – Vi bringer!"). The site's primary job is to convert mobile visitors into phone calls — not to replicate the online ordering complexity of chain restaurants like Peppes Pizza or Dolly Dimple's. Research confirms that the highest-ROI feature for this business model is a persistent sticky CTA bar with a `tel:` link, not an online ordering system. Every architectural and feature decision should reinforce this: reduce friction between "I want food" and "I'm dialing."

The optimal technical approach is to adapt the existing Next.js 14 + Tailwind CSS template with minimal additions. The stack is already correct — only the `motion` animation library needs to be added for the required hero fade-in. Architecture is a clean Server Component shell feeding a single Client Component (`MenuTabs`) where tab state lives. All menu content isolates to `src/data/menu.ts`, making price and item updates safe developer operations that never touch component logic. This is the single most important maintainability decision for this project.

The main risks are frontend polish traps: dark theme flash on first load (FOUC), anchor sections scrolling behind sticky bars due to missing scroll offsets, and the performance cost of over-engineering the menu with heavy animation libraries. These are all known, well-understood problems with well-understood fixes. The project has low architectural risk and medium feature-definition risk (actual menu prices/items need transcription from BRIEF.md and client verification).

## Key Findings

### Recommended Stack

The existing Next.js 14.2.3 + React 18 + TypeScript 5 + Tailwind CSS 3.4.x stack requires no changes. The only addition is `motion` (formerly Framer Motion) for the hero entrance animation specified in BRIEF.md. Everything else the site needs — tab components, theme switching, icons — is already installed. Crucially, do NOT upgrade to Next.js 16.x or Tailwind v4; the template is stable on current versions and upgrading risks breakage with zero feature benefit for this use case.

**Core technologies:**
- Next.js 14.2.3: App Router SPA framework — keep, do not upgrade
- React 18 + TypeScript 5: Runtime + type safety — keep as-is
- Tailwind CSS 3.4.x: Utility styling + dark mode classes — keep, v3-lts
- `@headlessui/react` 2.0.3: Menu tab accessibility (Tab component) — already installed, use for tabs
- `next-themes` 0.3.0: Dark/light theme with `localStorage` persistence — already installed
- `motion` 12.34.3: Hero fade-in/slide-up animation — ADD this, nothing else
- CSS `scroll-behavior: smooth`: Anchor navigation — single line in globals.css, no JS library needed

### Expected Features

Norwegian local restaurant sites are a well-established, stable UX domain. Mobile traffic is 70-80% of visits, and the #1 and #2 visit reasons are checking the menu and checking opening hours. Missing either = users leave. Feature research confirms the sticky phone CTA bar is the single highest-ROI feature for a phone-ordering restaurant — it makes calling frictionless at any scroll position.

**Must have (table stakes):**
- Menu with all items and current prices — primary reason 70%+ of users visit
- Sticky phone CTA bar with `tel:+4741232219` — the conversion mechanism
- Opening hours (13:00-23:00 all days) — prevents "are they open?" abandonment
- Address + Google Maps link — enables walk-ins and navigation
- Delivery info (Modum zone, kr 99, Vipps/kontant) — pre-qualifies callers
- Mobile-responsive layout — 70-80% mobile traffic
- Norwegian language throughout — audience expects it, English creates friction

**Should have (competitive differentiators):**
- Menu tabs by category (Grill, Hamburger, Pizza, Barnemeny, Drikke) — reduces cognitive load vs long scroll
- Social proof badge (4.4/5, 53 anmeldelser) — trust signal for first-time visitors
- Hero with "Du ringer – Vi bringer!" tagline — immediately communicates the model
- Special offer highlight (2 store pizza + 1.5L brus = 450,-) — conversion hook
- Dark theme with brand colors — brand identity, already supported
- Facebook link — community channel for local Norwegian audience

**Defer to v2+:**
- Food photography — only add if client provides quality photos; stock photos harm trust
- Google Maps embed — heavier than a text link; only if users request interactivity
- Google Analytics — requires GDPR handling; add only if owner wants traffic data
- WhatsApp ordering link — monitor adoption in Norwegian local market

**Hard anti-features (do not build):**
- Online ordering / cart — contradicts business model, massive scope for zero validated demand
- CMS / admin panel — menu changes infrequently; static file is correct approach
- Instagram feed embed — API maintenance burden, slows load
- Live chat widget — restaurant owner won't staff it, creates unmet expectations

### Architecture Approach

The architecture is a minimal Next.js App Router SPA with one route (`/`). Server Components handle static sections; the only Client Components are `Navbar` (mobile Disclosure), `MenuTabs` (tab state), `StickyCallBar` (tel: link), and `DarkSwitch` (theme toggle). All menu content is defined in `src/data/menu.ts` with TypeScript types and flows one-directionally: data file → Server Component → Client Component → presentational leaf. Navigation uses plain `<a>` anchor tags (not `<Link>`) with CSS smooth scroll — no routing library needed.

**Major components:**
1. `src/data/menu.ts` — typed static data for all 5 categories and their items; the maintainability anchor
2. `MenuTabs` (Client Component) — owns active tab state (`useState`), renders `MenuCard` list; only interactive surface in menu
3. `StickyCallBar` (Client Component) — fixed bottom `tel:` link; the primary conversion mechanism
4. `Hero` — logo, tagline, two CTA buttons, fade-in via `motion`; sets user expectation before menu scroll
5. `Navbar` — sticky top bar with anchor links and mobile Disclosure menu
6. Static sections (`About`, `Delivery`, `Footer`) — address, hours, delivery info, contact; all Server Components

### Critical Pitfalls

1. **Dark theme flash (FOUC)** — `ThemeProvider` must use `defaultTheme="dark" enableSystem={false}` or users see a white flash on every load. Fix before any visual work in Phase 1.
2. **Sticky bar covering anchored content** — `scroll-padding-top: 80px` on `html` in globals.css is required or anchor nav scrolls the section heading behind the sticky bar. Implement alongside the sticky bar in Phase 2.
3. **Menu tabs without accessibility** — Use `@headlessui/react` `<Tab>` (already installed) not `<div onClick>`. The Headless UI Tab provides `role="tablist"`, `aria-selected`, and keyboard navigation for free. Omitting this fails WCAG 2.1 AA.
4. **Logo layout shift (CLS)** — Use `next/image` with explicit `width`, `height`, and `priority` for the hero logo. Raw `<img>` causes Cumulative Layout Shift and blurry HiDPI rendering.
5. **`lang="en"` on Norwegian content** — The template defaults to `lang="en"`. Change to `lang="nb"` (Norwegian Bokmål) in `layout.tsx`. One line; affects SEO and screen reader pronunciation.

## Implications for Roadmap

Based on research, this project maps cleanly to 4 phases with a clear dependency order: fix the foundation before building on it, build navigation infrastructure before content sections, build the primary feature (menu) as its own phase, and close with SEO/meta which has no runtime dependencies.

### Phase 1: Foundation
**Rationale:** Three critical pitfalls (FOUC, lang attribute, logo pattern) must be fixed before any visual or content work. These affect every subsequent component and are cheapest to fix at the start.
**Delivers:** Stable base — correct language, no theme flash, correct image pattern established, `src/data/menu.ts` with typed data structure
**Addresses:** Dark theme default, Norwegian language, logo CLS, data architecture decision
**Avoids:** FOUC pitfall, `lang="en"` pitfall, layout shift pitfall
**Research flag:** Standard patterns — no research needed. All fixes are one-liners or established patterns.

### Phase 2: Navigation and Layout Shell
**Rationale:** Navbar and StickyCallBar are layout-level components that affect every section. The scroll offset fix (scroll-padding-top) must be implemented alongside StickyCallBar — not retrofitted after sections are built.
**Delivers:** Working anchor navigation, sticky phone CTA bar, mobile hamburger menu, smooth scroll behavior
**Uses:** `@headlessui/react` Disclosure (Navbar mobile), CSS scroll-behavior, `tel:+4741232219`
**Implements:** Navbar, StickyCallBar, globals.css scroll-behavior + scroll-padding-top
**Avoids:** Sticky bar scroll offset pitfall
**Research flag:** Standard patterns — no research needed.

### Phase 3: Content Sections and Menu
**Rationale:** With navigation working, build the page content. Menu is the most complex section (Client Component, tab state, data rendering) and deserves the most attention. Static sections (Hero, About, Delivery) are straightforward and can be built before or after Menu.
**Delivers:** Complete page content — Hero with animation, About with hours and map link, Menu with 5 tabbed categories, Delivery info section, Footer
**Uses:** `motion` for Hero animation, `@headlessui/react` Tab for menu, `src/data/menu.ts` for all menu content
**Implements:** Hero, About, Menu + MenuTabs + MenuCard, Delivery, Footer, special offer highlight, social proof badge
**Avoids:** Menu tab accessibility pitfall, performance trap of over-animating menu cards
**Research flag:** Standard patterns for static sections. Menu tab implementation is well-documented via Headless UI. No additional research needed.

### Phase 4: SEO, Meta, and Polish
**Rationale:** SEO meta tags and JSON-LD schema have no runtime dependencies — they enhance an already-working site. Polish (hover effects, mobile testing, edge cases) belongs at the end when the product is functionally complete.
**Delivers:** LocalBusiness JSON-LD schema, Open Graph tags, favicon from logo, Norwegian SEO meta, mobile device testing sign-off
**Implements:** `src/app/layout.tsx` metadata, JSON-LD `<Script>` block, favicon generation
**Avoids:** Missing LocalBusiness schema pitfall (critical for Google local pack ranking)
**Research flag:** JSON-LD schema markup is well-documented at schema.org. Standard pattern, no research needed.

### Phase Ordering Rationale

- **Foundation before content:** The FOUC and language fixes are architectural — they touch `layout.tsx` which wraps everything. Fixing them first means every subsequent component renders correctly.
- **Navigation before sections:** `scroll-padding-top` must be set before section anchors are used. Setting it post-hoc requires retesting all anchor targets.
- **Data before components:** `src/data/menu.ts` must be defined before `MenuTabs` or `Menu` can be built. TypeScript types flow from data to components, not the reverse.
- **SEO last:** JSON-LD and meta tags add zero risk to functional code and have zero dependencies on content being in any particular state. Clean separation.

### Research Flags

Phases with standard, well-documented patterns (research-phase not needed):
- **Phase 1:** Next.js ThemeProvider config and `next/image` are official docs patterns
- **Phase 2:** CSS scroll-behavior and `@headlessui/react` Disclosure are stable APIs
- **Phase 3:** Headless UI Tab API is documented; static section content is straightforward
- **Phase 4:** Schema.org JSON-LD is a stable standard; Next.js metadata API is documented

No phases require deeper research. This is a well-understood domain with established patterns throughout.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Existing codebase analysis + npm registry verification 2026-02-23 |
| Features | MEDIUM | WebSearch unavailable; training data on stable UX domain; patterns verified internally |
| Architecture | HIGH | Next.js official docs verified; codebase analysis of existing template |
| Pitfalls | HIGH | Direct codebase analysis of `layout.tsx`, `Navbar.tsx`, `Hero.tsx`, `DarkSwitch.tsx` |

**Overall confidence:** MEDIUM-HIGH

### Gaps to Address

- **Actual menu data:** Prices and items must be transcribed from BRIEF.md and verified with the client before launch. Research established the data structure; content accuracy is a client deliverable.
- **Facebook URL:** BRIEF.md references `facebook.com/NumNumPizzaGrill` — the "NumNum" vs "NamNam" discrepancy needs verification against the actual Facebook page before the footer link goes live.
- **Deployment target:** Static export config (`output: 'export'`) depends on hosting. Vercel/Netlify handle Next.js natively without it; GitHub Pages would require it. Verify before Phase 4.
- **Logo dimensions:** `NamNamPizza&Grill.png` dimensions need measurement before setting explicit `width`/`height` on `<Image>` in Phase 1.

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 official documentation — App Router, Link component, anchor scrolling (verified 2026-02-20)
- Existing codebase: `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/Navbar.tsx`, `src/components/Hero.tsx` — direct analysis
- PROJECT.md + BRIEF.md — first-party project requirements and constraints
- npm registry — `motion@12.34.3`, `@headlessui/react@2.0.3` verified 2026-02-23

### Secondary (MEDIUM confidence)
- Training data: NNG (Nielsen Norman Group) restaurant website UX research (2020-2024)
- Training data: Google "micro-moments" mobile behavior for local businesses
- Training data: Norwegian restaurant site patterns (Peppes Pizza, Dolly Dimple's, local fastfood)
- WCAG 2.1 AA touch target guidelines (44px minimum) — stable standard

### Tertiary (LOW confidence)
- WebSearch unavailable during feature research — no live competitor verification performed
- WhatsApp ordering adoption in Norwegian local market — trend observation, not validated

---
*Research completed: 2026-02-23*
*Ready for roadmap: yes*
