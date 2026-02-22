import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import OurOffer from "@/components/OurOffer";
import ToolsSection from "@/components/ToolsSection";
import ContactForm from "@/components/ContactForm";
import TrustBadgesBar from "@/components/TrustBadgesBar";

export const metadata: Metadata = {
  title: "Oferta – pożyczki i kredyty pod hipotekę | PODHIPOTEKE24.PL",
  description:
    "Poznaj naszą ofertę pożyczek pod zastaw nieruchomości. Kredyty hipoteczne, pożyczki oddłużeniowe. Kwoty od 50 000 do 2 000 000 zł. Bez BIK.",
};

export default function OfertaPage() {
  return (
    <main>
      <PageHero
        heading="Nasza oferta"
        text="Specjalizujemy się w ekspresowych pożyczkach pod hipotekę nieruchomości. Jedynym zabezpieczeniem jest nieruchomość – bez BIK, bez zaświadczeń."
        bgImage="/images/oferta-bg.jpg"
        breadcrumbs={[
          { label: "Strona główna", href: "/" },
          { label: "Oferta" },
        ]}
      />

      <TrustBadgesBar />

      <OurOffer />

      <ToolsSection />

      <section className="section-dark py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Gotowy na złożenie wniosku?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Decyzja kredytowa w 24h. Pieniądze nawet w 2-4 dni robocze od złożenia wniosku.
          </p>
          <a href="#formularz" className="btn-cta-shine !px-10 !py-4">
            Złóż wniosek
          </a>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
