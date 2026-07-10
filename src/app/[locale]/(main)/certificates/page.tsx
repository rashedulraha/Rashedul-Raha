import React from "react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { certificatesData } from "@/lib/certificate-data";
import { Award } from "lucide-react";
import CertificateList from "@/components/certificates/CertificateList";

export const metadata: Metadata = {
  title: "Certificates | Rashedul Islam",
  description: "A collection of certificates and achievements from my web development journey and other continuous learning experiences.",
};

export default async function CertificatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("CertificatesPage");

  return (
    <>
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
      <main className="min-h-screen bg-background selection:bg-primary/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Header Section */}
        <div className="relative mb-16 md:mb-20">
          <div className="absolute -top-10 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="text-muted-foreground">{t("header.title1")} </span>
                <span className="text-foreground">{t("header.titleHighlight")}</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {t("header.description")}
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

      </div>
      <Footer />
    </main>
    </>
  );
}
