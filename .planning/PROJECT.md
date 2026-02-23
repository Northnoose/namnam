# Nam Nam Pizza & Grill

## What This Is

Nettside for Nam Nam Pizza & Grill — et fastfood-gatekjøkken i Åmot, Modum (Buskerud). Siden er en enkeltsides applikasjon (SPA) med smooth scroll rettet mot mobilbrukere som vil se menyen og bestille via telefon. Nettsiden er helt ny (ingen eksisterende) og innholdet er statisk (ingen CMS).

## Core Value

Besøkende kan finne hele menyen med priser og enkelt ringe for å bestille — telefonnummeret er alltid synlig.

## Requirements

### Validated

<!-- Infrastruktur fra eksisterende template er etablert -->

- ✓ Next.js 14 App Router-oppsett med TypeScript og Tailwind CSS — existing
- ✓ Mørk modus støtte via next-themes — existing
- ✓ Responsiv komponentstruktur (Navbar, Hero, Footer, osv.) — existing
- ✓ Smooth scroll-navigasjon med ankerlenker — existing

### Active

<!-- All Nam Nam-spesifikk funksjonalitet -->

- [ ] Hero-seksjon med logo, tagline og CTA-knapper (ring + se meny)
- [ ] Om oss-seksjon med adresse, åpningstider og Google Maps-lenke
- [ ] Meny med tabs for 5 kategorier (Grill, Hamburger, Pizza, Barnemeny, Drikke)
- [ ] Alle menypunkter med priser presentert som kort/cards
- [ ] Utkjøring/levering-seksjon med "Du ringer – Vi bringer!" og detaljer
- [ ] Kontakt/footer med adresse, telefon, åpningstider og Facebook-lenke
- [ ] Sticky ring-bar alltid synlig (tel:-lenke til 41 23 22 19)
- [ ] Visuell identitet: mørk bakgrunn, varme farger fra logoen (oransje, turkis, rød)
- [ ] Norsk språk gjennomgående
- [ ] SEO-metatags og Open Graph-tags
- [ ] Animert inngang på hero (fade-in/slide-up)
- [ ] Hover-effekter på menykort

### Out of Scope

- Online bestillingssystem — bestilling skjer via telefon, ikke digitalt
- Brukerpålogging / kontoer — ingen brukeradministrasjon
- CMS / redigeringsgrensesnitt — statisk innhold er OK
- Betalingsintegrasjon — betaling skjer ved levering (Vipps/kontant/kort)
- Native mobilapp — web-first

## Context

- **Eksisterende kodebase:** Next.js 14 + TypeScript + Tailwind CSS + next-themes. Template med seksjonskomponenter. Alle komponenter brukes om igjen, men innhold og visuell identitet bygges fra scratch.
- **Logoen:** `public/img/NamNamPizza&Grill.png` — primærlogo, brukes i hero og favicon
- **Målgruppe:** Mobilbrukere i Modum-området som vil sjekke menyen og bestille mat
- **Bestillingsprosess:** Telefon til 41 23 22 19 — ikke online bestilling
- **Levering:** Innenfor Modum kommune, kjøretillegg kr 99,-, betaling Vipps/kontant
- **Åpningstider:** Alle dager 13:00–23:00
- **Adresse:** Strandgata 11, 3340 Åmot (langs Riksvei 287)
- **Facebook:** facebook.com/NumNumPizzaGrill
- **Google-anmeldelser:** 4.4/5 stjerner (53 anmeldelser)
- **Tilbud å fremheve:** 2 store valgfri pizza + 1.5L brus = kun 450,-

## Constraints

- **Tech stack:** Next.js 14 + TypeScript + Tailwind CSS — eksisterende template, ikke bytte stack
- **Statisk:** Ingen backend, ingen database, ingen CMS — innhold hardkodet i komponenter
- **Norsk:** Alt innhold på norsk gjennomgående
- **Mobil-first:** Flertallet bestiller fra mobil — prioriter mobilopplevelse
- **Ytelse:** Rask lasting — ingen unødvendige dependencies, lazy-loading for bilder
- **Logo:** Bruk `NamNamPizza&Grill.png` — ikke lag ny logo

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Statisk innhold (ingen CMS) | Innholdet endres sjelden; enklere å vedlikeholde | — Pending |
| Mørk bakgrunn som standard | Matcher logoens svarte bakgrunn; varm kontrast med oransje/turkis | — Pending |
| Telefon-bestilling (ingen online ordre) | Eksisterende forretningsmodell; ingen infrastruktur for online bestilling | — Pending |
| Menytabs (ikke accordion) | Bedre mobilopplevelse for å bla mellom kategorier | — Pending |
| SPA med smooth scroll | Enkelt nok for statisk innhold; hurtigere enn flersidig | — Pending |

---
*Last updated: 2026-02-23 after initialization*
