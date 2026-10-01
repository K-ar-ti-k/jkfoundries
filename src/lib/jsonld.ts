import { absoluteUrl, siteUrl } from "@/lib/site";

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness,ManufacturingBusiness",
      "@id": `${siteUrl}/#business`,
      name: "JK Foundry",
      url: siteUrl,
      logo: absoluteUrl("/Logo.webp"),
      image: absoluteUrl("/Logo.webp"),
      description:
        "ISO 9001:2015 certified manufacturer of precision steel cast components for commercial trucks, tractor trolleys, and industrial machinery.",
      industry: "Steel casting manufacturing",
      foundingDate: "2010",
      knowsAbout: [
        "Steel casting",
        "Truck components",
        "Tractor Trolley components",
        "Industrial castings",
        "Green sand moulding",
        "Shell moulding",
        "CO2 moulding",
        "Alloy steel casting",
        "Carbon steel casting",
        "Stainless steel casting",
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "ISO 9001:2015",
          credentialCategory: "Quality Management System",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "ISO 14001:2015",
          credentialCategory: "Environmental Management System",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "ISO 45001:2018",
          credentialCategory: "Occupational Health & Safety",
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "ZED Certification",
          credentialCategory: "Zero Defect Zero Effect",
        },
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
      email: "crm@jkfoundries.com",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7895679965",
        contactType: "sales",
        email: "crm@jkfoundries.com",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
      sameAs: [
        "https://x.com/JkFoundry",
        "https://www.facebook.com/profile.php?id=61574429686781",
        "https://www.instagram.com/jk.foundry/",
        "https://www.linkedin.com/company/jkfoundry/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "JK Foundry",
      publisher: {
        "@id":`${siteUrl}/#business`,
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
    isPartOf: { "@id":`${siteUrl}#website` },
    about: { "@id": `${siteUrl}/#business` },
  };
}

export function aboutPageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${absoluteUrl(path)}#aboutpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#business` },
    mainEntity: { "@id": `${siteUrl}/#business` },
  };
}

export function contactPageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl(path)}#contactpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#business` },
    mainEntity: { "@id": `${siteUrl}/#business` },
  };
}

export function collectionPageJsonLd(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#collectionpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#business` },
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
    author: { "@id": `${siteUrl}/#business` },
    publisher: { "@id": `${siteUrl}/#business` },
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
    url: absoluteUrl(path),
    brand: { "@id": `${siteUrl}/#business` },
    manufacturer: { "@id": `${siteUrl}/#business` },
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
      url: item.url.startsWith("http") ? item.url : absoluteUrl(item.url),
      ...(item.image ? { image: item.image.startsWith("http") ? item.image : absoluteUrl(item.image) } : {}),
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
    provider: { "@id": `${siteUrl}/#business` },
    areaServed: { "@type": "Country", name: "India" },
  };
}

