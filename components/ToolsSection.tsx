import { Calculator, Home, ArrowLeftRight, ClipboardCheck, PiggyBank } from "lucide-react";
import ToolCTACard from "@/components/shared/ToolCTACard";

const tools = [
  {
    icon: Calculator,
    title: "Kalkulator raty",
    description: "Oblicz miesięczną ratę pożyczki. Podaj kwotę, okres i oprocentowanie – wynik zobaczysz natychmiast.",
    href: "/narzedzia/kalkulator-raty",
    variant: "default" as const,
  },
  {
    icon: Home,
    title: "Ile mogę pożyczyć?",
    description: "Sprawdź maksymalną kwotę pożyczki na podstawie wartości Twojej nieruchomości.",
    href: "/narzedzia/ile-moge-pozyczyc",
    variant: "default" as const,
  },
  {
    icon: ArrowLeftRight,
    title: "Porównywarka kredytów",
    description: "Porównaj oferty pożyczek pod hipotekę i wybierz najlepszą dla siebie.",
    href: "/narzedzia/porownywarka",
    variant: "default" as const,
  },
  {
    icon: ClipboardCheck,
    title: "Diagnostyka finansowa",
    description: "Odpowiedz na 7 pytań i dowiedz się czy kwalifikujesz się na pożyczkę. Wynik w 2 minuty.",
    href: "/narzedzia/diagnostyka",
    variant: "featured" as const,
  },
  {
    icon: PiggyBank,
    title: "Kalkulator konsolidacji",
    description: "Oblicz ile zaoszczędzisz miesięcznie konsolidując swoje zobowiązania w jedną pożyczkę.",
    href: "/narzedzia/kalkulator-konsolidacji",
    variant: "default" as const,
  },
];

export default function ToolsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
            Narzędzia online
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
            Bezpłatne narzędzia finansowe
          </h2>
          <p className="text-[#6b7280] text-lg max-w-2xl mx-auto">
            Sprawdź sam zanim się z nami skontaktujesz. Nasze kalkulatory pomogą Ci podjąć świadomą decyzję.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.slice(0, 3).map((tool) => (
            <ToolCTACard key={tool.href} {...tool} />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:max-w-[66.666%] lg:mx-auto">
          {tools.slice(3).map((tool) => (
            <ToolCTACard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
