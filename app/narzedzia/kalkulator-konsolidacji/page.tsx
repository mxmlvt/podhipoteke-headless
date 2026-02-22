import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ConsolidationCalculator from "@/components/tools/ConsolidationCalculator";

export const metadata: Metadata = {
  title: "Kalkulator konsolidacji zobowiązań | PODHIPOTEKE24.PL",
  description:
    "Oblicz ile zaoszczędzisz miesięcznie konsolidując kredyty gotówkowe, karty kredytowe i chwilówki w jedną pożyczkę hipoteczną. Kalkulator online – wynik natychmiast.",
};

export default function KalkulatorKonsolidacjiPage() {
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
            <li className="text-[#374151]">Kalkulator konsolidacji</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-10 md:py-14 bg-white border-b border-[#e5e7eb]">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Kalkulator konsolidacji
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            Ile zaoszczędzisz konsolidując zobowiązania?
          </h1>
          <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
            Wpisz swoje kredyty i sprawdź, o ile możesz obniżyć miesięczne raty dzięki pożyczce hipotecznej.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12 md:py-16 section-mint">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <ConsolidationCalculator />
        </div>
      </section>

      {/* SEO content */}
      <section className="py-14 bg-white">
        <div className="max-w-[800px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
            Konsolidacja zobowiązań pod zastaw nieruchomości
          </h2>

          <p className="text-[#374151] leading-relaxed mb-4">
            Konsolidacja to połączenie kilku zobowiązań (kredytów gotówkowych, kart kredytowych, chwilówek) w jedną pożyczkę hipoteczną z niższą ratą. Dzięki zabezpieczeniu na nieruchomości oprocentowanie jest znacznie niższe niż w przypadku kredytów niezabezpieczonych.
          </p>

          <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">Kiedy konsolidacja się opłaca?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {[
              { title: "Wysokie oprocentowanie", desc: "Karty kredytowe i chwilówki mają nawet 25–35% rocznie. Pożyczka hipoteczna – znacznie mniej." },
              { title: "Wiele rat do obsługi", desc: "Zamiana kilku rat w jedną upraszcza finanse i zmniejsza ryzyko opóźnień." },
              { title: "Ujemny bilans BIK", desc: "Udzielamy pożyczek bez weryfikacji historii kredytowej." },
              { title: "Pilna potrzeba gotówki", desc: "Konsolidacja uwalnia środki z obniżonej raty, które możesz przeznaczyć na inne cele." },
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
              Kalkulator raty pożyczki →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Chcesz dowiedzieć się więcej o konsolidacji?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Bezpłatna konsultacja z doradcą. Bez zobowiązań, bez BIK.
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
