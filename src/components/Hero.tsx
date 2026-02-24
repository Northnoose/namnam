"use client";
import Image from "next/image";
import { motion } from "motion/react";

export const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-[calc(100vh-80px)] bg-neutral-950 overflow-hidden px-4 py-16">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-6">
        {/* Logo — HERO-01 */}
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
            className="w-[180px] h-auto lg:w-[280px]"
          />
        </motion.div>

        {/* Tagline + subtext — HERO-02, HERO-03 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col gap-3"
        >
          <h1 className="text-2xl font-bold text-white lg:text-4xl leading-tight">
            Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker!
          </h1>
          <p className="text-lg text-gray-300 lg:text-xl">
            Du ringer – Vi bringer! 📞 41 23 22 19
          </p>
        </motion.div>

        {/* CTA buttons — HERO-04, HERO-05 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <a
            href="tel:+4741232219"
            className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg rounded-md transition-colors duration-200 w-full sm:w-auto text-center"
          >
            RING OG BESTILL
          </a>
          <a
            href="#meny"
            className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-lg rounded-md transition-colors duration-200 w-full sm:w-auto text-center border border-neutral-700"
          >
            SE MENYEN
          </a>
        </motion.div>
      </div>
    </section>
  );
};
