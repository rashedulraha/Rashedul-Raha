"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/routing";
import { ArrowRight, Search, ExternalLink } from "lucide-react";
import { Certificate } from "@/lib/certificate-data";
import { useTranslations } from "next-intl";

export default function CertificateList({ initialCertificates }: { initialCertificates: Certificate[] }) {
  const t = useTranslations("CertificatesPage");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertificates = useMemo(() => {
    return initialCertificates.filter((cert) => {
      const translatedTitle = t(`certificates.${cert.id}.title`).toLowerCase();
      const translatedDesc = t(`certificates.${cert.id}.description`).toLowerCase();
      const translatedSkills = t(`certificates.${cert.id}.skills`).toLowerCase();
      const issuer = cert.issuer.toLowerCase();
      
      const query = searchQuery.toLowerCase();
      
      return (
        translatedTitle.includes(query) ||
        translatedDesc.includes(query) ||
        translatedSkills.includes(query) ||
        issuer.includes(query)
      );
    });
  }, [initialCertificates, searchQuery, t]);

  const webDevCertificates = filteredCertificates.filter(c => c.category === "Web Development Journey");
  const otherCertificates = filteredCertificates.filter(c => c.category === "Other Achievements");

  return (
    <>
      {/* Search Bar */}
      <div className="relative max-w-md w-full mb-12">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search certificates, skills, issuers..."
          className="block w-full pl-12 pr-4 py-3 bg-card border border-border rounded-2xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-sm"
        />
      </div>

      {filteredCertificates.length === 0 ? (
        <div className="text-center py-20 bg-card border border-border rounded-3xl">
          <p className="text-muted-foreground">No certificates found matching "{searchQuery}"</p>
        </div>
      ) : (
        <>
          {/* Web Development Journey Section */}
          {webDevCertificates.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{t("sections.webDev")}</h2>
                <div className="h-px bg-border flex-1" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {webDevCertificates.map((cert) => (
                  <div key={cert.id} className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden card-premium hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
                    <Link href={`/certificates/${cert.id}`} className="block relative h-40 w-full overflow-hidden bg-muted">
                      <Image
                        src={cert.image}
                        alt={cert.id}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          {cert.issuer}
                        </span>
                        <span className="text-[10px] font-medium text-muted-foreground">{cert.date}</span>
                      </div>
                      <Link href={`/certificates/${cert.id}`} className="block">
                        <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                          {t(`certificates.${cert.id}.title`)}
                        </h3>
                      </Link>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between">
                        <Link href={`/certificates/${cert.id}`} className="flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group/link">
                          {t("viewDetails")}
                          <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                        </Link>
                        
                        <a 
                          href={cert.credentialUrl || "#"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => !cert.credentialUrl && e.preventDefault()}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${cert.credentialUrl ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground/50 cursor-not-allowed'}`}
                        >
                          Credential <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Achievements Section */}
          {otherCertificates.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">{t("sections.other")}</h2>
                <div className="h-px bg-border flex-1" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {otherCertificates.map((cert) => (
                   <div key={cert.id} className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden card-premium hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md">
                   <Link href={`/certificates/${cert.id}`} className="block relative h-40 w-full overflow-hidden bg-muted">
                     <Image
                       src={cert.image}
                       alt={cert.id}
                       fill
                       className="object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   </Link>
                   <div className="p-5 flex flex-col flex-1">
                     <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                         {cert.issuer}
                       </span>
                       <span className="text-[10px] font-medium text-muted-foreground">{cert.date}</span>
                     </div>
                     <Link href={`/certificates/${cert.id}`} className="block">
                       <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                         {t(`certificates.${cert.id}.title`)}
                       </h3>
                     </Link>
                     
                     <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                       <Link href={`/certificates/${cert.id}`} className="flex items-center text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group/link">
                         {t("viewDetails")}
                         <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all" />
                       </Link>
                       
                       <a 
                         href={cert.credentialUrl || "#"} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         onClick={(e) => !cert.credentialUrl && e.preventDefault()}
                         className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${cert.credentialUrl ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-muted text-muted-foreground/50 cursor-not-allowed'}`}
                       >
                         Credential <ExternalLink className="w-3 h-3" />
                       </a>
                     </div>
                   </div>
                 </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
