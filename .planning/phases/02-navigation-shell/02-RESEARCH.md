# Phase 2: Navigation Shell - Research

**Researched:** 2026-02-24
**Domain:** Sticky navigation, smooth scroll, mobile hamburger menu, tel: link call bar — Next.js 14 + Headless UI v2 + Tailwind CSS v3
**Confidence:** HIGH

---

## Summary

Phase 2 builds three interactive layers on top of the Phase 1 shell: a sticky navbar with transparent-to-solid scroll transition, a mobile hamburger menu that opens/closes correctly, and a persistent call bar that floats at the bottom (mobile) or top (desktop). The stack is fully determined by what is already installed — Next.js 14.2.3, Headless UI v2.0.3+, Tailwind CSS v3.4 — and no new libraries are needed.

The most important discovery is that the existing Navbar.tsx uses the deprecated `Disclosure.Button` / `Disclosure.Panel` dot-notation API from Headless UI v1. Headless UI v2 uses named exports (`DisclosureButton`, `DisclosurePanel`, `CloseButton`). The code works in v2 due to backwards compat shims but should be migrated to the v2 pattern. The PopupWidget.tsx already uses the v2 named-export pattern and is the correct model to follow.

The scroll-padding-top fix for sticky navbars (setting `scroll-padding-top: 80px` on `html`) is confirmed to work with Next.js 14 App Router. The related Next.js bug (issue #49612) was fixed in June 2023, long before Next.js 14.2.3. For smooth scrolling, `scroll-behavior: smooth` in globals.css requires adding `data-scroll-behavior="smooth"` to the `<html>` element in layout.tsx so Next.js does not suppress the smooth scroll on router back/forward navigation.

**Primary recommendation:** Implement all navigation with pure React state + Tailwind CSS utility classes. No additional libraries needed. Use Headless UI v2 named-export API (`DisclosureButton`, `DisclosurePanel`, `CloseButton`) for the mobile menu and migrate the Navbar off the deprecated dot-notation.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| NAV-01 | Navbar shows logo and nav links to all sections (Om oss, Meny, Levering, Kontakt) | Existing Navbar.tsx has the Disclosure structure; replace `navigation` array with four section names and anchor `href` values (`#om-oss`, `#meny`, `#levering`, `#kontakt`) |
| NAV-02 | Navbar is sticky at top on desktop with transparent-to-solid background on scroll | `useState` + `useEffect` scroll listener + conditional Tailwind class swap; `position: sticky; top: 0` via `sticky top-0` class |
| NAV-03 | Mobile hamburger menu opens/closes with all section links; tapping a link closes the menu and scrolls to the section | Headless UI v2 `Disclosure` + `CloseButton` wrapping each `<Link>`; existing hamburger SVG already implemented |
| NAV-04 | Sticky call bar always visible at bottom (mobile) / top (desktop) with `tel:+4741232219` link | New `CallBar` component using `fixed bottom-0 lg:top-[navbar-height] w-full`; no extra library needed |
| NAV-05 | Anchor navigation scrolls smooth to correct section, heading fully visible (not behind sticky bar) | `scroll-padding-top: 80px` on `html` in globals.css + `scroll-behavior: smooth` + `data-scroll-behavior="smooth"` on `<html>` in layout.tsx; section `id` attributes set in Phase 3 but placeholder divs with ids added now |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @headlessui/react | ^2.0.3 (installed) | Mobile menu Disclosure, CloseButton | Already installed; zero-config accessible toggle |
| tailwindcss | ^3.4.1 (installed) | All layout and transition styles | Already installed; `sticky`, `fixed`, `transition`, conditional classes |
| react | ^18 (installed) | `useState`, `useEffect` for scroll detection | Already installed; built-in hooks are sufficient |
| next | 14.2.3 (installed) | `<Link>` for anchor hrefs | Already installed; scroll-padding bug fixed in this version |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @heroicons/react | ^2.1.3 (installed) | Phone icon for call bar | Available; use `PhoneIcon` for the call bar if desired |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React useState scroll listener | Framer Motion `useScroll` | `motion` not yet installed; `useState` + `useEffect` is sufficient and keeps bundle lean |
| CloseButton (Headless UI) | Manual `close()` render prop | CloseButton is cleaner for simple link-close; render prop needed only for async operations |
| CSS `scroll-padding-top` | JS `scrollTo` with offset calculation | CSS approach is simpler, no JS required, respects all navigation methods (keyboard, URL bar) |
| `fixed` positioning for navbar | `sticky` positioning | `fixed` removes element from document flow causing layout jump; `sticky` is correct for navbar |

**Installation:** No new packages needed. Everything is already installed.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Modified: sticky, scroll-aware, Headless UI v2 API, section links
│   └── CallBar.tsx         # New: fixed call bar, bottom mobile / top desktop
├── app/
│   ├── layout.tsx          # Modified: add data-scroll-behavior="smooth" to <html>
│   └── globals.css         # Modified: add scroll-behavior: smooth + scroll-padding-top: 80px on html
```

### Pattern 1: Transparent-to-Solid Navbar on Scroll

**What:** useState tracks whether user has scrolled past threshold (50px). useEffect adds/removes scroll listener. Tailwind conditional class swaps background.

**When to use:** Any sticky header that needs a visual state change based on scroll position.

**Example:**
```typescript
// Source: community pattern, verified against React docs
"use client";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
      scrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-md" : "bg-transparent"
    }`}>
      {/* navbar content */}
    </div>
  );
};
```

