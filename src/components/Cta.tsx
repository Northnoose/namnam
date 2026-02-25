import React from "react";
import { Container } from "@/components/Container";

export const Cta = () => {
  return (
    <section className="relative">
      <Container className="py-16">
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-trueGray-800 bg-trueGray-950/35 px-7 py-7 lg:px-12 lg:py-12">
          <div className="flex flex-wrap items-center justify-between gap-6 lg:flex-nowrap">
            <div className="flex-grow text-center lg:text-left">
              {/* TODO: Replace with your CTA headline */}
              <h2 className="text-2xl font-semibold text-white lg:text-3xl">
                [CTA_HEADLINE]
              </h2>
              <p className="mt-2 text-trueGray-300 lg:text-lg">
                [CTA_SUBHEADLINE]
              </p>
            </div>

            <div className="flex-shrink-0 w-full text-center lg:w-auto">
              {/* TODO: Replace href with your CTA destination */}
              <a
                href="tel:+4741232219"
                rel="noopener"
                className="inline-flex items-center justify-center rounded-2xl bg-brand-600 px-7 py-3 text-lg font-semibold text-white shadow-lift hover:bg-brand-500 transition-colors border border-brand-500/40 lg:px-10 lg:py-4"
              >
                Ring 41 23 22 19
              </a>
              <div className="mt-3">
                <a
                  href="#meny"
                  className="text-sm text-white underline decoration-brand-500/60 underline-offset-4 hover:decoration-brand-400"
                >
                  Eller se menyen først
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};