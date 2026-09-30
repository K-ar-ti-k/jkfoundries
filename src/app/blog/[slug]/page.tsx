import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { marked } from "marked";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

const trimMetadata = (value: string, maxLength: number) =>
  value.length <= maxLength ? value : `${value.slice(0, maxLength - 3).trim()}...`;

function normalizeLegacyBullets(content: string): string {
  let codeFence: string | null = null;

  return content
    .split(/\r?\n/)
    .map((line) => {
      const fence = line.match(/^\s*(```+|~~~+)/)?.[1];
      if (fence) {
        if (!codeFence) {
          codeFence = fence[0];
        } else if (codeFence === fence[0]) {
          codeFence = null;
        }
        return line;
      }

      if (codeFence) return line;
      return line.replace(/^(\s*)[•●▪◦‣]\s+/, "$1- ");
    })
    .join("\n");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const image = post?.image?.startsWith("http")
    ? post.image
    : post?.image
      ? `https://jkfoundries.com${post.image}`
      : "https://jkfoundries.com/Logo.webp";

  return {
    title: trimMetadata(post?.title || "Blog", 45),
    description: trimMetadata(
      post?.excerpt || "Insights about steel casting and industrial manufacturing.",
      155,
    ),
    alternates: { canonical: `/blog/${slug}` },
    ...pageSocialMetadata(
      trimMetadata(post?.title || "Blog", 60),
      trimMetadata(post?.excerpt || "Insights about steel casting and industrial manufacturing.", 155),
      `/blog/${slug}`,
    ),
    openGraph: {
      type: "article",
      title: trimMetadata(post?.title || "Blog", 60),
      description: trimMetadata(
        post?.excerpt || "Insights about steel casting and industrial manufacturing.",
        155,
      ),
      url: `/blog/${slug}`,
      images: [{ url: image, alt: post?.title || "JK Foundry article" }],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  marked.setOptions({ gfm: true, breaks: true });
  const htmlContent = await marked.parse(normalizeLegacyBullets(post.content));
  const schema = articleJsonLd(
    `/blog/${post.slug}`,
    post.title,
    post.excerpt,
    post.date,
    post.image,
  );

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={schema} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ])} />
      <main className="max-w-[800px] mx-auto px-5 py-12">
        <article>
          {/* Category and Date */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-gray-500">
              {post.category}
            </span>
            <span className="text-gray-300">•</span>
            <time className="text-sm text-gray-500">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          {/* Title and Excerpt */}
          <header className="mb-12">
            <h1 className="text-3xl font-medium text-gray-900 mb-4 leading-[1.3]">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 leading-[1.6]">
              {post.excerpt}
            </p>
          </header>

          {/* Featured Image */}
          {post.image && (
            <div className="mb-12">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 800px) 100vw, 800px"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose max-w-none
              prose-headings:font-medium
              prose-headings:text-gray-900 
              prose-h1:text-3xl
              prose-h1:leading-[1.3]
              prose-h1:mb-8
              prose-h2:text-2xl 
              prose-h2:mt-16
              prose-h2:mb-8
              prose-h3:text-xl
              prose-h3:mt-12
              prose-h3:mb-6
              prose-p:text-[16px]
              prose-p:text-gray-600
              prose-p:leading-[1.6]
              prose-p:my-6
              prose-a:text-gray-900
              prose-a:no-underline
              prose-a:border-b
              prose-a:border-gray-300
              prose-a:hover:border-gray-900
              prose-blockquote:border-l
              prose-blockquote:border-gray-200
              prose-blockquote:pl-6
              prose-blockquote:py-1
              prose-blockquote:my-8
              prose-blockquote:italic
              prose-blockquote:text-gray-600
              prose-ul:my-8
              prose-ul:ml-0
              prose-ul:space-y-4
              prose-li:text-gray-600
              prose-li:leading-[1.6]
              prose-strong:font-medium
              prose-strong:text-gray-900
              prose-code:text-gray-900
              prose-code:bg-gray-100
              prose-code:px-1
              prose-code:py-0.5
              prose-code:rounded
              prose-code:text-[15px]
              prose-pre:bg-gray-100
              prose-pre:rounded
              prose-pre:p-4
              prose-pre:my-8
              prose-img:my-8
              [&>*:first-child]:mt-0
              [&>*:last-child]:mb-0
              [&>ul+ul]:mt-8
              [&>p+ul]:mt-6
              [&>h2+ul]:mt-8
              [&>h3+ul]:mt-6
              [&>h2+p]:mt-6
              [&>h3+p]:mt-4
              [&>ul+p]:mt-6
              [&>ul+h2]:mt-12
              [&>ul+h3]:mt-8"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          <nav aria-label="Related manufacturing pages" className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Explore JK Foundry</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm">
              <Link href="/foundry/products" className="text-primary hover:underline">
                Steel cast components
              </Link>
              <Link href="/foundry/process" className="text-primary hover:underline">
                Casting processes
              </Link>
              <Link href="/infrastructure" className="text-primary hover:underline">
                Foundry infrastructure
              </Link>
              <Link href="/contact" className="text-primary hover:underline">
                Contact our manufacturing team
              </Link>
            </div>
          </nav>

          {/* Call to Action */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Ready to Transform Your Manufacturing?
            </h2>
            <p className="text-gray-600 mb-6 leading-[1.6]">
              Discover how our advanced steel casting technology can revolutionize your manufacturing process.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-4 py-2 text-sm text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white rounded transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}
