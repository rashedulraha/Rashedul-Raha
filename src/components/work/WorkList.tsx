"use client";

import React, { useState, useMemo } from "react";
import { Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/work-data";

export default function WorkList({ initialProjects }: { initialProjects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories (using "type" and maybe a few key tags)
  const categories = useMemo(() => {
    const types = Array.from(new Set(initialProjects.map((p) => p.type)));
    return ["All Projects", ...types, "Next.js", "React Native"];
  }, [initialProjects]);

  // Filter projects
  const filteredProjects = initialProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "All Projects" ||
      project.type === activeCategory ||
      project.tags.includes(activeCategory);
    
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredProject = filteredProjects[0];
  const latestProjects = filteredProjects.slice(1);

  return (
    <>
      {/* Category Navigation Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-y border-white/10 py-3 mb-16 gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-white/10 text-white border border-white/10"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <div className="hidden md:block w-px h-6 bg-white/10 mx-2" />
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-neutral-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects"
              className="block w-full md:w-64 pl-10 pr-12 py-2 bg-transparent border border-white/10 rounded-full text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-white/20 focus:border-white/20 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <div className="flex items-center gap-1">
                <span className="flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] text-neutral-400 font-sans">
                  ⌘
                </span>
                <span className="flex items-center justify-center w-5 h-5 rounded border border-white/10 bg-white/5 text-[10px] text-neutral-400 font-sans">
                  K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-neutral-400 py-20">
          <p>No projects found matching your criteria.</p>
        </div>
      ) : (
        <>
          {/* Featured Project Section */}
          {featuredProject && (
            <div className="mb-20">
              <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8">
                FEATURED WORK
              </p>
              
              <Link 
                href={`/work/${featuredProject.id}`}
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-[#121212] transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-white/5"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Left: Image */}
                  <div className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden">
                    <Image
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  {/* Right: Content */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12 relative overflow-hidden">
                    {/* Subtle glow effect behind text */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">
                          {featuredProject.type}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/10 text-white text-[10px] font-bold tracking-wider">
                          {featuredProject.badge}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {featuredProject.title}
                      </h2>
                      <p className="text-primary text-sm font-medium mb-4">
                        {featuredProject.subtitle}
                      </p>
                      
                      <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                        {featuredProject.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-8">
                        {featuredProject.tags.slice(0, 4).map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-neutral-300 text-[10px] font-mono tracking-wider uppercase">
                            {tag}
                          </span>
                        ))}
                        {featuredProject.tags.length > 4 && (
                          <span className="px-2 text-neutral-500 text-[10px] font-mono tracking-wider">
                            +{featuredProject.tags.length - 4} MORE
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto relative z-10">
                      <div className="text-xs font-mono text-neutral-500">
                        {featuredProject.stats}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-400 group-hover:text-white transition-colors">
                        View Details
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 transition-colors">
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Other Projects Section */}
          {latestProjects.length > 0 && (
            <div>
              <p className="text-center text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-8">
                MORE PROJECTS
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/work/${project.id}`}
                    className="group relative block aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:shadow-xl hover:shadow-white/5 bg-[#121212]"
                  >
                    <Image
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={project.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-opacity duration-300" />
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                          {project.type}
                        </span>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                          {project.badge}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-white text-2xl leading-snug tracking-tight drop-shadow-md mb-1">
                        {project.title}
                      </h3>
                      <p className="text-neutral-400 text-xs line-clamp-2">
                        {project.subtitle}
                      </p>
                      
                      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        <span className="text-xs text-white">Explore</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
