import React from "react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import WorkList from "@/components/work/WorkList";
import { getTranslations } from "next-intl/server";

import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Work | Rashedul Islam",
  description: "View the portfolio and featured projects of Rashedul Islam.",
};

export default async function WorkPage() {
  const t = await getTranslations();

  return (
    <PageWrapper>
      {/* Hero Header */}
      <div className="mb-8 text-center">
        <p className="mb-3 font-semibold text-primary text-xs uppercase tracking-widest">
          PORTFOLIO
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground">
          Featured{" "}
          <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
            Projects & Software
          </span>
        </h1>
      </div>

      {/* Filterable Work List */}
      <WorkList initialProjects={[]} />
      
      <Footer />
    </PageWrapper>
  );
}
