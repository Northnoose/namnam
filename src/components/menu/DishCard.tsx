import React from "react";
import type {
  HamburgerMenuItem,
  MenuItem,
  PizzaMenuItem,
} from "@/data/menu";
import { DishImage } from "@/components/menu/DishImage";
import { PriceTag, type PriceValue } from "@/components/menu/PriceTag";

type Variant = "grid" | "featured";

function isPizza(item: MenuItem | PizzaMenuItem | HamburgerMenuItem): item is PizzaMenuItem {
  return "priceLiten" in item && "priceStor" in item;
}

function isHamburger(
  item: MenuItem | PizzaMenuItem | HamburgerMenuItem
): item is HamburgerMenuItem {
  return "variants" in item && Array.isArray((item as HamburgerMenuItem).variants);
}

function priceValueFor(item: MenuItem | PizzaMenuItem | HamburgerMenuItem): PriceValue {
  if (isPizza(item)) {
    return { liten: item.priceLiten, stor: item.priceStor };
  }
  if (isHamburger(item)) {
    const min = Math.min(...item.variants.map((v) => v.price));
    return min; // we’ll label this as “fra” in UI below
  }
  return item.price;
}

function tagsLabel(tag: string) {
  if (tag === "anbefalt") return "Anbefalt";
  if (tag === "populær") return "Populær";
  if (tag === "sterk") return "Sterk";
  if (tag === "vegetar") return "Vegetar";
  return tag;
}

export function DishCard({
  item,
  variant = "grid",
}: {
  item: MenuItem | PizzaMenuItem | HamburgerMenuItem;
  variant?: Variant;
}) {
  const price = priceValueFor(item);
  const isFromPrice = isHamburger(item); // burger variants => “fra”

  return (
    <article
      className={
        variant === "featured"
          ? "rounded-3xl border border-trueGray-800 bg-trueGray-950/40 p-4 sm:p-5"
          : "rounded-3xl border border-trueGray-800 bg-trueGray-950/30 p-4"
      }
    >
      <div className="space-y-4">
        <DishImage
          src={item.image?.src}
          alt={item.image?.alt ?? item.name}
          focal={item.image?.focal}
          variant={variant === "featured" ? "featured" : "grid"}
        />

        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white leading-tight">
              {item.name}
            </h3>
            {item.description ? (
              <p className="mt-1 text-sm text-trueGray-300 leading-snug line-clamp-2">
                {item.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-end gap-1">
            {isFromPrice ? (
              <div className="text-[11px] text-trueGray-400 -mb-1">fra</div>
            ) : null}
            <PriceTag price={price} align="right" />
          </div>
        </div>

        {item.tags?.length ? (
          <div className="flex flex-wrap gap-2">
            {item.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-trueGray-700 bg-trueGray-900/40 px-2.5 py-1 text-xs text-trueGray-200"
              >
                {tagsLabel(t)}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}