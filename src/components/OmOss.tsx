import { Container } from "@/components/Container";

export function OmOss() {
  return (
    <section id="om-oss" className="relative">
      <Container className="py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Om oss
            </h2>
            <p className="mt-3 text-base leading-relaxed text-trueGray-300 sm:text-lg">
              Nam Nam Pizza &amp; Grill er et populært gatekjøkken sentralt i Åmot.
              Åpent hver dag hele året – pizza, grill og burgere, med utkjøring i Modum kommune.
            </p>
          </div>

          {/* Content */}
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            {/* Story / brand block */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6 sm:p-8">
                <div className="flex flex-col gap-4">
                  <h3 className="text-xl font-semibold text-white">
                    Fast, varmt og rett hjem.
                  </h3>
                  <p className="text-sm leading-relaxed text-trueGray-300 sm:text-base">
                    Vi lager klassikerne du faktisk har lyst på: sprø pizza, saftige burgere
                    og grillfavoritter – laget for å tåle både takeaway og levering.
                  </p>

                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-trueGray-800 bg-trueGray-900/30 p-4">
                      <div className="text-xs text-trueGray-400">Åpent</div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        13:00–23:00
                      </div>
                      <div className="text-sm text-trueGray-300">Alle dager</div>
                    </div>

                    <div className="rounded-2xl border border-trueGray-800 bg-trueGray-900/30 p-4">
                      <div className="text-xs text-trueGray-400">Utkjøring</div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        Modum kommune
                      </div>
                      <div className="text-sm text-trueGray-300">Du ringer – vi bringer</div>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href="tel:+4741232219"
                      className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-white font-semibold shadow-lift hover:bg-brand-500 transition-colors border border-brand-500/40"
                    >
                      Ring 41 23 22 19
                    </a>
                    <a
                      href="https://maps.google.com/?q=Strandgata+11,3340+%C3%85mot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl border border-trueGray-700 bg-trueGray-900/30 px-5 py-3 text-white font-semibold hover:bg-trueGray-800/50 transition-colors"
                    >
                      Finn oss på kartet
                    </a>
                  </div>

                  <p className="text-xs text-trueGray-500">
                    Langs Riksvei 287 – parkering utenfor.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust cards */}
            <div className="lg:col-span-5">
              <div className="grid gap-6">
                <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6">
                  <div className="text-xs text-trueGray-400">Adresse</div>
                  <div className="mt-2 text-lg font-semibold text-white">
                    Strandgata 11, 3340 Åmot
                  </div>
                  <p className="mt-2 text-sm text-trueGray-300">
                    Sentralt i Åmot – enkel henting og takeaway.
                  </p>
                </div>

                <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6">
                  <div className="text-xs text-trueGray-400">Bestilling</div>
                  <div className="mt-2 flex items-baseline justify-between gap-4">
                    <div className="text-lg font-semibold text-white">Telefon</div>
                    <a
                      href="tel:+4741232219"
                      className="text-white font-semibold underline decoration-brand-500/60 underline-offset-4 hover:decoration-brand-400"
                    >
                      41 23 22 19
                    </a>
                  </div>
                  <p className="mt-2 text-sm text-trueGray-300">
                    Raskest å ringe – vi tar bestillingen med én gang.
                  </p>
                </div>

                <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6">
                  <div className="text-xs text-trueGray-400">Vurdering</div>
                  <div className="mt-2 flex items-center justify-between gap-4">
                    <div className="text-lg font-semibold text-white">Google</div>
                    <div className="text-white font-semibold">
                      4.4 <span className="text-trueGray-400 text-sm">/ 5</span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-trueGray-300">
                    Basert på kundeanmeldelser (oppdateres over tid).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}