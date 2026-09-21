"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import { HiSparkles } from "react-icons/hi2";
import { BannerConfig } from "@/lib/firebase/firestore";
import { useAuth } from "@/contexts/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db, isFirebaseConfigured } from "@/lib/firebase/config";

const Banner = () => {
  const [banner, setBanner] = useState<BannerConfig | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const shadeColor = (color: string, percent: number) => {
    try {
      const c = color.replace("#", "");
      const r = parseInt(c.substring(0, 2), 16);
      const g = parseInt(c.substring(2, 4), 16);
      const b = parseInt(c.substring(4, 6), 16);
      const adjust = (v: number) =>
        Math.min(255, Math.max(0, Math.floor(v + (percent / 100) * 255)));
      const rr = adjust(r).toString(16).padStart(2, "0");
      const gg = adjust(g).toString(16).padStart(2, "0");
      const bb = adjust(b).toString(16).padStart(2, "0");
      return `#${rr}${gg}${bb}`;
    } catch {
      return color;
    }
  };

  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const ref = doc(db, "banners", "main");
    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as BannerConfig;
          setBanner({ id: snap.id, ...data });
        } else {
          setBanner(null);
        }
      },
      (error) => {
        console.error("Failed to subscribe to banner config", error);
      }
    );
    return () => unsubscribe();
  }, []);

  const checkVisibility = (config: BannerConfig) => {
    if (!config.isEnabled) {
      setIsVisible(false);
      return;
    }

    const now = new Date();
    if (config.startDate && new Date(config.startDate) > now) {
      setIsVisible(false);
      return;
    }
    if (config.endDate && new Date(config.endDate) < now) {
      setIsVisible(false);
      return;
    }

    const dismissedUntil = localStorage.getItem("banner_dismissed_until");
    if (dismissedUntil && new Date(dismissedUntil) > now) {
      setIsVisible(false);
      return;
    }

    if (config.targetAudience === 'homepage_only' && pathname !== '/') {
      setIsVisible(false);
      return;
    }
    
    if (config.excludeAdmins && user) {
        setIsVisible(false);
        return;
    }

    setIsVisible(true);
  };

  useEffect(() => {
    if (banner) {
        checkVisibility(banner);
    }
  }, [banner, pathname, user]);


  const handleDismiss = () => {
    setIsVisible(false);
    // Dismiss for 7 days
    const dismissUntil = new Date();
    dismissUntil.setDate(dismissUntil.getDate() + 7);
    localStorage.setItem("banner_dismissed_until", dismissUntil.toISOString());
    
    // Analytics event
    if (typeof window !== 'undefined') {
        const w = window as unknown as { gtag?: (...args: unknown[]) => void };
        w.gtag?.('event', 'banner_dismissed', {
            'event_category': 'engagement',
            'event_label': banner?.productName
        });
    }
  };

  const handleCtaClick = () => {
      if (typeof window !== 'undefined') {
          const w = window as unknown as { gtag?: (...args: unknown[]) => void };
          w.gtag?.('event', 'banner_clicked', {
              'event_category': 'engagement',
              'event_label': banner?.productName
          });
      }
  };

  if (!isVisible || !banner) return null;

  return (
    <div
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        backgroundImage: `linear-gradient(90deg, ${banner.backgroundColor}, ${shadeColor(
          banner.backgroundColor,
          -10
        )})`,
        color: banner.textColor,
      }}
      role="region"
      aria-label="Announcement"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 py-3 min-h-[44px] sm:min-h-[52px]">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm shadow-sm">
              <HiSparkles size={18} />
            </span>
            {banner.leadIn && (
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider bg-white/15 ring-1 ring-white/25">
                {banner.leadIn}
              </span>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left text-sm sm:text-[15px] font-semibold leading-tight">
            <span className="inline">
              {banner.productName}
              <span className="mx-2 hidden sm:inline">•</span>
              {banner.benefit}
            </span>
            {banner.subText && (
              <span className="ml-2 hidden md:inline text-xs font-normal opacity-90">
                {banner.subText}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`${banner.ctaLink}${banner.ctaLink.includes("?") ? "&" : "?"}utm_source=banner&utm_campaign=${banner.productName
                .toLowerCase()
                .replace(/\s+/g, "_")}_launch&utm_medium=sitewide`}
              onClick={handleCtaClick}
              className="inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm font-bold text-gray-900 bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {banner.ctaText}
            </Link>

            <button
              onClick={handleDismiss}
              className="p-2 rounded-full hover:bg-black/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/60"
              aria-label="Dismiss announcement"
            >
              <MdClose size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
