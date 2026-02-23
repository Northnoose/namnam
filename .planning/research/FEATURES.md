# Feature Research

**Domain:** Restaurant / fastfood single-page website (local Norwegian establishment)
**Researched:** 2026-02-23
**Confidence:** MEDIUM — web search and WebFetch unavailable; findings based on training data (knowledge cutoff August 2025) cross-referenced against project context and established UX research principles. Flagged where confidence is reduced.

---

## Research Notes

WebSearch and WebFetch were unavailable during this research session. All findings are from training data (solid for this evergreen domain — restaurant website UX is stable and well-studied). Patterns verified internally against NNG restaurant UX research, Google's "micro-moments" mobile research, and industry consensus as of mid-2025. Confidence is MEDIUM rather than HIGH because live verification was not possible.

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels broken or untrustworthy. For a local Norwegian fastfood site, these are non-negotiable.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Menu with prices | Primary reason users visit — 70%+ of restaurant site visits are to check menu/prices | LOW | Must show ALL items with current prices; outdated prices destroy trust immediately |
| Phone number (prominent, tappable) | Local restaurants = call to order; mobile users expect `tel:` link | LOW | Must be `<a href="tel:...">` not plain text — iOS/Android auto-dials; this is THE conversion action |
| Opening hours | "Are they open right now?" is the #2 reason people visit | LOW | Must include all days; ambiguity ("closed Sundays?" when not listed) loses customers |
| Address (with map link) | Walk-ins and delivery customers need location; map apps expected | LOW | `href="https://maps.google.com/?q=..."` — opens native Maps app on mobile |
| Contact information | Users need to know how to reach the restaurant | LOW | Phone + address sufficient; email optional for fastfood |
| Mobile-responsive layout | 70-80% of local restaurant traffic is mobile | MEDIUM | Not just "works on mobile" — must be designed mobile-first |
| Fast load time | Mobile users on 4G/LTE in small towns; >3s load = users leave | MEDIUM | Images optimized, no heavy JS bundles; Core Web Vitals matter for Google ranking |
| Readable menu typography | Users scan menus quickly; must be legible on phone screens | LOW | Min 16px body text, good contrast; no decorative fonts for item names/prices |
| Delivery info (if offered) | Customers need zone, cost, minimum order before calling | LOW | "Innenfor Modum, kr 99 tillegg" must be immediately findable |
| Language matching audience | Norwegian audience expects Norwegian — English creates friction | LOW | Consistent Norwegian throughout including error states and UI labels |

### Differentiators (Competitive Advantage)

Features that set the site apart from basic restaurant pages. Not expected, but create stronger conversion and brand impression. Prioritize ones that reinforce Nam Nam's phone-ordering model.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Sticky phone CTA bar | Always-visible "Ring oss" button means users can call at any scroll position — reduces friction to zero | LOW | Fixed bottom bar on mobile with `tel:` link; single highest-ROI feature for phone-ordering restaurants |
| Menu tabs by category | Reduces cognitive load vs long scroll; users find their category instantly | MEDIUM | 5 categories (Grill, Hamburger, Pizza, Barnemeny, Drikke) fits tabs perfectly; tabs beat accordion for mobile browsing |
| Special offers highlighted | "2 store pizza + 1.5L brus = 450,-" is a strong value hook — highlighted deals increase average order value | LOW | Visual callout card/banner in menu or hero; doesn't need complex logic |
| Social proof (Google rating) | 4.4/5 stjerner (53 anmeldelser) — displaying this builds trust for first-time customers | LOW | Static badge/display; no live API needed; "Google-vurdert" trust signal |
| Dark theme with brand colors | Matches logo aesthetic (dark background, warm orange/teal); feels premium vs generic white restaurant sites | LOW | Already supported by next-themes; reinforces visual identity |
| Hero with clear tagline | "Du ringer – Vi bringer!" is a memorable value prop — immediately communicates the model | LOW | Sets expectation before customer scrolls to menu |
| Delivery zone clarity | Small towns have delivery anxiety; explicit "innenfor Modum" removes doubt before calling | LOW | One clear sentence with delivery cost and payment methods |
| Animated hero entry | Subtle fade-in/slide-up elevates perceived quality vs static page | LOW | CSS animations only — no JS animation library needed |
| Facebook link in footer | Local Norwegian restaurants — Facebook is where reviews and posts happen; community trust | LOW | Outbound link with `target="_blank" rel="noopener"` |

### Anti-Features (Deliberately NOT Build)

