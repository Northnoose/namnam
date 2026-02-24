import React from "react";
import type { MenuItem, PizzaMenuItem, HamburgerMenuItem } from "@/data/menu";
import { MenuItemMedia } from "@/components/menu/MenuItemMedia";
import { PriceTag } from "@/components/menu/PriceTag";

function isPizza(item: MenuItem): item is PizzaMenuItem {
  return "priceLiten" in item && "priceStor" in item;
}

function isHamburger(item: MenuItem): item is HamburgerMenuItem {
  return "variants" in item;
}

export function MenuItemCard({ item }: { item: MenuItem }) {
  const price = isPizza(item)
    ? { liten: item.priceLiten, stor: item.priceStor }
    : item.price;

  return (
    <div className="rounded-3xl border border-brand-600/40 bg-gradient-to-b from-trueGray-900/50 to-trueGray-900/20 p-5 shadow-lift">
      <div className="grid gap-5 lg:grid-cols-[1.25fr,1fr] lg:items-stretch">
        <MenuItemMedia
          src={item.image?.src}
          alt={item.image?.alt}
          focal={item.image?.focal}
          size="lg"
        />

        <div className="min-w-0 flex flex-col">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-brand-600 px-2.5 py-1 text-xs font-semibold text-white">
              Anbefalt
            </span>
            {item.tags?.includes("populær") && (
              <span className="inline-flex items-center rounded-full border border-trueGray-700 bg-trueGray-900/40 px-2.5 py-1 text-xs text-trueGray-200">
                Populær
              </span>
            )}
          </div>

          <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-white leading-tight">
            {item.name}
          </h3>

          {item.description && (
            <p className="mt-2 text-sm sm:text-base text-trueGray-300 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="mt-4">
            <PriceTag price={price} align={isPizza(item) ? "inline" : "right"} />
          </div>

          {isHamburger(item) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.variants.map((v) => (
                <span
                  key={v.weight}
                  className="rounded-full border border-trueGray-700 bg-trueGray-900/40 px-3 py-1 text-xs text-trueGray-200"
                >
                  {v.weight} —{" "}
                  <span className="text-white font-semibold">{v.price},-</span>
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-6">
            <div className="rounded-2xl border border-trueGray-800 bg-trueGray-900/35 p-4">
              <p className="text-sm text-trueGray-300">
                Ring og bestill:{" "}
                <span className="text-white font-semibold">41 23 22 19</span>
              </p>
              <p className="mt-1 text-xs text-trueGray-400">
                Vi leverer innenfor Modum kommune.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}