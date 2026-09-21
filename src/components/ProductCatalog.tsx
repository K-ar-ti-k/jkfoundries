"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/firebase/firestore";

const categories = ["all", "greenSandMoulding", "shellMoulding", "co2Moulding"];
const categoryLabels: Record<string, string> = {
  all: "All Products",
  greenSandMoulding: "Green Sand Moulding",
  shellMoulding: "Shell Moulding",
  co2Moulding: "CO2 Moulding",
};

export default function ProductCatalog({ products }: { products: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {categoryLabels[category]}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={`${product.name} steel cast component`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {categoryLabels[product.category] || product.category}
                </div>
                <h2 className="text-lg font-semibold font-montserrat mb-2">
                  {product.id ? (
                    <Link href={`/products/${product.id}`} className="hover:text-primary">
                      {product.name}
                    </Link>
                  ) : product.name}
                </h2>
                <p className="text-sm text-secondary mb-2">Material: {product.material}</p>
                <p className="text-sm text-secondary mb-4">Weight: {product.weight}</p>
                <Link
                  href={`/contact?sample=1&product=${encodeURIComponent(product.name)}`}
                  className="text-primary font-medium hover:underline text-sm"
                >
                  Request Samples
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
