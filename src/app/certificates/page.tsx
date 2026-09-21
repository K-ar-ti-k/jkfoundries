import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Steel Casting Quality Certificates",
  description:
    "View JK Foundry certifications for quality, occupational safety, environmental management, and responsible manufacturing.",
  alternates: { canonical: "/certificates" },
  ...pageSocialMetadata("Steel Casting Quality Certificates | JK Foundry", "View JK Foundry certifications for quality, occupational safety, environmental management, and responsible manufacturing.", "/certificates"),
};

// Certificate data
const certificates = [
  {
    id: 1,
    name: "ISO 9001:2015",
    description:
      "Quality Management System certification demonstrating our commitment to consistently providing products that meet customer and regulatory requirements.",
    image: "/iso9001.webp",
  },
  {
    id: 2,
    name: "ISO 45001:2018",
    description:
      "Occupational Health and Safety Management System certification showing our dedication to providing safe and healthy workplaces by preventing work-related injury and ill health.",
    image: "/iso45001.webp",
  },
  {
    id: 3,
    name: "ISO 14001:2015",
    description:
      "Environmental Management System certification highlighting our commitment to environmental protection and sustainable development.",
    image: "/iso14001.webp",
  },
  {
    id: 4,
    name: "ZED Certification",
    description:
      "Zero Defect Zero Effect certification recognizing our commitment to manufacturing with minimal environmental impact while maintaining high quality standards.",
    image: "/zed.webp",
  },
];

// Certificate Card Component
interface Certificate {
  id: number;
  name: string;
  description: string;
  image: string;
}

const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-100">
      {/* Certificate Header */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-50 p-3 border-b border-gray-100">
        <h3 className="text-xl font-bold font-montserrat text-gray-800 text-center">
          {certificate.name}
        </h3>
      </div>

      {/* Certificate Image */}
      <div className="h-[320px] relative p-6 bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/0 to-white/5" />
        <Image
          src={certificate.image}
          alt={certificate.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Certificate Description */}
      <div className="p-4 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
        <div className="h-24 overflow-y-auto">
          <p className="text-sm text-gray-600 leading-relaxed">
            {certificate.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function CertificatesPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={webPageJsonLd(
        "/certificates",
        "JK Foundry Certificates",
        "JK Foundry certifications for quality, occupational safety, environmental management, and responsible manufacturing.",
      )} />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-dark">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/quality-banner.webp"
            alt="JK Foundry quality management facility"
            fill
            sizes="100vw"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6 text-white drop-shadow-lg">
              <span className="text-white-400">Our</span>{" "}
              <span className="text-primary">Certifications</span>
            </h1>
            <p className="text-xl text-white-200 drop-shadow-lg">
            Demonstrating our commitment to quality, safety, and environmental responsibility
            </p>
          </div>
        </div>
      </section>

      {/* Certificates Overview */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat mb-6">
              Quality Assurance Through Certification
            </h2>
            <p className="text-lg text-gray-700">
              At JK Foundry, we maintain the highest standards of quality,
              safety, and environmental responsibility. Our certifications
              demonstrate our commitment to excellence in every aspect of our
              operations.
            </p>
          </div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
              {certificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
              Our Commitment to Quality
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-secondary mb-4">
                  At JK Foundry, quality is not just a goal—it&apos;s a fundamental
                  aspect of our business philosophy. We have implemented
                  rigorous quality control processes at every stage of
                  production to ensure that our products meet the highest
                  standards.
                </p>
                <p className="text-secondary mb-4">
                  Our quality management system is designed to:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
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
                    <span>Ensure consistent product quality</span>
                  </li>
                  <li className="flex items-start">
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
                    <span>
                      Identify and address potential issues before they affect
                      production
                    </span>
                  </li>
                  <li className="flex items-start">
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
                    <span>Continuously improve our processes and products</span>
                  </li>
                  <li className="flex items-start">
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
                    <span>Meet or exceed customer expectations</span>
                  </li>
                </ul>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <img
                  src="/quality-control.webp"
                  alt="Quality Control at JK Foundry"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-montserrat mb-6">
            Experience Our Quality Firsthand
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Ready to experience the JK Foundry difference? Contact us today to
            request samples or discuss your steel casting requirements.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
          >
            Request Samples
          </Link>
        </div>
      </section>
    </div>
  );
}
