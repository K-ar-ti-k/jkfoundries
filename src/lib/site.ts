export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jkfoundries.vercel.app";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function pageSocialMetadata(title: string, description: string, path: string) {
  const url = absoluteUrl(path);

  return {
    openGraph: {
      type: "website" as const,
      url,
      siteName: "JK Foundry",
      title,
      description,
      images: [{ url: absoluteUrl("/Logo.webp"), alt: "JK Foundry" }],
    },
    twitter: {
      card: "summary" as const,
      site: "@JkFoundry",
      creator: "@JkFoundry",
      title,
      description,
      images: [absoluteUrl("/Logo.webp")],
    },
  };
}
