import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata = {
  title: "About | Best Steel Casting Manufacturer in india",
  description:
    "Learn about JK Foundry, an ISO-certified steel castings manufacturer in Agra serving railway, industrial equipment, truck, trolley, and general engineering applications.",
  alternates: { canonical: "/about" },
  ...pageSocialMetadata("About | Best Steel Casting Manufacturer in India", "Learn about JK Foundry, an ISO-certified steel castings manufacturer in Agra serving railway, industrial equipment, truck, trolley, and general engineering applications.", "/about"),
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={webPageJsonLd(
        "/about",
        "About JK Foundry",
        "Learn about JK Foundry, a manufacturer of precision steel cast components for truck, trolley and industrial applications.",
      )} />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-dark">
  <div className="absolute inset-0 w-full h-full">
    <Image
      src="/about1.webp"
      alt="JK Foundry steel casting facility"
      fill
      sizes="100vw"
      className="w-full h-full object-cover opacity-40" // This creates the dark overlay effect
    />
  </div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6 text-white drop-shadow-lg">
        <span className="text-white-300">About</span>{" "}
        <span className="text-primary">JK Foundry</span>
      </h1>
      <p className="text-xl text-white-100 drop-shadow-lg">
        Delivering high-quality steel castings with unmatched durability since 2010
      </p>
    </div>
  </div>
</section>

      {/* Company Background */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-montserrat mb-6">
                Our <span className="text-primary">Story</span>
              </h2>
              <p className="text-secondary mb-4">
                JK Foundry was established in 2010 with a small induction furnace and a vision to become a leading manufacturer of high-quality steel castings.
              </p>
              <p className="text-secondary mb-4">
                From humble beginnings, we have grown into one of the largest foundries in the region, expanding our operations and capabilities to meet the evolving needs of our clients.
              </p>
              <p className="text-secondary">
                Under the leadership of our founders, Mr. Shailesh Agarwal, JK Foundry has built a strong reputation as a trusted partner for industries requiring precision-engineered steel castings.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/uncle.webp"
                    alt="Shailesh Agarwal"
                    fill
                    sizes="(max-width: 750px) 50vw, 25vw"
                    className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center font-montserrat font-semibold text-dark mt-2">
                  Shailesh Agarwal
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/Param.webp"
                    alt="Parameshti Agarwal"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center font-montserrat font-semibold text-dark mt-2">
                  Parameshti Agarwal
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
              Our Mission & Vision
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-montserrat mb-4">
                  Our Mission
                </h3>
                <p className="text-secondary">
                  To deliver high-quality steel castings with unmatched
                  durability, precision, and reliability, exceeding our
                  customers&apos; expectations while maintaining the highest
                  standards of service and integrity.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold font-montserrat mb-4">
                  Our Vision
                </h3>
                <p className="text-secondary">
                To become a global leader in steel castings, expanding into international markets while continuously innovating our processes and products to meet the evolving needs of the industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why JK Foundry */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
            Why Choose <span className="text-primary">JK Foundry</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Reason 1 */}
            <div className="bg-light p-6 rounded-lg">
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
                Reliability
              </h3>
              <p className="text-secondary">
                Consistent quality and on-time delivery you can count on for
                your production needs.
              </p>
            </div>

            {/* Reason 2 */}
            <div className="bg-light p-6 rounded-lg">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-montserrat mb-2">
                Cost-Effectiveness
              </h3>
              <p className="text-secondary">
                Competitive pricing without compromising on quality or
                performance.
              </p>
            </div>

            {/* Reason 3 */}
            <div className="bg-light p-6 rounded-lg">
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
                Timely Delivery
              </h3>
              <p className="text-secondary">
                Efficient processes and logistics ensuring your orders arrive
                when you need them.
              </p>
            </div>

            {/* Reason 4 */}
            <div className="bg-light p-6 rounded-lg">
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
                Tailored solutions and multiple alloy options to meet your
                specific requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-montserrat mb-6">
            Ready to Partner With Us?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Experience the JK Foundry difference. Contact us today to discuss
            your steel casting needs or request samples.
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
