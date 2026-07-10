"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { certificatesData } from "@/lib/certificate-data";
import { Link } from "@/routing";
import { useTranslations } from "next-intl";

export default function CertificatesSection() {
  const t = useTranslations("CertificatesPage");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Get top 3 certificates
  const topCertificates = certificatesData.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-pagebuilder overflow-hidden"
      id="certificates">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 md:mb-20 flex flex-col items-center text-center">
        <h2 className="font-instrument-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground mb-6 relative">
          My{" "}
          <span
            className="italic pr-2"
            style={{
              backgroundImage:
                "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            Certificates
          </span>
          <div className="absolute -right-4 -top-4 w-8 h-8 rounded-full bg-primary/10 blur-xl" />
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed">
          {t("subtitle")}
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {topCertificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group flex flex-col rounded-2xl bg-card border border-border overflow-hidden card-premium hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
          >
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
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center">
        <Link
          href="/certificates"
          className="group flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 text-primary font-medium border border-primary/20 hover:bg-primary/20 transition-all shadow-sm hover:shadow">
          View All Certificates
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  );
}
