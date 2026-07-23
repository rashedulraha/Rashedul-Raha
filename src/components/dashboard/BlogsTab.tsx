"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  X, 
  RefreshCw, 
  BookOpen, 
  Search, 
  LayoutGrid, 
  List, 
  Clock, 
  FileText,
  Sparkles
} from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image?: string;
  category: string;
  readTime: string;
  createdAt?: string;
}

export function BlogsTab() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);

  // View Mode & Filters
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Confirm delete states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
    image: "",
    category: "Tutorial",
    readTime: "5 min read",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await getBlogs();
      if (res.data.success && Array.isArray(res.data.data)) {
        setBlogs(res.data.data);
      }
    } catch (err) {
      setError("Failed to load blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const openAddModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      description: "",
      content: "",
      image: "",
      category: "Tutorial",
      readTime: "5 min read",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (blog: IBlog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      description: blog.description || "",
      content: blog.content || "",
      image: blog.image || "",
      category: blog.category || "Tutorial",
      readTime: blog.readTime || "5 min read",
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
      const res = await deleteBlog(deletingId);
      if (res.data.success) {
        fetchBlogs();
        setDeletingId(null);
      }
    } catch (err) {
      alert("Failed to delete blog post.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      };

      const res = editingBlog
        ? await updateBlog(editingBlog.id, payload)
        : await createBlog(payload);

      if (res.data.success) {
        setIsModalOpen(false);
        fetchBlogs();
      } else {
        alert(res.data.message || "Failed to save blog.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(blogs.map((b) => b.category || "General")));
    return ["All", ...cats];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "All" || blog.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [blogs, searchQuery, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Blog Posts</h2>
          <p className="text-muted-foreground mt-1">
            Create, edit, and publish technical articles and tutorials.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
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
            Add Blog Post
          </button>
        </div>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Published Posts</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{blogs.length}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Categories</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{categories.length - 1 || 1} Topics</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Avg Read Time</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">5 Mins</h4>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/60 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
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

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading blogs...</span>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No blog posts found. Write your first blog post!
        </div>
      ) : viewMode === "cards" ? (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className="card-premium p-5 flex flex-col justify-between group">
              <div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-4 relative">
                  <img
                    src={blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 flex gap-2">
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                      {blog.category}
                    </span>
                    <span className="px-2.5 py-1 bg-primary/80 backdrop-blur-md rounded-full text-[10px] font-bold text-primary-foreground">
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-foreground line-clamp-1">{blog.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-3 leading-relaxed">
                  {blog.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs">
                <a
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Article
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-foreground rounded-lg font-medium transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(blog.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
                    title="Delete blog"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="card-premium overflow-hidden">
          <div className="divide-y divide-border/50">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80"}
                    alt={blog.title}
                    className="w-16 h-12 object-cover rounded-lg bg-muted shrink-0 border border-border/40"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground truncate">{blog.title}</h4>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-bold">
                        {blog.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-lg mt-0.5">
                      {blog.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <span className="text-xs text-muted-foreground font-medium">{blog.readTime}</span>
                  <button
                    onClick={() => openEditModal(blog)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(blog.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors"
                    title="Delete blog"
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
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? It will be removed permanently."
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
              className="bg-background border border-border rounded-2xl p-6 w-full max-w-2xl shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="text-xl font-bold text-foreground">
                  {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-muted rounded-lg text-muted-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-foreground">Title *</label>
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
                    <label className="text-xs font-semibold text-foreground">Category *</label>
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="Tutorial, Architecture, Next.js"
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      placeholder="5 min read"
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Description *</label>
                  <textarea
                    required
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Content (Markdown / HTML) *</label>
                  <textarea
                    required
                    rows={8}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your article content here..."
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 font-mono text-xs"
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
                    {isSubmitting ? "Saving..." : editingBlog ? "Update Blog" : "Publish Blog"}
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
