import { Container } from "@/components/Container";

export function Footer() {
  return (
    // id="kontakt" enables the Navbar #kontakt anchor link to scroll here
    <footer id="kontakt" className="bg-neutral-900 border-t border-neutral-800 mt-8">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand + description */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-2">
              Nam Nam Pizza &amp; Grill
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker!
              Vi leverer innenfor Modum kommune.
            </p>
            {/* FOOT-05: Parking note */}
            <p className="text-gray-500 text-sm">
              Langs Riksvei 287 – Parkering utenfor!
            </p>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kontakt</h3>
            <div className="flex flex-col gap-3 text-sm">
              {/* FOOT-01: Address */}
              <div>
                <p className="text-gray-400">📍 Strandgata 11, 3340 Åmot</p>
              </div>
              {/* FOOT-02: Phone — clickable tel: link */}
              <div>
                <a
                  href="tel:+4741232219"
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors duration-200"
                >
                  📞 41 23 22 19
                </a>
              </div>
              {/* FOOT-04: Facebook link */}
              <div>
                {/* TODO: verify Facebook URL — BRIEF.md says NumNumPizzaGrill, restaurant name is NamNam */}
                <a
                  href="https://facebook.com/NumNumPizzaGrill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Opening hours */}
          <div>
            <h3 className="text-white font-semibold mb-4">Åpningstider</h3>
            {/* FOOT-03: Opening hours */}
            <div className="text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-400">Alle dager</span>
                <span className="text-white font-medium">13:00–23:00</span>
              </div>
            </div>
          </div>

        </div>

        {/* FOOT-06: Copyright */}
        <div className="mt-10 pt-6 border-t border-neutral-800 text-center text-sm text-gray-500">
          Copyright &copy; {new Date().getFullYear()} Nam Nam Pizza &amp; Grill. Alle rettigheter forbeholdt.
        </div>
      </Container>
    </footer>
  );
}
