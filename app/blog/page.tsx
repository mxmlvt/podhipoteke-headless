import type { Metadata } from "next";
import client from "@/lib/apollo";
import { GET_ALL_POSTS } from "@/lib/queries";
import BlogCard from "@/components/BlogCard";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Blog – wiedza o pożyczkach i kredytach | PODHIPOTEKE24.PL",
  description:
    "Artykuły o pożyczkach pod hipotekę, kredytach pod zastaw nieruchomości i finansach. Porady ekspertów. Wiedza, która pomoże Ci podjąć świadomą decyzję.",
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
    <main>
      <PageHero
        heading="Blog – wiedza o pożyczkach i kredytach"
        text="Artykuły i porady z zakresu pożyczek hipotecznych, finansów osobistych i prawa kredytowego."
        bgImage="/images/faq-bg.jpg"
      />

      <section className="py-12 md:py-16 section-mint">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <span className="inline-block mb-3 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#2299AA]/10 text-[#2299AA]">
              Blog
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#111827] mb-2">
              Artykuły i porady ekspertów
            </h2>
            <p className="text-[#6b7280]">
              Łącznie{" "}
              <span className="font-semibold text-[#111827]">{posts.length}</span>{" "}
              artykułów
            </p>
          </div>

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
      </section>
    </main>
  );
}
