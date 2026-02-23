# Oppgave: Bygg nettside for Nam Nam Pizza & Grill

Logoen ligger i prosjektet som `NamNamPizza&Grill.png` – bruk denne som hovedlogo på nettsiden.

## Om bedriften

Nam Nam Pizza & Grill er et populært gatekjøkken/fastfood-restaurant i Åmot sentrum, Modum kommune (Buskerud). De er kjent for god mat, store porsjoner, vennlig betjening og 4.4/5 stjerner på Google (53 anmeldelser). Åpent hver dag hele året.

**Adresse:** Strandgata 11, 3340 Åmot (langs Riksvei 287, parkering utenfor)  
**Telefon:** 41 23 22 19  
**Åpningstider:** Alle dager 13:00–23:00  
**Facebook:** facebook.com/NumNumPizzaGrill  
**Betaling:** Vipps, kontant, kort, NFC

### Kjernetjeneste: "Du ringer – Vi bringer!"

De tilbyr utkjøring innenfor Modum kommune. Kjøretillegg kr 99,-. Bestilling via telefon.

## Designretning & krav

### Visuell stil

- **Tone:** Varm, appetittvekkende, litt urban/street food-vibe men innbydende og familievennlig
- **Fargepalett:** Hent fra logoen – oransje/gul (#E8A838 range), turkis/teal (#4ABFBF range), dyp rød (tomat), grønt (basilikum), mot mørk/svart bakgrunn for kontrast
- **Typografi:** Bold, karakterfull display-font for overskrifter (noe som matcher logoens energiske stil – f.eks. Lilita One, Fredoka, Baloo 2 eller lignende Google Fonts). Clean lesbar body-font (f.eks. Nunito, Quicksand).
- **Bakgrunn:** Mørk (svart/nær-svart) som hovedbakgrunn, slik at logoens farger og matbilder popper. Subtile teksturer (noise/grain) for dybde.
- **Stemning:** Som om du åpner døra til et koselig, levende gatekjøkken – varme farger, duft av pizza i luften

### Sidestruktur (Single Page Application med smooth scroll)

#### 1. Hero-seksjon

- Logoen `NamNamPizza&Grill.png` stort og sentralt
- Tagline: "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker!"
- Undertekst: "Du ringer – Vi bringer! 📞 41 23 22 19"
- Stor, tydelig CTA-knapp: "RING OG BESTILL" (tel:-lenke) og "SE MENYEN" (scroll til meny)
- Animert inngang (fade-in/slide-up)

#### 2. Om oss (kort)

- 2-3 setninger om stedet: Sentralt i Åmot, åpent hver dag 13–23, bred meny, utkjøring tilgjengelig
- Adresse med Google Maps embedded eller lenke
- Åpningstider visuelt vist

#### 3. MENY (hovedfokus – dette er det viktigste)

Menyen skal presenteres pent, oversiktlig og appetittvekkende med kategorier som brukeren kan bla mellom (tabs eller accordion):

**GRILL**

- Kebab i pita – 120,-
- Kylling i pita – 140,-
- Biff i pita – 150,-
- Kebab i rull – 120,-
- Kylling i rull – 140,-
- Biff i rull – 150,-
- Kebabtallerken – 160,-
- Kyllingtallerken – 170,-
- Løvstektallerken – 170,-
- Biffsnadder – 190,-
- Nam Nam spesial (kebabkjøtt, ost, pomfri, pitabrød) – 170,-

**HAMBURGER**

- Hamburger: 100g 90,- / 160g 110,- / 250g 130,- / 333g 150,-
- Cheeseburger: 100g 100,- / 160g 120,- / 250g 140,- / 333g 155,-
- Hamburgertallerken: 100g 120,- / 160g 140,- / 250g 160,- / 333g 180,-
- Cheeseburgertallerken: 100g 130,- / 160g 150,- / 250g 170,- / 333g 190,-
- Spesialburger + drikke: 100g 170,- / 160g 190,- / 250g 210,- / 333g 230,-

**PIZZA** (vis liten/stor pris)

1. Tomatsaus og ost – Liten 140,- / Stor 220,-
2. Tomatsaus, ost og skinke – Liten 150,- / Stor 240,-
3. Tomatsaus, ost og pepperoni – Liten 150,- / Stor 240,-
4. Skinke og champignon – Liten 160,- / Stor 250,-
5. Paprika, mais, løk, tomat og champignon – Liten 160,- / Stor 250,-
6. Skinke, pepperoni og champignon – Liten 170,- / Stor 260,-
7. Tunfisk, mais, løk og oliven – Liten 170,- / Stor 260,-
8. Biff, løk, paprika og champignon – Liten 170,- / Stor 260,-
9. Kylling, løk, paprika og champignon – Liten 170,- / Stor 260,-
10. Kjøttdeig, pepperoni, skinke og løk – Liten 180,- / Stor 270,-
11. Kebabkjøtt, løk, mais, salattopping og kebabdressing – Liten 180,- / Stor 270,-
12. Skinke / biff – Liten 180,- / Stor 270,-
13. Skinke, pepperoni, bacon og biff – Liten 180,- / Stor 270,-
14. Tacokjøttdeig, løk, mais, salattopping og hvitløkdressing – Liten 190,- / Stor 280,-
15. Biff, kylling, paprika, løk og champignon – Liten 190,- / Stor 280,-
16. Biff, pomfri og bearnaisesaus – Liten 190,- / Stor 280,-
17. Lag din egen pizza (inntil 6 ingredienser) – Liten 190,- / Stor 280,-
18. Calzone med ost og skinke – 160,-
19. Calzone med ost og pepperoni – 160,-
20. Calzone med biff og champignon – 180,-

**BARNEMENY**

- Hamburger – 90,-
- Nuggets (5 stk) – 100,-
- Pizza med ost og skinke eller pepperoni – 110,-

**DRIKKE**

- Stor drikke – 50,-
- Liten drikke – 30,-
- Kuli – 30,-

**Menypresentasjon-krav:**

- Bruk tabs/faner øverst for kategoriene (🔥 Grill | 🍔 Hamburger | 🍕 Pizza | 👶 Barnemeny | 🥤 Drikke)
- Hvert menypunkt som et kort/card med navn, beskrivelse (ingredienser) og pris tydelig
- For pizza: vis både liten og stor pris side om side
- For burgere: vis vektklasser horisontalt som badges/pills
- Fremhev "Nam Nam spesial" og "Lag din egen pizza" med en spesiell styling (featured/anbefalt)
- Menyen skal være responsiv og fungere perfekt på mobil

#### 4. Utkjøring / Levering

- Egen seksjon som fremhever leveringstjenesten
- "Du ringer – Vi bringer!" som overskrift
- Forklaring: Ring 41 23 22 19, bestill fra menyen, vi leverer innenfor Modum kommune
- Kjøretillegg kr 99,-
- Betaling: Vipps eller kontant

#### 5. Finn oss / Kontakt (footer-seksjon)

- Adresse: Strandgata 11, 3340 Åmot
- Telefon: 41 23 22 19 (klikkbar)
- Åpningstider: Alle dager 13:00–23:00
- Facebook-lenke: facebook.com/NumNumPizzaGrill
- Embedded Google Maps eller statisk kartbilde
- "Langs Riksvei 287 – Parkering utenfor!"

### Sticky/fast element

- En "sticky" bar i bunn (mobil) eller øverst som alltid viser: "📞 Ring og bestill: 41 23 22 19" som er klikkbar (tel:-lenke)
- Denne skal alltid være synlig uansett hvor brukeren scroller

### Tekniske krav

- Fullt responsiv (mobil-first – de fleste kunder bestiller fra mobil)
- Rask lastning, ingen unødvendige dependencies
- Semantisk HTML for SEO
- Smooth scroll-navigasjon
- Lazy-loading for bilder
- Norsk språk gjennomgående
- Alle telefonnumre som klikkbare tel:-lenker
- Meta-tags for SEO (tittel: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum")
- Open Graph-tags med logoen for deling på sosiale medier
- Favicon basert på logoen

### Bonuspunkter

- Subtile animasjoner på meny-kortene (hover-effekter)
- En liten "TILBUD!"-badge som highlighter: "2 store valgfri pizza + 1.5L brus = kun 450,-"
- Dark mode som standard (matcher den svarte bakgrunnen i logoen)
- Smooth parallax eller scroll-effekter
- CSS-emojis eller ikoner (pizza-slice, flame, burger) ved kategoriene for visuell appell

## Viktig

- Nettsiden skal føles profesjonell og appetittvekkende, IKKE som en generisk WordPress-mal
- Menyen er DET viktigste elementet – den skal være enkel å navigere og lese
- Telefonnummeret skal være umulig å overse – det er slik folk bestiller
- Alt innhold er på norsk
- Test at alt fungerer på mobil, tablet og desktop
