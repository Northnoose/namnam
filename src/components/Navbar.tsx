"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  CloseButton,
} from "@headlessui/react";
import ThemeChanger from "./DarkSwitch";

const sections = [
  { id: "om-oss", label: "Om oss" },
  { id: "meny", label: "Meny" },
  { id: "levering", label: "Levering" },
  { id: "kontakt", label: "Kontakt" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? "bg-trueGray-900/92 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container relative mx-auto flex flex-wrap items-center justify-between px-4 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" aria-label="Gå til forsiden" className="shrink-0">
          <Image
            src="/img/NamNamPizza&Grill.png"
            alt="Nam Nam Pizza & Grill"
            width={120}
            height={120}
            // IMPORTANT: do NOT set priority here (reserve for Hero/LCP)
            sizes="(min-width: 1024px) 80px, 60px"
            className="h-auto w-[60px] lg:w-[80px]"
          />
        </Link>

        {/* Desktop links — hidden on mobile, visible on lg+ */}
        <ul className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                className="rounded-xl px-4 py-2 text-trueGray-200 hover:text-white hover:bg-trueGray-800/50 transition-colors duration-200"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right cluster */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeChanger />
          <a
            href="tel:+4741232219"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-2.5 text-white font-semibold shadow-lift hover:bg-brand-500 transition-colors duration-200 border border-brand-500/40"
            aria-label="Ring oss: 41 23 22 19"
          >
            41 23 22 19
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeChanger />
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton
                  aria-label="Toggle Menu"
                  className="rounded-xl px-2 py-1 text-trueGray-300 hover:text-white hover:bg-trueGray-800/50 focus:outline-none transition-colors"
                >
                  <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    {open ? (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    ) : (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </DisclosureButton>

                <DisclosurePanel className="flex w-full flex-col py-2 lg:hidden">
                  {sections.map((s) => (
                    <CloseButton
                      key={s.id}
                      as={Link}
                      href={`#${s.id}`}
                      className="w-full rounded-xl px-4 py-3 text-trueGray-300 hover:text-white hover:bg-trueGray-800/50 transition-colors duration-200"
                    >
                      {s.label}
                    </CloseButton>
                  ))}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </div>
      </nav>
    </div>
  );
};