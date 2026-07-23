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
        s.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "All" || s.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [skills, searchQuery, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage your tech stack skills, icons, and category badges dynamically.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSkills}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-xl text-xs font-semibold text-foreground transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
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
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/60 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
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

      {/* Skills Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading skills...</span>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No skills found. Add your first technology!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredSkills.map((skill) => {
            const IconComponent = iconMap[skill.icon || "Code"] || Code;
            return (
              <motion.div
                key={skill.id}
                layout
                className="card-premium p-4 flex flex-col items-center text-center justify-between group relative overflow-hidden"
              >
                <div className="p-3 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 mb-3 shadow-md">
                  <IconComponent className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-xs font-bold text-foreground line-clamp-1">{skill.name}</h3>
                  <span className="text-[10px] text-muted-foreground/80 mt-0.5 block font-medium">
                    {skill.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-3 mt-3 border-t border-border/50 w-full justify-center">
                  <button
                    onClick={() => openEditModal(skill)}
                    className="p-1.5 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    title="Edit Skill"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => confirmDelete(skill.id)}
                    className="p-1.5 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="text-xl font-bold text-foreground">
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-muted rounded-lg text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Skill Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Next.js, PostgreSQL"
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Frontend, Backend, DevOps, etc."
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Icon</label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  >
                    {Object.keys(iconMap).map((iconName) => (
                      <option key={iconName} value={iconName}>
                        {iconName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Description (Optional)</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-muted hover:bg-accent text-xs font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90"
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
