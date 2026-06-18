"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Clock,
  Users,
  Search,
  X,
  Eye,
  Sparkles,
  Filter,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import Responsive from "../Responsive/Responsive";
import { Input } from "@/components/ui/input";
import CommonBg from "@/components/CommonBg/CommonBg";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category: string;
  status: string;
  tech: string[];
  links: { live: string; github: string };
  views: number;
  rating: number;
  duration: string;
  teamSize: number;
  metric: string;
}

// ===== CREATIVE BORDER STYLES (Theme-aware, no hardcode) =====
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        await new Promise((r) => setTimeout(r, 800));
        const response = await fetch("/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    if (searchInput.trim()) {
      const query = searchInput.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tech.some((t) => t.toLowerCase().includes(query)),
      );
    }
    return filtered;
  }, [selectedCategory, searchInput, projects]);

  const categories = useMemo(() => {
    return ["all", ...new Set(projects.map((p) => p.category))];
  }, [projects]);

  if (loading) {
    return (
      <section className="min-h-screen relative">
        <CommonBg />
        <Responsive>
          <div className="relative z-10 py-16 md:py-24">
            {/* Header Skeleton */}
            <div className="mb-12 space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-10 w-10 rounded-lg bg-muted/40 animate-pulse" />
                <div className="h-4 w-20 bg-muted/40 rounded animate-pulse" />
              </div>
              <div className="h-12 bg-muted/40 rounded-xl w-1/3 animate-pulse" />
              <div className="h-6 bg-muted/40 rounded-lg w-2/3 animate-pulse" />
            </div>

            {/* Search + Filter Skeleton */}
            <div
              className="relative overflow-hidden rounded-xl bg-card p-6 mb-12"
              style={creativeBorderStyle}>
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="h-12 bg-muted/40 rounded-lg mb-6 animate-pulse" />
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-24 bg-muted/40 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            </div>

            {/* Projects Grid Skeleton - Auto-fill */}
            <div
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-xl bg-card"
                  style={creativeBorderStyle}>
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                  <div className="h-56 bg-muted/40 w-full animate-pulse" />
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-muted/40 rounded w-3/4 animate-pulse" />
                    <div className="h-4 bg-muted/40 rounded w-1/2 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-3 bg-muted/40 rounded w-full animate-pulse" />
                      <div className="h-3 bg-muted/40 rounded w-full animate-pulse" />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <div className="h-10 bg-muted/40 rounded-lg flex-1 animate-pulse" />
                      <div className="h-10 bg-muted/40 rounded-lg flex-1 animate-pulse" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Responsive>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden">
      <CommonBg />
      <Responsive>
        <div className="relative z-10 py-16 md:py-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                Portfolio
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3">
              Featured Projects
            </h1>
            <p className="text-base text-foreground/70 max-w-2xl leading-relaxed">
              A collection of high-performance web applications crafted with
              precision.
            </p>
          </motion.div>

          {/* Search + Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative overflow-hidden rounded-xl bg-card p-6 mb-12 transition-all duration-500 hover:shadow-lg group"
            style={creativeBorderStyle}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
            {/* Subtle corner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              {/* Search Input */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70" />
                <Input
                  type="text"
                  placeholder="Search by technology, name..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="pl-11 h-12 text-base bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {searchInput && (
                  <Button
                    onClick={() => setSearchInput("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/70 hover:text-foreground p-2 rounded-lg hover:bg-muted/50 transition-all"
                    variant="ghost"
                    size="icon">
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Filter by Category
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted/30 text-foreground/70 border border-border hover:bg-primary/10 hover:border-primary/30 hover:text-primary"
                    }`}>
                    {category === "all" ? "All Projects" : category}
                  </Button>
                ))}
              </div>

              {/* Results Count */}
              <div className="mt-6 pt-4 border-t border-border/40">
                <div className="inline-flex items-center gap-2 text-xs font-medium text-foreground/70 bg-muted/30 px-3 py-1.5 rounded-full border border-border/50">
                  <Eye className="w-3.5 h-3.5 text-primary" />
                  Showing {filteredProjects.length} result
                  {filteredProjects.length !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid - Auto-fill Dynamic Layout */}
          {filteredProjects.length > 0 ? (
            <motion.div
              layout
              className="grid gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              }}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative overflow-hidden rounded-xl bg-card transition-all duration-500 hover:shadow-lg flex flex-col"
                  style={creativeBorderStyle}>
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none z-20" />
                  {/* Subtle corner glow */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden bg-muted/30">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-foreground text-xs font-bold">
                        {project.category}
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 flex flex-col flex-grow">
                    <div className="mb-auto">
                      <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-xs text-foreground/70 font-mono mb-3 line-clamp-1">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-foreground/70 line-clamp-2 mb-4 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-4 text-xs text-foreground/70 mb-4 pb-4 border-b border-border/40">
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded bg-primary/10 border border-primary/20">
                          <Clock className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-medium">{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="p-1 rounded bg-primary/10 border border-primary/20">
                          <Users className="w-3 h-3 text-primary" />
                        </div>
                        <span className="font-medium">
                          {project.teamSize} people
                        </span>
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs rounded-md bg-muted/40 border border-border text-foreground font-medium hover:border-primary/50 hover:text-primary transition-colors">
                          {t}
                        </span>
                      ))}
                      {project.tech.length > 4 && (
                        <span className="px-2.5 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/20 font-medium">
                          +{project.tech.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      {project.links.live && (
                        <a
                          href={project.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Live Demo
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-muted/30 border border-border text-foreground text-xs font-semibold hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-300">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-xl bg-card p-16 text-center"
              style={creativeBorderStyle}>
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-primary/10 border border-primary/20 mb-6">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                No projects found
              </h3>
              <p className="text-sm text-foreground/70 mb-6 max-w-md mx-auto">
                We couldn't find any projects matching your search criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchInput("");
                  setSelectedCategory("all");
                }}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </Responsive>
    </section>
  );
}
