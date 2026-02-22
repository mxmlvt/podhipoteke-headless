import parse, { domToReact } from "html-react-parser";
import type { DOMNode, Element } from "html-react-parser";
import Link from "next/link";
import CTABox from "@/components/shared/CTABox";

const TOOL_CTA_MAP: Record<
  string,
  { heading: string; text: string; href: string; primaryLabel: string }
> = {
  "kredyt-pod-zastaw-mieszkania-kalkulator": {
    heading: "Oblicz swoją ratę",
    text: "Skorzystaj z naszego kalkulatora i sprawdź ile będziesz płacić miesięcznie.",
    href: "/narzedzia/kalkulator-raty",
    primaryLabel: "Otwórz kalkulator",
  },
  bik: {
    heading: "Sprawdź czy się kwalifikujesz",
    text: "Odpowiedz na kilka pytań i dowiedz się czy możesz uzyskać pożyczkę bez BIK.",
    href: "/narzedzia/diagnostyka",
    primaryLabel: "Zrób diagnostykę",
  },
  konsolidac: {
    heading: "Ile zaoszczędzisz na konsolidacji?",
    text: "Wpisz swoje zobowiązania i oblicz ile możesz zaoszczędzić miesięcznie.",
    href: "/narzedzia/kalkulator-konsolidacji",
    primaryLabel: "Oblicz oszczędności",
  },
  kwota: {
    heading: "Ile możesz pożyczyć?",
    text: "Podaj wartość nieruchomości i sprawdź dostępną kwotę pożyczki.",
    href: "/narzedzia/ile-moge-pozyczyc",
    primaryLabel: "Sprawdź kwotę",
  },
  default: {
    heading: "Potrzebujesz pożyczki pod hipotekę?",
    text: "Sprawdź czy kwalifikujesz się na pożyczkę pod zastaw nieruchomości.",
    href: "/narzedzia/diagnostyka",
    primaryLabel: "Sprawdź kwalifikację",
  },
};

export function getToolCTAForSlug(slug: string) {
  for (const [key, cta] of Object.entries(TOOL_CTA_MAP)) {
    if (key !== "default" && slug.includes(key)) return cta;
  }
  return TOOL_CTA_MAP["default"];
}

// Parser options: transform WP links to Next.js internal links
const parserOptions = {
  replace: (domNode: DOMNode) => {
    const el = domNode as Element;
    if (el.type === "tag" && el.name === "a") {
      const href = el.attribs?.href || "";
      if (href.includes("podhipoteke24.pl")) {
        try {
          const url = new URL(href);
          const cleanPath = url.pathname.replace(/\/$/, "") || "/";
          return (
            <Link href={cleanPath} className="text-[#2299AA] hover:text-[#2bb5c7] underline">
              {domToReact(el.children as DOMNode[])}
            </Link>
          );
        } catch {
          return undefined;
        }
      }
    }
    return undefined;
  },
};

export function cleanContent(html: string): string {
  if (!html) return "";
  return html
    .replace(/\[et_pb_[^\]]*\]/g, "")
    .replace(/\[\/et_pb_[^\]]*\]/g, "")
    .replace(/\[\/?[a-zA-Z_]+[^\]]*\]/g, "")
    .replace(/<div[^>]*class="[^"]*et_pb[^"]*"[^>]*>\s*<\/div>/gi, "")
    .trim();
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function parseWPContent(html: string, slug: string) {
  if (!html) return null;

  const cleaned = cleanContent(html);
  const readTime = estimateReadTime(cleaned);

  // Split on h2/h3 boundaries to find midpoint
  const parts = cleaned.split(/(?=<h[23][^>]*>)/);
  const midpoint = Math.max(1, Math.floor(parts.length / 2));
  const cta = getToolCTAForSlug(slug);

  const firstHalf = parts.slice(0, midpoint).join("");
  const secondHalf = parts.slice(midpoint).join("");

  return {
    firstHalf: parse(firstHalf, parserOptions),
    cta,
    secondHalf: parse(secondHalf, parserOptions),
    readTime,
  };
}

export function getTableOfContents(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
  return matches.map((match, i) => ({
    id: `heading-${i}`,
    text: match[1].replace(/<[^>]*>/g, ""),
  }));
}
