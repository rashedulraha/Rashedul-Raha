"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { ExternalLink, ChevronRight, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getAllProjects, getProjectBanner } from "@/lib/projectData";
import { Link } from "@/routing";
import { useTranslations, useLocale } from "next-intl";

export default function Work() {
  const t = useTranslations("Work");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = getAllProjects(locale);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const index = Math.min(
        Math.floor(value * projects.length),
        projects.length - 1,
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, projects.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full pt-8 md:pt-16"
      id="work">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center px-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          {t('badge')}
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          {t('titlePrefix')}
          <span className="text-primary">
            {t('titleHighlight')}
          </span>
        </h2>
        <p className="text-base text-muted-foreground mt-4 max-w-xl mx-auto">
          {t('description')}
        </p>
      </motion.div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mt-12">
          {/* Left - Sticky Image Container */}
          <div className="w-full lg:w-[45%]">
            <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center pb-8 lg:pb-0 z-10">
              <div className="relative w-full max-w-xl mx-auto p-2.5 md:p-3 rounded-4xl transition-all duration-700 card-premium">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-muted">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: activeIndex === index ? 1 : 0,
                        scale: activeIndex === index ? 1 : 1.05,
                      }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      className="absolute inset-0">
                      <Image
                        src={getProjectBanner(project)}
                        alt={project.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                  ))}

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest drop-shadow-md">
                          {projects[activeIndex]?.tech_stack?.frameworks_libraries?.[0] || 'Project'}
                        </span>
                        <p className="text-foreground font-semibold text-sm md:text-base mt-1 drop-shadow-md line-clamp-1">
                          {projects[activeIndex]?.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2 p-2.5 rounded-full border border-border shadow-lg glass">
                    {projects.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                          activeIndex === index
                            ? "h-6 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                            : "h-1.5 bg-foreground/40 hover:bg-foreground/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* view all project Button */}
                <Link
                  href="/work"
                  className="group relative inline-flex mt-4 cursor-pointer items-center justify-between overflow-hidden rounded-full border border-border bg-muted/50 py-1 pr-1 pl-4 font-medium text-base backdrop-blur-xl transition-all duration-300 ease-out hover:border-primary/30 hover:bg-accent active:scale-[0.98] w-full block text-center"
                >
                  <span className="z-10 px-3 text-foreground transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-primary-foreground">
                    {t('viewAll')}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-1 right-1 w-10 rounded-full bg-primary transition-[width] duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:w-[calc(100%-8px)]"
                  />
                  <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-primary p-2.5 transition-colors duration-400 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:bg-transparent">
                    <svg
                      fill="none"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-4.5 text-primary-foreground transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                      <path
                        d="M18.5 12L4.99997 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <svg
                      fill="none"
                      height={24}
                      viewBox="0 0 24 24"
                      width={24}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute size-4.5 -translate-x-6 text-primary-foreground opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                    >
                      <path
                        d="M18.5 12L4.99997 12"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M13 18C13 18 19 13.5811 19 12C19 10.4188 13 6 13 6"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right - Scrolling Content */}
          <div className="w-full lg:w-[55%]">
            <div className="space-y-12 lg:space-y-0 lg:pb-[20vh] lg:pt-[10vh]">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="flex flex-col justify-center lg:min-h-[70vh] py-12 lg:py-0"
                  initial={{ opacity: 0.2, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ duration: 0.5 }}>
                  
                  {/* Number */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl font-bold text-muted-foreground/30 font-mono">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <div className="h-0.5 flex-1 bg-border" />
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {project.name}
                  </h3>
                  <p className="text-primary text-base font-medium mb-5">
                    {project.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed mb-6 line-clamp-4">
                    {project.overview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech_stack?.frameworks_libraries?.slice(0, 6).map((tag: string) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1.5 rounded-full bg-muted border border-border px-3 py-1.5">
                        <span className="font-medium text-xs text-foreground tracking-wide">
                          {tag}
                        </span>
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-4 flex-wrap">
                    <Link
                      href={`/work/${project.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.03] shadow-sm">
                      {t('viewDetails')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    {project.live_demo && (
                      <a
                        href={project.live_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted border border-border hover:border-primary/30 hover:bg-accent text-sm font-medium transition-all duration-300 hover:scale-[1.03] shadow-sm">
                        <ExternalLink className="w-4 h-4" />
                        {t('viewLive')}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
