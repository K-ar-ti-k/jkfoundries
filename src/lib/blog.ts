import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { getBlogPosts, type BlogPost } from "@/lib/firebase/firestore";

const blogDirectory = path.join(process.cwd(), "content", "blog");

async function getLocalBlogPosts(): Promise<BlogPost[]> {
  try {
    const files = await fs.readdir(blogDirectory);
    const markdownFiles = files.filter((file) => file.endsWith(".md"));

    return await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(blogDirectory, file);
        const source = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(source);
        const slug = file.replace(/\.md$/, "");

        return {
          id: `local:${slug}`,
          title: String(data.title || slug),
          excerpt: String(data.excerpt || ""),
          image: String(data.image || "/placeholder.jpg"),
          date: String(data.date || new Date().toISOString().split("T")[0]),
          category: String(data.category || "Foundry").trim(),
          content,
          slug,
        };
      }),
    );
  } catch (error) {
    console.error("Error loading local blog posts:", error);
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const [localPosts, firebasePosts] = await Promise.all([
    getLocalBlogPosts(),
    getBlogPosts(),
  ]);
  const postsBySlug = new Map<string, BlogPost>();

  for (const post of [...localPosts, ...firebasePosts]) {
    postsBySlug.set(post.slug, post);
  }

  return Array.from(postsBySlug.values()).sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug?.toLowerCase() === slug.toLowerCase()) || null;
}
