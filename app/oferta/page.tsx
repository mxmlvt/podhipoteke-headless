import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import OurOffer from "@/components/OurOffer";
import WhatDistinguishes from "@/components/WhatDistinguishes";
import AdditionalBenefits from "@/components/AdditionalBenefits";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Oferta - PODHIPOTEKE24.PL",
  description: "Poznaj naszą ofertę pożyczek pod zastaw nieruchomości. Pożyczki od 50 000 do 2 000 000 zł. Szybka decyzja kredytowa.",
};

export default function OfertaPage() {
  return (
    <>
      <PageHero
        heading="NASZA OFERTA"
        text="Specjalizujemy się w pomocy osobom, które w krótkim czasie potrzebują gotówki. Jedynym zabezpieczeniem jakie musisz posiadać jest nieruchomość."
        buttonText="Poznaj naszą ofertę"
        buttonHref="#offer-detail"
        bgImage="/images/oferta-bg.jpg"
      />

      <section id="offer-detail">
        <OurOffer />
      </section>
      <WhatDistinguishes />
      <AdditionalBenefits />
      <ContactForm />
    </>
  );
}
