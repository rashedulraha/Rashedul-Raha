"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  MapPin,
  Code2,
  Briefcase,
  GraduationCap,
  Trophy,
  Rocket,
  Mail,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaStackOverflow } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Responsive from "../Responsive/Responsive";
import Navbar from "../shared/Navbar/Navbar";

export default function AboutSection() {
  const stats = [
    {
      label: "DSA Problems",
      value: "500+",
      icon: Trophy,
    },
    {
      label: "Projects",
      value: "15+",
      icon: Briefcase,
    },
    {
      label: "Technologies",
      value: "20+",
      icon: Code2,
    },
  ];

  const expertise = [
    { title: "Full-Stack Development", icon: Code2 },
    { title: "System Design", icon: Target },
    { title: "AI/RAG Systems", icon: Sparkles },
    { title: "Cloud Architecture", icon: Zap },
    { title: "Performance Optimization", icon: Rocket },
    { title: "Database Design", icon: Briefcase },
  ];

  const interests = [
    "System Design & Architecture",
    "AI Integrations & RAG",
    "Backend Scalability",
    "Open Source Contribution",
    "Competitive Programming",
    "Cloud Native Development",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Responsive>
      <Navbar />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible">
        {/* Profile Card */}
        <motion.div variants={itemVariants}>
          <Card className="border shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Profile Header */}
              <motion.div
                className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b"
                variants={itemVariants}>
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center shrink-0 ring-4 ring-primary/10">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-foreground">
                    Rashedul Islam
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center sm:justify-start gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Full-Stack Developer & AI/RAG Enthusiast
                  </p>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted">
                      <MapPin className="w-3.5 h-3.5" />
                      Bangladesh
                    </span>
                    <a
                      href="mailto:rashedulraha@gmail.com"
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Mail className="w-3.5 h-3.5" />
                      rashedulraha@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="https://github.com/rashedulraha" target="_blank">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
                      <FaGithub className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link
                    href="https://linkedin.com/in/rashedulraha"
                    target="_blank">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
                      <FaLinkedin className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="https://twitter.com/rashedulraha" target="_blank">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
                      <FaXTwitter className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link
                    href="https://stackoverflow.com/users/rashedulraha"
                    target="_blank">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 hover:bg-primary/10 hover:text-primary transition-all hover:scale-110">
                      <FaStackOverflow className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Stats Section */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                variants={itemVariants}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}>
                    <div className="relative p-4 bg-muted/50 backdrop-blur-sm border rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {stat.value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Bio */}
              <motion.div
                className="space-y-4 text-muted-foreground leading-relaxed"
                variants={itemVariants}>
                <p className="text-base">
                  I'm{" "}
                  <span className="text-foreground font-semibold">
                    Rashedul Islam
                  </span>
                  , a{" "}
                  <span className="text-primary font-semibold">
                    Full-Stack Developer and AI/RAG enthusiast
                  </span>{" "}
                  based in Bangladesh. I build modern, scalable, and
                  production-ready web applications using TypeScript,
                  JavaScript, Python, C++, and Go.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-muted/40 rounded-xl border">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      Training & Education
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="font-medium text-foreground">
                          Programming Hero
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          Level 1 & 2
                        </Badge>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="font-medium text-foreground">
                          Phitron
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-primary" />
                      Key Achievement
                    </p>
                    <p className="text-sm">
                      Solved{" "}
                      <span className="text-primary font-bold text-base">
                        500+ DSA problems
                      </span>{" "}
                      strengthening problem-solving and system thinking
                      abilities
                    </p>
                  </div>
                </div>

                <p className="text-base">
                  I enjoy working across both frontend and backend—building
                  clean, responsive user interfaces and designing efficient,
                  scalable backend systems and APIs. I am particularly
                  interested in{" "}
                  <span className="text-foreground font-semibold">
                    system design, backend architecture, and real-world software
                    scalability
                  </span>
                  .
                </p>

                <p className="text-base">
                  Alongside full-stack development, I explore{" "}
                  <span className="text-primary font-semibold">
                    AI integrations and RAG-based systems
                  </span>
                  , focusing on building smarter and more intelligent
                  applications.
                </p>

                <motion.div
                  className="p-5 bg-primary/5 border-l-4 border-primary rounded-r-xl"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}>
                  <p className="text-sm flex items-start gap-2">
                    <Rocket className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>
                      I'm continuously learning, building projects, and
                      improving my engineering skills with the goal of becoming
                      a{" "}
                      <span className="text-foreground font-semibold">
                        strong software engineer
                      </span>{" "}
                      who can design and develop impactful systems.
                    </span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Expertise Section */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <h4 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                  <Target className="w-5 h-5 text-primary" />
                  Core Expertise
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {expertise.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="group p-3 bg-muted/30 hover:bg-primary/10 border rounded-lg transition-all duration-300 cursor-pointer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      transition={{ duration: 0.2 }}>
                      <div className="flex items-center gap-2">
                        <item.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-foreground">
                          {item.title}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Interests Section */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <h4 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Interests & Focus Areas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <motion.div
                      key={interest}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        {interest}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </Responsive>
  );
}
