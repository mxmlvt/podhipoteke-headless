import type { Metadata } from "next";
import { notFound } from "next/navigation";
import client from "@/lib/apollo";
import { GET_PAGE_BY_SLUG, GET_ALL_PAGE_SLUGS } from "@/lib/queries";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

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

// Strip Divi shortcodes and clean WP HTML content
function cleanContent(html: string): string {
  if (!html) return "";
  return html
    // Remove Divi shortcodes [et_pb_*]...[/et_pb_*]
    .replace(/\[et_pb_[^\]]*\]/g, "")
    .replace(/\[\/et_pb_[^\]]*\]/g, "")
    // Remove other shortcodes
    .replace(/\[\/?[a-zA-Z_]+[^\]]*\]/g, "")
    // Clean empty divs
    .replace(/<div[^>]*class="[^"]*et_pb[^"]*"[^>]*>\s*<\/div>/gi, "")
    // Trim
    .trim();
}

// Check if this is a service/city page (has Divi content that should show form)
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
  ];
  return cityPatterns.some((p) => slug.startsWith(p));
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
  const showContactForm = isServicePage(slug) || isCityPage(slug);

  // Determine hero image based on page type
  const heroImage = isCityPage(slug)
    ? "/images/slide-1.jpg"
    : isServicePage(slug)
      ? "/images/oferta-bg.jpg"
      : "/images/faq-bg.jpg";

  return (
    <>
      <PageHero
        heading={page.title}
        text=""
        bgImage={heroImage}
      />

      <section className="py-16 bg-white">
        <div className="max-w-[1330px] mx-auto px-6 md:px-4">
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

      {showContactForm && <ContactForm />}
    </>
  );
}
