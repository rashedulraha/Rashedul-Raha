"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, X, Briefcase, Calendar } from "lucide-react";

const mockExperience = [
  { 
    id: 1, 
    role: "Senior Full Stack Developer", 
    company: "Tech Solutions Inc.", 
    period: "2022 - Present",
    description: "Leading the development of scalable web applications using Next.js and Node.js. Managing a team of 4 developers."
  },
  { 
    id: 2, 
    role: "Frontend Developer", 
    company: "Creative Agency", 
    period: "2020 - 2022",
    description: "Built pixel-perfect, responsive user interfaces for high-profile clients using React and Tailwind CSS."
  },
];

export function ExperienceTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Experience & Education</h2>
          <p className="text-muted-foreground">Manage your career timeline and educational background.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Entry
        </button>
      </div>

      <div className="space-y-6">
        {mockExperience.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium p-6 flex flex-col md:flex-row gap-6 relative group"
          >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="shrink-0 w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center hidden md:flex">
              <Briefcase className="w-8 h-8" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-xl font-bold text-foreground pr-16">{exp.role}</h3>
                <p className="text-primary font-medium">{exp.company}</p>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 w-fit px-3 py-1 rounded-full">
                <Calendar className="w-4 h-4" />
                {exp.period}
              </div>
              
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Experience Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-xl font-bold text-foreground">Add Experience/Education</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Type</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="type" defaultChecked className="text-primary focus:ring-primary" />
                      <span className="text-sm text-foreground">Experience</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="type" className="text-primary focus:ring-primary" />
                      <span className="text-sm text-foreground">Education</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Role / Degree</label>
                    <input type="text" placeholder="e.g. Senior Developer" className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company / Institution</label>
                    <input type="text" placeholder="e.g. Google" className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Start Date</label>
                    <input type="month" className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">End Date</label>
                    <input type="month" className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                    <label className="flex items-center gap-2 mt-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                      <span className="text-xs text-muted-foreground">I currently work here</span>
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Description</label>
                  <textarea rows={4} placeholder="Describe your responsibilities and achievements..." className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" />
                </div>
              </div>

              <div className="p-6 border-t border-border flex justify-end gap-3 bg-muted/20 mt-auto">
                <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Cancel
                </button>
                <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                  Save Entry
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
