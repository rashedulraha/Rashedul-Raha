import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";
import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog | Aayush Bharti",
  description: "Handpicked insights on design, engineering, and everything in between.",
};

export default function BlogPage() {
  return (
    <>
      <div className="bg-[#0b0b0b] min-h-screen text-foreground selection:bg-primary/30">
        <Navbar />
        
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
              <p className="mb-4 font-semibold text-neutral-400 text-xs uppercase tracking-[0.2em]">
                THE PENSIEVE
              </p>
              <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-white">
                Handpicked{" "}
                <span
                  className="italic"
                  style={{
                    backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #e879f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  Insights
                </span>
              </h1>
            </div>

            {/* Filterable Blog List */}
            <BlogList initialPosts={blogPosts} />
            
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
