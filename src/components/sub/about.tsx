"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Code,
  Rocket,
  Shield,
  Trophy,
  GraduationCap,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export const About = () => {
  const currentlyLearning = [
    {
      name: "React & Next.js",
      status: "Building Projects",
      progress: "75%",
      icon: "⚛️",
    },
    {
      name: "Docker & Cloud (AWS)",
      status: "Just Started",
      progress: "30%",
      icon: "☁️",
    },
  ];

  const coreBeliefs = [
    {
      icon: Code,
      title: "Clean Code",
      desc: "I write code that is easy to read, maintain, and scale.",
    },
    {
      icon: Shield,
      title: "Problem Solving",
      desc: "I use my DSA skills to build smart and fast solutions.",
    },
    {
      icon: Rocket,
      title: "Build & Ship",
      desc: "I don't just learn — I turn every idea into a real, working product.",
    },
  ];

  return (
    <section id="about-me" className="relative w-full py-20 overflow-hidden">
      <div className="relative z-10 container-custom">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-semibold tracking-widest text-accent-purple uppercase mb-3 block">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Behind the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">
              Code
            </span>
          </h2>
          <p className="text-sm md:text-base text-text-secondary max-w-2xl mx-auto mt-3 leading-relaxed">
            A self-taught developer turning ideas into real products, one project at a time.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column - Journey & Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-subtle hover:bg-bg-surface/80 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-purple/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-purple/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
<div className="relative space-y-6">
  <div className="flex items-center gap-2 mb-2">

    <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider font-mono">
      My Journey
    </h3>
  </div>

  {/* Who I am */}
  <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-light">
    I am a <span className="text-text-primary font-medium">self-taught Full-Stack Developer</span>. I
    enjoy building real websites and apps from ideas. So far, I have built{" "}
    <span className="text-text-primary font-medium">15+ projects</span> and solved{" "}
    <span className="text-text-primary font-medium">500+ DSA problems</span> to improve my coding and
    problem-solving skills.
  </p>

  {/* What I'm doing now */}
  <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-light">
    Right now, I am learning and building with the{" "}
    <span className="text-accent-cyan font-medium">PERN Stack</span>, including React, Node.js,
    Express, and Postgresql. I am also learning{" "}
    <span className="text-accent-cyan font-medium">Docker and cloud deployment</span> so I can build,
    deploy, and manage complete applications.
  </p>

  {/* Future plan */}
  <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-light">
    My goal is to become a skilled{" "}
    <span className="text-accent-purple font-medium">Full-Stack Web and Application Developer</span>. In the future, I
    want to build my own{" "}
    <span className="text-accent-purple font-medium">startup or software product</span> that people
    can use every day.
  </p>
</div>

            {/* Core Beliefs list */}
            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-6 border-t border-border-subtle">
              {coreBeliefs.map((belief) => (
                <div key={belief.title} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <belief.icon className="w-4 h-4 text-accent-cyan" />
                    <h4 className="text-xs font-semibold text-text-primary tracking-tight">
                      {belief.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-normal font-light">
                    {belief.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Currently Learning */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-subtle hover:bg-bg-surface/80 transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-cyan/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="w-5 h-5 text-accent-cyan" />
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-wider font-mono">
                  What I&apos;m Working On
                </h3>
              </div>

              <div className="space-y-4">
                {currentlyLearning.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-xl bg-bg-surface/50 border border-border-subtle hover:border-accent-cyan/20 hover:bg-bg-surface transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-semibold text-text-primary">
                            {item.name}
                          </h4>
                          <span className="text-xs font-mono text-accent-cyan font-semibold">
                            {item.progress}
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full h-1.5 bg-border-subtle rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.progress }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                          />
                        </div>
                        
                        <p className="text-[10px] text-text-secondary mt-1.5 font-mono">
                          {item.status}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education & Achievements Combined */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 sm:p-8 bg-bg-surface border border-border-subtle rounded-2xl transition-all duration-500 hover:bg-bg-surface/80 group mt-5 md:mt-10"
        >
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-accent-cyan/30 to-transparent" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-cyan/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Education */}
          <div className="relative space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent-cyan" />
              <p className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                Education & Courses
              </p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-base text-text-primary font-semibold">
                  Programming Hero
                </p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Full-stack development — JavaScript, React, Node.js, MongoDB
                </p>
                <div className="flex gap-2 pt-1">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-semibold">
                    Level 1 ✓
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 font-semibold">
                    Level 2 ✓
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-base text-text-primary font-semibold">Phitron</p>
                <p className="text-sm text-text-secondary leading-relaxed">
                  DSA, Algorithms, Problem Solving, Software Engineering
                </p>
                <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-accent-purple/10 text-accent-purple border border-accent-purple/20 font-semibold">
                  Completed ✓
                </span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="relative space-y-3 lg:border-l lg:border-border-subtle lg:pl-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-accent-pink" />
              <p className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                What I&apos;ve Done So Far
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-pink flex-shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Solved <span className="text-accent-pink font-bold">500+ DSA</span> problems to sharpen my logic
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-pink flex-shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Built <span className="text-accent-cyan font-bold">15+ projects</span> with the MERN stack
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-pink flex-shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Now learning <span className="text-accent-purple font-bold">DevOps & Cloud</span> to deploy and scale my own products
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};