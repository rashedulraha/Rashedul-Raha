"use client";
import { useState, useRef } from "react";
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

const row1 = [
  { name: "Next.js", icon: Layout },
  { name: "TypeScript", icon: Code },
  { name: "React", icon: Box },
  { name: "Node.js", icon: Server },
  { name: "Express.js", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "Gemini API", icon: Sparkles },
];

const row2 = [
  { name: "Tailwind CSS", icon: Wind },
  { name: "shadcn/ui", icon: Layers },
  { name: "Docker", icon: Box },
  { name: "Nginx", icon: Server },
  { name: "Linux", icon: Terminal },
  { name: "macOS", icon: Monitor },
];

const row3 = [
  { name: "Redis", icon: Database },
  { name: "GraphQL", icon: Code },
  { name: "AWS", icon: Server },
  { name: "Git", icon: Code },
  { name: "Vercel", icon: Monitor },
  { name: "Figma", icon: Layout },
];

// Tech Stack Details Data
const techDetails = {
  frontend: {
    title: "Frontend",
    icon: Layout,
    description: "Modern, responsive, and performant user interfaces",
    tools: [
      { name: "Next.js 16", desc: "React framework with SSR & SSG" },
      { name: "React 19", desc: "UI library with hooks & concurrent features" },
      { name: "TypeScript", desc: "Type-safe JavaScript" },
      { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
      { name: "shadcn/ui", desc: "Beautiful & accessible components" },
      { name: "Framer Motion", desc: "Production-ready animations" },
    ],
  },
  backend: {
    title: "Backend",
    icon: Server,
    description: "Scalable, secure, and high-performance APIs",
    tools: [
      { name: "Node.js 24", desc: "JavaScript runtime" },
      { name: "Express.js 5", desc: "Web framework for Node.js" },
      { name: "GraphQL 16", desc: "API query language" },
      { name: "MongoDB 8", desc: "NoSQL database" },
      { name: "Redis 8", desc: "In-memory data store" },
      { name: "PostgreSQL 17", desc: "Relational database" },
    ],
  },
  devops: {
    title: "DevOps & Tools",
    icon: Terminal,
    description: "Streamlined deployment & development workflow",
    tools: [
      { name: "Docker 28", desc: "Containerization platform" },
      { name: "Nginx 1.28", desc: "Web server & reverse proxy" },
      { name: "AWS", desc: "Cloud computing services" },
      { name: "Vercel", desc: "Frontend deployment platform" },
      { name: "Git 2.50", desc: "Version control system" },
      { name: "Linux Kernel 6.15", desc: "Development environment" },
    ],
  },
  os: {
    title: "Operating Systems",
    icon: Monitor,
    description: "My preferred development environments",
    tools: [
      { name: "macOS 26 Tahoe", desc: "Primary development OS" },
      { name: "Ubuntu 24.04 LTS", desc: "Server & development" },
      { name: "Windows 11 24H2", desc: "Testing & compatibility" },
    ],
  },
};

// Modal Component
function TechModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Prevent body scroll
  if (isOpen) {
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = "hidden";
  } else {
    // eslint-disable-next-line react-hooks/immutability
    document.body.style.overflow = "";
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
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
            className="relative w-full max-w-4xl min-h-72 max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-6 border-b border-white/5">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                <span className="bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  My Tech Stack
                </span>
                <span className="text-sm font-normal text-muted-foreground">
                  Everything I use to ship products
                </span>
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Frontend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Layout className="w-4 h-4 text-blue-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Frontend
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Modern, responsive, and performant UIs
                </p>
                <div className="space-y-1.5">
                  {techDetails.frontend.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-foreground/80">{tool.name}</span>
                      <span className="text-muted-foreground/60 text-[10px]">
                        — {tool.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Backend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Server className="w-4 h-4 text-purple-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Backend
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Scalable, secure, high-performance APIs
                </p>
                <div className="space-y-1.5">
                  {techDetails.backend.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-foreground/80">{tool.name}</span>
                      <span className="text-muted-foreground/60 text-[10px]">
                        — {tool.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* DevOps & Tools */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    DevOps & Tools
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  Streamlined deployment & development workflow
                </p>
                <div className="space-y-1.5">
                  {techDetails.devops.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-foreground/80">{tool.name}</span>
                      <span className="text-muted-foreground/60 text-[10px]">
                        — {tool.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* OS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="group p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Operating Systems
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  My preferred development environments
                </p>
                <div className="space-y-1.5">
                  {techDetails.os.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="text-foreground/80">{tool.name}</span>
                      <span className="text-muted-foreground/60 text-[10px]">
                        — {tool.desc}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 text-center">
              <p className="text-[10px] text-muted-foreground">
                {Object.values(techDetails).reduce(
                  (acc, curr) => acc + curr.tools.length,
                  0,
                )}{" "}
                tools across {Object.keys(techDetails).length} categories
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const TechStack = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <>
      <div
        ref={sectionRef}
        className="md:col-span-6 lg:col-span-5 lg:row-span-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-surface transition-all duration-300 hover:bg-white/5 dark:bg-card/15 dark:hover:bg-card/10 ring-1 ring-border h-full min-h-72">
          {/* Tech Stack Marquee */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-3 overflow-hidden pt-12 mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            {/* Row 1 - Marquee Left */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex w-max animate-marquee-left gap-3 hover:paused">
              {[...row1, ...row1].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.15 },
                  }}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-3.5 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/30 hover:bg-card/50 hover:shadow-indigo-500/10">
                  <tech.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-indigo-500 transition-colors duration-200" />
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Row 2 - Marquee Right */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex w-max animate-marquee-right gap-3 hover:paused">
              {[...row2, ...row2].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.15 },
                  }}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-3.5 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/30 hover:bg-card/50 hover:shadow-indigo-500/10">
                  <tech.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-indigo-500 transition-colors duration-200" />
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Row 3 - Marquee Left */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex w-max animate-marquee-left gap-3 hover:paused">
              {[...row3, ...row3].map((tech, i) => (
                <motion.div
                  key={i}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.15 },
                  }}
                  className="flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-3.5 py-1.5 text-sm text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:border-indigo-500/30 hover:bg-card/50 hover:shadow-indigo-500/10">
                  <tech.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-indigo-500 transition-colors duration-200" />
                  <span className="text-xs font-medium text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Content Overlay - Top */}
          <div className="pointer-events-none z-10 flex flex-col gap-0.5 p-5 absolute top-0 left-0 w-full text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="text-[0px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Tech Stack
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.5 }}
              className="text-lg text-neutral-700 tracking-wide dark:text-neutral-300">
              The stack behind everything I ship
            </motion.p>
          </div>

          {/* Bottom: Button + Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
            {/* View Details Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-200 text-indigo-500 text-[10px] font-medium">
              <span>View Full Stack</span>
              <ChevronRight className="w-3 h-3" />
            </motion.button>

            {/* Divider */}
            <span className="w-px h-4 bg-border/50" />

            {/* Tool count */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-card/50 backdrop-blur-sm border border-border/30">
              <span className="w-1 h-1 rounded-full bg-indigo-500" />
              <span className="text-[9px] text-neutral-400/60 uppercase tracking-wider font-medium">
                {row1.length + row2.length + row3.length}+ Tools
              </span>
            </div>
          </div>

          {/* Hover gradient overlay */}
          <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-linear-to-br from-transparent via-transparent to-indigo-500/5 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
        </motion.div>
      </div>

      {/* Tech Stack Modal */}
      <TechModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default TechStack;
