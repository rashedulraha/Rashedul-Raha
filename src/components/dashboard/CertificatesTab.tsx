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
  Award, 
  Search, 
  LayoutGrid, 
  List, 
  CheckCircle2, 
  ShieldCheck 
} from "lucide-react";
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";

export interface ICertificate {
  id: string;
  title: string;
  category: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  description?: string;
  skills?: string;
}

export function CertificatesTab() {
  const [certificates, setCertificates] = useState<ICertificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<ICertificate | null>(null);
  
  // Search, Filters & View Mode
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");

  // Confirm Delete modal states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development Journey",
    issuer: "",
    date: "",
    image: "",
    credentialUrl: "",
    description: "",
    skills: "",
  });

  const fetchCertificates = async () => {
    setIsLoading(true);
    try {
      const res = await getCertificates();
      if (res.data.success && Array.isArray(res.data.data)) {
        setCertificates(res.data.data);
      }
    } catch (err) {
      console.error("Error loading certificates:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openAddModal = () => {
    setEditingCert(null);
    setFormData({
      title: "",
      category: "Web Development Journey",
      issuer: "",
      date: "2024",
      image: "",
      credentialUrl: "",
      description: "",
      skills: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cert: ICertificate) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title || "",
      category: cert.category || "Web Development Journey",
      issuer: cert.issuer || "",
      date: cert.date || "",
      image: cert.image || "",
      credentialUrl: cert.credentialUrl || "",
      description: cert.description || "",
      skills: cert.skills || "",
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
      const res = await deleteCertificate(deletingId);
      if (res.data.success) {
        fetchCertificates();
        setDeletingId(null);
      }
    } catch (err) {
      alert("Failed to delete certificate.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = editingCert
        ? await updateCertificate(editingCert.id, formData)
        : await createCertificate(formData);

      if (res.data.success) {
        setIsModalOpen(false);
        fetchCertificates();
      } else {
        alert(res.data.message || "Failed to save certificate.");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save certificate.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(certificates.map((c) => c.category || "General")));
    return ["All", ...cats];
  }, [certificates]);

  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === "All" || cert.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [certificates, searchQuery, activeCategory]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Certificates</h2>
          <p className="text-muted-foreground mt-1">
            Manage and edit your certifications and verified achievements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchCertificates}
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
            Add Certificate
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Total Certificates</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{certificates.length}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Verified Credentials</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">
              {certificates.filter((c) => c.credentialUrl).length} Links
            </h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Categories</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{categories.length - 1 || 1} Tracks</h4>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search certificates..."
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

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading certificates...</span>
        </div>
      ) : filteredCertificates.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No certificates found matching filter criteria.
        </div>
      ) : viewMode === "cards" ? (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div key={cert.id} className="card-premium p-5 flex flex-col justify-between group">
              <div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-4 relative">
                  <img
                    src={cert.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                    {cert.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground line-clamp-1">{cert.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">Issued by: <span className="text-foreground font-medium">{cert.issuer}</span> ({cert.date})</p>
                {cert.description && (
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{cert.description}</p>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50 text-xs">
                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-primary hover:underline font-medium"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Verify Credential
                  </a>
                ) : (
                  <span className="text-muted-foreground">Verified Record</span>
                )}
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cert)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-foreground rounded-lg font-medium transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(cert.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
                    title="Delete certificate"
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
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={cert.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80"}
                    alt={cert.title}
                    className="w-16 h-12 object-cover rounded-lg bg-muted shrink-0 border border-border/40"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-foreground truncate">{cert.title}</h4>
                      <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-[10px] font-bold">
                        {cert.issuer}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-lg mt-0.5">
                      {cert.category} • Issued {cert.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => openEditModal(cert)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-muted hover:bg-accent text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(cert.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 text-muted-foreground rounded-lg transition-colors"
                    title="Delete Certificate"
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
        title="Delete Certificate"
        message="Are you sure you want to delete this certificate? This action cannot be undone."
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
                  {editingCert ? "Edit Certificate" : "Add New Certificate"}
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
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    >
                      <option value="Web Development Journey">Web Development Journey</option>
                      <option value="Other Achievements">Other Achievements</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Issuer *</label>
                    <input
                      type="text"
                      required
                      value={formData.issuer}
                      onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground">Year/Date *</label>
                    <input
                      type="text"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground">Image URL *</label>
                    <input
                      type="text"
                      required
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Credential URL (Optional)</label>
                  <input
                    type="text"
                    value={formData.credentialUrl}
                    onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Description (Optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-foreground">Skills (Optional, comma-separated)</label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="React, Next.js, Node.js"
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
                    {isSubmitting ? "Saving..." : editingCert ? "Update Certificate" : "Save Certificate"}
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
