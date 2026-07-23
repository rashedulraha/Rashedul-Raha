"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  RefreshCw, 
  CheckCircle, 
  ListTodo, 
  Search, 
  Target, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Trophy
} from "lucide-react";
import { getBucketList, createBucketListItem, updateBucketListItem, deleteBucketListItem } from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";

export interface IBucketItem {
  id: string;
  title: string;
  category: string;
  status: string;
  completedAt?: string;
  story?: string;
}

export function BucketListTab() {
  const [items, setItems] = useState<IBucketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IBucketItem | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Confirm delete states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Career",
    status: "PLANNED",
    story: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await getBucketList();
      if (res.data.success && Array.isArray(res.data.data)) {
        setItems(res.data.data);
      }
    } catch (err) {
      console.error("Error loading bucket list items:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Career",
      status: "PLANNED",
      story: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: IBucketItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      category: item.category || "Career",
      status: item.status || "PLANNED",
      story: item.story || "",
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
      const res = await deleteBucketListItem(deletingId);
      if (res.data.success) {
        fetchItems();
        setDeletingId(null);
      }
    } catch (err) {
      alert("Failed to delete item.");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleStatus = async (item: IBucketItem) => {
    try {
      const newStatus = item.status === "COMPLETED" ? "PLANNED" : "COMPLETED";
      const payload = {
        ...item,
        status: newStatus,
        completedAt: newStatus === "COMPLETED" ? new Date().getFullYear().toString() : undefined,
      };
      const res = await updateBucketListItem(item.id, payload);
      if (res.data.success) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, status: newStatus } : i))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = editingItem
        ? await updateBucketListItem(editingItem.id, formData)
        : await createBucketListItem(formData);

      if (res.data.success) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        alert(res.data.message || "Failed to save bucket list item.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save bucket list item.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metrics & Progress
  const completedCount = useMemo(() => {
    return items.filter((i) => i.status === "COMPLETED").length;
  }, [items]);

  const progressPercentage = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.round((completedCount / items.length) * 100);
  }, [items, completedCount]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [items, searchQuery, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Bucket List & Life Goals</h2>
          <p className="text-muted-foreground mt-1">
            Track career milestones, personal aspirations, and completed life achievements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
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
            Add Goal
          </button>
        </div>
      </div>

      {/* Progress Bar & Metrics Banner */}
      <div className="card-premium p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">Goal Completion Progress</h3>
              <p className="text-xs text-muted-foreground">You have achieved {completedCount} out of {items.length} life goals</p>
            </div>
          </div>
          <span className="text-2xl font-extrabold text-primary self-end sm:self-center">{progressPercentage}%</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-muted/60 rounded-full overflow-hidden border border-border/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
          />
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search goals or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/60 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {["All", "PLANNED", "IN_PROGRESS", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {status === "IN_PROGRESS" ? "In Progress" : status}
            </button>
          ))}
        </div>
      </div>

      {/* Goals Grid */}
      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading bucket list items...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No bucket list goals found. Add your first goal!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isCompleted = item.status === "COMPLETED";
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`card-premium p-5 flex flex-col justify-between group relative overflow-hidden ${
                  isCompleted ? "border-emerald-500/30 bg-emerald-500/5" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 bg-muted rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {item.category}
                    </span>

                    <button
                      onClick={() => toggleStatus(item)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                        isCompleted
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/30 hover:bg-amber-500/20"
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {isCompleted ? "Completed" : item.status === "IN_PROGRESS" ? "In Progress" : "Planned"}
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-foreground mb-1 line-clamp-2">{item.title}</h3>
                  {item.story && (
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                      {item.story}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs">
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {isCompleted ? `Achieved: ${item.completedAt || "Recently"}` : "Status: Active"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-foreground rounded-lg font-medium transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
                      title="Delete Goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Bucket List Goal"
        message="Are you sure you want to delete this goal? This action cannot be undone."
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
              className="bg-background border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="text-xl font-bold text-foreground">
                  {editingItem ? "Edit Life Goal" : "Add New Life Goal"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-muted rounded-lg text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Goal Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Build an Open Source Project with 10k Stars"
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Category *</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Career, Travel, Tech"
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                      <option value="PLANNED">PLANNED</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Story / Notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    placeholder="Describe the story or plan behind this goal..."
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
                    {isSubmitting ? "Saving..." : editingItem ? "Update Goal" : "Save Goal"}
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
