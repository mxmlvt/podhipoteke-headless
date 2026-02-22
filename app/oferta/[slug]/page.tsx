import type { Metadata } from "next";
import client from "@/lib/apollo";
import { GET_PAGE_BY_SLUG, GET_ALL_PAGE_SLUGS } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import TrustBadgesBar from "@/components/TrustBadgesBar";
import ToolCTACard from "@/components/shared/ToolCTACard";
import ServiceContentSection from "@/components/ServiceContentSection";
import { cleanContent, parseContent } from "@/lib/content-parser";
import { getToolsForPage } from "@/lib/tool-mapping";
import { isServicePageSlug, getServiceTemplate } from "@/lib/page-templates";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await client.query<any>({ query: GET_ALL_PAGE_SLUGS });
  return data.pages.nodes
    .filter((page: { slug: string }) => isServicePageSlug(page.slug))
    .map((page: { slug: string }) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  const template = getServiceTemplate(slug);

  if (!data.page) {
    return { title: `${template.introHeading} - PODHIPOTEKE24.PL` };
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

export default async function OfertaSlugPage({ params }: Props) {
  const { slug } = await params;

  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  const template = getServiceTemplate(slug);
  const tools = getToolsForPage(slug);
  const page = data.page;
  const cleaned = page ? cleanContent(page.content) : "";
  const hasContent = cleaned.length > 50;

  return (
    <main>
      <PageHero
        heading={page?.title || template.introHeading}
        subtitle={template.heroSubtitle}
        bgImage="/images/oferta-bg.jpg"
        breadcrumbs={[
          { label: "Strona główna", href: "/" },
          { label: "Oferta", href: "/oferta" },
          { label: page?.title || template.introHeading },
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
              Narzędzia online
            </h2>
            <p className="text-[#6b7280] text-center mb-8">
              Sprawdź warunki przed kontaktem z nami
            </p>
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
          <p className="text-white/75 text-lg mb-8 max-w-xl mx-auto">
            {template.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#formularz" className="btn-cta-shine !px-10 !py-4">
              Złóż wniosek
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
