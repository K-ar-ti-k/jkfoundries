"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/firebase/firestore";
import { uploadImage } from "@/lib/firebase/storage";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    material: "",
    weight: "",
    category: "greenSandMoulding",
    image: "",
  });

  const categories = [
    { value: "greenSandMoulding", label: "Green Sand Moulding" },
    { value: "shellMoulding", label: "Shell Moulding" },
    { value: "co2Moulding", label: "CO₂ Moulding" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "image" && imageMode === "url") {
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
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageMode === "upload" && imageFile) {
        const imagePath = `products/${Date.now()}_${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, imagePath);
      }

      if (!imageUrl) {
        alert("Please provide an image (upload or URL)");
        setLoading(false);
        return;
      }

      await createProduct({
        ...formData,
        image: imageUrl,
      });

      router.push("/admin/products");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unknown error";
      console.error("Error creating product:", error);
      alert(`Failed to create product: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-montserrat text-gray-900 mb-8">
        New Product
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material *
          </label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., WA/BD-4462, Gr. B"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight *
          </label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., 30 Kg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Image *
          </label>
          <div className="flex gap-4 mb-4">
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
          </div>

          {imageMode === "upload" ? (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!formData.image}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            />
          ) : (
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              required
              placeholder="https://example.com/image.jpg"
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

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
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

