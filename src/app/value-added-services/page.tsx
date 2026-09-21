import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Value-Added Foundry Services | JK Foundry India",
  description:
    "Explore JK Foundry's machining, finishing, pattern, mould, and die-making services that support complete casting manufacturing requirements.",
  alternates: { canonical: "/value-added-services" },
  ...pageSocialMetadata("Value-Added Foundry Services | JK Foundry India", "Explore JK Foundry's machining, finishing, pattern, mould, and die-making services that support complete casting manufacturing requirements.", "/value-added-services"),
};

export default function ValueAddedServicesIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={webPageJsonLd(
        "/value-added-services",
        "Value-Added Foundry Manufacturing Services",
        "Machining, finishing, pattern, mould, and die-making services for complete casting manufacturing requirements.",
      )} />
      <main className="container mx-auto px-5 py-12">
        <h1 className="text-3xl font-montserrat font-semibold text-gray-900 mb-6">Value Added Services</h1>
        <p className="text-gray-600 mb-8">
          Complementary services that enhance product readiness and reduce your time-to-manufacture.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/value-added-services/machinery-services" className="border rounded-lg p-5 hover:border-gray-900 transition-colors">
            <h2 className="text-xl font-medium text-gray-900">Machinery Services</h2>
            <p className="text-gray-600 mt-2">Precision machining, finishing, and assembly support.</p>
          </Link>
          <Link href="/value-added-services/pattern-mould-die-making" className="border rounded-lg p-5 hover:border-gray-900 transition-colors">
            <h2 className="text-xl font-medium text-gray-900">Pattern &amp; Mould &amp; Die Making</h2>
            <p className="text-gray-600 mt-2">Design and manufacture of tooling, moulds, and dies.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
