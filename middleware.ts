import { NextRequest, NextResponse } from "next/server";

// ── Service pages: /{slug} → /oferta/{slug} ──────────────────────────────────
const SERVICE_SLUGS = new Set([
  "pozyczki-pod-zastaw-nieruchomosci",
  "pozyczki-pod-zastaw-domu",
  "pozyczki-pod-zastaw-dzialki",
  "pozyczki-pod-zastaw-gruntow-rolnych",
  "pozyczki-hipoteczne-dla-firm",
  "kredyt-pod-zastaw-mieszkania",
  "kredyt-pod-zastaw-dzialki",
  "kredyt-pod-zastaw-nieruchomosci",
  "pozyczki-oddluzeniowe-2",
]);

// ── Known top-level routes that must NOT be redirected ────────────────────────
const KNOWN_ROUTES = new Set([
  "blog",
  "oferta",
  "narzedzia",
  "faq",
  "kontakt",
  "o-nas",
  "polityka-prywatnosci",
  "polityka-cookies",
  "api",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only act on single-segment paths like /some-slug
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length !== 1) return NextResponse.next();

  const slug = segments[0];

  // Skip known app routes
  if (KNOWN_ROUTES.has(slug)) return NextResponse.next();

  // Skip paths with a file extension (.ico, .xml, .txt, .png …)
  if (/\.\w+$/.test(slug)) return NextResponse.next();

  // Service page → /oferta/ (check BEFORE city-page prefix check)
  if (SERVICE_SLUGS.has(slug)) {
    const url = request.nextUrl.clone();
    url.pathname = `/oferta/${slug}`;
    return NextResponse.redirect(url, 301);
  }

  // City pages (pozyczki-pod-zastaw-[miasto]) are served by app/[slug]/page.tsx
  if (slug.startsWith("pozyczki-pod-zastaw-")) return NextResponse.next();

  // Everything else (old blog-post URLs) → /blog/{slug}
  const url = request.nextUrl.clone();
  url.pathname = `/blog/${slug}`;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Run on all paths except _next internals, static files and API routes
  matcher: ["/((?!_next/|api/|images/|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)"],
};
