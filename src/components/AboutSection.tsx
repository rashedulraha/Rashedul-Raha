"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Code,
  Server,
  Layers,
  Terminal,
  MonitorSmartphone,
} from "lucide-react";

// --- Custom Aceternity Style Text Tooltip ---
const TextTooltip = ({
  children,
  title,
  description,
  icon: Icon,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ElementType;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <span className="font-semibold text-foreground underline decoration-border underline-offset-4 hover:decoration-primary transition-colors">
        {children}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-xl bg-card border border-border shadow-xl z-50 pointer-events-none flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-accent/50 text-primary">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                {title}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const stats = [
    { label: "Projects", value: "5+" },
    { label: "Clients", value: "4+" },
    { label: "Experience", value: "2+ Years" },
    { label: "Countries", value: "10+" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-background"
      id="about">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16">
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-3">
            About Me
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
            Full-Stack Developer &amp;{" "}
            <span className="text-muted-foreground font-serif italic">
              Problem Solver
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
          {/* Left - Premium Framed Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-md lg:w-[45%] relative">
            {/* The Outer Frame Layer */}
            <div className="relative p-2 rounded-3xl bg-card border border-border/50 shadow-2xl">
              {/* Image Container */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src="/personal_img/rashedul-2.jpeg"
                  alt="Rashedul Islam - Full Stack Developer"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Subtle Inner Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge - Experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
                className="absolute -bottom-6 -right-6 lg:-right-10 bg-card rounded-2xl shadow-xl border border-border p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">2+ Years</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Experience
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Content & Bio */}
          <div className="w-full lg:w-[55%] space-y-8 mt-8 lg:mt-0">
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Hi, I&apos;m Rashedul Islam.
              </h3>
            </motion.div>

            {/* Description with Animated Tooltips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-5 text-muted-foreground text-base leading-relaxed">
              <p>
                I am a proactive developer passionate about creating dynamic,
                end-to-end web experiences. From crafting pixel-perfect
                interfaces with{" "}
                <TextTooltip
                  title="Frontend Engineering"
                  description="Building responsive, accessible UIs using Tailwind CSS and shadcn/ui."
                  icon={MonitorSmartphone}>
                  modern UI tools
                </TextTooltip>{" "}
                to architecting robust scalable backends, I thrive on solving
                complex problems with clean, efficient code.
              </p>

              <p>
                My core expertise lies in the{" "}
                <TextTooltip
                  title="MERN Stack"
                  description="MongoDB, Express.js, React, and Node.js for building full-stack applications."
                  icon={Layers}>
                  MERN Stack
                </TextTooltip>{" "}
                and{" "}
                <TextTooltip
                  title="Next.js"
                  description="The React framework for production-grade, SEO-friendly applications."
                  icon={Server}>
                  Next.js
                </TextTooltip>
                , strictly utilizing TypeScript for type safety. While advancing
                my academic journey, I am actively expanding my horizons into{" "}
                <TextTooltip
                  title="DevOps"
                  description="Streamlining deployments using Docker, Nginx, Linux, and Cloud Infrastructure."
                  icon={Terminal}>
                  DevOps engineering
                </TextTooltip>{" "}
                to ensure the applications I build not only look good but deploy
                flawlessly.
              </p>

              <p className="text-foreground font-medium border-l-2 border-primary pl-4 py-1">
                I believe in waking up each day eager to learn, build, and make
                a meaningful difference through technology.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-accent/30 border border-border/50 hover:bg-accent/50 transition-colors">
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-2">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-all hover:gap-3 shadow-sm">
                Let&apos;s Connect
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
