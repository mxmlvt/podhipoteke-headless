import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://podhipoteke24.pl"),
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TJ8L6ER6EV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TJ8L6ER6EV');
            gtag('config', 'AW-11125929915');
          `}
        </Script>
      </head>
      <body className={`${jost.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
