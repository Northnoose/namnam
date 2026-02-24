# Phase 1: Foundation - Research

**Researched:** 2026-02-24
**Domain:** Next.js 14 App Router — dark theme, lang attribute, next/image, TypeScript data model, responsive layout
**Confidence:** HIGH

---

## Summary

Phase 1 establishes the technical base that every subsequent phase builds on. All five requirements are small, targeted changes to existing files — not new systems. The project is an existing Next.js 14.2.3 + Tailwind 3.4.x + next-themes 0.3.0 template. No new libraries are needed for this phase.

The three highest-risk items are the FOUC fix, the logo image dimensions, and creating the TypeScript data model. The FOUC fix (`ThemeProvider` props) is a one-line change with high visibility — getting it wrong means a white flash on every page load. The logo PNG is confirmed at 1024x1024 pixels, which directly determines the `width`/`height` values for `next/image`. The `src/data/menu.ts` file does not exist yet and must be created with correct TypeScript types before Phase 3 can proceed.

The `lang="en"` attribute in `layout.tsx` is a confirmed single-line fix. Responsive layout already works at the Container component level — the template's Tailwind configuration and Navbar's `Disclosure` (mobile hamburger) are intact, so FOUND-05 is satisfied by verifying breakpoints, not building new structure.

**Primary recommendation:** Fix `layout.tsx` first (FOUC + lang), then measure and wire logo image, then create `src/data/` with typed menu data. Responsive layout verification is the final checkpoint, not an implementation task.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Siden bruker mørkt tema som standard uten synlig flash ved lasting (FOUC-fri) | ThemeProvider must have `defaultTheme="dark" enableSystem={false}` — confirmed fix pattern |
| FOUND-02 | HTML har `lang="nb"` (norsk bokmål) for korrekt SEO og skjermleser-uttale | `layout.tsx` line 24 currently has `lang="en"` — single attribute change |
| FOUND-03 | Logo (`NamNamPizza&Grill.png`) vises med `next/image` med eksplisitte dimensjoner (ingen layout shift) | Logo is 1024x1024px — use `next/image` with explicit width/height; existing Navbar already uses `next/image` |
| FOUND-04 | Menu-data er definert i `src/data/menu.ts` med TypeScript-typer (`MenuItem`, `MenuCategory`) | `src/data/` directory does not exist — must create with typed exports covering all 5 categories |
| FOUND-05 | Siden er fullt responsiv og fungerer på mobil (320px+), nettbrett og desktop | Tailwind + Navbar Disclosure already provides responsive base — verification at 320/768/1280px |
</phase_requirements>

---

## Standard Stack

### Core (already installed — no changes needed)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 14.2.3 | App Router, SSR, Image optimization | Framework runtime — do NOT upgrade |
| React | 18.x | Component model | Paired with Next.js 14 |
| TypeScript | 5.x | Strict typing for data model | Strict mode enabled in tsconfig |
| Tailwind CSS | 3.4.1 | Utility classes, dark mode via class strategy | Configured with `darkMode: "class"` |
| next-themes | 0.3.0 | ThemeProvider for FOUC-free dark mode | Already in layout.tsx — needs prop changes only |
| next/image | Built-in | CLS-free image rendering with intrinsic sizing | Already used in Navbar for logo.svg |

### Supporting (already installed)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @headlessui/react | 2.0.3 | Disclosure for mobile nav (already working) | Phase 1: no new usage; Phase 3: Tab component |
| @heroicons/react | 2.1.3 | Icons | Available if needed for menu data types |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| next-themes ThemeProvider | Manual cookie + class injection | next-themes is already installed and handles SSR hydration; custom solution adds complexity |
| next/image | Raw `<img>` | Raw img has no lazy loading, no CLS prevention, no srcset — do not use |
| TypeScript interface | Zod schema | Zod adds runtime validation; unnecessary for static data; plain TS interface is sufficient |

**Installation:** No new packages required for Phase 1.

---

## Architecture Patterns

### Recommended Project Structure (changes only)

