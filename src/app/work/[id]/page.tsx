import React from "react";

import Footer from "@/components/Footer";
import { projects } from "@/lib/work-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <div className="bg-[#0b0b0b] min-h-screen text-foreground selection:bg-primary/30">

        
        {/* Background gradient from hero */}
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
          <article className="container relative mx-auto max-w-5xl px-4 sm:px-6">
            
            {/* Back to Work */}
            <Link 
              href="/work" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all group-hover:bg-foreground/10">
                <ArrowLeft className="h-4 w-4" />
              </div>
              Back to Projects
            </Link>

            {/* Header / Meta */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-foreground/10 text-foreground text-xs font-medium uppercase tracking-wider border border-foreground/20">
                  {project.type}
                </span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">
                  {project.badge}
                </span>
              </div>
              
              <h1 className="font-instrument-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight tracking-tight mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-2xl">
                {project.subtitle}
              </p>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] mb-16 border border-foreground/10 bg-[hsl(var(--background))] shadow-2xl">
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1200px) 100vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Bento Grid Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Left Column: Description & Features */}
              <div className="md:col-span-2 space-y-6">
                {/* Description Card */}
                <div className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10">
                  <h3 className="text-lg font-bold text-foreground mb-4">About the Project</h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {project.description}
                  </p>
                </div>
                
                {/* Features Card */}
                <div className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10">
                  <h3 className="text-lg font-bold text-foreground mb-6">Key Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column: Meta & Links */}
              <div className="space-y-6">
                
                {/* Stats Card */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20 flex flex-col items-center justify-center text-center">
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">Impact</p>
                  <p className="text-4xl font-bold text-foreground tracking-tight">{project.stats}</p>
                </div>
                
                {/* Tags Card */}
                <div className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-4">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-background/40 border border-foreground/10 text-muted-foreground text-[10px] font-mono tracking-wider uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Links Card */}
                <div className="p-8 rounded-3xl bg-foreground/5 border border-foreground/10 flex flex-col gap-4">
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-white text-foreground font-semibold hover:bg-secondary transition-colors"
                  >
                    <span>View Live Site</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full px-5 py-4 rounded-2xl bg-background border border-foreground/20 text-foreground font-semibold hover:bg-foreground/5 transition-colors"
                  >
                    <span>Source Code</span>
                    <FaGithub className="w-5 h-5" />
                  </a>
                </div>
                
              </div>
            </div>
            
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
