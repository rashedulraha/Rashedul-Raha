"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, Sparkles } from "lucide-react";

interface Project {
  readonly role: string;
  readonly type: "Freelance" | "Personal" | "Open Source" | "Client";
  readonly projectName: string;
  readonly duration: string;
  readonly desc: readonly string[];
  readonly tags: readonly string[];
  readonly link?: string;
}

export const Experience = () => {
  const projects: readonly Project[] = [
    {
      role: "Independent Full-Stack Developer",
      type: "Freelance",
      projectName: "E-Commerce Platform with Payment Integration",
      duration: "2024 - Present",
      desc: [
        "Built a full-stack e-commerce platform using Next.js 15, handling 1000+ products with advanced filtering.",
        "Integrated Stripe payment gateway with webhook security and order management system.",
        "Implemented JWT authentication, RBAC, and optimized MongoDB queries reducing load time by 60%.",
      ],
      tags: ["Next.js", "TypeScript", "MongoDB", "Stripe", "Tailwind CSS"],
    },
    {
      role: "Independent Full-Stack Developer",
      type: "Personal",
      projectName: "Real-Time Collaboration Dashboard",
      duration: "2023 - 2024",
      desc: [
        "Developed a real-time dashboard with WebSocket integration for live data updates and notifications.",
        "Built RESTful APIs with Node.js/Express, implementing Redis caching for 3x faster response times.",
        "Created responsive UI with Framer Motion animations and optimized for mobile-first experience.",
      ],
      tags: ["React.js", "Node.js", "WebSocket", "Redis", "Framer Motion"],
    },
    {
      role: "Independent Backend Developer",
      type: "Client",
      projectName: "SaaS Application with Multi-Tenant Architecture",
      duration: "2023",
      desc: [
        "Architected a multi-tenant SaaS backend using Django and PostgreSQL with tenant isolation.",
        "Implemented automated CI/CD pipelines with GitHub Actions, reducing deployment time by 50%.",
        "Designed comprehensive API documentation with Swagger and integrated Docker containerization.",
      ],
      tags: ["Django", "PostgreSQL", "Docker", "GitHub Actions", "Swagger"],
    },
    {
      role: "Independent Full-Stack Developer",
      type: "Personal",
      projectName: "AI-Powered Content Generation Platform",
      duration: "2023",
      desc: [
        "Built an AI content generator using OpenAI GPT-4 API with custom prompt engineering.",
        "Implemented RAG (Retrieval Augmented Generation) system with Pinecone vector database.",
        "Created user dashboard with usage analytics and implemented rate limiting for API protection.",
      ],
      tags: ["Python", "FastAPI", "OpenAI", "Pinecone", "React.js"],
    },
  ];

  return (
    <section id="experience" className="relative w-full py-20 overflow-hidden">
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-accent-purple uppercase mb-3 block">
            Projects & Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            What I&apos;ve{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
              Built
            </span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto mt-3 leading-relaxed">
            A showcase of real-world projects, freelance work, and technical
            contributions as an independent developer.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-border-subtle ml-4 md:ml-32 space-y-12">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-8 md:pl-12 group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-bg-primary border-2 border-accent-purple group-hover:border-accent-cyan transition-colors duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-purple group-hover:bg-accent-cyan transition-colors duration-300" />
              </div>

              {/* Timeline Box */}
              <div className="relative p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-subtle hover:bg-bg-surface/80 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />

                {/* Meta details */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent-purple transition-colors duration-300">
                        {project.role}
                      </h3>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-semibold ${
                          project.type === "Freelance"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                            : project.type === "Personal"
                              ? "bg-accent-purple/10 text-accent-purple border-accent-purple/20"
                              : project.type === "Client"
                                ? "bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20"
                                : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                        }`}
                      >
                        {project.type}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary font-semibold mt-0.5 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-accent-cyan" />
                      <span>{project.projectName}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-text-secondary font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 mb-6">
                  {project.desc.map((bullet, bIdx) => (
                    <li
                      key={bIdx}
                      className="text-sm text-text-secondary font-light flex items-start gap-2 leading-relaxed"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-accent-purple/60 shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wider text-text-secondary bg-bg-surface border border-border-subtle px-2 py-0.5 rounded-full hover:border-accent-cyan/40 hover:text-accent-cyan transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
