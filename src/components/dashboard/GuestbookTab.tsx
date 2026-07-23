"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Trash2, 
  RefreshCw, 
  MessageSquareQuote, 
  Search, 
  CheckCircle, 
  Clock, 
  MessageSquare,
  ShieldCheck,
  UserCheck
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
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (filterStatus === "Approved") matchesFilter = (msg.approved ?? true) === true;
      else if (filterStatus === "Pending") matchesFilter = msg.approved === false;

      return matchesSearch && matchesFilter;
    });
  }, [messages, searchQuery, filterStatus]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Guestbook Messages</h2>
          <p className="text-muted-foreground mt-1">
            Review and moderate public guestbook comments left by website visitors.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-xl text-xs font-semibold text-foreground transition-all"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-2xl">
            <MessageSquareQuote className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Total Signatures</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{messages.length}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Approved Posts</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{approvedCount}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">Pending Review</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{pendingCount}</h4>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card/40 border border-border/50 rounded-2xl p-3 backdrop-blur-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by visitor or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/60 border border-border rounded-xl pl-10 pr-4 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {(["All", "Approved", "Pending"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filterStatus === status
                  ? "bg-primary text-primary-foreground font-bold shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading guestbook messages...</span>
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No guestbook messages found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMessages.map((msg) => (
            <motion.div 
              key={msg.id} 
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-premium p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {msg.avatar ? (
                      <img src={msg.avatar} alt={msg.name} className="w-9 h-9 rounded-full object-cover border border-border" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                        {msg.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{msg.name}</h4>
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                    msg.approved ?? true ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
                  }`}>
                    {msg.approved ?? true ? "Approved" : "Pending"}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/50 italic leading-relaxed">
                  "{msg.message}"
                </p>
              </div>

              <div className="flex items-center justify-end pt-3 mt-3 border-t border-border/50">
                <button
                  onClick={() => confirmDelete(msg.id)}
                  className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Guestbook Signature"
        message="Are you sure you want to delete this guestbook message? It will be removed permanently."
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingId(null)}
      />
    </div>
  );
}
