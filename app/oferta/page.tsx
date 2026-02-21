import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import OurOffer from "@/components/OurOffer";
import ToolsSection from "@/components/ToolsSection";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustBadges from "@/components/shared/TrustBadges";
import Link from "next/link";

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
      />

      <div className="bg-[#f7f8fa] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[{ label: "Strona główna", href: "/" }, { label: "Oferta" }]}
          />
        </div>
      </div>

      <div className="py-6 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <TrustBadges />
        </div>
      </div>

      <OurOffer />

      <ToolsSection />

      <section className="py-12 md:py-16 bg-[#1c435e]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Gotowy na złożenie wniosku?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Decyzja kredytowa w 24h. Pieniądze nawet w 2-4 dni robocze od złożenia wniosku.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors shadow-lg"
          >
            Złóż wniosek
          </Link>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
