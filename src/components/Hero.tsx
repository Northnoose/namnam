"use client";
import Image from "next/image";
import { motion } from "motion/react";

export const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden bg-trueGray-950 px-4 py-16">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/img/NamNamPizza&Grill.png"
            alt="Nam Nam Pizza & Grill"
            width={280}
            height={280}
            priority
            sizes="(min-width: 1024px) 280px, 180px"
            quality={80}
            className="h-auto w-[180px] lg:w-[280px]"
          />
        </motion.div>

        {/* Tagline + subtext */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <h1 className="text-2xl font-bold leading-tight text-white lg:text-4xl">
            Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker!
          </h1>
          <p className="text-lg text-trueGray-300 lg:text-xl">
            Du ringer – Vi bringer! 📞{" "}
            <span className="text-white font-semibold">41 23 22 19</span>
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="tel:+4741232219"
            className="w-full rounded-2xl bg-brand-600 px-8 py-4 text-center text-lg font-bold text-white shadow-lift hover:bg-brand-500 transition-colors duration-200 border border-brand-500/40 sm:w-auto"
          >
            RING OG BESTILL
          </a>
          <a
            href="#meny"
            className="w-full rounded-2xl border border-trueGray-700 bg-trueGray-900/40 px-8 py-4 text-center text-lg font-semibold text-white hover:bg-trueGray-800/50 transition-colors duration-200 sm:w-auto"
          >
            SE MENYEN
          </a>
        </motion.div>
      </div>
    </section>
  );
};