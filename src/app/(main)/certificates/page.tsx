import React from "react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { certificatesData } from "@/lib/certificate-data";
import { Award } from "lucide-react";
import CertificateList from "@/components/certificates/CertificateList";

import PageWrapper from "@/components/PageWrapper";

export const metadata: Metadata = {
  title: "Certificates | Rashedul Islam",
  description: "A collection of certificates and achievements from my web development journey and other continuous learning experiences.",
};

export default async function CertificatesPage() {
  const t = await getTranslations();

  return (
    <PageWrapper>
      {/* Header Section */}
      <div className="relative mb-16 md:mb-20">
        <div className="absolute -top-10 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
              <span className="text-muted-foreground">My </span>
              <span className="text-foreground">Certificates & Credentials</span>
            </h1>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              A comprehensive list of official certifications, professional awards, and specialized training programs.
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0 bg-card/50 backdrop-blur-sm border border-border px-5 py-3 rounded-2xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">Total Earned</p>
              <p className="text-xl font-bold text-foreground leading-none">{certificatesData.length}</p>
            </div>
          </div>
        </div>
      </div>

      <CertificateList initialCertificates={certificatesData} />

      <Footer />
    </PageWrapper>
  );
}
