"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@/routing";
import { getCertificates } from "@/services/apiService";
import { Skeleton } from "@/components/ui/skeleton";

export interface ICertificate {
  id: string;
  category: string;
  image: string;
  actualCertificateImage?: string;
  title?: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

export default function CertificatesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [certs, setCerts] = useState<ICertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCerts() {
      setIsLoading(true);
      try {
        const res = await getCertificates();
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setCerts(res.data.data);
        }
      } catch (err) {
        console.error("Error loading certificates:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadCerts();
  }, []);

  const topCertificates = certs.slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-12 md:py-16 overflow-hidden"
      id="certificates">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="mb-8 md:mb-12 flex flex-col items-center text-center">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
          VERIFIED CREDENTIALS
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground mb-3">
          My{" "}
          <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
            Certificates & Achievements.
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl leading-relaxed">
          A showcase of verified technical certifications, courses, and professional credentials.
        </p>
      </motion.div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-4"
            >
              <div>
                <Skeleton className="aspect-[16/10] w-full rounded-xl mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2 rounded-md" />
                <div className="flex justify-between items-center mt-2">
                  <Skeleton className="h-4 w-1/3 rounded-md" />
                  <Skeleton className="h-4 w-1/4 rounded-md" />
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-border/40 flex justify-between">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-14 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {topCertificates.map((certificate, index) => {
          const displayTitle = certificate.title || certificate.id.replace(/-/g, " ");

          return (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm p-4 transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-lg">
              
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-muted mb-4">
                  <Image
                    src={certificate.image}
                    alt={displayTitle}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-foreground border border-border/50">
                    {certificate.category}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                  {displayTitle}
                </h3>

                <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                  <span>{certificate.issuer}</span>
                  <span>{certificate.date}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                <Link
                  href={`/certificates/${certificate.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {certificate.credentialUrl && (
                  <a
                    href={certificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    Verify <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      )}

      {/* View All Button */}
      <div className="flex justify-center">
        <Link
          href="/certificates"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-6 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10">
          Explore All Certificates <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
