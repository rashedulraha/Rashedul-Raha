"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trash2, 
  RefreshCw, 
  MessageSquareQuote, 
  Search, 
  CheckCircle, 
  Clock, 
  Mail,
  ShieldCheck,
  LayoutGrid,
  List,
  Copy,
  CheckCircle2
} from "lucide-react";
import { getGuestbookMessages, deleteGuestbookMessage } from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";

export interface IGuestbookMessage {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

export function GuestbookTab() {
  const [messages, setMessages] = useState<IGuestbookMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | "Approved" | "Pending">("All");
  const [viewMode, setViewMode] = useState<"cards" | "list">("cards");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Confirm delete states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await getGuestbookMessages();
      if (res.data.success && Array.isArray(res.data.data)) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching guestbook messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      const res = await deleteGuestbookMessage(deletingId);
      if (res.data.success) {
        setMessages((prev) => prev.filter((msg) => msg.id !== deletingId));
        setDeletingId(null);
      }
    } catch (err) {
      alert("Failed to delete message.");
    } finally {
      setIsDeleting(false);
    }
  };
  
  const copyEmail = (email: string, id: string) => {
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Metrics
  const approvedCount = useMemo(() => {
    return messages.filter((m) => m.approved ?? true).length;
  }, [messages]);

  const pendingCount = useMemo(() => {
    return messages.filter((m) => m.approved === false).length;
  }, [messages]);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (msg.email && msg.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (filterStatus === "Approved") matchesFilter = (msg.approved ?? true) === true;
      else if (filterStatus === "Pending") matchesFilter = msg.approved === false;

      return matchesSearch && matchesFilter;
    });
  }, [messages, searchQuery, filterStatus]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Guestbook Signatures</h2>
          <p className="text-muted-foreground mt-1">
            Review and moderate public guestbook comments left by your visitors.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-xl text-xs font-semibold text-foreground transition-all shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
          Refresh Data
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 flex items-center gap-4 border border-border/50">
          <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-2xl shadow-inner">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Signatures</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{messages.length}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4 border border-border/50">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Approved Posts</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{approvedCount}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4 border border-border/50">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl shadow-inner">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Pending Review</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{pendingCount}</h4>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by visitor name, email, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all shadow-inner"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto custom-scrollbar pb-1 md:pb-0">
          {(["All", "Approved", "Pending"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {status} {status !== "All" && `(${(status === "Approved" ? approvedCount : pendingCount)})`}
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
            <span className="hidden lg:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === "list" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden lg:inline">List</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          <span className="text-sm font-medium animate-pulse">Loading guestbook messages...</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="card-premium p-16 text-center text-muted-foreground border-dashed border-2 border-border/50 rounded-3xl flex flex-col items-center justify-center gap-4">
           <MessageSquareQuote className="w-12 h-12 opacity-20" />
           <div>
             <h3 className="text-lg font-bold text-foreground">No signatures found</h3>
             <p className="text-sm mt-1">Try adjusting your filters or wait for new visitors to sign your guestbook.</p>
           </div>
        </div>
      ) : viewMode === "cards" ? (
        /* CARDS VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMessages.map((msg) => (
            <motion.div 
              key={msg.id} 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`card-premium p-5 flex flex-col justify-between group border transition-all duration-300 ${msg.approved ?? true ? 'border-border/50 hover:border-primary/30' : 'border-amber-500/20 bg-amber-500/5'}`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover border-2 border-border/50 shadow-sm" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary flex items-center justify-center font-bold text-lg shadow-sm">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{msg.name}</h4>
                      <span className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm ${
                    msg.approved ?? true ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                  }`}>
                    {msg.approved ?? true ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {msg.approved ?? true ? "Approved" : "Pending"}
                  </span>
                </div>

                <div className="relative">
                  <MessageSquareQuote className="w-8 h-8 absolute -top-2 -left-2 text-primary/10 -z-10" />
                  <p className="text-sm text-muted-foreground bg-muted/20 p-4 rounded-xl border border-border/40 italic leading-relaxed min-h-[80px]">
                    "{msg.message}"
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-border/50">
                {msg.email ? (
                  <button 
                    onClick={() => copyEmail(msg.email!, msg.id)}
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors group/email"
                  >
                    <Mail className="w-3.5 h-3.5 group-hover/email:text-primary transition-colors" />
                    {copiedId === msg.id ? <span className="text-emerald-500">Copied!</span> : <span className="truncate max-w-[120px]">{msg.email}</span>}
                  </button>
                ) : (
                  <span className="text-[11px] text-muted-foreground/50 italic">No email provided</span>
                )}
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => confirmDelete(msg.id)}
                    className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground bg-background border border-border shadow-sm"
                    title="Delete signature"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="card-premium overflow-hidden rounded-2xl border border-border/50">
          <div className="divide-y divide-border/50">
            {filteredMessages.map((msg) => (
              <motion.div
                key={msg.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 transition-colors ${msg.approved ?? true ? 'hover:bg-muted/30' : 'bg-amber-500/5'}`}
              >
                <div className="flex items-start gap-4 flex-1 w-full">
                  {msg.avatar ? (
                    <img src={msg.avatar} alt={msg.name} className="w-12 h-12 rounded-full object-cover border-2 border-border/50 shadow-sm shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-sm font-bold text-foreground hover:text-primary transition-colors">{msg.name}</h4>
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1 border ${
                        msg.approved ?? true ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}>
                        {msg.approved ?? true ? <CheckCircle2 className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                        {msg.approved ?? true ? "Approved" : "Pending"}
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(msg.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{msg.message}"
                    </p>

                    {msg.email && (
                      <div className="pt-1 flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-muted-foreground/70" />
                        <span className="text-[11px] text-muted-foreground font-medium">{msg.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => confirmDelete(msg.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                    title="Delete signature"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Guestbook Signature"
        message="Are you sure you want to remove this signature? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingId(null)}
      />
    </div>
  );
}
