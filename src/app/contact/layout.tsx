import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";
import { pageSocialMetadata } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Best Steel Casting Manufacturer in India",
  description:
    "Contact JK Foundry, a steel casting manufacturer in India, for truck, trolley, industrial equipment, and general engineering components.",
  alternates: {
    canonical: "/contact",
  },
  ...pageSocialMetadata(
    "Contact | Best Steel Casting Manufacturer in India | JK Foundry",
    "Contact JK Foundry, a steel casting manufacturer in India, for truck, trolley, industrial equipment, and general engineering components.",
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
