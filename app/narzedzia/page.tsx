import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ToolCTACard from "@/components/shared/ToolCTACard";
import { Calculator, Home, ArrowLeftRight, ClipboardCheck, PiggyBank } from "lucide-react";

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
    variant: "default" as const,
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
    variant: "default" as const,
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

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCTACard key={tool.href} {...tool} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
