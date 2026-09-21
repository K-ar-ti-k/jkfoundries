import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { getProducts } from "@/lib/firebase/firestore";
import { siteUrl } from "@/lib/site";

const staticRoutes = [
  "/",
  "/about",
  "/products",
  "/foundry",
  "/foundry/overview",
  "/foundry/products",
  "/foundry/process",
  "/foundry/infrastructure",
  "/foundry/q-a",
  "/infrastructure",
  "/certificates",
  "/partners",
  "/value-added-services",
  "/value-added-services/machinery-services",
  "/value-added-services/pattern-mould-die-making",
  "/blog",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, products] = await Promise.all([getAllBlogPosts(), getProducts()]);

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      changeFrequency: path === "/" ? "weekly" as const : "monthly" as const,
      priority: path === "/" ? 1 : path === "/contact" ? 0.8 : 0.7,
    })),
    ...products
      .filter((product) => product.id)
      .map((product) => ({
        url: `${siteUrl}/products/${product.id}`,
        lastModified: product.updatedAt?.toDate() || product.createdAt?.toDate(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt?.toDate?.() || post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}