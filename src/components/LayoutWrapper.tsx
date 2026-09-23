"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SocialMediaSidebar from "./SocialMediaSidebar";
import WhatsAppButton from "./WhatsAppButton";
import Banner from "./Banner";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Don't show main site navigation for admin routes
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // Show full layout for regular routes
  return (
    <>
      <Navbar />
      <Banner />
      <main>{children}</main>
      <Footer />
      <SocialMediaSidebar />
      <WhatsAppButton />
    </>
  );
}
