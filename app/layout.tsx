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
  openGraph: {
    siteName: "PODHIPOTEKE24.PL",
    images: [
      {
        url: "/images/slide-1.jpg",
        width: 1200,
        height: 630,
        alt: "PODHIPOTEKE24.PL – Pożyczki pod zastaw nieruchomości",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              name: "PODHIPOTEKE24.PL",
              url: "https://podhipoteke24.pl",
              logo: "https://podhipoteke24.pl/images/logo.png",
              image: "https://podhipoteke24.pl/images/slide-1.jpg",
              telephone: "+48577873616",
              email: "kontakt@podhipoteke24.pl",
              description:
                "Ekspresowe pożyczki pozabankowe pod zastaw nieruchomości. Kwoty od 50 000 do 2 000 000 zł. Bez BIK, bez zbędnych formalności.",
              foundingDate: "2003",
              areaServed: { "@type": "Country", name: "Poland" },
              taxID: "5261073354",
              sameAs: ["https://maps.app.goo.gl/bDgoSg3GVUSGHUDTA"],
            }),
          }}
        />
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
