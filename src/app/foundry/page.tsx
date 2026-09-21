import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Steel Foundry Capabilities in India",
  description:
    "Explore JK Foundry's steel casting products, manufacturing process, infrastructure, and quality capabilities for industrial applications.",
  alternates: { canonical: "/foundry" },
  ...pageSocialMetadata(
    "Steel Foundry Capabilities in India | JK Foundry",
    "Explore JK Foundry's steel casting products, manufacturing process, infrastructure, and quality capabilities for industrial applications.",
    "/foundry",
  ),
};

export default function FoundryIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={webPageJsonLd(
        "/foundry",
        "Steel Foundry Capabilities",
        "JK Foundry steel casting products, manufacturing process, infrastructure, and quality capabilities.",
      )} />
      <main className="container mx-auto px-5 py-12">
        <h1 className="text-3xl font-montserrat font-semibold text-gray-900 mb-6">Foundry</h1>
        <p className="text-gray-600 mb-8">
          Explore our foundry capabilities and standards across products, infrastructure, processes, and quality assurance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/foundry/overview" className="border rounded-lg p-5 hover:border-gray-900 transition-colors">
            <h2 className="text-xl font-medium text-gray-900">Overview</h2>
            <p className="text-gray-600 mt-2">High-level summary of our foundry.</p>
          </Link>
          <Link href="/foundry/products" className="border rounded-lg p-5 hover:border-gray-900 transition-colors">
            <h2 className="text-xl font-medium text-gray-900">Products</h2>
            <p className="text-gray-600 mt-2">Core product lines and specifications.</p>
          </Link>
          <Link href="/foundry/infrastructure" className="border rounded-lg p-5 hover:border-gray-900 transition-colors">
            <h2 className="text-xl font-medium text-gray-900">Infrastructure</h2>
            <p className="text-gray-600 mt-2">Facilities, equipment, and capacity.</p>
          </Link>
          <Link href="/foundry/q-a" className="border rounded-lg p-5 hover:border-gray-900 transition-colors">
            <h2 className="text-xl font-medium text-gray-900">Q / A</h2>
            <p className="text-gray-600 mt-2">Quality assurance, certifications, and standards.</p>
          </Link>
          <Link href="/foundry/process" className="border rounded-lg p-5 hover:border-gray-900 transition-colors">
            <h2 className="text-xl font-medium text-gray-900">Process</h2>
            <p className="text-gray-600 mt-2">End-to-end manufacturing workflows.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
