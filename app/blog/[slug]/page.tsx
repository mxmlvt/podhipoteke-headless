import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar } from "lucide-react";
import client from "@/lib/apollo";
import { GET_POST_BY_SLUG, GET_ALL_SLUGS } from "@/lib/queries";
import { parseWPContent, getTableOfContents } from "@/lib/content-parser";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import CTABox from "@/components/shared/CTABox";
import { Badge } from "@/components/ui/badge";
import ContactForm from "@/components/ContactForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await client.query<any>({ query: GET_ALL_SLUGS });
  return data.posts.nodes.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
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
  const formattedDate = new Date(post.date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const parsedContent = parseWPContent(post.content, slug);
  const toc = post.content ? getTableOfContents(post.content) : [];
  const category = post.categories?.nodes?.[0]?.name;

  return (
    <main>
      {/* Breadcrumbs bar */}
      <div className="bg-[#f7f8fa] border-b border-[#e5e7eb] py-3">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: post.title },
            ]}
          />
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-10">
        <div className="flex gap-10">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            {/* Category */}
            {category && (
              <Badge className="mb-4 bg-[#e8f4f6] text-[#2299AA] hover:bg-[#e8f4f6] text-xs font-semibold uppercase">
                {category}
              </Badge>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#111827] leading-tight mb-5">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-[#6b7280] text-sm mb-8 pb-6 border-b border-[#e5e7eb]">
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

            {/* Featured Image */}
            {post.featuredImage?.node?.sourceUrl && (
              <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden mb-8">
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

            {/* Content - first half */}
            {parsedContent ? (
              <>
                <div className="wp-content text-[#374151] leading-relaxed">
                  {parsedContent.firstHalf}
                </div>

                {/* Inline CTA */}
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

                {/* Content - second half */}
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

            {/* CTA sekcja – diagnostyka */}
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

          {/* Sidebar – widoczny tylko na lg+ */}
          {toc.length > 0 && (
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Spis treści */}
                <div className="bg-[#f7f8fa] rounded-xl p-5 border border-[#e5e7eb]">
                  <h3 className="font-bold text-[#111827] text-sm uppercase tracking-wider mb-4">
                    Spis treści
                  </h3>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id}>
                        <span className="text-sm text-[#374151] hover:text-[#1c435e] transition-colors cursor-pointer leading-relaxed block">
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sidebar CTA 1 */}
                <div className="bg-[#1c435e] rounded-xl p-5 text-white">
                  <h3 className="font-bold text-base mb-2">Sprawdź czy się kwalifikujesz</h3>
                  <p className="text-white/75 text-sm mb-4">Diagnostyka finansowa w 2 minuty.</p>
                  <Link
                    href="/narzedzia/diagnostyka"
                    className="block text-center py-2.5 rounded-lg bg-[#2299AA] text-white text-sm font-semibold hover:bg-[#2bb5c7] transition-colors"
                  >
                    Zrób diagnostykę
                  </Link>
                </div>

                {/* Sidebar CTA 2 */}
                <div className="bg-white rounded-xl p-5 border border-[#e5e7eb]">
                  <h3 className="font-bold text-[#111827] text-base mb-2">Oblicz ratę</h3>
                  <p className="text-[#6b7280] text-sm mb-4">Kalkulator raty pożyczki hipotecznej.</p>
                  <Link
                    href="/narzedzia/kalkulator-raty"
                    className="block text-center py-2.5 rounded-lg border-2 border-[#1c435e] text-[#1c435e] text-sm font-semibold hover:bg-[#1c435e] hover:text-white transition-colors"
                  >
                    Otwórz kalkulator
                  </Link>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <ContactForm />
    </main>
  );
}
