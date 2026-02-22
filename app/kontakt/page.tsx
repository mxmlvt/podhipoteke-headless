import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt – złóż wniosek o pożyczkę | PODHIPOTEKE24.PL",
  description:
    "Skontaktuj się z nami. Telefon: 577 873 616, email: kontakt@podhipoteke24.pl. Wypełnij formularz kontaktowy i otrzymaj decyzję w 24h.",
};

export default function KontaktPage() {
  return (
    <main>
      <PageHero
        heading="Kontakt"
        text="Masz pytania odnośnie naszej oferty? Skontaktuj się z nami – odpiszemy w ciągu kilku godzin."
        bgImage="/images/faq-bg.jpg"
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
            <li className="text-[#374151]">Kontakt</li>
          </ol>
        </div>
      </nav>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                Dane kontaktowe
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-8">
                Skontaktuj się z nami
              </h2>
              <div className="space-y-6">
                <a href="tel:577873616" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0 group-hover:bg-[#d0ecf0] transition-colors">
                    <Phone className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Telefon</p>
                    <p className="text-[#111827] text-lg font-semibold group-hover:text-[#1c435e] transition-colors">
                      577 873 616
                    </p>
                  </div>
                </a>

                <a href="mailto:kontakt@podhipoteke24.pl" className="flex items-start gap-4 group">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0 group-hover:bg-[#d0ecf0] transition-colors">
                    <Mail className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">E-mail</p>
                    <p className="text-[#111827] text-lg font-semibold group-hover:text-[#1c435e] transition-colors">
                      kontakt@podhipoteke24.pl
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0">
                    <MapPin className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Zasięg</p>
                    <p className="text-[#111827] text-lg font-semibold">Cała Polska</p>
                    <p className="text-[#6b7280] text-sm mt-1">
                      Obsługujemy klientów z całego kraju, w tym online.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#e6f7f9] shrink-0">
                    <Clock className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Czas reakcji</p>
                    <p className="text-[#111827] text-lg font-semibold">
                      Odpowiadamy w ciągu kilku godzin
                    </p>
                    <p className="text-[#6b7280] text-sm mt-1">
                      Decyzję kredytową wydajemy w 24 godziny.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-[#1c435e] text-white">
                <h3 className="text-lg font-bold mb-2">Masz pilną sprawę?</h3>
                <p className="text-white/75 text-sm mb-4">
                  Zadzwoń bezpośrednio – nasi doradcy odbierają w godzinach roboczych.
                </p>
                <a
                  href="tel:577873616"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2299AA] text-white font-semibold text-sm hover:bg-[#2bb5c7] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Zadzwoń teraz
                </a>
              </div>
            </div>

            {/* Info box */}
            <div className="flex flex-col justify-center">
              <div className="bg-[#f0fafb] rounded-2xl p-8">
                <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                  Formularz kontaktowy
                </span>
                <h2 className="text-2xl font-bold text-[#111827] mb-4">
                  Napisz do nas
                </h2>
                <p className="text-[#6b7280] mb-6 leading-relaxed">
                  Wypełnij formularz poniżej, a nasz doradca skontaktuje się z Tobą w ciągu kilku godzin.
                </p>
                <ul className="space-y-3">
                  {[
                    "Bez BIK – nie sprawdzamy historii kredytowej",
                    "Minimum dokumentów – tylko numer KW",
                    "Szybka decyzja – do 24 godzin",
                    "Dyskrecja gwarantowana",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#374151]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2299AA] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
