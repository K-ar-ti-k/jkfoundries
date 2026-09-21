import Link from "next/link";
import Image from "next/image";
import { getAllBlogPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Steel Casting Blog",
  description:
    "Read JK Foundry insights about steel casting technology, foundry processes, automation, equipment, and industrial manufacturing.",
  alternates: { canonical: "/blog" },
  ...pageSocialMetadata(
    "Steel Casting Blog | JK Foundry",
    "Read JK Foundry insights about steel casting technology, foundry processes, automation, equipment, and industrial manufacturing.",
    "/blog",
  ),
};

export default async function BlogPage() {
  const blogPosts = await getAllBlogPosts();
  const blogSchemas = [
    webPageJsonLd(
      "/blog",
      "Steel Casting Blog",
      "Insights about steel casting technology, foundry processes, automation, equipment, and industrial manufacturing.",
    ),
    itemListJsonLd(
      "/blog",
      "JK Foundry Articles",
      blogPosts.map((post) => ({ name: post.title, url: `/blog/${post.slug}`, image: post.image })),
    ),
  ];

  const BlogCard = ({ post }: { post: BlogPost }) => {
    const imageUrl = post.image || "/placeholder.jpg"; // Fallback image if post.image is not available   
    return (
      <article className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-48">
          <Image
            src={imageUrl} 
            alt={`${post.title} - JK Foundry`} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
            {post.category}
          </div>
        </div>
        <div className="p-6">
          <div className="text-sm text-gray-500 mb-2">{post.date}</div>
          <h3 className="text-xl font-semibold font-montserrat mb-3 text-dark hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-secondary mb-4">{post.excerpt}</p>
          <Link
            href={`/blog/${post.slug}`}
            className="text-primary font-medium hover:text-primary/80 transition-colors inline-flex items-center"
          >
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </article>
    );
  };

  return (
    <div className="min-h-screen">
      {blogSchemas.map((schema, index) => <JsonLd key={index} data={schema} />)}
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-dark">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/blogs.webp"
            alt="blogs Background"
            fill
            className="object-cover opacity-40"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6 text-white drop-shadow-lg">
              <span className="text-white-300">Our</span>{" "}
              <span className="text-primary">Blogs</span>
            </h1>
            <p className="text-xl text-white-200 drop-shadow-lg">
              Insights, updates, and knowledge about steel casting and manufacturing
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          {blogPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogCard key={post.id || post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-6">Stay Updated</h2>
            <p className="text-secondary mb-8">
              Subscribe to our newsletter to receive the latest blog posts and updates directly in your inbox.
            </p>
            <form className="flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary" />
              <button type="submit" className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
