"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, useScroll } from "framer-motion";
import { ArrowRight, ExternalLink, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Projects data
  const projects = [
    {
      id: "keythm",
      title: "Keythm",
      subtitle: "Typing Test Reimagined",
      description:
        "Keychron meets typing test — every key has its own sound, every stat tracked",
      image: "/images/image.png",
      badge: "Q2 2026",
      type: "Web App",
      stats: "4,367 checks",
      features: [
        "Per-key mechanical audio via Web Audio API",
        "Four modes with live WPM & accuracy tracking",
        "Statistical anti-cheat with 13 checks",
        "Offline-first PWA with Serwist precaching",
      ],
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Drizzle ORM",
        "Motion.dev",
      ],
      links: {
        live: "https://keythm.dev",
        github: "https://github.com/username/keythm",
      },
    },
    {
      id: "nextdemy",
      title: "Nextdemy",
      subtitle: "Learning Platform",
      description:
        "A monorepo-powered learning platform with real payments, real auth, and real content delivery",
      image: "/images/image_4.jpg",
      badge: "Q4 2024",
      type: "Web App",
      stats: "1,200+ learners",
      features: [
        "Monorepo with Turborepo for scalable code",
        "Real payment processing with Razorpay",
        "JWT authentication with session management",
        "Optimized content delivery & caching",
      ],
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "TanStack Query",
        "Zustand",
        "Shadcn UI",
      ],
      links: {
        live: "https://nextdemy.dev",
        github: "https://github.com/username/nextdemy",
      },
    },
    {
      id: "venture-den",
      title: "VentureDen",
      subtitle: "AI Pitch Platform",
      description:
        "Where founders pitch ideas, get instant AI feedback, and get discovered by investors",
      image: "/images/image_5.jpg",
      badge: "Q1 2025",
      type: "Web App",
      stats: "500+ pitches",
      features: [
        "AI-powered pitch analysis with instant feedback",
        "Investor discovery & matching algorithm",
        "Sanity CMS for content management",
        "Real-time analytics & engagement tracking",
      ],
      tags: [
        "Next.js",
        "React",
        "TypeScript",
        "Sanity CMS",
        "Tailwind CSS",
        "Motion.dev",
      ],
      links: {
        live: "https://ventureden.dev",
        github: "https://github.com/username/ventureden",
      },
    },
    {
      id: "finote",
      title: "Finote",
      subtitle: "Finance Tracker",
      description:
        "An intuitive mobile companion for organizing your digital wallets and analyzing your financial health",
      image: "/images/image_3.png",
      badge: "Q4 2025",
      type: "Mobile App",
      stats: "10K+ downloads",
      features: [
        "React Native with Expo framework",
        "Wallet organization & expense tracking",
        "Financial health analytics with charts",
        "Optimized media with Cloudinary",
      ],
      tags: [
        "React Native",
        "Expo",
        "TypeScript",
        "Firebase",
        "Zod",
        "Zustand",
      ],
      links: {
        live: "https://finote.app",
        github: "https://github.com/username/finote",
      },
    },
    {
      id: "star-forge",
      title: "StarForge",
      subtitle: "AI SaaS Landing",
      description:
        "A sleek AI SaaS landing page with a user-friendly design that enhances engagement.",
      image: "/images/image_7.jpg",
      badge: "Q1 2024",
      type: "Web App",
      stats: "3x conversion",
      features: [
        "Modern AI SaaS landing page design",
        "Parallax scrolling & smooth animations",
        "Optimized performance with Vercel",
        "User-friendly Tailwind CSS interface",
      ],
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
      links: {
        live: "https://starforge.dev",
        github: "https://github.com/username/starforge",
      },
    },
  ];

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
      className="relative w-full py-8 md:py-16 bg-background"
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
          <span className="bg-linear-to-r from-primary to-purple-500 bg-clip-text text-transparent">
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
              <div className="relative w-full max-w-xl mx-auto p-2.5 md:p-3 rounded-[2rem] bg-card border border-border/60 shadow-2xl transition-all duration-700 hover:shadow-primary/5">
                {/* Inner Image Container */}
                <div className="relative w-full h-[50vh] lg:h-[60vh] rounded-[1.5rem] overflow-hidden bg-muted">
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
                        <span className="text-white/70 text-[10px] md:text-xs font-bold uppercase tracking-widest drop-shadow-md">
                          {projects[activeIndex]?.type}
                        </span>
                        <p className="text-white font-semibold text-sm md:text-base mt-1 drop-shadow-md">
                          {projects[activeIndex]?.stats}
                        </p>
                      </div>
                      <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold tracking-wide border border-white/20 shadow-lg">
                        {projects[activeIndex]?.badge}
                      </span>
                    </div>
                  </div>

                  {/* Progress Indicators (Premium Pill Design) */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2 p-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 shadow-lg">
                    {projects.map((_, index) => (
                      <div
                        key={index}
                        className={`w-1.5 rounded-full transition-all duration-500 ease-out ${
                          activeIndex === index
                            ? "h-6 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                            : "h-1.5 bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
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
                          className="flex items-center gap-1.5 rounded-full bg-accent/50 border border-border/50 px-3 py-1.5">
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
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
                      View Live
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:bg-accent/80 border border-border transition-colors shadow-sm">
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

      {/* See More */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mt-6 md:mt-10  relative z-10">
        <a
          href="/projects"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-card border border-border text-foreground text-sm font-semibold hover:bg-accent hover:text-accent-foreground transition-all shadow-sm">
          View All Projects
          <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </section>
  );
}
