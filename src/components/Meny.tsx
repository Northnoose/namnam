"use client";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { Container } from "@/components/Container";
import { menuCategories } from "@/data/menu";
import type { MenuItem, PizzaMenuItem, HamburgerMenuItem } from "@/data/menu";

// Type guards
function isPizza(item: MenuItem): item is PizzaMenuItem {
  return "priceLiten" in item && "priceStor" in item;
}

function isHamburger(item: MenuItem): item is HamburgerMenuItem {
  return "variants" in item;
}

function MenuCard({ item }: { item: MenuItem }) {
  const baseClasses =
    "rounded-lg border p-4 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] flex flex-col gap-2";
  const featuredClasses = item.featured
    ? "border-orange-500 ring-1 ring-orange-500 bg-neutral-800"
    : "border-neutral-700 bg-neutral-800";

  return (
    <div className={`${baseClasses} ${featuredClasses}`}>
      {item.featured && (
        <span className="self-start text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full font-medium">
          Anbefalt
        </span>
      )}
      <h3 className="text-white font-semibold text-base leading-snug">{item.name}</h3>
      {item.description && (
        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
      )}

      {isPizza(item) ? (
        // Pizza: liten/stor price side by side (MENU-07)
        <div className="flex gap-4 mt-auto pt-2 text-sm">
          <span className="text-gray-300">
            Liten <span className="text-white font-semibold">{item.priceLiten},-</span>
          </span>
          <span className="text-gray-300">
            Stor <span className="text-white font-semibold">{item.priceStor},-</span>
          </span>
        </div>
      ) : isHamburger(item) ? (
        // Hamburger: weight variant badges (MENU-06)
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {item.variants.map((v) => (
            <span
              key={v.weight}
              className="px-2 py-1 bg-neutral-700 rounded-full text-xs text-gray-200 border border-neutral-600"
            >
              {v.weight} — {v.price},-
            </span>
          ))}
        </div>
      ) : (
        // Default: single price (MENU-04, MENU-08, MENU-09)
        <p className="text-white font-semibold mt-auto pt-2">{item.price},-</p>
      )}
    </div>
  );
}

export function Meny() {
  return (
    <Container className="py-16">
      <h2 className="text-3xl font-bold text-white mb-8 text-center lg:text-4xl">
        Meny
      </h2>

      {/* MENU-12: Offer banner — shown above the tabs */}
      <div className="mb-6 rounded-lg bg-orange-600/20 border border-orange-500/50 px-4 py-3 text-center">
        <span className="text-orange-300 font-semibold text-sm lg:text-base">
          TILBUD! 2 store valgfri pizza + 1.5L brus = kun 450,-
        </span>
      </div>

      {/* MENU-01, MENU-02, MENU-03: Accessible tab group with horizontal scroll */}
      <TabGroup>
        <TabList className="flex overflow-x-auto whitespace-nowrap gap-2 pb-3 mb-6 scrollbar-none">
          {menuCategories.map((cat) => (
            <Tab
              key={cat.id}
              className={({ selected }: { selected: boolean }) =>
                `shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
                  selected
                    ? "bg-orange-600 text-white"
                    : "bg-neutral-800 text-gray-300 hover:bg-neutral-700 hover:text-white"
                }`
              }
            >
              {cat.emoji} {cat.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {menuCategories.map((cat) => (
            <TabPanel key={cat.id}>
              {/* Pizza tab: show offer banner inside panel too (near items) */}
              {cat.id === "pizza" && (
                <div className="mb-4 rounded-lg bg-green-800/30 border border-green-600/40 px-4 py-2 text-center">
                  <span className="text-green-300 text-sm font-medium">
                    TILBUD! 2 store valgfri pizza + 1.5L brus = kun 450,-
                  </span>
                </div>
              )}
              {/* MENU-04, MENU-13: Card grid with hover effect */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </Container>
  );
}
