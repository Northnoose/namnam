# Architecture

**Analysis Date:** 2026-02-23

## Pattern Overview

**Overall:** Next.js App Router-based marketing website with component-driven composition

**Key Characteristics:**
- React Server Components (RSC) in layout with client-side components where needed
- Utility-first CSS styling via Tailwind with dark mode support
- Modular, reusable components organized by concern
- Static content composition with placeholder tokens for customization
- Client-side interactivity for specific features (theme switching, forms, video playback)

## Layers

**Page Layer:**
- Purpose: Entry point for the website, orchestrates component layout
- Location: `src/app/page.tsx`
- Contains: Home page composition, import orchestration
- Depends on: Container, Hero, Benefits, Video, Testimonials, Faq, Cta components; data from `data.js`
- Used by: Next.js App Router

**Layout Layer:**
- Purpose: Root layout wrapper, provides theme context and persistent navigation/footer
- Location: `src/app/layout.tsx`
- Contains: Metadata configuration, ThemeProvider setup, Navbar, Footer, PopupWidget
- Depends on: next-themes ThemeProvider, Navbar, Footer, PopupWidget, global CSS
- Used by: All pages

**Component Layer:**
- Purpose: Reusable UI components for sections, inputs, and interactive elements
- Location: `src/components/`
- Contains: Section components (Hero, Benefits, Testimonials, Faq, Video, Cta), layout components (Container, Navbar, Footer), utility components (SectionTitle, DarkSwitch, PopupWidget)
- Depends on: React, Next.js Image, Headless UI, React Hook Form, next-themes, Heroicons
- Used by: Page and layout layers

**Data Layer:**
- Purpose: Content and configuration data
- Location: `src/components/data.js`
- Contains: Benefit section data objects (benefitOne, benefitTwo) with title, description, image, bullet items
- Depends on: Heroicons for icon React components
- Used by: Benefits component on page

**Types Layer:**
- Purpose: TypeScript type definitions
- Location: `src/types.ts`
- Contains: PageProps interface (for dynamic routes)
- Depends on: React types
- Used by: Page components

## Data Flow

**Page Render Flow:**

1. User requests `/` → Next.js routes to `src/app/page.tsx`
2. Page component imports all section components and data
3. Page renders Container wrapper with section components in sequence
4. Container provides max-width and padding spacing
5. Each section renders with props passed from data or inline configuration
6. Layout wrapper applies theme context, navigation, footer around page content

**Theme Switching Flow:**

1. User clicks theme toggle in Navbar (DarkSwitch component)
2. DarkSwitch manages mounted state to prevent hydration mismatch
3. DarkSwitch calls `setTheme()` from next-themes hook
4. next-themes updates document class and localStorage
5. Tailwind dark: selector applies dark mode classes to all components

**Form Submission Flow (PopupWidget):**

1. User clicks chat icon (DisclosureButton) in bottom-right
2. PopupWidget Disclosure opens, shows contact form
3. User fills form, clicks Submit
4. react-hook-form validates inputs before submission
5. onSubmit handler POSTs to Web3Forms API endpoint
6. Success/error response updates component state
7. Success state displays confirmation message or error details

**State Management:**

- Component-level state via React useState for UI toggles (theme, video playback, form submission)
- Form state managed by react-hook-form with validation
- Theme state managed by next-themes (localStorage + context)
- No global state management needed (no cross-component data sharing)

## Key Abstractions

**Container Component:**
- Purpose: Provides consistent max-width and padding spacing wrapper
- Examples: `src/components/Container.tsx`
- Pattern: Layout component accepting children and optional className prop for additional styling

**Section Title Component:**
- Purpose: Reusable heading component for all section titles with optional pre-title
- Examples: `src/components/SectionTitle.tsx`
- Pattern: Presentational component with optional alignment control (left/center)

**Benefit Item:**
- Purpose: Individual benefit bullet point with icon and text
- Examples: `src/components/Benefits.tsx` (internal function Benefit)
- Pattern: Child component of Benefits, renders icon + title + description

**Theme Changer:**
- Purpose: Toggle dark/light theme with proper hydration handling
- Examples: `src/components/DarkSwitch.tsx`
- Pattern: Client component with mounted state guard to prevent hydration mismatch

**Disclosure Patterns:**
- Purpose: Manage expandable/collapsible UI sections
- Examples: `src/components/Navbar.tsx` (mobile menu), `src/components/PopupWidget.tsx` (chat widget)
- Pattern: Headless UI Disclosure wrapper with button and panel, state-driven visibility

## Entry Points

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: User navigates to `/`
- Responsibilities: Compose all marketing sections, render main content flow

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: All page renders
- Responsibilities: Set metadata, provide theme context, render persistent navigation/footer/widget

**Static Exports:**
- Navbar: Top navigation with logo, menu, CTA button, theme toggle
- Footer: Footer with logo, navigation links, legal links, social media icons
- PopupWidget: Floating contact form in bottom-right corner

## Error Handling

**Strategy:** Component-level defensive rendering with conditional nulls

**Patterns:**
- PopupWidget returns null if videoId is not provided (graceful degradation)
- Video component returns null if videoId is missing
- DarkSwitch returns null until component is mounted (hydration safety)
- Form validation prevents submission with invalid inputs (react-hook-form mode: "onTouched")
- Fetch errors in form submission show error message state (setIsSuccess: false)
- No global error boundary or fallback components implemented

## Cross-Cutting Concerns

**Logging:** Console.log only used in PopupWidget form submission for debugging. No structured logging framework.

**Validation:**
- Form validation via react-hook-form with inline rules (required, maxLength, email pattern)
- Error messages displayed inline below form inputs
- Name field: required, max 80 chars
- Email field: required, valid email pattern
- Message field: required

**Authentication:** Not implemented. No auth layer or protected routes. Static marketing site.

**Styling:** Tailwind CSS utility classes directly in components. Dark mode via Tailwind class strategy (class on html element). No CSS modules or styled-components.

**Accessibility:** ARIA labels on interactive elements (sr-only spans for icons, aria-label for toggle buttons). Semantic HTML structure. Tab order managed by HTML structure.

---

*Architecture analysis: 2026-02-23*
