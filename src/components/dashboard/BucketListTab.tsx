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
  Trophy,
  Activity
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

  const inProgressCount = useMemo(() => {
    return items.filter((i) => i.status === "IN_PROGRESS").length;
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
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Bucket List & Goals</h2>
          <p className="text-muted-foreground mt-1">
            Track career milestones, personal aspirations, and achievements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-xl text-xs font-semibold text-foreground transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
            Refresh Data
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

      {/* Progress & Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main Progress Card */}
        <div className="md:col-span-2 card-premium p-6 space-y-5 flex flex-col justify-center border border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary rounded-2xl shadow-inner">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground">Goal Completion Progress</h3>
                <p className="text-xs text-muted-foreground mt-0.5">You have achieved {completedCount} out of {items.length} life goals</p>
              </div>
            </div>
            <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 self-start sm:self-center drop-shadow-sm">{progressPercentage}%</span>
          </div>

          <div className="w-full h-4 bg-muted/60 rounded-full overflow-hidden border border-border/50 shadow-inner relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]"
            />
          </div>
        </div>
        
        {/* Side Metrics Card */}
        <div className="card-premium p-6 flex flex-col justify-center gap-5 border border-border/50">
           <div className="flex items-center gap-4">
              <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-xl shadow-inner">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">In Progress</span>
                <h4 className="text-xl font-extrabold text-foreground mt-0.5">{inProgressCount} Goals</h4>
              </div>
           </div>
           
           <div className="w-full h-px bg-border/50"></div>
           
           <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-xl shadow-inner">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Planned</span>
                <h4 className="text-xl font-extrabold text-foreground mt-0.5">{items.length} Goals</h4>
              </div>
           </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search goals or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto custom-scrollbar pb-1 md:pb-0">
          {["All", "PLANNED", "IN_PROGRESS", "COMPLETED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === status
                  ? "bg-primary text-primary-foreground shadow-md"
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
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm font-medium animate-pulse">Loading bucket list items...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="card-premium p-16 text-center text-muted-foreground border-dashed border-2 border-border/50 rounded-3xl flex flex-col items-center justify-center gap-4">
           <ListTodo className="w-12 h-12 opacity-20" />
           <div>
             <h3 className="text-lg font-bold text-foreground">No bucket list goals found</h3>
             <p className="text-sm mt-1">Start planning your next big adventure or achievement!</p>
           </div>
           <button onClick={openAddModal} className="mt-2 text-primary text-sm font-semibold hover:underline">Add your first goal &rarr;</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isCompleted = item.status === "COMPLETED";
            const isInProgress = item.status === "IN_PROGRESS";
            
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`card-premium p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 ${
                  isCompleted ? "border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50" : isInProgress ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50" : "hover:border-primary/30 border-border/50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-background border border-border/50 rounded-full text-[10px] font-extrabold text-foreground uppercase tracking-wider shadow-sm">
                      {item.category}
                    </span>

                    <button
                      onClick={() => toggleStatus(item)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all shadow-sm ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isInProgress 
                          ? "bg-amber-500 text-white"
                          : "bg-background text-muted-foreground border border-border hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : isInProgress ? <Activity className="w-3.5 h-3.5" /> : <Target className="w-3.5 h-3.5" />}
                      {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Planned"}
                    </button>
                  </div>

                  <h3 className={`text-lg font-bold mb-2 line-clamp-2 transition-colors ${isCompleted ? "text-emerald-500/90" : "text-foreground group-hover:text-primary"}`}>{item.title}</h3>
                  {item.story && (
                    <div className="relative mt-3">
                       <Sparkles className="absolute -top-1 -left-1 w-4 h-4 text-primary/20" />
                       <p className="text-xs text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/20 line-clamp-3">
                         {item.story}
                       </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50">
                  <span className={`text-[11px] font-semibold ${isCompleted ? "text-emerald-500" : "text-muted-foreground"}`}>
                    {isCompleted ? `Achieved in ${item.completedAt || "Recent"}` : "Status: Active Goal"}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-background border border-border hover:bg-accent text-foreground text-xs rounded-lg font-semibold transition-colors shadow-sm"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(item.id)}
                      className="p-1.5 bg-red-500/5 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors border border-red-500/10 shadow-sm"
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
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-card border border-border rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-muted/20">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {editingItem ? "Edit Life Goal" : "Add New Life Goal"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Dream big and set your milestones.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><Target className="w-3.5 h-3.5" /> Goal Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Build an Open Source Project with 10k Stars"
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
                      placeholder="Career, Travel, Tech"
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner appearance-none"
                    >
                      <option value="PLANNED">PLANNED (Future)</option>
                      <option value="IN_PROGRESS">IN PROGRESS</option>
                      <option value="COMPLETED">COMPLETED (Achieved)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /> Story / Notes (Optional)</label>
                  <textarea
                    rows={4}
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    placeholder="Describe the story or plan behind this goal..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner resize-none"
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
                    className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
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
