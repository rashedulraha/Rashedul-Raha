"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, ExternalLink, X, RefreshCw, BookOpen } from "lucide-react";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "@/services/apiService";

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      const res = await deleteBlog(id);
      if (res.data.success) {
        fetchBlogs();
      }
    } catch (err) {
      alert("Failed to delete blog post.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Blogs Management</h2>
          <p className="text-muted-foreground mt-1">
            Create, edit, and delete articles displayed on your portfolio blog.
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
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add New Blog
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading blogs...</span>
        </div>
      ) : blogs.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No blogs found. Click "Add New Blog" to create your first post!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="card-premium p-5 flex flex-col justify-between group">
              <div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-4 relative">
                  <img
                    src={blog.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80"}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground line-clamp-1">{blog.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{blog.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs">
                <span className="text-muted-foreground">{blog.readTime}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(blog)}
                    className="p-2 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors text-muted-foreground"
                    title="Edit blog"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
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
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background border border-border rounded-2xl p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border pb-3">
                <h3 className="text-xl font-bold text-foreground">
                  {editingBlog ? "Edit Blog Post" : "Add New Blog Post"}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-muted rounded-lg">
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
                    <label className="text-xs font-semibold text-foreground">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Read Time</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
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
                  <label className="text-xs font-semibold text-foreground">Content (Markdown / Text) *</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
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
                    {isSubmitting ? "Saving..." : "Save Blog"}
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
