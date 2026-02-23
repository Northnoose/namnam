# Architecture Research

**Domain:** Restaurant single-page website (SPA) — Nam Nam Pizza & Grill
**Researched:** 2026-02-23
**Confidence:** HIGH (Next.js official docs verified; structural patterns from existing codebase analysis)

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                     Browser (User Visit)                          │
└──────────────────────────┬───────────────────────────────────────┘
                           │ GET /
┌──────────────────────────▼───────────────────────────────────────┐
│                  Next.js App Router (RSC)                         │
│  src/app/layout.tsx  ──────────────────────────────────────────  │
│    ThemeProvider > Navbar > {children} > Footer > StickyCallBar  │
├──────────────────────────────────────────────────────────────────┤
│  src/app/page.tsx  (Page Layer — Server Component)               │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Hero    │ │  About   │ │  Menu    │ │ Delivery │            │
│  │ Section  │ │ Section  │ │ Section  │ │ Section  │            │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘            │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                   Contact / Footer                       │    │
│  └─────────────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────────────┤
│                  Component Layer (src/components/)                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │
│  │ Container│  │SectionTitle│ │MenuTabs  │  │StickyCallBar  │   │
│  │ (layout) │  │(heading) │  │(client)  │  │(client)       │   │
│  └──────────┘  └──────────┘  └──────────┘  └───────────────┘   │
├──────────────────────────────────────────────────────────────────┤
│                    Data Layer (src/data/)                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  menuData.ts  (typed static data — categories + items)   │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Communicates With |
|-----------|----------------|-------------------|
| `Navbar` | Sticky top bar with logo, anchor nav links, phone CTA | layout.tsx; smooth scroll targets via `href="#section-id"` |
| `Hero` | Logo, tagline, "Ring for å bestille" + "Se meny" CTAs, fade-in animation | None (self-contained) |
| `About` | Address, opening hours, Google Maps link, restaurant description | None (static) |
| `Menu` | Tabbed interface for 5 categories; renders `MenuCard` children | `menuData.ts` for category + item data |
| `MenuTabs` | Tab state management (active category), renders filtered items | Owned by `Menu`; consumes `menuData.ts` |
| `MenuCard` | Single menu item card: name, description, price, hover effect | Rendered by `MenuTabs` |
| `Delivery` | Delivery zone, fee, payment methods, "Du ringer – Vi bringer!" | None (static) |
| `StickyCallBar` | Fixed bottom bar: tel: link to 41 23 22 19, always visible | None (self-contained client component) |
| `Footer` | Address, phone, hours, Facebook link, copyright | None (static) |
| `Container` | Max-width + horizontal padding wrapper | Used by all section components |
| `SectionTitle` | Reusable heading with optional pre-title; alignment prop | Used by section components |
| `DarkSwitch` | Dark/light theme toggle with hydration guard | next-themes via `useTheme()` |

## Recommended Project Structure

The existing flat component structure is appropriate for this project's scale. Introduce a `src/data/` directory for typed menu data (upgrade from `src/components/data.js`):

```
src/
├── app/
│   ├── layout.tsx          # Root layout: ThemeProvider, Navbar, Footer, StickyCallBar
│   ├── page.tsx            # Page: composes Hero, About, Menu, Delivery sections
│   ├── globals.css         # Global styles, scroll-behavior: smooth
│   └── favicon.ico
├── components/             # Flat component directory (keep existing convention)
│   ├── Navbar.tsx          # Client component — anchor links, Disclosure mobile menu
│   ├── Hero.tsx            # Server component — static, animated via CSS
│   ├── About.tsx           # Server component — address, hours, map link
│   ├── Menu.tsx            # Server component shell — passes menuData to MenuTabs
│   ├── MenuTabs.tsx        # Client component — tab state, renders MenuCard list
│   ├── MenuCard.tsx        # Server/client component — single menu item card
│   ├── Delivery.tsx        # Server component — delivery info
│   ├── StickyCallBar.tsx   # Client component — fixed bottom tel: link
│   ├── Footer.tsx          # Server component — static contact info
│   ├── Container.tsx       # Existing layout wrapper
│   ├── SectionTitle.tsx    # Existing heading component
│   └── DarkSwitch.tsx      # Existing theme toggle
├── data/
│   └── menu.ts             # Typed menu data — categories and items
└── types.ts                # Shared TypeScript types (extend with MenuCategory, MenuItem)
```

### Structure Rationale

- **`src/data/menu.ts`:** Separates content from components. Menu data is the primary maintainability concern — isolating it means updating prices/items never requires touching component logic.
- **Flat `src/components/`:** Consistent with existing codebase convention. Project has ~10-12 components; subdirectories add navigation overhead without benefit.
- **`globals.css` — `scroll-behavior: smooth`:** Single CSS declaration enables native smooth scrolling for all anchor navigation, no JavaScript required.

