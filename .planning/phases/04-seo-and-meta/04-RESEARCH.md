# Phase 4: SEO and Meta - Research

**Researched:** 2026-02-24
**Domain:** Next.js 14 App Router Metadata API, Schema.org JSON-LD, Favicon/icon file conventions
**Confidence:** HIGH

---

## Summary

Phase 4 implements all SEO surface area for Nam Nam Pizza & Grill: browser tab title, social sharing preview (Open Graph), favicon/Apple touch icon, and a LocalBusiness JSON-LD block with `FastFoodRestaurant` type. The project uses Next.js 14 with the App Router, and the metadata layer is entirely server-side — no new packages are required.

Next.js 14 provides two authoritative mechanisms: the `metadata` export object (config-based) and file-based metadata (placing named files in `/src/app/`). For this phase, config-based metadata in `layout.tsx` covers SEO-01 through SEO-03, file-based icons in `src/app/` cover SEO-04, and a `<script type="application/ld+json">` block injected via `layout.tsx` JSX covers SEO-05. All of this is entirely within one file (`src/app/layout.tsx`) plus two image files dropped into `src/app/`.

There is one open question the planner must account for: `metadataBase` (needed for absolute OG image URLs) requires a fully-qualified site URL, but the deployment target (Vercel vs. GitHub Pages) is not yet confirmed per STATE.md. A fallback strategy exists and is documented below.

**Primary recommendation:** Use `export const metadata: Metadata` in `src/app/layout.tsx` for title/description/openGraph/icons, drop `icon.png` and `apple-icon.png` into `src/app/` for file-based favicon generation, and add the JSON-LD `<script>` tag directly in `RootLayout`'s JSX.

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | `<title>` is "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum" | `metadata.title` string in `layout.tsx` — direct string value, no template needed (single-page site) |
| SEO-02 | `<meta name="description">` describes the restaurant in Norwegian | `metadata.description` string in `layout.tsx` |
| SEO-03 | Open Graph tags include title, description, and logo image | `metadata.openGraph` object with `title`, `description`, `images` — requires `metadataBase` for absolute image URL |
| SEO-04 | Favicon 32×32 + 180×180 Apple touch icon based on the logo | Drop `icon.png` (32×32 crop from logo) and `apple-icon.png` (180×180 crop) into `src/app/` — Next.js auto-generates `<link>` tags |
| SEO-05 | LocalBusiness JSON-LD with `FastFoodRestaurant` type, address, telephone, opening hours | `<script type="application/ld+json">` tag in `RootLayout` JSX using `dangerouslySetInnerHTML` with XSS-safe serialization |
</phase_requirements>

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js built-in Metadata API | 14.2.3 (already installed) | `title`, `description`, `openGraph`, `icons` config | Zero-dependency; Next.js generates correct `<head>` tags automatically |
| Next.js file-based icons | 14.2.3 (already installed) | `favicon`, `icon`, `apple-icon` via file conventions | Preferred by official docs over config-based `icons`; Next.js auto-reads dimensions and generates link tags |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `schema-dts` | latest | TypeScript types for JSON-LD schema objects | Optional — use if type-safety on the `jsonLd` object is desired; not required |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| File-based icons (`src/app/icon.png`) | `metadata.icons` config in `layout.tsx` | File-based is preferred by official docs; auto-reads actual image dimensions; config-based requires manual size declarations and is more error-prone |
| Inline `<script>` in `layout.tsx` JSX | Separate `JsonLd` component | Inline is simpler for a single static schema; separate component is only warranted for per-page schemas |
| Static `metadata` export | `generateMetadata` function | Static is correct here — all metadata is known at build time |

**Installation:** No new packages required. All capabilities are built into Next.js 14.

---

## Architecture Patterns

### Recommended Project Structure

```
src/app/
├── icon.png          # 32×32 favicon (Next.js auto-generates <link rel="icon">)
├── apple-icon.png    # 180×180 Apple touch icon (Next.js auto-generates <link rel="apple-touch-icon">)
├── layout.tsx        # metadata export + JSON-LD script tag (both changes land here)
├── page.tsx          # unchanged
└── globals.css       # unchanged
```

No new components or directories needed. The entire phase is 2 image files + edits to `layout.tsx`.

### Pattern 1: Config-based Metadata (SEO-01, SEO-02, SEO-03)

