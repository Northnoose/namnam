# Phase 3: Content Sections - Research

**Researched:** 2026-02-24
**Domain:** React component authoring — Hero, Om oss, Menu tabs, Levering, Footer — Next.js 14 App Router + Tailwind CSS v3 + Headless UI v2 + motion animation library
**Confidence:** HIGH

---

## Summary

Phase 3 is the largest phase of the project: it replaces every placeholder section in `src/app/page.tsx` and rewrites `src/components/Hero.tsx` and `src/components/Footer.tsx` with real Nam Nam Pizza & Grill content. The work spans five visual sections (Hero, Om oss, Meny, Levering, Footer/Kontakt) covering 36 requirements.

The stack is entirely determined by what is already installed: Next.js 14.2.3, Tailwind CSS v3.4, Headless UI v2.0.3, next-themes. The only new library addition is `motion` (npm package `motion`) for the hero fade-in/slide-up animation — a decision already locked in STATE.md. All other sections are pure Tailwind + React. No further library additions are needed or permitted.

The menu section is the most technically complex element: it requires Headless UI `TabGroup`/`TabList`/`Tab`/`TabPanels`/`TabPanel` for accessible category tabs, horizontally scrollable tab list on narrow mobile, and type-discriminated rendering for Grill (simple price), Hamburger (variant weight badges), Pizza (dual liten/stor price), Barnemeny (simple), and Drikke (simple). The `src/data/menu.ts` TypeScript types (`MenuItem`, `PizzaMenuItem`, `HamburgerMenuItem`) are already defined in Phase 1 — Phase 3 populates the arrays with real data from `BRIEF.md`.

