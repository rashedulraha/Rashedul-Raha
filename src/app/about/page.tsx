import React from "react";

import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Aayush Bharti",
  description: "Learn more about my background, experience, and the tools I use.",
};

export default function AboutPage() {
  return (
    <>
      <div>

        
        {/* Background gradient (glow) */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 z-40 h-22.5 w-full select-none lg:h-25 top-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent)",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        />

        <main className="min-h-screen pt-32 pb-20 overflow-hidden">
          {/* We wrap the content in the background styling seen on the main page for consistency */}
          <div className="container relative flex flex-col max-sm:px-1 mx-auto ">
            <div className="grid flex-1 grid-cols-[12px_1fr_12px] lg:grid-cols-[32px_1fr_32px]">
              
              <div
                aria-hidden="true"
                className="w-full border-x bg-size-[5px_5px] mask-[linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
              />
              
              <div className="relative col-span-1 min-w-0">
                {/* About Section */}
                <AboutSection />
              </div>

              <div
                aria-hidden="true"
                className="w-full border-x bg-size-[5px_5px] mask-[linear-gradient(to_bottom,transparent,black_10rem)] bg-[linear-gradient(45deg,var(--color-neutral-300)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-300)_50%,var(--color-neutral-300)_62.50%,transparent_62.50%,transparent_100%)] dark:bg-[linear-gradient(45deg,var(--color-neutral-800)_12.50%,transparent_12.50%,transparent_50%,var(--color-neutral-800)_50%,var(--color-neutral-800)_62.50%,transparent_62.50%,transparent_100%)]"
              />
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
