"use client";

import React from "react";
import { Users, Eye, MessageSquare, Briefcase, ArrowUpRight, ArrowDownRight, Activity, Server, Database, GitCommit } from "lucide-react";
import { motion } from "framer-motion";

export function OverviewTab() {
  const stats = [
    { title: "Total Views", value: "12,402", change: "+14.2%", isPositive: true, icon: Eye },
    { title: "Unique Visitors", value: "3,842", change: "+5.4%", isPositive: true, icon: Users },
    { title: "Chatbot Interactions", value: "842", change: "+24.3%", isPositive: true, icon: MessageSquare },
    { title: "Form Submissions", value: "12", change: "-2.1%", isPositive: false, icon: Briefcase },
  ];

  // Weeks and days for GitHub style heat map
  const weeksCount = 28;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  
  const getLevel = (dayIndex: number, weekIndex: number) => {
    // Generate a pseudo-random pattern for the heatmap
    const val = (dayIndex * 3 + weekIndex * 7 + 2) % 5;
    return val; // 0 to 4
  };

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-500/20 dark:bg-emerald-950/40 border border-emerald-500/10";
      case 2:
        return "bg-emerald-500/40 dark:bg-emerald-800/60 border border-emerald-500/20";
      case 3:
        return "bg-emerald-500/70 dark:bg-emerald-600/80 border border-emerald-500/30";
      case 4:
        return "bg-emerald-500 dark:bg-emerald-500 border border-emerald-400/30";
      default:
        return "bg-muted/40 dark:bg-zinc-800/30 border border-border/10";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground mt-1">Welcome back, Rashedul. Here's what's happening today.</p>
        </div>
      </div>

      {/* Stats Card - Combined into a single beautiful panel */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card-premium p-6"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x lg:divide-border/40">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.title} 
                className={`flex flex-col justify-between pt-4 lg:pt-0 lg:px-6 first:pt-0 first:pl-0`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{stat.title}</span>
                  <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stat.change} {stat.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-xl">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Graph Area - GitHub style graph */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 card-premium p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-emerald-500" />
                  Traffic Contribution Graph
                </h3>
                <p className="text-xs text-muted-foreground">Visitors activity heatmap over the last 28 weeks</p>
              </div>
              <select className="bg-muted text-xs border border-border/50 rounded-lg px-2 py-1 outline-none">
                <option>Last 28 weeks</option>
                <option>This Year</option>
              </select>
            </div>
            
            {/* GitHub Style Contribution Graph */}
            <div className="flex gap-3 overflow-x-auto pb-4 pt-2 scrollbar-thin">
              {/* Row labels */}
              <div className="flex flex-col justify-between text-[9px] text-muted-foreground pb-1 pt-5 select-none font-mono pr-1">
                <span>Sun</span>
                <span>Tue</span>
                <span>Thu</span>
                <span>Sat</span>
              </div>

              {/* Grid Column wrapper */}
              <div className="flex-1 min-w-[340px]">
                {/* Months labels */}
                <div className="flex justify-between text-[9px] text-muted-foreground mb-1 select-none pr-4 font-semibold">
                  {months.map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>

                {/* Contribution Cells */}
                <div className="flex gap-[3px]">
                  {Array.from({ length: weeksCount }).map((_, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[3px]">
                      {Array.from({ length: 7 }).map((_, dayIdx) => {
                        const level = getLevel(dayIdx, weekIdx);
                        const baseVisitors = level * 14 + (weekIdx * 3 + dayIdx * 2);
                        return (
                          <motion.div
                            key={dayIdx}
                            whileHover={{ scale: 1.2, zIndex: 20 }}
                            className={`w-[11px] h-[11px] rounded-[2px] cursor-pointer transition-colors ${getLevelClass(level)}`}
                            title={`${baseVisitors} unique visitors`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Graph Legend */}
          <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-4 pt-3 border-t border-border/40 select-none">
            <span>Learn how we measure traffic data</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span>Less</span>
              <div className="w-[10px] h-[10px] rounded-[2px] bg-muted/40 dark:bg-zinc-800/30" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/20" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/40" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/70" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500" />
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          
          {/* System Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-premium p-6"
          >
            <h3 className="text-sm font-bold text-foreground mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Server className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-foreground">Main Server</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Database className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-foreground">Database</span>
                </div>
                <span className="text-xs font-bold text-emerald-500">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Activity className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-foreground">API Latency</span>
                </div>
                <span className="text-xs font-bold text-foreground">24ms</span>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-premium p-6"
          >
            <h3 className="text-sm font-bold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              
              {[
                { time: "10 mins ago", text: "New message from Visitor 402", type: "msg" },
                { time: "2 hours ago", text: "Updated 'E-commerce' project", type: "update" },
                { time: "5 hours ago", text: "New unique visitor from London, UK", type: "visitor" },
                { time: "1 day ago", text: "System backup completed", type: "system" },
              ].map((item, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-background text-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  </div>
                  {/* Content */}
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-lg border border-border bg-muted/20">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-foreground">{item.text}</span>
                      <time className="text-[10px] text-muted-foreground">{item.time}</time>
                    </div>
                  </div>
                </div>
              ))}
              
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
