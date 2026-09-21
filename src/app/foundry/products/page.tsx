import Link from "next/link";
import FoundryProductCatalog from "@/components/FoundryProductCatalog";
import { getProducts } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Foundry Products | Steel Cast Components",
  description:
    "Browse JK Foundry's steel cast components and product lines for trucks, trolleys, industrial equipment, and general engineering.",
  alternates: { canonical: "/foundry/products" },
  ...pageSocialMetadata("Foundry Products | Steel Cast Components | JK Foundry", "Browse JK Foundry's steel cast components and product lines for trucks, trolleys, industrial equipment, and general engineering.", "/foundry/products"),
};

export default async function FoundryProductsPage() {
  const products = await getProducts();
  const serializableProducts = products.map(({ id, name, material, weight, image, category }) => ({
    id,
    name,
    material,
    weight,
    image,
    category,
  }));
  const schemas = [
    webPageJsonLd(
      "/foundry/products",
      "Foundry Products",
      "Steel cast components and product lines for trucks, trolleys, industrial equipment, and general engineering.",
    ),
    itemListJsonLd(
      "/foundry/products",
      "Foundry Products",
      products.map((product) => ({ name: product.name, url: "/foundry/products", image: product.image })),
    ),
  ];

  return (
    <div className="min-h-screen bg-white">
      {schemas.map((schema, index) => <JsonLd key={index} data={schema} />)}
      <main className="container mx-auto px-5 py-12">
        <h1 className="text-3xl font-montserrat font-semibold text-gray-900 mb-6 mt-10">Foundry Products</h1>
        <p className="text-gray-600 leading-[1.7] mb-8">
          Explore core foundry product lines tailored for industrial applications.
          Detailed specifications and variants are provided on request. Learn
          about our <Link href="/foundry/casting-process" className="text-primary underline underline-offset-4">casting processes</Link> or <Link href="/contact" className="text-primary underline underline-offset-4">contact our manufacturing team</Link>.
        </p>

        <FoundryProductCatalog products={serializableProducts} />
      </main>
    </div>
  );
}
