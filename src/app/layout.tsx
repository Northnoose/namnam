import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PopupWidget }  from "@/components/PopupWidget";
import { CallBar } from "@/components/CallBar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://namnam.no"
    // TODO: update NEXT_PUBLIC_SITE_URL env var with confirmed deployment domain before go-live
  ),
  title: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum",
  description:
    "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker! Ring 41 23 22 19 og bestill pizza, grill eller burger med utkjøring i Modum.",
  openGraph: {
    title: "Nam Nam Pizza & Grill – Pizza, Grill & Burger i Åmot | Utkjøring i Modum",
    description:
      "Gatekjøkkenet i Åmot – Fastfood som du ønsker, når du ønsker! Ring 41 23 22 19 og bestill pizza, grill eller burger med utkjøring i Modum.",
    images: [
      {
        url: "/img/NamNamPizza&Grill.png",
        width: 1024,
        height: 1024,
        alt: "Nam Nam Pizza & Grill logo",
      },
    ],
    locale: "nb_NO",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: "Nam Nam Pizza & Grill",
  description:
    "Gatekjøkkenet i Åmot – pizza, grill og burger med utkjøring i Modum.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strandgata 11",
    addressLocality: "Åmot",
    postalCode: "3340",
    addressCountry: "NO",
  },
  telephone: "+4741232219",
  openingHours: "Mo-Su 13:00-23:00",
  url: "https://namnam.no",
  servesCuisine: ["Pizza", "Grill", "Burger"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" suppressHydrationWarning data-scroll-behavior="smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <div className="pb-16 lg:pb-0">{children}</div>
          <Footer />
          <CallBar />
          <PopupWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
