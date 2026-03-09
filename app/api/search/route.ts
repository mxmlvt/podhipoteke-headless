import { NextRequest, NextResponse } from "next/server";

const WP_GRAPHQL = "https://srv106163.seohost.com.pl/graphql";

const SEARCH_QUERY = `
  query Search($term: String!) {
    posts(where: { search: $term }, first: 5) {
      nodes {
        title
        slug
        excerpt
      }
    }
    pages(where: { search: $term }, first: 4) {
      nodes {
        title
        slug
        uri
      }
    }
  }
`;

// Page slugs that are served under /oferta/
const OFERTA_SLUGS = new Set([
  "pozyczki-pod-zastaw-nieruchomosci",
  "pozyczki-pod-zastaw-domu",
  "pozyczki-pod-zastaw-dzialki",
  "pozyczki-pod-zastaw-gruntow-rolnych",
  "pozyczki-hipoteczne-dla-firm",
  "pozyczki-oddluzeniowe-2",
  "kredyt-pod-zastaw-mieszkania",
  "kredyt-pod-zastaw-dzialki",
  "kredyt-pod-zastaw-nieruchomosci",
]);

function buildPageUrl(slug: string, uri: string): string {
  if (OFERTA_SLUGS.has(slug)) return `/oferta/${slug}`;
  // Remove leading/trailing slashes from uri
  const clean = uri.replace(/^\/|\/$/g, "");
  return `/${clean}`;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(WP_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: SEARCH_QUERY, variables: { term: q } }),
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.json({ results: [] });
    }

    const json = await res.json();
    const posts: { title: string; slug: string; excerpt: string }[] =
      json?.data?.posts?.nodes ?? [];
    const pages: { title: string; slug: string; uri: string }[] =
      json?.data?.pages?.nodes ?? [];

    const results = [
      ...posts.map((p) => ({
        title: p.title,
        url: `/blog/${p.slug}`,
        type: "Artykuł",
        excerpt: p.excerpt?.replace(/<[^>]*>/g, "").slice(0, 100) ?? "",
      })),
      ...pages
        .filter((p) => p.slug !== "strona-glowna")
        .map((p) => ({
          title: p.title,
          url: buildPageUrl(p.slug, p.uri),
          type: "Strona",
          excerpt: "",
        })),
    ].slice(0, 8);

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
