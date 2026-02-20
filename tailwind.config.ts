import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // trueGray maps to Tailwind's neutral palette — used for dark mode backgrounds
        trueGray: colors.neutral,
        // TODO: Add your brand colors here, e.g.:
        // brand: {
        //   50: "#eef2ff",   /* TODO: Change to your brand color */
        //   500: "#6366f1",  /* TODO: Change to your brand color */
        //   600: "#4f46e5",  /* TODO: Change to your brand color */
        // },
      },
    },
    fontFamily: {
      // TODO: Change "Inter" to your brand font (also update the import in src/app/layout.tsx)
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
export default config;
