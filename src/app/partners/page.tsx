import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "Manufacturing Partners | JK Foundry Steel Castings",
  description:
    "Learn about JK Foundry's partnerships with manufacturers across the truck, trolley, industrial equipment, and general engineering sectors.",
  alternates: { canonical: "/partners" },
  ...pageSocialMetadata("Manufacturing Partners | JK Foundry Steel Castings", "Learn about JK Foundry's partnerships with manufacturers across the truck, trolley, industrial equipment, and general engineering sectors.", "/partners"),
};

// Partner data (replace with actual partners when available)
const partners = [
  {
    id: 1,
    name: "NK Iron Industries",
    description: "A manufacturing partner for durable steel cast components.",
    logo: "/placeholder.jpg",
  },
  {
    id: 2,
    name: "Partner 2",
    description: "Description of partnership and collaboration.",
    logo: "/placeholder.jpg",
  },
  {
    id: 3,
    name: "Partner 3",
    description: "Description of partnership and collaboration.",
    logo: "/placeholder.jpg",
  },
  {
    id: 4,
    name: "Partner 4",
    description: "Description of partnership and collaboration.",
    logo: "/placeholder.jpg",
  },
  {
    id: 5,
    name: "Partner 5",
    description: "Description of partnership and collaboration.",
    logo: "/placeholder.jpg",
  },
  {
    id: 6,
    name: "Partner 6",
    description: "Description of partnership and collaboration.",
    logo: "/placeholder.jpg",
  },
];

// Partner Card Component
interface Partner {
  id: number;
  name: string;
  description: string;
  logo: string;
}

const PartnerCard = ({ partner }: { partner: Partner }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {/* Replace with actual partner logo */}
        <div className="text-gray-400">Partner Logo</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold font-montserrat mb-3">
          {partner.name}
        </h3>
        <p className="text-secondary">{partner.description}</p>
      </div>
    </div>
  );
};

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={webPageJsonLd(
        "/partners",
        "JK Foundry Partners",
        "Manufacturing partnerships across truck, trolley, industrial equipment, and general engineering sectors.",
      )} />
      {/* Hero Section */}
      <section className="bg-dark text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6">
              Our <span className="text-primary">Partners</span>
            </h1>
            <p className="text-xl">
              Building strong relationships with industry leaders
            </p>
          </div>
        </div>
      </section>

      {/* Partners Overview */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat mb-6">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-secondary">
              At JK Foundry, we work with manufacturers across the truck,
              trolley, industrial equipment, and general engineering sectors.
              We build long-term relationships by supplying steel castings that
              meet exact drawings, specifications, and quality requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partners.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
            What Our Partners Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Testimonial 1 */}
            <div className="bg-light p-6 rounded-lg relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary/20 absolute top-4 left-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div className="relative z-10">
                <p className="text-secondary italic mb-4 pl-6">
                  &quot;JK Foundry has been a reliable partner for our industrial
                  component needs. Their quality is consistent, and their
                  delivery is always on time.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-secondary">
                      Procurement Manager, Company Name
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-light p-6 rounded-lg relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-primary/20 absolute top-4 left-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <div className="relative z-10">
                <p className="text-secondary italic mb-4 pl-6">
                  &quot;We&apos;ve been working with JK Foundry for over 5 years, and
                  they&apos;ve consistently delivered high-quality steel castings
                  that meet our exact specifications.&quot;
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-sm text-secondary">
                      Operations Director, Company Name
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
              Benefits of Partnering With Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Benefit 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  Consistent Quality
                </h3>
                <p className="text-secondary">
                  Our ISO-certified processes ensure that every product meets
                  the highest quality standards, reducing defects and improving
                  reliability.
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  On-Time Delivery
                </h3>
                <p className="text-secondary">
                  Our efficient production processes and logistics ensure that
                  your orders are delivered on schedule, helping you maintain
                  your production timelines.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  Customization
                </h3>
                <p className="text-secondary">
                  We work closely with you to understand your specific
                  requirements and provide tailored solutions that meet your
                  exact needs.
                </p>
              </div>

              {/* Benefit 4 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  Dedicated Support
                </h3>
                <p className="text-secondary">
                  Our team is committed to providing exceptional customer
                  service and technical support throughout our partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-montserrat mb-6">
            Become Our Partner
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our growing list of satisfied partners. Contact us today to
            discuss how JK Foundry can meet your steel casting needs.
          </p>
          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
