"use client";

import React from "react";
import { Send } from "lucide-react";

export default function GuestbookForm() {
  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        alert("This is a static mockup of the guestbook! Database integration is required to post actual messages.");
      }} 
      className="flex flex-col gap-4"
    >
      <input 
        type="text" 
        placeholder="Your Name" 
        required
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
      />
      <textarea 
        placeholder="Your Message..." 
        required
        rows={3}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
      />
      <div className="flex justify-end mt-2">
        <button 
          type="submit"
          className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold overflow-hidden transition-transform hover:scale-105 active:scale-95"
        >
          <span>Sign</span>
          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </form>
  );
}
