# Requirements: Nam Nam Pizza & Grill

**Defined:** 2026-02-23
**Core Value:** Besøkende kan finne hele menyen med priser og enkelt ringe for å bestille — telefonnummeret er alltid synlig.

---

## v1 Requirements

### Foundation

- [ ] **FOUND-01**: Siden bruker mørkt tema som standard uten synlig flash ved lasting (FOUC-fri)
- [ ] **FOUND-02**: HTML har `lang="nb"` (norsk bokmål) for korrekt SEO og skjermleser-uttale
- [ ] **FOUND-03**: Logo (`NamNamPizza&Grill.png`) vises med `next/image` med eksplisitte dimensjoner (ingen layout shift)
- [ ] **FOUND-04**: Menu-data er definert i `src/data/menu.ts` med TypeScript-typer (`MenuItem`, `MenuCategory`)
- [ ] **FOUND-05**: Siden er fullt responsiv og fungerer på mobil (320px+), nettbrett og desktop

### Navigation

- [ ] **NAV-01**: Navbar viser logo og navigasjonslenker til alle seksjoner (Om oss, Meny, Levering, Kontakt)
- [ ] **NAV-02**: Navbar er sticky øverst på desktop med transparent-til-solid bakgrunn ved scroll
- [ ] **NAV-03**: Mobilmeny (hamburger) åpner/lukker med alle seksjonslenker
- [ ] **NAV-04**: Sticky ring-bar vises alltid i bunnen (mobil) / toppen (desktop) med klikkbar `tel:+4741232219`-lenke
- [ ] **NAV-05**: Ankernavigasjon scroller smooth til riktig seksjon uten at innhold skjules bak sticky elementer

### Hero

- [ ] **HERO-01**: Hero viser `NamNamPizza&Grill.png` logoen stort og sentralt
- [ ] **HERO-02**: Tagline vises: "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker!"
- [ ] **HERO-03**: Undertekst vises: "Du ringer – Vi bringer! 📞 41 23 22 19"
- [ ] **HERO-04**: "RING OG BESTILL"-knapp er synlig og starter telefonsamtale (`tel:+4741232219`)
- [ ] **HERO-05**: "SE MENYEN"-knapp scroller smooth til meny-seksjon
- [ ] **HERO-06**: Hero-innhold har animert inngang (fade-in/slide-up) ved første lasting

### Om oss

- [ ] **OM-01**: Seksjon viser 2–3 setninger om restauranten (sentralt i Åmot, åpent hver dag 13–23, bred meny, utkjøring)
- [ ] **OM-02**: Adresse vises: Strandgata 11, 3340 Åmot
- [ ] **OM-03**: Åpningstider vises visuelt: Alle dager 13:00–23:00
- [ ] **OM-04**: Lenke til Google Maps åpner kartapp/nettleserkart for adressen
- [ ] **OM-05**: Google-vurdering vises som statisk badge: "4.4/5 ⭐ (53 anmeldelser)"

### Meny

- [ ] **MENU-01**: Meny vises med tabs/faner for 5 kategorier: 🔥 Grill | 🍔 Hamburger | 🍕 Pizza | 👶 Barnemeny | 🥤 Drikke
- [ ] **MENU-02**: Tab-navigasjon er tilgjengelig med tastatur og skjermleser (Headless UI Tab)
- [ ] **MENU-03**: Tab-listen er horisontal scroll på smal mobil (ikke wrapping)
- [ ] **MENU-04**: Hvert menypunkt vises som kort med navn, ingredienser og pris
- [ ] **MENU-05**: **Grill**-kategori inneholder alle 11 retter med korrekte priser (fra BRIEF.md)
- [ ] **MENU-06**: **Hamburger**-kategori viser vektklasser (100g/160g/250g/333g) som badges/pills med tilhørende priser
- [ ] **MENU-07**: **Pizza**-kategori viser alle 20 pizzaer (inkl. calzone) med liten/stor pris side om side
- [ ] **MENU-08**: **Barnemeny**-kategori viser 3 retter med priser
- [ ] **MENU-09**: **Drikke**-kategori viser stor drikke, liten drikke og kuli med priser
- [ ] **MENU-10**: "Nam Nam spesial" (Grill) har spesiell fremhevet styling (featured/anbefalt-badge)
- [ ] **MENU-11**: "Lag din egen pizza" (Pizza nr. 17) har spesiell fremhevet styling
- [ ] **MENU-12**: Tilbudsbadge er synlig: "🎉 TILBUD! 2 store valgfri pizza + 1.5L brus = kun 450,-"
- [ ] **MENU-13**: Menykort har hover-effekt (subtil animasjon/skygge)

### Levering

- [ ] **LEV-01**: Seksjon har overskrift: "Du ringer – Vi bringer!"
- [ ] **LEV-02**: Forklaring vises: Ring 41 23 22 19, bestill fra menyen, levering innenfor Modum kommune
- [ ] **LEV-03**: Kjøretillegg kr 99,- vises tydelig
- [ ] **LEV-04**: Betalingsmetoder ved levering vises: Vipps eller kontant
- [ ] **LEV-05**: Telefonnummer er klikkbar `tel:+4741232219`-lenke

