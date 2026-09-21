"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getBlogPosts, deleteBlogPost, BlogPost } from "@/lib/firebase/firestore";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const blogPosts = await getBlogPosts();
      setPosts(blogPosts);
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    setDeleteLoading(id);
    try {
      await deleteBlogPost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Failed to delete blog post");
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-montserrat text-gray-900">
          Blog Posts
        </h1>
        <Link
          href="/admin/blog/new"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 mb-4">No blog posts found.</p>
          <Link
            href="/admin/blog/new"
            className="text-primary hover:underline"
          >
            Create your first blog post
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-48 h-48 relative flex-shrink-0">
                  <img
                    src={post.image || "/placeholder.jpg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold font-montserrat text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id!)}
                      disabled={deleteLoading === post.id}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                    >
                      {deleteLoading === post.id ? "Deleting..." : "Delete"}
                    </button>
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="px-4 py-2 border border-black text-gray-700 rounded-lg hover:bg-black hover:text-white transition-colors"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

