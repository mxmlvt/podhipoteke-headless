import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PODHIPOTEKE24.PL - Ekspresowe pożyczki pod hipotekę",
  description:
    "Ekspresowe pożyczki pod hipotekę nieruchomości. Kwoty od 50 000 do 2 000 000 zł. Szybka decyzja kredytowa. 20 lat doświadczenia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${jost.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