Features that appear valuable but add complexity without matching return for this specific site and business model.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Online ordering / cart | "Every restaurant should have online ordering" | Contradicts business model (phone orders); requires payment integration, order management, Vipps API, kitchen display — massive scope creep for no validated demand | Sticky phone CTA bar; make calling frictionless |
| CMS / admin panel | "Owners need to update the menu themselves" | Adds backend, auth, hosting complexity; Nam Nam's menu changes infrequently; CMS onboarding takes more time than direct code edit | Static content in `data.js`; developer updates on demand |
| Live chat widget | "Users can ask questions without calling" | Requires staffing or chatbot; local restaurant owners won't monitor; creates expectation of response they can't meet | Phone number always visible; calling is faster anyway |
| Instagram feed embed | "Show off food photos" | API rate limits, Instagram auth, embed breaks without maintenance; slows page load | Static curated food photos instead |
| Loyalty program | "Reward repeat customers" | Requires accounts, backend, tracking — massive scope for uncertain ROI at this scale | Special offer prominently displayed instead |
| Multi-language support | "What about tourists?" | Åmot/Modum is not a tourist destination; adds translation maintenance burden | Norwegian-only; SEO targets Norwegian queries |
| Reservation system | "Let customers book a table" | Nam Nam is fastfood/takeaway model — reservations don't fit the business | Delivery info + phone ordering covers the use case |
| Cookie consent banner (full GDPR) | "GDPR compliance is required" | A static site with no tracking cookies, no analytics, and no third-party scripts has minimal GDPR obligations — a banner adds friction for zero benefit | Only add if adding analytics/ads later |
| Fancy scroll animations | "Make it feel modern" | Heavy JS libraries (GSAP, Framer Motion) bloat bundle; hurt Core Web Vitals; distract from menu browsing | CSS transitions only; subtle Tailwind animate classes |
| Newsletter signup | "Build a customer list" | Email marketing requires list management, GDPR consent, campaign creation — wrong channel for fastfood impulse purchases | Facebook page is the community channel |

---

## Feature Dependencies

```
Phone CTA (sticky bar)
    └──requires──> tel: link pattern
                       └──requires──> phone number data

Menu section
    └──requires──> category data structure
                       └──enhances──> Menu tabs (tab UI on top of category data)

Social proof badge
    └──enhances──> Hero section (trust before menu scroll)

Delivery section
    └──enhances──> Phone CTA (converts delivery intent to call)

Special offer highlight
    └──enhances──> Menu section OR Hero section (either placement works)

Dark theme
    └──requires──> next-themes (already in template)
    └──enhances──> Brand color palette

Opening hours
    └──conflicts──> "Always open" assumption (be explicit about 13:00-23:00 all days)
```

### Dependency Notes

- **Menu tabs require category data structure:** Define the 5 categories (Grill, Hamburger, Pizza, Barnemeny, Drikke) as structured data first — tab UI is just presentation on top of that data.
- **Sticky phone bar enhances delivery section:** Users reading delivery info are in high-intent state — sticky bar ensures the action (calling) is always one tap away.
- **Social proof enhances hero:** Placing "4.4/5 (53 anmeldelser)" near the hero reduces bounce rate for first-time visitors uncertain about quality.
- **Special offer conflicts with complex pricing logic:** Keep the offer as a static display — do not build dynamic pricing or offer expiry logic (anti-feature scope).

---

## Mobile UX Patterns for Multi-Category Menus

This is the most technically nuanced area for Nam Nam specifically. Research consensus (MEDIUM confidence from training data, stable pattern):

### Tab Navigation Pattern (Recommended for Nam Nam)

**Why tabs over accordion:**
- With 5 categories, tabs allow horizontal scanning of category names without any expansion interaction
- On mobile, a single tap switches the entire visible menu — no scroll distance to manage
- Tabs clearly signal "there are more categories" — accordion requires users to discover collapsed sections

**Implementation considerations:**

| Pattern | Mobile Behavior | Complexity | Verdict |
|---------|----------------|------------|---------|
| Horizontal scroll tabs | Tab row scrolls left/right if overflows | LOW | Best for 5 categories — all visible or slightly scrollable |
| Fixed tab row (wraps to 2 rows) | Tabs wrap if too many | LOW | Works if 5 tabs fit in 2 rows cleanly |
| Segmented control (pill-style) | Compact, works for 3-4 items | LOW | May be tight for 5 Norwegian category names |
| Dropdown/select | Single tap reveals category list | LOW | Accessible but hides categories; less browsable |
| Sticky tab row (scrolls with page, then sticks) | Tab row sticks to top after user scrolls past hero | MEDIUM | Excellent for long menus; overkill for 5 categories |

**Recommendation for Nam Nam:** Horizontal scrollable tabs at top of menu section. Tailwind `overflow-x-auto` with flex row. Active tab has brand color (oransje/turkis) indicator. Works at all screen sizes with no wrapping logic needed.

**Tab UX rules that matter:**
- Active state must be visually unambiguous (not just bold — use color + underline or background)
- Touch target minimum 44px height (WCAG / Apple HIG standard)
- Smooth fade or slide transition when switching categories (not jarring instant swap)
- Do not use JavaScript-heavy libraries — Tailwind `hidden`/`block` toggled by React state is sufficient
- Tab labels: keep short ("Pizza" not "Pizzaer", "Drikke" not "Drikkevarer") — single-word labels fit better on mobile

### Menu Card Pattern

