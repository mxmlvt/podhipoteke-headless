import type { CityData } from "@/lib/city-data";
import { fmt, maxLoan } from "@/lib/city-data";
import FaqAccordion from "@/components/FaqAccordion";
import ContactForm from "@/components/ContactForm";
import GoogleReviews from "@/components/GoogleReviews";

interface Props {
  city: CityData;
}

// Generate city-specific FAQ items
function buildFaq(city: CityData) {
  const { name, genitive, locative, priceSecondary, districts } = city;
  const avg = priceSecondary;
  const ex50 = avg * 50;
  const ex75 = avg * 75;
  const loan50 = maxLoan(ex50);
  const loan75 = maxLoan(ex75);

  return [
    {
      question: `Ile mogę pożyczyć pod zastaw nieruchomości w ${locative}?`,
      answer: `Kwota pożyczki zależy od wartości rynkowej Twojej nieruchomości. Udzielamy pożyczek do 55% wartości nieruchomości (LTV). Przy średniej cenie ${fmt(avg)} zł/m² na rynku wtórnym w ${locative}, właściciel mieszkania 50 m² może liczyć na nawet ${fmt(loan50)} zł, a mieszkania 75 m² – do ${fmt(loan75)} zł. Pożyczamy od 50 000 do 2 000 000 zł.`,
    },
    {
      question: `Jakie dzielnice ${genitive} obsługujecie?`,
      answer: `Obsługujemy nieruchomości ze wszystkich dzielnic ${genitive}: ${districts.join(", ")}. Jeśli Twoja nieruchomość leży w innej części miasta lub w gminie ościennej – też możemy pomóc. Skontaktuj się z nami, a sprawdzimy indywidualnie.`,
    },
    {
      question: `Jakie nieruchomości z ${genitive} przyjmujecie jako zabezpieczenie?`,
      answer: `Przyjmujemy jako zabezpieczenie: mieszkania, domy jednorodzinne, lokale usługowe i biurowe, działki budowlane, działki rolne oraz grunty inwestycyjne zlokalizowane w ${locative} i okolicach. Nieruchomość musi mieć założoną księgę wieczystą i być wolna od hipotek lub z możliwością ich spłaty ze środków pożyczki.`,
    },
    {
      question: `Jak długo trwa udzielenie pożyczki dla mieszkańców ${genitive}?`,
      answer: `Standardowy czas realizacji to 24–48 godzin od złożenia wniosku. Wstępna decyzja zapada zazwyczaj tego samego dnia. Podpisanie umowy i wpis hipoteki odbywa się u notariusza, najczęściej w ${locative} lub w Twoim mieście. Pieniądze trafiają na konto w dniu podpisania aktu notarialnego.`,
    },
    {
      question: `Czy mieszkańcy ${genitive} z negatywną historią BIK mogą otrzymać pożyczkę?`,
      answer: `Tak. Nie weryfikujemy BIK, KRD, BIG ani ERIF. Nasza pożyczka pod zastaw nieruchomości jest dostępna dla osób z zajęciami komorniczymi, zadłużonymi hipotekami, po upadłości konsumenckiej lub bez zdolności kredytowej. Jedyne zabezpieczenie to wartość nieruchomości w ${locative}.`,
    },
    {
      question: `Jakie są aktualne ceny nieruchomości w ${locative} i co to znaczy dla pożyczki?`,
      answer: `Według danych transakcyjnych (Q4 2025 / Q1 2026) średnia cena na rynku wtórnym w ${locative} wynosi około ${fmt(avg)} zł/m², a na rynku pierwotnym – około ${fmt(city.pricePrimary)} zł/m². Im wyższa wartość nieruchomości, tym wyższa możliwa kwota pożyczki. Dla mieszkania o powierzchni 75 m² wartość szacunkowa to ok. ${fmt(ex75)} zł, co oznacza możliwość uzyskania nawet ${fmt(loan75)} zł pożyczki.`,
    },
  ];
}

