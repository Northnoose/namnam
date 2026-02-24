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
          <div className="flex items-baseline gap-3 text-sm">
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
        <div className="rounded-full border border-trueGray-700 bg-trueGray-900/40 px-3 py-1 text-white font-semibold">
          {price},-
        </div>
      )}
    </div>
  );
}