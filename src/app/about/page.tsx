import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { aboutPageJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: "Steel Casting Foundry in Agra",
  description:
    "Learn about JK Foundry, an ISO 9001:2015-certified steel foundry in Agra producing precision cast components for trucks and industry since 2010.",
  alternates: { canonical: "/about" },
  ...pageSocialMetadata(
    "Steel Casting Foundry in Agra | JK Foundry",
    "Learn about JK Foundry, an ISO 9001:2015-certified steel foundry in Agra producing precision cast components for trucks and industry since 2010.",
    "/about"
  ),
};

const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

const faqs = [
  {
    question: "Where is JK Foundry located?",
    answer:
      "JK Foundry is situated in the industrial hub of Foundry Nagar, Agra, Uttar Pradesh (1292/115, Shobha Nagar, Foundry Nagar, Agra - 282006, India), well-connected by national freight across North and Central India.",
  },
  {
    question: "What types of steel castings does JK Foundry manufacture?",
    answer:
      "We manufacture precision steel castings in carbon steel, mild steel, and alloy steel grades. Our components serve heavy commercial trucks, tractor trolleys, railways, agricultural machinery, and heavy industrial engineering applications.",
  },
  {
    question: "Which quality certifications does JK Foundry maintain?",
    answer:
      "JK Foundry holds ISO 9001:2015 (Quality Management System), ISO 14001:2015 (Environmental Management System), ISO 45001:2018 (Occupational Health & Safety), and ZED (Zero Defect Zero Effect) certification.",
  },
  {
    question: "What moulding and casting processes are available at your facility?",
    answer:
      "Our Agra foundry operates Green Sand Moulding, Shell Moulding, and CO2 Sand Moulding lines, complemented by induction melting furnaces, heat treatment, in-house pattern development, and comprehensive physical/chemical testing labs.",
  },
  {
    question: "What is the casting weight range at JK Foundry?",
    answer:
      "JK Foundry manufactures steel castings weighing approximately 0.5 kg to 150 kg. The achievable weight depends on the component's design, geometry, and material. We confirm the final casting weight after reviewing your drawing and production requirements, then select the moulding process to suit the component.",
  },
  {
    question: "Can JK Foundry develop custom castings from engineering drawings or samples?",
    answer:
      "Yes. We specialize in custom casting development from engineering blueprints, 3D CAD models, or physical samples, including pattern/die fabrication, metallurgical testing, prototyping, and volume production.",
  },
];

const keyStats = [
  { value: "2010", label: "Year Established", detail: "Over a decade of casting excellence" },
  { value: "ISO & ZED", label: "Certified Facility", detail: "ISO 9001, 14001, 45001 & ZED" },
  { value: "100+", label: "Cast Components", detail: "Truck, trolley & industrial" },
  { value: "Agra, UP", label: "Foundry Nagar Hub", detail: "Prime manufacturing location in India" },
];

const capabilities = [
  {
    title: "Green Sand Moulding",
    description: "High-volume, cost-effective sand casting ideal for commercial vehicle components, tractor brackets, and structural parts.",
    image: "/GreenSand.jpg",
  },
  {
    title: "Shell Moulding",
    description: "Superior dimensional tolerance and exceptional surface finish for precision industrial and automotive castings.",
    image: "/Shell.jpg",
  },
  {
    title: "CO2 Moulding",
    description: "High-rigidity mould process ensuring structural stability and defect-free casting for heavy industrial applications.",
    image: "/Co2.jpg",
  },
];