**Performance note:** `{ passive: true }` on the scroll listener prevents blocking the main thread. Re-renders only happen when `scrolled` flips (boolean), not on every pixel of scroll. This is acceptable; no need for `requestAnimationFrame` at this scale.

### Pattern 2: Headless UI v2 Mobile Menu with Auto-Close on Link Click

**What:** `Disclosure` wraps the hamburger button and slide-down panel. Each nav link is wrapped in `CloseButton` so tapping a link closes the menu before smooth-scrolling.

**When to use:** Mobile navigation drawer that must close when a destination is selected.

**Example:**
```typescript
// Source: headlessui.com/react/disclosure (verified 2026-02-24)
import { Disclosure, DisclosureButton, DisclosurePanel, CloseButton } from "@headlessui/react";
import Link from "next/link";

// Inside mobile nav panel:
<DisclosurePanel className="flex flex-col w-full py-4 lg:hidden">
  {sections.map((section) => (
    <CloseButton
      key={section.id}
      as={Link}
      href={`#${section.id}`}
      className="w-full px-4 py-3 text-gray-300 hover:text-white"
    >
      {section.label}
    </CloseButton>
  ))}
</DisclosurePanel>
```

**Critical:** The Navbar.tsx currently uses the deprecated v1 API (`Disclosure.Button`, `Disclosure.Panel`). This must be migrated to the v2 named exports (`DisclosureButton`, `DisclosurePanel`). PopupWidget.tsx already uses v2 correctly — use it as the reference.

### Pattern 3: Sticky Call Bar — Fixed, Always Visible

**What:** A separate component rendered in layout.tsx that floats fixed at the bottom on mobile and at the top (below navbar) on desktop. Uses a `tel:` link.

**When to use:** NAV-04 — "the phone number is always one tap away."

**Example:**
```typescript
// Source: Tailwind CSS docs + project requirements
export const CallBar = () => (
  <a
    href="tel:+4741232219"
    className="fixed bottom-0 left-0 z-40 w-full flex items-center justify-center gap-2
               bg-orange-600 hover:bg-orange-500 text-white font-semibold py-3
               lg:hidden
               transition-colors duration-200"
    aria-label="Ring oss: 41 23 22 19"
  >
    {/* PhoneIcon or inline SVG */}
    Ring oss: 41 23 22 19
  </a>
);
```

**Desktop variant:** On desktop (`lg:`), the call bar sits at the top, adjacent to or integrated within the navbar rather than fixed at the bottom. One implementation approach: include a prominent phone number/button in the desktop navbar right side instead of a separate bottom bar. The requirement states "visible at bottom on mobile and top on desktop at all scroll positions." This is satisfied by showing the tel link in the desktop navbar (always visible via `sticky top-0`) and a fixed bottom bar on mobile.

**z-index budget:**
- Sticky navbar: `z-50`
- Fixed mobile call bar: `z-40` (below navbar)
- Mobile menu panel: renders within navbar z-context, above content

### Pattern 4: Scroll Offset for Sticky Header (NAV-05)

**What:** `scroll-padding-top` on `html` tells the browser to leave that much space at the top when snapping to an anchor target. Combined with `scroll-behavior: smooth` for animated scrolling. Next.js requires `data-scroll-behavior="smooth"` on `<html>` to signal that it should not suppress smooth scrolling.

**When to use:** Any SPA with a sticky header and anchor navigation.

**Implementation:**

globals.css:
```css
@layer base {
  html {
    scroll-padding-top: 80px; /* matches sticky navbar height */
    scroll-behavior: smooth;
  }
  /* existing dark body rule preserved */
}
```

layout.tsx `<html>` tag:
```tsx
<html lang="nb" suppressHydrationWarning data-scroll-behavior="smooth">
```

**Navbar height reference:** The current navbar renders at approximately 64–72px (logo 120px constrained by `h-auto`, padding `py-4` = 32px total = ~56–64px depending on logo aspect). Use `80px` as the scroll-padding value to add comfortable clearance. This matches the decision already recorded in STATE.md: `scroll-padding-top: 80px`.

**Section IDs:** Phase 3 creates the actual content sections. Phase 2 should add placeholder `<section id="om-oss">`, `<section id="meny">`, etc. to page.tsx so anchor navigation can be tested immediately. Phase 3 replaces placeholder content.

### Anti-Patterns to Avoid

- **Using `position: fixed` for the navbar:** Removes it from document flow, page content starts at top-0 and gets hidden behind nav. Use `sticky top-0` instead — stays in flow.
- **Storing `window.scrollY` as React state on every scroll event:** For this project the boolean `scrolled` is fine. Avoid storing the raw pixel value as state.
- **Using `Disclosure.Button` / `Disclosure.Panel` dot notation:** This is Headless UI v1 API. v2 uses named exports. The app works but mixing API styles creates confusion and will break on next major version.
- **Not using `{ passive: true }` on the scroll listener:** Without it, the browser must wait for JS before rendering scroll, degrading performance.
- **Missing `data-scroll-behavior="smooth"`:** Without it on `<html>`, Next.js may suppress smooth scroll on back/forward navigation, or emit a console warning.
- **Setting `scroll-padding-top` on `body` instead of `html`:** The property must be set on the scroll container — which is `html` in a standard Next.js page.
- **Forgetting `suppressHydrationWarning` on `<html>`:** Already present; don't remove it when adding `data-scroll-behavior`.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Accessible hamburger toggle with ARIA | Custom open/close state + manual aria-expanded | Headless UI `Disclosure` + `DisclosureButton` | ARIA attributes wired automatically; keyboard focus managed |
| Closing menu when link is clicked | `useRef` to Disclosure + custom event | `CloseButton as={Link}` | One-line solution, handles focus restoration automatically |
| Smooth scroll with offset | JS `scrollTo()` with manual offset math | CSS `scroll-padding-top` + `scroll-behavior: smooth` | Handles all navigation methods (click, keyboard, URL paste) |

**Key insight:** The scroll offset problem seems like it needs JavaScript but is completely solved by two CSS properties. Any JS scroll handler for this problem would miss keyboard navigation and direct URL access.

---

## Common Pitfalls

### Pitfall 1: Navbar Height Mismatch with scroll-padding-top

**What goes wrong:** Section headings scroll behind the sticky navbar because `scroll-padding-top` is set to a value smaller than the actual rendered navbar height.

**Why it happens:** The navbar height is determined at runtime by content (logo size, padding). A hardcoded CSS value can drift if the navbar design changes.

**How to avoid:** Measure the actual navbar height after implementation and verify the `scroll-padding-top` value matches. The current navbar with `py-4` (16px top + 16px bottom) and a 120px logo constrained to `h-auto` renders at approximately 56-64px. `80px` provides ~16-24px of extra clearance — correct per STATE.md decision.

**Warning signs:** Section headings partially hidden after clicking a nav link.

### Pitfall 2: Mobile Call Bar Obscuring Page Content

**What goes wrong:** The fixed bottom call bar (mobile) overlaps the last content section / footer because page content does not account for the bar's height.

**Why it happens:** `position: fixed` removes the element from document flow; no space is automatically reserved.

**How to avoid:** Add `pb-[callbar-height]` to the page body or `<main>` element on mobile only, or add equivalent bottom margin to the Footer component. Alternatively, add `mb-14` (56px) to the footer element for mobile with `lg:mb-0`.

**Warning signs:** Footer text/links hidden behind the call bar at the bottom of the page.

### Pitfall 3: Headless UI v1 vs v2 API Conflict

**What goes wrong:** Importing from both `Disclosure.Button` (v1 dot notation in Navbar) and `DisclosureButton` (v2 named export in PopupWidget) causes confusion in future edits or breaks on dependency update.

**Why it happens:** Navbar.tsx was created with v1 examples. Headless UI v2 ships both APIs during transition but v1 dot-notation is formally deprecated.

**How to avoid:** Migrate Navbar.tsx to the v2 named-export API as part of Phase 2 (required anyway to use `CloseButton`).

**Warning signs:** TypeScript types complaining about `Disclosure.Button` after a package update; ESLint warnings about deprecated APIs.

### Pitfall 4: z-index Stacking Conflicts

**What goes wrong:** Mobile call bar appears above the navbar, or the mobile menu panel appears below the call bar.

**Why it happens:** No deliberate z-index budget established.

**How to avoid:** Use a deliberate z-index ladder: navbar wrapper `z-50`, mobile call bar `z-40`, page content `z-0`. The mobile menu Disclosure panel renders within the navbar's stacking context so it inherits `z-50` automatically.

**Warning signs:** Elements visually overlapping incorrectly; clicking the call bar is blocked by an invisible element.

### Pitfall 5: smooth scroll triggers on Next.js router navigation

**What goes wrong:** Navigating between pages (or page refresh) triggers a visible slow smooth scroll from position 0 to wherever the page renders, making initial load feel sluggish.

**Why it happens:** `scroll-behavior: smooth` on `html` applies globally including Next.js App Router page transitions.

**How to avoid:** Add `data-scroll-behavior="smooth"` to `<html>` in layout.tsx. Next.js detects this attribute and temporarily disables smooth scroll during router-driven navigation, re-enabling it for anchor clicks.

---

## Code Examples

Verified patterns from official and project-specific sources:

### Complete Navbar Structure (after Phase 2 migration)
```typescript
// Pattern combining all Phase 2 concerns
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel, CloseButton } from "@headlessui/react";
import ThemeChanger from "./DarkSwitch";

