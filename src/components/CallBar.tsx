// src/components/CallBar.tsx
// NAV-04: Fixed call bar — bottom on mobile, hidden on desktop (desktop phone is in navbar)
export const CallBar = () => (
  <a
    href="tel:+4741232219"
    className="lg:hidden fixed bottom-0 left-0 z-40 w-full
               flex items-center justify-center gap-2
               bg-brand-600 hover:bg-brand-500
               text-white font-bold py-4
               shadow-lift
               transition-colors duration-200"
    aria-label="Ring oss på 41 23 22 19"
  >
    📞 Ring oss: 41 23 22 19
  </a>
);