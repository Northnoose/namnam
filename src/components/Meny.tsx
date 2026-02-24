"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Container } from "@/components/Container";
import { menuCategories } from "@/data/menu";
import type { MenuItem } from "@/data/menu";
import { MenuCategoryNav } from "@/components/menu/MenuCategoryNav";
import { MenuSection } from "./menu/MenuSection";

const OFFER_TEXT = "TILBUD! 2 store valgfri pizza + 1.5L brus = kun 450,-";

export function Meny() {
  const categories = useMemo(() => menuCategories, []);
  const navItems = useMemo(
    () =>
      categories.map((c) => ({
        id: c.id,
        name: c.name,
        emoji: c.emoji,
      })),
    [categories]
  );

  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  function scrollTo(id: string) {
    const el = sectionRefs.current[id] ?? document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }

  useEffect(() => {
    // Track which section is in view so nav highlights correctly.
    const els = categories
      .map((c) => sectionRefs.current[c.id])
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible intersecting section.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      {
        root: null,
        // Start switching a bit after the header.
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.05, 0.15, 0.25],
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [categories]);

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white text-center lg:text-4xl">
          Meny
        </h2>
        <p className="mt-3 text-center text-trueGray-400">
          Du ringer — vi bringer. Ring{" "}
          <span className="text-white font-semibold">41 23 22 19</span>
        </p>

        <div className="mt-8 rounded-2xl bg-brand-600/15 border border-brand-600/35 px-4 py-3 text-center">
          <span className="text-brand-200 font-semibold text-sm lg:text-base">
            {OFFER_TEXT}
          </span>
        </div>

        {/* Mobile sticky chips */}
        <div className="mt-6 lg:hidden">
          <MenuCategoryNav
            items={navItems}
            activeId={activeId}
            onSelect={scrollTo}
            variant="mobile"
          />
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[280px,1fr] lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-trueGray-800 bg-trueGray-900/25 p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">Kategorier</h3>
                <span className="text-xs text-trueGray-400">Skroll</span>
              </div>

              <div className="mt-4">
                <MenuCategoryNav
                  items={navItems}
                  activeId={activeId}
                  onSelect={scrollTo}
                  variant="desktop"
                />
              </div>

              <div className="mt-6 rounded-2xl border border-trueGray-800 bg-trueGray-900/35 p-4">
                <div className="text-xs text-trueGray-400">Tilbud</div>
                <div className="mt-1 text-sm text-white font-semibold">
                  {OFFER_TEXT}
                </div>
              </div>

              <a
                href="tel:41232219"
                className="mt-4 block rounded-2xl bg-brand-600 px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-brand-500"
              >
                Ring og bestill
              </a>

              <p className="mt-2 text-xs text-trueGray-400">
                Levering innenfor Modum kommune.
              </p>
            </div>
          </aside>

          {/* Content (NO internal scroll, no overflow, no max-height) */}
          <div className="min-h-0">
            <div className="space-y-14">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  ref={(el) => {
                    sectionRefs.current[cat.id] = el;
                  }}
                >
                  <MenuSection
                    id={cat.id}
                    title={`${cat.emoji} ${cat.name}`}
                    items={cat.items as unknown as MenuItem[]}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}