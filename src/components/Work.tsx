"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { projects } from "@/lib/work-data";
import Link from "next/link";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

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
  }, [scrollYProgress]);

  // Helper to get tag icon
  const getTagIcon = (tagName: string) => {
    const iconMap: { [key: string]: string } = {
      "Next.js": "/images/nextjs.svg",
      React: "/images/react.svg",
      TypeScript: "/images/typescript.svg",
      "Tailwind CSS": "/images/tailwindcss.svg",
      "Drizzle ORM": "/images/drizzle.svg",
      "Motion.dev": "/images/motion.svg",
      "Shadcn UI": "/images/shadcn-ui.svg",
      Zod: "/images/zod.svg",
      "TanStack Query": "/images/react-query.svg",
      Zustand: "/images/zustand.svg",
      "Express.js": "/images/expressjs.svg",
      MongoDB: "/images/mongodb.svg",
      Razorpay: "/images/razorpay.svg",
      Turborepo: "/images/turborepo.svg",
      Docker: "/images/docker.svg",
      "Sanity CMS": "/images/sanity.svg",
      Vercel: "/images/vercel.svg",
      Expo: "/images/expo.svg",
      Firebase: "/images/firebase.svg",
    };
    return iconMap[tagName] || null;
  };

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
        className="text-center  px-4">
        <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
          Portfolio
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
          Featured{" "}
          <span className="text-primary">
            Projects
          </span>
        </h2>
        <p className="text-base text-muted-foreground mt-4 max-w-xl mx-auto">
          Scroll to explore some of my recent work and technical achievements.
        </p>
      </motion.div>

      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left - Sticky Image Container */}
          <div className="w-full lg:w-[45%]">
            {/* The flex and items-center here ensure exact vertical middle alignment */}
            <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center pb-8 lg:pb-0 z-10">
              {/* The Outer Premium Frame Layer */}
              <div className="relative w-full max-w-xl mx-auto p-2.5 md:p-3 rounded-4xl transition-all duration-700 card-premium">
                {/* Inner Image Container */}
                <div className="relative w-full h-[50vh] lg:h-[60vh] rounded-3xl overflow-hidden bg-muted">
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
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        priority={index === 0}
                      />
                      {/* Smooth Premium Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </motion.div>
                  ))}

                  {/* Overlay Details with Liquid Glass Effect */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-muted-foreground text-[10px] md:text-xs font-bold uppercase tracking-widest drop-shadow-md">
                          {projects[activeIndex]?.type}
                        </span>
                        <p className="text-foreground font-semibold text-sm md:text-base mt-1 drop-shadow-md">
                          {projects[activeIndex]?.stats}
                        </p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide border border-primary/20 shadow-lg glass">
                        {projects[activeIndex]?.badge}
                      </span>
                    </div>
                  </div>

                  {/* Progress Indicators (Premium Pill Design) */}
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
                    View all projects
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
            {/* Added padding to top and bottom to allow the first and last items to center properly */}
            <div className="space-y-12 lg:space-y-0 lg:pb-[20vh] lg:pt-[10vh]">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  // Using h-screen to make each item snap perfectly in the middle alongside the image
                  className="flex flex-col justify-center lg:min-h-screen py-8 lg:py-0"
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
                    {project.title}
                  </h3>
                  <p className="text-primary text-base font-medium mb-5">
                    {project.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground text-base leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2.5 mb-6">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-foreground/80">
                        <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.slice(0, 6).map((tag) => {
                      const icon = getTagIcon(tag);
                      return (
                        <span
                          key={tag}
                          className="flex items-center gap-1.5 rounded-full bg-muted border border-border px-3 py-1.5">
                          {icon && (
                            <Image
                              alt={`${tag} icon`}
                              aria-hidden="true"
                              className="w-3.5 h-3.5 object-contain"
                              height={14}
                              loading="lazy"
                              src={icon}
                              width={14}
                            />
                          )}
                          <span className="font-medium text-xs text-foreground tracking-wide">
                            {tag}
                          </span>
                        </span>
                      );
                    })}
                    {project.tags.length > 6 && (
                      <span className="flex items-center text-xs text-muted-foreground font-medium px-2">
                        +{project.tags.length - 6} more
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-300 hover:scale-[1.03] shadow-sm">
                      View Live
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-muted border border-border hover:border-primary/30 hover:bg-accent text-sm font-medium transition-all duration-300 hover:scale-[1.03] shadow-sm">
                      <FaGithub className="w-4 h-4" />
                      Code
                    </a>
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