**Primary recommendation:** Implement all five sections as individual server components (no `"use client"` except where required for interactivity). The menu tab component must be `"use client"` due to Headless UI's tab state. The hero animation component requires `"use client"` because `motion/react` uses browser APIs. Everything else (Om oss, Levering, Footer) can remain server components.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| HERO-01 | Hero shows `NamNamPizza&Grill.png` logo large and centered | `next/image` with `priority` — already used in Navbar; same pattern here at larger display size (e.g. 200–280px) |
| HERO-02 | Tagline: "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker!" | Static text in hero heading element |
| HERO-03 | Subtext: "Du ringer – Vi bringer! 📞 41 23 22 19" | Static paragraph |
| HERO-04 | "RING OG BESTILL" button is visible and initiates phone call (`tel:+4741232219`) | `<a href="tel:+4741232219">` with button styling |
| HERO-05 | "SE MENYEN" button smooth scrolls to menu section | `<a href="#meny">` — `scroll-behavior: smooth` already set in globals.css; `scroll-padding-top: 80px` already set |
| HERO-06 | Hero content has animated entry (fade-in/slide-up) on first load | `motion` library (`npm install motion`); `motion/react` import; `"use client"` wrapper; `initial`/`animate` props on `motion.div` |
| OM-01 | Section shows 2–3 sentences about the restaurant | Static text component |
| OM-02 | Address: Strandgata 11, 3340 Åmot | Static text in Om oss |
| OM-03 | Opening hours displayed visually: All days 13:00–23:00 | Visual display — could use a styled row/badge |
| OM-04 | Google Maps link opens map app/browser for address | `<a href="https://maps.google.com/?q=Strandgata+11,3340+Åmot" target="_blank" rel="noopener noreferrer">` |
| OM-05 | Google rating shown as static badge: "4.4/5 ⭐ (53 anmeldelser)" | Static text badge with star icon |
| MENU-01 | Menu shows tabs for 5 categories: 🔥 Grill \| 🍔 Hamburger \| 🍕 Pizza \| 👶 Barnemeny \| 🥤 Drikke | Headless UI `TabGroup`/`TabList`/`Tab` — already installed v2.0.3 |
| MENU-02 | Tab nav is keyboard/screen-reader accessible | Headless UI `Tab` component provides full ARIA `role="tab"` + `aria-selected` + keyboard arrow navigation automatically |
| MENU-03 | Tab list horizontally scrolls on narrow mobile (no wrapping) | `overflow-x-auto` on `TabList`, `whitespace-nowrap` on tabs, `flex-nowrap` |
| MENU-04 | Each menu item displayed as card with name, ingredients, price | Tailwind card: `rounded-lg border border-neutral-700 bg-neutral-800 p-4` |
| MENU-05 | Grill category — all 11 items with correct prices | Populate `menuCategories[0].items` in `src/data/menu.ts` from BRIEF.md |
| MENU-06 | Hamburger category — weight classes (100g/160g/250g/333g) as badges with prices | `HamburgerMenuItem.variants: HamburgerVariant[]` already typed; render each variant as a pill/badge |
| MENU-07 | Pizza category — all 20 pizzas (incl. calzone) with liten/stor price side by side | `PizzaMenuItem.priceLiten + priceStor` already typed; calzone has only one price (both set the same, or a separate flag) |
| MENU-08 | Barnemeny — 3 items with prices | Populate `menuCategories[3].items` |
| MENU-09 | Drikke — stor drikke, liten drikke, kuli with prices | Populate `menuCategories[4].items` |
| MENU-10 | "Nam Nam spesial" (Grill) has featured/highlighted styling | `featured: true` flag on item; conditional `ring-2 ring-orange-500` or similar badge overlay |
| MENU-11 | "Lag din egen pizza" (Pizza #17) has featured/highlighted styling | Same `featured: true` flag |
| MENU-12 | Offer badge visible: "🎉 TILBUD! 2 store valgfri pizza + 1.5L brus = kun 450,-" | Static banner component inside the menu section or at the top of the Pizza tab panel |
| MENU-13 | Menu cards have hover effect (subtle animation/shadow) | `hover:shadow-lg hover:scale-[1.02] transition-transform duration-200` Tailwind utilities |
| LEV-01 | Section heading: "Du ringer – Vi bringer!" | Static `<h2>` |
| LEV-02 | Explanation: call 41 23 22 19, order from menu, delivery within Modum municipality | Static text block |
| LEV-03 | Delivery surcharge kr 99,- prominently displayed | Highlighted badge or callout |
| LEV-04 | Payment methods at delivery: Vipps or kontant | Static text/icons |
| LEV-05 | Phone number is clickable `tel:+4741232219` link | `<a href="tel:+4741232219">` |
| FOOT-01 | Footer shows address: Strandgata 11, 3340 Åmot | Rewrite existing Footer.tsx |
| FOOT-02 | Phone number is clickable `tel:+4741232219` link | `<a href="tel:+4741232219">` in footer |
| FOOT-03 | Opening hours: All days 13:00–23:00 | Static text in footer |
| FOOT-04 | Facebook link to `facebook.com/NumNumPizzaGrill` | `<a href="https://facebook.com/NumNumPizzaGrill">` — note: URL discrepancy flagged in STATE.md blockers |
| FOOT-05 | Text: "Langs Riksvei 287 – Parkering utenfor!" | Static text in footer |
| FOOT-06 | Copyright line with restaurant name | `Copyright © {new Date().getFullYear()} Nam Nam Pizza & Grill` |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 14.2.3 (installed) | `next/image` for logo, App Router page structure | Already installed; `next/image` prevents CLS and lazy-loads images |
| react | ^18 (installed) | Component authoring, `"use client"` where needed | Already installed |
| tailwindcss | ^3.4.1 (installed) | All layout, typography, color, hover/transition utilities | Already installed; `dark:` variants, `hover:`, `transition` all needed |
| @headlessui/react | ^2.0.3 (installed) | `TabGroup`/`TabList`/`Tab`/`TabPanels`/`TabPanel` for accessible menu tabs | Already installed; v2 named exports — matches pattern already in use |
| motion | NOT YET INSTALLED | Hero fade-in/slide-up animation | Locked decision in STATE.md: "Add `motion` library for hero animation only" |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next-themes | ^0.3.0 (installed) | Dark mode class propagation (already active) | No new usage in Phase 3 — just ensure dark: variants work in new components |
| @heroicons/react | ^2.1.3 (installed) | Optional phone/location/clock icons | Use for Om oss and Levering visual polish if desired |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `motion` (npm package) | Tailwind CSS-only `animate-` classes | CSS-only approach cannot do fade-in + slide-up combined on mount; motion gives proper `initial`/`animate` lifecycle |
| `motion` | `framer-motion` | `motion` is the evolution of framer-motion — same API under `motion/react` import, smaller bundle (~4KB base vs ~32KB); locked decision is `motion` |
| Headless UI Tab | custom `useState` tab switcher | Custom tab needs manual ARIA attributes, keyboard handling, focus management — all handled by Headless UI automatically (MENU-02 requirement) |
| CSS `overflow-x: auto` for tab scroll | `flex-wrap` tabs | Wrapping tabs break horizontal layout on 320px mobile; `overflow-x-auto` with `whitespace-nowrap` is the correct fix |

**Installation:**
```bash
npm install motion
```

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   └── page.tsx              # Rewritten: import and render all 5 section components
├── components/
│   ├── Hero.tsx              # Rewritten: logo + tagline + CTAs + motion animation ("use client")
│   ├── OmOss.tsx             # New: about text, address, hours, Google Maps link, rating badge
│   ├── Meny.tsx              # New: Headless UI tabs + menu cards ("use client")
│   ├── Levering.tsx          # New: delivery info section
│   └── Footer.tsx            # Rewritten: Nam Nam contact info, copyright
└── data/
    └── menu.ts               # Populated: all 5 categories with real data from BRIEF.md
```

### Pattern 1: Hero Animation with `motion/react`

**What:** Fade-in + slide-up on mount using `motion.div` with `initial`/`animate` props.
**When to use:** Hero section only — locked decision from STATE.md.

```tsx
// "use client"
// Source: motion.dev/docs/react-quick-start
import { motion } from "motion/react";

export function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* logo, tagline, CTA buttons */}
    </motion.div>
  );
}
```

Note: Because `motion/react` uses browser APIs, any component using `motion.div` must be `"use client"`. The Hero component should be `"use client"` or extract the animated wrapper into a `"use client"` child component.

### Pattern 2: Headless UI v2 Tab API

**What:** Accessible tab group for 5 menu categories. `TabGroup` manages selected state. `Tab` provides `aria-selected` and keyboard navigation automatically.
**When to use:** Meny section for MENU-01 and MENU-02.

```tsx
// "use client" — required for Headless UI interactive components
// Source: headlessui.com/react/tabs
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";