## Architectural Patterns

### Pattern 1: Anchor-Based SPA Navigation (Next.js App Router)

**What:** Use `href="/#section-id"` on `next/link` and plain `<a>` elements in Navbar; place `id="section-id"` on each section's root element. CSS `scroll-behavior: smooth` on `html` handles animation.

**When to use:** Always, for this SPA. The entire site is a single route (`/`). No page transitions needed.

**Trade-offs:** Simple, zero dependencies, excellent mobile performance. Hash links appear in browser history by default; use `scroll={false}` on `<Link>` if you want to prevent this.

**Example:**

```tsx
// src/app/globals.css
html {
  scroll-behavior: smooth;
}

// src/components/Navbar.tsx (Client Component)
"use client";
import Link from "next/link";

const navItems = [
  { label: "Hjem", href: "#hero" },
  { label: "Om oss", href: "#om-oss" },
  { label: "Meny", href: "#meny" },
  { label: "Levering", href: "#levering" },
  { label: "Kontakt", href: "#kontakt" },
];

// Use <a> tags for same-page anchors to avoid Next.js prefetch overhead:
<a href="#meny" className="...">Meny</a>

// src/app/page.tsx
<section id="hero"><Hero /></section>
<section id="om-oss"><About /></section>
<section id="meny"><Menu data={menuData} /></section>
<section id="levering"><Delivery /></section>
<section id="kontakt"><Footer /></section>
```

**Note on `<Link>` vs `<a>` for anchors:** For same-page hash navigation within a SPA, plain `<a href="#section-id">` is preferred over `<Link href="/#section-id">`. The `<Link>` component is optimized for route-to-route navigation with prefetching; for same-page scrolling it adds no benefit and may cause scroll-to-top behavior. Official Next.js docs confirm: `<Link href="/dashboard#settings">` appends hash, but for same-page scrolling the `<a>` element is simpler and correct.

**Confidence:** HIGH — Verified against Next.js 16.1.6 official documentation (2026-02-20).

---

### Pattern 2: Typed Static Menu Data

**What:** Define menu data in `src/data/menu.ts` with TypeScript interfaces. Components import and render this data. No CMS, no API calls.

**When to use:** Always, for this project. Content is static. Maintainability means prices and items are easy to find and edit.

**Trade-offs:** Fast (no network), simple (no async), but requires a code deploy to update content. Acceptable given the project's static constraint.

**Example:**

```typescript
// src/data/menu.ts

export interface MenuItem {
  id: string;
  name: string;
  description?: string;  // optional — not all items have descriptions
  price: number;         // in NOK, integer (avoid floats for money)
  popular?: boolean;     // optional badge for featured items
}

export interface MenuCategory {
  id: string;
  label: string;         // display name, Norwegian
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: "grill",
    label: "Grill",
    items: [
      {
        id: "grill-1",
        name: "Kebab",
        description: "Med salat, tomat og saus",
        price: 149,
        popular: true,
      },
      // ...
    ],
  },
  {
    id: "hamburger",
    label: "Hamburger",
    items: [...],
  },
  {
    id: "pizza",
    label: "Pizza",
    items: [...],
  },
  {
    id: "barnemeny",
    label: "Barnemeny",
    items: [...],
  },
  {
    id: "drikke",
    label: "Drikke",
    items: [...],
  },
];
```

---

### Pattern 3: Client/Server Component Split for Menu Tabs

**What:** `Menu.tsx` is a Server Component that imports `menuData` and passes it as props to `MenuTabs.tsx`, which is a Client Component managing active tab state with `useState`.

**When to use:** Whenever interactive state (tab selection) is needed inside an otherwise static section.

**Trade-offs:** Keeps interactivity isolated to the smallest possible Client Component surface. The data import and rendering of the static shell remains on the server.

**Example:**

```tsx
// src/components/Menu.tsx — Server Component (no "use client")
import { MenuTabs } from "./MenuTabs";
import { menuData } from "@/data/menu";

export const Menu = () => {
  return (
    <div>
      <SectionTitle>Vår Meny</SectionTitle>
      <MenuTabs categories={menuData} />
    </div>
  );
};

// src/components/MenuTabs.tsx — Client Component
"use client";
import { useState } from "react";
import { MenuCard } from "./MenuCard";
import type { MenuCategory } from "@/data/menu";

interface MenuTabsProps {
  categories: MenuCategory[];
}

export const MenuTabs = ({ categories }: MenuTabsProps) => {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const active = categories.find((c) => c.id === activeId);

  return (
    <>
      {/* Tab buttons */}
      <div role="tablist" className="flex gap-2 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            role="tab"
            aria-selected={cat.id === activeId}
            onClick={() => setActiveId(cat.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
              cat.id === activeId
                ? "bg-orange-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Item grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {active?.items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};
```

