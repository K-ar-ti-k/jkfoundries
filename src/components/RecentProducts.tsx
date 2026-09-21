"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/firebase/firestore";

const categoryLabels: Record<string, string> = {
  greenSandMoulding: "Green Sand Moulding",
  shellMoulding: "Shell Moulding",
  co2Moulding: "CO2 Moulding",
};

export default function RecentProducts({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gray-100">
              <Image
                src={product.image || "/placeholder.jpg"}
                alt={`${product.name} steel cast component`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                {categoryLabels[product.category] || product.category}
              </div>
              <h3 className="text-lg font-semibold font-montserrat mb-2">
                {product.id ? <Link href={`/products/${product.id}`} className="hover:text-primary">{product.name}</Link> : product.name}
              </h3>
              <p className="text-sm text-secondary mb-1">Material: {product.material}</p>
              <p className="text-sm text-secondary mb-4">Weight: {product.weight}</p>
              <Link href={product.id ? `/products/${product.id}` : "/foundry/products"} className="text-primary font-medium hover:underline text-sm">
                View details &rarr;
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12 text-secondary">
          No products found. Please check back later.
        </div>
      )}
    </div>
  );
}
