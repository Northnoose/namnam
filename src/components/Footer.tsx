import { Container } from "@/components/Container";

export function Footer() {
  return (
    <footer
      id="kontakt"
      className="mt-10 border-t border-trueGray-800 bg-trueGray-950"
    >
      <Container className="py-14">
        {/* Order panel */}
        <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Bestill på telefon – raskest mulig.
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-trueGray-300 sm:text-base">
                Ring oss, så ordner vi resten. Utkjøring innenfor Modum kommune.
              </p>
            </div>

            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="tel:+4741232219"
                  className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-6 py-3.5 text-white font-semibold shadow-lift hover:bg-brand-500 transition-colors border border-brand-500/40"
                  aria-label="Ring oss: 41 23 22 19"
                >
                  📞 41 23 22 19
                </a>
                <a
                  href="#meny"
                  className="inline-flex items-center justify-center rounded-2xl border border-trueGray-700 bg-trueGray-900/30 px-6 py-3.5 text-white font-semibold hover:bg-trueGray-800/50 transition-colors"
                >
                  Se meny
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-trueGray-800 bg-trueGray-900/25 p-4">
              <div className="text-xs text-trueGray-400">Adresse</div>
              <div className="mt-1 text-sm font-semibold text-white">
                Strandgata 11, 3340 Åmot
              </div>
              <a
                href="https://maps.google.com/?q=Strandgata+11,3340+%C3%85mot"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm text-white underline decoration-brand-500/60 underline-offset-4 hover:decoration-brand-400"
              >
                Åpne i Google Maps
              </a>
            </div>

            <div className="rounded-2xl border border-trueGray-800 bg-trueGray-900/25 p-4">
              <div className="text-xs text-trueGray-400">Åpningstider</div>
              <div className="mt-1 flex items-baseline justify-between gap-3">
                <span className="text-sm text-trueGray-300">Alle dager</span>
                <span className="text-sm font-semibold text-white">
                  13:00–23:00
                </span>
              </div>
              <div className="mt-2 text-xs text-trueGray-500">
                Langs Riksvei 287 – parkering utenfor.
              </div>
            </div>

            <div className="rounded-2xl border border-trueGray-800 bg-trueGray-900/25 p-4">
              <div className="text-xs text-trueGray-400">Følg oss</div>
              <a
                href="https://facebook.com/NumNumPizzaGrill"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex text-sm font-semibold text-white underline decoration-brand-500/60 underline-offset-4 hover:decoration-brand-400"
              >
                Facebook
              </a>
              <div className="mt-2 text-xs text-trueGray-500">
                (Sjekk at lenken er korrekt før go-live.)
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 border-t border-trueGray-800 pt-6 text-center text-sm text-trueGray-500">
          Copyright &copy; {new Date().getFullYear()} Nam Nam Pizza &amp; Grill.
          Alle rettigheter forbeholdt.
        </div>
      </Container>
    </footer>
  );
}