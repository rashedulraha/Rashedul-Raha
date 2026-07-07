import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import GuestbookGrid from "@/components/GuestbookGrid";
import { getGuestbookMessages } from "@/actions/guestbook";

export const metadata: Metadata = {
  title: "Guestbook | Rashedul Islam",
  description: "Words that echo always.",
};

export default async function GuestbookPage() {
  const initialMessages = await getGuestbookMessages();

  return (
    <>
      <div className="bg-[#0b0b0b] min-h-screen text-foreground selection:bg-primary/30 relative">
        <Navbar />
        
        {/* Crumpled paper texture background overlay (simulated with CSS pattern) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               mixBlendMode: "overlay"
             }}
        />

        <main className="pt-32 pb-20 relative z-10">
          <div className="container relative mx-auto max-w-6xl px-4 sm:px-6">
            
            {/* Header */}
            <div className="mb-20 text-center pt-12">
              <p className="mb-4 font-semibold text-neutral-400 text-[10px] sm:text-xs uppercase tracking-[0.3em]">
                THE WALL REMEMBERS
              </p>
              <h1 className="font-serif text-5xl md:text-7xl tracking-tight text-white">
                Words That Echo{" "}
                <span
                  className="italic font-instrument-serif font-light tracking-normal"
                  style={{
                    backgroundImage: "linear-gradient(to right, #9333ea, #e879f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  Always
                </span>
              </h1>
            </div>

            {/* Interactive Masonry Grid */}
            <GuestbookGrid initialMessages={initialMessages} />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