---

### Pattern 4: Sticky Call-to-Action Bar

**What:** A fixed bottom bar containing a prominent `tel:` link to the phone number, always visible as the user scrolls. Implemented as a Client Component to allow potential future interaction (e.g., hide after X seconds).

**When to use:** This is the primary conversion mechanism for the site. Must be visible at all times.

**Trade-offs:** Uses `position: fixed` which removes element from normal flow; requires bottom padding on page content to avoid content being hidden behind the bar.

**Example:**

```tsx
// src/components/StickyCallBar.tsx
"use client";

export const StickyCallBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-orange-500 dark:bg-orange-600">
      <a
        href="tel:+4741232219"
        className="flex items-center justify-center gap-3 py-4 text-white font-bold text-lg"
        aria-label="Ring oss: 41 23 22 19"
      >
        {/* Phone icon */}
        <span>Ring for å bestille</span>
        <span>41 23 22 19</span>
      </a>
    </div>
  );
};

// src/app/layout.tsx — add StickyCallBar inside ThemeProvider
// Add pb-16 or pb-20 to page body to prevent content hiding behind bar
```

## Data Flow

### Page Render Flow

```
Browser requests /
       |
Next.js App Router → src/app/layout.tsx (Server Component)
       |                    |
       |              ThemeProvider (Client — next-themes)
       |              Navbar (Client — anchor links, mobile Disclosure)
       |              StickyCallBar (Client — tel: link)
       |              Footer (Server — static)
       |
       └→ src/app/page.tsx (Server Component)
              |
              ├─ Hero (Server — static, CSS animation)
              ├─ About (Server — static)
              ├─ Menu (Server — imports menuData, passes to MenuTabs)
              │      └─ MenuTabs (Client — useState for active tab)
              │              └─ MenuCard[] (renders items)
              ├─ Delivery (Server — static)
              └─ Footer content (Server — static)
```

### State Management

All state is component-local. No global state manager needed.

| State | Owner | Mechanism |
|-------|-------|-----------|
| Active menu tab | `MenuTabs` | `useState` |
| Dark/light theme | `ThemeProvider` + `DarkSwitch` | next-themes (`localStorage` + CSS class) |
| Mobile nav open/close | `Navbar` (Disclosure) | Headless UI `Disclosure` |

### Data Direction

```
src/data/menu.ts
       |
       ↓ (imported at build time)
Menu (Server Component)
       |
       ↓ (passed as props)
MenuTabs (Client Component)
       |
       ↓ (rendered per item)
MenuCard (presentational)
```

Data flows one direction: source file → server component → client component → presentational leaf. No callbacks flow upward from MenuCard.

## Suggested Build Order

Dependencies determine order. Build foundational pieces before dependent ones.

| Step | Component/File | Why First |
|------|----------------|-----------|
| 1 | `src/data/menu.ts` | All menu components depend on this data shape |
| 2 | `src/types.ts` (extend) | TypeScript types needed before components |
| 3 | `src/app/globals.css` (scroll-behavior) | Single-line; enables anchor scrolling globally |
| 4 | `src/components/Container.tsx` | Already exists; verify it fits new layout |
| 5 | `src/components/SectionTitle.tsx` | Already exists; used in About, Menu, Delivery |
| 6 | `src/components/Hero.tsx` | Top of page; no dependencies on other sections |
| 7 | `src/components/About.tsx` | Simple static section; no dependencies |
| 8 | `src/components/MenuCard.tsx` | Leaf component; needed by MenuTabs |
| 9 | `src/components/MenuTabs.tsx` | Depends on MenuCard + menu.ts types |
| 10 | `src/components/Menu.tsx` | Depends on MenuTabs + menuData |
| 11 | `src/components/Delivery.tsx` | Simple static section; no dependencies |
| 12 | `src/components/StickyCallBar.tsx` | Self-contained; add to layout last |
| 13 | `src/components/Navbar.tsx` | Update with anchor links + brand identity |
| 14 | `src/components/Footer.tsx` | Update with Nam Nam contact info |
| 15 | `src/app/page.tsx` | Composes all sections with `id` anchors |
| 16 | `src/app/layout.tsx` | Wire up StickyCallBar, update metadata |

**Rationale:** Data and types first so components have correct shapes. Leaf components (MenuCard) before containers (MenuTabs, Menu). Static sections before interactive ones. Layout and page composition last, after all pieces exist.

