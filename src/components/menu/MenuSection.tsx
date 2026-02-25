import React from "react";
import type { MenuItem } from "@/data/menu";
import { DishCard } from "@/components/menu/DishCard";

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

  // Keep rhythm: show max 2 featured cards.
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
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {featuredToShow.map((item) => (
            <DishCard key={item.id} item={item} variant="featured" />
          ))}
        </div>
      )}

      {/* Mobile-first grid of dish cards (no more row list). */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {rest.map((item) => (
          <DishCard key={item.id} item={item} variant="grid" />
        ))}
      </div>
    </section>
  );
}