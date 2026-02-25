import Image from "next/image";
import React from "react";

type Focal = "center" | "top" | "bottom";
type Variant = "grid" | "featured";

function focalToObjectPosition(focal: Focal) {
  if (focal === "top") return "50% 25%";
  if (focal === "bottom") return "50% 75%";
  return "50% 50%";
}

export function DishImage({
  src,
  alt,
  focal = "center",
  variant = "grid",
}: {
  src?: string;
  alt?: string;
  focal?: Focal;
  variant?: Variant;
}) {
  const objectPosition = focalToObjectPosition(focal);

  const wrapperClass =
    variant === "featured"
      ? "relative w-full aspect-[3/2] overflow-hidden rounded-2xl border border-trueGray-800 bg-trueGray-900/40"
      : "relative w-full aspect-[4/3] overflow-hidden rounded-2xl border border-trueGray-800 bg-trueGray-900/40";

  const sizes =
    variant === "featured"
      ? "(min-width: 1024px) 560px, 100vw"
      : "(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw";

  return (
    <div className={wrapperClass}>
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-trueGray-900 to-trueGray-800">
          <span className="text-xs text-trueGray-400">Bilde kommer</span>
        </div>
      )}

      {/* Subtle bottom vignette for text legibility if image is used in tighter cards */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
    </div>
  );
}