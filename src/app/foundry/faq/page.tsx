import { getQAContent } from "@/lib/firebase/firestore";
import type { QAItem } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

const defaultFaqs: QAItem[] = [
  {
    question: "What does JK Foundry manufacture?",
    answer:
      "JK Foundry manufactures precision steel cast components for trucks, trolleys, industrial equipment, and general engineering. Product specifications, materials, weights, and production requirements are reviewed for each project.",
  },
  {
    question: "Where is JK Foundry located?",
    answer:
      "JK Foundry is based at 1292/115, Shobha Nagar, Foundry Nagar, Agra, Uttar Pradesh 282006, India. The team supplies steel casting solutions for customers across India.",
  },
  {
    question: "Which steel casting moulding processes does JK Foundry use?",
    answer:
      "JK Foundry uses green sand moulding, shell moulding, and CO2 moulding. The recommended process depends on the component's geometry, weight, dimensional requirements, surface finish, production quantity, and application.",
  },
  {
    question: "What is the typical weight range for each moulding process?",
    answer:
      "JK Foundry produces steel castings from approximately 0.5 kg to 150 kg. The suitable moulding process and final casting weight are confirmed after reviewing the component drawing, geometry, material, and production requirements.",
  },
  {
    question: "What is JK Foundry's minimum order quantity?",
    answer:
      "JK Foundry's minimum order quantity is 10 tons. The exact production schedule is planned according to the part design, material grade, casting weight, batch size, tooling requirements, and delivery timeline.",
  },
  {
    question: "Which materials and steel grades does JK Foundry cast?",
    answer:
      "JK Foundry works with low-carbon steel, mild steel, and different steel grades selected for the customer's application. Grade requirements can include 1030 and applicable ISO specifications, subject to technical review and the customer's drawing or material standard.",
  },
  {
    question: "Can JK Foundry produce complex or close-tolerance steel castings?",
    answer:
      "Yes. Shell moulding is used for small and intricate components requiring strong dimensional control, while green sand and CO2 moulding are selected for other sizes and geometry requirements. Machining allowance and inspection requirements are agreed during technical review.",
  },
  {
    question: "What quality certifications does JK Foundry hold?",
    answer:
      "JK Foundry's published certifications include ISO 9001:2015 for quality management, ISO 14001:2015 for environmental management, ISO 45001:2018 for occupational health and safety, and ZED Certification for Zero Defect Zero Effect manufacturing.",
  },
  {
    question: "How does JK Foundry control steel casting quality?",
    answer:
      "Quality is controlled through documented process procedures, inspection protocols, testing standards, defect prevention, continuous improvement, and batch-level traceability. Quality plans and reporting can be aligned with the customer's requirements where applicable.",
  },
  {
    question: "Does JK Foundry provide pattern making, heat treatment, or machining support?",
    answer:
      "The manufacturing workflow covers pattern making, melting, moulding, heat treatment, machining support, and final inspection. The required combination of services is confirmed from the component drawing, material specification, finish requirements, and delivery plan.",
  },
  {
    question: "How can I request a steel casting quotation from JK Foundry?",
    answer:
      "Send the component drawing or 3D model, material requirement, estimated weight, annual or batch quantity, inspection expectations, and delivery location through the Contact page. JK Foundry can then review feasibility, moulding method, quality requirements, and lead time.",
  },
  {
    question: "What is JK Foundry's typical lead time for orders?",
    answer:
      "Lead time depends on the order quantity and the complexity of the part because JK Foundry provides highly customizable casting solutions. Tooling or pattern requirements, material grade, casting weight, inspection needs, and production volume are reviewed before a delivery schedule is confirmed.",
  },
  {
    question: "Can I request product samples or discuss a new component?",
    answer:
      "Yes. Use the Request Samples or Contact form to share your component requirements. You can also contact JK Foundry at +91 7895679965 or crm@jkfoundries.com to discuss samples, drawings, quality plans, and production timelines.",
  },
  {
    question: "How can I follow JK Foundry online?",
    answer:
      "JK Foundry shares company updates through X at @JkFoundry, Instagram at @jk.foundry, and the JK Foundry pages on Facebook and LinkedIn. The official profile links are available through the social links on this website.",
  },
];

export const metadata = {
  title: "Foundry FAQ | Steel Casting Quality and Inspection",
  description:
    "Read common questions about JK Foundry's steel casting quality assurance, inspection, process control, traceability, and certifications.",
  alternates: { canonical: "/foundry/q-a" },
  ...pageSocialMetadata("Foundry FAQ | Steel Casting Quality and Inspection", "Read common questions about JK Foundry's steel casting quality assurance, inspection, process control, traceability, and certifications.", "/foundry/q-a"),
};

export default async function FoundryQAPage() {
  const content = await getQAContent();

  const title = content?.title || "Steel Casting FAQs | JK Foundry";
  const description = content?.description || "Find clear answers about JK Foundry's steel casting processes, moulding methods, quality certifications, applications, quotations, samples, and contact details.";
  const savedItems = (content?.items || []).map((item, index) =>
    index === 0 || item.question.trim().toLowerCase() === defaultFaqs[0].question.toLowerCase()
      ? { ...item, answer: defaultFaqs[0].answer }
      : item,
  );
  const savedQuestions = new Set(savedItems.map((item) => item.question.trim().toLowerCase()));
  const items = [
    ...savedItems,
    ...defaultFaqs.filter(
      (item) => !savedQuestions.has(item.question.trim().toLowerCase()),
    ),
  ];

  return (
    <div className="min-h-screen bg-white">
      <JsonLd data={webPageJsonLd(
        "/foundry/q-a",
        "Foundry Quality Assurance",
        "JK Foundry quality assurance, inspection, process control, traceability, and certifications.",
      )} />
      <JsonLd data={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Foundry", path: "/foundry" },
        { name: "FAQ", path: "/foundry/q-a" },
      ])} />
      <JsonLd data={faqJsonLd(items)} />
      <main className="container mx-auto px-5 py-12 max-w-4xl">
        <h1 className="text-3xl font-montserrat font-semibold text-gray-900 mb-6">{title}</h1>
        <p className="text-gray-600 leading-[1.7] mb-12 text-lg">
          {description}
        </p>

        <div className="space-y-6">
            {items.map((item, index) => (
              <article key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:shadow-sm transition-shadow">
                <h3 className="text-xl font-semibold font-montserrat text-gray-900 mb-3 flex items-start">
                  <span className="text-primary mr-3 text-2xl leading-none">Q.</span>
                  {item.question}
                </h3>
                <div className="flex items-start">
                  <span className="text-gray-400 mr-3 text-2xl font-bold leading-none">A.</span>
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
      </main>
    </div>
  );
}
