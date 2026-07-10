import React from "react";
import Footer from "@/components/Footer";
import { getTranslations } from "next-intl/server";
import { certificatesData } from "@/lib/certificate-data";
import Image from "next/image";
import { Link } from "@/routing";
import { ArrowLeft, Calendar, Award, Building2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const certificate = certificatesData.find((c) => c.id === resolvedParams.slug);

  if (!certificate) {
    return { title: "Certificate Not Found" };
  }

  return {
    title: `${certificate.id.replace(/-/g, " ")} | Rashedul Islam`,
  };
}

export default async function CertificateDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const t = await getTranslations("CertificatesPage");
  const certificate = certificatesData.find((c) => c.id === resolvedParams.slug);

  if (!certificate) {
    notFound();
  }

  // Use a fallback for title/desc if keys somehow don't exist yet
  const title = t(`certificates.${certificate.id}.title`);
  const description = t(`certificates.${certificate.id}.description`);
  const skills = t(`certificates.${certificate.id}.skills`);

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-32 pb-20">
        
        <Link href="/certificates" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Certificates
        </Link>

        <div className="bg-card border border-border rounded-3xl overflow-hidden card-premium mb-12">
          <div className="relative w-full aspect-video bg-muted border-b border-border">
            <Image
              src={certificate.image}
              alt={title}
              fill
              className="object-contain p-4 md:p-8"
            />
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
                {certificate.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-8">
              {title}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Issuer</p>
                  <p className="text-foreground font-semibold">{certificate.issuer}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Date</p>
                  <p className="text-foreground font-semibold">{certificate.date}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  About the Certificate
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Skills Gained</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.split(',').map((skill, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-foreground/5 text-foreground border border-foreground/10 rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
