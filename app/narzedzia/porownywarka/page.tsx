import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LoanComparison from "@/components/tools/LoanComparison";

export const metadata: Metadata = {
  title: "Porównywarka pożyczek hipotecznych | PODHIPOTEKE24.PL",
  description:
    "Porównaj oferty pożyczek pod hipotekę: oprocentowanie, raty miesięczne, koszty całkowite i wymagania. Przejrzyste zestawienie – bez BIK, z BIK, bankowe i pozabankowe.",
};

export default function PorownywarkaPage() {
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
            <li className="text-[#374151]">Porównywarka</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-10 md:py-14 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Porównywarka
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            Porównaj oferty pożyczek hipotecznych
          </h1>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            Sprawdź raty, koszty i wymagania dla różnych typów pożyczek. Podaj kwotę i okres, wyniki zobaczysz natychmiast.
          </p>
        </div>
      </section>

      {/* Comparison tool */}
      <section className="py-12 md:py-16 section-mint">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <LoanComparison />
        </div>
      </section>

      {/* SEO */}
      <section className="py-14 bg-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
            Jak porównać pożyczki pod zastaw nieruchomości?
          </h2>

          <p className="text-[#374151] leading-relaxed mb-4">
            Wybierając pożyczkę pod hipotekę, warto porównać nie tylko oprocentowanie, ale też prowizję, dodatkowe opłaty i wymagania formalne. Narzędzie pokazuje łączny koszt pożyczki (RRSO) dla każdego produktu, co ułatwia realne porównanie ofert.
          </p>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Na co zwrócić uwagę?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Oprocentowanie nominalne", desc: "Podstawowy wskaźnik kosztu pieniądza. Sprawdź, czy stałe czy zmienne." },
              { title: "Prowizja jednorazowa", desc: "Koszt uruchomienia pożyczki. Może wynosić od 1% do nawet 5% kwoty." },
              { title: "Wymagania formalne", desc: "BIK, zaświadczenia o dochodach, typ nieruchomości – każdy produkt ma inne wymagania." },
              { title: "Koszt całkowity (RRSO)", desc: "Suma wszystkich kosztów przez cały okres spłaty. Najważniejszy wskaźnik do porównania." },
            ].map(({ title, desc }) => (
              <div key={title} className="p-4 bg-[#f0fafb] rounded-xl border border-[#e6f7f9]">
                <p className="font-semibold text-[#1c435e] mb-1 text-sm">{title}</p>
                <p className="text-[#6b7280] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/narzedzia/diagnostyka"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1c435e] text-white font-semibold hover:bg-[#254d6b] transition-colors text-sm"
            >
              Sprawdź czy się kwalifikujesz →
            </Link>
            <Link
              href="/narzedzia/kalkulator-raty"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold hover:bg-[#1c435e] hover:text-white transition-colors text-sm"
            >
              Kalkulator raty →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Chcesz poznać najlepszą ofertę dla siebie?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Doradca przygotuje spersonalizowane zestawienie – bez zobowiązań.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
          >
            Skontaktuj się z nami →
          </Link>
        </div>
      </section>
    </main>
  );
}
