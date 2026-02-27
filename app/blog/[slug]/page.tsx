import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, ChevronRight, List } from "lucide-react";
import client from "@/lib/apollo";
import { GET_POST_BY_SLUG, GET_RELATED_POSTS } from "@/lib/queries";
import { parseWPContent, getTableOfContents } from "@/lib/content-parser";
import CTABox from "@/components/shared/CTABox";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";
import { IMAGES } from "@/lib/images";

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
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });

  if (!data.post) {
    return { title: "Nie znaleziono - PODHIPOTEKE24.PL" };
  }

  const post = data.post;
  const seo = post.seo;

  return {
    title: seo?.title || `${post.title} - PODHIPOTEKE24.PL`,
    description: seo?.metaDesc || post.excerpt?.replace(/<[^>]*>/g, "").slice(0, 160),
    openGraph: {
      title: seo?.opengraphTitle || post.title,
      description: seo?.opengraphDescription || seo?.metaDesc,
      images: seo?.opengraphImage?.sourceUrl
        ? [{ url: seo.opengraphImage.sourceUrl }]
        : post.featuredImage?.node?.sourceUrl
          ? [{ url: post.featuredImage.node.sourceUrl }]
          : [],
    },
  };
}

export default async function SinglePost({ params }: Props) {
  const { slug } = await params;
  const { data } = await client.query<any>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });

  if (!data.post) {
    notFound();
  }

  const post = data.post;
  const category = post.categories?.nodes?.[0];
  const formattedDate = new Date(post.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Fetch related posts from same category
  let relatedPosts: any[] = [];
  if (category?.slug) {
    try {
      const { data: relData } = await client.query<any>({
        query: GET_RELATED_POSTS,
        variables: { categorySlug: category.slug, excludeId: post.id, count: 3 },
      });
      relatedPosts = relData?.posts?.nodes || [];
    } catch {
      relatedPosts = [];
    }
  }

  const parsedContent = parseWPContent(post.content, slug);
  const toc = post.content ? getTableOfContents(post.content) : [];

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "https://podhipoteke24.pl/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://podhipoteke24.pl/blog" },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumbs – jedna linia, py-3, BEZ truncate */}
      <nav className="bg-[#f0fafb] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <ol className="flex items-center gap-1.5 text-sm text-[#6b7280] flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#1c435e] transition-colors">Strona główna</Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
            <li>
              <Link href="/blog" className="hover:text-[#1c435e] transition-colors">Blog</Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" /></li>
            <li className="text-[#374151]">{post.title}</li>
          </ol>
        </div>
      </nav>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
        <div className="flex gap-10 items-start">

          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Category badge */}
            {category && (
              <Badge className="mb-4 bg-[#e6f7f9] text-[#2299AA] hover:bg-[#e6f7f9] text-xs font-semibold uppercase tracking-wide rounded-full">
                {category.name}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] leading-tight mb-5">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-[#6b7280] text-sm mb-8 pb-5 border-b border-[#e5e7eb]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formattedDate}</time>
              </span>
              {parsedContent?.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {parsedContent.readTime} min czytania
                </span>
              )}
            </div>

            {/* Spis treści – TU, nad featured image */}
            {toc.length > 1 && (
              <div className="bg-[#e6f7f9] rounded-2xl p-5 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <List className="w-4 h-4 text-[#2299AA]" />
                  <h3 className="font-bold text-[#1c435e] text-sm uppercase tracking-wide">
                    Spis treści
                  </h3>
                </div>
                <ol className="space-y-1.5">
                  {toc.map((item, i) => (
                    <li key={item.id} className="flex items-start gap-2 text-sm text-[#374151]">
                      <span className="text-[#2299AA] font-semibold shrink-0 w-5">{i + 1}.</span>
                      <span className="hover:text-[#1c435e] transition-colors cursor-pointer leading-relaxed">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-md">
                <Image
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText || post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                />
              </div>
            )}

            {/* Content */}
            {parsedContent ? (
              <>
                <div className="wp-content text-[#374151] leading-relaxed">
                  {parsedContent.firstHalf}
                </div>

                <CTABox
                  heading={parsedContent.cta.heading}
                  text={parsedContent.cta.text}
                  primaryAction={{
                    label: parsedContent.cta.primaryLabel,
                    href: parsedContent.cta.href,
                  }}
                  secondaryAction={{
                    label: "Skontaktuj się",
                    href: "/kontakt",
                  }}
                  variant="accent"
                />

                <div className="wp-content text-[#374151] leading-relaxed">
                  {parsedContent.secondHalf}
                </div>
              </>
            ) : (
              <div
                className="wp-content text-[#374151] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            )}

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-[#e5e7eb]">
              <CTABox
                heading="Sprawdź czy się kwalifikujesz"
                text="Odpowiedz na kilka pytań i dowiedz się czy możesz uzyskać pożyczkę pod zastaw nieruchomości."
                primaryAction={{ label: "Zrób diagnostykę", href: "/narzedzia/diagnostyka" }}
                secondaryAction={{ label: "Wróć do bloga", href: "/blog" }}
                variant="primary"
              />
            </div>
          </article>

          {/* Sidebar – sticky, tylko lg+ */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* CTA 1: Diagnostyka */}
              <div className="bg-[#1c435e] rounded-2xl p-5 text-white">
                <h3 className="font-bold text-base mb-2">Sprawdź czy się kwalifikujesz</h3>
                <p className="text-white/75 text-sm mb-4">Diagnostyka finansowa w 2 minuty.</p>
                <Link
                  href="/narzedzia/diagnostyka"
                  className="block text-center py-2.5 rounded-full bg-[#2299AA] hover:bg-[#2bb5c7] text-white text-sm font-semibold transition-colors"
                >
                  Zrób diagnostykę
                </Link>
              </div>

              {/* CTA 2: Kalkulator raty */}
              <div className="bg-[#e6f7f9] rounded-2xl p-5">
                <h3 className="font-bold text-[#1c435e] text-base mb-2">Oblicz ratę pożyczki</h3>
                <p className="text-[#6b7280] text-sm mb-4">Kalkulator raty pożyczki hipotecznej.</p>
                <Link
                  href="/narzedzia/kalkulator-raty"
                  className="block text-center py-2.5 rounded-full border-2 border-[#1c435e] text-[#1c435e] text-sm font-semibold hover:bg-[#1c435e] hover:text-white transition-colors"
                >
                  Otwórz kalkulator
                </Link>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="border-t border-[#e5e7eb] pt-5">
                  <h3 className="font-bold text-[#111827] text-sm uppercase tracking-wider mb-4">
                    Powiązane wpisy
                  </h3>
                  <div className="space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.id} href={`/blog/${rp.slug}`} className="flex gap-3 group">
                        <div className="relative w-16 h-12 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={rp.featuredImage?.node?.sourceUrl || IMAGES.blog.default}
                            alt={rp.featuredImage?.node?.altText || rp.title}
                            fill
                            sizes="64px"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#111827] text-xs font-semibold leading-tight line-clamp-2 group-hover:text-[#1c435e] transition-colors">
                            {rp.title}
                          </p>
                          <p className="text-[#9ca3af] text-xs mt-1">
                            {new Date(rp.date).toLocaleDateString("pl-PL", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <ContactForm />
    </main>
  );
}
