import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import StatsCounter from "@/components/StatsCounter";
import ContactForm from "@/components/ContactForm";
import WhyTrustUs from "@/components/WhyTrustUs";

const ADLER_POINTS = [
  {
    title: "Ponad 17 lat doświadczenia w finansowaniu pod hipotekę",
    text: "Działam w branży finansowej nieprzerwanie od 2007 roku. Przez lata przeanalizowałem setki przypadków związanych z pożyczkami pod zastaw nieruchomości, finansowaniem hipotecznym oraz konsolidacją zobowiązań.",
  },
  {
    title: "Specjalizacja w pożyczkach pod zastaw nieruchomości",
    text: 'Nie działam \u201eod wszystkiego\u201d. Specjalizuję się w finansowaniu zabezpieczonym hipoteką: pod zastaw domu, mieszkania, działki lub lokalu. Wiem, jakie rozwiązania są realne i bezpieczne.',
  },
  {
    title: "Indywidualna analiza każdej sprawy",
    text: "Każdy klient ma inną sytuację finansową. Nie stosuję gotowych schematów – analizuję wartość nieruchomości, strukturę zobowiązań i realny cel finansowania. Dopiero wtedy przedstawiam konkretną propozycję.",
  },
  {
    title: "Transparentność i jasne warunki",
    text: "W finansach najważniejsze jest zaufanie. Jasno omawiam warunki finansowania, koszty i zabezpieczenie hipoteczne. Bez ukrytych zapisów i niedomówień.",
  },
  {
    title: "Dyskrecja i bezpieczeństwo",
    text: "Sprawy finansowe często są wrażliwe. Zapewniam pełną poufność oraz profesjonalne podejście na każdym etapie współpracy.",
  },
  {
    title: "Realne rozwiązania, nie obietnice",
    text: 'Jeśli rozwiązanie jest możliwe \u2013 powiem wprost. Jeśli nie \u2013 również. Moim celem nie jest sprzedaż \u201eza wszelką cenę\u201d, lecz długofalowa reputacja i skuteczność.',
  },
  {
    title: "Bezpośredni kontakt",
    text: "Kontaktujesz się bezpośrednio ze mną – nie z call center. Masz jasną komunikację i konkretną odpowiedź.",
  },
];

export const metadata: Metadata = {
  title: "O nas – 20 lat doświadczenia na rynku pożyczek | PODHIPOTEKE24.PL",
  description:
    "Poznaj naszą firmę. 20 lat doświadczenia na rynku pożyczek pod hipotekę. Ponad 1000 udzielonych pożyczek. Działamy dyskretnie i ekspresowo.",
};

export default function ONasPage() {
  return (
    <main>
      <PageHero
        heading="O nas"
        text="Jesteśmy firmą, która spełnia oczekiwania swoich klientów. Działamy szybko, rzetelnie i dyskretnie od ponad 20 lat."
        bgImage="/images/combining-experience.jpg"
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
            <li className="text-[#374151]">O nas</li>
          </ol>
        </div>
      </nav>

      <StatsCounter />

      {/* Piotr Adler – personalizacja */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              Poznaj eksperta
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827]">
              Dlaczego warto mi zaufać?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Zdjęcie + dane */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-52 h-52 rounded-full overflow-hidden shadow-lg mb-5 border-4 border-[#e6f7f9]">
                <Image
                  src="/images/piotr-adler.png"
                  alt="Piotr Adler – Ekspert ds. finansowania pod zastaw nieruchomości"
                  fill
                  className="object-cover"
                  sizes="208px"
                />
              </div>
              <h3 className="text-xl font-bold text-[#111827]">Piotr Adler</h3>
              <p className="text-[#2299AA] font-medium text-sm mt-1">
                Ekspert ds. finansowania pod zastaw nieruchomości
              </p>
              <a
                href="tel:577873616"
                className="mt-5 inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#2299AA] text-white font-semibold text-sm hover:bg-[#2bb5c7] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Zadzwoń do mnie
              </a>
            </div>

            {/* 7 punktów */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADLER_POINTS.map((point, i) => (
                <div
                  key={i}
                  className="flex gap-4 p-5 rounded-2xl bg-[#f9fafb] border border-[#f3f4f6] hover:border-[#2299AA]/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2299AA] text-white flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#111827] mb-1 text-sm leading-snug">
                      {point.title}
                    </h4>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{point.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 space-y-20">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                Od 2003 roku
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Jesteśmy na rynku od 2003 roku
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                Nasza firma na rynku działa już ponad 20 lat. Od samego początku kierujemy się wartościami, które pozwoliły nam zaistnieć w branży, której dziś jesteśmy liderem. Naszą misją jest bezkompromisowa pomoc w spełnianiu celów finansowych naszych klientów.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/mbr-about-1.jpg"
                alt="20 lat na rynku"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md order-2 lg:order-1">
              <Image
                src="/images/mbr-about-2.jpg"
                alt="Ogromne doświadczenie"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
                Doświadczenie
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-6">
                Posiadamy ogromne doświadczenie
              </h2>
              <p className="text-[#374151] text-lg leading-relaxed">
                Od 2003 roku udzieliliśmy ponad 1000 pożyczek. Przez ponad 20 lat zdobywaliśmy doświadczenie, dzięki któremu dziś możemy skutecznie pomagać każdemu klientowi – niezależnie od sytuacji finansowej czy historii kredytowej.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WhyTrustUs />

      <section className="section-dark py-12 md:py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Chcesz z nami współpracować?
          </h2>
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            Skontaktuj się z nami i dowiedz się jak możemy Ci pomóc.
          </p>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
          >
            Skontaktuj się
          </Link>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
