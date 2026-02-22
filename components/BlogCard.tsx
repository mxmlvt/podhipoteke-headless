import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

  const cleanExcerpt = excerpt.replace(/<[^>]*>/g, "").trim();

  return (
    <article>
      <Card className="h-full border border-[#e5e7eb] overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
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
            <div className="w-full aspect-[16/10] bg-[#f0fafb] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#e6f7f9] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#2299AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                </svg>
              </div>
            </div>
          )}
        </Link>
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {category && (
              <Badge variant="secondary" className="text-[#2299AA] bg-[#e8f4f6] hover:bg-[#e8f4f6] text-xs font-semibold uppercase">
                {category}
              </Badge>
            )}
            <time className="text-xs text-[#6b7280]" dateTime={date}>
              {formattedDate}
            </time>
          </div>
          <Link href={`/blog/${slug}`}>
            <h3 className="text-base font-semibold text-[#111827] hover:text-[#1c435e] transition-colors leading-snug line-clamp-2">
              {title}
            </h3>
          </Link>
          {cleanExcerpt && (
            <p className="text-[#6b7280] text-sm leading-relaxed line-clamp-2">
              {cleanExcerpt}
            </p>
          )}
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-[#2299AA] font-semibold text-sm hover:gap-2 transition-all mt-auto"
          >
            Czytaj dalej <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}