```
src/
├── app/
│   └── layout.tsx          # MODIFY: lang="nb", ThemeProvider props
├── components/
│   └── Navbar.tsx          # MODIFY: logo from logo.svg → NamNamPizza&Grill.png (if in Phase 1)
└── data/
    └── menu.ts             # CREATE: MenuItem, MenuCategory types + all 5 categories
```

### Pattern 1: FOUC-Free Dark Theme with next-themes

**What:** `ThemeProvider` must declare `defaultTheme="dark"` and `enableSystem={false}` to prevent the browser from briefly rendering a light background before JavaScript hydrates.

**When to use:** Required whenever a site has a fixed dark theme (no user system preference respected).

**Current state (broken):**
```tsx
// src/app/layout.tsx — CURRENT (causes FOUC)
<ThemeProvider attribute="class">
```

**Fixed pattern:**
```tsx
// src/app/layout.tsx — REQUIRED FIX
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
```

**Why `enableSystem={false}`:** Without this, next-themes reads `prefers-color-scheme` on first render. On a system set to light mode, the dark class is applied only after hydration — causing a white flash. Setting `enableSystem={false}` forces the `defaultTheme` immediately.

**Note:** `suppressHydrationWarning` on `<html>` is already present in the template — this suppresses the React hydration warning that would otherwise appear when next-themes modifies the class server-side vs client-side.

### Pattern 2: lang Attribute for Norwegian Bokmål

**What:** The root `<html>` element must declare `lang="nb"` for Norwegian Bokmål.

**Current state (incorrect):**
```tsx
// layout.tsx line 24
<html lang="en" suppressHydrationWarning>
```

**Fixed pattern:**
```tsx
<html lang="nb" suppressHydrationWarning>
```

**Why `nb` not `no`:** `nb` is the IETF BCP 47 tag for Norwegian Bokmål specifically. `no` is the macrolanguage tag — browsers and screen readers treat `nb` as more precise.

### Pattern 3: next/image for PNG Logo (CLS Prevention)

**What:** Use `next/image` with explicit `width` and `height` matching the intrinsic image dimensions. Add `priority` to prevent lazy loading for above-the-fold images.

**Logo dimensions confirmed:** `NamNamPizza&Grill.png` is **1024 x 1024 pixels** (square).

**Pattern for Navbar (display size ~120px wide):**
```tsx
import Image from 'next/image'

<Image
  src="/img/NamNamPizza&Grill.png"
  alt="Nam Nam Pizza & Grill"
  width={120}
  height={120}
  priority
  className="w-[120px] h-auto"
/>
```

**Pattern for Hero (larger display size ~300px):**
```tsx
<Image
  src="/img/NamNamPizza&Grill.png"
  alt="Nam Nam Pizza & Grill"
  width={300}
  height={300}
  priority
  className="w-[300px] h-auto"
/>
```

**Key points:**
- `width`/`height` are the intrinsic aspect ratio hint — they control CLS, not the rendered size
- CSS controls actual rendered size via `className`
- `priority` disables lazy loading — required for LCP images above the fold
- The image is square (1:1 ratio) so `height` always equals `width` value for the intrinsic hint

### Pattern 4: TypeScript Data Model for Menu

**What:** `src/data/menu.ts` must export typed interfaces and the menu data array covering all 5 categories.

**Required structure:**
```typescript
// src/data/menu.ts

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number | string        // string for "120/150" dual-price items
  featured?: boolean
}

export interface MenuCategory {
  id: string
  name: string                  // e.g. "Grill"
  emoji: string                 // e.g. "🔥"
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  { id: 'grill', name: 'Grill', emoji: '🔥', items: [...] },
  { id: 'hamburger', name: 'Hamburger', emoji: '🍔', items: [...] },
  { id: 'pizza', name: 'Pizza', emoji: '🍕', items: [...] },
  { id: 'barnemeny', name: 'Barnemeny', emoji: '👶', items: [...] },
  { id: 'drikke', name: 'Drikke', emoji: '🥤', items: [...] },
]
```

