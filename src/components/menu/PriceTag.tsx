import React from "react";

export type PriceValue = number | { liten: number; stor: number };

export function PriceTag({
  price,
  align = "right",
}: {
  price: PriceValue;
  align?: "right" | "inline";
}) {
  const isDual = typeof price === "object";

  if (align === "inline") {
    return (
      <div className="flex items-baseline gap-3">
        {isDual ? (
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
            <span className="text-trueGray-400">Liten</span>
            <span className="text-white font-semibold">{price.liten},-</span>
            <span className="text-trueGray-400">Stor</span>
            <span className="text-white font-semibold">{price.stor},-</span>
          </div>
        ) : (
          <span className="text-white font-semibold">{price},-</span>
        )}
      </div>
    );
  }

  return (
    <div className="ml-auto flex items-center">
      {isDual ? (
        <div className="text-right leading-tight">
          <div className="text-xs text-trueGray-400">Liten</div>
          <div className="text-white font-semibold">{price.liten},-</div>
          <div className="mt-1 text-xs text-trueGray-400">Stor</div>
          <div className="text-white font-semibold">{price.stor},-</div>
        </div>
      ) : (
        <div className="rounded-2xl border border-brand-600/35 bg-brand-600/10 px-3 py-1 text-white font-semibold">
          {price},-
        </div>
      )}
    </div>
  );
}