const certifications = [
  {
    name: "ISO 9001:2015",
    type: "Quality Management System",
    description: "Rigorous quality controls ensuring consistent chemical, mechanical, and dimensional integrity across every batch.",
    badge: "Quality Assured",
  },
  {
    name: "ISO 14001:2015",
    type: "Environmental Management",
    description: "Sustainable foundry operations reducing ecological footprint and optimizing raw material recycling.",
    badge: "Eco-Friendly",
  },
  {
    name: "ISO 45001:2018",
    type: "Occupational Health & Safety",
    description: "Prioritizing employee safety, hazard prevention, and world-class operating procedures on the foundry floor.",
    badge: "Workplace Safety",
  },
  {
    name: "ZED Certification",
    type: "Zero Defect Zero Effect",
    description: "National standard recognition for sustainable, high-precision manufacturing with zero environmental impact.",
    badge: "Zero Defect",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Schema.org Structured Data */}
      <JsonLd
        data={aboutPageJsonLd(
          "/about",
          "About JK Foundry",
          "Learn about JK Foundry, an ISO-certified steel castings manufacturer in Agra, India, specializing in precision components for trucks, trolleys, railways, and industrial applications."
        )}
      />
      <JsonLd data={breadcrumbJsonLd(breadcrumbs)} />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-dark text-white overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/about1.webp"
            alt="JK Foundry steel casting manufacturing plant in Agra, India"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-300">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-1 text-gray-500">/</span>
              </li>
              <li className="text-white font-medium" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-block bg-primary/20 text-primary-light border border-primary/30 text-xs md:text-sm uppercase tracking-wider font-semibold px-3 py-1 rounded-full mb-4">
              Agra, Uttar Pradesh • Established 2010
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold font-montserrat mb-5 text-white drop-shadow-md leading-tight">
              About <span className="text-primary">JK Foundry</span>
              <span className="block text-xl md:text-2xl font-medium text-gray-200 mt-2 font-opensans">
                Precision Steel Casting Manufacturer in India
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Delivering high-integrity carbon and alloy steel castings engineered for unmatched durability, tight tolerances, and demanding industrial applications across India.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors shadow-md"
              >
                Request Quotation
              </Link>
              <Link
                href="/products"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-md font-semibold transition-colors"
              >
                View Product Range
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Strip */}
      <section className="bg-gray-50 border-y border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {keyStats.map((stat, idx) => (
              <div key={idx} className="text-center p-3">
                <div className="text-3xl md:text-4xl font-extrabold text-primary font-montserrat">
                  {stat.value}
                </div>
                <div className="text-base font-semibold text-gray-900 mt-1">{stat.label}</div>
                <div className="text-xs text-gray-500 mt-0.5">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Background & Heritage */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-2">
                Our Heritage & Growth
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-6 text-gray-900">
                Pioneering Steel Casting in <span className="text-primary">Agra Since 2010</span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Established in 2010 in the well-known industrial hub of <strong>Foundry Nagar, Agra</strong>, JK Foundry began operations with an induction melting furnace and an unwavering commitment: to produce high-integrity steel castings capable of enduring the most demanding operating conditions.
                </p>
                <p>
                  Over the past 15 years, our facility has expanded into one of the region’s premier steel foundries. We integrate modern melting furnaces, specialized sand conditioning systems, and strict metallurgical testing to manufacture components that consistently meet Indian and international standards.
                </p>
                <p>
                  From heavy commercial vehicle parts and tractor trolley brackets to industrial equipment, JK Foundry partners directly with OEMs, fleet builders, and engineering enterprises nationwide.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/infrastructure"
                  className="text-primary hover:text-primary-dark font-semibold inline-flex items-center group text-sm md:text-base"
                >
                  Explore Foundry Infrastructure
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                  href="/foundry/casting-process"
                  className="text-primary hover:text-primary-dark font-semibold inline-flex items-center group text-sm md:text-base"
                >
                  View Casting Processes
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Leadership Team (E-E-A-T) */}
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold font-montserrat text-gray-900">
                    Foundry Leadership & Metallurgy
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Guided by decades of practical foundry engineering and modern management
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Founder */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="relative w-36 h-44 rounded-lg overflow-hidden shadow mb-3">
                      <Image
                        src="/uncle.webp"
                        alt="Shailesh Agarwal - Founder & Managing Director of JK Foundry Agra"
                        fill
                        sizes="(max-width: 640px) 150px, 180px"
                        className="object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="font-montserrat font-bold text-gray-900 text-lg">
                      Shailesh Agarwal
                    </div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                      Founder & Managing Director
                    </div>
                    <p className="text-xs text-gray-600 leading-normal">
                      Pioneered JK Foundry in 2010 with decades of deep technical expertise in induction furnace melting, metallurgy, and mold formulation.
                    </p>
                  </div>

                  {/* Director */}
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <div className="relative w-36 h-44 rounded-lg overflow-hidden shadow mb-3">
                      <Image
                        src="/Param.webp"
                        alt="Parameshti Agarwal - Director at JK Foundry Agra"
                        fill
                        sizes="(max-width: 640px) 150px, 180px"
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="font-montserrat font-bold text-gray-900 text-lg">
                      Parameshti Agarwal
                    </div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
                      Director – Operations & Strategy
                    </div>
                    <p className="text-xs text-gray-600 leading-normal">
                      Drives modern foundry automation, quality assurance protocols, supply chain reliability, and OEM client relationships.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-semibold tracking-wider uppercase">
                Purpose & Philosophy
              </span>
              <h2 className="text-3xl font-bold font-montserrat text-gray-900 mt-1">
                Our Mission & Vision
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-montserrat mb-3 text-gray-900">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To deliver precision-engineered steel castings with unmatched durability, metallurgical integrity, and dimensional accuracy, exceeding client expectations while maintaining honest partnerships and reliable delivery.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-montserrat mb-3 text-gray-900">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To be recognized as India&apos;s most dependable manufacturer of custom steel castings, expanding into international markets through continuous innovation, clean green foundry practices, and advanced testing infrastructure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Quality Management (E-E-A-T) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Certified Manufacturing
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mt-1">
              Quality Assurance & Certifications
            </h2>
            <p className="text-gray-600 mt-3 text-base md:text-lg">
              At JK Foundry, quality is verified at every stage of production—from raw scrap selection and induction melting to spectrometer analysis and final dimensional check.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, idx) => (
              <div
                key={idx}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-md mb-3">
                    {cert.badge}
                  </span>
                  <h3 className="text-lg font-bold font-montserrat text-gray-900 mb-1">
                    {cert.name}
                  </h3>
                  <div className="text-xs font-medium text-gray-500 mb-3">{cert.type}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/certificates"
              className="inline-flex items-center font-semibold text-primary hover:text-primary-dark border-b-2 border-primary pb-0.5 hover:border-primary-dark transition-colors"
            >
              <span>View All Official Certificates & QA Standards</span>
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Moulding Processes & Capabilities */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Foundry Technology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mt-1">
              Moulding & Casting Capabilities
            </h2>
            <p className="text-gray-600 mt-3">
              We operate versatile moulding lines paired with medium-frequency induction furnaces to handle both high-volume casting runs and specialized custom orders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={item.image} alt={`${item.title} at JK Foundry`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-montserrat text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{item.description}</p>
                  <Link href="/foundry/casting-process" className="text-primary font-medium text-sm hover:underline inline-flex items-center">
                    Learn about this process <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Industries We Serve
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-gray-900 mt-1">
              Serving Diverse Industrial Applications
            </h2>
            <p className="text-gray-600 mt-3">
              JK Foundry&apos;s steel castings are engineered for durability and precision, catering to a wide range of industries including commercial vehicles, agriculture, and heavy industrial machinery.
            </p>
          </div>
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
            <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-primary mb-4">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h6a2 2 0 012 2v6m-6 4h.01M12 3v4m0 0H8m4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-montserrat text-gray-900 mb-2">Commercial Vehicles</h3>


              <p className="text-sm text-gray-600 leading-relaxed">
                Precision castings for trucks, buses, and heavy-duty transport components ensuring strength and reliability on the road.
              </p>
            </div>
            <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-montserrat text-gray-900 mb-2">Agriculture</h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                Durable castings for tractors, trolleys, and farm machinery components designed to withstand harsh agricultural environments.
              </p>
            </div>
            <div className="w-full max-w-sm bg-gray-50 border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-montserrat text-gray-900 mb-2">Industrial Machinery</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Precision castings for heavy industrial equipment, ensuring performance, durability, and compliance with engineering standards.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose JK Foundry */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold font-montserrat text-gray-900">
              Why Choose <span className="text-primary">JK Foundry</span>
            </h2>
            <p className="text-gray-600 mt-2">
              The preferred casting partner for leading industrial OEMs and commercial manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-montserrat mb-2 text-gray-900">Reliability</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Consistent quality and on-time delivery you can count on for your production needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-montserrat mb-2 text-gray-900">Cost-Effectiveness</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Competitive pricing without compromising on quality or performance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-montserrat mb-2 text-gray-900">Timely Delivery</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Efficient processes and logistics ensuring your orders arrive when you need them.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold font-montserrat mb-2 text-gray-900">Customization</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Tailored solutions and multiple alloy options to meet your specific requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (SEO Rich Results) */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-primary text-sm font-semibold tracking-wider uppercase">
              Got Questions?
            </span>
            <h2 className="text-3xl font-bold font-montserrat text-gray-900 mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-2">
              Common questions about JK Foundry&apos;s capabilities, certifications, and manufacturing facilities.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-gray-200 rounded-xl bg-gray-50/50 p-5 transition-all duration-200 open:bg-white open:shadow-sm"
              >
                <summary className="font-semibold font-montserrat text-gray-900 cursor-pointer list-none flex justify-between items-center text-base md:text-lg">
                  <span>{faq.question}</span>
                  <span className="text-primary text-xl font-bold ml-4 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
            Partner With a Trusted Steel Foundry
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-gray-300">
            Contact JK Foundry today to discuss your technical drawings, alloy specifications, or request initial casting samples.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-primary text-white px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors shadow-lg"
            >
              Get in Touch
            </Link>
            <Link
              href="/infrastructure"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Explore Infrastructure
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
