import React from "react";

import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Timeline } from "@/components/ui/timeline";
import { Target, CheckCircle2, Circle, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Bucket list | Rashedul Islam",
  description: "Explore the bucket list of Rashedul Islam, a Full-Stack Developer specializing in Next.js and React Native.",
};

export default function BucketListPage() {
  const bucketListItems = [
    { title: "Contribute to a major open-source project", completed: true, year: "2023", category: "Career" },
    { title: "Go skydiving", completed: true, year: "2022", category: "Adventure" },
    { title: "Build my dream home workspace", completed: true, year: "2024", category: "Life" },
    { title: "Build a profitable SaaS business", completed: false, year: null, category: "Career" },
    { title: "Speak at a major tech conference", completed: false, year: null, category: "Career" },
    { title: "Reach 1,000 GitHub stars on a personal repository", completed: false, year: null, category: "Career" },
    { title: "Start a tech blog and reach 10k monthly readers", completed: false, year: null, category: "Career" },
    { title: "Visit Japan and experience the cherry blossoms", completed: false, year: null, category: "Travel" },
    { title: "Backpack across Europe", completed: false, year: null, category: "Travel" },
    { title: "See the Northern Lights", completed: false, year: null, category: "Travel" },
    { title: "Live in a different country for at least 6 months", completed: false, year: null, category: "Travel" },
    { title: "Run a full marathon", completed: false, year: null, category: "Life" },
    { title: "Learn to play the piano fluently", completed: false, year: null, category: "Life" },
    { title: "Read 100 books in a single year", completed: false, year: null, category: "Life" },
    { title: "Mentorship: Help 10 junior developers get their first job", completed: false, year: null, category: "Life" },
  ];

  const totalItems = bucketListItems.length;
  const completedItems = bucketListItems.filter(i => i.completed).length;
  const progressPercentage = Math.round((completedItems / totalItems) * 100);

  const data = [
    {
      title: "Completed",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            The milestones I&apos;ve already achieved. Looking back at these keeps me motivated to push forward on the rest of the list.
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
      title: "Career & Tech",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Professional goals focused on building impactful products, sharing knowledge, and pushing my technical boundaries.
          </p>
          <div className="space-y-4">
            {bucketListItems.filter(item => !item.completed && item.category === "Career").map((item, idx) => (
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
      title: "Travel & Adventure",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Places I want to see and experiences I want to have around the globe.
          </p>
          <div className="space-y-4">
            {bucketListItems.filter(item => !item.completed && item.category === "Travel").map((item, idx) => (
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
      title: "Life & Experiences",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Personal growth, physical challenges, and giving back to the community.
          </p>
          <div className="space-y-4">
            {bucketListItems.filter(item => !item.completed && item.category === "Life").map((item, idx) => (
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
    }
  ];

  return (
    <>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 relative">


        {/* Abstract Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        <main className="w-full relative z-10 pt-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <div className="inline-flex items-center justify-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--background))] border border-foreground/10 shadow-lg relative">
                    <Target className="w-6 h-6 text-primary" />
                    <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
                  </div>
                </div>
                <h1 className="font-instrument-serif text-5xl md:text-7xl tracking-tight text-foreground mb-6">
                  The{" "}
                  <span
                    className="italic"
                    style={{
                      backgroundImage: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}>
                    Bucket List
                  </span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A running list of things I want to do, see, and achieve in my lifetime. It&apos;s a mix of professional milestones, crazy adventures, and personal growth goals.
                </p>
              </div>

              {/* Progress Bar Widget */}
              <div className="w-full md:w-72 shrink-0 p-6 rounded-[2rem] bg-[hsl(var(--background))] border border-foreground/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-bold text-foreground uppercase tracking-wider">Progress</span>
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
                    {completedItems} completed out of {totalItems} goals
                  </p>
                </div>
              </div>
            </div>

          </div>

          <Timeline data={data} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
