import Link from "next/link";
import Image from "next/image";
import { getInfrastructureContent, type InfrastructureUnit as InfrastructureUnitType } from "@/lib/firebase/firestore";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Foundry Infrastructure and Equipment",
  description:
    "Explore JK Foundry's melting, moulding, fettling, heat treatment, testing, and manufacturing facilities for steel cast components.",
  alternates: { canonical: "/infrastructure" },
  ...pageSocialMetadata("Foundry Infrastructure and Equipment | JK Foundry", "Explore JK Foundry's melting, moulding, fettling, heat treatment, testing, and manufacturing facilities for steel cast components.", "/infrastructure"),
};

// Infrastructure Unit Component
const InfrastructureUnit = ({
  title,
  description,
  equipment,
  imageSrc,
}: InfrastructureUnitType) => {
  const localImageAliases: Record<string, string> = {
    "/unit1.jpg": "/unit1.webp",
    "/unit2.jpg": "/unit2.webp",
    "/unit2.jpeg": "/unit2.webp",
    "/unit3.jpg": "/unit3.webp",
  };
  const resolvedImageSrc = localImageAliases[imageSrc] || imageSrc;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Content Section - Left Side */}
        <div className="p-6">
          <h2 className="text-2xl font-bold font-montserrat mb-6 pb-2 border-b border-gray-200">
            {title}
          </h2>
          <p className="text-secondary mb-6">{description}</p>
          <h3 className="text-lg font-semibold font-montserrat mb-4">
            Key Equipment:
          </h3>
          <ul className="space-y-2">
            {equipment.map((item, index) => (
              <li key={index} className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 mt-0.5 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Image Section - Right Side */}
        <div className="relative h-[400px] md:h-full min-h-[400px]">
          <Image
            src={resolvedImageSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default async function InfrastructurePage() {
  const content = await getInfrastructureContent();

  const heroTitle = content?.heroTitle || "Our Infrastructure";
  const heroDescription = content?.heroDescription || "Modern facilities and equipment for steel cast components used in trucks, trolleys, and industrial applications";
  const defaultUnits: InfrastructureUnitType[] = [
    {
      title: "Unit-1: Casting Unit",
      description: "Our primary casting unit is where the magic begins. This facility houses our core casting operations, featuring advanced equipment for producing high-quality steel castings with precision and efficiency.",
      equipment: [
        "Sand mixers for optimal mold preparation",
        "Hand moulding stations for detailed work",
        "Induction furnace with capacity of 500 kg per heat",
        "Overhead cranes for material handling",
        "Quality control testing equipment",
      ],
      imageSrc: "/unit1.webp",
    },
    {
      title: "Unit-2: Fettling Unit",
      description: "Our dedicated fettling unit is where raw castings are refined and finished to meet exact specifications. This unit ensures that every product meets our stringent quality standards before delivery.",
      equipment: [
        "Shot blast machines for surface cleaning",
        "Hand grinders for precision finishing",
        "Welding machines for repairs and modifications",
        "Inspection stations with advanced measuring tools",
        "Packaging and shipping preparation area",
      ],
      imageSrc: "/unit2.webp",
    },
    {
      title: "Unit-3: Casting Unit",
      description: "Unit 3 extends JK Foundry's casting capacity with a dedicated production area for repeatable, high-quality steel castings. The unit supports flexible production planning for custom components while maintaining controlled melting, moulding, handling, and inspection practices.",
      equipment: [
        "Additional induction melting and pouring equipment",
        "Mould preparation and casting workstations",
        "Overhead cranes for safe material handling",
        "Fettling and surface finishing support",
        "Inspection area for dimensional and visual checks",
      ],
      imageSrc: "/unit3.webp",
    },
  ];
  const units = (content?.units || defaultUnits).map((unit, index) =>
    index === 2
      ? {
          ...unit,
          title: defaultUnits[2].title,
          description: defaultUnits[2].description,
          equipment: defaultUnits[2].equipment,
        }
      : unit,
  );

  return (
    <div className="min-h-screen">
      <JsonLd data={webPageJsonLd(
        "/infrastructure",
        "Foundry Infrastructure",
        "JK Foundry melting, moulding, fettling, heat treatment, testing, and manufacturing facilities for steel cast components.",
      )} />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-dark">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/infra.webp"
            alt="Infrastructure Background"
            fill
            className="object-cover opacity-40"
            priority
            quality={80}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6 text-primary drop-shadow-lg">
              {heroTitle}
            </h1>
            <p className="text-xl text-white-200 drop-shadow-lg">
              {heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat mb-6 text-dark">
              Advanced Manufacturing Facilities
            </h2>
            <p className="text-lg text-gray-700">
              JK Foundry operates three specialized units, each equipped with
              modern technology and machinery to ensure consistent, high-quality
              steel cast components for our clients.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {units.map((unit, index) => (
              <InfrastructureUnit
                key={index}
                title={unit.title}
                description={unit.description}
                equipment={unit.equipment}
                imageSrc={unit.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Capacity Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12 text-dark">
            Production Capacity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

            {/* Capacity 4 */}
            <div className="bg-light p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <p className="text-lg font-semibold font-montserrat mb-2 text-dark">
                Happy Clients
              </p>
              <p className="text-gray-700">Trusted by businesses across industries</p>
            </div>

            {/* Capacity 2 */}
            <div className="bg-light p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <p className="text-lg font-semibold font-montserrat mb-2 text-dark">
                Products
              </p>
              <p className="text-gray-700">Production capacity</p>
            </div>

            {/* Capacity 3 */}
            <div className="bg-light p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl font-bold text-primary mb-2">18 yrs</div>
              <p className="text-lg font-semibold font-montserrat mb-2 text-dark">
                Industry Experience
              </p>
              <p className="text-gray-700">Years of expertise and excellence</p>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-montserrat mb-6">
            Want to Visit Our Facility?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We welcome potential clients to tour our facilities and see our
            infrastructure firsthand. Learn about our <Link href="/foundry/casting-process" className="underline underline-offset-4">manufacturing processes</Link> or contact us to schedule a visit.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
