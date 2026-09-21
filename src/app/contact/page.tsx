"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { createContactSubmission } from "@/lib/firebase/firestore";
import { useSearchParams } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";

function ContactContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    requestSamples: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Save to Firestore
      await createContactSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        company: formData.company || undefined,
        message: formData.message,
      });

      // Also submit to getform.io for backwards compatibility
      try {
        await fetch('https://getform.io/f/bqokqmob', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData),
        });
      } catch (getformError) {
        // Ignore getform errors, Firestore save is primary
        console.warn('Failed to submit to getform.io:', getformError);
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
        requestSamples: false,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "There was an error submitting your form. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const wantsSample = searchParams.get("sample") === "1";
    const productName = searchParams.get("product");
    if (wantsSample || productName) {
      setFormData((prev) => ({
        ...prev,
        requestSamples: wantsSample,
        message: productName ? `Sample request for: ${productName}` : prev.message,
      }));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-dark">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/call.webp"
            alt="certificate Background"
            fill
            className="object-cover opacity-40"
            priority
            quality={100}
            sizes="100vw"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-6 text-white drop-shadow-lg">
              <span className="text-white-400">Contact</span>{" "}
              <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-white-200 drop-shadow-lg">
            Get in touch with our team to discuss your steel casting needs
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold font-montserrat mb-6">
                Send Us a Message
              </h2>

              {submitSuccess ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p>
                    Thank you for your message! We will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {submitError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                      <p>{submitError}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-dark font-medium mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g., Your Name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-dark font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g., xxx.xxx@company.com"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="phone"
                      className="block text-dark font-medium mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g., +91 70170 33226"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="company"
                      className="block text-dark font-medium mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g., Acme Castings Pvt. Ltd."
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="message"
                      className="block text-dark font-medium mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project requirements, material grade, quantity, and timeline"
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    ></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="requestSamples"
                        checked={formData.requestSamples}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-5 w-5 text-primary"
                      />
                      <span>I would like to request samples</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors w-full"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold font-montserrat mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold font-montserrat mb-2">
                    <FaMapMarkerAlt className="text-primary" aria-hidden="true" />
                    Factory Address
                  </h3>
                  <address className="not-italic text-gray-600 leading-relaxed">
                    1292/115, Shobha Nagar, Foundry Nagar
                    <br />
                    Agra, Uttar Pradesh 282006
                    <br />
                    India
                  </address>
                </div>

                <div>
                  <h3 className="text-lg font-semibold font-montserrat mb-2">
                    Phone
                  </h3>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <a
                      href="tel:+917895679965"
                      className="hover:text-primary transition-colors"
                    >
                      +917895679965
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold font-montserrat mb-2">
                    Email
                  </h3>
                  <p className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:crm@jkfoundries.com"
                      className="hover:text-primary transition-colors"
                    >
                      crm@jkfoundries.com
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold font-montserrat mb-2">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/917017033226"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-fit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold font-montserrat mb-4">
                    Business Hours
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Monday - Saturday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </li>
                    
                    <li className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map or Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold font-montserrat mb-6 text-center">
              Our Location
            </h2>
            <div className="rounded-lg overflow-hidden h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.9624596405442!2d78.04269990000002!3d27.220328399999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39747125376a3e65%3A0x408a229671a7e6d1!2sJai%20Kapish%20Udyog!5e0!3m2!1sen!2sin!4v1741590208906!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactContent />
    </Suspense>
  );
}
