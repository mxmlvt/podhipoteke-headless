import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

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

      <div className="bg-[#f7f8fa] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[{ label: "Strona główna", href: "/" }, { label: "Kontakt" }]}
          />
        </div>
      </div>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-8">
                Dane kontaktowe
              </h2>
              <div className="space-y-6">
                <a
                  href="tel:577873616"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-[#e8f4f6] shrink-0 group-hover:bg-[#d0ecf0] transition-colors">
                    <Phone className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Telefon</p>
                    <p className="text-[#111827] text-lg font-semibold group-hover:text-[#1c435e] transition-colors">
                      577 873 616
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:kontakt@podhipoteke24.pl"
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 rounded-xl bg-[#e8f4f6] shrink-0 group-hover:bg-[#d0ecf0] transition-colors">
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
                  <div className="p-3 rounded-xl bg-[#e8f4f6] shrink-0">
                    <MapPin className="w-5 h-5 text-[#2299AA]" />
                  </div>
                  <div>
                    <p className="text-[#6b7280] text-sm font-medium mb-0.5">Zasięg</p>
                    <p className="text-[#111827] text-lg font-semibold">
                      Cała Polska
                    </p>
                    <p className="text-[#6b7280] text-sm mt-1">
                      Obsługujemy klientów z całego kraju, w tym online.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-[#e8f4f6] shrink-0">
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

              <div className="mt-10 p-6 rounded-xl bg-[#1c435e] text-white">
                <h3 className="text-lg font-bold mb-2">
                  Masz pilną sprawę?
                </h3>
                <p className="text-white/75 text-sm mb-4">
                  Zadzwoń bezpośrednio – nasi doradcy odbierają w godzinach roboczych.
                </p>
                <a
                  href="tel:577873616"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2299AA] text-white font-semibold text-sm hover:bg-[#2bb5c7] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Zadzwoń teraz
                </a>
              </div>
            </div>

            {/* Contact form placeholder */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-8">
                Formularz kontaktowy
              </h2>
              <p className="text-[#6b7280] mb-6">
                Wypełnij formularz poniżej, a nasz doradca skontaktuje się z Tobą w ciągu kilku godzin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
