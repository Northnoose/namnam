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

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-trueGray-700 bg-trueGray-900/40 px-2 py-0.5 text-[11px] text-trueGray-200">
      {children}
    </span>
  );
}

export function MenuItemRow({ item }: { item: MenuItem }) {
  const price = isPizza(item)
    ? { liten: item.priceLiten, stor: item.priceStor }
    : item.price;

  return (
    <div className="group flex gap-4 rounded-2xl border border-trueGray-800 bg-trueGray-900/20 p-4 transition-colors hover:bg-trueGray-900/35">
      <MenuItemMedia
        src={item.image?.src}
        alt={item.image?.alt}
        focal={item.image?.focal}
        size="sm"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-white font-semibold leading-snug truncate">
                {item.name}
              </h4>
              {item.featured && <Badge>Anbefalt</Badge>}
              {item.tags?.includes("sterk") && <Badge>Sterk</Badge>}
              {item.tags?.includes("vegetar") && <Badge>Vegetar</Badge>}
              {item.tags?.includes("populær") && <Badge>Populær</Badge>}
            </div>
            {item.description && (
              <p className="mt-1 text-sm text-trueGray-400 leading-relaxed">
                {item.description}
              </p>
            )}
          </div>

          <div className="hidden sm:block">
            <PriceTag price={price} />
          </div>
        </div>

        {/* Hamburger variants */}
        {isHamburger(item) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.variants.map((v) => (
              <span
                key={v.weight}
                className="rounded-full border border-trueGray-700 bg-trueGray-900/40 px-2.5 py-1 text-xs text-trueGray-200"
              >
                {v.weight} —{" "}
                <span className="text-white font-semibold">{v.price},-</span>
              </span>
            ))}
          </div>
        )}

        {/* Mobile price */}
        <div className="mt-3 sm:hidden">
          <PriceTag price={price} align={isPizza(item) ? "inline" : "right"} />
        </div>
      </div>
    </div>
  );
}