import React from "react";
import Footer from "@/components/Footer";
import Image from "next/image";
import { Link } from "@/routing";
import { ArrowLeft, Calendar, Award, Building2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import PageWrapper from "@/components/PageWrapper";
import { getCertificates } from "@/services/apiService";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  let certificate = null;
  try {
    const res = await getCertificates();
    if (res.data?.success && Array.isArray(res.data?.data)) {
      certificate = res.data.data.find((c: any) => c.id === resolvedParams.slug);
    }
  } catch (e) {
    console.error("Failed to generate metadata for certificate", e);
  }

  if (!certificate) {
    return { title: "Certificate | Rashedul Islam" };
  }

  return {
    title: `${certificate.title} | Rashedul Islam`,
  };
}

export default async function CertificateDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  
  let certificate = null;
  try {
    const res = await getCertificates();
    if (res.data?.success && Array.isArray(res.data?.data)) {
      certificate = res.data.data.find((c: any) => c.id === resolvedParams.slug);
    }
  } catch (error) {
    console.error("Failed to fetch certificate:", error);
  }

  if (!certificate) {
    notFound();
  }

  const title = certificate.title;
  const description = certificate.description || "Certificate of Completion";
  const skills = certificate.skills || "";

  return (
    <PageWrapper className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <Link href="/certificates" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Certificates
        </Link>
        
        {certificate.credentialUrl && (
          <a 
            href={certificate.credentialUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View Credential
            <Award className="w-4 h-4 ml-1.5" />
          </a>
        )}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm mb-10">
        <div className="relative w-full aspect-[21/9] bg-muted border-b border-border">
          { (certificate.actualCertificateImage || certificate.image) && (
            <Image
              src={certificate.actualCertificateImage || certificate.image}
              alt={title}
              fill
              className="object-contain p-4 md:p-6"
            />
          )}
        </div>
        
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider">
              {certificate.issuer}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-6">
            {title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-muted/50 p-4 rounded-xl border border-border">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border">
                <Building2 className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">Issuer</p>
                <p className="text-sm text-foreground font-semibold">{certificate.issuer}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 border border-border">
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-0.5">Date</p>
                <p className="text-sm text-foreground font-semibold">
                  {certificate.date}
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <div className="text-base leading-relaxed text-muted-foreground mb-8">
              {description}
            </div>
            
            {skills && (
              <div className="pt-6 border-t border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Skills Gained</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.split(',').map((skill: string, index: number) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-foreground/5 text-foreground border border-foreground/10 rounded-full text-sm font-medium"
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
      <Footer />
    </PageWrapper>
  );
}
