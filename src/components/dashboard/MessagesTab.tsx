"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Mail, 
  Clock, 
  Trash2, 
  RefreshCw, 
  Inbox, 
  MailOpen, 
  MessageSquare,
  Copy,
  CheckCircle2,
  Sparkles,
  Send,
  Bot,
  Loader2
} from "lucide-react";
import { 
  getContactMessages, 
  markContactMessageRead, 
  deleteContactMessage,
  replyToContactMessage,
  summarizeContactMessage 
} from "@/services/apiService";
import { ConfirmModal } from "./ConfirmModal";

export interface IContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export function MessagesTab() {
  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState<"All" | "Unread" | "Read">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Summary & Reply States
  const [summaryMap, setSummaryMap] = useState<Record<string, string>>({});
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const [replySuccessMsg, setReplySuccessMsg] = useState("");

  // Confirm delete states
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await getContactMessages();
      if (res.data.success && Array.isArray(res.data.data)) {
        setMessages(res.data.data);
        if (res.data.data.length > 0 && !activeMessageId) {
          setActiveMessageId(res.data.data[0].id);
        }
      }
    } catch (err) {
      console.error("Error fetching contact messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleGenerateSummary = async (id: string) => {
    setIsSummarizing(true);
    try {
      const res = await summarizeContactMessage(id);
      if (res.data?.success && res.data?.data?.summary) {
        setSummaryMap((prev) => ({ ...prev, [id]: res.data.data.summary }));
      }
    } catch (err) {
      console.error("Failed to summarize message:", err);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSendReply = async (id: string) => {
    if (!replyText.trim()) return;
    setIsReplying(true);
    try {
      const res = await replyToContactMessage(id, replyText);
      if (res.data?.success) {
        setReplySuccessMsg("Email reply sent successfully!");
        setReplyText("");
        setTimeout(() => setReplySuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error("Failed to send reply:", err);
    } finally {
      setIsReplying(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await markContactMessageRead(id);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg))
      );
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
  };

  const handleConfirmDelete = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await deleteContactMessage(deletingId);
      setMessages((prev) => prev.filter((msg) => msg.id !== deletingId));
      if (activeMessageId === deletingId) {
        setActiveMessageId(null);
      }
      setDeletingId(null);
    } catch (err) {
      console.error("Failed to delete message:", err);
    } finally {
      setIsDeleting(false);
    }
  };
  
  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Metrics
  const totalCount = messages.length;
  const unreadCount = messages.filter((m) => !m.isRead).length;
  const readCount = totalCount - unreadCount;

  const filteredMessages = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch =
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.message.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesFilter = true;
      if (filterMode === "Unread") matchesFilter = !m.isRead;
      if (filterMode === "Read") matchesFilter = m.isRead;

      return matchesSearch && matchesFilter;
    });
  }, [messages, searchQuery, filterMode]);

  const activeMessage = messages.find((m) => m.id === activeMessageId);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Contact Inbox</h2>
          <p className="text-muted-foreground mt-1">
            Manage inquiries, project requests, and messages from your website visitors.
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent rounded-xl text-xs font-bold text-foreground transition-all shadow-sm"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-primary" : ""}`} />
          Sync Inbox
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-premium p-5 flex items-center gap-4 border border-border/50">
          <div className="p-3 bg-primary/10 border border-primary/20 text-primary rounded-2xl shadow-inner relative">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Total Messages</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{totalCount}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4 border border-border/50">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl shadow-inner">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Unread Messages</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{unreadCount}</h4>
          </div>
        </div>

        <div className="card-premium p-5 flex items-center gap-4 border border-border/50">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl shadow-inner">
            <MailOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Read Messages</span>
            <h4 className="text-2xl font-extrabold text-foreground mt-0.5">{readCount}</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[700px]">
        {/* Messages List Sidebar */}
        <div className="lg:col-span-4 card-premium p-4 flex flex-col h-full overflow-hidden border border-border/50 shadow-md">
          {/* Filters & Search */}
          <div className="space-y-4 mb-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search inbox..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background border border-border rounded-xl pl-9 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 shadow-inner"
              />
            </div>
            
            <div className="flex bg-muted/40 p-1 rounded-xl border border-border/50">
              {(["All", "Unread", "Read"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                    filterMode === mode 
                      ? "bg-background text-foreground shadow-sm" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {isLoading ? (
               <div className="p-8 flex justify-center"><RefreshCw className="w-5 h-5 animate-spin text-primary" /></div>
            ) : filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-xs flex flex-col items-center gap-2">
                <Inbox className="w-8 h-8 opacity-20" />
                No messages found.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isActive = msg.id === activeMessageId;
                return (
                  <button
                    key={msg.id}
                    onClick={() => {
                      setActiveMessageId(msg.id);
                      if (!msg.isRead) handleMarkAsRead(msg.id);
                    }}
                    className={`w-full text-left p-4 rounded-xl transition-all flex flex-col gap-2 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : msg.isRead 
                          ? "bg-muted/20 border border-transparent hover:bg-muted/60 text-muted-foreground" 
                          : "bg-background border border-border hover:border-primary/50 text-foreground shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className={`text-sm font-bold truncate flex-1 pr-2 ${isActive ? "text-primary-foreground" : "text-foreground"}`}>
                        {msg.name}
                      </span>
                      <span className={`text-[9px] shrink-0 font-medium ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                         {new Date(msg.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center w-full">
                      <span className={`text-xs font-semibold truncate flex-1 pr-2 ${isActive ? "text-primary-foreground/90" : "text-foreground/80"}`}>
                        {msg.subject || "No Subject"}
                      </span>
                      {msg.subject === "Chatbot Conversation" ? (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-500/20 text-purple-400 flex items-center gap-1">
                          <Bot className="w-3 h-3" /> AI Chatbot
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" /> Contact Form
                        </span>
                      )}
                      {!msg.isRead && !isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0 animate-pulse shadow-[0_0_8px_rgba(var(--primary),0.5)] ml-2" />
                      )}
                    </div>
                    
                    <span className={`text-[11px] line-clamp-1 ${isActive ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {msg.message}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Message Detail View */}
        <div className="lg:col-span-8 card-premium flex flex-col h-full overflow-hidden border border-border/50 shadow-md relative">
          {activeMessage ? (
            <motion.div 
              key={activeMessage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col h-full"
            >
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-foreground">{activeMessage.subject || "No Subject"}</h3>
                      {activeMessage.subject === "Chatbot Conversation" ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center gap-1">
                          <Bot className="w-3.5 h-3.5" /> AI Chatbot
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> Contact Form
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 text-primary flex items-center justify-center font-bold text-xl shadow-sm">
                        {activeMessage.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-foreground">{activeMessage.name}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                           <span className="text-xs text-muted-foreground">{activeMessage.email}</span>
                           <button 
                             onClick={() => copyEmail(activeMessage.email)}
                             className="text-muted-foreground hover:text-primary transition-colors"
                             title="Copy email"
                           >
                             {copiedEmail ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(activeMessage.createdAt).toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleGenerateSummary(activeMessage.id)}
                        disabled={isSummarizing}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded-lg text-xs font-bold transition-all shadow-sm"
                        title="Generate 1-click AI Summary"
                      >
                        {isSummarizing ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                        )}
                        1-Click AI Summary
                      </button>

                      <button
                        onClick={() => confirmDelete(activeMessage.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-xs font-bold transition-colors"
                        title="Delete message"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Summary Box */}
                {summaryMap[activeMessage.id] && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-2xl border border-purple-500/30 bg-purple-500/10 text-xs text-foreground space-y-1 mb-6 shadow-sm"
                  >
                    <div className="flex items-center gap-2 font-bold text-purple-400">
                      <Sparkles className="w-4 h-4" />
                      AI Conversation Summary
                    </div>
                    <p className="leading-relaxed text-muted-foreground">{summaryMap[activeMessage.id]}</p>
                  </motion.div>
                )}

                {/* Message Body */}
                <div className="bg-background border border-border/60 rounded-2xl p-6 md:p-8 text-sm text-foreground leading-loose whitespace-pre-wrap shadow-inner relative">
                  <MessageSquare className="w-12 h-12 absolute -top-4 -left-4 text-primary/5 -z-10" />
                  {activeMessage.message}
                </div>

                {/* Direct Inline Email Reply Form */}
                <div className="mt-6 p-5 rounded-2xl border border-border bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-foreground flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Reply Directly to {activeMessage.name} ({activeMessage.email})
                    </span>
                    {replySuccessMsg && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 animate-pulse">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {replySuccessMsg}
                      </span>
                    )}
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Type your reply to ${activeMessage.name}...`}
                    className="w-full bg-background border border-border rounded-xl p-3 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all resize-none shadow-inner"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSendReply(activeMessage.id)}
                      disabled={isReplying || !replyText.trim()}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md ${
                        replyText.trim()
                          ? "bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {isReplying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Email Reply...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Email Reply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm gap-4">
              <div className="p-6 bg-muted/30 rounded-full">
                 <MailOpen className="w-16 h-16 text-muted-foreground/30" />
              </div>
              <p>Select a message from the list to view details.</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingId)}
        title="Delete Contact Message"
        message="Are you sure you want to permanently delete this message?"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingId(null)}
      />
    </div>
  );
}
