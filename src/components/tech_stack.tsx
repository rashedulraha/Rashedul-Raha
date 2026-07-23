"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Code, 
  Box, 
  Layout, 
  Server, 
  Database, 
  Wind, 
  Layers, 
  Terminal, 
  Monitor, 
  Sparkles, 
  X, 
  ChevronRight, 
  Cpu, 
  Globe, 
  ShieldCheck, 
  Zap 
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getSkills } from "@/services/apiService";

export interface ISkillItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  icon?: string;
}

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Code,
  Box,
  Server,
  Database,
  Wind,
  Layers,
  Terminal,
  Monitor,
  Sparkles,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
};

export default function TechStack() {
  const [skills, setSkills] = useState<ISkillItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  useEffect(() => {
    async function loadSkills() {
      try {
        const res = await getSkills();
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setSkills(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load skills:", err);
      }
    }
    loadSkills();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map((s) => s.category || "General")));
    return ["All", ...cats];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;
    return skills.filter((s) => s.category === activeCategory);
  }, [skills, activeCategory]);

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Skills & Technologies
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight"
          >
            Technologies & Ecosystem
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl"
          >
            A modern tech stack designed for building high-performance web apps, APIs, and cross-platform systems.
          </motion.p>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center justify-center flex-wrap gap-2 mt-6"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 font-bold"
                      : "bg-card/60 text-muted-foreground hover:bg-accent hover:text-foreground border border-border/50 backdrop-blur-md"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Skills Cards Grid */}
        {skills.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground text-sm">
            Loading skills...
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {filteredSkills.map((skill, index) => {
              const IconComponent = iconMap[skill.icon || "Code"] || Code;
              return (
                <motion.div
                  key={skill.id || index}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="card-premium p-4 flex flex-col items-center text-center justify-between group relative overflow-hidden cursor-pointer"
                >
                  <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-3 shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] text-muted-foreground/80 mt-0.5 block font-medium">
                      {skill.category}
                    </span>
                  </div>

                  {skill.description && (
                    <p className="text-[10px] text-muted-foreground/70 mt-2 line-clamp-2 leading-tight">
                      {skill.description}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