**What:** Export a typed `Metadata` object from `layout.tsx` with `title`, `description`, `metadataBase`, and `openGraph`.
**When to use:** All metadata is static and known at build time.

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://namnam.no"), // Required for absolute OG image URLs
  title: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum",
  description: "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker! Ring 41 23 22 19 og bestill pizza, grill eller burger med utkjøring i Modum.",
  openGraph: {
    title: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum",
    description: "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker! Ring 41 23 22 19 og bestill pizza, grill eller burger med utkjøring i Modum.",
    images: [
      {
        url: "/img/NamNamPizza&Grill.png", // Resolved to absolute via metadataBase
        width: 1024,
        height: 1024,
        alt: "Nam Nam Pizza & Grill logo",
      },
    ],
    locale: "nb_NO",
    type: "website",
  },
};
```

**HTML output for OG:**
```html
<meta property="og:title" content="Nam Nam Pizza & Grill – ..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://namnam.no/img/NamNamPizza%26Grill.png" />
<meta property="og:image:width" content="1024" />
<meta property="og:image:height" content="1024" />
<meta property="og:locale" content="nb_NO" />
<meta property="og:type" content="website" />
```

### Pattern 2: File-based Icons (SEO-04)

**What:** Place named image files in `src/app/` and Next.js automatically generates the correct `<link>` tags.
**When to use:** Always preferred over `metadata.icons` config when working with static image files.

```
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
//
// Place in src/app/:
//   icon.png      → <link rel="icon" href="/icon?..." type="image/png" sizes="32x32" />
//   apple-icon.png → <link rel="apple-touch-icon" href="/apple-icon?..." type="image/png" sizes="180x180" />
//
// File requirements:
//   icon.png:       32×32 px PNG (cropped/resized from NamNamPizza&Grill.png)
//   apple-icon.png: 180×180 px PNG (cropped/resized from NamNamPizza&Grill.png)
//
// Existing public/favicon.ico: 32×32 — this is in /public, NOT /src/app, so it
// does NOT trigger the Next.js file-based mechanism. The new icon.png in /src/app/
// takes over for browser tab favicon display.
```

**Generating the PNG files:** The source logo is `public/img/NamNamPizza&Grill.png` (1024×1024). Use any image tool (ImageMagick, Sharp, Squoosh, etc.) to produce:
- `icon.png` at 32×32 (for browser favicon)
- `apple-icon.png` at 180×180 (for Apple home screen icon)

If no image processing tool is available, a code-based approach with `ImageResponse` from `next/og` can generate these at build time — but placing PNG files is simpler and preferred.

### Pattern 3: JSON-LD Structured Data (SEO-05)

**What:** Add a `<script type="application/ld+json">` tag inside `RootLayout`'s JSX return.
**When to use:** Static schema data known at build time; inject into layout for sitewide coverage.

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld
// src/app/layout.tsx

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: "Nam Nam Pizza & Grill",
  description: "Gatekjøkkenet i Åmot – pizza, grill og burger med utkjøring i Modum.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strandgata 11",
    addressLocality: "Åmot",
    postalCode: "3340",
    addressCountry: "NO",
  },
  telephone: "+4741232219",
  openingHours: "Mo-Su 13:00-23:00",
  url: "https://namnam.no",
  servesCuisine: ["Pizza", "Grill", "Burger"],
};

// In RootLayout JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

**openingHours format:** Schema.org uses the format `"Mo-Su 13:00-23:00"` (two-letter day abbreviations, 24-hour time, hyphen range). All days, same hours: `"Mo-Su 13:00-23:00"` is correct. This is the `openingHours` text property. The more detailed `openingHoursSpecification` (array of objects with `dayOfWeek`, `opens`, `closes`) is an alternative but unnecessary for identical hours every day.

**FastFoodRestaurant hierarchy:** `FastFoodRestaurant` → `FoodEstablishment` → `LocalBusiness` → `Organization` / `Place`. It accepts all `LocalBusiness` properties including `address` (PostalAddress), `telephone`, `openingHours`.

### Anti-Patterns to Avoid

- **Using `metadata.icons` config instead of file-based icons:** The official docs explicitly recommend file-based icons ("file-based API will automatically generate the correct metadata for you"). Config-based icons require manual dimension sync.
- **Omitting `metadataBase`:** Without it, relative URLs in `openGraph.images` cause a Next.js build error. Must be set even if deployment URL is uncertain (use env var or placeholder).
- **Using `JSON.stringify` without XSS sanitization in JSON-LD:** Official docs recommend `.replace(/</g, "\\u003c")` to prevent XSS via `dangerouslySetInnerHTML`. This is documented in the official Next.js JSON-LD guide.
- **Adding the JSON-LD script in `page.tsx` instead of `layout.tsx`:** Since this is a single-page app, either location works; layout is preferred for sitewide schema data.
- **Keeping `[COMPANY_NAME]` placeholder title:** `layout.tsx` currently has `title: "[COMPANY_NAME]"` — this must be replaced in full (the placeholder is the starting state for SEO-01).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Generating `<head>` tags | Custom `<Head>` component | `metadata` export in `layout.tsx` | Next.js 14 App Router manages `<head>` server-side; custom head components cause duplication or hydration errors |
| Icon file serving | Custom route handler for icons | File-based convention (`src/app/icon.png`) | Next.js handles caching, content-type headers, and `<link>` tag generation automatically |
| OG image generation | Custom image generation route | Static image from `public/img/` via `openGraph.images` | Logo already exists at 1024×1024; no dynamic content needed for OG |
| JSON-LD type safety | Manual TypeScript interface | `schema-dts` package (optional) or plain object | Plain object is fine for a single static schema; `schema-dts` only needed if multiple complex schemas |

**Key insight:** In Next.js 14 App Router, all metadata concerns are handled declaratively. Writing custom `<head>` manipulation code is always wrong — the framework owns the `<head>`.

---

## Common Pitfalls

### Pitfall 1: `metadataBase` required for relative OG image URLs

**What goes wrong:** `openGraph.images` with a relative path like `"/img/NamNamPizza&Grill.png"` triggers a Next.js build error: "metadata.openGraph.images[0].url requires an absolute URL when metadataBase is not set."
**Why it happens:** Open Graph requires absolute URLs; Next.js enforces this at build time.
**How to avoid:** Set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://namnam.no")` in the root `metadata` export. If the deployment URL is uncertain, use a reasonable placeholder — it can be updated before go-live.
**Warning signs:** Build error mentioning "absolute URL" or "metadataBase".

