"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  Edit2,
  Trash2,
  RefreshCw,
  Star,
  Quote,
  CheckCircle,
  Search,
  LayoutGrid,
  List,
  Sparkles,
  ThumbsUp,
  UserCheck,
  Building,
} from "lucide-react";
import {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";
import { Skeleton } from "@/components/ui/skeleton";

export interface ITestimonial {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  title: string;
  message: string;
  rating?: number;
  featured?: boolean;
}

export function TestimonialsTab() {
  const [items, setItems] = useState<ITestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ITestimonial | null>(null);

  // Delete confirm modal state
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Search & Filter & View Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState<"All" | "5" | "4+" | "Featured">("All");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    avatar: "",
    title: "",
    message: "",
    rating: 5,
    featured: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getTestimonials();
      if (res.data.success && Array.isArray(res.data.data)) {
        setItems(res.data.data);
      } else {
        setError("Failed to load testimonials.");
      }
    } catch (err: any) {
      setError("Error connecting to backend server.");
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
      name: "",
      role: "CEO & Founder",
      avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 50 + 1),
      title: "Exceptional Quality & Speed",
      message: "",
      rating: 5,
      featured: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: ITestimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name || "",
      role: item.role || "",
      avatar: item.avatar || "",
      title: item.title || "",
      message: item.message || "",
      rating: item.rating || 5,
      featured: item.featured ?? true,
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
      const res = await deleteTestimonial(deletingId);
      if (res.data.success) {
        fetchItems();
        setDeletingId(null);
      } else {
        alert(res.data.message || "Failed to delete testimonial");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting testimonial");
    } finally {
      setIsDeleting(false);
    }
  };

  const toggleFeatured = async (item: ITestimonial) => {
    try {
      const updatedFeatured = !item.featured;
      const res = await updateTestimonial(item.id, { featured: updatedFeatured });
      if (res.data.success) {
        setItems((prev) =>
          prev.map((t) => (t.id === item.id ? { ...t, featured: updatedFeatured } : t))
        );
      }
    } catch (err) {
      console.error("Failed to toggle featured status:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = editingItem
        ? await updateTestimonial(editingItem.id, formData)
        : await createTestimonial(formData);

      if (res.data.success) {
        setIsModalOpen(false);
        fetchItems();
      } else {
        alert(res.data.message || "Operation failed.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving testimonial.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Metrics
  const averageRating = useMemo(() => {
    if (items.length === 0) return "5.0";
    const total = items.reduce((acc, curr) => acc + (curr.rating || 5), 0);
    return (total / items.length).toFixed(1);
  }, [items]);

  const featuredCount = useMemo(() => {
    return items.filter((i) => i.featured).length;
  }, [items]);

  // Filtered List
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesRating = true;
      if (ratingFilter === "5") matchesRating = (item.rating || 5) === 5;
      else if (ratingFilter === "4+") matchesRating = (item.rating || 5) >= 4;
      else if (ratingFilter === "Featured") matchesRating = Boolean(item.featured);

      return matchesSearch && matchesRating;
    });
  }, [items, searchQuery, ratingFilter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground mt-1">
            Manage client reviews, ratings, and featured recommendations.
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
            Add Testimonial
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Star className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Avg Rating</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{averageRating} / 5.0</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <ThumbsUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Total Reviews</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{items.length}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Featured</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{featuredCount} Active</h4>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search, Filters, and View Switcher */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by client or review..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/60 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        {/* Rating Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {(["All", "5", "4+", "Featured"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setRatingFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                ratingFilter === filter
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {filter === "5" ? "5 Stars" : filter === "4+" ? "4+ Stars" : filter}
            </button>
          ))}
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-muted/60 border border-border p-1 rounded-xl gap-1 shrink-0">
          <button
            onClick={() => setViewMode("cards")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "cards" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "list" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium">
          {error}
        </div>
      )}

      {/* Main Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card-premium p-6 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-4/5 rounded-md" />
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Skeleton className="size-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24 rounded-md" />
                  <Skeleton className="h-3 w-16 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No testimonials found matching your filter criteria.
        </div>
      ) : viewMode === "cards" ? (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium p-6 flex flex-col justify-between group relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < (item.rating || 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => toggleFeatured(item)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                      item.featured
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                        : "bg-muted text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {item.featured ? "★ Featured" : "Standard"}
                  </button>
                </div>

                <h3 className="text-base font-bold text-foreground mb-1 line-clamp-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground/90 leading-relaxed italic line-clamp-4 mb-6 relative">
                  "{item.message}"
                </p>
              </div>

              {/* Client Info & Actions Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar || "https://i.pravatar.cc/150"}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-foreground">{item.name}</h4>
                    <span className="text-[10px] text-muted-foreground font-medium block">{item.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                    title="Edit Review"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => confirmDelete(item.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* TABLE / LIST VIEW */
        <div className="card-premium overflow-hidden">
          <div className="divide-y divide-border/50">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.avatar || "https://i.pravatar.cc/150"}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-border shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground truncate">{item.name}</h4>
                      <span className="text-xs text-muted-foreground">({item.role})</span>
                      {item.featured && (
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md text-[10px] font-bold">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-primary mt-0.5">{item.title}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-lg mt-0.5">
                      "{item.message}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < (item.rating || 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => openEditModal(item)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(item.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? It will be removed permanently."
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
                  {editingItem ? "Edit Testimonial" : "Add New Testimonial"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-muted rounded-lg text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Client Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Role / Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      placeholder="CTO at TechCorp"
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Avatar Image URL</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          avatar: "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70 + 1),
                        })
                      }
                      className="px-3 py-2 bg-muted hover:bg-accent text-xs font-semibold rounded-xl text-foreground shrink-0"
                    >
                      Random
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Headline / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Exceptional Developer & Great Communication"
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Testimonial Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write client testimonial message..."
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                {/* Rating Picker */}
                <div className="flex items-center justify-between border-t border-b border-border py-3">
                  <div>
                    <label className="text-xs font-semibold text-foreground block">Rating Score</label>
                    <span className="text-[10px] text-muted-foreground">Select star rating out of 5</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured Switch */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-xs font-semibold text-foreground block">Featured Status</label>
                    <span className="text-[10px] text-muted-foreground">Showcase on homepage testimonials</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
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
                    {isSubmitting ? "Saving..." : editingItem ? "Update Testimonial" : "Add Testimonial"}
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
