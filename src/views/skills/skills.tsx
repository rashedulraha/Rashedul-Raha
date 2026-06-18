"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Cpu,
  Shield,
  GraduationCap,
  Trophy,
  CheckCircle2,
  Terminal,
} from "lucide-react";
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

// Custom border style for cards
const cardBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid var(--border) / 0.15",
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
      skills: [
        "Node.js",
        "Express.js",
        "Python",
        "Go",
        "RESTful APIs",
        "GraphQL",
      ],
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
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-3">
          Technical Skills
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Technologies and tools I work with, built through structured learning
          and hands-on practice.
        </p>
      </div>

      <motion.div
        className="space-y-8"
        variants={itemVariants}
        initial="hidden"
        animate="visible">
        {/* Education & Training */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 bg-card rounded-xl shadow-sm"
          style={cardBorderStyle}>
          <div className="space-y-3">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Programming Hero
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Completed comprehensive full-stack training covering modern
              JavaScript, React, Node.js, and database management.
            </p>
            <div className="flex gap-2 pt-1">
              <Badge variant="secondary" className="text-xs px-3 py-1">
                Level 1 ✓
              </Badge>
              <Badge variant="secondary" className="text-xs px-3 py-1">
                Level 2 ✓
              </Badge>
            </div>
          </div>

          <div className="space-y-3 sm:border-l sm:border-border/50 sm:pl-6">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Phitron
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Advanced programming and data structures course focusing on
              problem-solving, algorithms, and software engineering
              fundamentals.
            </p>
            <Badge variant="secondary" className="text-xs px-3 py-1 mt-1">
              Completed ✓
            </Badge>
          </div>
        </div>

        {/* Technical Expertise */}
        <div
          className="p-6 sm:p-8 bg-card rounded-xl shadow-sm"
          style={cardBorderStyle}>
          <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-primary" />
            Technical Expertise
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
                      className="text-sm text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors">
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
                        className="text-sm text-muted-foreground flex items-center gap-2 hover:text-foreground transition-colors">
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
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 sm:p-8 bg-card rounded-xl shadow-sm"
          style={cardBorderStyle}>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Key Achievement
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Solved{" "}
              <span className="text-primary font-bold text-lg">
                500+ DSA problems
              </span>
              , strengthening problem-solving and system thinking abilities.
            </p>
          </div>

          <div className="space-y-2 sm:border-l sm:border-border/50 sm:pl-6">
            <p className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Projects & Experience
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
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

        {/* What I Bring */}
        <div
          className="p-6 sm:p-8 bg-card rounded-xl shadow-sm space-y-5"
          style={cardBorderStyle}>
          <p className="text-sm font-semibold text-foreground uppercase tracking-wider">
            What I Bring to the Table
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Strong Foundation",
                desc: "Computer science fundamentals from Programming Hero & Phitron",
              },
              {
                title: "Full-Stack Expertise",
                desc: "MERN stack, Next.js, TypeScript, and modern frameworks",
              },
              {
                title: "Scalable Systems",
                desc: "Backend architecture, RESTful APIs, and database design",
              },
              {
                title: "AI Integration",
                desc: "RAG systems, LangChain, and intelligent applications",
              },
              {
                title: "Problem Solving",
                desc: "500+ DSA challenges and algorithmic thinking",
              },
              {
                title: "DevOps Ready",
                desc: "Docker, CI/CD, cloud deployment, and version control",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <span className="text-foreground font-semibold">
                    {item.title}:
                  </span>{" "}
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <motion.div
          className="p-6 bg-primary/5 border border-primary/20 border-l-4 border-l-primary rounded-r-xl"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}>
          <p className="text-base flex items-start gap-3 text-foreground leading-relaxed">
            <Terminal className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              I'm continuously learning new technologies and improving my
              engineering skills with the goal of becoming a{" "}
              <span className="text-primary font-semibold">
                strong software engineer
              </span>{" "}
              who can design and develop impactful systems.
            </span>
          </p>
        </motion.div>
      </motion.div>
    </Responsive>
  );
};

export default SkillsPage;
