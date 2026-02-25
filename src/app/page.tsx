import { Hero } from "@/components/Hero";
import { OmOss } from "@/components/OmOss";
import { Meny } from "@/components/Meny";
import { Levering } from "@/components/Levering";

export default function Home() {
  return (
    <>
      <Hero />
      <OmOss />
      <Meny />
      <Levering />
      {/* Kontakt / Footer — rendered in layout.tsx with id="kontakt" on Footer root element */}
    </>
  );
}