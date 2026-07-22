"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/services/apiService";

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
};

export function SkillsTab() {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<ISkill | null>(null);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await deleteSkill(id);
      if (res.data.success) {
        fetchSkills();
      } else {
        alert(res.data.message || "Failed to delete skill");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.message || "Error connecting to backend server",
      );
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

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground">
            Manage your tech stack skills and toolkit dynamically.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchSkills}
            className="p-2.5 bg-muted hover:bg-accent text-foreground rounded-xl border border-border transition-colors flex items-center gap-2"
            title="Refresh Skills"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="w-5 h-5" />
            Add Skill
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground card-premium">
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            Loading skills from backend...
          </div>
        </div>
      ) : skills.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground card-premium">
          No skills found in database. Click <strong>Add Skill</strong> to
          create your first tech skill!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, i) => {
            const IconComponent = iconMap[skill.icon || "Code"] || Code;
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="group relative card-premium p-5 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(skill)}
                      className="p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit Skill"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Delete Skill"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-base font-bold text-foreground">
                      {skill.name}
                    </p>
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-primary/10 text-primary rounded-md">
                      {skill.category}
                    </span>
                  </div>
                  {skill.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {skill.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Skill Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">
                  {editingSkill ? "Edit Skill" : "Add New Skill"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Next.js"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm cursor-pointer"
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="DevOps & Tools">DevOps & Tools</option>
                    <option value="Operating Systems">Operating Systems</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Description
                  </label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="e.g. React framework with SSR & SSG"
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) =>
                      setFormData({ ...formData, icon: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm cursor-pointer"
                  >
                    <option value="Layout">Layout (Frontend)</option>
                    <option value="Code">Code (Languages)</option>
                    <option value="Box">Box (Docker / Framework)</option>
                    <option value="Server">Server (Backend)</option>
                    <option value="Database">Database (MongoDB / SQL)</option>
                    <option value="Wind">Wind (Tailwind CSS)</option>
                    <option value="Layers">Layers (UI Component)</option>
                    <option value="Terminal">Terminal (Linux / CLI)</option>
                    <option value="Monitor">Monitor (OS / Vercel)</option>
                    <option value="Sparkles">Sparkles (AI / Motion)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-border flex justify-end gap-3">
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
                    ) : editingSkill ? (
                      "Update Skill"
                    ) : (
                      "Add Skill"
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
