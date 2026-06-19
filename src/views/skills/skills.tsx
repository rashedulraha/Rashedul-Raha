"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Code2, Server, Database, Cloud, Cpu, Shield } from "lucide-react";
import Responsive from "../Responsive/Responsive";
import Navbar from "../shared/Navbar/Navbar";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

const SkillsPage = () => {
  const skillCategories = [
    {
      icon: Code2,
      title: "Frontend Development",
      skills: [
        "React.js",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "HTML5/CSS3",
      ],
    },
    {
      icon: Server,
      title: "Backend Development",
      skills: ["Node.js", "Express.js", "Python", "Go", "RESTful APIs"],
    },
    {
      icon: Database,
      title: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Prisma", "Mongoose"],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "Linux", "Nginx", "CI/CD"],
    },
    {
      icon: Cpu,
      title: "AI & Machine Learning",
      skills: [
        "RAG Systems",
        "LangChain",
        "OpenAI API",
        "Vector Databases",
        "AI Agents",
      ],
    },
    {
      icon: Shield,
      title: "Tools & Practices",
      skills: [
        "Git/GitHub",
        "DSA",
        "System Design",
        "Agile/Scrum",
        "Postman",
        "Figma",
      ],
    },
  ];

  return (
    <Responsive>
      <Navbar />

      {/* Header */}
      <div className="mb-14">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          Technical Skills
        </h1>

        <p className="max-w-2xl text-base sm:text-lg leading-8 text-muted-foreground">
          Technologies and tools I use to build scalable and modern
          applications.
        </p>
      </div>

      <motion.div
        className="space-y-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible">
        {/* Education & Training */}
        <div
          className="relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 bg-card/50 rounded-xl transition-all duration-500 hover:shadow-lg group"
          style={creativeBorderStyle}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {/* Subtle corner glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Programming Hero
              </p>
            </div>
            <p className="text-base text-foreground/85 leading-relaxed">
              Completed comprehensive full-stack training covering modern
              JavaScript, React, Node.js, and database management.
            </p>
            <div className="flex gap-2 pt-1">
              <Badge
                variant="secondary"
                className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20">
                Level 1 ✓
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs px-3 py-1 bg-primary/10 text-primary border-primary/20">
                Level 2 ✓
              </Badge>
            </div>
          </div>

          <div className="relative space-y-3 sm:border-l sm:border-border/40 sm:pl-6">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Phitron
              </p>
            </div>
            <p className="text-base text-foreground/85 leading-relaxed">
              Advanced programming and data structures course focusing on
              problem-solving, algorithms, and software engineering
              fundamentals.
            </p>
            <Badge
              variant="secondary"
              className="text-xs px-3 py-1 mt-1 bg-primary/10 text-primary border-primary/20">
              Completed ✓
            </Badge>
          </div>
        </div>

        {/* Technical Expertise */}
        <div
          className="relative overflow-hidden p-6 sm:p-8 bg-card/50 rounded-xl transition-all duration-500 hover:shadow-lg group"
          style={creativeBorderStyle}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-primary/40 to-transparent" />
          {/* Subtle corner glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative flex items-center gap-2 mb-6">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Technical Expertise
            </p>
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* First 4 items - Top row */}
            {skillCategories.slice(0, 4).map((category) => (
              <div key={category.title} className="space-y-3">
                <p className="text-base font-semibold text-foreground flex items-center gap-2 pb-2 border-b border-border/30">
                  <category.icon className="w-5 h-5 text-primary shrink-0" />
                  <span className="truncate">{category.title}</span>
                </p>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-foreground/75 flex items-center gap-2 hover:text-primary transition-colors">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                      <span className="truncate">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Bottom row: 2 items centered */}
            <div className="col-span-2 md:col-span-4 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              {skillCategories.slice(4).map((category) => (
                <div key={category.title} className="space-y-3">
                  <p className="text-base font-semibold text-foreground flex items-center gap-2 pb-2 border-b border-border/30">
                    <category.icon className="w-5 h-5 text-primary shrink-0" />
                    {category.title}
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="text-sm text-foreground/75 flex items-center gap-2 hover:text-primary transition-colors">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                        <span className="truncate">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div
          className="relative overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 bg-card/50 rounded-xl transition-all duration-500 hover:shadow-lg group"
          style={creativeBorderStyle}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          {/* Subtle corner glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative space-y-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Key Achievement
              </p>
            </div>
            <p className="text-base text-foreground/85 leading-relaxed">
              Solved{" "}
              <span className="text-primary font-bold text-lg">
                500+ DSA problems
              </span>
              , strengthening problem-solving and system thinking abilities.
            </p>
          </div>

          <div className="relative space-y-2 sm:border-l sm:border-border/40 sm:pl-6">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
                Projects & Experience
              </p>
            </div>
            <p className="text-base text-foreground/85 leading-relaxed">
              Built{" "}
              <span className="text-primary font-bold text-lg">
                15+ projects
              </span>{" "}
              using{" "}
              <span className="text-foreground font-semibold">
                20+ technologies
              </span>
              , with 2+ years of hands-on experience.
            </p>
          </div>
        </div>
      </motion.div>
    </Responsive>
  );
};

export default SkillsPage;
