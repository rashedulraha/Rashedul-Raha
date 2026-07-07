import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Heart, Type, Image as ImageIcon, Code, PenTool, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Attribution | Rashedul Islam",
  description: "Giving credit to the amazing creators and open-source projects that make this site possible.",
};

const attributions = [
  {
    category: "Typography",
    icon: Type,
    items: [
      { name: "Instrument Serif", creator: "Google Fonts", link: "https://fonts.google.com/specimen/Instrument+Serif", description: "Used for the elegant, premium headings across the site." },
      { name: "Geist & Geist Mono", creator: "Vercel", link: "https://vercel.com/font", description: "The beautiful sans-serif and monospace fonts used for body text and code." },
    ]
  },
  {
    category: "Icons & Graphics",
    icon: ImageIcon,
    items: [
      { name: "Lucide React", creator: "Lucide Contributors", link: "https://lucide.dev/", description: "The clean, consistent icon set used for UI elements." },
      { name: "React Icons", creator: "React Icons", link: "https://react-icons.github.io/react-icons/", description: "Used for brand icons like GitHub, Twitter, and LinkedIn." },
    ]
  },
  {
    category: "Frameworks & Libraries",
    icon: Code,
    items: [
      { name: "Next.js", creator: "Vercel", link: "https://nextjs.org/", description: "The core React framework powering the entire application." },
      { name: "Tailwind CSS", creator: "Tailwind Labs", link: "https://tailwindcss.com/", description: "The utility-first CSS framework used for all styling." },
      { name: "Framer Motion", creator: "Framer", link: "https://www.framer.com/motion/", description: "The incredible animation library used for the fluid interactions and page transitions." },
    ]
  },
  {
    category: "Design Inspiration & Components",
    icon: Sparkles,
    items: [
      { name: "Aceternity UI", creator: "Manu Arora", link: "https://ui.aceternity.com/", description: "Inspiration for many of the premium, interactive components like the Bento Grid and World Map." },
      { name: "Magic UI", creator: "Magic UI", link: "https://magicui.design/", description: "Inspiration for the sleek, modern animations and glassmorphism effects." },
      { name: "Apple", creator: "Apple Inc.", link: "https://www.apple.com/", description: "General inspiration for the minimalist, typography-driven, premium aesthetic." },
    ]
  }
];

export default function AttributionPage() {
  return (
    <>
      <div className="bg-[#0b0b0b] min-h-screen text-foreground selection:bg-primary/30">
        <Navbar />
        
        {/* Background gradient */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 z-40 h-22.5 w-full select-none lg:h-25 top-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent)",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
            WebkitUserSelect: "none",
            userSelect: "none",
          }}
        />

        <main className="pt-32 pb-20">
          <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">
            
            {/* Header */}
            <div className="mb-16 text-center pt-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 shadow-lg shadow-black/20">
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
              </div>
              <h1 className="font-instrument-serif text-5xl md:text-6xl tracking-tight text-white mb-6">
                Credit Where{" "}
                <span
                  className="italic"
                  style={{
                    backgroundImage: "linear-gradient(to right, #38bdf8, #818cf8, #e879f9)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>
                  Credit is Due
                </span>
              </h1>
              <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
                This portfolio stands on the shoulders of giants. Here are the amazing creators, open-source projects, and tools that made building this possible.
              </p>
            </div>

            {/* Attribution Grid */}
            <div className="space-y-12">
              {attributions.map((group, idx) => {
                const GroupIcon = group.icon;
                
                return (
                  <section 
                    key={idx} 
                    className="p-8 rounded-[2rem] bg-[#121212] border border-white/5 shadow-2xl relative overflow-hidden"
                  >
                    {/* Subtle glow behind section */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
                        <GroupIcon className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold text-white tracking-tight">
                          {group.category}
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {group.items.map((item, itemIdx) => (
                          <div 
                            key={itemIdx}
                            className="group flex flex-col justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300"
                          >
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-white group-hover:text-primary transition-colors">
                                  {item.name}
                                </h3>
                                <a 
                                  href={item.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 hover:text-white transition-colors"
                                >
                                  Visit
                                </a>
                              </div>
                              <p className="text-xs text-neutral-500 font-medium mb-3">
                                by {item.creator}
                              </p>
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                );
              })}
            </div>
            
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