const sections = [
  { id: "om-oss", label: "Om oss" },
  { id: "meny", label: "Meny" },
  { id: "levering", label: "Levering" },
  { id: "kontakt", label: "Kontakt" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
      scrolled ? "bg-neutral-900/95 backdrop-blur-sm shadow-md" : "bg-transparent"
    }`}>
      <nav className="container relative flex flex-wrap items-center justify-between px-4 py-4 lg:px-8 mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image src="/img/NamNamPizza&Grill.png" alt="Nam Nam Pizza & Grill"
            width={120} height={120} priority className="w-[60px] h-auto lg:w-[80px]" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-2">
          {sections.map((s) => (
            <li key={s.id}>
              <Link href={`#${s.id}`}
                className="px-4 py-2 text-gray-200 hover:text-white rounded-md transition-colors">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop phone number */}
        <a href="tel:+4741232219"
          className="hidden lg:flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-md transition-colors">
          41 23 22 19
        </a>

        {/* Mobile hamburger */}
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton aria-label="Toggle Menu"
                className="lg:hidden px-2 py-1 text-gray-300 rounded-md">
                {/* hamburger/close SVG — already in codebase */}
              </DisclosureButton>
              <DisclosurePanel className="flex flex-col w-full py-2 lg:hidden">
                {sections.map((s) => (
                  <CloseButton key={s.id} as={Link} href={`#${s.id}`}
                    className="w-full px-4 py-3 text-gray-300 hover:text-white rounded-md">
                    {s.label}
                  </CloseButton>
                ))}
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
};
```

### globals.css additions
```css
@layer base {
  html {
    scroll-padding-top: 80px;
    scroll-behavior: smooth;
  }
  html, body {
    @apply dark:bg-trueGray-900;
  }
}
```

### layout.tsx html tag
```tsx
<html lang="nb" suppressHydrationWarning data-scroll-behavior="smooth">
```

### CallBar component
```typescript
// src/components/CallBar.tsx
import Link from "next/link";

