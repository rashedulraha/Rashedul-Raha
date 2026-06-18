"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { SentientSphere } from "./SentientSphere";
import Responsive from "../../views/Responsive/Responsive";
import {
  ArrowDown,
  Sparkles,
  Zap,
  ChevronDown,
  Code,
  Brain,
  Cpu,
} from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ── DESKTOP VERSION ──
  const DesktopHero = () => (
    <div className="relative z-10 h-full w-full">
      <Responsive>
        <motion.div
          style={{ opacity, scale }}
          className="h-full flex flex-col justify-between py-10 lg:py-16">
          {/* Top Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-left space-y-3">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-muted-foreground bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              <Sparkles className="w-3 h-3 text-primary" />
              01 — PASSION
            </motion.p>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="relative inline-block">
                FULL-STACK
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                DEVELOPER
              </span>
            </h2>
          </motion.div>

          {/* Center Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

              <Link href="/projects">
                <motion.button
                  data-cursor-hover
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-10 py-4.5 border border-primary/30 rounded-full font-mono text-sm tracking-widest uppercase bg-background/40 backdrop-blur-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-foreground shadow-2xl shadow-primary/10 hover:shadow-primary/30 group overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore My Work
                    <motion.span
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowDown className="w-3 h-3" />
                    </motion.span>
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-right space-y-3">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] text-muted-foreground bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              <Zap className="w-3 h-3 text-primary" />
              02 — FOCUS
            </motion.p>
            <h2 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
              <span className="relative inline-block">
                AI & RAG
                <span className="absolute -bottom-1 right-0 w-full h-1 bg-gradient-to-l from-primary/50 to-transparent rounded-full" />
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent">
                ENGINEER
              </span>
            </h2>
          </motion.div>
        </motion.div>
      </Responsive>
    </div>
  );

  // ── MOBILE VERSION (Fully Centered) ──
  const MobileHero = () => (
    <div className="relative z-10 h-full w-full flex items-center justify-center">
      <Responsive>
        <motion.div
          style={{ opacity, scale }}
          className="flex flex-col items-center justify-center gap-6 py-6 px-4">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col items-center gap-3">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] text-muted-foreground bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              <Sparkles className="w-2.5 h-2.5 text-primary" />
              PASSION
            </motion.p>
          </motion.div>

          {/* Main Heading - Center Aligned */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center space-y-1">
            <h2 className="text-3xl font-bold tracking-tight text-foreground leading-[1.1]">
              FULL-STACK
              <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-3xl">
                DEVELOPER
              </span>
            </h2>
          </motion.div>

          {/* Center Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center items-center my-2">
            <Link href="/projects">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 border border-primary/30 rounded-full font-mono text-[10px] tracking-[0.15em] uppercase bg-background/60 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-foreground shadow-lg shadow-primary/5">
                <span className="flex items-center gap-2">
                  Explore
                  <ArrowDown className="w-3 h-3" />
                </span>
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary rounded-full" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Bottom Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col items-center gap-3">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.45 }}
              className="inline-flex items-center gap-1.5 font-mono text-[8px] tracking-[0.2em] text-muted-foreground bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
              <Zap className="w-2.5 h-2.5 text-primary" />
              FOCUS
            </motion.p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground leading-[1.1] text-center">
              AI & RAG
              <br />
              <span className="bg-gradient-to-r from-primary/60 to-primary bg-clip-text text-transparent text-3xl">
                ENGINEER
              </span>
            </h2>
          </motion.div>

          {/* Decorative Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.8 }}
            className="flex items-center gap-4 mt-2">
            <Code className="w-3 h-3 text-primary/40" />
            <Brain className="w-3 h-3 text-primary/40" />
            <Cpu className="w-3 h-3 text-primary/40" />
          </motion.div>

          {/* Mobile Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full border border-primary/20 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                <ChevronDown className="w-3.5 h-3.5 text-primary/60" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Responsive>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-background/50">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      {/* 3D Sphere Background */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20 md:opacity-40 pointer-events-none">
        <SentientSphere />
      </div>

      {/* Render based on device */}
      {isMobile ? <MobileHero /> : <DesktopHero />}

      {/* Desktop Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
