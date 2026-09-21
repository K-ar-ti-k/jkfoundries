import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#241f1d] text-white">
      <div className="border-b border-white/10">
        <div className="container mx-auto grid gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.3fr_1fr_1.4fr_1fr] lg:px-8 lg:py-14">
          {/* Column 1: Logo and Tagline */}
          <div>
            <Link href="/" className="inline-block" aria-label="JK Foundry home">
              <Image
                src="/Logo.webp"
                alt="JK Foundry Logo"
                width={180}
                height={180}
                className="h-auto w-auto max-w-[150px]"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-[#d7cbc3]">
              High-quality precision steel castings for trucks, trolleys,
              industrial equipment, and general engineering applications.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-[#241f1d] transition-transform hover:-translate-y-0.5"
            >
              Request a quotation <span className="ml-2" aria-hidden="true">-&gt;</span>
            </Link>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-montserrat text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Explore
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-[#d7cbc3]">
              <li><Link href="/about" className="transition-colors hover:text-primary">About Us</Link></li>
              <li><Link href="/products" className="transition-colors hover:text-primary">Products</Link></li>
              <li><Link href="/infrastructure" className="transition-colors hover:text-primary">Infrastructure</Link></li>
              <li><Link href="/certificates" className="transition-colors hover:text-primary">Certificates</Link></li>
              <li><Link href="/blog" className="transition-colors hover:text-primary">Blog</Link></li>
            </ul>
          </nav>

          <div>
            <h2 className="font-montserrat text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Visit Us
            </h2>
            <address className="mt-5 flex items-start gap-3 not-italic text-sm leading-7 text-[#d7cbc3]">
              <FaMapMarkerAlt className="mt-1.5 shrink-0 text-primary" aria-hidden="true" />
              <span>
                1292/115, Shobha Nagar,<br />
                Foundry Nagar, Agra,<br />
                Uttar Pradesh 282006, India
              </span>
            </address>
            <div className="mt-4 space-y-2 text-sm">
              <a href="tel:+917895679965" className="flex items-center gap-3 text-[#fff8f0] transition-colors hover:text-primary">
                <FaPhone className="shrink-0 text-primary" aria-hidden="true" />
                +91 78956 79965
              </a>
              <a href="mailto:crm@jkfoundries.com" className="flex items-center gap-3 text-[#d7cbc3] transition-colors hover:text-primary">
                <FaEnvelope className="shrink-0 text-primary" aria-hidden="true" />
                crm@jkfoundries.com
              </a>
            </div>
          </div>

          <div>
            <h2 className="font-montserrat text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Start a Conversation
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#d7cbc3]">
              Share your drawing, material grade, or production requirement with our team.
            </p>
            <a
              href="https://wa.me/917895679965"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center rounded-full border border-[#4ade80]/50 px-4 py-2.5 text-sm font-semibold text-[#86efac] transition-colors hover:bg-[#4ade80] hover:text-[#172019]"
            >
              <FaWhatsapp className="mr-2 text-lg" aria-hidden="true" />
              Chat on WhatsApp <span className="ml-2" aria-hidden="true">-&gt;</span>
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center gap-3 px-4 py-5 text-center text-xs text-[#a99485] sm:px-6 lg:px-8">
        <p>&copy; {new Date().getFullYear()} JK Foundry. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
