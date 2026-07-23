import React from "react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import PageWrapper from "@/components/PageWrapper";
import { getBlogs } from "@/services/apiService";

export const metadata: Metadata = {
  title: "Blog | Rashedul Islam",
  description: "Read articles on web development, Next.js, and React Native by Rashedul Islam.",
};

export default async function BlogPage() {
  let blogs = [];
  try {
    const res = await getBlogs();
    if (res.data?.success && Array.isArray(res.data?.data)) {
      blogs = res.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
  }

  return (
    <PageWrapper>
      {/* Hero Header */}
      <div className="mb-12 text-center">
        <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-[0.2em]">
          Articles & Insights
        </p>
        <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground">
          Writing on{" "}
          <span
            className="italic"
            style={{
              backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            software development.
          </span>
        </h1>
      </div>

      {/* Filterable Blog List */}
      <BlogList initialPosts={blogs} />
      
      <Footer />
    </PageWrapper>
  );
}
