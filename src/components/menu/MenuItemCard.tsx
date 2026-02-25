import React from "react";
import type { MenuItem } from "@/data/menu";
import { DishCard } from "@/components/menu/DishCard";

/**
 * Legacy compatibility component.
 * The menu is now based on DishCard (grid + featured variants).
 * Keep this wrapper so old imports don't break, while preserving the new design.
 */
export function MenuItemCard({ item }: { item: MenuItem }) {
  return <DishCard item={item} variant="featured" />;
}