import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LoanEstimator from "@/components/tools/LoanEstimator";

export const metadata: Metadata = {
  title: "Ile mogę pożyczyć pod zastaw nieruchomości? | PODHIPOTEKE24.PL",
  description:
    "Sprawdź szacunkową kwotę pożyczki pod hipotekę na podstawie wartości i typu nieruchomości. Kalkulator LTV online – wynik natychmiast, bez podawania danych.",
};

export default function IleMogePozyczycPage() {
  return (
    <main>
      {/* Breadcrumbs */}
      <nav className="bg-[#f0fafb] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <ol className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-wrap">
            <li><Link href="/" className="hover:text-[#1c435e]">Strona główna</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
            <li><Link href="/narzedzia" className="hover:text-[#1c435e]">Narzędzia</Link></li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
            <li className="text-[#374151]">Ile mogę pożyczyć?</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-10 md:py-14 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Estymator kwoty
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            Ile mogę pożyczyć pod zastaw nieruchomości?
          </h1>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            Podaj wartość nieruchomości i sprawdź dostępną kwotę pożyczki. Wynik w kilka sekund.
          </p>
        </div>
      </section>

      {/* Estymator */}
      <section className="py-12 md:py-16 section-mint">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <LoanEstimator />
        </div>
      </section>

      {/* Treść SEO */}
      <section className="py-14 bg-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
            Ile mogę pożyczyć pod zastaw nieruchomości?
          </h2>

          <p className="text-[#374151] leading-relaxed mb-4">
            Kwota pożyczki pod zastaw nieruchomości zależy przede wszystkim od wartości nieruchomości stanowiącej zabezpieczenie oraz wskaźnika LTV (Loan to Value). W PODHIPOTEKE24 stosujemy wskaźnik LTV w przedziale od 15% do 55%, w zależności od typu nieruchomości.
          </p>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Co to jest wskaźnik LTV?</h3>
          <p className="text-[#374151] leading-relaxed mb-4">
            LTV (Loan to Value) określa, jaką część wartości nieruchomości stanowi kwota pożyczki. Przykład: przy nieruchomości wartej 500 000 zł i LTV 50% możesz pożyczyć do 250 000 zł. Im niższy wskaźnik LTV, tym mniejsze ryzyko dla pożyczkodawcy – co zazwyczaj przekłada się na korzystniejsze warunki.
          </p>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Wskaźniki LTV według typu nieruchomości</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { type: "Mieszkanie",       ltv: "35–55%" },
              { type: "Dom",             ltv: "30–50%" },
              { type: "Działka budowlana", ltv: "25–45%" },
              { type: "Grunt rolny",     ltv: "15–35%" },
              { type: "Lokal usługowy",  ltv: "30–50%" },
            ].map(({ type, ltv }) => (
              <div key={type} className="flex justify-between items-center p-4 bg-[#f0fafb] rounded-xl border border-[#e6f7f9]">
                <span className="font-medium text-[#374151]">{type}</span>
                <span className="font-bold text-[#2299AA]">{ltv}</span>
              </div>
            ))}
          </div>

          <p className="text-[#374151] leading-relaxed mb-4">
            Jeśli nieruchomość jest obciążona hipoteką, od jej wartości odejmujemy kwotę obciążenia przed wyliczeniem dostępnej kwoty pożyczki. Np. mieszkanie warte 600 000 zł z hipoteką 200 000 zł daje podstawę wyceny 400 000 zł, od której liczymy wskaźnik LTV.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/narzedzia/kalkulator-raty"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1c435e] text-white font-semibold hover:bg-[#254d6b] transition-colors text-sm"
            >
              Oblicz ratę miesięczną →
            </Link>
            <Link
              href="/narzedzia/diagnostyka"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold hover:bg-[#1c435e] hover:text-white transition-colors text-sm"
            >
              Sprawdź czy się kwalifikujesz →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Chcesz obliczyć ratę pożyczki?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Znając kwotę, sprawdź jak wysoka będzie Twoja miesięczna rata.
          </p>
          <Link
            href="/narzedzia/kalkulator-raty"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
          >
            Kalkulator raty →
          </Link>
        </div>
      </section>
    </main>
  );
}
