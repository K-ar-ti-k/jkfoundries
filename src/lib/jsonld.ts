import { absoluteUrl, siteUrl } from "@/lib/site";

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#business`,
      name: "JK Foundry",
      url: siteUrl,
      logo: absoluteUrl("/Logo.webp"),
      image: absoluteUrl("/Logo.webp"),
      description:
        "Manufacturer of steel cast components for trucks, trolleys, industrial equipment, and general engineering.",
      industry: "Steel casting manufacturing",
      foundingDate: "2007",
      knowsAbout: [
        "Steel casting",
        "Truck components",
        "Trolley components",
        "Industrial castings",
        "Green sand moulding",
        "Shell moulding",
        "CO2 moulding",
      ],
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "1292/115, Shobha Nagar, Foundry Nagar",
        addressLocality: "Agra",
        addressRegion: "Uttar Pradesh",
        postalCode: "282006",
        addressCountry: "IN",
      },
      telephone: "+91-7895679965",
      email: "jkgroup.foundry@gmail.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7895679965",
        contactType: "sales",
        email: "jkgroup.foundry@gmail.com",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      sameAs: [
        "https://x.com/JkFoundry",
        "https://www.facebook.com/profile.php?id=61574429686781",
        "https://www.instagram.com/jk.foundry/",
        "https://www.linkedin.com/company/jk-foundry/about/?viewAsMember=true",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "JK Foundry",
      publisher: {
        "@id": "https://jkfoundries.com/#business",
      },
      inLanguage: "en-IN",
    },
  ],
} as const;

export function webPageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": "https://jkfoundries.com/#website" },
    about: { "@id": "https://jkfoundries.com/#business" },
  };
}

export function articleJsonLd(
  path: string,
  title: string,
  description: string,
  datePublished: string,
  image?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    url: absoluteUrl(path),
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    image: image
      ? image.startsWith("http")
        ? image
        : absoluteUrl(image)
      : absoluteUrl("/Logo.webp"),
    author: { "@id": "https://jkfoundries.com/#business" },
    publisher: { "@id": "https://jkfoundries.com/#business" },
    mainEntityOfPage: { "@id": `${absoluteUrl(path)}#webpage` },
  };
}

export function productJsonLd(
  path: string,
  name: string,
  description: string,
  image: string,
  material: string,
  weight: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(path)}#product`,
    name,
    description,
    image: image.startsWith("http") ? image : absoluteUrl(image),
    material,
    weight,
    url: `https://jkfoundries.com${path}`,
    brand: { "@id": "https://jkfoundries.com/#business" },
    manufacturer: { "@id": "https://jkfoundries.com/#business" },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function itemListJsonLd(
  path: string,
  name: string,
  items: Array<{ name: string; url: string; image?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#itemlist`,
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.url),
      ...(item.image ? { image: item.image } : {}),
    })),
  };
}

export function serviceJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    provider: { "@id": "https://jkfoundries.com/#business" },
    areaServed: { "@type": "Country", name: "India" },
  };
}
