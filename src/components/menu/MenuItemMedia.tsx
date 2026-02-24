import Image from "next/image";
import React from "react";

/**
 * Media wrapper that guarantees a 4:3 footprint to avoid layout shift.
 * Uses a padding-top aspect box (no Tailwind aspect-ratio dependency).
 */
export function MenuItemMedia({
  src,
  alt,
  focal = "center",
  size = "sm",
}: {
  src?: string;
  alt?: string;
  focal?: "center" | "top" | "bottom";
  size?: "sm" | "lg";
}) {
  const paddingTop = "75%"; // 4:3
  const objectPosition =
    focal === "top" ? "50% 25%" : focal === "bottom" ? "50% 75%" : "50% 50%";

  return (
    <div
      className={
        size === "lg"
          ? "relative w-full overflow-hidden rounded-2xl border border-trueGray-800 bg-trueGray-900/40"
          : "relative w-28 sm:w-32 shrink-0 overflow-hidden rounded-xl border border-trueGray-800 bg-trueGray-900/40"
      }
      style={{ paddingTop }}
    >
      <div className="absolute inset-0">
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes={size === "lg" ? "(min-width: 1024px) 560px, 100vw" : "140px"}
            className="object-cover"
            style={{ objectPosition }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-trueGray-900 to-trueGray-800 flex items-center justify-center">
            <span className="text-xs text-trueGray-400">Bilde kommer</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
      </div>
    </div>
  );
}