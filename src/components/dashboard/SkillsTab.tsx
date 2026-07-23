"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  Server,
  Layers,
  Code,
  Database,
  Wind,
  Terminal,
  Monitor,
  Sparkles,
  Box,
  Layout,
  Edit2,
  Trash2,
  RefreshCw,
  Search,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";

export interface ISkill {
  id: string;
  name: string;
  category: string;
  description?: string;
  icon?: string;
  featured?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  Layout,
  Code,
  Box,
  Server,
  Database,
  Wind,
  Layers,
  Terminal,
  Monitor,
  Sparkles,
  Cpu,
  Globe,
  ShieldCheck,
  Zap,
};

export function SkillsTab() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<ISkill | null>(null);

  // Delete confirm modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    description: "",
    icon: "Code",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSkills = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getSkills();
      if (res.data.success && Array.isArray(res.data.data)) {
        setSkills(res.data.data);
      } else {
        setError("Failed to load skills.");
      }
    } catch (err: any) {
      setError("Error connecting to backend server.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const openAddModal = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      category: "Frontend",
      description: "",
      icon: "Code",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (skill: ISkill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || "",
      category: skill.category || "Frontend",
      description: skill.description || "",
      icon: skill.icon || "Code",
    });
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const res = await deleteSkill(deletingId);
      if (res.data.success) {
        fetchSkills();
        setDeletingId(null);
      } else {
        alert(res.data.message || "Failed to delete skill");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting skill");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      icon: formData.icon,
    };

    try {
      const res = editingSkill
        ? await updateSkill(editingSkill.id, payload)
        : await createSkill(payload);

      if (res.data.success) {
        setIsModalOpen(false);
        fetchSkills();
      } else {
        alert(res.data.message || "Operation failed.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving skill.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map((s) => s.category || "General")));
    return ["All", ...cats];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = activeCategory === "All" || s.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [skills, searchQuery, activeCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your tech stack skills, icons, and category badges dynamically in a clean tabular view.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSkills}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-xl text-xs font-semibold text-foreground transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
            Refresh
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Skill
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tech stack by name, category or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto custom-scrollbar pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Tabular Skill List View instead of cards */}
      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm font-medium animate-pulse">Loading skills...</span>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="card-premium p-16 text-center text-muted-foreground border-dashed border-2 border-border/50 rounded-3xl flex flex-col items-center justify-center gap-4">
          <Code className="w-12 h-12 opacity-20" />
          <div>
            <h3 className="text-lg font-bold text-foreground">No skills found</h3>
            <p className="text-sm mt-1">Add your skills to show them in the portfolio website.</p>
          </div>
          <button onClick={openAddModal} className="mt-2 text-primary text-sm font-semibold hover:underline">Add your first skill &rarr;</button>
        </div>
      ) : (
        <div className="card-premium overflow-hidden rounded-2xl border border-border/50 shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <th className="py-4 px-6">Skill / Technology</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6 hidden md:table-cell">Description / Notes</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-sm text-foreground">
                {filteredSkills.map((skill) => {
                  const IconComponent = iconMap[skill.icon || "Code"] || Code;
                  return (
                    <motion.tr
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      <td className="py-4 px-6 font-semibold">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <span className="truncate max-w-[180px] sm:max-w-none">{skill.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 bg-muted border border-border text-foreground text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                          {skill.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 hidden md:table-cell text-muted-foreground max-w-xs truncate">
                        {skill.description || <span className="italic text-muted-foreground/45">No details provided</span>}
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(skill)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-foreground text-xs rounded-lg font-semibold transition-colors"
                            title="Edit Skill"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => confirmDelete(skill.id)}
                            className="p-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors bg-background border border-border"
                            title="Delete Skill"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Skill"
        message="Are you sure you want to delete this skill? It will be removed from your public tech stack."
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingId(null)}
      />

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-muted/20">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {editingSkill ? "Edit Skill" : "Add New Skill"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage your technology showcase information.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Skill Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Next.js, PostgreSQL"
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">Category *</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Frontend, Backend"
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">Visual Icon</label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner appearance-none"
                    >
                      {Object.keys(iconMap).map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">Description (Optional)</label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief details about your experience with this tech..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-border mt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 bg-muted hover:bg-accent text-sm font-semibold rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? "Saving..." : editingSkill ? "Update Skill" : "Add Skill"}
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
