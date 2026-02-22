import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Clock, Star } from "lucide-react";
import dynamic from "next/dynamic";

const DiagnosticQuiz = dynamic(() => import("@/components/tools/DiagnosticQuiz"), { ssr: false });

export const metadata: Metadata = {
  title: "Diagnostyka finansowa – sprawdź kwalifikację | PODHIPOTEKE24.PL",
  description:
    "Odpowiedz na 7 pytań i dowiedz się, czy kwalifikujesz się na pożyczkę pod zastaw nieruchomości. Wynik natychmiastowy. Bez BIK. Bezpłatny raport PDF.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Diagnostyka finansowa – kwalifikacja do pożyczki hipotecznej",
  url: "https://podhipoteke24.pl/narzedzia/diagnostyka",
  applicationCategory: "FinanceApplication",
  description:
    "Bezpłatne narzędzie online – sprawdź, czy kwalifikujesz się na pożyczkę pod zastaw nieruchomości. 7 pytań, wynik natychmiastowy, raport PDF.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "PLN" },
};

export default function DiagnostykaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Breadcrumbs */}
        <nav className="bg-[#f0fafb] border-b border-[#e5e7eb] py-3">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <ol className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-wrap">
              <li><Link href="/" className="hover:text-[#1c435e]">Strona główna</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
              <li><Link href="/narzedzia" className="hover:text-[#1c435e]">Narzędzia</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
              <li className="text-[#374151]">Diagnostyka finansowa</li>
            </ol>
          </div>
        </nav>

        {/* Hero */}
        <section className="py-10 md:py-14 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              Darmowe narzędzie
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
              Diagnostyka finansowa
            </h1>
            <p className="text-[#6b7280] text-lg max-w-xl mx-auto mb-6">
              Odpowiedz na 7 pytań i dowiedz się, czy kwalifikujesz się na pożyczkę pod zastaw nieruchomości. Wynik natychmiast, bez podawania danych osobowych.
            </p>
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#6b7280]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#2299AA]" />
                ~2 minuty
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2299AA]" />
                Bez BIK
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#2299AA]" />
                Bezpłatny raport PDF
              </span>
            </div>
          </div>
        </section>

        {/* Quiz */}
        <section className="py-12 md:py-16 section-mint">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <DiagnosticQuiz />
          </div>
        </section>

        {/* SEO content */}
        <section className="py-14 bg-white">
          <div className="max-w-[800px] mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
              Jak działa diagnostyka finansowa?
            </h2>

            <p className="text-[#374151] leading-relaxed mb-4">
              Diagnostyka finansowa to bezpłatne narzędzie online, które w kilka minut pozwala ocenić, czy Twoja sytuacja kwalifikuje się do uzyskania pożyczki pod zastaw nieruchomości. Nie weryfikujemy historii kredytowej w BIK – jedynym kryterium jest wartość nieruchomości stanowiącej zabezpieczenie.
            </p>

            <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">
              Co oceniamy podczas diagnostyki?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { title: "Posiadanie nieruchomości", desc: "Sprawdzamy, czy masz nieruchomość jako zabezpieczenie pożyczki." },
                { title: "Typ i wartość nieruchomości", desc: "Różne typy nieruchomości mają różne wskaźniki LTV wpływające na dostępną kwotę." },
                { title: "Historia kredytowa", desc: "BIK, KRD, BIG – negatywna historia nie wyklucza, ale wpływa na dobór produktu." },
                { title: "Zajęcia komornicze", desc: "Egzekucja komornicza jest możliwa do obsługi, jednak wymaga indywidualnej analizy." },
              ].map(({ title, desc }) => (
                <div key={title} className="p-4 bg-[#f0fafb] rounded-xl border border-[#e6f7f9]">
                  <p className="font-semibold text-[#1c435e] mb-1 text-sm">{title}</p>
                  <p className="text-[#6b7280] text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-[#111827] mt-6 mb-3">
              Trzy możliwe wyniki diagnostyki
            </h3>
            <div className="space-y-3 mb-6">
              {[
                { label: "Kwalifikujesz się", color: "bg-green-500", desc: "Twoja sytuacja spełnia wszystkie podstawowe kryteria. Możemy przygotować ofertę i udzielić pożyczki." },
                { label: "Wymaga analizy", color: "bg-amber-500", desc: "Wstępna ocena jest pozytywna, jednak Twoja sytuacja wymaga dokładniejszego przeglądu przez doradcę." },
                { label: "Brak kwalifikacji", color: "bg-red-400", desc: "Twoja sytuacja nie spełnia minimalnych kryteriów. Skontaktuj się z nami – być może mamy alternatywne rozwiązanie." },
              ].map(({ label, color, desc }) => (
                <div key={label} className="flex items-start gap-3 p-4 bg-[#f9fafb] rounded-xl border border-[#f3f4f6]">
                  <div className={`w-3 h-3 rounded-full ${color} flex-shrink-0 mt-1`} />
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">{label}</p>
                    <p className="text-[#6b7280] text-sm mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/narzedzia/ile-moge-pozyczyc"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1c435e] text-white font-semibold hover:bg-[#254d6b] transition-colors text-sm"
              >
                Sprawdź ile możesz pożyczyć →
              </Link>
              <Link
                href="/narzedzia/kalkulator-raty"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-[#1c435e] text-[#1c435e] font-semibold hover:bg-[#1c435e] hover:text-white transition-colors text-sm"
              >
                Kalkulator raty miesięcznej →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-dark py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Wolisz porozmawiać z doradcą?
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
              Bezpłatna konsultacja bez zobowiązań. Oddzwonimy w ciągu 24 godzin.
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
    </>
  );
}
