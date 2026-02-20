# Next.js + TailwindCSS Starter Template

A clean, production-ready landing page starter built with **Next.js 14** (App Router) and **TailwindCSS**. Includes dark mode, a contact popup widget, responsive navigation, and a full landing page layout — all content-free and ready to customize.

---

## Project Structure

```
website_template/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: metadata, Navbar, Footer, PopupWidget
│   │   ├── page.tsx            # Home page: assembles all sections
│   │   └── globals.css         # Global Tailwind base styles
│   └── components/
│       ├── data.js             # Content data: benefit sections and feature bullets
│       ├── Navbar.tsx          # Top navigation bar with mobile hamburger menu
│       ├── Hero.tsx            # Hero section: headline, CTAs, brand logos
│       ├── SectionTitle.tsx    # Reusable section heading component
│       ├── Benefits.tsx        # Two-column feature/benefit section with bullet points
│       ├── Video.tsx           # YouTube video embed section
│       ├── Testimonials.tsx    # Three-column testimonial cards
│       ├── Faq.tsx             # Collapsible FAQ accordion
│       ├── Cta.tsx             # Full-width call-to-action banner
│       ├── Footer.tsx          # Footer with nav links and social icons
│       ├── Container.tsx       # Max-width responsive wrapper
│       ├── DarkSwitch.tsx      # Light/dark mode toggle button
│       └── PopupWidget.tsx     # Fixed contact form popup (bottom-right)
├── public/
│   └── img/
│       └── logo.svg            # TODO: Replace with your logo
├── tailwind.config.ts          # Tailwind config: colors, fonts
├── next.config.ts              # Next.js config: image domains
└── package.json
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

To build for production:

```bash
npm run build
npm start
```

---

## How to Customize

### 1. Replace Content Placeholders

All placeholder tokens follow `[SCREAMING_SNAKE_CASE]` format. Search the project with:

```bash
grep -r "\[" src/
```

Replace each token with your actual content. See the full token list below.

### 2. Change Colors

Open `tailwind.config.ts`. The primary brand color used throughout the project is **indigo** (Tailwind built-in). To change it:

1. Add a `brand` color key under `theme.extend.colors` with your palette
2. Find-and-replace `indigo-` with `brand-` across all component files

The `/* TODO: Change to your brand color */` comments in `tailwind.config.ts` mark where to add custom color values.

### 3. Change Fonts

In `tailwind.config.ts`, the `fontFamily.sans` array starts with `"Inter"`. To change it:

1. Update the font name in `tailwind.config.ts`
2. Update the `next/font/google` import in `src/app/layout.tsx` to your chosen font

### 4. Replace Images

All images currently use `https://placehold.co/WxH` placeholders. To replace them:

- **Hero image** (616×617): `src/components/Hero.tsx` — update the `src` prop on the `<Image>` component
- **Benefit section images** (521×521): `src/components/data.js` — update the `image` field in `benefitOne` and `benefitTwo`
- **Testimonial avatars** (80×80): `src/components/Testimonials.tsx` — update the `image` prop on each `<Avatar>`
- **Logo**: `public/img/logo.svg` — replace the file, or update the `src` in `Navbar.tsx` and `Footer.tsx`

### 5. Contact Form (PopupWidget)

