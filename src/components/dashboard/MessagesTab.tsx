"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, MessageSquare, Clock, User, Bot, CheckCircle2 } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot" | "admin";
  text: string;
  time: string;
};

type Session = {
  id: string;
  visitorName: string;
  location: string;
  status: "active" | "closed";
  lastActive: string;
  messages: Message[];
};

const mockSessions: Session[] = [
  {
    id: "sess_1",
    visitorName: "Visitor 402",
    location: "New York, USA",
    status: "active",
    lastActive: "2 min ago",
    messages: [
      { id: "m1", sender: "bot", text: "Hi there! I'm Rashedul's AI assistant. How can I help you today?", time: "10:00 AM" },
      { id: "m2", sender: "user", text: "I'm looking for a freelance web developer for an e-commerce project.", time: "10:01 AM" },
      { id: "m3", sender: "bot", text: "You've come to the right place! Rashedul specializes in building fast, scalable e-commerce platforms using Next.js. What specific features are you looking for?", time: "10:01 AM" },
      { id: "m4", sender: "user", text: "We need something with a custom admin panel and Stripe integration.", time: "10:05 AM" },
    ]
  },
  {
    id: "sess_2",
    visitorName: "John Smith",
    location: "London, UK",
    status: "closed",
    lastActive: "1 day ago",
    messages: [
      { id: "m1", sender: "bot", text: "Hi there! I'm Rashedul's AI assistant. How can I help you today?", time: "09:00 AM" },
      { id: "m2", sender: "user", text: "Do you have experience with Sanity CMS?", time: "09:05 AM" },
      { id: "m3", sender: "bot", text: "Yes! Rashedul has built multiple projects using Sanity CMS as a headless backend.", time: "09:06 AM" },
    ]
  }
];

export function MessagesTab() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [activeSessionId, setActiveSessionId] = useState<string>(mockSessions[0].id);
  const [replyText, setReplyText] = useState("");

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeSession) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "admin",
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setSessions(prev => prev.map(session => 
      session.id === activeSessionId 
        ? { ...session, messages: [...session.messages, newMessage], lastActive: "Just now" }
        : session
    ));
    setReplyText("");
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-foreground mb-2">Chatbot Inbox</h2>
        <p className="text-muted-foreground">Monitor and take over live conversations on your portfolio.</p>
      </div>

      <div className="flex-1 card-premium overflow-hidden flex flex-col md:flex-row h-full">
        
        {/* Left Sidebar - Conversation List */}
        <div className="w-full md:w-80 border-r border-border flex flex-col bg-muted/20">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search visitors..." 
                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {sessions.map(session => (
              <button
                key={session.id}
                onClick={() => setActiveSessionId(session.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeSessionId === session.id 
                    ? "bg-primary/10 border-primary/20" 
                    : "hover:bg-muted border-transparent"
                } border`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-foreground flex items-center gap-2">
                    {session.visitorName}
                    {session.status === "active" && (
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    )}
                  </span>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{session.lastActive}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {session.messages[session.messages.length - 1]?.text || "No messages yet"}
                </p>
                <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground">
                  <User className="w-3 h-3" /> {session.location}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel - Chat Area */}
        <div className="flex-1 flex flex-col bg-background/30 h-full relative">
          {activeSession ? (
            <>
              {/* Chat Header */}
              <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-muted/20 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{activeSession.visitorName}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${activeSession.status === 'active' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
                        {activeSession.status === 'active' ? 'Online' : 'Offline'}
                      </span>
                      <span>•</span>
                      <span>{activeSession.location}</span>
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  View Profile Info
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <AnimatePresence initial={false}>
                  {activeSession.messages.map((msg, idx) => {
                    const isVisitor = msg.sender === "user";
                    const isAdmin = msg.sender === "admin";
                    const isBot = msg.sender === "bot";
                    
                    return (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-3 max-w-[80%] ${isVisitor ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                      >
                        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-white ${
                          isVisitor ? "bg-blue-500" : isAdmin ? "bg-green-500" : "bg-primary"
                        }`}>
                          {isVisitor ? <User className="w-4 h-4" /> : isAdmin ? <CheckCircle2 className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        
                        <div className={`flex flex-col ${isVisitor ? "items-start" : "items-end"}`}>
                          <div className={`flex items-baseline gap-2 mb-1 px-1 ${isVisitor ? "flex-row" : "flex-row-reverse"}`}>
                            <span className="text-xs font-medium text-foreground">
                              {isVisitor ? "Visitor" : isAdmin ? "You (Admin)" : "AI Assistant"}
                            </span>
                            <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                          </div>
                          <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                            isVisitor 
                              ? "bg-muted text-foreground rounded-tl-none border border-border" 
                              : isAdmin 
                                ? "bg-green-500 text-white rounded-tr-none shadow-md"
                                : "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border bg-muted/20 shrink-0">
                <form 
                  onSubmit={handleSendReply}
                  className="flex items-center gap-3 bg-background border border-border rounded-xl p-1 pr-2 focus-within:ring-1 focus-within:ring-primary/50 transition-all"
                >
                  <input 
                    type="text" 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Take over chat and reply manually..." 
                    className="flex-1 px-4 py-2 bg-transparent text-sm focus:outline-none"
                  />
                  <button 
                    type="submit"
                    disabled={!replyText.trim()}
                    className="p-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <p className="text-center text-[10px] text-muted-foreground mt-2">
                  Sending a message will pause the AI assistant for this session.
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground h-full">
              <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a conversation to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