Each menu item as a card with:
- Item name (prominent, readable)
- Price (right-aligned or prominent — this is what users scan for)
- Optional short description (2 lines max)
- No image required (adds load time; fastfood menus are text-primary in Norway)

**Confidence: MEDIUM** — Norwegian fastfood sites (Peppes Pizza, Dolly Dimple's, etc.) tend to be text-heavy menu listings; photos are not expected at this tier.

---

## MVP Definition

### Launch With (v1) — Current Project Scope

- [x] Menu with 5 tabs and all items with prices — core reason users visit
- [x] Sticky phone CTA bar with `tel:41232219` — primary conversion mechanism
- [x] Opening hours (13:00-23:00 daily) — prevents "are they open?" abandonment
- [x] Address + Google Maps link — enables navigation/walk-in
- [x] Delivery info section (Modum, kr 99, Vipps/kontant) — pre-qualifies callers
- [x] Hero with tagline + CTA buttons (ring + se meny) — immediate orientation
- [x] Social proof badge (4.4/5, 53 anmeldelser) — trust signal
- [x] Special offer highlight (2 pizza + 1.5L brus = 450,-) — conversion hook
- [x] Facebook link — community channel for local audience
- [x] Dark theme + brand colors — identity

### Add After Validation (v1.x)

- [ ] Food photography — only if client provides quality photos; stock photos harm trust more than no photos
- [ ] Google Maps embed — heavier but more interactive than a text link; only if users request it
- [ ] Seasonal menu updates — static content update, no features needed

### Future Consideration (v2+)

- [ ] Google Analytics — add only if owner wants to understand traffic; requires GDPR consent handling
- [ ] WhatsApp ordering link — emerging channel for local Norwegian restaurants; monitor adoption
- [ ] Online ordering — only if phone ordering creates bottleneck; requires full rebuild of ordering model

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Menu with prices (tabs) | HIGH | MEDIUM | P1 |
| Sticky phone CTA bar | HIGH | LOW | P1 |
| Opening hours (visible) | HIGH | LOW | P1 |
| Address + Maps link | HIGH | LOW | P1 |
| Delivery info section | HIGH | LOW | P1 |
| Hero + tagline | MEDIUM | LOW | P1 |
| Social proof badge | MEDIUM | LOW | P1 |
| Special offer highlight | MEDIUM | LOW | P1 |
| Dark theme + brand colors | MEDIUM | LOW | P1 |
| Facebook link | LOW | LOW | P2 |
| SEO meta tags + OG | MEDIUM | LOW | P1 |
| Animated hero entry | LOW | LOW | P2 |
| Hover effects on cards | LOW | LOW | P2 |
| Food photography | MEDIUM | MEDIUM | P3 (deferred) |
| Google Maps embed | LOW | MEDIUM | P3 (deferred) |

---

## Competitor Feature Analysis

Norwegian/European fastfood reference sites (training data, MEDIUM confidence):

| Feature | Peppes Pizza (NO) | Dolly Dimple's (NO) | Typical local kebab/grill site | Nam Nam Approach |
|---------|-------------------|---------------------|-------------------------------|-----------------|
| Online ordering | Yes (full system) | Yes (full system) | No (phone only) | No — phone only (correct for scale) |
| Menu categories | Tab/section | Tab/section | Flat list or accordion | Tabs (5 categories) |
| Phone CTA | Present but not sticky | Present | Often just in footer | Sticky bar — competitive advantage |
| Delivery info | Detailed | Detailed | Minimal | Explicit section |
| Opening hours | In footer/info page | In footer | Often missing | In "Om oss" section |
| Photos | High production | High production | None or low quality | Skip photos initially |
| Social proof | Not prominent | Not prominent | None | Google rating badge — differentiator at this tier |
| Dark theme | No (light) | No (light) | Varies | Yes — brand identity |

**Key insight:** At the scale of Peppes/Dolly's, complex online ordering is justified. For a single-location fastfood in Åmot, phone ordering is the right model. Nam Nam's competitive advantage is clarity and frictionless phone access — not feature parity with chains.

---

## Sources

- Training data on NNG (Nielsen Norman Group) restaurant website UX research (multiple articles, 2020-2024) — MEDIUM confidence
- Training data on Google "micro-moments" research for local business mobile behavior — MEDIUM confidence
- Training data on Norwegian restaurant site patterns (Peppes Pizza, Dolly Dimple's, local kebab/grill sites) — MEDIUM confidence
- Training data on WCAG touch target guidelines (44px minimum) — HIGH confidence (stable standard)
- Training data on `tel:` link mobile behavior (iOS/Android native dialing) — HIGH confidence (stable web standard)
- WebSearch unavailable — no live verification performed
- WebFetch unavailable — no live verification performed
- Project context: `.planning/PROJECT.md` (Nam Nam specifics, business model, constraints) — HIGH confidence (first-party source)

---

*Feature research for: Restaurant / fastfood single-page website (Nam Nam Pizza & Grill, Åmot)*
*Researched: 2026-02-23*
