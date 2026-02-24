"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Disclosure, DisclosureButton, DisclosurePanel, CloseButton } from "@headlessui/react";
import ThemeChanger from "./DarkSwitch";

const sections = [
  { id: "om-oss",   label: "Om oss" },
  { id: "meny",     label: "Meny" },
  { id: "levering", label: "Levering" },
  { id: "kontakt",  label: "Kontakt" },
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
        scrolled ? "bg-neutral-900/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="container relative flex flex-wrap items-center justify-between px-4 py-4 lg:px-8 mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/img/NamNamPizza&Grill.png"
            alt="Nam Nam Pizza & Grill"
            width={120}
            height={120}
            priority
            className="w-[60px] h-auto lg:w-[80px]"
          />
        </Link>

        {/* Desktop links — hidden on mobile, visible on lg+ */}
        <ul className="hidden lg:flex items-center gap-1">
          {sections.map((s) => (
            <li key={s.id}>
              <Link
                href={`#${s.id}`}
                className="px-4 py-2 text-gray-200 hover:text-white rounded-md transition-colors duration-200"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right cluster: ThemeChanger + phone CTA — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeChanger />
          <a
            href="tel:+4741232219"
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white font-semibold rounded-md transition-colors duration-200"
            aria-label="Ring oss: 41 23 22 19"
          >
            41 23 22 19
          </a>
        </div>

        {/* Mobile controls: ThemeChanger + hamburger — visible below lg */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeChanger />
          <Disclosure>
            {({ open }) => (
              <>
                <DisclosureButton
                  aria-label="Toggle Menu"
                  className="px-2 py-1 text-gray-300 rounded-md hover:text-white focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 fill-current"
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

                <DisclosurePanel className="flex flex-col w-full py-2 lg:hidden">
                  {sections.map((s) => (
                    <CloseButton
                      key={s.id}
                      as={Link}
                      href={`#${s.id}`}
                      className="w-full px-4 py-3 text-gray-300 hover:text-white rounded-md transition-colors duration-200"
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
