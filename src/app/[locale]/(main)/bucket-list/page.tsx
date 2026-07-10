import React from "react";
import PageWrapper from "@/components/PageWrapper";

import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Timeline } from "@/components/ui/timeline";
import { Target, CheckCircle2, Circle, Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Bucket list | Rashedul Islam",
  description: "Explore the bucket list of Rashedul Islam, a Full-Stack Developer specializing in Next.js and React Native.",
};

export default async function BucketListPage({ params }: { params: Promise<{ locale: string }> }) {
  const t = await getTranslations("BucketListPage");
  const bucketListItems = [
    { title: t("items.item0.title"), completed: true, year: "2023", category: t("categories.Career") },
    { title: t("items.item1.title"), completed: true, year: "2022", category: t("categories.Adventure") },
    { title: t("items.item2.title"), completed: true, year: "2024", category: t("categories.Life") },
    { title: t("items.item3.title"), completed: false, year: null, category: t("categories.Career") },
    { title: t("items.item4.title"), completed: false, year: null, category: t("categories.Career") },
    { title: t("items.item5.title"), completed: false, year: null, category: t("categories.Career") },
    { title: t("items.item6.title"), completed: false, year: null, category: t("categories.Career") },
    { title: t("items.item7.title"), completed: false, year: null, category: t("categories.Travel") },
    { title: t("items.item8.title"), completed: false, year: null, category: t("categories.Travel") },
    { title: t("items.item9.title"), completed: false, year: null, category: t("categories.Travel") },
    { title: t("items.item10.title"), completed: false, year: null, category: t("categories.Travel") },
    { title: t("items.item11.title"), completed: false, year: null, category: t("categories.Life") },
    { title: t("items.item12.title"), completed: false, year: null, category: t("categories.Life") },
    { title: t("items.item13.title"), completed: false, year: null, category: t("categories.Life") },
    { title: t("items.item14.title"), completed: false, year: null, category: t("categories.Life") },
    { title: t("items.item15.title"), completed: true, year: "2023", category: t("categories.Career") },
  ];

  const totalItems = bucketListItems.length;
  const completedItems = bucketListItems.filter(i => i.completed).length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const data = [
    {
      title: t("sections.completed.title"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("sections.completed.desc")}
          </p>
          <div className="space-y-4">
            {bucketListItems.filter(item => item.completed).map((item, idx) => (
              <div 
                key={idx} 
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 md:p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                      {item.category}
                    </p>
                  </div>
                </div>
                {item.year && (
                  <div className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold shrink-0">
                    {item.year}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: t("sections.career.title"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("sections.career.desc")}
          </p>
          <div className="space-y-4">
            {bucketListItems.filter(item => !item.completed && item.category === t("categories.Career")).map((item, idx) => (
              <div 
                key={idx} 
                className="group flex items-start gap-4 p-5 md:p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-premium"
              >
                <div className="mt-1 shrink-0">
                  <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: t("sections.travel.title"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("sections.travel.desc")}
          </p>
          <div className="space-y-4">
            {bucketListItems.filter(item => !item.completed && item.category === t("categories.Travel")).map((item, idx) => (
              <div 
                key={idx} 
                className="group flex items-start gap-4 p-5 md:p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-premium"
              >
                <div className="mt-1 shrink-0">
                  <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: t("sections.life.title"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("sections.life.desc")}
          </p>
          <div className="space-y-4">
            {bucketListItems.filter(item => !item.completed && item.category === t("categories.Life")).map((item, idx) => (
              <div 
                key={idx} 
                className="group flex items-start gap-4 p-5 md:p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-premium"
              >
                <div className="mt-1 shrink-0">
                  <Circle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: t("sections.partner.title"),
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            {t("sections.partner.desc")}
          </p>
          <div className="p-6 md:p-10 rounded-3xl bg-card border border-border shadow-lg card-premium overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <p className="whitespace-pre-wrap text-sm md:text-base text-foreground font-serif leading-loose italic relative z-10">
              {t("sections.partner.letter")}
            </p>
          </div>
        </div>
      ),
    }
  ];

  return (
    <PageWrapper>
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--background))] border border-foreground/10 shadow-lg relative">
                    <Target className="w-6 h-6 text-primary" />
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
                  </div>
                </div>
                <h1 className="font-instrument-serif text-5xl md:text-7xl tracking-tight text-foreground mb-6">
                  {t("header.title1")}{" "}
                  <span
                    className="italic"
                    style={{
                      backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    {t("header.titleHighlight")}
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("header.description")}
                </p>
              </div>

              {/* Progress Bar Widget */}
              <div className="w-full md:w-72 shrink-0 p-6 rounded-[2rem] bg-[hsl(var(--background))] border border-foreground/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold text-foreground uppercase tracking-wider">{t("progress.title")}</span>
                    </div>
                    <span className="text-xl font-bold text-emerald-400">{progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-foreground/5 overflow-hidden mb-3">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    {completedItems} {t("progress.completedText")} {totalItems} {t("progress.goalsText")}
                  </p>
                </div>
              </div>
            </div>

      </div>
      <Timeline data={data} />
      <Footer />
    </PageWrapper>
  );
}