**Pizza pricing (two prices: liten/stor):** Consider a dedicated `PizzaMenuItem` type or a `prices` object to handle the dual-price display required by MENU-07:
```typescript
export interface PizzaMenuItem extends MenuItem {
  priceLiten: number
  priceStor: number
}
```

**Hamburger weight badges (MENU-06):** Consider adding a `variants` field:
```typescript
export interface HamburgerVariant {
  weight: string   // "100g", "160g", "250g", "333g"
  price: number
}
export interface HamburgerMenuItem extends MenuItem {
  variants: HamburgerVariant[]
}
```

**Note:** Phase 1 only requires the data structure to exist with correct types and all 5 categories represented. The full item data (all 11 grill items, 20 pizzas, etc.) is part of Phase 3. For Phase 1, stub data with placeholder items per category is sufficient — but the type definitions must be correct and final.

### Pattern 5: Responsive Layout Verification

**What:** The existing Tailwind + Next.js template already handles responsiveness. No new CSS is needed — this is a verification task.

**Current responsive infrastructure:**
- `Container` component provides max-width centering
- `Navbar.tsx` uses Headless UI `Disclosure` for mobile hamburger — already functional
- Tailwind breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`

**Phase 1 scope:** Confirm the existing layout renders at 320px, 768px, and 1280px. The page.tsx currently renders template placeholder content — that's acceptable for Phase 1. The test is "does the shell layout work?", not "does the content look right?".

**320px check:** The most likely failure point. Navbars with large padding can break at 320px. Current Navbar has `p-8` on the nav element — this is 32px padding on each side, leaving only 256px for content at 320px. May need padding reduction at smallest breakpoints.

### Anti-Patterns to Avoid

- **Raw `<img>` for logo:** Causes layout shift (CLS) and no HiDPI optimization. Always use `next/image`.
- **`ThemeProvider` without `defaultTheme`:** Causes FOUC on first load — the entire point of Phase 1 is to prevent this.
- **`lang="en"` left in:** Screen readers will mispronounce Norwegian text. Single-character oversight with real impact.
- **`src/data/menu.ts` with `any` types:** Defeats the purpose of FOUND-04. All fields must be typed.
- **Putting full menu item data in Phase 1:** Out of scope — Phase 1 establishes the type structure, Phase 3 populates it. However, the types must be designed to accommodate Phase 3 requirements (dual pizza prices, hamburger weight variants) so they don't need to change later.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| FOUC prevention | Manual script tag to set class before hydration | `next-themes` with `defaultTheme` | next-themes already handles SSR/client sync with `suppressHydrationWarning` |
| Image optimization | Manual srcset + sizes attributes | `next/image` | Built-in HiDPI handling, lazy loading, format conversion |
| Mobile menu toggle | Custom React state + CSS | Headless UI `Disclosure` | Already in Navbar — accessibility and keyboard nav for free |

**Key insight:** All three "don't hand-roll" items are already in the codebase. Phase 1 is configuration, not construction.

---

## Common Pitfalls

### Pitfall 1: FOUC — ThemeProvider Missing Props

**What goes wrong:** On first page load, a white flash appears before the dark background renders. Especially noticeable on slower connections.

**Why it happens:** `ThemeProvider attribute="class"` without `defaultTheme` reads `localStorage` or `prefers-color-scheme` — both require JavaScript to execute. Before JS loads, there's no `dark` class on `<html>`, so the page renders with the browser's default (white) background.

**How to avoid:**
```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
```

**Warning signs:** Open Incognito (clears localStorage) and hard-reload. If you see a white flash, the fix didn't work.

### Pitfall 2: Logo `width`/`height` Mismatch

**What goes wrong:** Setting wrong intrinsic dimensions on `next/image` causes either distorted aspect ratio or layout shift.

**Why it happens:** Developers set `width`/`height` to the desired display size rather than using the intrinsic image dimensions, or set them to arbitrary values.

**How to avoid:** The PNG is 1024x1024 (square). The `width` and `height` props should reflect the 1:1 ratio. Use CSS (Tailwind `className`) to control the rendered size:
```tsx
<Image src="..." width={1024} height={1024} className="w-[120px] h-auto" />
// OR use a smaller display-proportional intrinsic size:
<Image src="..." width={120} height={120} priority />
```
Both are valid — Next.js uses width/height for aspect ratio reservation, not for pixel-perfect rendering.

**Warning signs:** Lighthouse CLS score > 0 after implementation; logo appears stretched.

### Pitfall 3: `src/data/menu.ts` Types Too Narrow for Phase 3

**What goes wrong:** Phase 1 defines `MenuItem` with `price: number` only. Phase 3 then needs dual pizza prices (liten/stor) and hamburger weight variants — requiring a breaking type change mid-project.

**Why it happens:** Phase 1 defines types based on the simplest case rather than the full requirements.

**How to avoid:** Design types in Phase 1 with Phase 3 requirements in mind. Use union types or extended interfaces for pizza and hamburger items. Price fields should support `number | string` at minimum, or use discriminated unions.

**Warning signs:** TypeScript errors in Phase 3 when adding pizza items with two prices.

### Pitfall 4: 320px Navbar Overflow

**What goes wrong:** At 320px viewport width, the navbar logo + hamburger button overflows horizontally, causing horizontal scroll.

**Why it happens:** Current Navbar has `p-8` (32px) padding. At 320px: 320 - 64 (padding) = 256px for content. Logo image + spacing may exceed this.

**How to avoid:** Test at 320px during Phase 1. Reduce padding at mobile breakpoints if needed (`p-4 lg:p-8`). The mobile nav is already handled by Disclosure — this is purely a spacing concern.

**Warning signs:** Horizontal scrollbar appears at 320px in DevTools.

---

## Code Examples

Verified patterns from codebase inspection and framework documentation:

### FOUND-01: FOUC Fix

```tsx
// src/app/layout.tsx — complete relevant section
<html lang="nb" suppressHydrationWarning>
  <body className={inter.className}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <Navbar />
      <div>{children}</div>
      <Footer />
      <PopupWidget />
    </ThemeProvider>
  </body>
