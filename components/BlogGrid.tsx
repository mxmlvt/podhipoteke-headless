import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BlogCard from "./BlogCard";

interface Post {
  id: string;
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
  categories?: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
}

interface BlogGridProps {
  posts: Post[];
  title?: string;
  showMoreLink?: boolean;
}

export default function BlogGrid({ posts, title, showMoreLink = false }: BlogGridProps) {
  return (
    <section className="py-16 md:py-24 bg-[#f7f8fa]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">{title}</h2>
            <p className="text-[#6b7280] text-lg">
              Wiedza i porady z zakresu pożyczek, kredytów i finansów osobistych.
            </p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              date={post.date}
              featuredImage={post.featuredImage}
              category={post.categories?.nodes?.[0]?.name}
            />
          ))}
        </div>
        {showMoreLink && (
          <div className="text-center mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-[#1c435e] text-[#1c435e] font-bold text-base hover:bg-[#1c435e] hover:text-white transition-all duration-300"
            >
              Zobacz wszystkie artykuły
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
