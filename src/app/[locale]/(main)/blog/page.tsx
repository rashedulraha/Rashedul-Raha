import React from "react";

import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blog-data";
import { Metadata } from "next";
import BlogList from "@/components/blog/BlogList";
import { useTranslations } from "next-intl";

import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Blog | Rashedul Islam",
  description: "Read articles on web development, Next.js, and React Native by Rashedul Islam.",
};

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  return (
    <PageWrapper>
      {/* Hero Header */}
      <div className="mb-12 text-center">
        <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-[0.2em]">
          {t("pageSubtitle")}
        </p>
        <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground">
          {t("pageTitle1")}{" "}
          <span
            className="italic"
            style={{
              backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            {t("pageTitle2")}
          </span>
        </h1>
      </div>

      {/* Filterable Blog List */}
      <BlogList initialPosts={blogPosts} />
      
      <Footer />
    </PageWrapper>
  );
}
