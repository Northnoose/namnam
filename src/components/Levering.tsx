import { Container } from "@/components/Container";

export function Levering() {
  return (
    <section id="levering" className="relative">
      <Container className="py-16">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <h2 className="text-3xl font-semibold text-white mb-4 text-center lg:text-4xl">
            Du ringer – Vi bringer!
          </h2>

          {/* Explanation */}
          <p className="text-trueGray-300 text-lg leading-relaxed text-center mb-10">
            Ring{" "}
            <a
              href="tel:+4741232219"
              className="text-white font-semibold underline decoration-brand-500/60 underline-offset-4 hover:decoration-brand-400 transition-colors"
            >
              41 23 22 19
            </a>
            , bestill fra menyen, og vi leverer innenfor Modum kommune.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Delivery surcharge */}
            <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6 text-center flex flex-col gap-2">
              <div className="text-brand-500 text-2xl">🚗</div>
              <h3 className="text-white font-semibold text-lg">Kjøretillegg</h3>
              <p className="text-3xl font-bold text-white">99,-</p>
              <p className="text-trueGray-400 text-sm">innenfor Modum kommune</p>
            </div>

            {/* Payment methods */}
            <div className="rounded-3xl border border-trueGray-800 bg-trueGray-950/35 p-6 text-center flex flex-col gap-2">
              <div className="text-brand-500 text-2xl">💳</div>
              <h3 className="text-white font-semibold text-lg">Betaling</h3>
              <div className="flex flex-col gap-1">
                <span className="text-white font-medium">Vipps</span>
                <span className="text-trueGray-400 text-sm">eller</span>
                <span className="text-white font-medium">Kontant</span>
              </div>
            </div>

            {/* Phone CTA */}
            <div className="rounded-3xl border border-brand-500/35 bg-brand-600/15 p-6 text-center flex flex-col gap-3 items-center justify-center">
              <div className="text-white text-2xl">📞</div>
              <h3 className="text-white font-semibold text-lg">Bestill nå</h3>
              <a
                href="tel:+4741232219"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-5 py-3 text-white font-bold shadow-lift hover:bg-brand-500 transition-colors border border-brand-500/40"
              >
                41 23 22 19
              </a>
              <p className="text-xs text-trueGray-300/90">
                Raskest å ringe – vi tar bestillingen med én gang.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}