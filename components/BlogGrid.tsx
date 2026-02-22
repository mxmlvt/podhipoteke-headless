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
    <section className="py-16 bg-bg-light">
      <div className="max-w-[1080px] mx-auto px-6 md:px-4">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-medium text-primary">{title}</h2>
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
            <a
              href="/blog"
              className="inline-block bg-secondary text-white px-8 py-3 rounded-full font-semibold hover:bg-primary transition-colors"
            >
              Zobacz wszystkie artykuły
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
