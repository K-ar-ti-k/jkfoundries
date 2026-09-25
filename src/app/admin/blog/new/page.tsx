"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/firebase/firestore";
import { uploadImage } from "@/lib/firebase/storage";
import { createShortSlug } from "@/lib/slug";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url" | "public">("public");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imagePath, setImagePath] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    content: "",
    slug: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = createShortSlug(value);
      setFormData((prev) => ({ ...prev, slug }));
    }

    if (name === "title" || name === "excerpt" || name === "content") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
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
    setLoading(true);

    try {
      let finalImageUrl = "";
      
      if (imageMode === "public") {
        finalImageUrl = imagePath.trim() || "/placeholder.jpg";
        if (!imagePath.trim()) {
          alert("Please enter an image path (e.g., /blog.jpg)");
          setLoading(false);
          return;
        }
      } else if (imageMode === "url") {
        finalImageUrl = imageUrl.trim();
        if (!finalImageUrl) {
          alert("Please enter a valid image URL");
          setLoading(false);
          return;
        }
      } else {
        // Upload image
        if (imageFile) {
          const uploadPath = `blog/${Date.now()}_${imageFile.name}`;
          finalImageUrl = await uploadImage(imageFile, uploadPath);
        } else {
          alert("Please select an image to upload");
          setLoading(false);
          return;
        }
      }

      // Ensure slug is properly formatted
      const formattedSlug = formData.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "");
      
      if (!formattedSlug) {
        alert("Please provide a valid slug");
        setLoading(false);
        return;
      }

      const blogPostData = {
        ...formData,
        slug: formattedSlug,
        image: finalImageUrl,
        date: new Date().toISOString().split("T")[0],
      };

      console.log("Creating blog post with data:", blogPostData);
      
      const postId = await createBlogPost(blogPostData);
      console.log("Blog post created with ID:", postId);

      router.push("/admin/blog");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error creating blog post:", error);
      alert(`Failed to create blog post: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-8">
        New Blog Post
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
            placeholder="auto-generated-from-title"
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
            placeholder="e.g., Technology, Manufacturing"
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
            placeholder="Short description of the blog post"
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
                setImagePreview(imagePath);
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
                setImagePreview(imageUrl);
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

          {imageMode === "public" && (
            <div>
              <input
                type="text"
                value={imagePath}
                onChange={(e) => {
                  setImagePath(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="/blog.jpg or /images/my-image.jpg"
                required={imageMode === "public"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter path to image in public folder (e.g., /blog.jpg)
              </p>
            </div>
          )}

          {imageMode === "url" && (
            <div>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="https://example.com/image.jpg"
                required={imageMode === "url"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              />
              <p className="mt-2 text-sm text-gray-500">
                Paste a direct link to an image
              </p>
            </div>
          )}

          {imageMode === "upload" && (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={imageMode === "upload"}
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
            placeholder="Write your blog post content in Markdown..."
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Post"}
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