export default function CityPageTemplate({ city }: Props) {
  const { name, genitive, locative, priceSecondary, pricePrimary, districts } = city;
  const faqItems = buildFaq(city);

  // Price table rows: 40, 50, 60, 75, 100 m²
  const sizes = [40, 50, 60, 75, 100];

  // JSON-LD FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  // JSON-LD BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: "https://podhipoteke24.pl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: `Pożyczka pod zastaw nieruchomości ${locative}`,
        item: `https://podhipoteke24.pl/${city.newSlug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── 1. Intro ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                Pożyczki pozabankowe – {name}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-4 leading-snug">
                Pożyczka pod zastaw nieruchomości w {locative}
                <br />
                <span className="text-[#2299AA]">bez BIK, bez zbędnych formalności</span>
              </h2>
              <p className="text-[#555] leading-relaxed mb-6">
                Oferujemy ekspresowe pożyczki pozabankowe zabezpieczone hipoteką dla
                mieszkańców {genitive} i okolic. Jedynym warunkiem jest posiadanie
                nieruchomości z księgą wieczystą – nie sprawdzamy BIK, KRD ani zdolności
                kredytowej.
              </p>
              <ul className="space-y-2 text-sm text-[#374151]">
                {[
                  "Decyzja w 24 godziny od złożenia wniosku",
                  "Wypłata nawet w dniu podpisania aktu notarialnego",
                  "Kwoty od 50 000 do 2 000 000 zł",
                  "Akceptujemy zajęcia komornicze i historię BIK",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#2299AA] font-bold shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "24h", label: "Czas decyzji" },
                { value: "55%", label: "Maks. LTV" },
                { value: "2 mln", label: "Maks. kwota (zł)" },
                { value: "20 lat", label: "Doświadczenia" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#f0fafb] rounded-2xl p-5 text-center border border-[#d4eef2]"
                >
                  <p className="text-3xl font-extrabold text-[#1c435e]">{s.value}</p>
                  <p className="text-xs text-[#6b7280] mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Ceny nieruchomości + ile możesz pożyczyć ─────────── */}
      <section className="py-14 md:py-20 bg-[#f4f6f8]">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#1c435e]/10 text-[#1c435e]">
              Rejestr cen transakcyjnych NBP
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Ceny nieruchomości w {locative} – ile możesz pożyczyć?
            </h2>
            <p className="text-[#6b7280] mt-2 max-w-xl mx-auto text-sm">
              Dane transakcyjne Q4 2025 / Q1 2026. Kwota pożyczki = 55% wartości
              nieruchomości (LTV).
            </p>
          </div>

          {/* Price summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e5e7eb]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2299AA] mb-1">
                Rynek wtórny
              </p>
              <p className="text-4xl font-extrabold text-[#1c435e]">
                {fmt(priceSecondary)}{" "}
                <span className="text-lg font-normal text-[#6b7280]">zł/m²</span>
              </p>
              <p className="text-sm text-[#6b7280] mt-1">
                Transakcyjna cena średnia – {name}
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-[#e5e7eb]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#2299AA] mb-1">
                Rynek pierwotny
              </p>
              <p className="text-4xl font-extrabold text-[#1c435e]">
                {fmt(pricePrimary)}{" "}
                <span className="text-lg font-normal text-[#6b7280]">zł/m²</span>
              </p>
              <p className="text-sm text-[#6b7280] mt-1">
                Nowe budownictwo – {name}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#e5e7eb]">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1c435e] text-white">
                    <th className="px-4 py-3 text-left font-semibold">Powierzchnia</th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Wartość szacunkowa (rynek wtórny)
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Maks. kwota pożyczki (LTV 55%)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((m2, i) => {
                    const val = priceSecondary * m2;
                    const loan = maxLoan(val);
                    return (
                      <tr
                        key={m2}
                        className={i % 2 === 0 ? "bg-white" : "bg-[#f8fafb]"}
                      >
                        <td className="px-4 py-3 font-medium text-[#111827]">{m2} m²</td>
                        <td className="px-4 py-3 text-right text-[#374151]">
                          {fmt(val)} zł
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-[#2299AA]">
                          do {fmt(loan)} zł
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="px-4 py-3 text-xs text-[#9ca3af] border-t border-[#e5e7eb]">
              * Wartości szacunkowe na podstawie danych transakcyjnych z rejestru NBP
              (Q4&nbsp;2025 / Q1&nbsp;2026). Rzeczywista wycena nieruchomości może się
              różnić. Pożyczka podlega indywidualnej ocenie.
            </p>
          </div>

          {/* Two natural content paragraphs */}
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb]">
              <h3 className="font-bold text-[#1c435e] text-base mb-3">
                Co wysokie ceny nieruchomości w {locative} oznaczają dla Ciebie?
              </h3>
              <p className="text-[#555] text-sm leading-relaxed">
                Rynek nieruchomości w {locative} należy do
                {priceSecondary >= 12000
                  ? " najdroższych w Polsce"
                  : priceSecondary >= 9000
                  ? " stabilnych rynków regionalnych"
                  : " dynamicznie rozwijających się ośrodków"}
                . Wysoka wartość transakcyjna nieruchomości działa na Twoją korzyść — im
                więcej warta jest nieruchomość, tym wyższą kwotę możesz uzyskać pod jej
                zastaw. Przy LTV na poziomie 55% nawet standardowe mieszkanie w {locative}{" "}
                pozwala pozyskać kilkaset tysięcy złotych bez konieczności sprzedaży
                nieruchomości czy rezygnacji z zamieszkania w niej.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#e5e7eb]">
              <h3 className="font-bold text-[#1c435e] text-base mb-3">
                Kto najczęściej korzysta z naszej oferty w {locative}?
              </h3>
              <p className="text-[#555] text-sm leading-relaxed">
                Do naszych klientów z {genitive} należą przede wszystkim: właściciele
                firm potrzebujący szybkiego zastrzyku płynności, osoby z zajęciami
                komorniczymi lub negatywną historią BIK, które nie mogą liczyć na pomoc
                banku, oraz właściciele nieruchomości chcący sfinansować remont,
                inwestycję lub spłatę odziedziczonych zobowiązań. Łączy ich jedno —
                posiadają nieruchomość w {locative} i potrzebują gotówki szybciej, niż
                jest w stanie ją zapewnić tradycyjny kredyt bankowy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Dzielnice ────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              Zasięg obsługi
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Obsługujemy wszystkie dzielnice {genitive}
            </h2>
            <p className="text-[#6b7280] mt-2 text-sm">
              Bez względu na dzielnicę – jesteśmy do Twojej dyspozycji
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {districts.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f0fafb] border border-[#d4eef2] text-[#1c435e] text-sm font-medium"
              >
                <svg className="w-3.5 h-3.5 text-[#2299AA]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {d}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-[#6b7280] mt-6">
            Obsługujemy również gminy ościenne i powiaty wokół {genitive}.{" "}
            <a href="#formularz" className="text-[#2299AA] hover:underline">
              Zapytaj o swoją lokalizację →
            </a>
          </p>
        </div>
      </section>

      {/* ── 4. Jak to działa ─────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#1c435e]">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 text-[#7de8f5]">
              Proces
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Jak uzyskać pożyczkę pod zastaw w {locative}?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Złóż wniosek",
                text: "Wypełnij formularz online lub zadzwoń. Podaj adres nieruchomości i potrzebną kwotę.",
              },
              {
                step: "02",
                title: "Wycena i decyzja",
                text: "Bezpłatna wycena nieruchomości i decyzja kredytowa – zazwyczaj w ciągu 24 godzin.",
              },
              {
                step: "03",
                title: "Umowa u notariusza",
                text: "Podpisanie umowy pożyczki i wpis hipoteki w KW – u notariusza w Twoim mieście.",
              },
              {
                step: "04",
                title: "Wypłata środków",
                text: "Pieniądze trafiają na Twoje konto w dniu podpisania aktu notarialnego.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#2299AA] flex items-center justify-center text-white font-bold text-lg shrink-0">
                  {s.step}
                </div>
                <h3 className="font-bold text-white text-base">{s.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Opinie klientów ───────────────────────────────────── */}
      <GoogleReviews />

      {/* ── 6. Narzędzia ─────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#f0fafb]">
        <div className="max-w-[1080px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Narzędzia dla mieszkańców {genitive}
            </h2>
            <p className="text-[#6b7280] mt-2 text-sm">
              Sprawdź warunki przed kontaktem z doradcą
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                href: "/narzedzia/ile-moge-pozyczyc",
                icon: "🏠",
                title: "Ile mogę pożyczyć?",
                text: "Wpisz wartość nieruchomości i oblicz maksymalną kwotę pożyczki.",
              },
              {
                href: "/narzedzia/kalkulator-raty",
                icon: "🧮",
                title: "Kalkulator raty",
                text: "Sprawdź wysokość miesięcznej raty przy różnych kwotach i okresach spłaty.",
              },
              {
                href: "/narzedzia/diagnostyka",
                icon: "📋",
                title: "Diagnostyka zdolności",
                text: "Oceń szanse na uzyskanie pożyczki na podstawie swojej sytuacji.",
              },
            ].map((t) => (
              <a
                key={t.href}
                href={t.href}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#d4eef2] flex flex-col gap-3 hover:shadow-md hover:border-[#2299AA] transition-all duration-200 group"
              >
                <span className="text-3xl">{t.icon}</span>
                <h3 className="font-bold text-[#111827] group-hover:text-[#2299AA] transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">{t.text}</p>
                <span className="text-[#2299AA] text-sm font-semibold mt-auto">
                  Sprawdź →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="max-w-[780px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              FAQ
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Często zadawane pytania – pożyczki pod zastaw w {locative}
            </h2>
          </div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* ── 8. CTA ───────────────────────────────────────────────── */}
      <section className="py-14 md:py-20 bg-[#0f2a3d]">
        <div className="max-w-[780px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Potrzebujesz pożyczki pod zastaw w {locative}?
          </h2>
          <p className="text-white/70 mb-8">
            Skontaktuj się z nami – doradca oddzwoni w ciągu 15 minut.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formularz" className="btn-cta-shine !px-10 !py-4">
              Złóż wniosek online
            </a>
            <a
              href="tel:577873616"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-[#1c435e] transition-all duration-300"
            >
              Zadzwoń: 577 873 616
            </a>
          </div>
        </div>
      </section>

      {/* ── 9. Formularz kontaktowy ──────────────────────────────── */}
      <ContactForm />
    </>
  );
}
