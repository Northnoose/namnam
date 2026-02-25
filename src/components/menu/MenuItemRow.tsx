import React from "react";
import type { MenuItem } from "@/data/menu";
import { DishCard } from "@/components/menu/DishCard";

/**
 * Legacy component.
 * The menu is now card-grid based (DishCard). We keep MenuItemRow as a thin
 * compatibility wrapper to avoid breaking imports while we refactor.
 */
export function MenuItemRow({ item }: { item: MenuItem }) {
  return <DishCard item={item} variant="grid" />;
}