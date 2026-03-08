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

// Slugi stron ofertowych – przekieruj na /oferta/[slug]
const OFFER_SLUGS = [
  "kredyt-hipoteczny",
  "kredyt-pod-zastaw-nieruchomosci",
  "kredyt-pod-zastaw-dzialki",
  "kredyt-pod-zastaw-mieszkania",
  "pozyczka-pod-zastaw-mieszkania",
  "pozyczki-pod-zastaw-nieruchomosci",
  "pozyczki-pod-zastaw-domu",
  "pozyczki-pod-zastaw-dzialki",
  "pozyczki-pod-zastaw-gruntow-rolnych",
  "pozyczki-hipoteczne-dla-firm",
  "pozyczki-oddluzeniowe-2",
];

// Sprawdź czy URL dotyczy naszej domeny
function isInternalDomain(href: string): boolean {
  return (
    href.includes("podhipoteke24.pl") ||
    href.includes("podhipoteke24.") ||
    href.includes("srv106163.seohost.com.pl")
  );
}

// Parser options: transform WP links to Next.js internal links
const parserOptions = {
  replace: (domNode: DOMNode) => {
    const el = domNode as Element;
    if (el.type === "tag" && el.name === "a") {
      const href = el.attribs?.href || "";

      if (isInternalDomain(href)) {
        try {
          // Obsługa: https://, http://, //domain
          const normalized = href.startsWith("//") ? "https:" + href : href;
          const url = new URL(normalized);
          let path = url.pathname.replace(/\/$/, "") || "/";

          // Slug ofertowy? → /oferta/[slug]
          const slug = path.replace(/^\//, "");
          if (OFFER_SLUGS.includes(slug)) {
            path = "/oferta/" + slug;
          }

          return (
            <Link href={path} className="text-[#00cc9b] hover:text-[#00a882] underline">
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
    .replace(/\b2023\b/g, "2026")
    .replace(/\b2024\b/g, "2026")
    .replace(/\b2025\b/g, "2026")
    .trim();
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Find H2 containing "FAQ" or "najczęści" and extract H3+P pairs from that section. */
export function extractFaqItems(html: string): FaqItem[] {
  const faqH2 = html.match(/<h2[^>]*>[^<]*(faq|najczęści|często\s+zadawane)[^<]*<\/h2>/i);
  if (!faqH2) return [];

  const faqStart = html.indexOf(faqH2[0]) + faqH2[0].length;
  const faqSection = html.slice(faqStart);

  // Stop at next H2 (end of FAQ section)
  const nextH2 = faqSection.search(/<h2[^>]*>/i);
  const faqBody = nextH2 === -1 ? faqSection : faqSection.slice(0, nextH2);

  const items: FaqItem[] = [];
  const pairRegex = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = pairRegex.exec(faqBody)) !== null) {
    const question = match[1].replace(/<[^>]*>/g, "").trim();
    const answer = match[2].replace(/<[^>]*>/g, "").trim();
    if (question && answer) items.push({ question, answer });
  }
  return items;
}

/** Remove the FAQ section (from its H2 to next H2 or end) from HTML. */
export function stripFaqSection(html: string): string {
  const faqH2 = html.match(/<h2[^>]*>[^<]*(faq|najczęści|często\s+zadawane)[^<]*<\/h2>/i);
  if (!faqH2) return html;

  const faqStart = html.indexOf(faqH2[0]);
  const after = html.slice(faqStart + faqH2[0].length);
  const nextH2Offset = after.search(/<h2[^>]*>/i);

  if (nextH2Offset === -1) {
    return html.slice(0, faqStart);
  }
  return html.slice(0, faqStart) + after.slice(nextH2Offset);
}

export function parseWPContent(html: string, slug: string) {
  if (!html) return null;

  const cleaned = cleanContent(html);
  const readTime = estimateReadTime(cleaned);
  const faqItems = extractFaqItems(cleaned);
  const withoutFaq = faqItems.length > 0 ? stripFaqSection(cleaned) : cleaned;

  const parts = withoutFaq.split(/(?=<h[23][^>]*>)/);
  const midpoint = Math.max(1, Math.floor(parts.length / 2));
  const cta = getToolCTAForSlug(slug);

  const firstHalf = parts.slice(0, midpoint).join("");
  const secondHalf = parts.slice(midpoint).join("");

  return {
    firstHalf: parse(firstHalf, parserOptions),
    cta,
    secondHalf: parse(secondHalf, parserOptions),
    faqItems,
    readTime,
  };
}


export function parseContent(html: string) {
  const cleaned = cleanContent(html);
  return parse(cleaned, parserOptions);
}
export function getTableOfContents(html: string): { id: string; text: string }[] {
  const matches = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)];
  return matches.map((match, i) => ({
    id: "heading-" + i,
    text: match[1].replace(/<[^>]*>/g, ""),
  }));
}
