import React from "react";

import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Timeline } from "@/components/ui/timeline";
import { Heart, Type, Code, Sparkles, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Attribution | Rashedul Islam",
  description: "Giving credit to the amazing creators and open-source projects that make this site possible.",
};

export default function AttributionPage() {
  const data = [
    {
      title: "Typography",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Typography forms the backbone of this portfolio&apos;s premium feel. I chose typefaces that blend editorial elegance with modern digital aesthetics.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <a 
              href="https://fonts.google.com/specimen/Instrument+Serif" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl bg-[hsl(var(--background))] border border-foreground/5 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                  <Type className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-lg font-instrument-serif tracking-wide">Instrument Serif</h4>
                  <p className="text-muted-foreground text-sm">Google Fonts</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                View Source <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
            
            <a 
              href="https://vercel.com/font" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-3xl bg-[hsl(var(--background))] border border-foreground/5 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-muted border border-foreground/10 text-muted-foreground">
                  <Type className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-bold text-lg tracking-tight">Geist & Geist Mono</h4>
                  <p className="text-muted-foreground text-sm">Vercel</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-muted-foreground transition-colors">
                View Source <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Frameworks",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            The incredible open-source frameworks and libraries that power the core logic, styling, and fluid animations of the entire application.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="https://nextjs.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-premium"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center border border-foreground/10">
                  <Code className="w-5 h-5 text-foreground" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <h4 className="text-foreground font-bold text-xl mb-1">Next.js</h4>
              <p className="text-muted-foreground text-sm mb-4">by Vercel</p>
              <p className="text-muted-foreground text-sm leading-relaxed">The core React framework powering the entire application architecture and routing.</p>
            </a>

            <a 
              href="https://tailwindcss.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-premium"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h4 className="text-foreground font-bold text-xl mb-1">Tailwind CSS</h4>
              <p className="text-muted-foreground text-sm mb-4">by Tailwind Labs</p>
              <p className="text-muted-foreground text-sm leading-relaxed">The utility-first CSS framework used for all rapid and responsive styling.</p>
            </a>

            <a 
              href="https://www.framer.com/motion/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group sm:col-span-2 p-6 rounded-3xl bg-card border border-border hover:border-primary/30 transition-all duration-300 card-premium"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold text-xl">Framer Motion</h4>
                    <p className="text-muted-foreground text-sm">by Framer</p>
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">The incredible animation library used for the fluid interactions, scroll reveals, and liquid glass page transitions.</p>
            </a>
          </div>
        </div>
      ),
    },
    {
      title: "Inspiration",
      content: (
        <div>
          <p className="text-muted-foreground text-sm md:text-base font-normal mb-8 leading-relaxed max-w-2xl">
            Great design is rarely created in a vacuum. These are the amazing creators and platforms that heavily inspired the visual direction of this portfolio.
          </p>
          <div className="flex flex-col space-y-4">
            <a 
              href="https://ui.aceternity.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden p-6 rounded-3xl bg-[hsl(var(--background))] border border-foreground/5 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-foreground font-bold text-xl">Aceternity UI</h4>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <p className="text-muted-foreground text-sm mb-4">by Manu Arora</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Massive inspiration for many of the premium, interactive components like this very Timeline and the World Map.</p>
              </div>
            </a>
            
            <a 
              href="https://magicui.design/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative overflow-hidden p-6 rounded-3xl bg-[hsl(var(--background))] border border-foreground/5 hover:border-foreground/20 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-foreground font-bold text-xl">Magic UI</h4>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-muted-foreground text-sm mb-4">by Magic UI</p>
                <p className="text-muted-foreground text-sm leading-relaxed">Inspiration for the sleek, modern animations, borders, and glassmorphism micro-interactions.</p>
              </div>
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="bg-background min-h-screen text-foreground selection:bg-primary/30 relative">

        
        {/* Abstract Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]" />
        </div>

        <main className="w-full relative z-10 pt-20">
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12">
             <div className="inline-flex items-center justify-center mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--background))] border border-foreground/10 shadow-[0_0_40px_rgba(248,113,113,0.1)] relative">
                  <Heart className="w-6 h-6 text-red-400" />
                  <div className="absolute inset-0 rounded-full border border-red-400/20 animate-ping opacity-20" />
                </div>
              </div>
              <h1 className="font-instrument-serif text-5xl md:text-7xl tracking-tight text-foreground mb-6">
                Credit Where <br className="hidden md:block" />
                <span
                  className="italic"
                  style={{
                    backgroundImage: "linear-gradient(to right, #f87171, #fb923c, #fbbf24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  Credit is Due
                </span>
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-8">
                This portfolio stands on the shoulders of giants. Here are the amazing creators, open-source projects, and tools that made building this possible.
              </p>
          </div>

          <Timeline data={data} />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
