"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { getProducts, deleteProduct, Product } from "@/lib/firebase/firestore";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const loadProducts = useCallback(async () => {
    try {
      const allProducts = await getProducts();
      setProducts(
        selectedCategory === "all"
          ? allProducts
          : allProducts.filter((p) => p.category === selectedCategory)
      );
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);
  
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleteLoading(id);
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setDeleteLoading(null);
    }
  };

  const categories = ["all", "greenSandMoulding", "shellMoulding", "co2Moulding"];
  const categoryLabels: Record<string, string> = {
    all: "All Products",
    greenSandMoulding: "Green Sand Moulding",
    shellMoulding: "Shell Moulding",
    co2Moulding: "CO₂ Moulding",
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-montserrat text-gray-900">
          Products
        </h1>
        <Link
          href="/admin/products/new"
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          + New Product
        </Link>
      </div>

      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {categoryLabels[cat]}
            </option>
          ))}
        </select>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 mb-4">No products found.</p>
          <Link href="/admin/products/new" className="text-primary hover:underline">
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 relative">
                <img
                  src={product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold font-montserrat text-gray-900 mb-2">
                  {product.name}
                </h3>
                <div className="text-sm text-gray-600 mb-2">
                  <p><strong>Material:</strong> {product.material}</p>
                  <p><strong>Weight:</strong> {product.weight}</p>
                  <p><strong>Category:</strong> {product.category}</p>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    disabled={deleteLoading === product.id}
                    className="flex-1 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                  >
                    {deleteLoading === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

