import Link from "next/link";
import Image from "next/image";
import { getProcessContent, ProcessItem } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

type ProcessPresentation = ProcessItem & {
  image: string;
  imageAlt: string;
  processNote: string;
};

const processPresentation: Omit<ProcessPresentation, keyof ProcessItem>[] = [
  {
    image: "/GreenSand.jpg",
    imageAlt: "Green sand moulding process",
    processNote: "A dependable everyday process when flexibility and repeatability matter.",
  },
  {
    image: "/Shell.jpg",
    imageAlt: "Shell moulding process",
    processNote: "Chosen when sharper details and a cleaner as-cast surface are the priority.",
  },
  {
    image: "/Co2.jpg",
    imageAlt: "CO2 moulding process",
    processNote: "Built for larger moulds that need strength, stability, and controlled filling.",
  },
];

export const metadata = {
  title: "Steel Casting Processes",
  description:
    "Learn how JK Foundry uses green sand, shell, and CO2 moulding processes for reliable steel cast components across a wide weight range.",
  alternates: { canonical: "/foundry/process" },
  ...pageSocialMetadata("Steel Casting Processes | JK Foundry", "Learn how JK Foundry uses green sand, shell, and CO2 moulding processes for reliable steel cast components across a wide weight range.", "/foundry/process"),
};

export default async function FoundryProcessPage() {
  const data = await getProcessContent("foundry_process");
  const items = data?.items || null;

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={webPageJsonLd(
        "/foundry/process",
        "Steel Casting Processes",
        "Green sand, shell, and CO2 moulding processes for reliable steel cast components across a wide weight range.",
      )} />
      <main className="container mx-auto px-5 py-12">
        <section className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-montserrat font-semibold text-gray-900 mb-4">
            Our Casting Processes
          </h1>
          <p className="text-secondary leading-[1.8] max-w-3xl mx-auto">
            We use proven moulding technologies to deliver high-quality steel castings across a wide weight range.
            Each process is selected based on component complexity, size, and performance requirements.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(((items && items.length > 0) ? items : [
            {
              name: "Green Sand Moulding",
              emoji: "🟢",
              weightRange: "0.5 – 60 kg",
              description: "Cost-effective and flexible moulding process for medium-sized castings with consistent quality.",
              bullets: ["Good surface finish", "Fast pattern changes", "Suitable for medium batch production"],
              color: "green",
            },
            {
              name: "Shell Moulding",
              emoji: "🟡",
              weightRange: "0.2 – 25 kg",
              description: "High-precision moulding process for small and intricate components.",
              bullets: ["Excellent dimensional accuracy", "Minimal machining allowance", "Ideal for complex geometries"],
              color: "yellow",
            },
            {
              name: "CO₂ Moulding",
              emoji: "🔵",
              weightRange: "50 – 250 kg",
              description: "Robust moulding solution for large and heavy-duty steel castings.",
              bullets: ["Strong mould stability", "Consistent dimensional control", "Suitable for structural applications"],
              color: "blue",
            },
          ])).map((item, idx) => {
            const presentation = processPresentation[idx] || processPresentation[0];
            const colorClass = item.color === "green"
              ? "text-green-600"
              : item.color === "yellow"
              ? "text-yellow-600"
              : "text-blue-600";

            return (
              <article key={idx} className="overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-lg">
                <div className="relative h-52">
                  <Image
                    src={presentation.image}
                    alt={presentation.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-sm font-semibold uppercase tracking-[0.16em] text-white">
                    Stage {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="text-2xl">{item.emoji || "⚙️"}</div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.color === "green"
                          ? "bg-green-100 text-green-700"
                          : item.color === "yellow"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item.weightRange}
                    </span>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-gray-900">{item.name}</h2>
                  <p className="mb-3 text-sm font-medium leading-6 text-gray-700">{presentation.processNote}</p>
                  <p className="mb-4 text-secondary">{item.description}</p>
                  <ul className="space-y-2 text-secondary">
                    {(item.bullets || []).map((b, j) => (
                      <li key={j} className="flex items-center gap-2">
                        <span className={colorClass}>•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mt-10">
          <div className="rounded-xl border p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Selection Guidance</h3>
            <p className="text-secondary leading-[1.8]">
              We recommend the moulding process based on the component&apos;s geometry, weight, tolerances, and batch size.
              Our engineering team collaborates to optimize quality, cost, and lead times for your specific requirements. Explore our <Link href="/foundry/products" className="text-gray-900 underline underline-offset-4">foundry products</Link> or <Link href="/contact" className="text-gray-900 underline underline-offset-4">discuss your component requirements</Link>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
