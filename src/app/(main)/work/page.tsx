import React from "react";

import Footer from "@/components/Footer";
import { projects } from "@/lib/work-data";
import { Metadata } from "next";
import WorkList from "@/components/work/WorkList";

export const metadata: Metadata = {
  title: "Work | Aayush Bharti",
  description: "A selection of projects and technical achievements.",
};

export default function WorkPage() {
  return (
    <>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">

        
        {/* Background gradient from hero */}
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
        
        <main className="pt-32 pb-20">
          <div className="container relative mx-auto max-w-7xl px-4 sm:px-6">
            
            {/* Hero Header */}
            <div className="mb-12 text-center pt-8">
              <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-[0.2em]">
                PORTFOLIO
              </p>
              <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground">
                Featured{" "}
                <span
                  className="italic"
                  style={{
                    backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #e879f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  Projects
                </span>
              </h1>
            </div>

            {/* Filterable Work List */}
            <WorkList initialProjects={projects} />
            
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
