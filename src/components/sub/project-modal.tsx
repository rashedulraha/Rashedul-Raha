"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { X, ExternalLink, Calendar, Code2, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectModalProps {
  project: {
    title: string;
    description: string;
    image: string;
    link?: string;
    github?: string;
    tags: readonly string[];
    longDescription?: string;
    features?: readonly string[];
    technologies?: readonly string[];
    duration?: string;
    role?: string;
  };
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[#0a0a1a] border border-white/[0.08] rounded-2xl shadow-2xl scrollbar-hidden"
        onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer">
          <X className="w-5 h-5" />
        </button>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left: Image */}
          <div className="relative w-full aspect-video lg:aspect-auto lg:h-full min-h-[250px] lg:min-h-[500px] overflow-hidden bg-black/20">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-w-1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a1a] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent lg:hidden" />
          </div>

          {/* Right: Info */}
          <div className="p-6 lg:p-8 space-y-6">
            {/* Title & Meta */}
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                {project.title}
              </h2>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
                {project.duration && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    <span>{project.duration}</span>
                  </div>
                )}
                {project.role && (
                  <div className="flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{project.role}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono text-slate-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.05]">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono text-slate-400 bg-white/[0.03] border border-white/[0.08] px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:scale-105">
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-medium hover:bg-white/10 transition-all hover:scale-105">
                  <FaGithub className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
