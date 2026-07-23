"use client";
import { useState, useRef, useEffect } from "react";
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
  CheckCircle2,
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
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
};

const defaultRow1 = [
  { name: "Next.js", icon: Layout },
  { name: "TypeScript", icon: Code },
  { name: "React", icon: Box },
  { name: "Node.js", icon: Server },
  { name: "Express.js", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "Gemini API", icon: Sparkles },
];

const defaultRow2 = [
  { name: "Tailwind CSS", icon: Wind },
  { name: "shadcn/ui", icon: Layers },
  { name: "Docker", icon: Box },
  { name: "Nginx", icon: Server },
  { name: "Linux", icon: Terminal },
  { name: "macOS", icon: Monitor },
];

const defaultRow3 = [
  { name: "Redis", icon: Database },
  { name: "GraphQL", icon: Code },
  { name: "AWS", icon: Server },
  { name: "Git", icon: Code },
  { name: "Vercel", icon: Monitor },
  { name: "Figma", icon: Layout },
];

function TechModal({
  isOpen,
  onClose,
  skills,
}: {
  isOpen: boolean;
  onClose: () => void;
  skills: ISkillItem[];
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const categories = [
    { title: "Frontend Architecture", desc: "Client-side applications, UI components, and modern web frameworks", key: "Frontend", defaultIcon: Layout },
    { title: "Backend & Databases", desc: "RESTful APIs, PostgreSQL, Node.js, and serverless infrastructure", key: "Backend", defaultIcon: Server },
    { title: "DevOps & Tooling", desc: "CI/CD pipelines, Docker, Git, and deployment platforms", key: "DevOps & Tools", defaultIcon: Terminal },
    { title: "Operating Systems", desc: "Primary development environments and tools", key: "Operating Systems", defaultIcon: Monitor },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm p-4"
          onClick={handleOutsideClick}>
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="relative w-full max-w-4xl min-h-72 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl card-premium"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/5 hover:bg-background/10 transition-colors text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                <span className="text-primary font-bold">
                  Full Tech Stack
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  (Comprehensive overview of frameworks and tools)
                </span>
              </h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat, idx) => {
                const categorySkills = skills.filter(
                  (s) => s.category.toLowerCase() === cat.key.toLowerCase() ||
                         (cat.key === "DevOps & Tools" && (s.category.includes("DevOps") || s.category.includes("Tools")))
                );
                const IconComponent = cat.defaultIcon;

                return (
                  <motion.div
                    key={cat.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05 }}
                    className="group p-4 rounded-xl border border-border bg-muted hover:bg-accent transition-all duration-300 glass">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-4 h-4 text-primary" />
                      <h3 className="font-semibold text-sm text-foreground">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      {cat.desc}
                    </p>
                    <div className="space-y-1.5">
                      {categorySkills.length > 0 ? (
                        categorySkills.map((tool) => (
                          <div
                            key={tool.id || tool.name}
                            className="flex items-center gap-2 text-xs">
                            <CheckCircle2 className="w-3 h-3 text-secondary shrink-0" />
                            <span className="text-foreground/80 font-medium">{tool.name}</span>
                            {tool.description && (
                              <span className="text-muted-foreground/60 text-[10px]">
                                — {tool.description}
                              </span>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground italic">No tools added yet.</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="p-4 border-t border-border text-center">
              <p className="text-[10px] text-muted-foreground">
                {skills.length} tools across {categories.length} categories
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const TechStack = () => {
  const t = useTranslations("Features.TechStack");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [skills, setSkills] = useState<ISkillItem[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    async function loadSkills() {
      try {
        const res = await getSkills();
        if (res.data.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setSkills(res.data.data);
        }
      } catch (err) {
        // Fallback if network offline
      }
    }
    loadSkills();
  }, []);

  // Split skills into 3 marquee rows
  const marqueeRows = (() => {
    if (skills.length === 0) {
      return { row1: defaultRow1, row2: defaultRow2, row3: defaultRow3 };
    }
    const formatted = skills.map((s) => ({
      name: s.name,
      icon: iconMap[s.icon || "Code"] || Code,
    }));
    const third = Math.ceil(formatted.length / 3);
    return {
      row1: formatted.slice(0, third),
      row2: formatted.slice(third, third * 2),
      row3: formatted.slice(third * 2),
    };
  })();

  const { row1, row2, row3 } = marqueeRows;
  const totalCount = skills.length > 0 ? skills.length : defaultRow1.length + defaultRow2.length + defaultRow3.length;

  return (
    <>
      <div
        ref={sectionRef}
        className="md:col-span-6 lg:col-span-5 lg:row-span-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl transition-all duration-300 h-full min-h-72 card-premium">
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-3 overflow-hidden pt-12 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Row 1 */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex w-max animate-marquee-left gap-3 hover:paused">
              {[...row1, ...row1].map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.15 },
                    }}
                    className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3.5 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent hover:shadow-primary/10 glass">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Row 2 */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex w-max animate-marquee-right gap-3 hover:paused">
              {[...row2, ...row2].map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.15 },
                    }}
                    className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3.5 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent hover:shadow-primary/10 glass">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Row 3 */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex w-max animate-marquee-left gap-3 hover:paused">
              {[...row3, ...row3].map((tech, i) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.15 },
                    }}
                    className="flex items-center gap-2 rounded-full border border-border bg-muted/30 px-3.5 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-accent hover:shadow-primary/10 glass">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                    <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                      {tech.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <div className="pointer-events-none z-10 flex flex-col gap-0.5 p-5 absolute top-0 left-0 w-full text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              TECH STACK & TOOLS
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="text-lg text-muted-foreground tracking-wide dark:text-muted-foreground">
              Modern Technologies & Frameworks
            </motion.p>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-200 text-primary text-[10px] font-medium glass">
              <span>View All Tech</span>
              <ChevronRight className="w-3 h-3" />
            </motion.button>

            <span className="w-px h-4 bg-border/50" />

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/30">
              <span className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-[9px] text-muted-foreground/60 uppercase tracking-wider font-medium">
                {totalCount}+ Tools & Libraries
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-primary/5 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
        </motion.div>
      </div>

      <TechModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} skills={skills} />
    </>
  );
};

export default TechStack;
