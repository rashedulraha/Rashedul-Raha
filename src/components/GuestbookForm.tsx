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
        className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all glass"
      />
      <textarea 
        placeholder="Your Message..." 
        required
        rows={3}
        className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none glass"
      />
      <div className="flex justify-end mt-2">
        <button 
          type="submit"
          className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.03] hover:opacity-90 active:scale-95 shadow-[0_4px_14px_rgba(0,0,0,0.25)]"
        >
          <span>Sign</span>
          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>
    </form>
  );
}
