import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import client from "@/lib/apollo";
import { GET_PAGE_BY_SLUG, GET_ALL_PAGE_SLUGS } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import TrustBadges from "@/components/shared/TrustBadges";
import ToolCTACard from "@/components/shared/ToolCTACard";
import { getToolsForPage, getCityFromSlug } from "@/lib/tool-mapping";

// Slugs that already have dedicated pages (folders in /app)
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

function cleanContent(html: string): string {
  if (!html) return "";
  return html
    .replace(/\[et_pb_[^\]]*\]/g, "")
    .replace(/\[\/et_pb_[^\]]*\]/g, "")
    .replace(/\[\/?[a-zA-Z_]+[^\]]*\]/g, "")
    .replace(/<div[^>]*class="[^"]*et_pb[^"]*"[^>]*>\s*<\/div>/gi, "")
    .trim();
}

function isServicePage(slug: string): boolean {
  const servicePatterns = [
    "pozyczki-pod-zastaw",
    "pozyczki-hipoteczne",
    "pozyczki-oddluzeniowe",
    "kredyt-",
    "pozyczka-pod-zastaw",
    "pozyczki-pod-hipoteke",
  ];
  return servicePatterns.some((p) => slug.startsWith(p));
}

function isCityPage(slug: string): boolean {
  const cityPatterns = [
    "pozyczki-pod-hipoteke-",
    "pozyczka-hipoteczna-",
    "pozyczki-warszawa",
    "pozyczki-krakow",
    "pozyczki-wroclaw",
    "pozyczki-poznan",
    "pozyczki-gdansk",
    "pozyczki-lodz",
    "pozyczki-katowice",
    "pozyczki-bialystok",
    "pozyczki-olsztyn",
    "pozyczki-czestochowa",
  ];
  return cityPatterns.some((p) => slug.startsWith(p) || slug === p);
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
  const isService = isServicePage(slug);
  const isCity = isCityPage(slug);
  const showContactForm = isService || isCity;
  const tools = (isService || isCity) ? getToolsForPage(slug) : [];
  const cityName = getCityFromSlug(slug);

  const heroImage = isCity
    ? "/images/slide-1.jpg"
    : isService
      ? "/images/oferta-bg.jpg"
      : "/images/faq-bg.jpg";

  const heroHeading = isCity && cityName
    ? `Pożyczki pod hipotekę – ${cityName}`
    : page.title;

  const heroSubtitle = isCity && cityName
    ? `Obsługujemy klientów z ${cityName} i okolic`
    : undefined;

  return (
    <main>
      <PageHero
        heading={heroHeading}
        bgImage={heroImage}
        subtitle={heroSubtitle}
      />

      {/* Breadcrumbs */}
      <div className="bg-[#f7f8fa] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              ...(isCity ? [{ label: "Miasta", href: "/oferta" }] : isService ? [{ label: "Oferta", href: "/oferta" }] : []),
              { label: page.title },
            ]}
          />
        </div>
      </div>

      {/* TrustBadges for service/city pages */}
      {(isService || isCity) && (
        <div className="py-6 bg-white border-b border-[#e5e7eb]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <TrustBadges />
          </div>
        </div>
      )}

      {/* Content */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          {cleaned ? (
            <div
              className="wp-content max-w-[780px] mx-auto"
              dangerouslySetInnerHTML={{ __html: cleaned }}
            />
          ) : (
            <div className="max-w-[780px] mx-auto text-center py-8">
              <p className="text-[#6b7280] text-lg">
                Skontaktuj się z nami, aby dowiedzieć się więcej o tej usłudze.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Tools section for service/city pages */}
      {tools.length > 0 && (
        <section className="py-12 md:py-16 bg-[#f7f8fa]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-3 text-center">
              Bezpłatne narzędzia
            </h2>
            <p className="text-[#6b7280] text-center mb-8">
              Sprawdź sam przed kontaktem z nami
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
              {tools.map((tool) => (
                <ToolCTACard key={tool.href} {...tool} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* City CTA */}
      {isCity && cityName && (
        <section className="py-12 md:py-16 bg-[#1c435e]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Szukasz pożyczki w {cityName}?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Obsługujemy klientów z {cityName} i całego regionu. Kontaktuj się z nami telefonicznie lub przez formularz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
              >
                Złóż wniosek online
              </Link>
              <a
                href="tel:577873616"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-white text-white font-bold hover:bg-white hover:text-[#1c435e] transition-colors"
              >
                Zadzwoń: 577 873 616
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Service CTA */}
      {isService && !isCity && (
        <section className="py-12 md:py-16 bg-[#1c435e]">
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Gotowy na złożenie wniosku?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Decyzja w 24h. Pieniądze nawet w 2-4 dni robocze.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#2299AA] text-white font-bold hover:bg-[#2bb5c7] transition-colors"
            >
              Złóż wniosek
            </Link>
          </div>
        </section>
      )}

      {showContactForm && <ContactForm />}
    </main>
  );
}
