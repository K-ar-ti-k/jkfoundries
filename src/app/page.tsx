import type { Metadata } from "next";
import Link from "next/link";
import RecentProducts from "@/components/RecentProducts";
import JsonLd from "@/components/JsonLd";
import { getRecentProducts } from "@/lib/firebase/firestore";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

const homeDescription =
  "JK Foundry Manufactures precision steel castings for trucks, trolleys, industrial equipment, and general engineering applications across India.";

export const metadata: Metadata = {
  title: "Best Steel Casting Manufacturer in India | JK Foundry",
  description: homeDescription,
  alternates: { canonical: "/" },
  ...pageSocialMetadata(
    "Best Steel Casting Manufacturer in India | JK Foundry",
    homeDescription,
    "/",
  ),
};

export default async function Home() {
  const recentProducts = await getRecentProducts(4);
  const serializableProducts = recentProducts.map(({ id, name, material, weight, image, category }) => ({
    id,
    name,
    material,
    weight,
    image,
    category,
  }));
  return (
    <div className="min-h-screen">
      <JsonLd
        data={webPageJsonLd(
          "/",
          "Best Steel Casting Manufacturer in India",
          "JK Foundry manufactures steel cast components for trucks, trolleys, industrial equipment, and general engineering across India.",
        )}
      />
      {/* Hero Section */}
      <section className="relative min-h-[calc(100svh-72px)] bg-dark text-white py-20 sm:py-24 md:h-screen md:min-h-0 md:py-0">
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/quality-banner.webp"
            className="absolute w-full h-full object-cover opacity-70"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 to-dark/70 z-10"></div>
        <div className="relative z-20 min-h-[calc(100svh-72px)] flex items-center justify-center md:h-full md:min-h-0">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center flex items-center justify-center flex-col">

              <h1 className="w-full max-w-13xl mx-auto text-center text-xl sm:text-3xl md:text-5xl font-bold font-montserrat mb-4 text-primary drop-shadow-lg break-words">
                Leading Steel Casting Manufacturer in India
              </h1>

              <p className="max-w-5xl text-center text-lg sm:text-xl mb-8">
                JK Foundry manufactures high-volume steel cast components for trucks,
                trolleys, industrial equipment, and general engineering applications
                across India.
              </p>

              <p className="w-full text-center text-lg sm:text-xl mb-8">
                Precision | Reliability | Exellence
              </p>

              <Link
                href="/foundry/overview"
                className="text-primary font-medium hover:underline inline-block text-center"
              >
                Explore more →
              </Link>

            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold font-montserrat mb-4">
            Reliable Steel Castings for Heavy-Duty Applications
          </h2>
          <p className="text-lg text-secondary leading-relaxed">
            From patterns and moulding to inspection and dispatch, we support
            manufacturers across India looking for dependable cast components.
            Learn more about our <Link href="/foundry/casting-process" className="text-primary underline underline-offset-4">steel casting processes</Link> or share your drawing or specification with our team for a suitable manufacturing solution.
          </p>
        </div>
      </section>

      {/* Key Highlights Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
            Why Choose <span className="text-primary">JK Foundry</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {/* Highlight 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-montserrat mb-2">
                Proven Experience
              </h3>
              <p className="text-secondary">
                Trusted by leading manufacturers across India
              </p>
            </div>

            {/* Highlight 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-montserrat mb-2">
                Large Capacity
              </h3>
              <p className="text-secondary">
                Ability to supply large quantities to meet your production
                demands
              </p>
            </div>

            {/* Highlight 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-montserrat mb-2">
                Quality & Reliability
              </h3>
              <p className="text-secondary">
                Adherence to highest standards with ISO certifications
              </p>
            </div>

            {/* Highlight 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-montserrat mb-2">
                Customization
              </h3>
              <p className="text-secondary">
                Multiple alloy options and tailored solutions for your needs
              </p>
            </div>

            {/* Highlight 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold font-montserrat mb-2">
                Timely Delivery
              </h3>
              <p className="text-secondary">
                Efficient processes ensuring on-time delivery of your orders
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
            Products
          </h2>
          <RecentProducts products={serializableProducts} />
          <div className="text-center mt-12">
            <Link
              href="/foundry/products"
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
            Production Capacity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

            {/* Capacity 4 */}
            <div className="bg-light p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                200+
              </div>
              <p className="text-lg font-semibold font-montserrat mb-2">
                Happy Clients
              </p>
              <p className="text-secondary">Trusted by businesses across industries</p>
            </div>

            {/* Capacity 1 */}
            {/*<div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                <CountUp end={14600} suffix=" Mt" duration={3.0} enableScrollSpy />
              </div>
              <p className="text-lg font-semibold font-montserrat mb-2">
                Per Year
              </p>
              <p className="text-secondary">Induction furnace capacity</p>
            </div>*/}

            {/* Capacity 2 */}
            <div className="bg-light p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                30+
              </div>
              <p className="text-lg font-semibold font-montserrat mb-2">
                Products
              </p>
              <p className="text-secondary">Production capacity</p>
            </div>

            {/* Capacity 3 */}
            <div className="bg-light p-6 rounded-lg text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                18 yrs
              </div>
              <p className="text-lg font-semibold font-montserrat mb-2">
                Industry Experience
              </p>
              <p className="text-secondary">Years of expertise and excellence</p>
            </div>


          </div>
        </div>
      </section>

      {/* Intro Text Section*/}
      {/*<section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-montserrat mb-6">
              Welcome to <span className="text-primary">JK Foundry</span>
            </h2>
            <p className="text-lg text-secondary mb-8">
              We supply high-quality steel castings, delivering
              precision-engineered parts to meet your production demands. Since
              our establishment in 2010, we have grown to become one of the
              largest foundries in the region, trusted by leading
              manufacturers across India.
            </p>
            <Link
              href="/about"
              className="text-primary font-medium hover:underline"
            >
              Learn more about us →
            </Link>
          </div>
        </div>
      </section>*/}

      {/* Featured Products Preview - Temporarily Hidden
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12">
            Featured Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">Product Image</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  Yoke Pin Support
                </h3>
                <p className="text-sm text-secondary mb-2">
                  Material: WA/BD-4462, Gr. B
                </p>
                <p className="text-sm text-secondary mb-4">Weight: 30 Kg</p>
                <Link
                  href="/products"
                  className="text-primary font-medium hover:underline text-sm"
                >
                  View details →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">Product Image</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  Striker
                </h3>
                <p className="text-sm text-secondary mb-2">
                  Material: WA/BD-4462, Gr. B
                </p>
                <p className="text-sm text-secondary mb-4">Weight: 25 Kg</p>
                <Link
                  href="/products"
                  className="text-primary font-medium hover:underline text-sm"
                >
                  View details →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">Product Image</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  Truck Motor Ring
                </h3>
                <p className="text-sm text-secondary mb-2">
                  Material: WA/BD-4462, Gr. B
                </p>
                <p className="text-sm text-secondary mb-4">Weight: 40 Kg</p>
                <Link
                  href="/products"
                  className="text-primary font-medium hover:underline text-sm"
                >
                  View details →
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <div className="text-gray-400">Product Image</div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold font-montserrat mb-2">
                  Buffer Casing
                </h3>
                <p className="text-sm text-secondary mb-2">
                  Material: WA/BD-4462, Gr. B
                </p>
                <p className="text-sm text-secondary mb-4">Weight: 35 Kg</p>
                <Link
                  href="/products"
                  className="text-primary font-medium hover:underline text-sm"
                >
                  View details →
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
      */}

      {/* Call to Action */}
      <section className="py-16 bg-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-montserrat mb-6">
            Let&apos;s Partner Up
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Need reliable steel cast components for trucks, trolleys, or industrial equipment? Contact us to request samples or discuss your requirements.

          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
            >
              Get Your Samples
            </Link>
            {/*<a
              href="https://wa.me/917906209355"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition-colors inline-block"
            >
              Chat on WhatsApp
            </a>*/}
          </div>
        </div>
      </section>
    </div>
  );
}
