import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import client from "@/lib/apollo";
import { GET_PAGE_BY_SLUG } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

// Slugi stron ofertowych
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

// Szablony fallback dla stron bez treści WP
const OFFER_TEMPLATES: Record<string, { title: string; subtitle: string }> = {
  "kredyt-hipoteczny": {
    title: "Kredyt hipoteczny",
    subtitle: "Profesjonalne doradztwo i pomoc w uzyskaniu kredytu hipotecznego na najlepszych warunkach.",
  },
  "kredyt-pod-zastaw-nieruchomosci": {
    title: "Kredyt pod zastaw nieruchomości",
    subtitle: "Pożyczka zabezpieczona nieruchomością – szybka decyzja i wypłata środków.",
  },
  "kredyt-pod-zastaw-dzialki": {
    title: "Kredyt pod zastaw działki",
    subtitle: "Finansowanie pod zastaw gruntu – bez BIK, bez zbędnych formalności.",
  },
  "kredyt-pod-zastaw-mieszkania": {
    title: "Kredyt pod zastaw mieszkania",
    subtitle: "Pożyczka pod zastaw mieszkania z szybką decyzją i atrakcyjnym oprocentowaniem.",
  },
  "pozyczka-pod-zastaw-mieszkania": {
    title: "Pożyczka pod zastaw mieszkania",
    subtitle: "Ekspresowa pożyczka zabezpieczona mieszkaniem. Kwoty od 50 000 do 2 000 000 zł.",
  },
  "pozyczki-pod-zastaw-nieruchomosci": {
    title: "Pożyczki pod zastaw nieruchomości",
    subtitle: "Szybkie pożyczki hipoteczne bez BIK. Decyzja w 24 godziny. Kwoty od 50 000 do 2 000 000 zł.",
  },
  "pozyczki-pod-zastaw-domu": {
    title: "Pożyczki pod zastaw domu",
    subtitle: "Pożyczka zabezpieczona domem jednorodzinnym lub kamienicą – elastyczne warunki spłaty.",
  },
  "pozyczki-pod-zastaw-dzialki": {
    title: "Pożyczki pod zastaw działki",
    subtitle: "Finansowanie pod zastaw działki budowlanej lub rolnej – bez sprawdzania historii kredytowej.",
  },
  "pozyczki-pod-zastaw-gruntow-rolnych": {
    title: "Pożyczki pod zastaw gruntów rolnych",
    subtitle: "Pożyczki dla właścicieli gruntów rolnych. Szybka wycena i ekspresowa wypłata środków.",
  },
  "pozyczki-hipoteczne-dla-firm": {
    title: "Pożyczki hipoteczne dla firm",
    subtitle: "Finansowanie dla przedsiębiorstw posiadających nieruchomości. Kredyty dla firm pod zastaw.",
  },
  "pozyczki-oddluzeniowe-2": {
    title: "Pożyczki oddłużeniowe",
    subtitle: "Spłacimy komornika, hipoteki i inne zobowiązania finansowe. Kompleksowa pomoc oddłużeniowa.",
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return OFFER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = OFFER_TEMPLATES[slug];

  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  const page = data?.page;
  const seo = page?.seo;
  const title = seo?.title || (template ? `${template.title} - PODHIPOTEKE24.PL` : "Oferta - PODHIPOTEKE24.PL");

  return {
    title,
    description: seo?.metaDesc || template?.subtitle || "",
    openGraph: {
      title: seo?.opengraphTitle || title,
      description: seo?.opengraphDescription || seo?.metaDesc || "",
      images: seo?.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : [],
    },
  };
}

// Czyści shortcody Divi i zamienia stare lata
function cleanContent(html: string): string {
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

export default async function OfertaSlugPage({ params }: Props) {
  const { slug } = await params;
  const template = OFFER_TEMPLATES[slug];

  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  const page = data?.page;
  const heading = page?.title || template?.title || "Oferta";
  const subtitle = template?.subtitle || "";
  const cleaned = page?.content ? cleanContent(page.content) : "";

  if (!page && !template) {
    notFound();
  }

  return (
    <>
      {/* Hero z breadcrumbs nad H1 */}
      <section className="relative py-[150px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/oferta-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#1c435e]/80" />
        <div className="relative z-10 max-w-[1330px] mx-auto px-4 text-center">
          {/* Breadcrumbs NAD H1 */}
          <nav className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
            <span>/</span>
            <Link href="/oferta" className="hover:text-white transition-colors">Oferta</Link>
            <span>/</span>
            <span className="text-white/90">{heading}</span>
          </nav>
          <h1 className="text-3xl md:text-[4.2rem] font-medium text-white leading-tight mb-4">
            {heading}
          </h1>
          {subtitle && (
            <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
              {subtitle}
            </p>
          )}
          <a
            href="#tresc"
            className="btn-primary !px-8 !py-3 !text-lg"
          >
            Poznaj szczegóły ↓
          </a>
        </div>
      </section>

      {/* Treść strony */}
      <section id="tresc" className="py-16 bg-white">
        <div className="max-w-[1330px] mx-auto px-4">
          {cleaned ? (
            <div
              className="wp-content max-w-[780px] mx-auto"
              dangerouslySetInnerHTML={{ __html: cleaned }}
            />
          ) : (
            <div className="max-w-[780px] mx-auto text-center">
              <p className="text-text-secondary text-lg">
                Skontaktuj się z nami, aby dowiedzieć się więcej o tej usłudze.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA sekcja */}
      <section className="py-14 bg-accent/10">
        <div className="max-w-[1330px] mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-[2.5rem] font-semibold text-primary mb-4">
            Gotowy na złożenie wniosku?
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Wypełnij formularz poniżej lub zadzwoń do nas. Odpowiadamy w ciągu 24 godzin.
          </p>
          <a href="#formularz" className="btn-cta-shine !px-10 !py-4 !text-lg">
            Złóż wniosek
          </a>
        </div>
      </section>

      {/* Formularz kontaktowy */}
      <ContactForm />
    </>
  );
}
