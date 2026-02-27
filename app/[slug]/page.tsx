import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@/lib/apollo";
import { GET_PAGE_BY_SLUG } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import TrustBadgesBar from "@/components/TrustBadgesBar";
import ToolCTACard from "@/components/shared/ToolCTACard";
import ServiceContentSection from "@/components/ServiceContentSection";
import { cleanContent, parseContent } from "@/lib/content-parser";
import { getToolsForPage } from "@/lib/tool-mapping";
import {
  isCityPageSlug,
  isServicePageSlug,
  getCityNameFromSlug,
  getCityTemplate,
  getServiceTemplate,
} from "@/lib/page-templates";

// Slugi obsługiwane przez dedykowane strony w /app
const EXCLUDED_SLUGS = [
  "strona-glowna",
  "o-nas",
  "oferta",
  "faq",
  "kontakt",
  "blog",
];

// Slugi stron lokalnych – fallback gdy nie ma strony w WP
const CITY_SLUGS = [
  "pozyczki-warszawa", "pozyczki-krakow", "pozyczki-lodz", "pozyczki-wroclaw",
  "pozyczki-poznan", "pozyczki-gdansk", "pozyczki-szczecin", "pozyczki-bydgoszcz",
  "pozyczki-lublin", "pozyczki-katowice", "pozyczki-bialystok", "pozyczki-gdynia",
  "pozyczki-czestochowa", "pozyczki-radom", "pozyczki-torun", "pozyczki-sosnowiec",
  "pozyczki-rzeszow", "pozyczki-kielce", "pozyczki-gliwice", "pozyczki-zabrze",
  "pozyczki-olsztyn", "pozyczki-bielsko-biala", "pozyczki-bytom", "pozyczki-zielona-gora",
  "pozyczki-rybnik", "pozyczki-opole", "pozyczki-tychy", "pozyczki-elblag",
  "pozyczki-nowy-sacz", "pozyczki-koszalin", "pozyczki-kalisz", "pozyczki-konin",
  "pozyczki-suwalki", "pozyczki-legnica", "pozyczki-inowroclaw", "pozyczki-pila",
  "pozyczki-dabrowa-gornicza",
];

interface Props {
  params: Promise<{ slug: string }>;
}

// Pages are rendered on-demand (ISR) to avoid WP connection issues during build
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  if (!data.page) {
    if (isCityPageSlug(slug)) {
      const cityName = getCityNameFromSlug(slug);
      return { title: `Pożyczki pod hipotekę ${cityName} - PODHIPOTEKE24.PL` };
    }
    return { title: "Nie znaleziono - PODHIPOTEKE24.PL" };
  }

  const page = data.page;
  const seo = page.seo;

  return {
    title: seo?.title || `${page.title} - PODHIPOTEKE24.PL`,
    description: seo?.metaDesc || "",
    openGraph: {
      title: seo?.opengraphTitle || page.title,
      description: seo?.opengraphDescription || seo?.metaDesc || "",
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo.opengraphImage.sourceUrl }]
        : [],
    },
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  const isCity = isCityPageSlug(slug);
  const isService = isServicePageSlug(slug);

  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  // Fallback dla stron lokalnych bez treści w WP
  if (!data.page) {
    if (isCity) {
      const cityName = getCityNameFromSlug(slug);
      const template = getCityTemplate(cityName);
      const tools = getToolsForPage(slug);

      return (
        <main>
          <PageHero
            heading={`Pożyczki pod hipotekę – ${cityName}`}
            subtitle={template.heroSubtitle}
            bgImage="/images/slide-1.jpg"
            breadcrumbs={[
              { label: "Strona główna", href: "/" },
              { label: "Oferta", href: "/oferta" },
              { label: `Pożyczki ${cityName}` },
            ]}
          />

          <TrustBadgesBar />
          <ServiceContentSection template={template} />

          {tools.length > 0 && (
            <section className="section-mint py-12 md:py-16">
              <div className="max-w-[1280px] mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2 text-center">
                  Narzędzia dla mieszkańców {cityName}
                </h2>
                <p className="text-[#6b7280] text-center mb-8">Sprawdź warunki przed kontaktem z nami</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
                  {tools.map((tool) => (
                    <ToolCTACard key={tool.href} {...tool} variant="featured" />
                  ))}
                </div>
              </div>
            </section>
          )}

          <section className="section-dark py-12 md:py-16">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {template.ctaHeading}
              </h2>
              <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">{template.ctaText}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#formularz" className="btn-cta-shine !px-10 !py-4">
                  Złóż wniosek online
                </a>
                <a
                  href="tel:577873616"
                  className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-[#1c435e] transition-all"
                >
                  Zadzwoń: 577 873 616
                </a>
              </div>
            </div>
          </section>

          <ContactForm />
        </main>
      );
    }

    notFound();
  }

  const page = data.page;
  const cleaned = cleanContent(page.content);
  const hasContent = cleaned.length > 50;

  const showContactForm = isService || isCity;
  const tools = (isService || isCity) ? getToolsForPage(slug) : [];

  // City page (has WP content)
  if (isCity) {
    const cityName = getCityNameFromSlug(slug);
    const template = getCityTemplate(cityName);

    return (
      <main>
        <PageHero
          heading={page.title || `Pożyczki pod hipotekę – ${cityName}`}
          subtitle={template.heroSubtitle}
          bgImage="/images/slide-1.jpg"
          breadcrumbs={[
            { label: "Strona główna", href: "/" },
            { label: "Oferta", href: "/oferta" },
            { label: page.title || `Pożyczki ${cityName}` },
          ]}
        />

        <TrustBadgesBar />

        {hasContent ? (
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[780px] mx-auto px-4 md:px-6">
              <div className="wp-content">{parseContent(page.content)}</div>
            </div>
          </section>
        ) : (
          <ServiceContentSection template={template} />
        )}

        {tools.length > 0 && (
          <section className="section-mint py-12 md:py-16">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2 text-center">
                Narzędzia dla mieszkańców {cityName}
              </h2>
              <p className="text-[#6b7280] text-center mb-8">Sprawdź warunki przed kontaktem z nami</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
                {tools.map((tool) => (
                  <ToolCTACard key={tool.href} {...tool} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section-dark py-12 md:py-16">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {template.ctaHeading}
            </h2>
            <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">{template.ctaText}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#formularz" className="btn-cta-shine !px-10 !py-4">
                Złóż wniosek online
              </a>
              <a
                href="tel:577873616"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-[#1c435e] transition-all"
              >
                Zadzwoń: 577 873 616
              </a>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>
    );
  }

  // Generic page (polityka prywatności itp.)
  return (
    <main>
      <PageHero
        heading={page.title}
        bgImage="/images/faq-bg.jpg"
        breadcrumbs={[
          { label: "Strona główna", href: "/" },
          { label: page.title },
        ]}
      />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[780px] mx-auto px-4 md:px-6">
          {hasContent ? (
            <div className="wp-content">{parseContent(page.content)}</div>
          ) : (
            <p className="text-[#6b7280] text-center text-lg py-8">
              Skontaktuj się z nami, aby dowiedzieć się więcej.
            </p>
          )}
        </div>
      </section>

      {showContactForm && <ContactForm />}
    </main>
  );
}
