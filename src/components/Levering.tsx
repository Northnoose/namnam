import { Container } from "@/components/Container";

export function Levering() {
  return (
    <Container className="py-16">
      <div className="max-w-3xl mx-auto">
        {/* LEV-01: Heading */}
        <h2 className="text-3xl font-bold text-white mb-4 text-center lg:text-4xl">
          Du ringer – Vi bringer!
        </h2>

        {/* LEV-02: Explanation */}
        <p className="text-gray-300 text-lg leading-relaxed text-center mb-10">
          Ring{" "}
          {/* LEV-05: Clickable phone number */}
          <a
            href="tel:+4741232219"
            className="text-orange-400 hover:text-orange-300 font-semibold transition-colors duration-200"
          >
            41 23 22 19
          </a>
          , bestill fra menyen, og vi leverer innenfor Modum kommune.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* LEV-03: Delivery surcharge */}
          <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 text-center flex flex-col gap-2">
            <div className="text-orange-500 text-2xl">🚗</div>
            <h3 className="text-white font-semibold text-lg">Kjøretillegg</h3>
            <p className="text-3xl font-bold text-orange-400">99,-</p>
            <p className="text-gray-400 text-sm">innenfor Modum kommune</p>
          </div>

          {/* LEV-04: Payment methods */}
          <div className="bg-neutral-800 rounded-lg p-6 border border-neutral-700 text-center flex flex-col gap-2">
            <div className="text-orange-500 text-2xl">💳</div>
            <h3 className="text-white font-semibold text-lg">Betaling</h3>
            <div className="flex flex-col gap-1">
              <span className="text-white font-medium">Vipps</span>
              <span className="text-gray-400 text-sm">eller</span>
              <span className="text-white font-medium">Kontant</span>
            </div>
          </div>

          {/* Phone CTA */}
          <div className="bg-orange-600 rounded-lg p-6 border border-orange-500 text-center flex flex-col gap-3 items-center justify-center">
            <div className="text-white text-2xl">📞</div>
            <h3 className="text-white font-semibold text-lg">Bestill nå</h3>
            <a
              href="tel:+4741232219"
              className="text-2xl font-bold text-white hover:text-orange-100 transition-colors duration-200"
            >
              41 23 22 19
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