export function MenuTabs() {
  return (
    <TabGroup>
      {/* MENU-03: horizontal scroll on narrow mobile */}
      <TabList className="flex overflow-x-auto whitespace-nowrap gap-2 pb-2">
        {menuCategories.map((cat) => (
          <Tab
            key={cat.id}
            className={({ selected }) =>
              `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selected
                  ? "bg-orange-600 text-white"
                  : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
              }`
            }
          >
            {cat.emoji} {cat.name}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-4">
        {menuCategories.map((cat) => (
          <TabPanel key={cat.id}>
            {/* render items per category type */}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
```

Headless UI v2 uses the named export API (`TabGroup`, `TabList`, `Tab`, `TabPanels`, `TabPanel`) — the dot-notation API (`Tab.Group`, `Tab.List`) is the deprecated v1 style.

### Pattern 3: Menu Item Type Discrimination

**What:** The `menuCategories` array holds items of different types. Use TypeScript type guards to render the correct card layout per type.

```tsx
// Source: TypeScript handbook — type narrowing
import type { MenuItem, PizzaMenuItem, HamburgerMenuItem } from "@/data/menu";

function isPizza(item: MenuItem): item is PizzaMenuItem {
  return "priceLiten" in item && "priceStor" in item;
}

function isHamburger(item: MenuItem): item is HamburgerMenuItem {
  return "variants" in item;
}

function MenuCard({ item }: { item: MenuItem }) {
  if (isPizza(item)) {
    return (
      <div className="...">
        <p>{item.name}</p>
        <p>Liten {item.priceLiten},- / Stor {item.priceStor},-</p>
      </div>
    );
  }
  if (isHamburger(item)) {
    return (
      <div className="...">
        <p>{item.name}</p>
        <div className="flex gap-2 flex-wrap">
          {item.variants.map((v) => (
            <span key={v.weight} className="px-2 py-1 bg-neutral-700 rounded-full text-sm">
              {v.weight} — {v.price},-
            </span>
          ))}
        </div>
      </div>
    );
  }
  // Default: plain MenuItem
  return (
    <div className="...">
      <p>{item.name}</p>
      <p>{item.price},-</p>
    </div>
  );
}
```

### Pattern 4: Calzone Price Handling

**What:** Calzone items (Pizza #18, 19, 20) have a single price, not liten/stor. The `PizzaMenuItem` type has `priceLiten` and `priceStor`.

**Decision needed:** Two options:
1. Store calzone as plain `MenuItem` (not `PizzaMenuItem`) in the pizza category array — but TypeScript would require `items` to accept `MenuItem | PizzaMenuItem | HamburgerMenuItem` which it already does.
2. Store calzone as `PizzaMenuItem` with `priceLiten = priceStor = 160` and hide the dual display when prices are equal.

**Recommendation:** Option 1 is cleaner. Plain `MenuItem` for calzone items in the pizza array. The type discriminator returns the simple card for those. Already supported by the `MenuCategory.items` union type.

### Pattern 5: Featured Item Highlighting

**What:** MENU-10 and MENU-11 require "Nam Nam spesial" (Grill) and "Lag din egen pizza" (Pizza #17) to have special featured styling. The `MenuItem.featured?: boolean` field is already defined in Phase 1.

```tsx
// Conditional featured styling on card wrapper
<div
  className={`rounded-lg border p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]
    ${item.featured
      ? "border-orange-500 ring-1 ring-orange-500 bg-neutral-800"
      : "border-neutral-700 bg-neutral-800"
    }`}
>
  {item.featured && (
    <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full mb-2 inline-block">
      Anbefalt
    </span>
  )}
  {/* rest of card */}
</div>
```

### Anti-Patterns to Avoid

- **Using `"use client"` on page.tsx**: The top-level page should stay a Server Component. Extract interactive sections (Hero animation, Meny tabs) into separate `"use client"` child components.
- **Inline menu data in component files**: All menu data lives in `src/data/menu.ts`. Never duplicate data in component files.
- **Using `framer-motion` import**: The npm package is `motion`, and the React import is `motion/react`. Do not use `framer-motion` — that is the old package name.
- **Dot-notation Headless UI API**: `Tab.Group`, `Tab.List` etc. are the deprecated v1 API. Use v2 named exports: `TabGroup`, `TabList`, `Tab`, `TabPanels`, `TabPanel`.
- **`flex flex-wrap` on tab list**: This causes tabs to wrap on narrow screens. Use `flex overflow-x-auto whitespace-nowrap` for horizontal scroll (MENU-03).
- **`<Image>` without explicit width/height**: The `next/image` component requires explicit `width` and `height` props (or `fill` with sized container) to prevent CLS. Logo is 1024x1024.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible tab navigation | Custom `useState` tabs with manually set `aria-selected`, `role="tab"`, arrow key handlers | Headless UI `TabGroup` | ARIA spec for tabs is complex (roving tabindex, arrow keys, Home/End); Headless UI handles all of it |
| Hero animation | CSS keyframe animation in globals.css | `motion/react` `motion.div` with `initial`/`animate` | CSS-only can't do `opacity: 0 → 1` + `translateY: 32px → 0` in sync on component mount without flash; motion handles this correctly |
| Type guards for menu items | `(item as any).priceLiten` unsafe casts | TypeScript `"priceLiten" in item` type guard | Ensures type safety at compile time; avoids runtime errors for missing properties |

**Key insight:** The two components that need libraries (Hero animation, Menu tabs) both use already-planned libraries. Everything else in Phase 3 is static markup + Tailwind — no additional complexity.

---

## Common Pitfalls

### Pitfall 1: Hero Logo Sizing
**What goes wrong:** Setting `next/image` `width={1024}` renders a 1024px image; setting just CSS classes without proper width prop causes Next.js warnings.
**Why it happens:** `next/image` uses the `width`/`height` props for intrinsic size and aspect ratio, not display size. CSS classes control display size.
**How to avoid:** Set `width={280} height={280}` (or desired intrinsic size) and use `className="w-[200px] h-auto lg:w-[280px]"` to control responsive display size.
**Warning signs:** Next.js console warning about missing `width`/`height` props.

### Pitfall 2: `motion` library `"use client"` propagation
**What goes wrong:** Adding `import { motion } from "motion/react"` to a Server Component causes a build error because motion uses browser APIs.
**Why it happens:** Next.js App Router requires explicit `"use client"` boundary at the top of any file using browser-specific code.
**How to avoid:** Add `"use client"` as the first line of `Hero.tsx` (or a `HeroContent.tsx` child component).
**Warning signs:** Next.js build error: `You're importing a component that needs "use client"`.

### Pitfall 3: Headless UI Tab `selected` class function signature
**What goes wrong:** Writing `className={selected ? "..." : "..."}` causes a TypeScript error because `Tab` passes `{ selected, disabled }` as render prop argument.
**Why it happens:** In Headless UI v2, Tab passes a render prop to `className` as a function.
**How to avoid:** Use `className={({ selected }) => selected ? "..." : "..."}` function form.
**Warning signs:** TypeScript error on `selected` being undefined, or tab styling never changes on click.

### Pitfall 4: Calzone price display with PizzaMenuItem type
**What goes wrong:** Rendering `item.priceLiten` and `item.priceStor` for calzone shows duplicated/wrong prices.
**Why it happens:** Calzone (#18, #19, #20 in BRIEF.md) has a single flat price, not a liten/stor price pair.
**How to avoid:** Store calzone items as plain `MenuItem` (not `PizzaMenuItem`) in the pizza `items` array. The type discriminator `isPizza()` returns false and the simple card renders with `item.price`.
**Warning signs:** Calzone shows "Liten 160,- / Stor 160,-" which looks odd.

### Pitfall 5: Facebook URL discrepancy
**What goes wrong:** BRIEF.md says `facebook.com/NumNumPizzaGrill` but restaurant name is "Nam Nam". This URL may not be the correct live URL.
**Why it happens:** The brief was provided with this URL. It may be a typo or the actual registered Facebook username.
**How to avoid:** STATE.md already has this as a blocker: "Facebook URL discrepancy: BRIEF.md says `NumNumPizzaGrill` — verify actual Facebook URL before footer link goes live". Implement with the URL as given in BRIEF.md for now. Add a `// TODO: verify Facebook URL` comment.
**Warning signs:** Broken Facebook link in footer.

### Pitfall 6: `scroll-padding-top` and hero section without ID
**What goes wrong:** The "SE MENYEN" button links to `#meny`. If the meny `<section id="meny">` doesn't have the ID attribute in page.tsx, the scroll goes to the top.
**Why it happens:** Phase 2 added placeholder sections with IDs to page.tsx. Phase 3 replaces those placeholders with real sections — the `id` attributes must be preserved.
**How to avoid:** Every section component must either accept `id` prop or the section wrapper in page.tsx must set `id="meny"`, `id="om-oss"`, etc. on the outer element.
**Warning signs:** "SE MENYEN" button scrolls to top of page instead of menu section.

---

## Code Examples

Verified patterns from official sources and installed package versions:

### motion/react fade-in + slide-up on mount

```tsx
// "use client"
// Source: motion.dev/docs/react-quick-start (current as of 2025)
import { motion } from "motion/react";

// Simple one-pass fade-in + slide-up
<motion.div
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {children}
</motion.div>

// Staggered children (optional for logo + text + buttons)
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  {/* logo */}
</motion.div>
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
>
  {/* tagline + subtext */}
</motion.div>
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.5 }}
>
  {/* CTA buttons */}
</motion.div>
```

### Headless UI v2 Tab — complete minimal example

```tsx
// "use client"
// Source: headlessui.com/react/tabs (verified v2 API, 2025)
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";

<TabGroup>
  <TabList className="flex overflow-x-auto whitespace-nowrap gap-2 pb-2">
    <Tab className={({ selected }) =>
      `px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 shrink-0 ${
        selected ? "bg-orange-600 text-white" : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
      }`
    }>
      🔥 Grill
    </Tab>
    {/* ... more tabs */}
  </TabList>
  <TabPanels className="mt-6">
    <TabPanel>
      {/* Grill items */}
    </TabPanel>
    {/* ... more panels */}
  </TabPanels>
</TabGroup>
```

### Page structure in page.tsx

```tsx
// src/app/page.tsx — Server Component (no "use client")
import { Hero } from "@/components/Hero";       // "use client" internally
import { OmOss } from "@/components/OmOss";     // Server Component
import { Meny } from "@/components/Meny";       // "use client" internally
import { Levering } from "@/components/Levering"; // Server Component

export default function Home() {
  return (
    <>
      <Hero />
      <section id="om-oss"><OmOss /></section>
      <section id="meny"><Meny /></section>
      <section id="levering"><Levering /></section>
      {/* Kontakt is the footer — id="kontakt" is on layout's Footer wrapper or footer element */}
    </>
  );
}
```

Note: The layout.tsx already renders `<Footer />` outside of `{children}`. The footer needs `id="kontakt"` added to it or a wrapper in layout.tsx, since the Navbar links to `#kontakt`.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` npm package | `motion` npm package with `motion/react` import | 2024 (motion v11+ rebranded) | Import path changed; API is largely the same |
| `Tab.Group`, `Tab.List` dot notation | `TabGroup`, `TabList` named exports | Headless UI v2 (2024) | Already using v2; must use named exports, not dot notation |
| Hero component with placeholder SVGs and `[TOKEN]` text | Complete Hero with real brand content | Phase 3 (now) | Entire Hero.tsx is rewritten from scratch |
| Footer with template placeholders | Nam Nam-specific footer | Phase 3 (now) | Footer.tsx rewritten: address, phone, hours, Facebook, copyright |

**Deprecated/outdated in this project:**
- `Disclosure.Button` / `Disclosure.Panel` dot notation: deprecated in v2, already migrated in Phase 2's Navbar.tsx
- Hero.tsx placeholder structure (BrandLogo1–5 SVGs): fully replaced in Phase 3
- Footer.tsx navigation/legal link arrays: fully replaced in Phase 3

---

## Open Questions

1. **`id="kontakt"` placement for Footer anchor**
   - What we know: `layout.tsx` renders `<Footer />` outside of `{children}`. The Navbar links to `#kontakt`. The section placeholder in the old page.tsx had `id="kontakt"`.
   - What's unclear: Should `Footer.tsx` itself have the `id="kontakt"` on its root element, or should layout.tsx wrap it in `<div id="kontakt">`?
   - Recommendation: Add `id="kontakt"` to the outermost `<div>` or `<footer>` element in `Footer.tsx`. This is the cleanest approach without modifying layout.tsx.

2. **Hero layout: logo placement**
   - What we know: HERO-01 says logo "stort og sentralt" (large and centered). The existing Hero.tsx has a two-column layout (text left, image right) from the template.
   - What's unclear: Centered single-column layout vs. the existing two-column layout?
   - Recommendation: Single-column centered layout for this restaurant site. Logo centered above text, then tagline + subtext centered below, then CTA buttons centered. This matches the brief's "stort og sentralt" requirement and is simpler.

3. **Section wrapper `id` attributes in page.tsx**
   - What we know: page.tsx currently wraps sections in `<section id="om-oss">`, `<section id="meny">`, etc.
   - What's unclear: Should each section component handle its own `id`, or should page.tsx set them on `<section>` wrappers?
   - Recommendation: Keep the `<section id="...">` wrapper in page.tsx. Each section component just renders its content without the `id`. This gives page.tsx clear control over the page structure and makes components reusable.

---

## Sources

### Primary (HIGH confidence)
- Headless UI official docs (headlessui.com/react/tabs) — Tab v2 API, keyboard accessibility, named exports
- motion.dev official docs — motion/react import, `initial`/`animate` props, `"use client"` requirement
- Next.js 14 official docs — `next/image` width/height props, Server Components, `"use client"` boundaries
- src/data/menu.ts (project codebase) — verified type definitions: `MenuItem`, `PizzaMenuItem`, `HamburgerMenuItem`
- BRIEF.md (project codebase) — complete menu data, all prices, section content, Facebook URL
- STATE.md (project codebase) — locked decision: `motion` library for hero animation only
- package.json (project codebase) — confirmed installed packages and versions

### Secondary (MEDIUM confidence)
- WebSearch: "motion npm package standalone animation library vs framer-motion 2025" — confirmed `motion` is the current package name, `motion/react` is the React import path
- WebSearch: "Headless UI Tab component React 2025" — confirmed named export API, Tab className function signature

### Tertiary (LOW confidence)
- None — all critical findings verified against installed packages and official docs

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages verified from package.json; motion library decision locked in STATE.md
- Architecture: HIGH — patterns verified from Headless UI v2 official docs and existing codebase patterns
- Pitfalls: HIGH — derived from code inspection of actual TypeScript types and existing implementation
- Menu data: HIGH — all prices and items sourced directly from BRIEF.md

**Research date:** 2026-02-24
**Valid until:** Stable — Next.js 14, Tailwind CSS v3, Headless UI v2 are stable releases. motion API is current as of 2025.
