# External Integrations

**Analysis Date:** 2026-02-23

## APIs & External Services

**Form Submission:**
- Web3Forms - Email form submission service
  - Service: https://api.web3forms.com/submit
  - Implementation: `src/components/PopupWidget.tsx` (lines 30-54)
  - Auth: API key (`apikey`) configured in form hidden field (line 135)
  - Usage: Contact form popup sends name, email, message to Web3Forms for email delivery
  - Configuration: Requires `YOUR_ACCESS_KEY_HERE` to be replaced with actual Web3Forms API key

## Data Storage

**Databases:**
- Not applicable - This is a static landing page template with no server-side database

**File Storage:**
- Local filesystem only
- Public assets served from `/public/` directory

**Caching:**
- Next.js built-in caching for static assets and optimized images
- No external caching service configured

## Authentication & Identity

**Auth Provider:**
- None - Template is public facing with no authentication requirements
- Web3Forms API key is the only credential required

## Image CDN

**External Image Service:**
- placehold.co - Placeholder image service (configured in `next.config.mjs` line 7)
- Used for development/testing image placeholders
- Not required for production (should be replaced with actual image URLs)

## Google Services

**Fonts:**
- Google Fonts (Inter) - Imported in `src/app/layout.tsx` line 2
- Loaded via `next/font/google` for optimized font delivery

## Monitoring & Observability

**Error Tracking:**
- None configured

**Logs:**
- Browser console logging only (in PopupWidget submission handlers)
- No server-side logging service configured

## CI/CD & Deployment

**Hosting:**
- Vercel (primary target - indicated by `.vercel/` in `.gitignore`)
- Alternative: Any Node.js hosting (containerized or serverless)

**CI Pipeline:**
- Not detected - Repository ready for CI integration
- Recommended: GitHub Actions or Vercel CI (native integration)

## Environment Configuration

**Required env vars:**
- No environment variables are strictly required for basic functionality
- Optional for production:
  - `WEB3FORMS_API_KEY` - For Web3Forms contact form (currently hardcoded placeholder in component)
  - `NEXT_PUBLIC_*` - Any environment variables for public client-side configuration

**Secrets location:**
- Environment variables stored in `.env.local` (not committed to git)
- Web3Forms API key should be stored in `.env.local` and read into form component
- Note: Current implementation has placeholder `YOUR_ACCESS_KEY_HERE` in `PopupWidget.tsx` (line 135)

## Webhooks & Callbacks

**Incoming:**
- Web3Forms webhook integration possible but not currently implemented
- Contact form uses simple fetch POST to Web3Forms API (one-way submission)

**Outgoing:**
- None currently configured

## Third-Party Components & Icons

**Icon Library:**
- Heroicons 2.1.3 - SVG icons from Tailwind Labs
- Inline SVG usage throughout components for UI elements

**UI Component Library:**
- Headless UI 2.0.3 - Accessible component primitives (Disclosure, Transition components)

## Content & Brand Assets

**Logo:**
- Static SVG expected at `/public/img/logo.svg`
- Currently a placeholder requiring replacement (noted as TODO in `src/components/Navbar.tsx` line 23)

**Placeholder Images:**
- Development uses `placehold.co` for image placeholders
- Hero section, benefits, testimonials all use placeholder images

## Analytics & Tracking

**Tracking:**
- None configured - No Google Analytics, Mixpanel, or similar

**Metadata:**
- Next.js Metadata API for SEO in `src/app/layout.tsx` (lines 13-16)

---

*Integration audit: 2026-02-23*
