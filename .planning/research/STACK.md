# Stack Research: Nam Nam Pizza & Grill Restaurant SPA

**Domain:** Restaurant/fastfood single-page website
**Milestone:** Greenfield (adapting existing Next.js 14 + Tailwind template)
**Researched:** 2026-02-23

---

## Recommendation: Keep Existing Stack

**Decision: No stack changes.** The existing template already has the optimal stack for this use case. Add only two targeted libraries.

---

## Current Stack (Keep As-Is)

| Layer | Technology | Version | Status |
|-------|-----------|---------|--------|
| Framework | Next.js | 14.2.3 | ✓ Keep — do NOT upgrade to 16.x |
| Runtime | React | 18.x | ✓ Keep |
| Language | TypeScript | 5.x | ✓ Keep |
| Styling | Tailwind CSS | 3.4.x (v3-lts) | ✓ Keep — do NOT upgrade to v4 |
| Dark mode | next-themes | 0.3.0 | ✓ Keep (0.4.6 available but not required) |
| UI primitives | @headlessui/react | 2.0.3 | ✓ Keep — Tab component covers menu tabs |
| Icons | heroicons / @heroicons/react | installed | ✓ Keep |

---

## Add: One Targeted Library

### `motion` (Framer Motion) — For Animations

```bash
npm install motion
```

| Property | Value |
|----------|-------|
| Package | `motion` (was `framer-motion`) |
| Version | 12.34.3 (verified npm registry 2026-02-23) |
| Use case | Hero entrance animation (fade-in/slide-up), optional scroll-triggered reveals |
| Confidence | HIGH |

**Why:** BRIEF.md explicitly requires "animert inngang (fade-in/slide-up)" on the hero. Pure CSS animation is an alternative but `motion` gives smoother control and `whileInView` for scroll-triggered card reveals.

**What NOT to use:**
- `react-scroll` — unnecessary; CSS `scroll-behavior: smooth` handles anchor navigation
- `aos` (Animate on Scroll) — adds global DOM observers; overkill for 5-6 sections
- `gsap` — enterprise-tier, unnecessary complexity

---

## Menu Tabs: No New Library Needed

**Use `@headlessui/react` Tab** — already installed at 2.0.3.

```tsx
import { Tab } from '@headlessui/react'
// Tab.Group, Tab.List, Tab.Panels — covers all 5 menu categories
```

**Why not others:**
- `react-tabs` — redundant with @headlessui already installed
- Custom implementation — @headlessui provides accessibility (keyboard nav, ARIA) for free

---

## Navigation / Scroll: CSS Only

```css
/* globals.css */
html {
  scroll-behavior: smooth;
}
```

```tsx
// Anchor links — plain <a>, NOT Next.js <Link>
<a href="#meny">Se menyen</a>

// Section targets
<section id="meny">...</section>
```

**Why NOT `react-scroll`:** Adds 40kb for functionality CSS provides natively. Scroll offset for sticky navbar handled via `scroll-margin-top` CSS property on section elements.

---

## Static Export Configuration

For a purely static restaurant site (no API routes, no server-side rendering needed):

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  images: { unoptimized: true }, // Required for static export
}
```

**Confidence:** MEDIUM — verify if hosting requires this. Vercel/Netlify handle Next.js natively without `output: 'export'`. Only add if deploying to static hosting (GitHub Pages, etc.).

---

## What NOT to Add

| Library | Reason to Skip |
|---------|---------------|
| `react-scroll` | CSS `scroll-behavior: smooth` is sufficient |
| Tailwind v4 | Breaking change; v3-lts (3.4.x) actively maintained |
| Next.js 16.x | Template is on 14.2.3; upgrading risks breakage |
| `react-query` / `swr` | No API calls; all data is static |
| `zustand` / `redux` | State is local to MenuTabs (single `useState`) |
| `react-hook-form` | No forms needed (contact is phone only) |
| Image CDN library | `next/image` covers optimization needs |

---

## Confidence Summary

| Area | Confidence | Basis |
|------|-----------|-------|
| Keep existing stack | HIGH | Working template, no breaking changes needed |
| @headlessui for tabs | HIGH | Already installed, documented Tab API |
| motion for animations | HIGH | npm registry verified 2026-02-23 |
| CSS scroll | HIGH | Native browser support, well-established pattern |
| Static export config | MEDIUM | Depends on deployment target |

---

*Research complete: 2026-02-23*
*Verified: motion@12.34.3, @headlessui/react@2.0.3 (installed), Next.js@14.2.3, Tailwind v3.4.x*
