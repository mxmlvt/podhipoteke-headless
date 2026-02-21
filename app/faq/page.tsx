import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ – Najczęściej zadawane pytania | PODHIPOTEKE24.PL",
  description:
    "Odpowiedzi na najczęstsze pytania o pożyczkach pod hipotekę. Kto może otrzymać pożyczkę, jakie dokumenty, jak długo czekać na decyzję.",
};

const faqItems = [
  {
    q: "Kto może skorzystać z pożyczki pod hipotekę?",
    a: "O pożyczkę mogą ubiegać się zarówno osoby fizyczne, jak i firmy. Spółki prawa handlowego, jednoosobowe działalności gospodarcze – każdy kto posiada nieruchomość stanowiącą zabezpieczenie.",
  },
  {
    q: "Jaką kwotę pożyczki mogę otrzymać?",
    a: "Udzielamy pożyczek od 50 000 zł do 2 000 000 zł. Kwota zależy od wartości nieruchomości stanowiącej zabezpieczenie i jej stanu prawnego.",
  },
  {
    q: "Czy wpisy w BIK, KRD, BIG i ERIF mają wpływ na decyzję?",
    a: "Nie. Na decyzję o udzieleniu pożyczki nie mają wpływu wpisy w żadnym rejestrze dłużników. Nie sprawdzamy historii kredytowej klientów.",
  },
  {
    q: "Jakie dokumenty są wymagane?",
    a: "Jedyne wymagane dokumenty to numer księgi wieczystej nieruchomości oraz wypis z rejestru gruntów. Nie wymagamy zaświadczeń z ZUS, US, ani dokumentów finansowych.",
  },
  {
    q: "Jak długo trwa proces udzielenia pożyczki?",
    a: "Decyzję kredytową wydajemy w ciągu 24 godzin od złożenia wniosku. Pieniądze trafiają na konto w ciągu 2-4 dni roboczych od złożenia kompletnych dokumentów.",
  },
  {
    q: "Na jaki okres mogę zaciągnąć pożyczkę?",
    a: "Termin spłaty jest kwestią elastyczną. Minimalny okres to 12 miesięcy, maksymalny to 119 miesięcy. Do każdego klienta podchodzimy indywidualnie.",
  },
  {
    q: "Jakie jest zabezpieczenie pożyczki?",
    a: "Pożyczka zabezpieczona jest hipoteką na nieruchomości. Wymagany jest wpis w księdze wieczystej domu, mieszkania, działki lub innej nieruchomości.",
  },
  {
    q: "Czy muszę badać zdolność kredytową?",
    a: "Nie badamy zdolności kredytowej w tradycyjnym sensie. Jedynym kryterium jest wartość nieruchomości stanowiącej zabezpieczenie pożyczki.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function FaqPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <PageHero
        heading="Najczęściej zadawane pytania"
        text="Odpowiedzi na pytania, które nasi klienci zadają najczęściej przed złożeniem wniosku."
        bgImage="/images/faq-bg.jpg"
      />

      <div className="bg-[#f7f8fa] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[{ label: "Strona główna", href: "/" }, { label: "FAQ" }]}
          />
        </div>
      </div>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-[#e5e7eb]">
                <AccordionTrigger className="text-left text-[#111827] font-semibold hover:text-[#1c435e] hover:no-underline py-5">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#6b7280] leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 pt-8 border-t border-[#e5e7eb] text-center">
            <h2 className="text-xl font-bold text-[#111827] mb-3">
              Nie znalazłeś odpowiedzi?
            </h2>
            <p className="text-[#6b7280] mb-6">
              Skontaktuj się z nami bezpośrednio lub skorzystaj z diagnostyki finansowej.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/narzedzia/diagnostyka"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#1c435e] text-white font-semibold hover:bg-[#254d6b] transition-colors"
              >
                Diagnostyka finansowa
              </Link>
              <a
                href="tel:577873616"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-[#1c435e] text-[#1c435e] font-semibold hover:bg-[#1c435e] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                577 873 616
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
