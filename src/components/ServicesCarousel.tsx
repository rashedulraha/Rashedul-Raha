"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  Shield,
  Rocket,
  Sparkles,
  Globe,
  Cpu,
  ArrowRight,
} from "lucide-react";

const services = [
  { icon: Search, title: "SEO & AEO", desc: "SSR, SSG, semantic, & crawlable" },
  { icon: Zap, title: "Performance", desc: "Lighthouse 95+, Core Web Vitals" },
  { icon: Shield, title: "Security", desc: "HTTPS, CSP, XSS protection" },
  { icon: Rocket, title: "Deployment", desc: "CI/CD, Vercel, AWS, Docker" },
  { icon: Globe, title: "Global Reach", desc: "CDN, multi-region, edge" },
  { icon: Cpu, title: "AI Ready", desc: "OpenAI, Gemini, vector search" },
];

export default function ServicesCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 4 seconds, pauses on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = services[currentIndex];

  return (
    <div
      ref={sectionRef}
      className="md:col-span-6 lg:col-span-4 lg:row-span-6 h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="group relative flex w-full flex-col overflow-hidden rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:border-border hover:shadow-lg h-full min-h-[260px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        <div className="relative z-10 flex-1 flex flex-col p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-center gap-1.5 mb-2">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest transition-colors group-hover:text-primary/80">
              What You Get
            </p>
          </div>

          <p className="text-sm font-medium text-foreground mb-6">
            Clean code, pixel-perfect UI, deployed &amp; scaling.
          </p>

          {/* Animated Card Content */}
          <div className="flex-1 relative min-h-[60px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
                  <current.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-foreground mb-0.5">
                    {current.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {current.desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 mt-6">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  currentIndex === index
                    ? "w-6 bg-primary"
                    : "w-2 bg-border hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hover Arrow Button */}
        <div className="absolute right-5 bottom-5 z-20 opacity-0 translate-y-3 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0 cursor-pointer hover:scale-110">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
