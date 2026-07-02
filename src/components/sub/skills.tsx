"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Cpu,
  Wrench,
  Layers,
} from "lucide-react";

export const Skills = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend",
      description: "Modern UI/UX with latest frameworks",
      skills: [
        { name: "React.js", version: "v19", highlight: true },
        { name: "Next.js", version: "v15", highlight: true },
        { name: "TypeScript", version: "v5.8", highlight: true },
        { name: "Tailwind CSS", version: "v4" },
      ],
    },
    {
      icon: Server,
      title: "Backend",
      description: "Scalable APIs & server architecture",
      skills: [
        { name: "Node.js", version: "v22", highlight: true },
        { name: "Express.js", version: "v5" },
        { name: "FastAPI", version: "v0.115" },
        { name: "Django", version: "v5.1" },
      ],
    },
    {
      icon: Database,
      title: "Database",
      description: "SQL & NoSQL data management",
      skills: [
        { name: "MongoDB", version: "v8", highlight: true },
        { name: "PostgreSQL", version: "v17", highlight: true },
        { name: "Redis", version: "v7.4" },
        { name: "MySQL", version: "v9" },
      ],
    },
    {
      icon: Layers,
      title: "ORM & Query",
      description: "Type-safe database operations",
      skills: [
        { name: "Prisma", version: "v6", highlight: true },
        { name: "Mongoose", version: "v8" },
        { name: "SQLAlchemy", version: "v2.0" },
        { name: "Drizzle", version: "v0.39" },
      ],
    },
    {
      icon: Cloud,
      title: "DevOps & Cloud",
      description: "Cloud infrastructure & deployment",
      skills: [
        { name: "Docker", version: "v27", highlight: true },
        { name: "AWS", version: "Latest", highlight: true },
        { name: "GitHub Actions", version: "CI/CD" },
        { name: "Linux", version: "Ubuntu 24.04" },
      ],
    },
    {
      icon: Cpu,
      title: "AI & ML",
      description: "AI integration & intelligent systems",
      skills: [
        { name: "OpenAI API", version: "GPT-4o", highlight: true },
        { name: "LangChain", version: "v0.3" },
        { name: "RAG Systems", version: "Prod" },
        { name: "Vector DB", version: "Pinecone" },
      ],
    },
    {
      icon: Wrench,
      title: "Tools",
      description: "Development workflow & collaboration",
      skills: [
        { name: "Git/GitHub", version: "v2.48" },
        { name: "Postman", version: "v11" },
        { name: "VS Code", version: "Latest" },
        { name: "Figma", version: "v124" },
      ],
    },
  ];

  return (
    <section id="skills" className="relative w-full py-20 overflow-hidden">
      <div className="relative z-10 container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest text-accent-purple uppercase mb-3 block">
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
              Skills
            </span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto mt-3 leading-relaxed">
            Core technologies and production-grade systems I use to build
            scalable applications.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Technical Expertise - Main Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden p-6 sm:p-8 bg-bg-surface border border-border-subtle rounded-2xl transition-all duration-500 hover:bg-bg-surface/80 group"
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-purple/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-accent-purple" />
                <p className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Core Technologies
                </p>
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                25+ Technologies
              </span>
            </div>

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="p-6 rounded-2xl bg-bg-surface border border-border-subtle hover:bg-bg-surface/50 hover:border-accent-purple/30 hover:shadow-sm transition-all duration-300 relative overflow-hidden group/card flex flex-col justify-between"
                >
                  {/* Glowing card-top gradient border */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  
                  <div className="space-y-4">
                    <div className="pb-3 border-b border-border-subtle">
                      <p className="text-base font-bold text-text-primary flex items-center gap-2">
                        <category.icon className="w-5 h-5 text-accent-cyan shrink-0 group-hover/card:scale-110 transition-transform duration-300" />
                        <span>{category.title}</span>
                      </p>
                      <p className="text-[11px] text-text-secondary mt-1 ml-7 leading-normal font-light">
                        {category.description}
                      </p>
                    </div>
                    
                    <ul className="space-y-2.5">
                      {category.skills.map((skill) => (
                        <li
                          key={skill.name}
                          className={`text-sm flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg transition-all duration-200 group/skill ${
                            skill.highlight
                              ? "bg-accent-cyan/5 hover:bg-accent-cyan/10"
                              : "hover:bg-bg-surface"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                                skill.highlight
                                  ? "bg-accent-cyan/80"
                                  : "bg-accent-purple/60 group-hover/skill:bg-accent-cyan/60"
                              }`}
                            />
                            <span
                              className={`transition-colors ${
                                skill.highlight
                                  ? "text-accent-cyan font-semibold"
                                  : "text-text-secondary group-hover/skill:text-text-primary"
                              }`}
                            >
                              {skill.name}
                            </span>
                          </div>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition-all shrink-0 ${
                              skill.highlight
                                ? "text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20"
                                : "text-text-secondary bg-bg-surface border-border-subtle group-hover/skill:border-accent-cyan/20 group-hover/skill:text-accent-cyan/80"
                            }`}
                          >
                            {skill.version}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
