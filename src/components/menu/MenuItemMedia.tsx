import Image from "next/image";
import React from "react";

/**
 * Media wrapper that guarantees a 4:3 footprint to avoid layout shift.
 * Uses CSS aspect-ratio (Tailwind aspect-[w/h]) to avoid padding-top hacks.
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
  const objectPosition =
    focal === "top" ? "50% 25%" : focal === "bottom" ? "50% 75%" : "50% 50%";

  return (
    <div
      className={
        size === "lg"
          ? "relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-trueGray-800 bg-trueGray-900/40"
          : "relative w-28 sm:w-32 aspect-[4/3] shrink-0 overflow-hidden rounded-xl border border-trueGray-800 bg-trueGray-900/40"
      }
    >
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
        <div className="absolute inset-0 bg-gradient-to-br from-trueGray-900 to-trueGray-800 flex items-center justify-center">
          <span className="text-xs text-trueGray-400">Bilde kommer</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
    </div>
  );
}