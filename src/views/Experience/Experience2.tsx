"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Briefcase,
  Rocket,
} from "lucide-react";
import Navbar from "../shared/Navbar/Navbar";
import Responsive from "../Responsive/Responsive";
import Link from "next/link";

// ===== CREATIVE BORDER STYLES (Theme-aware, no hardcode) =====
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

export default function Experiences2() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      <Navbar />
      <Responsive>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10">
          {/* Page Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                Journey
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Experience
            </h1>
            <p className="text-foreground/70 max-w-lg text-sm md:text-base leading-relaxed">
              Driven by logic, built with passion.
            </p>
          </motion.div>

          {/* Professional Core Statement */}
          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-xl bg-card p-6 md:p-8 transition-all duration-500 hover:shadow-lg group"
            style={creativeBorderStyle}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
            {/* Subtle corner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Decorative icon */}
            <div className="absolute top-6 right-6 p-3 rounded-xl bg-primary/10 border border-primary/20 opacity-50 pointer-events-none">
              <Code className="w-6 h-6 text-primary" />
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  An Honest Perspective
                </h2>
              </div>
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                As a{" "}
                <strong className="text-primary font-semibold bg-primary/5 px-1.5 py-0.5 rounded">
                  Fresh Graduate & Self-Driven Developer
                </strong>
                I do not have a corporate job experience. However I have a lot
                of knowledge, about software engineering that I got from doing
                it. Of waiting for something to happen I used my time to design,
                test and complete my own software projects. I was working on
                world personal projects that I cared about.
              </p>
              <p className="text-foreground/70 leading-relaxed text-sm md:text-base">
                I think real experience is not about how long you sit at a desk
                . It's, about the problems you fix the clean code you write and
                the systems you get up and running.
              </p>
            </div>
          </motion.div>

          {/* Key Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: Code,
                title: "Clean Code",
                desc: "Writing maintainable, scalable, and well-documented code.",
              },
              {
                icon: Rocket,
                title: "Real Projects",
                desc: "Building and shipping production-ready applications.",
              },
              {
                icon: Sparkles,
                title: "Continuous Learning",
                desc: "Always exploring new technologies and best practices.",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="relative overflow-hidden rounded-xl bg-card p-5 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] group"
                  style={creativeBorderStyle}>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />

                  <div className="flex items-start gap-3">
                    <div>
                      <h3 className="text-base font-bold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <div
              className="relative overflow-hidden rounded-xl bg-card p-6 transition-all duration-500 hover:shadow-lg group"
              style={creativeBorderStyle}>
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
              {/* Subtle corner glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      Open to Opportunities
                    </h3>
                    <p className="text-xs text-foreground/70 font-mono">
                      Let's build something great together
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold uppercase hover:bg-primary/90 transition-all flex items-center gap-1.5 shadow-md shadow-primary/20 hover:shadow-primary/40">
                    Contact <ChevronRight className="w-3 h-3" />
                  </Link>
                  <a
                    href="/Md-Rasheduli-Islam.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-xs font-semibold uppercase hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300 flex items-center gap-1.5">
                    Resume <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Responsive>
    </div>
  );
}
