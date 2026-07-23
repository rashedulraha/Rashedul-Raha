"use client";

import React, { useState, useEffect } from "react";
import { Trash2, RefreshCw, MessageSquareQuote } from "lucide-react";
import { getGuestbookMessages, deleteGuestbookMessage } from "@/services/apiService";

export interface IGuestbookMessage {
  id: string;
  name: string;
  avatar?: string;
  message: string;
  approved: boolean;
  createdAt: string;
}

export function GuestbookTab() {
  const [messages, setMessages] = useState<IGuestbookMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this guestbook message?")) return;
    try {
      const res = await deleteGuestbookMessage(id);
      if (res.data.success) {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
      }
    } catch (err) {
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Guestbook Messages</h2>
          <p className="text-muted-foreground mt-1">
            Review and manage public guestbook messages left by visitors.
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

      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground flex flex-col items-center justify-center gap-3">
          <RefreshCw className="w-6 h-6 animate-spin text-primary" />
          <span>Loading guestbook messages...</span>
        </div>
      ) : messages.length === 0 ? (
        <div className="card-premium p-12 text-center text-muted-foreground">
          No guestbook messages yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((msg) => (
            <div key={msg.id} className="card-premium p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{msg.name}</h4>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-xl border border-border/50 italic">
                  "{msg.message}"
                </p>
              </div>

              <div className="flex items-center justify-end pt-3 mt-3 border-t border-border/50">
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors text-muted-foreground"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
