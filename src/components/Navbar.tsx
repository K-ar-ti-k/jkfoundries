"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="relative z-[60] w-full bg-[#241f1d]/[0.98] shadow-[0_10px_35px_rgba(24,18,15,0.28)] backdrop-blur-md before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-primary">
        <div className="container mx-auto flex min-h-[76px] items-center justify-between gap-4 px-4 pt-1 sm:px-6 md:min-h-[88px] lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center" aria-label="JK Foundry home">
          <div className="flex h-14 w-28 items-center transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-36 md:h-[72px] md:w-40">
            <Image
              src="/Logo.webp"
              alt="JK Foundry Logo"
              width={250}
              height={250}
              className="h-full w-full object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.07] p-1 md:flex lg:gap-2">
          <Link
            href="/"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[#fff8f0] transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_5px_14px_rgba(227,24,55,0.28)] lg:px-4"
          >
            Home
          </Link>

          

          <Link
            href="/certificates"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[#fff8f0] transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_5px_14px_rgba(227,24,55,0.28)] lg:px-4"
          >
            Certificates
          </Link>
          
          {/* Product & Services Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold text-[#fff8f0] transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_5px_14px_rgba(227,24,55,0.28)] lg:px-4"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Product &amp; Services
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.061l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="invisible absolute left-0 top-full z-50 mt-3 w-[560px] rounded-2xl border border-[#5a4940] bg-[#2d2623] p-6 opacity-0 shadow-[0_20px_50px_rgba(24,18,15,0.35)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Foundry */}
                <div>
                  <div className="mb-3 text-xs uppercase tracking-wider text-[#d7b89c]">Foundry</div>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/foundry/overview" className="flex items-center justify-between text-[#fff8f0] hover:text-primary transition-colors">
                        <span>Overview</span>
                        <span className="text-[#a99485]">→</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/foundry/products" className="flex items-center justify-between text-[#fff8f0] hover:text-primary transition-colors">
                        <span>Products</span>
                        <span className="text-[#a99485]">→</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/foundry/infrastructure" className="flex items-center justify-between text-[#fff8f0] hover:text-primary transition-colors">
                        <span>Infrastructure</span>
                        <span className="text-[#a99485]">→</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/foundry/faq" className="flex items-center justify-between text-[#fff8f0] hover:text-primary transition-colors">
                        <span>FAQ&apos;s</span>
                        <span className="text-[#a99485]">→</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/foundry/casting-process" className="flex items-center justify-between text-[#fff8f0] hover:text-primary transition-colors">
                        <span>Casting Process</span>
                        <span className="text-[#a99485]">→</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Value Added Services */}
                <div>
                  <div className="mb-3 text-xs uppercase tracking-wider text-[#d7b89c]">Value Added Services</div>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/value-added-services/machinery-services" className="flex items-center justify-between text-[#fff8f0] hover:text-primary transition-colors">
                        <span>Machinery Services</span>
                        <span className="text-[#a99485]">→</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/value-added-services/pattern-mould-die-making" className="flex items-center justify-between text-[#fff8f0] hover:text-primary transition-colors">
                        <span>Pattern &amp; Mould &amp; Die Making</span>
                        <span className="text-[#a99485]">→</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/about"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[#fff8f0] transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_5px_14px_rgba(227,24,55,0.28)] lg:px-4"
          >
            About Us
          </Link>

          <Link
            href="/blog"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[#fff8f0] transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_5px_14px_rgba(227,24,55,0.28)] lg:px-4"
          >
            Blog
          </Link>

          <Link
            href="/contact"
            className="rounded-full px-3 py-2 text-sm font-semibold text-[#fff8f0] transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_5px_14px_rgba(227,24,55,0.28)] lg:px-4"
          >
            Contact Us
          </Link>

          {/*<Link
            href="/products"
            className="text-dark hover:text-primary font-medium transition-colors"
          >
            Products
          </Link>*/}
          
          
          {/*<Link
            href="/partners"
            className="group relative rounded-full px-3 py-2 text-sm font-semibold text-dark transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-sm lg:px-4"
          >
            Partners
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </Link>*/}
          
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_18px_rgba(227,24,55,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
          >
            Get Samples
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-lg p-2 text-[#fff8f0] transition-colors duration-300 hover:bg-white/10 hover:text-primary md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute inset-x-0 top-full border-t border-[#493b35] bg-[#2d2623] px-5 py-6 shadow-[0_20px_35px_rgba(24,18,15,0.35)] md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-[#fff8f0] hover:text-primary font-medium transition-all duration-300 hover:pl-2"
            >
              Home
            </Link>

            

            <Link
              href="/certificates"
              className="text-[#fff8f0] hover:text-primary font-medium transition-all duration-300 hover:pl-2"
            >
              Certificates
            </Link>

            <Link
              href="/about"
              className="text-[#fff8f0] hover:text-primary font-medium transition-all duration-300 hover:pl-2"
            >
              About Us
            </Link>

            <Link
              href="/blog"
              className="text-[#fff8f0] hover:text-primary font-medium transition-all duration-300 hover:pl-2"
            >
              Blog
            </Link>
            
            {/* Product & Services - Mobile */}
            <div className="border-t border-white/10 pt-4">
              <div className="mb-3 text-xs uppercase tracking-wider text-[#d7b89c]">Product &amp; Services</div>
              <div className="space-y-3">
                <div>
                  <div className="mb-2 text-sm font-semibold text-white">Foundry</div>
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/foundry/overview" className="text-[#fff8f0] hover:text-primary text-sm">Overview</Link>
                    <Link href="/foundry/products" className="text-[#fff8f0] hover:text-primary text-sm">Products</Link>
                    <Link href="/foundry/infrastructure" className="text-[#fff8f0] hover:text-primary text-sm">Infrastructure</Link>
                    <Link href="/foundry/q-a" className="text-[#fff8f0] hover:text-primary text-sm">Q / A</Link>
                    <Link href="/foundry/process" className="text-[#fff8f0] hover:text-primary text-sm">Process</Link>
                  </div>
                </div>
                <div>
                  <div className="mb-2 text-sm font-semibold text-white">Value Added Services</div>
                  <div className="grid grid-cols-1 gap-3">
                    <Link href="/value-added-services/machinery-services" className="text-[#fff8f0] hover:text-primary text-sm">Machinery Services</Link>
                    <Link href="/value-added-services/pattern-mould-die-making" className="text-[#fff8f0] hover:text-primary text-sm">Pattern &amp; Mould &amp; Die Making</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-[#fff8f0] hover:text-primary font-medium transition-all duration-300 hover:pl-2"
            >
              Contact Us
            </Link>
            
            
            {/*<Link
              href="/partners"
              className="text-dark hover:text-primary font-medium transition-all duration-300 hover:pl-2"
            >
              Partners
            </Link>*/}
            
            <Link
              href="/contact"
              className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 inline-block w-fit"
            >
              Get Samples
            </Link>
          </nav>
        </div>
      )}
      </header>
    </>
  );
};

export default Navbar;
