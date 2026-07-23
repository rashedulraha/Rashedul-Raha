"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, RefreshCw, CheckCircle, ListTodo } from "lucide-react";
import { getBucketList, createBucketListItem, updateBucketListItem, deleteBucketListItem } from "@/services/apiService";

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bucket list item?")) return;
    try {
      const res = await deleteBucketListItem(id);
      if (res.data.success) {
        fetchItems();
      }
    } catch (err) {
      alert("Failed to delete item.");
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Bucket List</h2>
          <p className="text-muted-foreground mt-1">
            Manage goals, dreams, and personal milestones.
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
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Goal
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading bucket list...</span>
        </div>
      ) : items.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No items found. Add your first goal!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="card-premium p-5 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.status === "COMPLETED"
                      ? "bg-green-500/20 text-green-500"
                      : "bg-amber-500/20 text-amber-500"
                  }`}>
                    {item.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                {item.story && <p className="text-xs text-muted-foreground mt-2 italic">"{item.story}"</p>}
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-border/50 text-xs">
                <button
                  onClick={() => openEditModal(item)}
                  className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-muted-foreground"
                  title="Edit item"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="text-xl font-bold text-foreground">
                  {editingItem ? "Edit Goal" : "Add Goal"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-muted rounded-lg">
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
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                    {isSubmitting ? "Saving..." : "Save Goal"}
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
