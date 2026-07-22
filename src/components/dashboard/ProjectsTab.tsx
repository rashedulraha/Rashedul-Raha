"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, ExternalLink, X, RefreshCw, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { getProjects, createProject, updateProject, deleteProject } from "@/services/apiService";

export interface IProject {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  badge?: string;
  type: string;
  stats?: string;
  features: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt?: string;
}

export function ProjectsTab() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<IProject | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    image: "",
    badge: "",
    type: "Web App",
    stats: "",
    features: "",
    tags: "",
    liveUrl: "",
    githubUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getProjects();
      const data = res.data;
      if (data.success && Array.isArray(data.data)) {
        setProjects(data.data);
      } else {
        setError("Failed to load projects.");
      }
    } catch (err) {
      setError("Error connecting to backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      slug: "",
      subtitle: "",
      description: "",
      image: "",
      badge: "Q1 2026",
      type: "Web App",
      stats: "",
      features: "",
      tags: "Next.js, React, TypeScript, Tailwind CSS",
      liveUrl: "",
      githubUrl: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (project: IProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      slug: project.slug || "",
      subtitle: project.subtitle || "",
      description: project.description || "",
      image: project.image || "",
      badge: project.badge || "",
      type: project.type || "Web App",
      stats: project.stats || "",
      features: Array.isArray(project.features) ? project.features.join(", ") : "",
      tags: Array.isArray(project.tags) ? project.tags.join(", ") : "",
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await deleteProject(id);
      const data = res.data;
      if (data.success) {
        fetchProjects();
      } else {
        alert(data.message || "Failed to delete project");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error connecting to backend server");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      subtitle: formData.subtitle,
      description: formData.description,
      image: formData.image,
      badge: formData.badge,
      type: formData.type,
      stats: formData.stats,
      features: formData.features.split(",").map((s) => s.trim()).filter(Boolean),
      tags: formData.tags.split(",").map((s) => s.trim()).filter(Boolean),
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
    };

    try {
      const res = editingProject
        ? await updateProject(editingProject.id, payload)
        : await createProject(payload);

      const data = res.data;
      if (data.success) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        alert(data.message || "Operation failed.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Projects Management</h2>
          <p className="text-muted-foreground">Add, edit, or remove backend projects dynamically.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchProjects}
            className="p-2.5 bg-muted hover:bg-accent text-foreground rounded-xl border border-border transition-colors flex items-center gap-2"
            title="Refresh Projects"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>
          <button 
            onClick={openAddModal}
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            Add Project
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold text-muted-foreground">Project Details</th>
                <th className="p-4 font-semibold text-muted-foreground">Type & Badge</th>
                <th className="p-4 font-semibold text-muted-foreground">Tags</th>
                <th className="p-4 font-semibold text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Loading projects from backend...
                    </div>
                  </td>
                </tr>
              ) : projects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-muted-foreground">
                    No projects found in database. Click <strong>Add Project</strong> to create your first project!
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {project.image ? (
                          <img src={project.image} alt={project.title} className="w-12 h-12 rounded-xl object-cover border border-border" />
                        ) : (
                          <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-muted-foreground">
                            <Layers className="w-6 h-6" />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold text-foreground">{project.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">{project.subtitle || project.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-primary">{project.type || "Web App"}</span>
                        {project.badge && (
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-muted border border-border text-muted-foreground rounded-md w-fit">
                            {project.badge}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {project.tags?.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-0.5 text-[10px] bg-primary/10 text-primary rounded-md font-mono">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noreferrer" className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button onClick={() => openEditModal(project)} className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">
                  {editingProject ? "Edit Project" : "Add New Project"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                <div className="p-6 overflow-y-auto space-y-5 flex-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Keythm"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Slug (Optional)</label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. keythm"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subtitle / Tagline</label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        placeholder="e.g. Typing Test Reimagined"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      >
                        <option value="Web App">Web App</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Full-Stack">Full-Stack</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Detailed overview of the project..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm resize-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image URL (Leave blank or paste image link)</label>
                    <input
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="/images/image.png or https://..."
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo URL
                      </label>
                      <input
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        placeholder="https://keythm.dev"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <FaGithub className="w-3.5 h-3.5" /> GitHub Repo URL
                      </label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="Next.js, React, TypeScript, Tailwind CSS"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Features (comma separated)</label>
                    <input
                      type="text"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Web Audio API sound, WPM tracking, PWA precaching"
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    />
                  </div>
                </div>

                <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/30">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    ) : editingProject ? (
                      "Update Project"
                    ) : (
                      "Create Project"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
