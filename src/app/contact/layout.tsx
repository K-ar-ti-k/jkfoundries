import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Steel Casting Manufacturer in Agra",
  description:
    "Request a quote from JK Foundry for precision steel castings. Share your drawings, material, quantity, and application with our Agra team.",
  alternates: {
    canonical: "/contact",
  },
  ...pageSocialMetadata(
    "Contact JK Foundry | Steel Casting Quotes",
    "Request a quote from JK Foundry for precision steel castings. Share your drawings, material, quantity, and application with our Agra team.",
    "/contact",
  ),
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={webPageJsonLd(
        "/contact",
        "Contact JK Foundry",
        "Contact JK Foundry for truck, trolley, industrial equipment, and general engineering steel cast components.",
      )} />
      {children}
    </>
  );
}
