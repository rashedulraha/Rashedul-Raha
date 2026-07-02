"use client";

import {
  ArrowRightIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  const techStack = ["C++", "Django", "Node.js", "TypeScript", "SQL", "Docker (Learning)"];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="relative flex flex-col lg:flex-row items-center justify-between mt-20 md:mt-28 w-full z-[20] gap-10 lg:gap-16 container-custom min-h-[calc(100vh-80px)] overflow-hidden"
    >
      {/* ================= LEFT SIDE: TEXT CONTENT ================= */}
      <div className="w-full lg:w-[55%] flex flex-col gap-6 md:gap-8 justify-center text-start order-2 lg:order-1">
        
        {/* 1. Availability Status */}
        <motion.div
          variants={slideInFromTop}
          className="flex items-center gap-2 py-2 px-4 border border-border-subtle bg-bg-surface backdrop-blur-md self-start rounded-full shadow-sm hover:border-green-500/30 transition-colors duration-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <h1 className="font-mono text-[10px] sm:text-xs tracking-wider uppercase font-semibold text-text-secondary">
            Open to Work & Freelance
          </h1>
        </motion.div>

        {/* 2. Clear Identity */}
        <motion.div
          variants={slideInFromLeft(0.3)}
          className="flex flex-col gap-3"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-text-primary tracking-tight leading-[1.1]">
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan">
              Rashedul
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary leading-snug">
            Full-Stack Developer & <span className="text-accent-cyan">Aspiring DevOps Engineer</span>
          </h2>
        </motion.div>

        {/* 3. High-Impact Description */}
        <motion.p
          variants={slideInFromLeft(0.6)}
          className="text-sm sm:text-base text-text-secondary font-light leading-relaxed max-w-[560px] tracking-wide"
        >
          Passionate Web & Application Developer focused on building clean, 
          user-centric digital products. Currently expanding my expertise into{" "}
          <span className="text-accent-cyan font-medium">DevOps & Cloud Engineering</span> to 
          bridge the gap between writing code and deploying it at scale.
        </motion.p>

        {/* 4. Strong Call to Actions */}
        <motion.div
          variants={slideInFromLeft(0.9)}
          className="flex flex-wrap gap-4 mt-2"
        >
          <a
            href="#projects"
            className="group flex items-center justify-center gap-2 py-3 px-6 sm:py-3.5 sm:px-8 bg-gradient-to-r from-accent-purple to-accent-cyan text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 text-sm sm:text-base hover:scale-105 active:scale-95"
          >
            View My Projects
            <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </a>

          <a
            href="#contact"
            className="flex items-center justify-center gap-2 py-3 px-6 sm:py-3.5 sm:px-8 border border-border-subtle bg-bg-surface backdrop-blur-sm text-text-primary font-semibold rounded-xl hover:bg-bg-surface/80 hover:border-border-subtle/80 transition-all duration-300 ease-out hover:-translate-y-0.5 text-sm sm:text-base hover:scale-105 active:scale-95"
          >
            <DocumentArrowDownIcon className="h-4 w-4" />
            Download Resume
          </a>
        </motion.div>

        {/* 5. Core Tech Stack */}
        <motion.div
          variants={slideInFromLeft(1.2)}
          className="flex flex-wrap items-center gap-3 mt-4"
        >
          <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold">
            Core Tech Stack:
          </span>
          {techStack.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4 + index * 0.1 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "var(--border-subtle)",
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-default border ${
                tech.includes("Learning") 
                  ? "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20" 
                  : "text-text-primary bg-bg-surface border-border-subtle"
              }`}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* ================= RIGHT SIDE: VISUAL GRAPHICS ================= */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full lg:w-[45%] flex items-center justify-center order-1 lg:order-2 relative min-h-[400px] sm:min-h-[500px]"
      >
        {/* Background Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full bg-accent-purple/10 blur-[100px] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] rounded-full bg-accent-cyan/10 blur-[80px] animate-pulse delay-1000"></div>

        {/* Code Brackets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute top-10 left-5 sm:left-10 text-4xl sm:text-5xl font-mono text-accent-purple/40 pointer-events-none select-none"
        >
          {"{"}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.25, x: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 right-5 sm:right-10 text-4xl sm:text-5xl font-mono text-accent-cyan/40 pointer-events-none select-none"
        >
          {"}"}
        </motion.div>

        {/* Main Image Container */}
        <div className="relative z-10 w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan animate-[spin_8s_linear_infinite] opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-500"></div>
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-r from-accent-purple via-accent-pink to-accent-cyan animate-[spin_8s_linear_infinite_reverse] opacity-80"></div>

          <div className="absolute inset-[6px] rounded-full bg-bg-primary flex items-center justify-center overflow-hidden shadow-xl transition-colors duration-300">
            <Image
              src="/image.png"
              alt="Rashedul Islam - Full Stack Developer"
              width={500}
              height={500}
              className="w-full h-full object-cover scale-110 group-hover:scale-115 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-accent-purple/5 to-accent-cyan/5 pointer-events-none"></div>
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.2)] dark:shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none"></div>
          </div>
        </div>

        {/* ===== Floating Badges ===== */}
        
        {/* Badge 1: Problem Solving */}
        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-2 sm:top-24 sm:left-4 z-20 px-4 py-2 bg-bg-surface/90 backdrop-blur-md border border-border-subtle rounded-2xl shadow-sm flex items-center gap-2 hover:border-accent-pink/35 transition-colors cursor-default"
        >
          <span className="text-base">🧠</span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">
              500+ DSA
            </span>
            <span className="text-[9px] text-text-secondary font-mono">
              Problems Solved
            </span>
          </div>
        </motion.div>

        {/* Badge 2: Practical Work */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-8 right-2 sm:top-12 sm:right-8 z-20 px-4 py-2 bg-bg-surface/90 backdrop-blur-md border border-border-subtle rounded-2xl shadow-sm flex items-center gap-2 hover:border-accent-purple/35 transition-colors cursor-default"
        >
          <span className="text-base">💻</span>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">
              15+ Projects
            </span>
            <span className="text-[9px] text-text-secondary font-mono">
              Built & Deployed
            </span>
          </div>
        </motion.div>

        {/* Badge 3: Learning Path */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-8 left-2 sm:bottom-12 sm:left-8 z-20 px-4 py-2 bg-bg-surface/90 backdrop-blur-md border border-border-subtle rounded-2xl shadow-sm flex items-center gap-2 hover:border-accent-cyan/35 transition-colors cursor-default"
        >
          <span className="text-base">☁️</span>
          <span className="text-xs font-mono font-semibold text-text-primary">
            Learning DevOps
          </span>
        </motion.div>

        {/* Badge 4: Tech Focus */}
        <motion.div
          animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-2 sm:bottom-24 sm:right-4 z-20 px-4 py-2 bg-bg-surface/90 backdrop-blur-md border border-border-subtle rounded-2xl shadow-sm flex items-center gap-2 hover:border-accent-purple/35 transition-colors cursor-default"
        >
          <span className="text-base">⚛️</span>
          <span className="text-xs font-mono font-semibold text-text-primary">
            PERN & Angular
          </span>
        </motion.div>

        {/* Decorative Dots */}
        <div className="absolute top-1/2 right-0 sm:right-4 w-2 h-2 rounded-full bg-accent-purple/60 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-0 sm:left-4 w-1.5 h-1.5 rounded-full bg-accent-cyan/60 animate-pulse delay-300"></div>
        <div className="absolute top-1/3 right-8 w-1 h-1 rounded-full bg-accent-pink/60 animate-pulse delay-700"></div>
      </motion.div>
    </motion.div>
  );
};