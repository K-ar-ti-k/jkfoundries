import Image from "next/image";
import Link from "next/link";
import { getPageContent } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Overview | Best Steel Casting Manufacturer",
  description:
    "Learn about JK Foundry's steel casting manufacturing capabilities, materials, process control, quality systems, and industrial applications.",
  alternates: { canonical: "/foundry/overview" },
  ...pageSocialMetadata("Overview | Best Steel Casting Manufacturer | JK Foundry", "Learn about JK Foundry's steel casting manufacturing capabilities, materials, process control, quality systems, and industrial applications.", "/foundry/overview"),
};

export default async function FoundryOverviewPage() {
  const content = await getPageContent("foundry_overview");
  
  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={webPageJsonLd(
        "/foundry/overview",
        "Foundry Overview",
        "JK Foundry steel casting manufacturing capabilities, materials, process control, quality systems, and industrial applications.",
      )} />
      <main className="container mx-auto px-5 py-12">
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-montserrat font-semibold text-gray-900 mb-4 mt-6">
                {content?.heroTitle || "Precision Steel Castings for Industrial Applications"}
              </h1>
              <p className="text-secondary leading-[1.8]">
                {content?.heroDescription ||
                  "JK Foundry is an Agra-based, ISO-certified steel castings manufacturer for railway, truck, trolley, industrial equipment, and general engineering applications. We combine precision engineering, controlled moulding and melting processes, and rigorous quality assurance to deliver dependable cast components."}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                  Request Samples
                </Link>
                <Link href="/foundry/products" className="text-gray-900 border border-gray-900 px-5 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors">
                  View Products
                </Link>
              </div>
            </div>
            <div className="relative h-56 md:h-80 rounded-lg overflow-hidden shadow-lg">
              <Image src="/overview.webp" alt="JK Foundry quality control" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {(content?.stats && content.stats.length > 0
            ? content.stats
            : [
                { label: "Operational track record", value: "2007+" },
                { label: "Applications focus", value: "Trucks, trolleys & industry" },
                { label: "Certifications", value: "ISO 9001 / 14001 / 45001" },
                { label: "Supply", value: "Reliable high-volume supply" },
              ]
          ).map((s, idx) => (
            <div key={idx} className="border rounded-lg p-5">
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-secondary">{s.label}</div>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-montserrat font-semibold text-gray-900 mb-4">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Materials & Alloys</h3>
              <p className="text-secondary leading-[1.8]">
                Multiple steel grades for heavy industrial components. Material selection guided by
                mechanical performance, durability, and application-specific standards.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Manufacturing Process</h3>
              <p className="text-secondary leading-[1.8]">
                Pattern making, melting, molding, heat treatment, machining support, and final inspection.
                Standard operating procedures ensure consistent outcomes and traceability.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Application Expertise</h3>
              <p className="text-secondary leading-[1.8]">
                Steel castings for truck, trolley, industrial equipment, and general engineering applications.
                Our team collaborates on drawings, material requirements, fitment, and production quality.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">On-Time Supply</h3>
              <p className="text-secondary leading-[1.8]">
                Planning, inventory, and production control systems tuned for dependable delivery schedules.
                Transparent communication and proactive issue resolution.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-montserrat font-semibold text-gray-900 mb-4">Quality & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Process Control</h3>
              <p className="text-secondary leading-[1.8]">
                Inspection protocols, testing standards, and documentation at each stage. Defect prevention through
                disciplined process control and continuous improvement.
              </p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Certifications</h3>
              <ul className="space-y-2 text-secondary">
                {(content?.certifications && content.certifications.length > 0
                  ? content.certifications
                  : [
                      "ISO 9001:2015 — Quality Management",
                      "ISO 14001:2015 — Environmental Management",
                      "ISO 45001:2018 — Occupational Health & Safety",
                      "ZED Certification — Zero Defect Zero Effect",
                    ]
                ).map((c, idx) => (
                  <li key={idx}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-6 border rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Traceability</h3>
            <p className="text-secondary leading-[1.8]">
              Batch-level records and test reports maintained throughout production. Alignment to client QA
              plans and relevant standards where applicable.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-montserrat font-semibold text-gray-900 mb-4">Infrastructure Snapshot</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow">
              <Image src="/infra1.webp" alt="JK Foundry casting unit" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow">
              <Image src="/infra2.webp" alt="JK Foundry fettling unit" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
            <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden shadow">
              <Image src="/unit3.webp" alt="JK Foundry modern manufacturing unit" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
            </div>
          </div>
          <p className="mt-4 text-secondary leading-[1.8]">
            Modern melting, molding, heat treatment, and testing facilities tuned for throughput and consistency.
            See details on our <Link href="/foundry/infrastructure" className="text-gray-900 underline underline-offset-4">Infrastructure</Link> page.
          </p>
        </section>

        <section className="pt-8 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h2 className="text-2xl font-montserrat font-semibold text-gray-900 mb-3">Partner With JK Foundry</h2>
              <p className="text-secondary leading-[1.8]">
                Discuss your product needs, materials, and delivery timelines. Our team will share reference reports,
                QA plans, and capacity information aligned to your requirements.
              </p>
              <div className="mt-6 flex gap-3">
                <Link href="/contact" className="bg-primary text-white px-5 py-2 rounded-md font-medium hover:bg-opacity-90 transition-colors">
                  Get in Touch
                </Link>
                <Link href="/foundry/casting-process" className="text-gray-900 border border-gray-900 px-5 py-2 rounded-md font-medium hover:bg-gray-900 hover:text-white transition-colors">
                  View Our Process
                </Link>
              </div>
            </div>
            <div className="relative h-40 md:h-52 rounded-lg overflow-hidden shadow">
              <Image src="/quality-control.webp" alt="JK Foundry quality inspection" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