### Pitfall 2: favicon.ico in `/public` vs. file-based icons in `/src/app/`

**What goes wrong:** The existing `public/favicon.ico` continues to be served but is NOT managed by Next.js's file-based metadata system. The file-based system only triggers for files in `/src/app/`. If both exist, browser behavior depends on which `<link>` tag appears in `<head>`.
**Why it happens:** Next.js serves `public/` files as static assets without any metadata processing.
**How to avoid:** Place `icon.png` in `src/app/` (NOT in `public/`). The `src/app/icon.png` approach generates the proper `<link rel="icon">` tag with sizes. The old `public/favicon.ico` can remain as a fallback for browsers that look for favicon at root path — no conflict.
**Warning signs:** Browser tab still shows generic icon after deploying.

### Pitfall 3: `<` character in JSON-LD content causes XSS risk

**What goes wrong:** If any value in the JSON-LD object contains `<`, `dangerouslySetInnerHTML` can allow script injection.
**Why it happens:** `JSON.stringify` does not escape `<` or `>`.
**How to avoid:** Always use `.replace(/</g, "\\u003c")` when serializing JSON-LD. This is documented in the official Next.js JSON-LD guide.

### Pitfall 4: `openingHours` text format errors

**What goes wrong:** Google's Rich Results Test rejects malformed opening hours like `"Mon-Sun 13:00-23:00"` or `"13:00 - 23:00"`.
**Why it happens:** Schema.org `openingHours` property requires specific two-letter day codes (Mo, Tu, We, Th, Fr, Sa, Su) and 24-hour time with no spaces around the colon.
**How to avoid:** Use `"Mo-Su 13:00-23:00"` (a single string; multiple entries are an array for different day/time combos). This is the correct format for all days with identical hours.

### Pitfall 5: File-based icons require actual image files, not references

**What goes wrong:** Attempting to reference `public/img/NamNamPizza&Grill.png` from within `src/app/` does not work for file-based icons. The files must be physically placed in `src/app/` with the exact names `icon.png` and `apple-icon.png`.
**Why it happens:** File-based icon convention relies on co-location in the app directory, not on path references.
**How to avoid:** Resize/copy the source logo to the required dimensions and place the output files directly at `src/app/icon.png` and `src/app/apple-icon.png`.

---

## Code Examples

Verified patterns from official sources:

