"use client";

import React, { useState, useTransition } from "react";
import { PenLine, Share2, Send, Loader2 } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { addGuestbookMessage } from "@/actions/guestbook";

const WavyDivider = () => (
  <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-10">
    <svg className="relative block w-[200%] md:w-[150%] h-[25px] -ml-[10%]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,137.9,114,207,100.33,265.5,88.75,313.12,65.6,321.39,56.44Z" className="fill-[#141414]"></path>
    </svg>
  </div>
);

export default function GuestbookGrid({ initialMessages }: { initialMessages: Record<string, string | number>[] }) {
  const [isWriting, setIsWriting] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isPending) return;

    startTransition(async () => {
      const res = await addGuestbookMessage("Guest", newMessage);
      if (res.success) {
        setNewMessage("");
        setIsWriting(false);
      } else {
        alert("Failed to save message. Please try again.");
      }
    });
  };

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
      
      {/* Join The Wall Card (Always First) */}
      <div className="break-inside-avoid relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-[#141414] group">
        <div className="relative min-h-[256px] bg-[#1f113a] flex flex-col items-center justify-center px-6 py-10 text-center">
          {/* Decorative Elements */}
          <div className="absolute right-8 top-8 text-white/10 text-2xl rotate-45">✦</div>
          <div className="absolute left-8 bottom-16 text-white/10 text-2xl -rotate-12">✏️</div>
          
          {!isWriting ? (
            <>
              <h3 className="text-2xl font-instrument-serif italic text-white mb-2 relative z-20">&quot;Join the wall...&quot;</h3>
              <p className="text-sm text-neutral-400 mb-6 relative z-20">Sign in to leave your mark</p>
              
              <button 
                onClick={() => setIsWriting(true)}
                className="relative z-20 flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors backdrop-blur-md"
              >
                <PenLine className="w-4 h-4" />
                Write a message...
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="w-full relative z-20 animate-in fade-in zoom-in duration-300 flex flex-col gap-3">
              <textarea 
                autoFocus
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 bg-[#141414]/50 border border-white/10 rounded-xl text-white placeholder-neutral-400 focus:outline-none focus:border-white/30 resize-none h-24 text-sm"
              />
              <div className="flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setIsWriting(false)}
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!newMessage.trim() || isPending}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                  {isPending ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          )}

          <WavyDivider />
        </div>
        
        <div className="h-20 bg-[#141414] relative z-20 flex items-center justify-center gap-4 text-neutral-500">
          <button className="hover:text-white transition-colors p-2" title="Sign in with GitHub">
            <FaGithub className="w-5 h-5" />
          </button>
          <span className="text-xs">•</span>
          <button className="hover:text-white transition-colors p-2" title="Sign in with Google">
            <FaGoogle className="w-5 h-5 text-red-500 hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* Message Cards */}
      {initialMessages.map((msg) => (
        <div key={msg.id} className="break-inside-avoid relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-[#141414] group hover:-translate-y-1 transition-transform duration-300">
          <div className={`relative min-h-[220px] ${msg.bgColor} flex flex-col items-center justify-center p-8 text-center`}>
            {/* Abstract Doodles */}
            <div className={msg.doodles as string}></div>
            <div className={msg.doodle2 as string}></div>
            
            <p className="text-white text-lg font-bold leading-relaxed relative z-10 drop-shadow-md">
              {msg.message}
            </p>
            <WavyDivider />
          </div>
          
          <div className="h-20 bg-[#141414] relative z-20 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full ${msg.avatarBg} text-white font-bold text-xs uppercase shadow-lg`}>
                {String(msg.name).charAt(0)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white uppercase tracking-wider">{msg.name}</span>
                <span className="text-[10px] text-neutral-500">{msg.date}</span>
              </div>
            </div>
            <button className="p-2 text-neutral-500 hover:text-white transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}
