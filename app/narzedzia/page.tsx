import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Calculator, Home, ArrowLeftRight, ClipboardCheck, PiggyBank } from "lucide-react";
import PageHero from "@/components/PageHero";
import ToolCTACard from "@/components/shared/ToolCTACard";

export const metadata: Metadata = {
  title: "Narzędzia finansowe – kalkulatory i diagnostyka | PODHIPOTEKE24.PL",
  description: "Bezpłatne narzędzia finansowe: kalkulator raty, estymator kwoty pożyczki, porównywarka kredytów, diagnostyka finansowa i kalkulator konsolidacji.",
};

const tools = [
  {
    icon: Calculator,
    title: "Kalkulator raty",
    description: "Oblicz miesięczną ratę pożyczki hipotecznej. Podaj kwotę, okres i oprocentowanie – wynik zobaczysz natychmiast.",
    href: "/narzedzia/kalkulator-raty",
    variant: "featured" as const,
  },
  {
    icon: Home,
    title: "Ile mogę pożyczyć?",
    description: "Sprawdź maksymalną kwotę pożyczki na podstawie wartości Twojej nieruchomości.",
    href: "/narzedzia/ile-moge-pozyczyc",
    variant: "featured" as const,
  },
  {
    icon: ArrowLeftRight,
    title: "Porównywarka kredytów",
    description: "Porównaj oferty pożyczek pod hipotekę i wybierz najlepszą dla siebie.",
    href: "/narzedzia/porownywarka",
    variant: "featured" as const,
  },
  {
    icon: ClipboardCheck,
    title: "Diagnostyka finansowa",
    description: "Odpowiedz na kilka pytań i dowiedz się czy kwalifikujesz się na pożyczkę. Wynik w 2 minuty.",
    href: "/narzedzia/diagnostyka",
    variant: "featured" as const,
  },
  {
    icon: PiggyBank,
    title: "Kalkulator konsolidacji",
    description: "Oblicz ile zaoszczędzisz miesięcznie konsolidując swoje zobowiązania w jedną pożyczkę.",
    href: "/narzedzia/kalkulator-konsolidacji",
    variant: "featured" as const,
  },
];

export default function NarzedziaPage() {
  return (
    <main>
      <PageHero
        heading="Bezpłatne narzędzia finansowe"
        text="Sprawdź sam zanim się z nami skontaktujesz. Nasze kalkulatory pomogą Ci podjąć świadomą decyzję."
        bgImage="/images/slide-1.jpg"
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
            <li className="text-[#374151]">Narzędzia</li>
          </ol>
        </div>
      </nav>

      <section className="py-16 md:py-24 section-mint">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              Narzędzia online
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
              Sprawdź warunki przed kontaktem
            </h2>
            <p className="text-[#6b7280] text-lg max-w-xl mx-auto">
              Bezpłatne kalkulatory i narzędzia, które pomogą Ci ocenić swoją sytuację finansową.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tools.slice(0, 3).map((tool) => (
              <ToolCTACard key={tool.href} {...tool} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[672px] mx-auto mt-6">
            {tools.slice(3).map((tool) => (
              <ToolCTACard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
