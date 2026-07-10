import React from "react";

import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Uses | Rashedul Islam",
  description: "Explore the uses of Rashedul Islam, a Full-Stack Developer specializing in Next.js and React Native.",
};

export default function UsesPage() {
  const t = useTranslations("UsesPage");
  const data = [
    {
      title: t("hardware"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("hardwareDesc")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="MacBook Pro Setup"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-foreground font-bold text-lg">{t("macTitle")}</h4>
                  <p className="text-muted-foreground text-sm">{t("macDesc")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1595225476474-87563907a212?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Mechanical Keyboard"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-foreground font-bold text-lg">{t("keychronTitle")}</h4>
                  <p className="text-muted-foreground text-sm">{t("keychronDesc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("devTools"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("devToolsDesc")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Terminal and Code"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-foreground font-bold text-lg">{t("neovimTitle")}</h4>
                  <p className="text-muted-foreground text-sm">{t("neovimDesc")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full bg-[hsl(var(--background))] p-8 flex flex-col justify-center border-t border-foreground/5">
                <h4 className="text-foreground font-bold text-lg mb-2">{t("weztermTitle")}</h4>
                <p className="text-muted-foreground text-sm mb-4">{t("weztermDesc")}</p>
                <div className="h-px w-full bg-foreground/10 mb-4" />
                <h4 className="text-foreground font-bold text-lg mb-2">{t("arcTitle")}</h4>
                <p className="text-muted-foreground text-sm">{t("arcDesc")}</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("techStack"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("techStackDesc")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-background group">
              <div className="relative h-48 md:h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="React and Nextjs"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h4 className="text-foreground font-bold text-lg">{t("reactTitle")}</h4>
                  <p className="text-muted-foreground text-sm">{t("reactDesc")}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl bg-[hsl(var(--background))] p-6 flex flex-col justify-center">
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 glass">TypeScript</span>
                <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20 glass">Tailwind CSS</span>
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 glass">Framer Motion</span>
                <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium border border-secondary/20 glass">Supabase</span>
                <span className="px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium border border-border glass">Cloudflare</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 relative">


        <main className="w-full relative z-10 pt-20">
          <Timeline data={data} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
