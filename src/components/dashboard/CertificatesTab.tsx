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
  ShieldCheck,
  Copy,
  Calendar,
  Image as ImageIcon
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
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
      date: new Date().getFullYear().toString(),
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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Certifications</h2>
          <p className="text-muted-foreground mt-1">
            Manage your credentials, verify links, and highlight your skills.
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
            Add Credential
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-2xl shadow-inner">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Certificates</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{certificates.length}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Verified Credentials</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">
              {certificates.filter((c) => c.credentialUrl).length} Links
            </h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 text-blue-500 rounded-2xl shadow-inner">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Skill Tracks</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{categories.length - 1 || 1} Tracks</h4>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, issuer, or category..."
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center bg-background border border-border p-1 rounded-xl gap-1 shrink-0 shadow-inner hidden sm:flex">
          <button
            onClick={() => setViewMode("cards")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "cards" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "list" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm font-medium animate-pulse">Loading credentials...</span>
        </div>
      ) : filteredCertificates.length === 0 ? (
        <div className="card-premium p-16 text-center text-muted-foreground border-dashed border-2 border-border/50 rounded-3xl flex flex-col items-center justify-center gap-4">
           <Award className="w-12 h-12 opacity-20" />
           <div>
             <h3 className="text-lg font-bold text-foreground">No certificates found</h3>
             <p className="text-sm mt-1">Add your certifications to showcase your expertise.</p>
           </div>
           <button onClick={openAddModal} className="mt-2 text-primary text-sm font-semibold hover:underline">Add Credential &rarr;</button>
        </div>
      ) : viewMode === "cards" ? (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div key={cert.id} className="card-premium p-5 flex flex-col justify-between group rounded-2xl hover:border-primary/30 transition-colors duration-300">
              <div>
                <div className="aspect-video w-full rounded-xl overflow-hidden bg-muted mb-5 relative border border-border/50 p-2">
                  <div className="w-full h-full rounded-lg overflow-hidden relative">
                    <img
                      src={cert.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80"}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      {cert.credentialUrl && (
                        <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-white text-xs font-bold transition-colors">
                          <ExternalLink className="w-4 h-4" /> Verify Credential
                        </a>
                      )}
                    </div>
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] font-extrabold text-white uppercase tracking-wider shadow-lg">
                    {cert.category}
                  </span>
                </div>
                <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{cert.title}</h3>
                <p className="text-xs text-muted-foreground mt-2">Issued by: <span className="text-foreground font-semibold">{cert.issuer}</span> <span className="mx-1">•</span> {cert.date}</p>
                {cert.description && (
                  <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed bg-muted/30 p-2 rounded-lg">{cert.description}</p>
                )}
                {cert.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {cert.skills.split(",").slice(0, 3).map((s, i) => (
                      <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded-md">
                        {s.trim()}
                      </span>
                    ))}
                    {cert.skills.split(",").length > 3 && (
                      <span className="px-2 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded-md">+{cert.skills.split(",").length - 3}</span>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-5 mt-5 border-t border-border/50">
                <div className="flex items-center gap-1.5">
                    {cert.credentialUrl ? (
                      <button 
                        onClick={() => copyToClipboard(cert.credentialUrl!, cert.id)}
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2 py-1.5 rounded-lg transition-colors ${copiedId === cert.id ? "bg-emerald-500/20 text-emerald-500" : "bg-muted hover:bg-accent text-foreground"}`}
                      >
                        {copiedId === cert.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedId === cert.id ? "Copied!" : "Copy Link"}
                      </button>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Verified Record</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(cert)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-accent text-foreground text-xs rounded-lg font-semibold transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(cert.id)}
                    className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
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
        <div className="card-premium overflow-hidden rounded-2xl border border-border/50">
          <div className="divide-y divide-border/50">
            {filteredCertificates.map((cert) => (
              <div
                key={cert.id}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-5 min-w-0 flex-1">
                  <img
                    src={cert.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80"}
                    alt={cert.title}
                    className="w-24 h-16 object-cover rounded-xl bg-muted shrink-0 border border-border/40 shadow-sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-sm font-bold text-foreground truncate hover:text-primary transition-colors cursor-pointer">{cert.title}</h4>
                      <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary rounded-md text-[10px] font-extrabold uppercase tracking-wider shrink-0 hidden sm:inline-block">
                        {cert.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate max-w-xl">
                      Issued by <span className="font-semibold text-foreground">{cert.issuer}</span> • {cert.date}
                    </p>
                    {cert.skills && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.split(",").slice(0, 4).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 bg-muted border border-border text-foreground text-[9px] font-bold rounded">
                            {s.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {cert.credentialUrl && (
                     <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                        title="Verify Credential"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                  )}
                  <button
                    onClick={() => openEditModal(cert)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-muted hover:bg-accent text-foreground text-xs font-semibold rounded-lg transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Edit
                  </button>
                  <button
                    onClick={() => confirmDelete(cert.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
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
        title="Delete Credential"
        message="Are you sure you want to remove this certificate? This action cannot be reversed."
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingId(null)}
      />

      {/* Modern Split-Layout Add / Edit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="bg-card border border-border rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-border bg-muted/20">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {editingCert ? "Edit Credential" : "Add New Credential"}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Showcase your verified achievements and skills.</p>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-xl transition-colors">
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Left Column: Core Details */}
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><Award className="w-3.5 h-3.5" /> Certificate Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. AWS Certified Solutions Architect"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><LayoutGrid className="w-3.5 h-3.5" /> Category</label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner appearance-none"
                        >
                          <option value="Web Development Journey">Web Development Journey</option>
                          <option value="Cloud Computing">Cloud Computing</option>
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Other Achievements">Other Achievements</option>
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Issuer *</label>
                        <input
                          type="text"
                          required
                          value={formData.issuer}
                          onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                          placeholder="e.g. Amazon Web Services"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Date / Year *</label>
                        <input
                          type="text"
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          placeholder="e.g. October 2024"
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><ExternalLink className="w-3.5 h-3.5" /> Credential URL</label>
                        <input
                          type="text"
                          value={formData.credentialUrl}
                          onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                          placeholder="https://credly.com/..."
                          className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Media & Extra Details */}
                  <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2"><ImageIcon className="w-3.5 h-3.5" /> Image URL *</label>
                      <input
                        type="text"
                        required
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                      />
                      {formData.image && (
                         <div className="mt-3 aspect-video bg-muted rounded-xl border border-border/50 overflow-hidden">
                            <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                         </div>
                      )}
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">Skills Earned</label>
                      <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        placeholder="e.g. React, Next.js, TypeScript (comma separated)"
                        className="w-full bg-background border border-border rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">Short Description</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                        placeholder="Briefly describe what you learned or achieved..."
                        className="w-full bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 shadow-inner resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 px-6 py-4 border-t border-border bg-muted/10">
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
                    {isSubmitting ? "Saving..." : editingCert ? "Update Credential" : "Save Credential"}
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
