# Technology Stack

**Analysis Date:** 2026-02-23

## Languages

**Primary:**
- TypeScript 5.x - Used throughout application code, component definitions, and configuration
- TSX/JSX - React component syntax in `src/components/` and `src/app/`
- JavaScript (MJS) - ES6 module format for configuration files (`next.config.mjs`, `postcss.config.mjs`)
- CSS - Global styles in `src/app/globals.css`

**Secondary:**
- HTML - Rendered by React components

## Runtime

**Environment:**
- Node.js (version specified via `.nvmrc` if present, otherwise managed via package.json engine constraints)

**Package Manager:**
- npm (primary)
- Yarn (lockfile present: `yarn.lock`)
- Lockfile: `package-lock.json` present (npm)

## Frameworks

**Core:**
- Next.js 14.2.3 - Full-stack React framework with App Router (app directory structure)
- React 18.x - UI component library
- React DOM 18.x - React rendering to DOM

**Styling:**
- TailwindCSS 3.4.1 - Utility-first CSS framework (configured in `tailwind.config.ts`)
- PostCSS 8.x - CSS processing (configured in `postcss.config.mjs`)

**Forms & Validation:**
- React Hook Form 7.51.4 - Form state management in `src/components/PopupWidget.tsx`

**UI Components:**
- Headless UI 2.0.3 - Unstyled, accessible UI components (Disclosure, Transition used in navigation and popup)
- Heroicons 2.1.3 - Icon library from Tailwind Labs

**Theme Management:**
- next-themes 0.3.0 - Dark mode implementation in `src/components/DarkSwitch.tsx` and `src/app/layout.tsx`

**Build/Dev Tools:**
- TypeScript Compiler - Type checking (strict mode enabled in `tsconfig.json`)
- ESLint 8.x - Code linting (configured in `.eslintrc`)
- ESLint Config (Next.js) 14.2.3 - Next.js-specific lint rules

## Key Dependencies

**Critical:**
- next 14.2.3 - Framework runtime, server/client rendering, routing
- react 18.x - Component model and state management
- react-dom 18.x - DOM rendering

**Infrastructure:**
- @headlessui/react 2.0.3 - Accessible component primitives for Navbar and PopupWidget
- @heroicons/react 2.1.3 - SVG icon assets
- next-themes 0.3.0 - Client-side theme persistence and synchronization
- react-hook-form 7.51.4 - Form handling and validation

**Development:**
- @types/node 20.x - Node.js type definitions
- @types/react 18.x - React type definitions
- @types/react-dom 18.x - React DOM type definitions
- tailwindcss 3.4.1 - CSS utility framework
- postcss 8.x - CSS transformation pipeline
- typescript 5.x - TypeScript compiler

## Configuration

**Build Configuration:**
- `next.config.mjs` - Next.js build settings including image optimization and remote hostname allowlist
- `tsconfig.json` - TypeScript compiler options (strict mode, path aliases `@/*` → `./src/*`)
- `tailwind.config.ts` - Tailwind CSS customization (dark mode class support, font families)
- `postcss.config.mjs` - PostCSS plugin configuration

**Linting Configuration:**
- `.eslintrc` - ESLint configuration (extends `next/core-web-vitals`)

**Environment:**
- Environment variables configured via `.env.local`, `.env.development.local`, `.env.test.local`, `.env.production.local`
- No sensitive configuration in repository (following `.gitignore` patterns)

## Scripts

**Development:**
```bash
npm run dev        # Start Next.js development server (localhost:3000)
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

## Platform Requirements

**Development:**
- Node.js (recent LTS recommended)
- npm or yarn package manager
- Modern web browser (for local testing)

**Production:**
- Deployment target: Vercel (native Next.js support, `.vercel/` directory in `.gitignore`)
- Alternative: Any Node.js-compatible hosting (serverless or containerized)
- No database or external service dependencies required

## Next.js Features in Use

**App Router:**
- `src/app/` directory structure for file-based routing
- Server-side rendering with client components via `"use client"` directive
- Root layout in `src/app/layout.tsx` manages metadata, providers, and global layout

**Image Optimization:**
- Next.js Image component with remotePatterns configured for `placehold.co` domain
- Static image imports from `/public/img/`

**Font Optimization:**
- Google Fonts integration (Inter font) via `next/font/google`

---

*Stack analysis: 2026-02-23*
