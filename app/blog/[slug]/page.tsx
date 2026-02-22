import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import client from "@/lib/apollo";
import { GET_POST_BY_SLUG, GET_ALL_SLUGS } from "@/lib/queries";

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

  return (
    <main className="py-12">
      <article className="max-w-[780px] mx-auto px-6 md:px-4">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-2 text-text-secondary">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Strona główna
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-text-primary truncate max-w-[300px]">{post.title}</li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mb-8">
          {post.categories?.nodes?.[0] && (
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {post.categories.nodes[0].name}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-text-heading leading-tight mt-2 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-text-secondary text-sm">
            <time dateTime={post.date}>{formattedDate}</time>
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-8">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 780px) 100vw, 780px"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="wp-content text-text-primary leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to blog */}
        <div className="mt-12 pt-8 border-t border-border-light">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            Wróć do bloga
          </Link>
        </div>
      </article>

      {/* CTA */}
      <section className="mt-16 py-12 bg-bg-light">
        <div className="max-w-[780px] mx-auto px-6 md:px-4 text-center">
          <h2 className="text-2xl font-semibold text-text-heading mb-4">
            Potrzebujesz pożyczki pod hipotekę?
          </h2>
          <p className="text-text-secondary mb-6">
            Skontaktuj się z nami i otrzymaj ofertę dopasowaną do Twoich potrzeb.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/kontakt"
              className="bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary transition-colors"
            >
              Złóż wniosek
            </Link>
            <a
              href="tel:577873616"
              className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-white transition-colors"
            >
              Zadzwoń: 577 873 616
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
