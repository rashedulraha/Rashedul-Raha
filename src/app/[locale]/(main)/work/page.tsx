import React from "react";
import Footer from "@/components/Footer";
import { projects } from "@/lib/work-data";
import { Metadata } from "next";
import WorkList from "@/components/work/WorkList";
import { useTranslations } from "next-intl";

import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Work | Rashedul Islam",
  description: "View the portfolio and featured projects of Rashedul Islam.",
};

export default function WorkPage() {
  const t = useTranslations("WorkPage");
  return (
    <PageWrapper>
      {/* Hero Header */}
      <div className="mb-12 text-center pt-8">
        <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-[0.2em]">
          {t("portfolio")}
        </p>
        <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground">
          {t("featured")}{" "}
          <span
            className="italic"
            style={{
              backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            {t("projects")}
          </span>
        </h1>
      </div>

      {/* Filterable Work List */}
      <WorkList initialProjects={projects} />
      
      <Footer />
    </PageWrapper>
  );
}
