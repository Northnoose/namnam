import { Container } from "@/components/Container";

export function OmOss() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6 text-center lg:text-4xl">
          Om oss
        </h2>

        {/* OM-01: 2–3 sentences about the restaurant */}
        <p className="text-gray-300 text-lg leading-relaxed text-center mb-10">
          Nam Nam Pizza &amp; Grill er et populært gatekjøkken sentralt i Åmot, Modum kommune.
          Vi er åpne hver dag hele året og serverer en bred meny med pizza, grill, hamburgere og mer.
          Utkjøring tilgjengelig innenfor Modum kommune – vi bringer maten rett til deg!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* OM-02 + OM-04: Address + Google Maps link */}
          <div className="bg-neutral-800 rounded-lg p-6 flex flex-col gap-3 border border-neutral-700">
            <div className="text-orange-500 text-2xl">📍</div>
            <h3 className="text-white font-semibold text-lg">Adresse</h3>
            <p className="text-gray-300">Strandgata 11, 3340 Åmot</p>
            <a
              href="https://maps.google.com/?q=Strandgata+11,3340+%C3%85mot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 text-sm font-medium transition-colors duration-200 mt-auto"
            >
              Åpne i Google Maps →
            </a>
          </div>

          {/* OM-03: Opening hours */}
          <div className="bg-neutral-800 rounded-lg p-6 flex flex-col gap-3 border border-neutral-700">
            <div className="text-orange-500 text-2xl">🕐</div>
            <h3 className="text-white font-semibold text-lg">Åpningstider</h3>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Alle dager</span>
              <span className="text-white font-semibold">13:00–23:00</span>
            </div>
          </div>

          {/* OM-05: Google rating badge */}
          <div className="bg-neutral-800 rounded-lg p-6 flex flex-col gap-3 border border-neutral-700">
            <div className="text-orange-500 text-2xl">⭐</div>
            <h3 className="text-white font-semibold text-lg">Google-vurdering</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-white">4.4</span>
              <div>
                <div className="text-yellow-400 text-lg">⭐⭐⭐⭐½</div>
                <div className="text-gray-400 text-sm">53 anmeldelser</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
