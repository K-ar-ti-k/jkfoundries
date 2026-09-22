import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import LayoutWrapper from "@/components/LayoutWrapper";
import { websiteJsonLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/site";
import { SpeedInsights } from "@vercel/speed-insights/next"

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JK Foundry | Best Steel Casting Manufacturer in India",
    template: "%s | JK Foundry",
  },
  description:
    "JK Foundry manufactures precision steel cast components for trucks, trolleys, industrial equipment, and general engineering across India.",
  keywords: [
    "steel casting manufacturer in India",
    "steel casting foundry in India",
    "truck components manufacturer",
    "trolley components manufacturer",
    "industrial steel castings",
    "steel casting manufacturer India",
    "steel casting manufacturer in Agra",
    "steel casting manufacturer in Uttar Pradesh",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "JK Foundry",
    title: "JK Foundry | Steel Casting Manufacturer in India",
    description:
      "Precision steel cast components for trucks, trolleys, industrial equipment, and general engineering.",
    images: [
      {
        url: "/Logo.webp",
        width: 600,
        height: 600,
        alt: "JK Foundry",
      },
    ],
  },
  twitter: {
    card: "summary",
    site: "@JkFoundry",
    creator: "@JkFoundry",
    title: "JK Foundry | Steel Casting Manufacturer in India",
    description:
      "Precision steel cast components for trucks, trolleys, industrial equipment, and general engineering.",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link
          rel="alternate"
          type="text/markdown"
          href="/llms.txt"
          title="AI-readable company summary"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased font-opensans text-dark bg-white`}
      >
        {process.env.NODE_ENV === "production" && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=G-J8GHVD9N3S"
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-J8GHVD9N3S');
              `}
            </Script>
          </>
        )}
        
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
