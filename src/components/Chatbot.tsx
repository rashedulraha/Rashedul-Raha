"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  Send, 
  Settings, 
  User, 
  Bot, 
  ChevronDown,
  Volume2,
  VolumeX,
  Palette,
  Trash2,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Copy,
  CheckCircle2,
  Mail,
  Loader2
} from "lucide-react";
import { sendContactMessage, sendChatbotAIQuery } from "@/services/apiService";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
};

type ViewState = "chat" | "settings" | "send";

const TEMPLATES = [
  "What are your core skills?",
  "How can I hire you?",
  "Tell me about your experience.",
  "Can you build a full-stack Next.js app?",
];

const THEMES = [
  { name: "Default", value: "bg-primary text-primary-foreground" },
  { name: "Ocean", value: "bg-blue-600 text-white" },
  { name: "Emerald", value: "bg-emerald-600 text-white" },
  { name: "Amethyst", value: "bg-purple-600 text-white" },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<ViewState>("chat");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi there! 👋 I'm Rashedul's AI assistant. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Settings State
  const [userName, setUserName] = useState("Guest");
  const [userEmail, setUserEmail] = useState("");
  const [isSubmittingChat, setIsSubmittingChat] = useState(false);
  const [chatSentSuccess, setChatSentSuccess] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [themeColor, setThemeColor] = useState(THEMES[0].value);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen, view]);

  const playSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); 
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
      
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio not supported");
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput("");
    playSound();
    setIsTyping(true);

    try {
      // Real-time dynamic AI generation via backend LLM service
      const res = await sendChatbotAIQuery(updatedMessages);
      const botResponse = res.data?.data?.reply || "I am Rashedul's AI assistant. How can I help you today?";

      const botMsgId = (Date.now() + 1).toString();
      const newBotMsg: Message = {
        id: botMsgId,
        sender: "bot",
        text: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newBotMsg]);
      setIsTyping(false);

      // ChatGPT style Typewriter effect
      let i = 0;
      const typeWriter = setInterval(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMsgId
              ? { ...msg, text: botResponse.slice(0, i + 1) }
              : msg
          )
        );
        i++;
        if (i >= botResponse.length) {
          clearInterval(typeWriter);
          playSound();
        }
      }, 15); // Typing speed in milliseconds

      // Silently log conversation to dashboard database (NO emails dispatched)
      const finalMessages = [...updatedMessages, { ...newBotMsg, text: botResponse }];
      const formattedChat = finalMessages
        .map((m) => `${m.sender === "user" ? userName || "Visitor" : "AI Assistant"} (${formatTime(new Date(m.timestamp))}):\n${m.text}`)
        .join("\n\n");

      sendContactMessage({
        name: userName || "Chatbot Visitor",
        email: userEmail || "chatbot.visitor@portfolio.local",
        subject: "Chatbot Conversation",
        message: formattedChat,
      }).catch((err) => console.warn("Background chat logging:", err));
    } catch (err) {
      console.error("Failed to generate AI response:", err);
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: Date.now().toString(),
      sender: "bot",
      text: "Chat cleared! How can I help you next?",
      timestamp: new Date(),
    }]);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmitConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    setIsSubmittingChat(true);
    try {
      const formattedChat = messages
        .map((m) => `${m.sender === "user" ? userName || "Visitor" : "AI Assistant"} (${formatTime(new Date(m.timestamp))}):\n${m.text}`)
        .join("\n\n");

      await sendContactMessage({
        name: userName || "Chatbot Visitor",
        email: userEmail,
        subject: "Chatbot Conversation",
        message: formattedChat,
      });

      setChatSentSuccess(true);
      setTimeout(() => {
        setChatSentSuccess(false);
        setView("chat");
      }, 2000);
    } catch (err) {
      console.error("Failed to submit chatbot conversation:", err);
    } finally {
      setIsSubmittingChat(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-shadow hover:shadow-xl ${themeColor.split(' ')[0]} text-white`}
            aria-label="Open Chat"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMaximized ? "800px" : "350px",
              height: isMaximized ? "80vh" : "600px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed bottom-6 right-6 z-50 flex max-h-[85vh] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-background/80 backdrop-blur-2xl shadow-2xl`}
          >
            <div className={`flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10`}>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-foreground">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="text-foreground">
                  <h3 className="font-semibold text-sm">Rashedul's Assistant</h3>
                  <p className="text-xs opacity-80">
                    {isTyping ? "Typing..." : "Online"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-foreground">
                <button 
                  title="Send Chat to Rashedul"
                  onClick={() => setView(view === "send" ? "chat" : "send")}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/20 text-primary"
                >
                  <Mail className="h-4 w-4" />
                </button>
                <button 
                  title="Clear Chat"
                  onClick={handleClearChat}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button 
                  title={isMaximized ? "Minimize" : "Maximize"}
                  onClick={() => setIsMaximized(!isMaximized)}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/20 hidden md:block"
                >
                  {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button 
                  title={view === "chat" ? "Settings" : "Back to Chat"}
                  onClick={() => setView(view === "chat" ? "settings" : "chat")}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10"
                >
                  {view === "chat" ? <Settings className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
                </button>
                <button 
                  title="Close"
                  onClick={() => {
                    setIsOpen(false);
                    setTimeout(() => setView("chat"), 300);
                  }}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/20"
                >
                  <ChevronDown className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                {view === "send" ? (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute inset-0 flex flex-col gap-4 overflow-y-auto p-5 bg-background"
                  >
                    <div className="flex items-center justify-between border-b pb-3">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground">Send Chat to Rashedul</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Submit this conversation to Rashedul's dashboard for a personal response.</p>
                      </div>
                      <button
                        onClick={() => setView("chat")}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                    </div>

                    {chatSentSuccess ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center space-y-3">
                        <CheckCircle2 className="h-12 w-12 text-emerald-500 animate-bounce" />
                        <h5 className="font-bold text-foreground">Conversation Sent!</h5>
                        <p className="text-xs text-muted-foreground max-w-xs">
                          Your chat log has been sent to Rashedul's dashboard inbox. He will email you back shortly!
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitConversation} className="space-y-4 my-auto">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Your Name</label>
                          <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Your Name"
                            className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-foreground">Your Email Address <span className="text-red-500">*</span></label>
                          <input
                            type="email"
                            required
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            placeholder="your.email@gmail.com"
                            className="w-full bg-muted border border-border rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                          />
                        </div>

                        <div className="p-3 bg-muted/40 rounded-xl border text-[11px] text-muted-foreground space-y-1">
                          <p className="font-semibold text-foreground">📋 What will be sent:</p>
                          <p>• {messages.length} messages in this conversation</p>
                          <p>• Automatic notification to Rashedul's email & dashboard</p>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmittingChat || !userEmail.trim()}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                            userEmail.trim()
                              ? "bg-primary text-primary-foreground shadow-md hover:opacity-90"
                              : "bg-muted text-muted-foreground cursor-not-allowed"
                          }`}
                        >
                          {isSubmittingChat ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending Conversation...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Send Chat History
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </motion.div>
                ) : view === "settings" ? (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute inset-0 flex flex-col gap-4 overflow-y-auto p-4 bg-muted/30"
                  >
                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">Settings</h4>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Your Name
                        </label>
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl border bg-background/50">
                        <div className="flex items-center gap-2">
                          {soundEnabled ? (
                            <Volume2 className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <VolumeX className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm font-medium">Chat Sounds</span>
                        </div>
                        <button
                          onClick={() => setSoundEnabled(!soundEnabled)}
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                            soundEnabled ? 'bg-primary' : 'bg-muted-foreground/30'
                          }`}
                        >
                          <span
                            className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                              soundEnabled ? 'translate-x-5' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Palette className="h-4 w-4 text-muted-foreground" />
                          Theme Color
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {THEMES.map((theme) => (
                            <button
                              key={theme.name}
                              onClick={() => setThemeColor(theme.value)}
                              className={`flex items-center gap-2 rounded-lg border p-2 text-xs transition-all ${
                                themeColor === theme.value ? 'ring-2 ring-primary border-primary' : 'hover:bg-muted'
                              }`}
                            >
                              <div className={`h-4 w-4 rounded-full ${theme.value.split(' ')[0]}`} />
                              {theme.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                      {messages.map((msg) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === "user" ? "items-end" : "items-start"
                          }`}
                        >
                          <span className="text-[10px] text-muted-foreground mb-1 px-1">
                            {msg.sender === "user" ? userName : "Assistant"} • {formatTime(msg.timestamp)}
                          </span>
                          <div
                            className={`group relative max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                              msg.sender === "user"
                                ? `${themeColor.split(' ')[0]} text-white rounded-tr-sm`
                                : "bg-muted/50 text-foreground border rounded-tl-sm"
                            }`}
                          >
                            {msg.text}
                            {msg.sender === "bot" && (
                              <button
                                onClick={() => handleCopy(msg.id, msg.text)}
                                className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 rounded p-1 hover:bg-muted"
                                title="Copy"
                              >
                                {copiedId === msg.id ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                                )}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                      
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-start"
                        >
                           <span className="text-[10px] text-muted-foreground mb-1 px-1">
                            Assistant is typing...
                          </span>
                          <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border bg-muted px-4 py-3 shadow-sm">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                            />
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"
                            />
                          </div>
                        </motion.div>
                      )}
                      <div ref={messagesEndRef} className="h-1" />
                    </div>

                    <div className="border-t bg-background p-3">
                      {messages.length < 3 && (
                        <div className="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                          {TEMPLATES.map((template, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSend(template)}
                              className="snap-start whitespace-nowrap rounded-full border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {template}
                            </button>
                          ))}
                        </div>
                      )}

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSend(input);
                        }}
                        className="flex items-end gap-2"
                      >
                        <div className="flex-1 rounded-xl border border-muted-foreground/20 bg-muted/30 focus-within:border-primary/50 transition-all p-1">
                           <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/60"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={!input.trim()}
                          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all ${
                            input.trim() 
                              ? `${themeColor.split(' ')[0]} text-white shadow-md hover:opacity-90` 
                              : 'bg-muted text-muted-foreground cursor-not-allowed'
                          }`}
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
