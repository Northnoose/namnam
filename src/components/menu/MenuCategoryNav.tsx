import React from "react";

export type CategoryNavItem = {
  id: string;
  name: string;
  emoji?: string;
};

export function MenuCategoryNav({
  items,
  activeId,
  onSelect,
  variant,
}: {
  items: CategoryNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  variant: "desktop" | "mobile";
}) {
  if (variant === "desktop") {
    return (
      <nav className="space-y-2">
        {items.map((c) => {
          const active = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              className={
                "w-full text-left rounded-xl px-3 py-2 transition-colors border " +
                (active
                  ? "border-brand-600/60 bg-brand-600/15 text-white"
                  : "border-trueGray-800 bg-trueGray-900/20 text-trueGray-300 hover:bg-trueGray-900/35 hover:text-white")
              }
            >
              <span className="text-sm font-semibold">
                {c.emoji ? `${c.emoji} ` : ""}
                {c.name}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  // mobile
  return (
    <div className="sticky top-[72px] z-30 -mx-4 sm:-mx-6 lg:mx-0 border-b border-trueGray-800 bg-trueGray-900/70 backdrop-blur">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          {items.map((c) => {
            const active = c.id === activeId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onSelect(c.id)}
                className={
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors border " +
                  (active
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-trueGray-800 bg-trueGray-900/30 text-trueGray-200 hover:bg-trueGray-900/45")
                }
              >
                {c.emoji ? `${c.emoji} ` : ""}
                {c.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}