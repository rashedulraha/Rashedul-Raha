import React from "react";
import PageWrapper from "@/components/PageWrapper";

import Footer from "@/components/Footer";
import { Metadata } from "next";
import GuestbookGrid from "@/components/GuestbookGrid";
import { getGuestbookMessages } from "@/actions/guestbook";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Guestbook | Rashedul Islam",
  description: "Explore the guestbook of Rashedul Islam, a Full-Stack Developer specializing in Next.js and React Native.",
};

export default async function GuestbookPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("GuestbookPage");
  const initialMessages = await getGuestbookMessages();

  return (
    <PageWrapper className="max-w-6xl">
      {/* Crumpled paper texture background overlay (simulated with CSS pattern) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             mixBlendMode: "overlay"
           }}
      />

      <div>
        {/* Header */}
        <div className="mb-20 text-center pt-12">
              <p className="mb-4 font-semibold text-muted-foreground text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                {t("subtitle")}
              </p>
              <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-foreground">
                {t("title1")}{" "}
                <span
                  className="italic font-instrument-serif font-light tracking-normal"
                  style={{
                    backgroundImage: "linear-gradient(to right, #9333ea, #e879f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  {t("titleHighlight")}
                </span>
              </h1>
            </div>

            {/* Interactive Masonry Grid */}
            <GuestbookGrid initialMessages={initialMessages} />
      </div>
      <Footer />
    </PageWrapper>
  );
}
