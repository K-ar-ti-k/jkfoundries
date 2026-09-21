import Link from "next/link";
import ProductCatalog from "@/components/ProductCatalog";
import { getProducts } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { itemListJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Steel Cast Components for Trucks and Industry",
  description:
    "Explore JK Foundry's steel cast components for trucks, trolleys, industrial equipment, and general engineering applications across India.",
  alternates: { canonical: "/products" },
  ...pageSocialMetadata(
    "Steel Cast Components for Trucks and Industry | JK Foundry",
    "Explore JK Foundry's steel cast components for trucks, trolleys, industrial equipment, and general engineering applications across India.",
    "/products",
  ),
};

export default async function ProductsPage() {
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
      "/products",
      "Steel Cast Components for Trucks and Industry",
      "Steel cast components for trucks, trolleys, industrial equipment, and general engineering applications across India.",
    ),
    itemListJsonLd(
      "/products",
      "Steel Cast Components",
      products.map((product) => ({ name: product.name, url: "/products", image: product.image })),
    ),
  ];

  return (
    <div className="min-h-screen">
      {schemas.map((schema, index) => <JsonLd key={index} data={schema} />)}
      {/* Hero Section */}
      <section className="bg-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              Our <span className="text-primary">Products</span>
            </h1>
            <p className="text-xl">
              Steel cast components for trucks, trolleys, industrial equipment, and general engineering
            </p>
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ProductCatalog products={serializableProducts} />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-montserrat mb-6">
            Need Custom Cast Components?
          </h2>
          <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
            We manufacture customized steel castings to meet your drawings,
            specifications, and production requirements. Contact us to discuss
            your application, <Link href="/foundry/process" className="text-primary underline underline-offset-4">review our casting processes</Link>, or request samples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
            >
              Request Samples
            </Link>
            <a
              href="https://wa.me/917906209355"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors inline-block"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
