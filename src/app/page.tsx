import { Hero } from "@/components/Hero";
import { OmOss } from "@/components/OmOss";
import { Meny } from "@/components/Meny";
import { Levering } from "@/components/Levering";

export default function Home() {
  return (
    <>
      {/* Hero renders its own section with full-viewport styling — no wrapper needed */}
      <Hero />

      {/* Om oss section — Navbar links to #om-oss */}
      <section id="om-oss">
        <OmOss />
      </section>

      {/* Meny section — Navbar links to #meny, Hero "SE MENYEN" button links here */}
      <section id="meny">
        <Meny />
      </section>

      {/* Levering section — Navbar links to #levering */}
      <section id="levering">
        <Levering />
      </section>

      {/* Kontakt / Footer — rendered in layout.tsx with id="kontakt" on Footer root element */}
    </>
  );
}
