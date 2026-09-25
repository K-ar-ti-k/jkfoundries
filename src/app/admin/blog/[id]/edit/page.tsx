"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogPostById, updateBlogPost } from "@/lib/firebase/firestore";
import { uploadImage } from "@/lib/firebase/storage";
import { createShortSlug } from "@/lib/slug";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url" | "public">("public");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    content: "",
    slug: "",
    image: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const blogPost = await getBlogPostById(id);
        if (!blogPost) {
          router.push("/admin/blog");
          return;
        }
        setFormData({
          title: blogPost.title,
          excerpt: blogPost.excerpt,
          category: blogPost.category,
          content: blogPost.content,
          slug: blogPost.slug,
          image: blogPost.image,
        });
        setImagePreview(blogPost.image);
        
        // Determine initial image mode
        if (blogPost.image.startsWith("http")) {
          if (blogPost.image.includes("firebasestorage")) {
            setImageMode("upload");
          } else {
            setImageMode("url");
          }
        } else {
          setImageMode("public");
        }
      } catch (error) {
        console.error("Error loading blog post:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title"
        ? {
            slug: createShortSlug(value),
          }
        : {}),
    }));
    if (name === "image" && (imageMode === "url" || imageMode === "public")) {
      setImagePreview(value);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = formData.image;
      
      // Upload new image if file is selected
      if (imageMode === "upload" && imageFile) {
        const imagePath = `blog/${Date.now()}_${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, imagePath);
      }

      await updateBlogPost(id, {
        ...formData,
        image: imageUrl,
      });

      router.push("/admin/blog");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error updating blog post:", error);
      alert(`Failed to update blog post: ${message}`);
    } finally {
      setSaving(false);
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
      <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-8">
        Edit Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt *
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image *
          </label>
          <div className="mb-4 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => {
                setImageMode("public");
                setImagePreview(formData.image);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                imageMode === "public"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Public Folder
            </button>
            <button
              type="button"
              onClick={() => {
                setImageMode("url");
                setImagePreview(formData.image);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                imageMode === "url"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Paste URL
            </button>
            <button
              type="button"
              onClick={() => {
                setImageMode("upload");
                setImagePreview("");
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                imageMode === "upload"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Upload File
            </button>
          </div>

          {(imageMode === "public" || imageMode === "url") ? (
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              placeholder={imageMode === "public" ? "/blog.jpg" : "https://example.com/image.jpg"}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          )}

          {imagePreview && (
            <div className="mt-4 w-full h-64 border border-gray-200 rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content * (Markdown supported)
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows={20}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-mono text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

