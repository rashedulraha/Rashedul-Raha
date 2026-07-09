"use client";

import React from "react";
import { Users, Eye, MessageSquare, Briefcase, ArrowUpRight, ArrowDownRight, Activity, Server, Database } from "lucide-react";
import { motion } from "framer-motion";

export function OverviewTab() {
  const stats = [
    { title: "Total Views", value: "12,402", change: "+14.2%", isPositive: true, icon: Eye },
    { title: "Unique Visitors", value: "3,842", change: "+5.4%", isPositive: true, icon: Users },
    { title: "Chatbot Interactions", value: "842", change: "+24.3%", isPositive: true, icon: MessageSquare },
    { title: "Form Submissions", value: "12", change: "-2.1%", isPositive: false, icon: Briefcase },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Welcome back, Rashedul. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              key={stat.title}
              className="card-premium p-5 flex flex-col justify-between group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold flex items-center gap-1 ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.change} {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Graph Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 card-premium p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">Traffic Overview</h3>
              <p className="text-xs text-muted-foreground">Visitors over the last 7 days</p>
            </div>
            <select className="bg-muted text-xs border border-border rounded-lg px-2 py-1 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          
          {/* Custom Animated CSS Graph */}
          <div className="h-64 mt-4 flex items-end gap-2 sm:gap-4 relative group">
            {/* Background Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
              <div className="w-full border-t border-border border-dashed h-0" />
              <div className="w-full border-t border-border border-dashed h-0" />
              <div className="w-full border-t border-border border-dashed h-0" />
              <div className="w-full border-t border-border border-dashed h-0" />
            </div>

            {/* Bars */}
            {[40, 70, 45, 90, 65, 80, 100].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group/bar relative z-10">
                {/* Tooltip */}
                <div className="absolute -top-8 bg-foreground text-background text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity translate-y-2 group-hover/bar:translate-y-0">
                  {height * 12} views
                </div>
                {/* Bar */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 1, delay: 0.5 + (i * 0.1), type: "spring", bounce: 0.2 }}
                  className="w-full max-w-[40px] bg-gradient-to-t from-primary/40 to-primary rounded-t-sm hover:from-primary/60 hover:to-primary cursor-pointer transition-colors"
                />
                <span className="text-[10px] text-muted-foreground mt-2 font-medium">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          
          {/* System Status */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-premium p-6"
          >
            <h3 className="text-sm font-bold text-foreground mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 text-green-500 rounded-lg"><Server className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-foreground">Main Server</span>
                </div>
                <span className="text-xs font-bold text-green-500">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 text-green-500 rounded-lg"><Database className="w-4 h-4" /></div>
                  <span className="text-sm font-medium text-foreground">Database</span>
                </div>
                <span className="text-xs font-bold text-green-500">Connected</span>
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
            transition={{ delay: 0.5 }}
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
