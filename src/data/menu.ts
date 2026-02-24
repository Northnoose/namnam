// src/data/menu.ts
// Type definitions for Nam Nam Pizza & Grill menu data
// Phase 1: structure + empty stubs. Phase 3: populate items from BRIEF.md.

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  featured?: boolean
}

export interface PizzaMenuItem extends MenuItem {
  priceLiten: number
  priceStor: number
}

export interface HamburgerVariant {
  weight: string   // e.g. "100g", "160g", "250g", "333g"
  price: number
}

export interface HamburgerMenuItem extends MenuItem {
  variants: HamburgerVariant[]
}

export interface MenuCategory {
  id: string
  name: string
  emoji: string
  items: (MenuItem | PizzaMenuItem | HamburgerMenuItem)[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'grill',
    name: 'Grill',
    emoji: '🔥',
    items: [
      { id: 'grill-kebab-pita', name: 'Kebab i pita', description: 'Kebab i pitabrød', price: 120 },
      { id: 'grill-kylling-pita', name: 'Kylling i pita', description: 'Kylling i pitabrød', price: 140 },
      { id: 'grill-biff-pita', name: 'Biff i pita', description: 'Biff i pitabrød', price: 150 },
      { id: 'grill-kebab-rull', name: 'Kebab i rull', description: 'Kebab i rull', price: 120 },
      { id: 'grill-kylling-rull', name: 'Kylling i rull', description: 'Kylling i rull', price: 140 },
      { id: 'grill-biff-rull', name: 'Biff i rull', description: 'Biff i rull', price: 150 },
      { id: 'grill-kebabtallerken', name: 'Kebabtallerken', description: 'Kebabtallerken med tilbehør', price: 160 },
      { id: 'grill-kyllingtallerken', name: 'Kyllingtallerken', description: 'Kyllingtallerken med tilbehør', price: 170 },
      { id: 'grill-lovstektallerken', name: 'Løvstektallerken', description: 'Løvstektallerken med tilbehør', price: 170 },
      { id: 'grill-biffsnadder', name: 'Biffsnadder', description: 'Biffsnadder med tilbehør', price: 190 },
      { id: 'grill-namnam-spesial', name: 'Nam Nam spesial', description: 'Kebabkjøtt, ost, pomfri, pitabrød', price: 170, featured: true },
    ],
  },
  {
    id: 'hamburger',
    name: 'Hamburger',
    emoji: '🍔',
    items: [
      {
        id: 'burger-hamburger',
        name: 'Hamburger',
        description: 'Klassisk hamburger',
        price: 90,
        variants: [
          { weight: '100g', price: 90 },
          { weight: '160g', price: 110 },
          { weight: '250g', price: 130 },
          { weight: '333g', price: 150 },
        ],
      } as HamburgerMenuItem,
      {
        id: 'burger-cheeseburger',
        name: 'Cheeseburger',
        description: 'Hamburger med ost',
        price: 100,
        variants: [
          { weight: '100g', price: 100 },
          { weight: '160g', price: 120 },
          { weight: '250g', price: 140 },
          { weight: '333g', price: 155 },
        ],
      } as HamburgerMenuItem,
      {
        id: 'burger-hamburgertallerken',
        name: 'Hamburgertallerken',
        description: 'Hamburger med tilbehør',
        price: 120,
        variants: [
          { weight: '100g', price: 120 },
          { weight: '160g', price: 140 },
          { weight: '250g', price: 160 },
          { weight: '333g', price: 180 },
        ],
      } as HamburgerMenuItem,
      {
        id: 'burger-cheeseburgertallerken',
        name: 'Cheeseburgertallerken',
        description: 'Cheeseburger med tilbehør',
        price: 130,
        variants: [
          { weight: '100g', price: 130 },
          { weight: '160g', price: 150 },
          { weight: '250g', price: 170 },
          { weight: '333g', price: 190 },
        ],
      } as HamburgerMenuItem,
      {
        id: 'burger-spesialburger',
        name: 'Spesialburger + drikke',
        description: 'Spesialburger inkl. drikke',
        price: 170,
        variants: [
          { weight: '100g', price: 170 },
          { weight: '160g', price: 190 },
          { weight: '250g', price: 210 },
          { weight: '333g', price: 230 },
        ],
      } as HamburgerMenuItem,
    ],
  },
  {
    id: 'pizza',
    name: 'Pizza',
    emoji: '🍕',
    items: [
      { id: 'pizza-tomat-ost', name: 'Tomatsaus og ost', description: 'Tomatsaus og ost', price: 140, priceLiten: 140, priceStor: 220 } as PizzaMenuItem,
      { id: 'pizza-tomat-ost-skinke', name: 'Tomatsaus, ost og skinke', description: 'Tomatsaus, ost og skinke', price: 150, priceLiten: 150, priceStor: 240 } as PizzaMenuItem,
      { id: 'pizza-tomat-ost-pepperoni', name: 'Tomatsaus, ost og pepperoni', description: 'Tomatsaus, ost og pepperoni', price: 150, priceLiten: 150, priceStor: 240 } as PizzaMenuItem,
      { id: 'pizza-skinke-champignon', name: 'Skinke og champignon', description: 'Skinke og champignon', price: 160, priceLiten: 160, priceStor: 250 } as PizzaMenuItem,
      { id: 'pizza-veggie', name: 'Paprika, mais, løk, tomat og champignon', description: 'Paprika, mais, løk, tomat og champignon', price: 160, priceLiten: 160, priceStor: 250 } as PizzaMenuItem,
      { id: 'pizza-skinke-pepperoni-champignon', name: 'Skinke, pepperoni og champignon', description: 'Skinke, pepperoni og champignon', price: 170, priceLiten: 170, priceStor: 260 } as PizzaMenuItem,
      { id: 'pizza-tunfisk', name: 'Tunfisk, mais, løk og oliven', description: 'Tunfisk, mais, løk og oliven', price: 170, priceLiten: 170, priceStor: 260 } as PizzaMenuItem,
      { id: 'pizza-biff-paprika', name: 'Biff, løk, paprika og champignon', description: 'Biff, løk, paprika og champignon', price: 170, priceLiten: 170, priceStor: 260 } as PizzaMenuItem,
      { id: 'pizza-kylling-paprika', name: 'Kylling, løk, paprika og champignon', description: 'Kylling, løk, paprika og champignon', price: 170, priceLiten: 170, priceStor: 260 } as PizzaMenuItem,
      { id: 'pizza-kjottdeig-pepperoni', name: 'Kjøttdeig, pepperoni, skinke og løk', description: 'Kjøttdeig, pepperoni, skinke og løk', price: 180, priceLiten: 180, priceStor: 270 } as PizzaMenuItem,
      { id: 'pizza-kebab-pizza', name: 'Kebabkjøtt, løk, mais, salattopping og kebabdressing', description: 'Kebabkjøtt, løk, mais, salattopping og kebabdressing', price: 180, priceLiten: 180, priceStor: 270 } as PizzaMenuItem,
      { id: 'pizza-skinke-biff', name: 'Skinke / biff', description: 'Skinke og biff', price: 180, priceLiten: 180, priceStor: 270 } as PizzaMenuItem,
      { id: 'pizza-fire-kjott', name: 'Skinke, pepperoni, bacon og biff', description: 'Skinke, pepperoni, bacon og biff', price: 180, priceLiten: 180, priceStor: 270 } as PizzaMenuItem,
      { id: 'pizza-taco', name: 'Tacokjøttdeig, løk, mais, salattopping og hvitløkdressing', description: 'Tacokjøttdeig, løk, mais, salattopping og hvitløkdressing', price: 190, priceLiten: 190, priceStor: 280 } as PizzaMenuItem,
      { id: 'pizza-biff-kylling', name: 'Biff, kylling, paprika, løk og champignon', description: 'Biff, kylling, paprika, løk og champignon', price: 190, priceLiten: 190, priceStor: 280 } as PizzaMenuItem,
      { id: 'pizza-biff-pomfri', name: 'Biff, pomfri og bearnaisesaus', description: 'Biff, pomfri og bearnaisesaus', price: 190, priceLiten: 190, priceStor: 280 } as PizzaMenuItem,
      { id: 'pizza-lag-din-egen', name: 'Lag din egen pizza', description: 'Velg inntil 6 ingredienser', price: 190, priceLiten: 190, priceStor: 280, featured: true } as PizzaMenuItem,
      { id: 'pizza-calzone-skinke', name: 'Calzone med ost og skinke', description: 'Calzone med ost og skinke', price: 160 },
      { id: 'pizza-calzone-pepperoni', name: 'Calzone med ost og pepperoni', description: 'Calzone med ost og pepperoni', price: 160 },
      { id: 'pizza-calzone-biff', name: 'Calzone med biff og champignon', description: 'Calzone med biff og champignon', price: 180 },
    ],
  },
  {
    id: 'barnemeny',
    name: 'Barnemeny',
    emoji: '👶',
    items: [
      { id: 'barn-hamburger', name: 'Hamburger', description: 'Barnehamburger', price: 90 },
      { id: 'barn-nuggets', name: 'Nuggets (5 stk)', description: '5 stk nuggets', price: 100 },
      { id: 'barn-pizza', name: 'Pizza med ost og skinke eller pepperoni', description: 'Barnepizza med ost og skinke eller pepperoni', price: 110 },
    ],
  },
  {
    id: 'drikke',
    name: 'Drikke',
    emoji: '🥤',
    items: [
      { id: 'drikke-stor-drikke', name: 'Stor drikke', description: 'Stor brus/drikke', price: 50 },
      { id: 'drikke-liten-drikke', name: 'Liten drikke', description: 'Liten brus/drikke', price: 30 },
      { id: 'drikke-kuli', name: 'Kuli', description: 'Isnål', price: 30 },
    ],
  },
]