### Footer / Kontakt

- [ ] **FOOT-01**: Footer viser adresse: Strandgata 11, 3340 Åmot
- [ ] **FOOT-02**: Telefonnummer er klikkbar `tel:+4741232219`-lenke
- [ ] **FOOT-03**: Åpningstider vises: Alle dager 13:00–23:00
- [ ] **FOOT-04**: Facebook-lenke til `facebook.com/NumNumPizzaGrill`
- [ ] **FOOT-05**: Tekst: "Langs Riksvei 287 – Parkering utenfor!"
- [ ] **FOOT-06**: Copyright-linje med restaurantens navn

### SEO & Meta

- [ ] **SEO-01**: `<title>` er: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum"
- [ ] **SEO-02**: `<meta name="description">` beskriver restauranten på norsk
- [ ] **SEO-03**: Open Graph-tags inkluderer tittel, beskrivelse og logo-bilde
- [ ] **SEO-04**: Favicon er basert på logoen (32×32 + 180×180 Apple touch icon)
- [ ] **SEO-05**: LocalBusiness JSON-LD schema er implementert med adresse, telefon, åpningstider og `FastFoodRestaurant` type

---

## v2 Requirements

### Potensielle fremtidige forbedringer

- **V2-01**: Matfotografi — legg til bilder av retter hvis restauranten skaffer kvalitetsbilder
- **V2-02**: Embedded Google Maps (iframe) — for brukere som ikke vil forlate siden
- **V2-03**: WhatsApp/SMS bestillingsoption — supplement til telefon
- **V2-04**: Spesialmenyer for høytider (jul, id, etc.)
- **V2-05**: Parallax scroll-effekter på hero/seksjonsbakgrunner

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Online bestillingssystem | Bestilling skjer kun via telefon — eksisterende forretningsmodell |
| Brukerpålogging / kontoer | Ingen brukeradministrasjon nødvendig |
| CMS / redigeringsgrensesnitt | Statisk innhold er OK; endringer gjøres i kode |
| Betalingsintegrasjon | Betaling ved levering (Vipps/kontant/kort) |
| Native mobilapp | Web-first; responsiv SPA dekker mobilbrukere |
| Matfotografi i v1 | Ingen bekreftet tilgang til kvalitetsbilder; dårlige bilder skader tillit |
| Embedded Google Maps | Tekstlenke er tilstrekkelig; iframe legger til 200ms last |
| Kundeanmeldelser-integrasjon | Statisk Google-badge er tilstrekkelig |

---

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Pending |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Pending |
| NAV-01 | Phase 2 | Pending |
| NAV-02 | Phase 2 | Pending |
| NAV-03 | Phase 2 | Pending |
| NAV-04 | Phase 2 | Pending |
| NAV-05 | Phase 2 | Pending |
| HERO-01 | Phase 3 | Pending |
| HERO-02 | Phase 3 | Pending |
| HERO-03 | Phase 3 | Pending |
| HERO-04 | Phase 3 | Pending |
| HERO-05 | Phase 3 | Pending |
| HERO-06 | Phase 3 | Pending |
| OM-01 | Phase 3 | Pending |
| OM-02 | Phase 3 | Pending |
| OM-03 | Phase 3 | Pending |
| OM-04 | Phase 3 | Pending |
| OM-05 | Phase 3 | Pending |
| MENU-01 | Phase 3 | Pending |
| MENU-02 | Phase 3 | Pending |
| MENU-03 | Phase 3 | Pending |
| MENU-04 | Phase 3 | Pending |
| MENU-05 | Phase 3 | Pending |
| MENU-06 | Phase 3 | Pending |
| MENU-07 | Phase 3 | Pending |
| MENU-08 | Phase 3 | Pending |
| MENU-09 | Phase 3 | Pending |
| MENU-10 | Phase 3 | Pending |
| MENU-11 | Phase 3 | Pending |
| MENU-12 | Phase 3 | Pending |
| MENU-13 | Phase 3 | Pending |
| LEV-01 | Phase 3 | Pending |
| LEV-02 | Phase 3 | Pending |
| LEV-03 | Phase 3 | Pending |
| LEV-04 | Phase 3 | Pending |
| LEV-05 | Phase 3 | Pending |
| FOOT-01 | Phase 3 | Pending |
| FOOT-02 | Phase 3 | Pending |
| FOOT-03 | Phase 3 | Pending |
| FOOT-04 | Phase 3 | Pending |
| FOOT-05 | Phase 3 | Pending |
| FOOT-06 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| SEO-04 | Phase 4 | Pending |
| SEO-05 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 47 total
- Mapped to phases: 47
- Unmapped: 0

---
*Requirements defined: 2026-02-23*
*Last updated: 2026-02-23 after roadmap creation*
