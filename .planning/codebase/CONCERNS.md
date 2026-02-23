# Concerns: website_template

## Summary

This is a **starter template**, not a production application. Most concerns relate to placeholder content that must be replaced before deployment, not structural issues.

## Placeholder Content (Must Replace Before Launch)

**Severity: High** — These will cause broken/incorrect behavior in production.

| Location | Placeholder | Action Required |
|----------|-------------|-----------------|
| `src/components/PopupWidget.tsx` | `value="YOUR_ACCESS_KEY_HERE"` | Replace with Web3Forms API key |
| `src/components/Navbar.tsx` | `[COMPANY_NAME]`, logo | Replace with real branding |
| `src/components/Hero.tsx` | Hero image, CTA hrefs, trust badge, brand logos | Replace with real content |
| `src/components/Cta.tsx` | CTA headline, CTA href | Replace with real content |
| `src/components/Faq.tsx` | All `[PLACEHOLDER]` tokens | Replace with real FAQ content |
| `src/components/Footer.tsx` | Company name, description, social links | Replace with real content |
| `src/components/Testimonials.tsx` | All `[PLACEHOLDER]` tokens, avatar images | Replace with real testimonials |
| `src/components/data.js` | All `[PLACEHOLDER]` tokens, benefit images | Replace with real content |
| `src/app/page.tsx` | YouTube video ID | Replace with real video |

## Security Concerns

### Web3Forms API Key Exposed in Source
- **File:** `src/components/PopupWidget.tsx`
- **Issue:** `YOUR_ACCESS_KEY_HERE` placeholder — when replaced with a real key, it will be visible in the browser bundle
- **Risk:** Medium — Web3Forms keys are semi-public by design (form submission only), but still best to handle via env var
- **Recommendation:** Move to `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable

### No Input Sanitization
- **File:** `src/components/PopupWidget.tsx`
- **Issue:** Form data passed directly to Web3Forms without client-side sanitization
- **Risk:** Low — Web3Forms handles server-side; XSS not applicable (no innerHTML)

## Technical Debt

### Mixed JS/TS
- `src/components/data.js` is plain JavaScript while everything else is TypeScript
- No type safety for data shapes used in components
- **Recommendation:** Convert to `data.ts` with typed exports

### No Testing
- Zero test files, no testing framework installed
- High-risk areas: form submission (PopupWidget), theme persistence (DarkSwitch)
- **Recommendation:** Add Vitest + React Testing Library when adapting template

### Static Data Coupling
- Content data lives in `data.js` not in a CMS or API
- Tight coupling between data shape and component expectations
- **Acceptable for template** — becomes a concern when content changes frequently

## Performance

### Images Not Optimized via next/image
- Some `<img>` tags used directly instead of Next.js `<Image>` component
- Missing `width`/`height` props causes layout shift
- **Recommendation:** Audit all image usage; replace raw `<img>` with `next/image`

### Brand SVG Logos as Inline Code
- `src/components/Hero.tsx` has `BrandLogo1–5` as inline SVG JSX
- Increases bundle size; harder to swap
- **Recommendation:** Move to `public/img/brands/` as files (already partially done)

## Fragile Areas

### Theme Persistence (DarkSwitch)
- Dark mode state managed via `next-themes` + localStorage
- Potential hydration mismatch on initial render (flash of unstyled content)
- **Recommendation:** Ensure `suppressHydrationWarning` is set on `<html>` tag

### PopupWidget Form Submission
- Relies entirely on external Web3Forms service
- No error state shown to user on network failure
- No loading state during submission
- **Recommendation:** Add error/loading UI states before launch

## Out-of-Scope Concerns (Template Limitations)

These are known template limitations, not bugs:
- No authentication system
- No database or backend
- No routing beyond single page
- No SEO metadata (needs customization per project)
- No analytics integration

---
*Mapped: 2026-02-23*
