import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    q: "Kto może skorzystać z pożyczki?",
    a: "O pożyczkę mogą ubiegać się firmy każdego rodzaju – spółki prawa handlowego, jak i osoby fizyczne prowadzące jednoosobową działalność gospodarczą. Przyjmujemy również wnioski od osób prywatnych.",
  },
  {
    q: "Jaką kwotę pożyczki mogę otrzymać?",
    a: "Nasza firma udziela pożyczek od 50 000 zł do 2 000 000 zł. Kwota zależy od wartości nieruchomości stanowiącej zabezpieczenie.",
  },
  {
    q: "Czy wpisy w KRD, BIK, BIG i ERIF mają wpływ na decyzję o udzieleniu pożyczki?",
    a: "Nie. Na decyzję o udzieleniu pożyczki nie mają wpływu wpisy w żadnym rejestrze dłużników. Nie sprawdzamy BIK, BIG, KRD ani ERIF.",
  },
  {
    q: "Ile mam czasu na spłatę pożyczki?",
    a: "Termin spłaty pożyczki jest kwestią zupełnie elastyczną. Do każdego klienta podchodzimy całkowicie indywidualnie. Minimalny okres to 12 miesięcy, maksymalny to 119 miesięcy.",
  },
  {
    q: "Jakie dokumenty są potrzebne?",
    a: "Jedyne wymagane dokumenty to numer księgi wieczystej nieruchomości oraz wypis z rejestru gruntów. Nie wymagamy zaświadczeń z ZUS, US ani dokumentów finansowych.",
  },
  {
    q: "Jak długo muszę czekać na pieniądze?",
    a: "Od złożenia kompletnego wniosku do wypłaty środków mija zwykle od 2 do 4 dni roboczych. Decyzję kredytową wydajemy w ciągu 24 godzin.",
  },
  {
    q: "Jakie jest zabezpieczenie udzielanej pożyczki?",
    a: "Pożyczka udzielana jest pod zastaw nieruchomości. Wymagany jest wpis hipoteki w księdze wieczystej domu, mieszkania, działki lub innej nieruchomości.",
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

export default function FAQ() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Najczęściej zadawane pytania
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Nie znalazłeś odpowiedzi? Skontaktuj się z nami – odpiszemy w ciągu kilku godzin.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
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
        </div>
      </div>
    </section>
  );
}