The popup uses [Web3Forms](https://web3forms.com) to handle form submissions:

1. Sign up at [web3forms.com](https://web3forms.com) and get a free API key
2. In `src/components/PopupWidget.tsx`, replace `YOUR_ACCESS_KEY_HERE` with your actual key

---

## Placeholder Token Reference

| Token | Location | Description |
|---|---|---|
| `[COMPANY_NAME]` | layout.tsx, Navbar.tsx, Footer.tsx, PopupWidget.tsx | Your company or product name |
| `[META_DESCRIPTION]` | layout.tsx | SEO meta description for the page |
| `[HERO_HEADLINE]` | Hero.tsx | Main hero heading (H1) |
| `[HERO_SUBHEADLINE]` | Hero.tsx | Hero paragraph text |
| `[HERO_CTA_PRIMARY_LABEL]` | Hero.tsx | Primary call-to-action button label |
| `[HERO_CTA_SECONDARY_LABEL]` | Hero.tsx | Secondary link label (e.g. "View on GitHub") |
| `[HERO_IMAGE_ALT]` | Hero.tsx | Alt text for the hero illustration |
| `[TRUST_BADGE_NUMBER]` | Hero.tsx | Number shown in "Trusted by X+ customers" |
| `[TRUST_BADGE_LABEL]` | Hero.tsx | Label after the trust badge number |
| `[NAV_CTA_LABEL]` | Navbar.tsx | Label for the "Get Started" nav button |
| `[BENEFITS_PRETITLE]` | page.tsx | Small eyebrow text above benefits section title |
| `[BENEFITS_TITLE]` | page.tsx | Benefits section main heading |
| `[BENEFITS_DESCRIPTION]` | page.tsx | Benefits section subtitle paragraph |
| `[BENEFIT_SECTION_1_TITLE]` | data.js | First benefits block heading |
| `[BENEFIT_SECTION_1_DESCRIPTION]` | data.js | First benefits block paragraph |
| `[FEATURE_TITLE_1]` – `[FEATURE_TITLE_3]` | data.js | Bullet point titles in first benefits block |
| `[FEATURE_DESCRIPTION_1]` – `[FEATURE_DESCRIPTION_3]` | data.js | Bullet point descriptions in first benefits block |
| `[BENEFIT_SECTION_2_TITLE]` | data.js | Second benefits block heading |
| `[BENEFIT_SECTION_2_DESCRIPTION]` | data.js | Second benefits block paragraph |
| `[FEATURE_TITLE_4]` – `[FEATURE_TITLE_6]` | data.js | Bullet point titles in second benefits block |
| `[FEATURE_DESCRIPTION_4]` – `[FEATURE_DESCRIPTION_6]` | data.js | Bullet point descriptions in second benefits block |
| `[VIDEO_PRETITLE]` | page.tsx | Small eyebrow text above video section |
| `[VIDEO_TITLE]` | page.tsx | Video section heading |
| `[VIDEO_DESCRIPTION]` | page.tsx | Video section subtitle paragraph |
| `[YOUTUBE_VIDEO_ID]` | page.tsx | YouTube video ID (the part after `?v=`) |
| `[TESTIMONIALS_PRETITLE]` | page.tsx | Small eyebrow text above testimonials |
| `[TESTIMONIALS_TITLE]` | page.tsx | Testimonials section heading |
| `[TESTIMONIALS_DESCRIPTION]` | page.tsx | Testimonials section subtitle |
| `[TESTIMONIAL_HIGHLIGHT_1]` – `[TESTIMONIAL_HIGHLIGHT_3]` | Testimonials.tsx | Highlighted word/phrase in each testimonial |
| `[TESTIMONIAL_TEXT_1]` – `[TESTIMONIAL_TEXT_3]` | Testimonials.tsx | Full testimonial quote text |
| `[TESTIMONIAL_AUTHOR_1]` – `[TESTIMONIAL_AUTHOR_3]` | Testimonials.tsx | Testimonial author name |
| `[TESTIMONIAL_ROLE_1]` – `[TESTIMONIAL_ROLE_3]` | Testimonials.tsx | Testimonial author job title / company |
| `[FAQ_PRETITLE]` | page.tsx | Small eyebrow text above FAQ section |
| `[FAQ_TITLE]` | page.tsx | FAQ section heading |
| `[FAQ_DESCRIPTION]` | page.tsx | FAQ section subtitle |
| `[FAQ_QUESTION_1]` – `[FAQ_QUESTION_3]` | Faq.tsx | FAQ question text |
| `[FAQ_ANSWER_1]` – `[FAQ_ANSWER_3]` | Faq.tsx | FAQ answer text |
| `[CTA_HEADLINE]` | Cta.tsx | CTA banner main heading |
| `[CTA_SUBHEADLINE]` | Cta.tsx | CTA banner subtitle |
| `[CTA_BUTTON_LABEL]` | Cta.tsx | CTA button label |
| `[FOOTER_DESCRIPTION]` | Footer.tsx | Short description in footer left column |
| `[POPUP_HEADLINE]` | PopupWidget.tsx | Contact popup heading |
| `[POPUP_SUBHEADLINE]` | PopupWidget.tsx | Contact popup subtitle |