export const CallBar = () => (
  <a
    href="tel:+4741232219"
    className="lg:hidden fixed bottom-0 left-0 z-40 w-full
               flex items-center justify-center gap-2
               bg-orange-600 hover:bg-orange-500
               text-white font-bold py-4
               transition-colors duration-200"
    aria-label="Ring oss på 41 23 22 19"
  >
    Ring oss: 41 23 22 19
  </a>
);
```

Added to layout.tsx inside ThemeProvider, after `<Footer />`:
```tsx
<CallBar />
```

And to prevent footer from hiding behind the bar on mobile:
```tsx
{/* In Footer or on the page wrapper */}
<div className="pb-16 lg:pb-0">
  {children}
</div>
```

### Placeholder sections in page.tsx
```tsx
{/* Phase 2: anchor targets — content populated in Phase 3 */}
<section id="om-oss" className="min-h-[200px] flex items-center justify-center">
  <p className="text-gray-500">Om oss — coming in Phase 3</p>
</section>
<section id="meny" className="min-h-[200px] flex items-center justify-center">
  <p className="text-gray-500">Meny — coming in Phase 3</p>
</section>
<section id="levering" className="min-h-[200px] flex items-center justify-center">
  <p className="text-gray-500">Levering — coming in Phase 3</p>
</section>
<section id="kontakt" className="min-h-[200px] flex items-center justify-center">
  <p className="text-gray-500">Kontakt — coming in Phase 3</p>
