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
  title: "[COMPANY_NAME]",
  description: "[META_DESCRIPTION]",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" suppressHydrationWarning>
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
