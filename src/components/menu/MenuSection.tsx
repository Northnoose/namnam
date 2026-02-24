import React from "react";
import type { MenuItem } from "@/data/menu";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { MenuItemRow } from "@/components/menu/MenuItemRow";

export function MenuSection({
  id,
  title,
  subtitle,
  items,
}: {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
}) {
  const featured = items.filter((i) => i.featured);
  const rest = items.filter((i) => !i.featured);

  // If category has 0 featured items, we still keep rhythm.
  const featuredToShow = featured.slice(0, 2);

  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white">
            {title}
          </h3>
          {subtitle && (
            <p className="mt-1 text-sm text-trueGray-400">{subtitle}</p>
          )}
        </div>
      </div>

      {featuredToShow.length > 0 && (
        <div className="mt-6 grid gap-6">
          {featuredToShow.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <div className="mt-6 grid gap-4">
        {rest.map((item) => (
          <MenuItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}