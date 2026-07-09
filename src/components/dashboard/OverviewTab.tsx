"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Eye, Code2 } from "lucide-react";

export function OverviewTab() {
  const stats = [
    { label: "Total Views", value: "12,450", icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Projects", value: "8", icon: Briefcase, color: "text-primary", bg: "bg-primary/10" },
    { label: "Total Skills", value: "24", icon: Code2, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Unique Visitors", value: "3,200", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back, Rashedul</h2>
        <p className="text-muted-foreground">Here&apos;s a quick overview of your portfolio&apos;s performance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card-premium p-6 flex items-center gap-4"
          >
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <h3 className="text-lg font-bold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <p>Someone viewed your project <strong>&quot;E-Commerce Platform&quot;</strong></p>
              <span className="ml-auto text-xs">2h ago</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <p>You updated your skill <strong>&quot;Next.js 14&quot;</strong></p>
              <span className="ml-auto text-xs">5h ago</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <p>New message from <strong>Contact Form</strong></p>
              <span className="ml-auto text-xs">1d ago</span>
            </div>
          </div>
        </div>

        <div className="card-premium p-6 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">Ready to add more work?</h3>
          <p className="text-sm text-muted-foreground mb-4">Keep your portfolio fresh by adding your latest projects.</p>
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
            Add New Project
          </button>
        </div>
      </div>
    </div>
  );
}
