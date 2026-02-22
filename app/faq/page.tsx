import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IMAGES } from "@/lib/images";

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
            <li className="text-[#374151]">FAQ</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left: heading + image + CTA */}
            <div>
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
                Masz pytania? Mamy odpowiedzi
              </h2>
              <p className="text-[#6b7280] text-lg leading-relaxed mb-7">
                Zebraliśmy najczęstsze pytania naszych klientów. Jeśli nie znajdziesz odpowiedzi – zadzwoń lub napisz do nas bezpośrednio.
              </p>

              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-7 shadow-md">
                <Image
                  src={IMAGES.sections.contact}
                  alt="Konsultacja finansowa"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#1c435e] hover:bg-[#254d6b] text-white font-semibold transition-colors"
                >
                  Masz więcej pytań? Napisz do nas
                </Link>
                <a
                  href="tel:577873616"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold hover:bg-[#1c435e] hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  577 873 616
                </a>
              </div>
            </div>

            {/* Right: Accordion */}
            <div>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-[#e5e7eb]">
                    <AccordionTrigger className="text-left text-[#111827] font-semibold hover:text-[#1c435e] hover:no-underline py-5 text-base">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[#6b7280] leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
