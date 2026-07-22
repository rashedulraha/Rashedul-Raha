"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Link } from "@/routing";
import Image from "next/image";
import { ProjectData, getProjectBanner } from "@/lib/projectData";
import { useTranslations } from "next-intl";
import { getProjects } from "@/services/apiService";

export default function WorkList({ initialProjects }: { initialProjects: ProjectData[] }) {
  const tPage = useTranslations("WorkPage");
  const tWork = useTranslations("Work");
  
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [projectsList, setProjectsList] = useState<ProjectData[]>(initialProjects);

  useEffect(() => {
    async function fetchApiProjects() {
      try {
        const res = await getProjects();
        const data = res.data;
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const apiProjects: ProjectData[] = data.data.map((item: any) => ({
            id: item.id || item.slug,
            name: item.title,
            tagline: item.subtitle || item.type || "Web App",
            overview: item.description,
            live_demo: item.liveUrl || undefined,
            github_repo: item.githubUrl || undefined,
            silicon_img_banner: item.image || undefined,
            screenshots: [],
            tech_stack: {
              frameworks_libraries: item.tags || [],
              languages: item.tags || [],
            },
            key_features: item.features || [],
          }));
          setProjectsList(apiProjects);
        }
      } catch (e) {
        // fallback
      }
    }
    fetchApiProjects();
  }, []);

  // Extract unique categories based on tech stack or generic terms
  const categories = useMemo(() => {
    const defaultCategories = ["All Projects", "Web App", "Full-Stack", "Backend", "Frontend"];
    return defaultCategories;
  }, []);

  // Filter projects
  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory =
      activeCategory === "All Projects" ||
      (project.tech_stack?.frameworks_libraries && project.tech_stack.frameworks_libraries.includes(activeCategory)) ||
      (project.tech_stack?.backend && project.tech_stack.backend.includes(activeCategory)) ||
      (project.overview.toLowerCase().includes(activeCategory.toLowerCase()));
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = project.name.toLowerCase().includes(searchLower) || 
                          project.tagline.toLowerCase().includes(searchLower) ||
                          project.overview.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  const featuredProject = filteredProjects[0];
  const latestProjects = filteredProjects.slice(1);

  return (
    <>
      {/* Category Navigation Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between border-y border-foreground/10 py-3 mb-16 gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar pb-2 md:pb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-foreground/10 text-foreground border border-foreground/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {category === "All Projects" ? tPage("allProjects") : category}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
          <div className="hidden md:block w-px h-6 bg-foreground/10 mx-2" />
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={tPage("searchPlaceholder")}
              className="block w-full md:w-64 pl-10 pr-12 py-2 bg-transparent border border-foreground/10 rounded-full text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-all"
            />
            <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
              <div className="flex items-center gap-1">
                <span className="flex items-center justify-center w-5 h-5 rounded border border-foreground/10 bg-foreground/5 text-[10px] text-muted-foreground font-sans">
                  ⌘
                </span>
                <span className="flex items-center justify-center w-5 h-5 rounded border border-foreground/10 bg-foreground/5 text-[10px] text-muted-foreground font-sans">
                  K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center text-muted-foreground py-20">
          <p>{tPage("noProjects")}</p>
        </div>
      ) : (
        <>
          {/* Featured Project Section */}
          {featuredProject && (
            <div className="mb-20">
              <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">
                {tPage("featuredWork")}
              </p>
              
              <Link 
                href={`/work/${featuredProject.id}`}
                className="group block overflow-hidden rounded-3xl border border-foreground/10 bg-[hsl(var(--background))] transition-all hover:border-foreground/20 hover:shadow-2xl hover:shadow-white/5"
              >
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Left: Image */}
                  <div className="relative w-full lg:w-[55%] aspect-video lg:aspect-auto overflow-hidden bg-muted/30">
                    <Image
                      src={getProjectBanner(featuredProject)}
                      alt={featuredProject.name}
                      fill
                      className="object-contain p-4 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  
                  {/* Right: Content */}
                  <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 lg:p-12 relative overflow-hidden">
                    {/* Subtle glow effect behind text */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                    
                    <div className="relative z-10">
                      
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                        {featuredProject.name}
                      </h2>
                      <p className="text-primary text-sm font-medium mb-4">
                        {featuredProject.tagline}
                      </p>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-3">
                        {featuredProject.overview}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-2 mb-8">
                        {featuredProject.tech_stack?.languages?.slice(0, 4).map((tag: string) => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/5 text-muted-foreground text-[10px] font-mono tracking-wider uppercase">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-auto relative z-10">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {tPage("viewDetails")}
                        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-foreground/10 bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
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
              <p className="text-center text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">
                {tPage("moreProjects")}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/work/${project.id}`}
                    className="group flex h-full flex-col rounded-3xl p-2.5 transition-all duration-300 card-premium"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted border border-border">
                      <Image
                        alt={project.name}
                        fill
                        className="size-full object-contain bg-black/20"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={getProjectBanner(project)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    </div>
                    
                    <div className="flex flex-1 flex-col px-2 pt-4 pb-3">
                      
                      <h3 className="font-semibold text-lg text-foreground leading-snug transition-all duration-300 ease-out group-hover:text-primary">
                        {project.name}
                      </h3>
                      <p className="mt-2 line-clamp-1 text-primary text-xs font-medium">
                        {project.tagline}
                      </p>
                      
                      <div className="mt-3 border-t border-foreground/12 pt-3 opacity-90 transform transition-all duration-300">
                        <p className="line-clamp-2 text-muted-foreground text-xs leading-relaxed mb-3">
                           {project.overview}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {project.tech_stack?.frameworks_libraries?.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 rounded-md bg-foreground/5 text-[9px] text-muted-foreground uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-foreground/12">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          {tPage("explore")}
                          <div className="flex items-center justify-center w-5 h-5 rounded-md border border-border border-dashed bg-muted group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
                            <ArrowRight className="h-2.5 w-2.5" />
                          </div>
                        </div>
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
