"use client";

import React from "react";

type NavItem = {
  id: string;
  name: string;
  emoji?: string;
};

export function MenuCategoryNav({
  items,
  activeId,
  onSelect,
  variant = "mobile",
}: {
  items: NavItem[];
  activeId?: string;
  onSelect: (id: string) => void;
  variant?: "mobile" | "desktop";
}) {
  if (variant === "desktop") {
    return (
      <nav className="space-y-2">
        <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-4">
          <div className="text-xs font-semibold tracking-widest text-brand-500 uppercase">
            Kategorier
          </div>

          <div className="mt-3 flex flex-col gap-1">
            {items.map((it) => {
              const isActive = it.id === activeId;
              return (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => onSelect(it.id)}
                  className={[
                    "w-full text-left rounded-2xl px-3 py-2 transition-colors",
                    "border",
                    isActive
                      ? "bg-brand-600/15 border-brand-500/25 text-white"
                      : "bg-trueGray-900/20 border-trueGray-800 text-trueGray-200 hover:bg-trueGray-900/40 hover:text-white",
                  ].join(" ")}
                >
                  <span className="inline-flex items-center gap-2">
                    {it.emoji ? (
                      <span aria-hidden className="text-base">
                        {it.emoji}
                      </span>
                    ) : null}
                    <span className="font-semibold">{it.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-2xl border border-trueGray-800 bg-trueGray-900/25 p-3">
            <div className="text-xs text-trueGray-400">Bestill på telefon</div>
            <a
              href="tel:+4741232219"
              className="mt-1 inline-flex text-white font-semibold underline decoration-brand-500/60 underline-offset-4 hover:decoration-brand-400"
            >
              41 23 22 19
            </a>
          </div>
        </div>
      </nav>
    );
  }

  // Mobile: horizontal chip nav (ONLY horizontal scroll)
  return (
    <nav className="sticky top-[72px] z-30 -mx-4 px-4 py-3 bg-trueGray-950/80 backdrop-blur-md border-b border-trueGray-800">
      <div className="flex gap-2 overflow-x-auto overflow-y-hidden scrollbar-none">
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => onSelect(it.id)}
              className={[
                "shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                "border",
                isActive
                  ? "bg-brand-600/15 border-brand-500/25 text-white"
                  : "bg-trueGray-900/25 border-trueGray-800 text-trueGray-200 hover:bg-trueGray-900/45 hover:text-white",
              ].join(" ")}
            >
              {it.emoji ? <span aria-hidden>{it.emoji}</span> : null}
              <span>{it.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}