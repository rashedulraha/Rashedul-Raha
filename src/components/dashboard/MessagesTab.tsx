"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Mail, Clock, Trash2, CheckCircle2, RefreshCw } from "lucide-react";
import { getContactMessages, markContactMessageRead, deleteContactMessage } from "@/services/apiService";

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
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (activeMessageId === id) {
        setActiveMessageId(null);
      }
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const filteredMessages = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeMessage = messages.find((m) => m.id === activeMessageId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Contact Messages</h2>
          <p className="text-muted-foreground mt-1">
            Real contact submissions from website visitors.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Messages List Sidebar */}
        <div className="card-premium p-4 flex flex-col h-full overflow-hidden">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted border border-border rounded-xl pl-9 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredMessages.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-xs">
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
                    className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                      isActive
                        ? "bg-primary/10 border-primary/40 text-foreground shadow-sm"
                        : "bg-muted/30 border-border hover:bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${isActive ? "text-foreground" : "text-foreground/90"}`}>
                        {msg.name}
                      </span>
                      {!msg.isRead && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                    <span className="text-[11px] text-muted-foreground line-clamp-1">{msg.subject || "No Subject"}</span>
                    <span className="text-[10px] text-muted-foreground/70 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Selected Message Detail View */}
        <div className="lg:col-span-2 card-premium p-6 flex flex-col h-full overflow-hidden">
          {activeMessage ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex justify-between items-start border-b border-border pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{activeMessage.subject || "No Subject"}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{activeMessage.name}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3.5 h-3.5" />
                        {activeMessage.email}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDelete(activeMessage.id)}
                      className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg text-muted-foreground transition-colors"
                      title="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground mb-4">
                  Received: {new Date(activeMessage.createdAt).toLocaleString()}
                </div>

                <div className="bg-muted/40 border border-border/50 rounded-2xl p-5 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {activeMessage.message}
                </div>
              </div>

              <div className="pt-4 border-t border-border flex justify-end">
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject || "Inquiry")}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-full hover:opacity-90 transition-all shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground text-sm">
              <Mail className="w-12 h-12 mb-3 text-muted-foreground/30" />
              Select a message from the left sidebar to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
