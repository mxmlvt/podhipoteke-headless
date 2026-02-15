import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
  category?: string;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  date,
  featuredImage,
  category,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Strip HTML tags from excerpt
  const cleanExcerpt = excerpt.replace(/<[^>]*>/g, "").trim();

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-border-light hover:shadow-md transition-shadow group">
      <Link href={`/blog/${slug}`} className="block">
        {featuredImage?.node?.sourceUrl ? (
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={featuredImage.node.sourceUrl}
              alt={featuredImage.node.altText || title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full aspect-[16/10] bg-bg-light flex items-center justify-center">
            <svg className="w-12 h-12 text-border-medium" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
            </svg>
          </div>
        )}
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {category && (
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
              {category}
            </span>
          )}
          <time className="text-sm text-text-secondary" dateTime={date}>
            {formattedDate}
          </time>
        </div>
        <Link href={`/blog/${slug}`}>
          <h3 className="text-lg font-semibold text-text-heading hover:text-primary transition-colors leading-snug mb-2 line-clamp-2">
            {title}
          </h3>
        </Link>
        {cleanExcerpt && (
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {cleanExcerpt}
          </p>
        )}
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-1 mt-4 text-primary font-medium text-sm hover:gap-2 transition-all"
        >
          Czytaj więcej
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </article>
  );
}
