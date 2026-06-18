"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Star,
  Clock,
  Users,
  Eye,
  Sparkles,
} from "lucide-react";

import Responsive from "../Responsive/Responsive";

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
  featured: boolean;
}

// ===== CREATIVE BORDER STYLES (Theme-aware, no hardcode) =====
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

const innerCardBorderStyle = {
  borderTop: "1px solid var(--border)",
  borderLeft: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderRight: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 10%)",
};

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch("/projects.json");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error loading featured projects:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="w-full relative overflow-hidden">
      <Responsive>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Featured Projects
            </h2>
            <p className="text-foreground/70 max-w-xl mt-3 leading-relaxed">
              Hand-picked projects showcasing my expertise in Full-Stack
              development and creative problem solving.
            </p>
          </div>

          {/* View All Button with Creative Border */}
          <Link
            href="/projects"
            className="relative group flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors px-6 py-2.5 bg-card rounded-full w-fit overflow-hidden"
            style={creativeBorderStyle}>
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
            View All Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="relative h-[450px] rounded-xl bg-card overflow-hidden animate-pulse"
                style={creativeBorderStyle}>
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="h-56 bg-muted/40 w-full" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-muted/40 rounded w-3/4" />
                  <div className="h-4 bg-muted/40 rounded w-1/2" />
                  <div className="h-20 bg-muted/40 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative rounded-xl bg-card overflow-hidden h-full flex flex-col transition-all duration-500 hover:shadow-lg"
                style={creativeBorderStyle}>
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none z-20" />

                {/* Subtle corner glow on hover */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

                {/* Card Wrapper (Link to Details) */}
                <Link
                  href={`/projects/${project.id}`}
                  className="absolute inset-0 z-10">
                  <span className="sr-only">View {project.title} details</span>
                </Link>

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

                  {/* Stats Overlay on Hover */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                    <div className="flex items-center gap-3 text-foreground text-xs font-medium">
                      <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                        <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                        <span>{project.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border/50">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{project.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-6 flex flex-col flex-grow">
                  <div className="mb-auto">
                    <h3 className="text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors line-clamp-1">
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
                  <div className="flex gap-2 mt-auto relative z-20 pointer-events-auto">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors">
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live
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
          </div>
        )}
      </Responsive>
    </section>
  );
}
