"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/firebase/firestore";

const categories = ["all", "greenSandMoulding", "shellMoulding", "co2Moulding"];
const categoryLabels: Record<string, string> = {
  all: "All Products",
  greenSandMoulding: "Green Sand Moulding",
  shellMoulding: "Shell Moulding",
  co2Moulding: "CO2 Moulding",
};

export default function FoundryProductCatalog({ products }: { products: Product[] }) {
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
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-64 bg-gray-100">
                <Image
                  src={product.image || "/placeholder.jpg"}
                  alt={`${product.name} steel cast component`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {categoryLabels[product.category] || product.category}
                </div>
                <h2 className="text-xl font-bold font-montserrat text-gray-900 mb-3">
                  {product.id ? (
                    <Link href={`/products/${product.id}`} className="hover:text-primary">
                      {product.name}
                    </Link>
                  ) : product.name}
                </h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between border-b pb-2">
                    <span className="font-medium">Material:</span>
                    <span>{product.material}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Weight:</span>
                    <span>{product.weight}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
