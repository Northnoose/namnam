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

// Phase 3 will populate these arrays with data from BRIEF.md
export const menuCategories: MenuCategory[] = [
  {
    id: 'grill',
    name: 'Grill',
    emoji: '🔥',
    items: [],
  },
  {
    id: 'hamburger',
    name: 'Hamburger',
    emoji: '🍔',
    items: [],
  },
  {
    id: 'pizza',
    name: 'Pizza',
    emoji: '🍕',
    items: [],
  },
  {
    id: 'barnemeny',
    name: 'Barnemeny',
    emoji: '👶',
    items: [],
  },
  {
    id: 'drikke',
    name: 'Drikke',
    emoji: '🥤',
    items: [],
  },
]
