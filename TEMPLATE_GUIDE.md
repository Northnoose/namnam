# Template Guide

A section-by-section reference for customizing this Next.js + TailwindCSS starter template.

---

## Section Map

| Page Section | Component File | Data Source |
|---|---|---|
| Navigation bar | `src/components/Navbar.tsx` | Inline in component |
| Hero (headline + CTAs) | `src/components/Hero.tsx` | Inline in component |
| Benefits / Features | `src/components/Benefits.tsx` | `src/components/data.js` |
| Video embed | `src/components/Video.tsx` | `src/app/page.tsx` (videoId prop) |
| Testimonials | `src/components/Testimonials.tsx` | Inline in component |
| FAQ accordion | `src/components/Faq.tsx` | `faqdata` array inside Faq.tsx |
| CTA banner | `src/components/Cta.tsx` | Inline in component |
| Footer | `src/components/Footer.tsx` | Inline in component |
| Contact popup | `src/components/PopupWidget.tsx` | Inline in component |
| Section headings | `src/components/SectionTitle.tsx` | Props passed from `src/app/page.tsx` |
| Page layout & metadata | `src/app/layout.tsx` | Metadata export + component imports |

---

## Swapping Images

### Hero Image (616×617 px)
**File:** `src/components/Hero.tsx`

Change the `src` attribute on the `<Image>` component:
```tsx
<Image
  src="https://your-cdn.com/your-hero-image.png"  {/* ← update this */}
  width={616}
  height={617}
  alt="Your descriptive alt text"
  loading="eager"
/>
```
For local files, place the image in `/public/img/` and use `/img/your-image.png`.

### Benefit Section Images (521×521 px)
**File:** `src/components/data.js`

Update the `image` field in `benefitOne` and `benefitTwo`:
```js
const benefitOne = {
  image: "/img/your-benefit-image.png",  // ← update this
  // ...
};
```

### Testimonial Avatars (80×80 px)
**File:** `src/components/Testimonials.tsx`

Update the `image` prop on each `<Avatar>` component:
```tsx
<Avatar
  image="/img/user-sarah.jpg"  {/* ← update this */}
  name="Sarah Smith"
  title="CEO at Acme"
/>
```

### Logo
**File:** `public/img/logo.svg`

Replace the file directly. The logo is referenced as `/img/logo.svg` in:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`

If you use a different filename or format, update the `src` prop in both files.

### Remote Images
If you use images from an external domain (CDN, placehold.co, etc.), ensure the hostname is listed in `next.config.ts`:
```ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "your-cdn.com" },
  ],
},
```

---

## Swapping Colors

The primary accent color used throughout the project is Tailwind's built-in **indigo** (`indigo-500`, `indigo-600`, etc.).

To change the brand color globally:

1. **Add your palette** to `tailwind.config.ts`:
```ts
theme: {
  extend: {
    colors: {
      brand: {
        50: "#fdf4ff",   /* TODO: Change to your brand color */
        100: "#fae8ff",
        500: "#a855f7",  /* TODO: Change to your brand color */
        600: "#9333ea",  /* TODO: Change to your brand color */
        900: "#581c87",
      },
    },
  },
},
```

2. **Find and replace** `indigo-` with `brand-` across all TSX/CSS files:
```bash
# Example using grep to find all occurrences first
grep -r "indigo-" src/
```

---

## Swapping Fonts

The template uses **Inter** (loaded via `next/font/google`).

To change to a different Google Font:

1. In `src/app/layout.tsx`:
```tsx
// Before
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// After (example: Poppins)
import { Poppins } from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });
```

2. Update the `<body>` className:
```tsx
<body className={poppins.className}>
```

3. In `tailwind.config.ts`, update the font family:
```ts
fontFamily: {
  sans: ["Poppins", ...defaultTheme.fontFamily.sans],  // ← update this
},
```

---

## Changing Navigation Links

**Navbar links** — `src/components/Navbar.tsx`:
```tsx
const navigation = [
  "Product",   // ← change these
  "Features",
  "Pricing",
  "Company",
  "Blog",
];
```
Each item links to `/` by default. Update the `href` in the `<Link>` components.

**Footer nav links** — `src/components/Footer.tsx`:
Same `navigation` and `legal` arrays. Update both the labels and the `href` props on the `<Link>` components.

---

## Editing Section Content

### Benefits / Features
Edit `src/components/data.js`. Each benefit block has:
- `title` — section heading
- `desc` — section paragraph
- `image` — section image URL
- `bullets` — array of `{ title, desc, icon }` feature points

To change bullet icons, replace the imported Heroicons:
```js
import { YourIconName } from "@heroicons/react/24/solid";
// then use: icon: <YourIconName />
```

Browse available icons at [heroicons.com](https://heroicons.com).

### Testimonials
Edit the three `<div>` blocks directly in `src/components/Testimonials.tsx`. Each contains:
- `<Mark>` — the highlighted word/phrase
- Remaining text — the testimonial body
- `<Avatar image="..." name="..." title="..." />` — author info

### FAQ
Edit the `faqdata` array in `src/components/Faq.tsx`. Add or remove `{ question, answer }` entries as needed.

### Section Titles
All section headings are configured in `src/app/page.tsx` via `<SectionTitle>` props:
```tsx
<SectionTitle
  preTitle="[BENEFITS_PRETITLE]"   {/* small eyebrow text */}
  title="[BENEFITS_TITLE]"          {/* main H2 heading */}
>
  [BENEFITS_DESCRIPTION]           {/* subtitle paragraph */}
</SectionTitle>
```

---

## Contact Form Setup

The popup contact form (`PopupWidget.tsx`) uses [Web3Forms](https://web3forms.com):

1. Create a free account at [web3forms.com](https://web3forms.com)
2. Copy your Access Key
3. In `src/components/PopupWidget.tsx`, replace:
```tsx
value="YOUR_ACCESS_KEY_HERE"
```
with your actual key. Form submissions will be sent to your registered email.

---

## Starting a New Project from This Template

1. **Clone or copy** the `website_template` folder
2. Run `npm install`
3. Run `npm run dev` and confirm the site loads at `localhost:3000`
4. **Find all placeholders:**
   ```bash
   grep -r "\[" src/
   ```
5. Work through the list in this order:
   - `src/app/layout.tsx` — metadata (title, description)
   - `src/app/page.tsx` — section titles and video ID
   - `src/components/data.js` — feature/benefit content
   - `src/components/Hero.tsx` — headline, CTAs, images
   - `src/components/Testimonials.tsx` — quotes, authors, images
   - `src/components/Faq.tsx` — questions and answers
   - `src/components/Cta.tsx` — CTA headline and button
   - `src/components/Navbar.tsx` — company name, CTA label
   - `src/components/Footer.tsx` — company name, description, social links
   - `src/components/PopupWidget.tsx` — headline, API key, company name
6. **Replace** `/public/img/logo.svg` with your logo
7. **Update** `tailwind.config.ts` with your brand color and font
8. Run `npm run build` to confirm a clean production build
9. Deploy (Vercel recommended — `vercel deploy`)
