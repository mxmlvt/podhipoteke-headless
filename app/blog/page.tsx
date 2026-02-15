import type { Metadata } from "next";
import client from "@/lib/apollo";
import { GET_ALL_POSTS } from "@/lib/queries";
import BlogCard from "@/components/BlogCard";

export const metadata: Metadata = {
  title: "Blog - PODHIPOTEKE24.PL",
  description:
    "Artykuły o pożyczkach pod hipotekę, kredytach pod zastaw nieruchomości i finansach. Porady ekspertów.",
};

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

export default async function BlogPage() {
  const { data } = await client.query<any>({
    query: GET_ALL_POSTS,
  });

  const posts: Post[] = data.posts.nodes;

  return (
    <main className="py-12">
      <div className="max-w-[1080px] mx-auto px-4">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-[4rem] font-medium text-primary mb-4">
            Blog
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Artykuły i porady dotyczące pożyczek pod hipotekę, kredytów pod zastaw nieruchomości i finansów
          </p>
        </div>

        {/* Posts grid */}
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
      </div>
    </main>
  );
}