## Anti-Patterns

### Anti-Pattern 1: Using `next/link` for Same-Page Anchor Scrolling

**What people do:** `<Link href="/#meny">Meny</Link>` in Navbar for same-page anchors.

**Why it's wrong:** `<Link>` is optimized for route-to-route navigation. On a SPA with a single route (`/`), the prefetching and client-side transition overhead is unnecessary. It can also trigger scroll-to-top behavior before the anchor scroll, causing a visible jump on mobile.

**Do this instead:** Use plain `<a href="#meny">Meny</a>` for same-page scrolling. Reserve `<Link>` for actual route transitions. Enable `scroll-behavior: smooth` in CSS on `html`.

---

### Anti-Pattern 2: Putting Menu State in a Global Store or Context

**What people do:** Create a React Context or Zustand store for the active menu tab.

**Why it's wrong:** The active tab state is only relevant to the Menu section. Elevating it globally adds unnecessary complexity with no benefit. No other component needs to know which tab is active.

**Do this instead:** Keep `useState` inside `MenuTabs`. Component-local state is the right abstraction here.

---

### Anti-Pattern 3: Server Component for Interactive Tabs

**What people do:** Mark `MenuTabs` as a Server Component (no `"use client"`) to avoid client bundle overhead.

**Why it's wrong:** Tab switching requires `useState`, which requires a Client Component. Forgetting `"use client"` on `MenuTabs` causes a runtime error in Next.js App Router.

**Do this instead:** Keep `Menu.tsx` as a Server Component for data import; make `MenuTabs.tsx` a Client Component for state. This is the correct client/server boundary pattern in Next.js App Router.

---

### Anti-Pattern 4: Embedding Menu Data Inside Components

**What people do:** Define menu items as arrays directly inside `Menu.tsx` or `MenuTabs.tsx`.

**Why it's wrong:** Updating a price or adding an item requires finding and editing component logic. Risk of accidentally breaking JSX structure when editing pure data.

**Do this instead:** All menu data lives in `src/data/menu.ts`. Components only render; they never define content. This is the maintainability pattern the PROJECT.md calls out as a key decision.

---

### Anti-Pattern 5: Omitting Section `id` Attributes

**What people do:** Place sections in `page.tsx` without adding `id` attributes.

**Why it's wrong:** Anchor navigation (`<a href="#meny">`) silently does nothing — no scroll occurs, but there is also no error. Mobile users clicking nav links get no response.

**Do this instead:**

```tsx
// src/app/page.tsx
<section id="hero"><Hero /></section>
<section id="om-oss"><About /></section>
<section id="meny"><Menu data={menuData} /></section>
<section id="levering"><Delivery /></section>
<section id="kontakt"><Footer /></section>
```

Every nav link target must have a matching `id` on a root element in `page.tsx`.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| `tel:` protocol | Plain `<a href="tel:+4741232219">` | No library; native browser handles call initiation on mobile |
| Google Maps | Plain `<a href="https://maps.google.com/...">` | External link, `target="_blank"` + `rel="noopener noreferrer"` |
| Facebook | Plain `<a href="https://facebook.com/NumNumPizzaGrill">` | External link, same pattern |
| next-themes | `ThemeProvider` in layout, `useTheme()` in `DarkSwitch` | Already integrated in template |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `layout.tsx` ↔ `Navbar` | `Navbar` is a Client Component; receives no props (self-contained nav) | Anchor hrefs are hardcoded strings |
| `page.tsx` ↔ `Menu` | Server-to-server; passes `menuData` as prop | No client boundary at this layer |
| `Menu` ↔ `MenuTabs` | Server-to-client boundary; `menuData` prop crosses as serializable data | TypeScript types enforce shape |
| `MenuTabs` ↔ `MenuCard` | Client-to-client; item prop per card | Simple prop pass-down |

## Sources

- Next.js 16.1.6 official documentation — Linking and Navigating: https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating (verified 2026-02-20, HIGH confidence)
- Next.js 16.1.6 official documentation — Link Component, "Scrolling to an id": https://nextjs.org/docs/app/api-reference/components/link#scrolling-to-an-anchor (verified 2026-02-20, HIGH confidence)
- Existing codebase analysis: `src/app/layout.tsx`, `src/app/page.tsx`, `src/components/Navbar.tsx`, `src/components/data.js`, `src/components/Hero.tsx`, `src/components/Faq.tsx` — HIGH confidence (direct source read)
- PROJECT.md constraints and requirements — HIGH confidence (project definition)

---
*Architecture research for: Restaurant SPA — Nam Nam Pizza & Grill*
*Researched: 2026-02-23*
