import { Container } from "@/components/Container";

export default function Home() {
  return (
    <Container>
      {/* Phase 2: anchor targets — real content added in Phase 3 */}
      <section id="om-oss" className="min-h-[300px] flex items-center justify-center py-16">
        <p className="text-gray-500 text-lg">Om oss — klar i Phase 3</p>
      </section>

      <section id="meny" className="min-h-[300px] flex items-center justify-center py-16">
        <p className="text-gray-500 text-lg">Meny — klar i Phase 3</p>
      </section>

      <section id="levering" className="min-h-[300px] flex items-center justify-center py-16">
        <p className="text-gray-500 text-lg">Levering — klar i Phase 3</p>
      </section>

      <section id="kontakt" className="min-h-[300px] flex items-center justify-center py-16">
        <p className="text-gray-500 text-lg">Kontakt — klar i Phase 3</p>
      </section>
    </Container>
  );
}
