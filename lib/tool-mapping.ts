import { Calculator, Home, ClipboardCheck, PiggyBank, ArrowLeftRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ToolInfo {
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const ALL_TOOLS: ToolInfo[] = [
  {
    slug: "kalkulator-raty",
    title: "Kalkulator raty",
    description: "Oblicz miesięczną ratę pożyczki hipotecznej.",
    href: "/narzedzia/kalkulator-raty",
    icon: Calculator,
  },
  {
    slug: "ile-moge-pozyczyc",
    title: "Ile mogę pożyczyć?",
    description: "Sprawdź maksymalną kwotę na podstawie wartości nieruchomości.",
    href: "/narzedzia/ile-moge-pozyczyc",
    icon: Home,
  },
  {
    slug: "diagnostyka",
    title: "Diagnostyka finansowa",
    description: "Sprawdź czy kwalifikujesz się na pożyczkę pod hipotekę.",
    href: "/narzedzia/diagnostyka",
    icon: ClipboardCheck,
  },
  {
    slug: "kalkulator-konsolidacji",
    title: "Kalkulator konsolidacji",
    description: "Oblicz ile zaoszczędzisz konsolidując zobowiązania.",
    href: "/narzedzia/kalkulator-konsolidacji",
    icon: PiggyBank,
  },
  {
    slug: "porownywarka",
    title: "Porównywarka kredytów",
    description: "Porównaj oferty pożyczek i wybierz najlepszą.",
    href: "/narzedzia/porownywarka",
    icon: ArrowLeftRight,
  },
];

export function getToolsForPage(slug: string): ToolInfo[] {
  let slugs: string[];

  if (slug.includes("oddluzeniow")) {
    slugs = ["diagnostyka", "kalkulator-konsolidacji", "kalkulator-raty"];
  } else if (slug.includes("dla-firm") || slug.includes("hipoteczne-dla")) {
    slugs = ["kalkulator-raty", "ile-moge-pozyczyc", "diagnostyka"];
  } else if (slug.includes("gruntow-rolnych")) {
    slugs = ["ile-moge-pozyczyc", "diagnostyka", "kalkulator-raty"];
  } else if (slug.includes("dzialki")) {
    slugs = ["kalkulator-raty", "ile-moge-pozyczyc", "diagnostyka"];
  } else {
    slugs = ["kalkulator-raty", "ile-moge-pozyczyc", "diagnostyka"];
  }

  return slugs
    .map((s) => ALL_TOOLS.find((t) => t.slug === s))
    .filter(Boolean) as ToolInfo[];
}

export function getCityFromSlug(slug: string): string | null {
  // Pattern: pozyczki-{city} or pozyczki-pod-hipoteke-{city}
  const cityPatterns = [
    /^pozyczki-(?:pod-hipoteke-|hipoteczne-|)([a-z]+(?:-[a-z]+)*)$/,
    /^pozyczka-hipoteczna-([a-z]+(?:-[a-z]+)*)$/,
  ];

  const cityMap: Record<string, string> = {
    warszawa: "Warszawa",
    krakow: "Kraków",
    wroclaw: "Wrocław",
    poznan: "Poznań",
    gdansk: "Gdańsk",
    lodz: "Łódź",
    katowice: "Katowice",
    bialystok: "Białystok",
    olsztyn: "Olsztyn",
    czestochowa: "Częstochowa",
    lublin: "Lublin",
    szczecin: "Szczecin",
    rzeszow: "Rzeszów",
    bydgoszcz: "Bydgoszcz",
    torun: "Toruń",
    gdynia: "Gdynia",
  };

  for (const pattern of cityPatterns) {
    const match = slug.match(pattern);
    if (match) {
      const citySlug = match[1];
      return cityMap[citySlug] || citySlug.charAt(0).toUpperCase() + citySlug.slice(1);
    }
  }

  return null;
}
