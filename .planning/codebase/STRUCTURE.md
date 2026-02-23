# Structure: website_template

## Directory Layout

```
website_template/
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── layout.tsx          # Root layout (ThemeProvider, fonts)
│   │   ├── page.tsx            # Home page (composes all sections)
│   │   ├── globals.css         # Global styles
│   │   └── favicon.ico
│   ├── components/             # All UI components (flat, no subdirectories)
│   │   ├── Navbar.tsx          # Top navigation with mobile menu
│   │   ├── Hero.tsx            # Hero/landing section
│   │   ├── Benefits.tsx        # Benefits/features section
│   │   ├── SectionTitle.tsx    # Reusable section heading component
│   │   ├── Container.tsx       # Layout wrapper (max-width, padding)
│   │   ├── Testimonials.tsx    # Testimonials carousel/grid
│   │   ├── Cta.tsx             # Call-to-action section
│   │   ├── Faq.tsx             # FAQ accordion
│   │   ├── Footer.tsx          # Footer with links
│   │   ├── Video.tsx           # Embedded video section
│   │   ├── DarkSwitch.tsx      # Dark mode toggle (desktop)
│   │   ├── PopupWidget.tsx     # Floating popup/chat widget
│   │   └── data.js             # Static content data (testimonials, FAQs, etc.)
│   └── types.ts                # Shared TypeScript type definitions
├── public/
│   ├── img/                    # Static images
│   │   ├── brands/             # Brand logos (SVG)
│   │   ├── hero.png            # Hero image
│   │   ├── benefit-one.png     # Benefits images
│   │   ├── benefit-two.png
│   │   ├── user1-3.jpg         # Testimonial avatars
│   │   └── logo.svg
│   └── favicon.ico
├── css/
│   └── tailwind.css            # Tailwind CSS directives
├── BRIEF.md                    # Project brief / notes
├── README.md                   # Project documentation
├── TEMPLATE_GUIDE.md           # How to use the template
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration (dark mode, custom colors)
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS configuration
└── .eslintrc                   # ESLint configuration
```

## Key Locations

| What | Where |
|------|-------|
| App entry point | `src/app/page.tsx` |
| Root layout | `src/app/layout.tsx` |
| All components | `src/components/` |
| Static content/data | `src/components/data.js` |
| Type definitions | `src/types.ts` |
| Global styles | `src/app/globals.css` |
| Static assets | `public/img/` |

## Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase `.tsx` | `SectionTitle.tsx` |
| Data files | camelCase `.js` | `data.js` |
| Type files | camelCase `.ts` | `types.ts` |
| Config files | kebab-case `.mjs/.ts` | `next.config.mjs` |
| Image assets | kebab-case | `benefit-one.png` |
| CSS classes | Tailwind utility | `text-lg font-bold` |

## Component Organization

Components are flat (no subdirectories). Each component is a single file with:
- Named export as default
- Props typed inline or via `src/types.ts`
- Tailwind classes for styling

Page composition happens in `src/app/page.tsx` which imports and sequences all section components.

## Data Flow

Static content lives in `src/components/data.js` and is imported directly by components that need it. No API routes or server-side data fetching present.

---
*Mapped: 2026-02-23*
