import Image from "next/image";
import Link from "next/link";
import { getVASContent } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { serviceJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Pattern, Mould, and Die Making Services",
  description:
    "JK Foundry designs and manufactures patterns, moulds, and dies for accurate, repeatable steel casting production.",
  alternates: { canonical: "/value-added-services/pattern-mould-die-making" },
  ...pageSocialMetadata(
    "Pattern, Mould, and Die Making Services",
    "JK Foundry designs and manufactures patterns, moulds, and dies for accurate, repeatable steel casting production.",
    "/value-added-services/pattern-mould-die-making",
  ),
};

const defaultFeatures = [
  { title: "Pattern development", description: "Pattern planning aligned to part geometry, draft, shrinkage, machining allowance, and repeat production." },
  { title: "Mould preparation", description: "Moulding support for clean cavities, consistent dimensions, and reliable metal flow." },
  { title: "Die and tooling support", description: "Tooling coordination for repeatable production and practical component manufacture." },
  { title: "Design-to-foundry review", description: "Technical review of drawings, material, tolerances, and casting requirements before production." },
];

const processSteps = [
  ["01", "Review the component", "We study the drawing, 3D model, material grade, quantity, and critical dimensions."],
  ["02", "Plan the tooling", "Pattern, mould, die, draft, shrinkage, and machining allowances are considered together."],
  ["03", "Prepare for casting", "Tooling is checked against the casting route to support clean filling and repeatable results."],
  ["04", "Refine for production", "Feedback from trial parts and inspection helps improve fitment, finish, and consistency."],
];

export default async function PatternMouldDieMakingPage() {
  const content = await getVASContent("pattern-mould-die-making");

  const title = content?.title || "Pattern, Mould, and Die Making for Steel Castings";
  const description = content?.description || "Design and fabrication support for patterns, moulds, and dies aligned to foundry requirements, component accuracy, and repeatable steel casting production.";
  const imageSrc = content?.imageSrc || "/DieMake.jpg";
  const featureItems = content?.features?.length
    ? content.features.map((feature) => ({ title: feature, description: "Planned around your component drawing, material, production quantity, and inspection requirements." }))
    : defaultFeatures;

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={serviceJsonLd("/value-added-services/pattern-mould-die-making", title, description)} />

      <section className="border-b border-[#cbd8dc] bg-[#e8eef0] text-[#263238]">
        <div className="mx-auto grid min-h-[420px] max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="mb-5 h-1 w-16 bg-primary" />
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-[#59717a]">Tooling and production support</p>
            <h1 className="font-montserrat text-4xl font-bold leading-tight text-[#263238] md:text-6xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">{description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-md bg-primary px-6 py-3 font-semibold text-[#241f1d] transition-transform hover:-translate-y-0.5">Discuss your requirement</Link>
              <Link href="/foundry/casting-process" className="rounded-md border border-[#59717a] px-6 py-3 font-semibold text-[#263238] transition-colors hover:border-primary hover:text-primary">View casting process</Link>
            </div>
          </div>
          <div className="hidden border-l-4 border-primary pl-8 lg:block"><p className="text-sm uppercase tracking-[0.18em] text-[#59717a]">From drawing to tooling</p><p className="mt-4 text-2xl font-semibold leading-snug text-[#263238]">Practical patterns and moulds for repeatable casting production.</p></div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="relative aspect-[4/3] min-h-[280px] overflow-hidden border-8 border-[#e8eef0]"><Image src={imageSrc} alt="JK Foundry pattern and mould making service" fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" /></div>
            <div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#59717a]">Tooling that fits the part</p><h2 className="mt-4 font-montserrat text-3xl font-bold text-[#263238] md:text-4xl">Build accuracy into the casting route.</h2><p className="mt-5 text-lg leading-8 text-gray-600">Good tooling starts with a clear understanding of the component. We coordinate pattern, mould, and die requirements with the casting method, material, quantity, and downstream machining needs.</p></div>
          </div>
        </section>

        <section className="bg-[#f3f7f8]"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20"><div className="mb-10 max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#59717a]">Capabilities</p><h2 className="mt-3 font-montserrat text-3xl font-bold text-[#263238] md:text-4xl">Tooling designed for repeatability.</h2></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{featureItems.map((feature, index) => <article key={`${feature.title}-${index}`} className="border-l-4 border-primary bg-white p-6 shadow-sm transition-transform hover:-translate-y-1"><span className="font-mono text-sm font-semibold text-[#59717a]">0{index + 1}</span><h3 className="mt-4 font-montserrat text-xl font-semibold text-[#263238]">{feature.title}</h3><p className="mt-3 leading-7 text-gray-600">{feature.description}</p></article>)}</div></div></section>

        <section className="bg-[#f7f3ef]"><div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-24"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#59717a]">A controlled tooling workflow</p><h2 className="mt-4 font-montserrat text-3xl font-bold text-[#263238] md:text-4xl">From component review to production-ready tooling</h2><div className="mt-8 space-y-6">{processSteps.map(([number, stepTitle, stepDescription]) => <div key={number} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-[#241f1d]">{number}</span><div><h3 className="font-montserrat text-lg font-semibold text-[#263238]">{stepTitle}</h3><p className="mt-1 leading-7 text-gray-600">{stepDescription}</p></div></div>)}</div></div><div className="relative min-h-[360px] overflow-hidden border-8 border-white"><Image src="/GreenSand.jpg" alt="JK Foundry mould preparation for steel castings" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div></div></section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"><div className="border-t-4 border-primary bg-[#263238] px-6 py-10 text-white sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b8cbd0]">Ready to develop a component?</p><h2 className="mt-4 max-w-3xl font-montserrat text-3xl font-bold text-[#b8cb8d] md:text-4xl">Share your drawing and tooling requirements.</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-[#dbe6e8]">Send your drawing or 3D model, material specification, estimated quantity, and tolerance requirements. Our team can review the tooling route and recommend the right next step.</p></div><Link href="/contact" className="mt-8 inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-6 py-3 font-semibold text-[#241f1d] transition-transform hover:-translate-y-0.5 lg:mt-0">Talk to our team <span className="ml-2" aria-hidden="true">-&gt;</span></Link></div></section>
      </main>
    </div>
  );
}