### Complete `metadata` export for layout.tsx (SEO-01 through SEO-03)

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://namnam.no"
  ),
  title: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum",
  description:
    "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker! Ring 41 23 22 19 og bestill pizza, grill eller burger med utkjøring i Modum.",
  openGraph: {
    title: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum",
    description:
      "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker! Ring 41 23 22 19 og bestill pizza, grill eller burger med utkjøring i Modum.",
    images: [
      {
        url: "/img/NamNamPizza&Grill.png",
        width: 1024,
        height: 1024,
        alt: "Nam Nam Pizza & Grill logo",
      },
    ],
    locale: "nb_NO",
    type: "website",
  },
};
```

### JSON-LD block added to RootLayout JSX (SEO-05)

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld and https://schema.org/FastFoodRestaurant
// Added inside RootLayout function body, before the return statement

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: "Nam Nam Pizza & Grill",
  description:
    "Gatekjøkkenet i Åmot – pizza, grill og burger med utkjøring i Modum.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strandgata 11",
    addressLocality: "Åmot",
    postalCode: "3340",
    addressCountry: "NO",
  },
  telephone: "+4741232219",
  openingHours: "Mo-Su 13:00-23:00",
  url: "https://namnam.no",
  servesCuisine: ["Pizza", "Grill", "Burger"],
};

// In JSX return (inside <html>):
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
  }}
/>
```

### File-based icon placement (SEO-04)

```
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
//
// Action: Copy/resize NamNamPizza&Grill.png to:
//   src/app/icon.png        (32×32 px)   → generates <link rel="icon" sizes="32x32" type="image/png">
//   src/app/apple-icon.png  (180×180 px) → generates <link rel="apple-touch-icon" sizes="180x180" type="image/png">
//
// The existing public/favicon.ico (32×32) can remain as root-path fallback.
// No code changes required — Next.js detects files automatically.
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `next/head` with manual `<meta>` tags (Pages Router) | `metadata` export object in layout/page (App Router) | Next.js 13 App Router | Eliminates hydration mismatches; metadata is SSR-only |
| `themeColor` and `colorScheme` in `metadata` object | Moved to `generateViewport` export | Next.js 14 | `themeColor`/`colorScheme` in `metadata` are deprecated; use `export const viewport` instead — but this phase does not need viewport changes |
| External `react-helmet` / `next-seo` packages | Built-in `metadata` API | Next.js 13+ | Third-party head managers are unnecessary and add complexity in App Router |

**Deprecated/outdated:**
- `next-seo` package: Still functional but redundant in App Router — built-in metadata covers all the same fields.
- `metadata.themeColor`: Deprecated as of Next.js 14 in favor of `generateViewport`. Not needed for this phase.

---

## Open Questions

1. **Deployment URL for `metadataBase`**
   - What we know: STATE.md flags "Verify hosting (Vercel/Netlify vs GitHub Pages) before Phase 4 to determine if `output: 'export'` is needed"
   - What's unclear: The actual domain name is unknown. "namnam.no" is assumed but not confirmed.
   - Recommendation: Use `process.env.NEXT_PUBLIC_SITE_URL ?? "https://namnam.no"` so it can be overridden at deploy time. The planner should note this as a TODO comment in the code. The build will still succeed with the placeholder URL.

2. **Image processing for favicon files**
   - What we know: The source logo is `public/img/NamNamPizza&Grill.png` at 1024×1024. The file-based convention requires PNG files placed in `src/app/`.
   - What's unclear: The executor may not have image processing CLI tools (ImageMagick/Sharp) available.
   - Recommendation: The planner should include a task that uses Node.js/Sharp (already in Next.js dependency tree via `next/image`) or explicit `ffmpeg`/`convert` command IF available. Fallback: use `ImageResponse` from `next/og` to generate icons programmatically via `src/app/icon.tsx` and `src/app/apple-icon.tsx` — no external tools needed. This is fully supported by the file convention.

---

## Sources

### Primary (HIGH confidence)

- https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata — Next.js 14 Metadata API overview (config-based + file-based + JSON-LD)
- https://nextjs.org/docs/app/api-reference/functions/generate-metadata — Full `Metadata` type reference, all fields including `openGraph`, `icons`, `title`, `description`, `metadataBase`
- https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons — favicon, icon, apple-icon file conventions, supported formats, dimensions, HTML output
- https://nextjs.org/docs/app/guides/json-ld — Official JSON-LD pattern with XSS-safe serialization

### Secondary (MEDIUM confidence)

- https://schema.org/FastFoodRestaurant — FastFoodRestaurant type, property inheritance, openingHours format
- https://schema.org/openingHours — openingHours text format specification (verified: "Mo-Su 13:00-23:00")

### Tertiary (LOW confidence)

- None required for this phase — all claims verified against official docs.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all capabilities are built into Next.js 14, verified against official docs (v14.2.3 matches project's installed version)
- Architecture: HIGH — single-file approach (`layout.tsx` + 2 image files) verified against official patterns
- Pitfalls: HIGH — `metadataBase` requirement, XSS sanitization, file placement all documented in official Next.js docs

**Research date:** 2026-02-24
**Valid until:** 2026-08-24 (stable — Next.js App Router metadata API is stable, no breaking changes expected in minor versions)
