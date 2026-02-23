# Pitfalls Research: Nam Nam Pizza & Grill Restaurant SPA

**Domain:** Restaurant/fastfood single-page website (Next.js 14 + Tailwind)
**Researched:** 2026-02-23

---

## Critical Pitfalls

### 1. Dark Theme Flash (FOUC)
**Severity:** High — visible on every page load
**Warning sign:** White flash before dark background appears on first render
**Root cause:** `ThemeProvider` in `layout.tsx` is missing `defaultTheme="dark"` and `forcedTheme` attributes. Current template initializes with system default.
**Prevention:**
```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
```
**Phase:** Phase 1 (Foundation) — fix before any visual work

---

### 2. Sticky Call Bar Covering Anchored Content
**Severity:** High — anchor nav scrolls content under sticky bar
**Warning sign:** Clicking "Se menyen" scrolls to #meny but the menu heading is hidden behind the sticky bar
**Root cause:** Missing scroll offset for sticky elements
**Prevention:**
```css
/* globals.css */
html {
  scroll-padding-top: 80px; /* height of sticky call bar */
}
```
Also add `scroll-margin-top` on section elements if Navbar is also sticky.
**Phase:** Phase 2 (Navigation) — implement alongside sticky bar

---

### 3. Menu Tabs Missing Keyboard/Screen Reader Support
**Severity:** High — fails WCAG 2.1 AA accessibility
**Warning sign:** Tab key doesn't navigate between menu categories; screen readers announce nothing meaningful
**Root cause:** Building custom tab UI with `<div onClick>` instead of semantic tab pattern
**Prevention:** Use `@headlessui/react` `<Tab>` — already installed at v2.0.3:
```tsx
import { Tab } from '@headlessui/react'
// Provides: role="tablist", role="tab", role="tabpanel", aria-selected, keyboard nav
```
**Phase:** Phase 3 (Menu) — non-negotiable for the primary feature

---

### 4. Logo PNG Layout Shift and Blurry HiDPI
**Severity:** Medium — poor CLS score and fuzzy on retina displays
**Warning sign:** Logo looks pixelated on Retina/HiDPI screens; page jumps on load (Cumulative Layout Shift)
**Root cause:** Using raw `<img>` for `NamNamPizza&Grill.png` without width/height or `priority` prop
**Prevention:**
```tsx
import Image from 'next/image'
import logo from '../../../public/img/NamNamPizza&Grill.png'

<Image src={logo} alt="Nam Nam Pizza & Grill" priority width={300} height={150} />
```
Measure actual PNG dimensions first and set explicit width/height.
**Phase:** Phase 1 (Foundation) — set up image usage pattern early

---

### 5. Wrong Language Attribute (`lang="en"` on Norwegian Content)
**Severity:** Medium — hurts SEO and screen reader pronunciation
**Warning sign:** Screen reader announces Norwegian text with English pronunciation
**Root cause:** Template `layout.tsx` has `<html lang="en">` by default
**Prevention:**
```tsx
// src/app/layout.tsx
<html lang="nb"> // Norwegian Bokmål
```
**Phase:** Phase 1 (Foundation) — one-line fix, do immediately

---

### 6. Missing LocalBusiness JSON-LD Schema
**Severity:** Medium — critical for Norwegian local search (Google Maps integration)
**Warning sign:** Restaurant doesn't appear in Google local pack / knowledge graph
**Root cause:** No structured data markup for local business
**Prevention:** Add to `layout.tsx` or a dedicated `<Script>` component:
```json
{
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  "name": "Nam Nam Pizza & Grill",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Strandgata 11",
    "postalCode": "3340",
    "addressLocality": "Åmot",
    "addressCountry": "NO"
  },
  "telephone": "+4741232219",
  "openingHours": "Mo-Su 13:00-23:00",
  "servesCuisine": ["Pizza", "Kebab", "Burger"],
  "priceRange": "kr"
}
```
**Phase:** Phase 4 (SEO & Meta) — dedicated SEO pass

---

## Performance Traps

| Trap | Risk | Prevention |
|------|------|-----------|
| Not using `next/image` for hero | LCP hurt on mobile | Always use `<Image>` with `priority` for above-fold |
| Importing all menu data in every component | Unnecessary re-renders | Import from single `src/data/menu.ts` source |
| Adding `motion` animations to menu cards | Janky scroll on low-end mobile | Use CSS hover transitions only for cards; `motion` for hero only |
| Embedding Google Maps iframe | +200ms load, layout shift | Use static map image or text link to Google Maps instead |

---

## UX Pitfalls

| Pitfall | User Impact | Fix |
|---------|------------|-----|
| Phone number not `tel:` link on mobile | User must manually dial | All phone numbers: `<a href="tel:+4741232219">` |
| Facebook URL typo — brief says "NumNum" not "NamNam" | Broken social link | Verify: `facebook.com/NumNumPizzaGrill` (sic — as in BRIEF.md) |
| Prices without currency symbol | Confusion | Always: `120,-` or `kr 120` — consistent throughout |
| Menu tabs not scrollable on narrow phones | Can't see all categories | Use `overflow-x-auto` on tab bar, hide scrollbar CSS |
| Opening hours not structured | Screen readers miss it | Use `<time>` element or explicit text, not just graphic |

---

## Integration Gotchas

| Issue | Detail |
|-------|--------|
| `tel:` format | Must be international format: `tel:+4741232219` (not `tel:41232219`) |
| Facebook URL | BRIEF.md says `facebook.com/NumNumPizzaGrill` — double-check this is the real URL |
| Open Graph image | Must be absolute URL in meta tags, not relative path |
| Favicon | BRIEF.md says "basert på logoen" — crop/resize PNG to 32×32 and 180×180 (Apple touch) |

---

## "Looks Done But Isn't" Checklist

Before calling any phase complete, verify:

- [ ] Tested on actual mobile device (not just browser DevTools)
- [ ] Tested on iPhone Safari (different behavior for `position: fixed` + scroll)
- [ ] Phone number is clickable and dials on mobile
- [ ] Dark mode is the default (not toggling to light on first load)
- [ ] All menu prices are correct (transcribed from BRIEF.md)
- [ ] Norwegian text has no English words accidentally left in
- [ ] Scroll to anchor sections works and heading is not hidden behind sticky bar

---

## Pitfall-to-Phase Mapping

| Pitfall | Phase | Priority |
|---------|-------|----------|
| Dark theme flash | Phase 1 | P0 — fix before any styling |
| `lang="nb"` | Phase 1 | P0 — one line |
| Logo layout shift | Phase 1 | P1 |
| Sticky bar scroll offset | Phase 2 | P0 — breaks nav without this |
| Menu tab accessibility | Phase 3 | P1 — primary feature |
| LocalBusiness JSON-LD | Phase 4 | P1 — important for local SEO |

---

*Research complete: 2026-02-23*
*Sources: Codebase analysis (layout.tsx, Navbar.tsx, Hero.tsx, DarkSwitch.tsx), PROJECT.md, CONCERNS.md, WCAG 2.1 AA patterns*
