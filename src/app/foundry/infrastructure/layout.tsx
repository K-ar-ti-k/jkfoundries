import JsonLd from "@/components/JsonLd";
import { webPageJsonLd } from "@/lib/jsonld";

export default function FoundryInfrastructureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={webPageJsonLd(
        "/foundry/infrastructure",
        "Foundry Infrastructure",
        "Explore JK Foundry's melting, moulding, fettling, heat treatment, testing, and manufacturing facilities.",
      )} />
      {children}
    </>
  );
}