</section>
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `Disclosure.Button` / `Disclosure.Panel` (dot notation) | `DisclosureButton` / `DisclosurePanel` (named exports) | Headless UI v2 (2024) | Old API still works in v2.0.3 via compatibility shim, but deprecated; migrate now |
| Manual close handler for disclosure panel links | `CloseButton` component | Headless UI v2 | One-liner replacement; handles focus restoration |
| JS scroll handler calculating anchor offset | `scroll-padding-top` CSS property | CSS spec, browser support 2019+ | Zero JS, handles all navigation methods |
| `Transition` as wrapper around `DisclosurePanel` | `transition` prop directly on `DisclosurePanel` | Headless UI v2 | `<Transition>` still works but `transition` prop is the idiomatic v2 style |

**Deprecated/outdated:**
- `Disclosure.Button`: Replaced by `DisclosureButton` — use named export
- `Disclosure.Panel`: Replaced by `DisclosurePanel` — use named export
- Wrapping anchor links in `onClick={() => close()}` lambda: Replaced by `CloseButton as={Link}`

---

## Open Questions

1. **Desktop call bar placement: integrated into navbar or separate bar above content?**
   - What we know: NAV-04 says "top on desktop at all scroll positions." The navbar is already sticky at the top. Adding the phone number into the desktop navbar right side satisfies this with zero extra markup.
   - What's unclear: Whether the designer/user wants a visually separate call bar strip or just a button in the navbar.
   - Recommendation: Integrate phone number into the desktop navbar right side (as a styled `<a href="tel:...">` button). This is simpler and satisfies the requirement. A separate fixed top bar on desktop would require offsetting page content by the bar's height to avoid overlap.

2. **ThemeChanger (dark/light switch) in Phase 2 navbar?**
   - What we know: The `ThemeChanger` component exists and is rendered in the current navbar.
   - What's unclear: The design intent is a dark-first restaurant site. The ThemeChanger may be removed in Phase 2 or retained.
   - Recommendation: Retain `ThemeChanger` for now — removing it is a design decision outside research scope.

3. **Navbar logo size — 120px or smaller on mobile?**
   - What we know: Current logo is 120x120px. At 320px viewport with `px-4` padding, available width is 288px. Logo (120px) + hamburger button (~40px) + ThemeChanger (~40px) = 200px, leaving 88px. Tight but not overflowing.
   - What's unclear: Visual proportions at actual render — user must verify in browser.
   - Recommendation: Optionally reduce logo to 80px on mobile (`w-[80px] lg:w-[120px]`) to give the hamburger and theme toggle more breathing room, especially once the phone number is also in the desktop navbar.

---

## Sources

### Primary (HIGH confidence)
- [headlessui.com/react/disclosure](https://headlessui.com/react/disclosure) — v2 Disclosure, DisclosureButton, DisclosurePanel, CloseButton API verified 2026-02-24
- [nextjs.org/docs/messages/missing-data-scroll-behavior](https://nextjs.org/docs/messages/missing-data-scroll-behavior) — official Next.js docs on `data-scroll-behavior="smooth"` requirement
- GitHub issue vercel/next.js#49612 — confirmed CLOSED/FIXED; scroll-padding-top works in Next.js 14.2.3

### Secondary (MEDIUM confidence)
- Multiple community tutorials (Dev.to, Medium) on sticky navbar with `useState`/`useEffect` scroll detection — pattern cross-verified with React docs
- [tailwindcss.com/docs/position](https://tailwindcss.com/docs/position) — `fixed`, `sticky`, `bottom-0`, `top-0` utility classes
- [tailwindcss.com/docs/scroll-behavior](https://tailwindcss.com/docs/scroll-behavior) — `scroll-smooth` utility

### Tertiary (LOW confidence)
- None — all critical claims have primary or secondary verification.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already installed, versions confirmed from package.json
- Architecture: HIGH — Headless UI v2 API verified against official docs; scroll-padding fix verified against Next.js issue tracker
- Pitfalls: HIGH — identified from official docs + known Next.js issue + Headless UI migration guide

**Research date:** 2026-02-24
**Valid until:** 2026-05-24 (stable APIs; Headless UI and Next.js rarely change these patterns in minor releases)
