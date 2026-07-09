"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Server, Layers, Code, Database, Cloud } from "lucide-react";

const mockSkills = [
  { id: 1, name: "Next.js 14/15", icon: Server, category: "Frontend" },
  { id: 2, name: "React 19", icon: Layers, category: "Frontend" },
  { id: 3, name: "TypeScript", icon: Code, category: "Languages" },
  { id: 4, name: "Prisma & SQL", icon: Database, category: "Backend" },
  { id: 5, name: "Docker", icon: Cloud, category: "DevOps" },
];

export function SkillsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Skills & Technologies</h2>
          <p className="text-muted-foreground">Add or remove skills from your toolkit.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mockSkills.map((skill, i) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="group relative card-premium p-4 flex flex-col items-center justify-center text-center gap-3 aspect-square"
          >
            <button className="absolute top-2 right-2 p-1.5 bg-destructive/10 text-destructive rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-white">
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <skill.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{skill.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{skill.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Skill Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">Add New Skill</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Skill Name</label>
                  <input type="text" placeholder="e.g. Tailwind CSS" className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Category</label>
                  <select className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer">
                    <option value="">Select a category</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Languages">Languages</option>
                    <option value="Tools">Tools</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center justify-between">
                    <span>Icon (Lucide React)</span>
                    <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">Browse Icons</a>
                  </label>
                  <input type="text" placeholder="e.g. MonitorSmartphone" className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  <p className="text-xs text-muted-foreground">Type the exact component name from Lucide React.</p>
                </div>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/20">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  Add Skill
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
