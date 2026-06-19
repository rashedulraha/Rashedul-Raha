"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  ArrowUpRight,
  Brain,
  Server,
  ChevronDown,
  Terminal,
  Download,
  FolderGit2,
  Code2,
  Database,
  Zap,
  Cpu,
  GitBranch,
  GraduationCap,
  Award,
} from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Responsive from "@/views/Responsive/Responsive";
import HorizontalResponsive from "@/components/Responsive/HorizontalResponsive";
import CommonBg from "@/components/CommonBg/CommonBg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] as const },
  },
} as const;

const techStack = [
  { icon: <Code2 className="w-3.5 h-3.5" />, label: "TypeScript" },
  { icon: <Server className="w-3.5 h-3.5" />, label: "Node.js" },
  { icon: <Zap className="w-3.5 h-3.5" />, label: "Next.js" },
  { icon: <Database className="w-3.5 h-3.5" />, label: "MongoDB" },
  { icon: <Brain className="w-3.5 h-3.5" />, label: "Python" },
  { icon: <Cpu className="w-3.5 h-3.5" />, label: "LangChain" },
];

const socials = [
  {
    href: "https://github.com/rashedulraha",
    icon: <FaGithub />,
    label: "GitHub",
  },
  {
    href: "https://linkedin.com/in/rashedulraha",
    icon: <FaLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://twitter.com/rashedulraha",
    icon: <FaXTwitter />,
    label: "X",
  },
];

const HeroSection = () => {
  return (
    <Responsive>
      <CommonBg />

      <main className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <motion.div
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {/* LEFT COLUMN */}
          <motion.div
            className="lg:col-span-7 space-y-6"
            variants={itemVariants}>
            {/* Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                Rashedul{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500">
                  Islam
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-muted-foreground flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                AI-Driven Full-Stack Web & Application Developer
              </p>
            </div>

            {/* Bio */}
            <p className="text-base sm:text-lg text-muted-foreground/90 max-w-xl leading-relaxed">
              I build production-ready web applications with{" "}
              <span className="text-foreground font-semibold">
                Retrieval-Augmented Generation (RAG)
              </span>
              . From scalable backends to clean interfaces, I create intelligent
              full-stack solutions.
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" /> Bangladesh
              </span>
              <a
                href="mailto:rashedulraha@gmail.com"
                className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                rashedulraha@gmail.com
              </a>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/contact">
                <Button className="rounded-xl h-11 px-6 font-medium gap-2 shadow-lg shadow-primary/20 hover:shadow-xl transition-all">
                  Let's Connect <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button
                  variant="outline"
                  className="rounded-xl h-11 px-5 font-medium gap-2 border-border/50 hover:bg-primary/5 transition-all">
                  <FolderGit2 className="w-4 h-4" /> Projects
                </Button>
              </Link>
              <a href="/resume.pdf" target="_blank" download>
                <Button
                  variant="ghost"
                  className="rounded-xl h-11 px-5 font-medium gap-2 text-muted-foreground hover:text-foreground transition-all">
                  <Download className="w-4 h-4" /> Resume
                </Button>
              </a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 pt-2">
              {socials.map((s) => (
                <Link key={s.label} href={s.href} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all"
                    aria-label={s.label}>
                    {React.cloneElement(s.icon, { className: "h-4 w-4" })}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* RIGHT COLUMN */}
          <motion.div
            className="lg:col-span-5 relative flex items-center justify-center"
            variants={itemVariants}>
            <div className="relative w-full max-w-[360px] aspect-[4/5]">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-600 rounded-3xl rotate-3 scale-[1.02] opacity-20 blur-lg -z-10" />

              {/* Photo Card */}
              <div className="w-full h-full rounded-2xl overflow-hidden border border-border/80 bg-card/60 backdrop-blur-md p-2.5 shadow-2xl">
                <div className="w-full h-full rounded-xl overflow-hidden relative bg-muted">
                  <img
                    src="/Rashedul.jpeg"
                    alt="Rashedul Islam"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Available Tag */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border/80">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase">
                      Available Now
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Badge - RAG */}
              <motion.div
                className="absolute -right-3 top-12 bg-background/95 backdrop-blur-md border border-border/80 p-2.5 rounded-xl shadow-xl flex items-center gap-2"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}>
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold block">
                    RAG Pipeline
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    LangChain + Vector DB
                  </span>
                </div>
              </motion.div>

              {/* Floating Badge - Full-Stack */}
              <motion.div
                className="absolute -left-3 bottom-20 bg-background/95 backdrop-blur-md border border-border/80 p-2.5 rounded-xl shadow-xl flex items-center gap-2"
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}>
                <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold block">
                    Full-Stack
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    Next.js & Node.js
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </Responsive>
  );
};

export default HeroSection;
