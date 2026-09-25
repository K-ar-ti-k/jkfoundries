import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/lib/blog";

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error loading admin blog posts:", error);
    return NextResponse.json(
      { error: "Unable to load blog posts" },
      { status: 500 },
    );
  }
}
