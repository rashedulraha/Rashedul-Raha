"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Link } from "@/routing";

type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
  projectId: string;
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  const [experiences, setExperiences] = useState<Experience[]>([]);

  useEffect(() => {
    import("@/services/apiService").then(({ getExperiences }) => {
      getExperiences()
        .then((res) => {
          if (res.data?.success && Array.isArray(res.data?.data)) {
            const exps = res.data.data.map((item: any) => ({
              id: item.id,
              role: item.title,
              company: item.company,
              duration: item.duration,
              location: item.location || "Remote",
              description: item.description ? [item.description] : [],
              skills: item.skills || [],
              projectId: "",
            }));
            setExperiences(exps);
          }
        })
        .catch((err) => console.error(err));
    });
  }, []);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-10 text-center max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-2 font-semibold text-primary text-xs uppercase tracking-widest"
          >
            CAREER HISTORY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold tracking-tight text-foreground"
          >
            Work{" "}
            <span className="bg-gradient-to-r from-primary via-indigo-400 to-sky-400 bg-clip-text text-transparent">
              experience.
            </span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          {/* Center Line (Desktop) / Left Line (Mobile) */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-foreground/10 md:-translate-x-1/2 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/80 via-primary to-primary/80 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceItem key={exp.id} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index }: { exp: Experience; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-100px" });
  
  const isEven = index % 2 === 0;

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col md:flex-row items-start ${
        isEven ? "md:flex-row-reverse" : ""
      } group`}
    >
      {/* Timeline Node Marker */}
      <div className="absolute left-[28px] md:left-1/2 top-6 md:-translate-x-1/2 z-20 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.1, type: "spring" }}
          className="w-14 h-14 -ml-7 md:ml-0 rounded-full border-4 border-background bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300"
        >
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </motion.div>
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-1/2 pl-20 pr-4 md:px-12 ${isEven ? "md:text-right" : "text-left"}`}>
        <Link href={`/work/${exp.projectId}`} className="block group/link">
          <motion.div
            initial={{ opacity: 0, x: isEven ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
            className="relative rounded-3xl overflow-hidden border border-foreground/12 bg-gradient-to-br from-white/8 to-white/2 backdrop-blur-xl shadow-[0_8px_32px_rgba(var(--foreground), 0.3)] p-6 sm:p-8 hover:border-foreground/20 transition-all duration-300 hover:-translate-y-1 group-hover/link:shadow-[0_16px_48px_rgba(0,0,0,0.4)] cursor-pointer"
          >
            {/* Header */}
          <div className={`flex flex-col gap-2 mb-6 ${isEven ? "md:items-end" : "items-start"}`}>
            <h3 className="text-2xl font-semibold text-foreground tracking-tight">
              {exp.role}
            </h3>
            <div className={`flex flex-wrap items-center gap-3 text-sm text-muted-foreground ${isEven ? "md:justify-end" : "justify-start"}`}>
              <span className="font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {exp.company}
              </span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{exp.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <ul className={`space-y-3 mb-6 text-sm sm:text-base text-muted-foreground/90 ${isEven ? "md:text-right" : "text-left"}`}>
            {exp.description.map((desc, i) => (
              <li key={i} className="leading-relaxed">
                {desc}
              </li>
            ))}
          </ul>

          {/* Skills */}
          <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
            {exp.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs font-medium rounded-full bg-foreground/5 border border-foreground/10 text-foreground/80 hover:bg-foreground/10 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
          
          {/* Subtle Glow Effect inside card */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
        </Link>
      </div>
    </div>
  );
}
