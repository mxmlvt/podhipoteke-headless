import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import RateCalculator from "@/components/tools/RateCalculator";

export const metadata: Metadata = {
  title: "Kalkulator raty pożyczki pod zastaw nieruchomości | PODHIPOTEKE24.PL",
  description:
    "Oblicz miesięczną ratę pożyczki hipotecznej online. Podaj kwotę, okres i oprocentowanie – wynik natychmiast. Pobierz bezpłatny harmonogram spłat w PDF.",
};

const faqItems = [
  {
    q: "Jak obliczyć ratę pożyczki hipotecznej?",
    a: "Rata równa (annuitetowa) obliczana jest ze wzoru: rata = K × (r × (1+r)^n) / ((1+r)^n – 1), gdzie K to kwota pożyczki, r to oprocentowanie miesięczne, a n to liczba rat. Dla rat malejących, część kapitałowa jest stała (K/n), a odsetkowa maleje z każdym miesiącem.",
  },
  {
    q: "Czym różnią się raty równe od malejących?",
    a: "Raty równe (annuitetowe) mają stałą wysokość przez cały okres – wygodne dla budżetu. Raty malejące zaczynają się wyżej, ale sumaryczny koszt odsetek jest niższy. Przy raty malejącej szybciej spłacamy kapitał.",
  },
  {
    q: "Co to jest RRSO i jak wpływa na koszt pożyczki?",
    a: "RRSO (Rzeczywista Roczna Stopa Oprocentowania) uwzględnia wszystkie koszty pożyczki – odsetki, prowizję i inne opłaty. Im wyższe RRSO, tym wyższy rzeczywisty koszt. Nasz kalkulator podaje oprocentowanie nominalne; pełne RRSO zależy od indywidualnych warunków umowy.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Kalkulator raty pożyczki hipotecznej",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: "https://podhipoteke24.pl/narzedzia/kalkulator-raty",
      description: "Bezpłatny kalkulator raty pożyczki pod zastaw nieruchomości.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function KalkulatorRatyPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs */}
      <nav className="bg-[#f0fafb] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <ol className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-wrap">
            <li><Link href="/" className="hover:text-[#1c435e]">Strona główna</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
            <li><Link href="/narzedzia" className="hover:text-[#1c435e]">Narzędzia</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
            <li className="text-[#374151]">Kalkulator raty</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-10 md:py-14 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Kalkulator online
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            Kalkulator raty pożyczki pod zastaw nieruchomości
          </h1>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            Oblicz szacowaną ratę miesięczną w kilka sekund. Pobierz pełny harmonogram w PDF.
          </p>
        </div>
      </section>

      {/* Kalkulator */}
      <section className="py-12 md:py-16 section-mint">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <RateCalculator />
        </div>
      </section>

      {/* Treść SEO */}
      <section className="py-14 bg-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 prose prose-slate max-w-none">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
            Jak obliczyć ratę pożyczki pod zastaw nieruchomości?
          </h2>

          <p className="text-[#374151] leading-relaxed mb-4">
            Wysokość raty pożyczki hipotecznej zależy od trzech kluczowych parametrów: <strong>kwoty pożyczki</strong>, <strong>okresu spłaty</strong> oraz <strong>oprocentowania rocznego</strong>. Nasz kalkulator uwzględnia dwa typy rat – równe (annuitetowe) i malejące – co pozwala porównać oba scenariusze przed podjęciem decyzji.
          </p>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Raty równe (annuitetowe)</h3>
          <p className="text-[#374151] leading-relaxed mb-4">
            Rata annuitetowa jest stała przez cały okres kredytowania. Oznacza to, że co miesiąc płacisz tę samą kwotę – wygodne rozwiązanie dla planowania budżetu domowego lub firmowego. W pierwszych miesiącach większą część raty stanowią odsetki, stopniowo rośnie udział kapitału.
          </p>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Raty malejące</h3>
          <p className="text-[#374151] leading-relaxed mb-4">
            Przy ratach malejących część kapitałowa jest stała (kwota pożyczki ÷ liczba rat), natomiast odsetkowa maleje z każdym miesiącem, ponieważ zmniejsza się saldo zadłużenia. Pierwsza rata jest najwyższa – dlatego wymagana jest nieco wyższa zdolność finansowa na starcie. Sumaryczny koszt odsetek jest jednak niższy niż przy ratach równych.
          </p>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Co wpływa na wysokość raty?</h3>
          <ul className="text-[#374151] space-y-2 mb-4 list-disc list-inside">
            <li><strong>Kwota pożyczki</strong> – im wyższa, tym wyższa rata</li>
            <li><strong>Okres spłaty</strong> – dłuższy okres to niższa rata miesięczna, ale wyższy łączny koszt odsetek</li>
            <li><strong>Oprocentowanie nominalne</strong> – bezpośrednio wpływa na koszt pożyczki</li>
            <li><strong>Typ rat</strong> – malejące dają niższy łączny koszt, równe – stałość obciążenia</li>
          </ul>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Czym jest RRSO?</h3>
          <p className="text-[#374151] leading-relaxed mb-4">
            RRSO (Rzeczywista Roczna Stopa Oprocentowania) to miara całkowitego kosztu pożyczki wyrażona w procentach na rok. Uwzględnia nie tylko odsetki, ale też prowizję, opłaty administracyjne i inne koszty towarzyszące. Im niższe RRSO, tym tańsza pożyczka. Nasz kalkulator podaje uproszczone RRSO równe oprocentowaniu nominalnemu – dokładna wartość zależy od warunków konkretnej umowy.
          </p>

          <p className="text-[#374151] leading-relaxed">
            Chcesz poznać dokładne warunki pożyczki dopasowane do Twojej sytuacji?{" "}
            <Link href="/narzedzia/ile-moge-pozyczyc" className="text-[#2299AA] underline">
              Sprawdź ile możesz pożyczyć
            </Link>{" "}
            lub{" "}
            <Link href="/narzedzia/diagnostyka" className="text-[#2299AA] underline">
              wykonaj diagnostykę finansową
            </Link>
            .
          </p>

          {/* FAQ */}
          <h3 className="text-lg font-bold text-[#111827] mt-8 mb-4">Najczęstsze pytania</h3>
          <div className="space-y-4">
            {faqItems.map((item) => (
              <div key={item.q} className="border border-[#e5e7eb] rounded-xl p-4">
                <p className="font-semibold text-[#111827] mb-2">{item.q}</p>
                <p className="text-[#6b7280] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Chcesz poznać dokładne warunki?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Kalkulator to tylko punkt wyjścia. Nasz doradca dobierze ofertę do Twojej sytuacji.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
            >
              Skontaktuj się z doradcą
            </Link>
            <Link
              href="/narzedzia/diagnostyka"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Wykonaj diagnostykę
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
