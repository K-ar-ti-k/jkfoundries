import Image from "next/image";
import Link from "next/link";
import { getVASContent } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { serviceJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Machinery and CNC Services for Cast Components",
  description:
    "Discover JK Foundry's precision machining, finishing, and assembly capabilities for steel cast components.",
  alternates: { canonical: "/value-added-services/machinery-services" },
  ...pageSocialMetadata(
    "Machinery and CNC Services for Cast Components",
    "Discover JK Foundry's precision machining, finishing, and assembly capabilities for steel cast components.",
    "/value-added-services/machinery-services",
  ),
};

const defaultFeatures = [
  { title: "CNC machining support", description: "Machining coordination for bores, faces, slots, and drawing-specific requirements." },
  { title: "Fettling and finishing", description: "Controlled removal of gates, risers, flash, and excess material for clean castings." },
  { title: "Dimensional preparation", description: "Inspection-ready finishing with attention to allowances, datum surfaces, and fitment." },
  { title: "Assembly support", description: "Additional finishing and component preparation to simplify production and dispatch." },
];

const processSteps = [
  ["01", "Review the drawing", "We review drawings, tolerances, material grade, quantity, and finish requirements."],
  ["02", "Plan the route", "The team aligns casting allowances, machining operations, inspection points, and delivery needs."],
  ["03", "Finish and inspect", "Parts are fettled, machined, and checked against the agreed technical requirements."],
  ["04", "Prepare for dispatch", "Finished components are packed with the required documentation and traceability details."],
];

export default async function MachineryServicesPage() {
  const content = await getVASContent("machinery-services");

  const title = content?.title || "Machinery Services for Finished Cast Components";
  const description = content?.description || "Precision machining, finishing, and assembly support that brings steel cast components from the foundry floor to your final production specification.";
  const imageSrc = content?.imageSrc || "/Smaller-CNC.jpg";
  const featureItems = content?.features?.length
    ? content.features.map((feature) => ({ title: feature, description: "Built around your component drawing, production volume, and inspection requirements." }))
    : defaultFeatures;

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={serviceJsonLd("/value-added-services/machinery-services", title, description)} />

      <section className="bg-[#f7f3ef] text-[#333333]">
        <div className="mx-auto grid min-h-[420px] max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-primary">Value-added services</p>
            <h1 className="font-montserrat text-4xl font-bold leading-tight text-[#333333] md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-full bg-primary px-6 py-3 font-semibold text-[#241f1d] transition-transform hover:-translate-y-0.5">Discuss your requirement</Link>
              <Link href="/foundry/casting-process" className="rounded-full border border-[#333333]/30 px-6 py-3 font-semibold text-[#333333] transition-colors hover:border-primary hover:text-primary">View casting process</Link>
            </div>
          </div>
          <div className="hidden border-l border-[#333333]/20 pl-8 lg:block"><p className="text-sm uppercase tracking-[0.18em] text-primary">From casting to completion</p><p className="mt-4 text-2xl font-semibold leading-snug text-[#333333]">One coordinated route for cleaner, more consistent components.</p></div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">What we support</p><h2 className="mt-4 font-montserrat text-3xl font-bold text-[#333333] md:text-4xl">Machining and finishing aligned to the part.</h2><p className="mt-5 text-lg leading-8 text-gray-600">Our value-added machinery services help reduce handoffs between casting, finishing, inspection, and your own production line. Share the component drawing and we can help define a practical route to the finished part.</p></div>
            <div className="relative aspect-[4/3] min-h-[280px] overflow-hidden">
              <Image src={imageSrc} alt="JK Foundry machinery and finishing facility" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {featureItems.map((feature, index) => <article key={`${feature.title}-${index}`} className="border border-gray-200 p-6 transition-colors hover:border-primary"><span className="text-sm font-semibold text-primary">0{index + 1}</span><h3 className="mt-4 font-montserrat text-xl font-semibold text-[#333333]">{feature.title}</h3><p className="mt-3 leading-7 text-gray-600">{feature.description}</p></article>)}
          </div>
        </section>

        <section className="bg-[#f7f3ef]"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-24"><div className="relative min-h-[360px] overflow-hidden"><Image src="/quality-control.webp" alt="JK Foundry quality control for cast components" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">A controlled workflow</p><h2 className="mt-4 font-montserrat text-3xl font-bold text-[#333333] md:text-4xl">From drawing review to dispatch</h2><div className="mt-8 space-y-6">{processSteps.map(([number, stepTitle, stepDescription]) => <div key={number} className="flex gap-4"><span className="shrink-0 pt-1 text-sm font-bold text-primary">{number}</span><div><h3 className="font-montserrat text-lg font-semibold text-[#333333]">{stepTitle}</h3><p className="mt-1 leading-7 text-gray-600">{stepDescription}</p></div></div>)}</div></div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Built for industrial requirements</p><h2 className="mt-4 max-w-3xl font-montserrat text-3xl font-bold text-[#333333] md:text-4xl">Need a finished cast component, not just a casting?</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">Send us your drawing, material specification, estimated quantity, and inspection expectations. Our team will review the right combination of casting, machinery, finishing, and quality support.</p></div><Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-[#241f1d] transition-transform hover:-translate-y-0.5">Talk to our team <span className="ml-2" aria-hidden="true">-&gt;</span></Link></div></section>
      </main>
    </div>
  );
}
