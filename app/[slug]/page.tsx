import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import client from "@/lib/apollo";
import { GET_PAGE_BY_SLUG, GET_ALL_PAGE_SLUGS } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import TrustBadgesBar from "@/components/TrustBadgesBar";
import ToolCTACard from "@/components/shared/ToolCTACard";
import ServiceContentSection from "@/components/ServiceContentSection";
import { cleanContent } from "@/lib/content-parser";
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await client.query<any>({ query: GET_ALL_PAGE_SLUGS });
  return data.pages.nodes
    .filter((page: { slug: string }) => !EXCLUDED_SLUGS.includes(page.slug))
    .map((page: { slug: string }) => ({
      slug: page.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  if (!data.page) {
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

  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  if (!data.page) {
    notFound();
  }

  const page = data.page;
  const cleaned = cleanContent(page.content);
  const hasContent = cleaned.length > 50;

  const isCity = isCityPageSlug(slug);
  const isService = isServicePageSlug(slug);
  const showContactForm = isService || isCity;
  const tools = (isService || isCity) ? getToolsForPage(slug) : [];

  // City page
  if (isCity) {
    const cityName = getCityNameFromSlug(slug);
    const template = getCityTemplate(cityName);

    return (
      <main>
        <PageHero
          heading={page.title || `Pożyczki pod hipotekę – ${cityName}`}
          subtitle={template.heroSubtitle}
          bgImage="/images/slide-1.jpg"
        />

        {/* Breadcrumbs */}
        <nav className="bg-[#f0fafb] border-b border-[#e5e7eb] py-3">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <ol className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-wrap">
              <li><Link href="/" className="hover:text-[#1c435e]">Strona główna</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
              <li><Link href="/oferta" className="hover:text-[#1c435e]">Oferta</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
              <li className="text-[#374151]">{page.title}</li>
            </ol>
          </div>
        </nav>

        <TrustBadgesBar />

        {hasContent ? (
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[780px] mx-auto px-4 md:px-6">
              <div className="wp-content" dangerouslySetInnerHTML={{ __html: cleaned }} />
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
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] hover:bg-[#2bb5c7] text-white font-bold transition-colors"
              >
                Złóż wniosek online
              </Link>
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

  // Service page
  if (isService) {
    const template = getServiceTemplate(slug);

    return (
      <main>
        <PageHero
          heading={page.title}
          subtitle={template.heroSubtitle}
          bgImage="/images/oferta-bg.jpg"
        />

        <nav className="bg-[#f0fafb] border-b border-[#e5e7eb] py-3">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <ol className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-wrap">
              <li><Link href="/" className="hover:text-[#1c435e]">Strona główna</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
              <li><Link href="/oferta" className="hover:text-[#1c435e]">Oferta</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
              <li className="text-[#374151]">{page.title}</li>
            </ol>
          </div>
        </nav>

        <TrustBadgesBar />

        {hasContent ? (
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-[780px] mx-auto px-4 md:px-6">
              <div className="wp-content" dangerouslySetInnerHTML={{ __html: cleaned }} />
            </div>
          </section>
        ) : (
          <ServiceContentSection template={template} />
        )}

        {tools.length > 0 && (
          <section className="section-mint py-12 md:py-16">
            <div className="max-w-[1280px] mx-auto px-4 md:px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2 text-center">
                Narzędzia online
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
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full bg-[#2299AA] hover:bg-[#2bb5c7] text-white font-bold transition-colors"
            >
              Złóż wniosek
            </Link>
          </div>
        </section>

        <ContactForm />
      </main>
    );
  }

  // Generic page (polityka prywatności itp.)
  return (
    <main>
      <PageHero heading={page.title} bgImage="/images/faq-bg.jpg" />

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[780px] mx-auto px-4 md:px-6">
          {hasContent ? (
            <div className="wp-content" dangerouslySetInnerHTML={{ __html: cleaned }} />
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
