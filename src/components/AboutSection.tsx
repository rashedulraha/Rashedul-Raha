"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
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
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded-xl bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl border border-foreground/12 shadow-[0_8px_32px_rgba(var(--foreground), 0.3)] z-50 pointer-events-none flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-foreground/5 border border-foreground/10 text-primary">
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
    { label: "Experience", value: "2+ Yrs" },
    { label: "Countries", value: "1" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-background"
      id="about">
      {/* --- Premium Grid Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
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
            <div className="relative p-2.5 rounded-3xl bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl border border-foreground/12 shadow-[0_8px_32px_rgba(var(--foreground), 0.3)] hover:border-foreground/20 transition-colors duration-300">
              {/* Image Container */}
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-foreground/5">
                <Image
                  src="/personal_img/rashedul-about.jpeg"
                  alt="Rashedul Islam - Full Stack Developer"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Subtle Inner Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Badge - Experience */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
                className="absolute -bottom-6 -right-6 lg:-right-8 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(var(--foreground), 0.3)] border border-foreground/12 hover:border-foreground/20 p-4 flex items-center gap-4 hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
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

          {/* Right - Content & Bio (Simplified English) */}
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
                I am a passionate web developer who loves building user-friendly
                and fast web applications. From designing clean interfaces with{" "}
                <TextTooltip
                  title="Frontend Engineering"
                  description="Building responsive UIs using Tailwind CSS and React."
                  icon={MonitorSmartphone}>
                  modern UI tools
                </TextTooltip>{" "}
                to developing secure backends, I enjoy writing clean code to
                solve real-world problems.
              </p>

              <p>
                My main skills include the{" "}
                <TextTooltip
                  title="MERN Stack"
                  description="MongoDB, Express.js, React, and Node.js for building web apps."
                  icon={Layers}>
                  MERN Stack
                </TextTooltip>{" "}
                and{" "}
                <TextTooltip
                  title="Next.js"
                  description="The React framework for fast, SEO-friendly websites."
                  icon={Server}>
                  Next.js
                </TextTooltip>
                , always using TypeScript to keep my code safe and bug-free.
                Alongside my studies, I am also learning{" "}
                <TextTooltip
                  title="DevOps"
                  description="Using Docker, Linux, and Cloud to manage and deploy apps smoothly."
                  icon={Terminal}>
                  DevOps engineering
                </TextTooltip>{" "}
                so I can deploy and manage my applications properly.
              </p>

              <p className="text-foreground font-medium border-l-2 border-primary pl-4 py-1">
                I wake up every day excited to learn new things, build great
                products, and grow as a developer.
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
                  className="flex flex-col items-center justify-center p-4 rounded-2xl bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300 ease-out">
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
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("open-modal", {
                    detail: { view: "contact" },
                  }),
                )
              }
              className="group relative inline-flex w-fit cursor-pointer items-center justify-between overflow-hidden rounded-full border border-foreground/12 bg-foreground/5 py-1 pr-1 pl-4 font-medium text-base backdrop-blur-xl transition-all duration-300 ease-out hover:border-foreground/20 hover:bg-foreground/10 hover:shadow-[0_8px_32px_rgba(var(--foreground), 0.3)] active:scale-[0.98]">
              <span className="z-10 px-3 text-foreground transition-colors duration-450 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:text-primary-foreground">
                Let&apos;s Connect
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
                  className="size-4.5 text-primary-foreground transition-all duration-400 group-hover:translate-x-6 group-hover:opacity-0 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
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
                  className="absolute size-4.5 -translate-x-6 text-primary-foreground opacity-0 transition-all delay-75 duration-400 group-hover:translate-x-0 group-hover:opacity-100 ease-[cubic-bezier(0.25,0.1,0.25,1)]">
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
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
