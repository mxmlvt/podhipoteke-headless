import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
      />

      <nav className="bg-[#f0fafb] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <ol className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#1c435e]">
                Strona główna
              </Link>
            </li>
            <li>
              <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" />
            </li>
            <li className="text-[#374151]">Oferta</li>
          </ol>
        </div>
      </nav>

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
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
          >
            Złóż wniosek
          </Link>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
