"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, UploadCloud } from "lucide-react";

export function ProfileTab() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000); // Mock save
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Profile Settings</h2>
        <p className="text-muted-foreground">Manage your personal information and bio.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-8"
      >
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="flex flex-col sm:flex-row gap-8 items-center border-b border-border pb-8">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-muted border-4 border-background shadow-xl">
              <img src="/personal_img/rashedul-about.jpeg" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <UploadCloud className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground mb-1">Profile Picture</h3>
              <p className="text-sm text-muted-foreground mb-4">Recommended size: 500x500px.</p>
              <button type="button" className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                Change Picture
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input 
                type="text" 
                defaultValue="Rashedul Islam"
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Professional Title</label>
              <input 
                type="text" 
                defaultValue="Full Stack Developer"
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Bio / About Me</label>
            <textarea 
              rows={4}
              defaultValue="I engineer high-performance web applications that solve complex business problems. With a deep focus on clean architecture and modern user experiences..."
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Resume URL (PDF)</label>
            <input 
              type="url" 
              defaultValue="https://link-to-resume.com"
              className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GitHub URL</label>
              <input 
                type="url" 
                defaultValue="https://github.com/rashedulraha"
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">LinkedIn URL</label>
              <input 
                type="url" 
                defaultValue="https://linkedin.com/in/rashedulraha"
                className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={isSaving}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              <Save className="w-5 h-5" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
