"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  X,
  ExternalLink,
  Github,
  Layers,
  Star,
  Monitor,
  TrendingUp,
  AlertCircle,
  Box,
  Image as ImageIcon,
} from "lucide-react";
import { featuredProjects } from "./Data/quickViewData";
import { useState } from "react";
import Link from "next/link";

// ─── UPDATED INTERFACE WITH NEW FIELDS ───
interface Project {
  title: string;
  desc: string;
  longDesc?: string;
  image: string;
  screenshots?: string[]; // Array of image URLs
  architecture?: string; // Text description or diagram URL
  tech: string;
  role?: string; // e.g., "Lead Developer"
  challenges?: string; // What was hard
  outcome?: string; // Impact/Metrics
  github?: string;
  live?: string;
  stats: string;
}

// ─── BENTO GRID VARIANTS ───
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
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

// ─── PROJECT CARD COMPONENT (Supports different sizes) ───
function ProjectCard({
  project,
  layoutClass, // e.g., "md:col-span-2 md:row-span-2"
  onClick,
}: {
  project: Project;
  layoutClass?: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={`group relative cursor-pointer overflow-hidden rounded-3xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300 ${layoutClass}`}
      onClick={onClick}>
      {/* Image Background */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="space-y-2">
          {/* Role Badge */}
          {project.role && (
            <Badge className="w-fit bg-white/10 backdrop-blur-md text-white border-white/20 text-[10px] px-2 py-0.5 uppercase tracking-wider">
              {project.role}
            </Badge>
          )}

          <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {project.title}
          </h3>

          {/* Outcome Metric (Prominent) */}
          {project.outcome && (
            <div className="flex items-center gap-2 text-emerald-400 font-medium text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>{project.outcome}</span>
            </div>
          )}

          <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100">
            {project.desc}
          </p>
        </div>

        {/* Hover Action */}
        <div className="absolute top-6 right-6 p-2 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
          <ArrowRight className="w-5 h-5 text-white" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── ADVANCED PROJECT MODAL (Tabs) ───
function ProjectModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "architecture" | "gallery"
  >("overview");

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-6xl bg-[#0c0c0e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-10">
              {/* Modal Header */}
              <div className="relative h-[30vh] md:h-[40vh]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full backdrop-blur-md transition-all">
                  <X className="w-5 h-5" />
                </button>

                {/* Header Text */}
                <div className="absolute bottom-8 left-8 md:left-12">
                  <Badge className="mb-2 bg-primary text-white border-0">
                    Case Study
                  </Badge>
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-300 font-mono">
                    {project.role && <span>{project.role}</span>}
                    <span className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>{project.stats}</span>
                  </div>
                </div>
              </div>

              {/* Modal Body & Tabs */}
              <div className="p-6 md:p-12 overflow-y-auto flex-1 bg-[#0c0c0e]">
                {/* Tab Navigation */}
                <div className="flex gap-1 p-1 bg-white/5 rounded-lg w-fit mb-8 border border-white/5">
                  <button
                    onClick={() => setActiveTab("overview")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${activeTab === "overview" ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:text-white"}`}>
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab("architecture")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${activeTab === "architecture" ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:text-white"}`}>
                    Architecture
                  </button>
                  <button
                    onClick={() => setActiveTab("gallery")}
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${activeTab === "gallery" ? "bg-white/10 text-white font-medium" : "text-gray-400 hover:text-white"}`}>
                    Gallery
                  </button>
                </div>

                {/* Tab Content */}
                <div className="min-h-50">
                  {/* --- OVERVIEW TAB --- */}
                  {activeTab === "overview" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          About the Project
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.longDesc || project.desc}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                          Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.split(",").map((t, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors px-3 py-1 rounded-md">
                              {t.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Challenges */}
                        {project.challenges && (
                          <div className="bg-orange-500/5 border border-orange-500/10 rounded-xl p-5">
                            <div className="flex items-center gap-2 text-orange-400 mb-2">
                              <AlertCircle className="w-5 h-5" />
                              <h4 className="font-bold">Challenges</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                              {project.challenges}
                            </p>
                          </div>
                        )}

                        {/* Outcome */}
                        {project.outcome && (
                          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5">
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                              <TrendingUp className="w-5 h-5" />
                              <h4 className="font-bold">Outcome</h4>
                            </div>
                            <p className="text-sm text-gray-400">
                              {project.outcome}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
                        {project.live && (
                          <Button
                            asChild
                            className="bg-white text-black hover:bg-gray-200 h-12 rounded-xl font-semibold flex-1 justify-center">
                            <a
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.github && (
                          <Button
                            variant="outline"
                            asChild
                            className="h-12 rounded-xl border-white/20 hover:bg-white/5 flex-1 justify-center">
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2" />
                              GitHub Repo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- ARCHITECTURE TAB --- */}
                  {activeTab === "architecture" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xl font-bold text-white mb-4">
                        System Architecture
                      </h3>
                      <div className="bg-white/5 rounded-xl p-6 border border-white/5 min-h-[300px] flex items-center justify-center">
                        {project.architecture ? (
                          <div className="text-center text-gray-400">
                            <Box className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>{project.architecture}</p>
                          </div>
                        ) : (
                          <div className="text-center text-muted-foreground">
                            <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>
                              Architecture diagram description would go here.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* --- GALLERY TAB --- */}
                  {activeTab === "gallery" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xl font-bold text-white mb-4">
                        Screenshots
                      </h3>
                      <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                        {(project.screenshots || [project.image]).map(
                          (img, i) => (
                            <div
                              key={i}
                              className="min-w-[300px] md:min-w-[400px] snap-center rounded-xl overflow-hidden border border-white/10">
                              <img
                                src={img}
                                alt={`Screenshot ${i + 1}`}
                                className="w-full h-auto object-cover"
                              />
                            </div>
                          ),
                        )}
                        {/* Add placeholder if empty */}
                        {!project.screenshots && (
                          <div className="min-w-[300px] h-[200px] bg-white/5 rounded-xl flex items-center justify-center border border-dashed border-white/10 text-muted-foreground">
                            <div className="flex flex-col items-center">
                              <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                              <span>No more screenshots</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── MAIN COMPONENT ───
export default function FeaturedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <section className="py-24 relative overflow-hidden bg-muted/10">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16">
            <Badge className="mb-4 bg-white/10 border-white/10 text-white">
              Portfolio
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Curated selection of impactful digital products and experiments.
            </p>
          </motion.div>

          {/* BENTO GRID LAYOUT */}
          {/* Using a 4-column grid. Cards span multiple rows/cols to fill space. */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {/* Project 1: Hero (Spans 2 cols, 2 rows) */}
            {featuredProjects[0] && (
              <ProjectCard
                key={0}
                project={featuredProjects[0] as unknown as Project}
                layoutClass="md:col-span-2 md:row-span-2"
                onClick={() =>
                  setSelectedProject(featuredProjects[0] as unknown as Project)
                }
              />
            )}

            {/* Project 2: Standard (1x1) */}
            {featuredProjects[1] && (
              <ProjectCard
                key={1}
                project={featuredProjects[1] as unknown as Project}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() =>
                  setSelectedProject(featuredProjects[1] as unknown as Project)
                }
              />
            )}

            {/* Project 3: Standard (1x1) */}
            {featuredProjects[2] && (
              <ProjectCard
                key={2}
                project={featuredProjects[2] as unknown as Project}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() =>
                  setSelectedProject(featuredProjects[2] as unknown as Project)
                }
              />
            )}

            {/* Project 4: Wide (Spans 2 cols, 1 row) */}
            {featuredProjects[3] && (
              <ProjectCard
                key={3}
                project={featuredProjects[3] as unknown as Project}
                layoutClass="md:col-span-2 md:row-span-1"
                onClick={() =>
                  setSelectedProject(featuredProjects[3] as unknown as Project)
                }
              />
            )}

            {/* Project 5: Standard (1x1) */}
            {featuredProjects[4] && (
              <ProjectCard
                key={4}
                project={featuredProjects[4] as unknown as Project}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() =>
                  setSelectedProject(featuredProjects[4] as unknown as Project)
                }
              />
            )}

            {/* Project 6: Standard (1x1) */}
            {featuredProjects[5] && (
              <ProjectCard
                key={5}
                project={featuredProjects[5] as unknown as Project}
                layoutClass="md:col-span-1 md:row-span-1"
                onClick={() =>
                  setSelectedProject(featuredProjects[5] as unknown as Project)
                }
              />
            )}

            {/* Add more projects dynamically if needed, adjusting layoutClass */}
          </motion.div>
        </div>
      </section>

      {/* Render Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