</html>
```

### FOUND-02: lang Attribute

```tsx
// Change only: lang="en" → lang="nb"
<html lang="nb" suppressHydrationWarning>
```

### FOUND-03: Logo with next/image (Navbar context)

```tsx
// Navbar.tsx — replace existing logo block
import Image from 'next/image'

<Link href="/">
  <Image
    src="/img/NamNamPizza&Grill.png"
    alt="Nam Nam Pizza & Grill"
    width={120}
    height={120}
    priority
    className="w-[120px] h-auto"
  />
</Link>
```

### FOUND-04: TypeScript Data Model Skeleton

```typescript
// src/data/menu.ts

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  featured?: boolean
}

export interface PizzaMenuItem extends MenuItem {
  priceLiten: number
  priceStor: number
}

export interface HamburgerVariant {
  weight: string
  price: number
}

export interface HamburgerMenuItem extends MenuItem {
  variants: HamburgerVariant[]
  price: number   // base/default price
}

export interface MenuCategory {
  id: string
  name: string
  emoji: string
  items: (MenuItem | PizzaMenuItem | HamburgerMenuItem)[]
}

// Phase 1: stub data — 5 categories with placeholder items
// Phase 3: replace placeholder items with real data from BRIEF.md
export const menuCategories: MenuCategory[] = [
  { id: 'grill', name: 'Grill', emoji: '🔥', items: [] },
  { id: 'hamburger', name: 'Hamburger', emoji: '🍔', items: [] },
  { id: 'pizza', name: 'Pizza', emoji: '🍕', items: [] },
  { id: 'barnemeny', name: 'Barnemeny', emoji: '👶', items: [] },
  { id: 'drikke', name: 'Drikke', emoji: '🥤', items: [] },
]
```

### FOUND-05: Responsive Layout Verification Breakpoints

```
Test at exactly:
- 320px  — minimum mobile (iPhone SE 1st gen viewport width)
- 768px  — tablet (Tailwind md: breakpoint)
- 1280px — desktop (Tailwind xl: breakpoint)

