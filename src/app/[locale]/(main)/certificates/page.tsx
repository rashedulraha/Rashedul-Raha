import React from "react";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { certificatesData } from "@/lib/certificate-data";
import Image from "next/image";
import { Link } from "@/routing";
import { ArrowRight, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Certificates | Rashedul Islam",
  description: "A collection of certificates and achievements from my web development journey and other continuous learning experiences.",
};

export default async function CertificatesPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("CertificatesPage");

  const webDevCertificates = certificatesData.filter(c => c.category === "Web Development Journey");
  const otherCertificates = certificatesData.filter(c => c.category === "Other Achievements");

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
        {/* Header Section */}
        <div className="relative mb-20 md:mb-32">
          <div className="absolute -top-10 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="text-muted-foreground">{t("header.title1")} </span>
                <span className="text-foreground">{t("header.titleHighlight")}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t("header.description")}
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0 bg-card/50 backdrop-blur-sm border border-border px-6 py-4 rounded-3xl">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Total Earned</p>
                <p className="text-2xl font-bold text-foreground">{certificatesData.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Web Development Journey Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("sections.webDev")}</h2>
            <div className="h-px bg-border flex-1" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {webDevCertificates.map((cert) => (
              <Link href={`/certificates/${cert.id}`} key={cert.id} className="group flex flex-col rounded-3xl bg-card border border-border overflow-hidden card-premium hover:border-primary/30 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={cert.image}
                    alt={cert.id}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-muted-foreground">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {t(`certificates.${cert.id}.title`)}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {t("viewDetails")}
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Achievements Section */}
        <div>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">{t("sections.other")}</h2>
            <div className="h-px bg-border flex-1" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCertificates.map((cert) => (
              <Link href={`/certificates/${cert.id}`} key={cert.id} className="group flex flex-col rounded-3xl bg-card border border-border overflow-hidden card-premium hover:border-primary/30 transition-all duration-300">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <Image
                    src={cert.image}
                    alt={cert.id}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {cert.issuer}
                    </span>
                    <span className="text-xs text-muted-foreground">{cert.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {t(`certificates.${cert.id}.title`)}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {t("viewDetails")}
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}
