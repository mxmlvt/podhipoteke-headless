import type { Metadata } from "next";
import OurOffer from "@/components/OurOffer";
import WhatDistinguishes from "@/components/WhatDistinguishes";
import AdditionalBenefits from "@/components/AdditionalBenefits";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Oferta - PODHIPOTEKE24.PL",
  description: "Poznaj naszą ofertę pożyczek pod zastaw nieruchomości. Pożyczki od 50 000 do 2 000 000 zł. Szybka decyzja kredytowa.",
};

export default function OfertaPage() {
  return (
    <>
      {/* Hero z breadcrumbs NAD H1 */}
      <section className="relative py-[150px] overflow-hidden">
        <Image
          src="/images/oferta-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={85}
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#1c435e]/80" />
        <div className="relative z-10 max-w-[1330px] mx-auto px-4 text-center">
          {/* Breadcrumbs NAD H1 */}
          <nav className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <span className="text-white/90">Oferta</span>
          </nav>
          <h1 className="text-3xl md:text-[4.2rem] font-medium text-white leading-tight mb-4">
            NASZA OFERTA
          </h1>
          <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
            Specjalizujemy się w pomocy osobom, które w krótkim czasie potrzebują gotówki. Jedynym zabezpieczeniem jakie musisz posiadać jest nieruchomość.
          </p>
          <a href="#offer-detail" className="btn-outline-white !px-8 !py-3 !text-lg">
            Poznaj szczegóły ↓
          </a>
        </div>
      </section>

      <section id="offer-detail">
        <OurOffer />
      </section>
      <WhatDistinguishes />
      <AdditionalBenefits />

      {/* CTA – scrolluje do #formularz */}
      <section className="py-14 bg-[#2299AA]/10">
        <div className="max-w-[1330px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-[2.5rem] font-semibold text-primary mb-4">
            Gotowy na złożenie wniosku?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Wypełnij formularz poniżej lub zadzwoń do nas. Odpowiadamy w ciągu 24 godzin.
          </p>
          <a href="#formularz" className="btn-cta-shine !px-10 !py-4 !text-lg">
            Złóż wniosek
          </a>
        </div>
      </section>

      <ContactForm />
    </>
  );
}