DevTools: Toggle device toolbar → set custom width
Check: no horizontal overflow, navbar renders correctly, content is readable
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `framer-motion` package | `motion` package | 2024 (Framer Motion v11+) | Import from `motion` not `framer-motion` — NOT relevant to Phase 1 |
| Tailwind v2 dark mode `darkMode: 'class'` | Same in v3 | Stable | No change needed |
| Next.js `<Image>` requiring external domains in `next.config.js` | `remotePatterns` in `next.config.mjs` | Next.js 13+ | Template already uses `remotePatterns` — no changes for local images |

**Deprecated/outdated (not affecting Phase 1):**
- `next/head` for metadata: Replaced by `export const metadata` in App Router — template already uses App Router pattern correctly.

---

## Open Questions

1. **Logo display size in Navbar**
   - What we know: Logo PNG is 1024x1024. Navbar currently shows a 32x32 SVG icon.
   - What's unclear: Should the Navbar show the full logo image at what rendered size? Or logo + text name like the current template?
   - Recommendation: Use the PNG at `width={120} height={120}` for Navbar (remove the text "[COMPANY_NAME]" span). The Hero section in Phase 3 will show it larger. For Phase 1, wire it at a reasonable navbar size and move on.

2. **`src/data/menu.ts` — populate in Phase 1 or stub?**
   - What we know: FOUND-04 requires the file to exist with typed `MenuCategory[]` covering all 5 categories. Phase 3 requirements (MENU-05 through MENU-09) specify the actual item data.
   - What's unclear: Does Phase 1 need real item data, or just the correct type structure?
   - Recommendation: Phase 1 creates the file with correct types and empty `items: []` arrays per category. Phase 3 populates the data. This satisfies FOUND-04 (file exists, types correct, 5 categories present) without blocking Phase 3 on Phase 1 data entry.

3. **Navbar 320px padding**
   - What we know: Current `p-8` padding at all breakpoints may cause overflow at 320px.
   - What's unclear: Exact overflow behavior depends on logo image size chosen.
   - Recommendation: Test after implementing the logo change. Fix with `px-4 lg:px-8` if overflow occurs.

---

## Sources

### Primary (HIGH confidence)

- Codebase: `src/app/layout.tsx` — confirmed `lang="en"` and `ThemeProvider attribute="class"` (no defaultTheme)
- Codebase: `public/img/NamNamPizza&Grill.png` — confirmed 1024x1024px via `sips` tool
- Codebase: `src/components/Navbar.tsx` — confirmed existing `next/image` usage pattern
- Codebase: `tailwind.config.ts` — confirmed `darkMode: "class"` strategy
- Codebase: `src/` directory scan — confirmed `src/data/` does not exist
- `.planning/research/PITFALLS.md` — confirmed all Phase 1 pitfalls with root causes
- `.planning/research/STACK.md` — confirmed stack versions, no new packages needed for Phase 1

### Secondary (MEDIUM confidence)

- `.planning/STATE.md` — decisions: `ThemeProvider` must use `defaultTheme="dark" enableSystem={false}`; `src/data/menu.ts` must be defined before MenuTabs
- next-themes 0.3.0 API: `defaultTheme` and `enableSystem` props confirmed as standard API (consistent with codebase DarkSwitch.tsx usage and STATE.md decisions)

### Tertiary (LOW confidence)

- None.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions confirmed from package.json and installed node_modules
- Architecture: HIGH — layout.tsx, Navbar.tsx, and directory structure directly inspected
- Pitfalls: HIGH — FOUC fix and logo dimensions verified against actual codebase; not inferred

**Research date:** 2026-02-24
**Valid until:** 2026-04-24 (stable stack — Next.js 14.2.3 pinned, no upgrades planned)
