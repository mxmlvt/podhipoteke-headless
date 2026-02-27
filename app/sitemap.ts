import type { MetadataRoute } from "next";
import client from "@/lib/apollo";
import { GET_ALL_SLUGS, GET_ALL_PAGE_SLUGS } from "@/lib/queries";
import { isServicePageSlug, isCityPageSlug } from "@/lib/page-templates";

const BASE_URL = "https://podhipoteke24.pl";

const EXCLUDED_SLUGS = [
  "strona-glowna",
  "o-nas",
  "oferta",
  "faq",
  "kontakt",
  "blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/oferta`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/kontakt`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/o-nas`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/narzedzia`, changeFrequency: "monthly", priority: 0.6 },
    {
      url: `${BASE_URL}/narzedzia/kalkulator-raty`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/narzedzia/ile-moge-pozyczyc`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/narzedzia/porownywarka`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/narzedzia/diagnostyka`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/narzedzia/kalkulator-konsolidacji`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/polityka-prywatnosci`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/polityka-cookies`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Blog posts
  const { data: postsData } = await client.query<any>({
    query: GET_ALL_SLUGS,
  });
  const blogPages: MetadataRoute.Sitemap = postsData.posts.nodes.map(
    (post: { slug: string }) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Dynamic pages from WordPress
  const { data: pagesData } = await client.query<any>({
    query: GET_ALL_PAGE_SLUGS,
  });

  const servicePages: MetadataRoute.Sitemap = [];
  const cityPages: MetadataRoute.Sitemap = [];
  const otherPages: MetadataRoute.Sitemap = [];

  for (const page of pagesData.pages.nodes as { slug: string }[]) {
    if (EXCLUDED_SLUGS.includes(page.slug)) continue;

    if (isServicePageSlug(page.slug)) {
      // Service pages live under /oferta/{slug}
      servicePages.push({
        url: `${BASE_URL}/oferta/${page.slug}`,
        changeFrequency: "monthly",
        priority: 0.85,
      });
    } else if (isCityPageSlug(page.slug)) {
      // City pages live under /{slug}
      cityPages.push({
        url: `${BASE_URL}/${page.slug}`,
        changeFrequency: "monthly",
        priority: 0.75,
      });
    } else {
      // Other pages (polityka prywatnosci etc.) – skip if already in static
      const alreadyListed = staticPages.some(
        (p) => p.url === `${BASE_URL}/${page.slug}`
      );
      if (!alreadyListed) {
        otherPages.push({
          url: `${BASE_URL}/${page.slug}`,
          changeFrequency: "yearly",
          priority: 0.4,
        });
      }
    }
  }

  return [
    ...staticPages,
    ...servicePages,
    ...cityPages,
    ...blogPages,
    ...otherPages,
  ];
}
