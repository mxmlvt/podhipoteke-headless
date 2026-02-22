import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  // Strony ofertowe – obsługuje /oferta/[slug]
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

// Strony lokalne (miast) – mogą nie istnieć w WP, generujemy statycznie
const CITY_SLUGS = [
  "pozyczki-warszawa",
  "pozyczki-krakow",
  "pozyczki-lodz",
  "pozyczki-wroclaw",
  "pozyczki-poznan",
  "pozyczki-gdansk",
  "pozyczki-szczecin",
  "pozyczki-bydgoszcz",
  "pozyczki-lublin",
  "pozyczki-katowice",
  "pozyczki-bialystok",
  "pozyczki-gdynia",
  "pozyczki-czestochowa",
  "pozyczki-radom",
  "pozyczki-torun",
  "pozyczki-sosnowiec",
  "pozyczki-rzeszow",
  "pozyczki-kielce",
  "pozyczki-gliwice",
  "pozyczki-zabrze",
  "pozyczki-olsztyn",
  "pozyczki-bielsko-biala",
  "pozyczki-bytom",
  "pozyczki-zielona-gora",
  "pozyczki-rybnik",
  "pozyczki-opole",
  "pozyczki-tychy",
  "pozyczki-elblag",
  "pozyczki-nowy-sacz",
  "pozyczki-koszalin",
  "pozyczki-kalisz",
  "pozyczki-konin",
  "pozyczki-suwalki",
  "pozyczki-legnica",
  "pozyczki-innowroclaw",
  "pozyczki-pila",
  "pozyczki-dabrowa-gornicza",
];

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await client.query<any>({ query: GET_ALL_PAGE_SLUGS });

  const wpSlugs = data.pages.nodes
    .filter((page: { slug: string }) => !EXCLUDED_SLUGS.includes(page.slug))
    .map((page: { slug: string }) => ({ slug: page.slug }));

  // Dodaj strony lokalne (mogą nie istnieć w WP)
  const citySlugs = CITY_SLUGS.map((slug) => ({ slug }));

  // Merge bez duplikatów
  const allSlugs = [...wpSlugs];
  for (const city of citySlugs) {
    if (!allSlugs.find((s) => s.slug === city.slug)) {
      allSlugs.push(city);
    }
  }
  return allSlugs;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  if (!data.page) {
    const cityName = getCityNameFromSlug(slug);
    if (cityName) {
      return { title: `Pożyczki ${cityName} - PODHIPOTEKE24.PL` };
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

// Strip Divi shortcodes, clean WP HTML, update years
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
  return CITY_SLUGS.includes(slug);
}

function getCityNameFromSlug(slug: string): string | null {
  const cityMap: Record<string, string> = {
    "pozyczki-warszawa": "Warszawa",
    "pozyczki-krakow": "Kraków",
    "pozyczki-lodz": "Łódź",
    "pozyczki-wroclaw": "Wrocław",
    "pozyczki-poznan": "Poznań",
    "pozyczki-gdansk": "Gdańsk",
    "pozyczki-szczecin": "Szczecin",
    "pozyczki-bydgoszcz": "Bydgoszcz",
    "pozyczki-lublin": "Lublin",
    "pozyczki-katowice": "Katowice",
    "pozyczki-bialystok": "Białystok",
    "pozyczki-gdynia": "Gdynia",
    "pozyczki-czestochowa": "Częstochowa",
    "pozyczki-radom": "Radom",
    "pozyczki-torun": "Toruń",
    "pozyczki-sosnowiec": "Sosnowiec",
    "pozyczki-rzeszow": "Rzeszów",
    "pozyczki-kielce": "Kielce",
    "pozyczki-gliwice": "Gliwice",
    "pozyczki-zabrze": "Zabrze",
    "pozyczki-olsztyn": "Olsztyn",
    "pozyczki-bielsko-biala": "Bielsko-Biała",
    "pozyczki-bytom": "Bytom",
    "pozyczki-zielona-gora": "Zielona Góra",
    "pozyczki-rybnik": "Rybnik",
    "pozyczki-opole": "Opole",
    "pozyczki-tychy": "Tychy",
    "pozyczki-elblag": "Elbląg",
    "pozyczki-nowy-sacz": "Nowy Sącz",
    "pozyczki-koszalin": "Koszalin",
    "pozyczki-kalisz": "Kalisz",
    "pozyczki-konin": "Konin",
    "pozyczki-suwalki": "Suwałki",
    "pozyczki-legnica": "Legnica",
    "pozyczki-innowroclaw": "Inowrocław",
    "pozyczki-pila": "Piła",
    "pozyczki-dabrowa-gornicza": "Dąbrowa Górnicza",
  };
  return cityMap[slug] || null;
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;

  const { data } = await client.query<any>({
    query: GET_PAGE_BY_SLUG,
    variables: { slug },
  });

  const cityName = getCityNameFromSlug(slug);
  const isCitySlug = isCityPage(slug);

  if (!data.page) {
    // Fallback dla stron lokalnych miast
    if (cityName && isCitySlug) {
      return (
        <>
          <section className="relative py-[150px] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/slide-1.jpg')" }}
            />
            <div className="absolute inset-0 bg-[#1c435e]/80" />
            <div className="relative z-10 max-w-[1330px] mx-auto px-4 text-center">
              <nav className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4">
                <Link href="/" className="hover:text-white transition-colors">Strona główna</Link>
                <span>/</span>
                <span className="text-white/90">Pożyczki {cityName}</span>
              </nav>
              <h1 className="text-3xl md:text-[4.2rem] font-medium text-white leading-tight mb-4">
                Pożyczki {cityName}
              </h1>
              <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed mb-8">
                Ekspresowe pożyczki pod zastaw nieruchomości w {cityName}. Kwoty od 50 000 do 2 000 000 zł. Bez BIK. Decyzja w 24h.
              </p>
              <a href="#formularz" className="btn-cta-shine !px-8 !py-3 !text-lg">
                Złóż wniosek
              </a>
            </div>
          </section>

          <section className="py-16 bg-white">
            <div className="max-w-[780px] mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                Pożyczki hipoteczne w {cityName}
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Oferujemy szybkie pożyczki pod zastaw nieruchomości dla mieszkańców {cityName} i okolic.
                Nie wymagamy zaświadczeń z ZUS i US, nie weryfikujemy w bazach BIK, BIG i KRD.
                Jedynym zabezpieczeniem jest nieruchomość.
              </p>
            </div>
          </section>

          <section className="py-14 bg-[#2299AA]/10">
            <div className="max-w-[1330px] mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-[2.5rem] font-semibold text-primary mb-4">
                Gotowy na złożenie wniosku?
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                Wypełnij formularz lub zadzwoń. Odpowiadamy w ciągu 24 godzin.
              </p>
              <a href="#formularz" className="btn-cta-shine !px-10 !py-4 !text-lg">
                Złóż wniosek
              </a>
            </div>
          </section>

          <ContactForm />
        </>
      );
    }
    notFound();
  }

  const page = data.page;
  const cleaned = cleanContent(page.content);
  const showContactForm = isServicePage(slug) || isCitySlug;

  const heroImage = isCitySlug
    ? "/images/slide-1.jpg"
    : isServicePage(slug)
      ? "/images/oferta-bg.jpg"
      : "/images/faq-bg.jpg";

  return (
    <>
      <section className="relative py-[150px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
        <div className="absolute inset-0 bg-[#1c435e]/80" />
        <div className="relative z-10 max-w-[1330px] mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-[4.2rem] font-medium text-white leading-tight mb-6">
            {page.title}
          </h1>
        </div>
      </section>

      <section className="py-16 bg-white">
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

      {showContactForm && (
        <>
          <section className="py-14 bg-[#2299AA]/10">
            <div className="max-w-[1330px] mx-auto px-4 text-center">
              <h2 className="text-2xl md:text-[2.5rem] font-semibold text-primary mb-4">
                Gotowy na złożenie wniosku?
              </h2>
              <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
                Wypełnij formularz lub zadzwoń. Odpowiadamy w ciągu 24 godzin.
              </p>
              <a href="#formularz" className="btn-cta-shine !px-10 !py-4 !text-lg">
                Złóż wniosek
              </a>
            </div>
          </section>
          <ContactForm />
        </>
      )}
    </>
  );
}
