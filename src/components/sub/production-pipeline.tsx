"use client";

import { motion } from "framer-motion";
import {
  LightBulbIcon,
  PencilSquareIcon,
  CodeBracketIcon,
  BeakerIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";

const pipelineSteps = [
  {
    icon: LightBulbIcon,
    title: "Planning & Scope",
    color: "purple",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20 dark:border-purple-500/30",
    textColor: "text-purple-600 dark:text-purple-400",
    description: "Defining the project vision",
    items: [
      "Requirements Gathering",
      "User Stories & Scope",
      "Tech Stack Selection",
      "Project Roadmap",
    ],
  },
  {
    icon: PencilSquareIcon,
    title: "Design & Architecture",
    color: "pink",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/20 dark:border-pink-500/30",
    textColor: "text-pink-600 dark:text-pink-400",
    description: "Structuring the solution",
    items: [
      "UI/UX Wireframing",
      "System Architecture",
      "Database Schema",
      "API Endpoint Design",
    ],
  },
  {
    icon: CodeBracketIcon,
    title: "Development",
    color: "cyan",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20 dark:border-cyan-500/30",
    textColor: "text-cyan-600 dark:text-cyan-400",
    description: "Building the application",
    items: [
      "Frontend Implementation",
      "Backend Logic & APIs",
      "Database Integration",
      "Version Control (Git)",
    ],
  },
  {
    icon: BeakerIcon,
    title: "Testing & QA",
    color: "amber",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20 dark:border-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
    description: "Ensuring quality & security",
    items: [
      "Unit & Integration Tests",
      "End-to-End (E2E) Testing",
      "Performance Audits",
      "Security Vulnerability",
    ],
  },
  {
    icon: RocketLaunchIcon,
    title: "CI/CD & Deployment",
    color: "emerald",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20 dark:border-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
    description: "Automating the release",
    items: [
      "Automated Pipelines",
      "Containerization (Docker)",
      "Cloud Infrastructure",
      "Domain & SSL Config",
    ],
  },
  {
    icon: ChartBarIcon,
    title: "Production & Scale",
    color: "blue",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20 dark:border-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
    description: "Monitoring & growth",
    items: [
      "Real-time Monitoring",
      "Error Tracking & Logging",
      "Performance Tuning",
      "Auto-scaling Setup",
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export const ProductionPipeline = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-accent-purple uppercase mb-3 block">
            Development Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            From{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
              Idea to Production
            </span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A complete, step-by-step journey of transforming a raw concept into a scalable, production-ready application.
          </p>
        </motion.div>

        {/* ================= DESKTOP VIEW: HORIZONTAL 6 COLUMNS (>= 1024px) ================= */}
        <div className="hidden lg:block relative">
          {/* Flowing connection line */}
          <div className="absolute top-[48px] left-[8%] right-[8%] h-[2px] -z-10">
            <svg className="w-full h-full" overflow="visible">
              <motion.line
                x1="0"
                y1="0"
                x2="100%"
                y2="0"
                stroke="url(#desktop-gradient)"
                strokeWidth="2"
                strokeDasharray="8 6"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              />
              <defs>
                <linearGradient id="desktop-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--accent-pink)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-6 gap-4">
            {pipelineSteps.map((step, index) => (
              <motion.div
                key={step.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                {/* Card Container */}
                <div
                  className={`h-full p-5 rounded-2xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm hover:scale-105 transition-transform duration-300 group cursor-pointer`}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className={`w-6 h-6 ${step.textColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className={`text-sm font-bold ${step.textColor} text-center mb-1`}>
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[10px] text-text-secondary text-center mb-3 leading-tight min-h-[24px]">
                    {step.description}
                  </p>

                  {/* Items */}
                  <ul className="space-y-1.5 pt-2 border-t border-border-subtle">
                    {step.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-[9px] text-text-secondary flex items-center gap-1.5"
                      >
                        <div
                          className={`w-1 h-1 rounded-full ${step.textColor.replace("text-", "bg-")}`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= TABLET VIEW: 2 ROWS (768px - 1023px) ================= */}
        <div className="hidden md:max-lg:block relative space-y-8">
          {/* Row 1 */}
          <div className="relative">
            <div className="absolute top-[48px] left-[16%] right-[16%] h-[2px] -z-10">
              <svg className="w-full h-full" overflow="visible">
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="url(#row1-gradient)"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                />
                <defs>
                  <linearGradient id="row1-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {pipelineSteps.slice(0, 3).map((step, index) => (
                <motion.div
                  key={step.title}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div
                    className={`h-full p-5 rounded-2xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm hover:scale-105 transition-transform duration-300 group cursor-pointer`}
                  >
                    <div
                      className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <step.icon className={`w-6 h-6 ${step.textColor}`} />
                    </div>
                    <h3 className={`text-sm font-bold ${step.textColor} text-center mb-1`}>
                      {step.title}
                    </h3>
                    <p className="text-[10px] text-text-secondary text-center mb-3 leading-tight min-h-[24px]">
                      {step.description}
                    </p>
                    <ul className="space-y-1.5 pt-2 border-t border-border-subtle">
                      {step.items.map((item, idx) => (
                        <li key={idx} className="text-[9px] text-text-secondary flex items-center gap-1.5">
                          <div className={`w-1 h-1 rounded-full ${step.textColor.replace("text-", "bg-")}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Row 2 */}
          <div className="relative">
            <div className="absolute top-[48px] left-[16%] right-[16%] h-[2px] -z-10">
              <svg className="w-full h-full" overflow="visible">
                <motion.line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="url(#row2-gradient)"
                  strokeWidth="2"
                  strokeDasharray="8 6"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
                />
                <defs>
                  <linearGradient id="row2-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent-pink)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {pipelineSteps.slice(3).map((step, index) => (
                <motion.div
                  key={step.title}
                  custom={index + 3}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div
                    className={`h-full p-5 rounded-2xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm hover:scale-105 transition-transform duration-300 group cursor-pointer`}
                  >
                    <div
                      className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <step.icon className={`w-6 h-6 ${step.textColor}`} />
                    </div>
                    <h3 className={`text-sm font-bold ${step.textColor} text-center mb-1`}>
                      {step.title}
                    </h3>
                    <p className="text-[10px] text-text-secondary text-center mb-3 leading-tight min-h-[24px]">
                      {step.description}
                    </p>
                    <ul className="space-y-1.5 pt-2 border-t border-border-subtle">
                      {step.items.map((item, idx) => (
                        <li key={idx} className="text-[9px] text-text-secondary flex items-center gap-1.5">
                          <div className={`w-1 h-1 rounded-full ${step.textColor.replace("text-", "bg-")}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= MOBILE VIEW: VERTICAL (< 768px) ================= */}
        <div className="md:hidden space-y-4 relative">
          <div className="absolute top-10 bottom-10 left-[34px] w-[2px] -z-10">
            <svg className="w-full h-full" overflow="visible">
              <motion.line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                stroke="url(#mobile-gradient)"
                strokeWidth="2"
                strokeDasharray="6 4"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
              />
              <defs>
                <linearGradient id="mobile-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="var(--accent-cyan)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--accent-pink)" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {pipelineSteps.map((step, index) => (
            <motion.div
              key={step.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div
                className={`p-5 rounded-2xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center flex-shrink-0`}
                  >
                    <step.icon className={`w-6 h-6 ${step.textColor}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className={`text-base font-bold ${step.textColor} mb-1`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-text-secondary mb-3">
                      {step.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border-subtle">
                      {step.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${step.textColor.replace("text-", "bg-")}`}
                          />
                          <span className="text-[10px] text-text-secondary">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: BoltIcon, label: "Fast Deployment", value: "< 5 mins" },
            { icon: ShieldCheckIcon, label: "Security Score", value: "A+" },
            { icon: CheckCircleIcon, label: "Test Coverage", value: "85%+" },
            { icon: CpuChipIcon, label: "Uptime", value: "99.9%" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-bg-surface border border-border-subtle text-center hover:bg-bg-surface/80 transition-colors"
            >
              <stat.icon className="w-5 h-5 text-accent-cyan mx-auto mb-2" />
              <div className="text-lg font-bold text-text-primary mb-0.5">
                {stat.value}
              </div>
              <div className="text-[10px] text-text-secondary uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};