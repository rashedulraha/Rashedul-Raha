"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="flex items-center gap-2 py-1.5 px-3 border border-border-subtle bg-bg-surface backdrop-blur-md rounded-full shadow-sm"
      >
        <SparklesIcon className="text-accent-purple h-4 w-4" />
        <h1 className="text-[11px] font-mono tracking-wider uppercase font-semibold text-text-secondary">
          Think better with Next.js 16
        </h1>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary mt-3 text-center tracking-tight"
      >
        Making apps with modern technologies.
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.5)}
        className="text-text-secondary text-sm md:text-base font-light italic mt-2 text-center"
      >
        Never miss a task, deadline or idea.
      </motion.div>
    </div>
  );
};
