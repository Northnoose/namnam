# Coding Conventions

**Analysis Date:** 2026-02-23

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `Container.tsx`, `Navbar.tsx`, `Hero.tsx`)
- Data/utility files: camelCase (e.g., `data.js`, `types.ts`)
- Layout files: lowercase (e.g., `layout.tsx`, `page.tsx`, `globals.css`)

**Functions:**
- Component functions: PascalCase (e.g., `export const Hero = () => {}`)
- Helper/utility functions: camelCase (e.g., `onSubmit()`, `handleSubmit()`)
- Local helper functions within components: camelCase or PascalCase depending on usage (e.g., `BrandLogo1()` for components, `handleThemeChange()` for handlers)

**Variables:**
- Local state and constants: camelCase (e.g., `mounted`, `theme`, `faqdata`)
- Interface/type definitions: PascalCase (e.g., `ContainerProps`, `BenefitsProps`, `BulletItem`)
- Data objects exported: camelCase (e.g., `benefitOne`, `benefitTwo`)

**Types:**
- Interface names: PascalCase ending with "Props" for component props (e.g., `BenefitsProps`, `SectionTitleProps`, `ContainerProps`)
- Nested interfaces: PascalCase (e.g., `BulletItem`, `BenefitItemProps`)

## Code Style

**Formatting:**
- Default Next.js/ESLint formatting applied
- No explicit Prettier config file; uses default ESLint config
- Consistent spacing in JSX (e.g., `className={` with `}`)
- Inline ternary operators used for conditional rendering

**Linting:**
- Tool: ESLint with `eslint-config-next` (v14.2.3)
- Config file: `.eslintrc`
- Extends: `"next/core-web-vitals"`
- Run command: `npm run lint`

**Code Structure:**
- Imports organized at top of file
- Default exports used for page components
- Named exports for reusable components (e.g., `export const Container = ...`)
- Props destructured with `Readonly<>` wrapper where applicable
- Component definition: Arrow function syntax with named export

## Import Organization

**Order:**
1. External library imports (React, Next.js, third-party packages)
2. Internal component imports from `@/components`
3. Internal utility/data imports from `@/` alias
4. Relative imports (if any)

**Path Aliases:**
- `@/*` resolves to `./src/*` (configured in `tsconfig.json`)
- All internal imports use absolute paths with `@/` prefix (e.g., `@/components/Container`, `@/components/data`)

**Example pattern:**
```typescript
import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";
import { benefitOne, benefitTwo } from "@/components/data";
```

## Error Handling

**Patterns:**
- Form validation: `react-hook-form` with `register()` for form fields
- Validation rules: Inline validation object (e.g., `required: "Full name is required"`)
- Error display: Conditional rendering of error messages below input fields
- API errors: `.catch()` handler with user-facing error message
- Async operation errors: State-based error messaging (e.g., `isSuccess`, `Message` state)

**Example from PopupWidget:**
```typescript
{errors.name && (
  <div className="mt-1 text-sm text-red-400 invalid-feedback">
    {errors.name.message as string}
  </div>
)}
```

## Logging

**Framework:** `console` (no dedicated logging framework)

**Patterns:**
- Debug logging: `console.log()` used in event handlers (e.g., `console.log(data)` in form submission)
- Error logging: `console.log(error)` in catch blocks
- No production logging framework detected; template level only

## Comments

**When to Comment:**
- TODO comments used extensively for template customization points
- Format: `// TODO: [instruction]` on single line above or at end of relevant code
- Guidance comments: Plain text explaining what needs replacement (e.g., `// TODO: Replace with your logo image`)

**JSDoc/TSDoc:**
- Not used in codebase
- All components are self-documenting through TypeScript interfaces

**Example:**
```typescript
{/* TODO: Replace with your hero illustration (616x617) */}
<Image
  src="https://placehold.co/616x617"
  width={616}
  height={617}
  alt="[HERO_IMAGE_ALT]"
/>
```

## Function Design

**Size:**
- Small, focused functions (10-50 lines typical)
- Large components split into internal helper functions (e.g., `BrandLogo1-5`, `Benefit` within `Benefits.tsx`)

**Parameters:**
- Props destructured with `Readonly<T>` wrapper for type safety
- Single props object parameter with interface definition
- Optional props marked with `?` in interface

**Return Values:**
- React components return JSX wrapped in `<>` fragments or divs
- Functions return component elements directly
- Event handlers return `void` or `Promise<void>` for async operations

**Example:**
```typescript
export const Hero = () => {
  return (
    <>
      {/* JSX content */}
    </>
  );
}

function BrandLogo1() {
  return (
    <svg>{/* SVG content */}</svg>
  );
}
```

## Module Design

**Exports:**
- Named exports preferred for components: `export const ComponentName = () => {}`
- Default export for page/layout files: `export default function RootLayout() {}`
- Mixed exports: Some files have both default and named (e.g., `Footer.tsx` exports named `Footer` function)

**Barrel Files:**
- Not used; components imported directly from individual files

**Component Props Pattern:**
```typescript
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  // other props
}

export const Component = (props: Readonly<ComponentProps>) => {
  return <div>{props.children}</div>;
}
```

---

*Convention analysis: 2026-02-23*
