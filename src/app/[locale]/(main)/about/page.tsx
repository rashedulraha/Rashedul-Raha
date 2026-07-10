import React from "react";

import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import Experience from "@/components/Experience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Rashedul Islam",
  description: "Learn more about Rashedul Islam, a Full-Stack Developer specializing in Next.js and React Native.",
};

import PageWrapper from "@/components/PageWrapper";

export default function AboutPage() {
  return (
    <PageWrapper mainClassName="overflow-hidden">
      <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
        
        <div
          aria-hidden="true"
          className="w-full border-x bg-size-[5px_5px] mask-[linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
        />
        
        <div className="relative col-span-1 min-w-0">
          {/* About Section */}
          <AboutSection />
          
          {/* Experience Section */}
          <Experience />
        </div>

        <div
          aria-hidden="true"
          className="w-full border-x bg-size-[5px_5px] mask-[linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
        />
      </div>
      <Footer />
    </PageWrapper>
  );
}
