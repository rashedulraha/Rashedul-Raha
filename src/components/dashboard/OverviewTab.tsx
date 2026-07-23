"use client";

import React, { useState, useEffect } from "react";
import { Users, Eye, MessageSquare, Briefcase, ArrowUpRight, ArrowDownRight, Activity, Server, Database } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { getTrafficStats } from "@/services/apiService";

export function OverviewTab() {
  const [mounted, setMounted] = useState(false);
  const [statsData, setStatsData] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    chatbotInteractions: 0,
    formSubmissions: 0,
  });
  const [graphData, setGraphData] = useState<{ day: string; value: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function loadStats() {
      try {
        const res = await getTrafficStats();
        if (res.data.success && res.data.data) {
          const {
            totalViews,
            uniqueVisitors,
            chatbotInteractions,
            formSubmissions,
            dailyTraffic,
          } = res.data.data;
          
          setStatsData({
            totalViews,
            uniqueVisitors,
            chatbotInteractions,
            formSubmissions,
          });
          setGraphData(dailyTraffic || []);
        }
      } catch (err) {
        console.error("Failed to load traffic stats:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStats();
  }, []);

  const stats = [
    { title: "Total Views", value: statsData.totalViews.toLocaleString(), icon: Eye },
    { title: "Unique Visitors", value: statsData.uniqueVisitors.toLocaleString(), icon: Users },
    { title: "Chatbot Interactions", value: statsData.chatbotInteractions.toLocaleString(), icon: MessageSquare },
    { title: "Form Submissions", value: statsData.formSubmissions.toLocaleString(), icon: Briefcase },
  ];

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
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-xl">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-3xl font-bold text-foreground tracking-tight">
                    {isLoading ? "..." : stat.value}
                  </h4>
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
          <div className="w-full">
            {/* Title exact match */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-[#58a6ff] tracking-wide">
                Rashedul Islam's Contribution Graph
              </h3>
            </div>

            {/* Recharts Area Chart */}
            <div className="h-72 w-full pr-4 text-[10px]">
              {mounted && !isLoading ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={graphData}
                    margin={{ top: 10, right: 5, left: -20, bottom: 20 }}
                  >
                    <defs>
                      <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#58a6ff" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#58a6ff" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="2 2" 
                      vertical={true} 
                      horizontal={true}
                      stroke="rgba(255,255,255,0.06)" 
                    />
                    <XAxis 
                      dataKey="day" 
                      tickLine={false} 
                      axisLine={false}
                      stroke="#8b949e"
                      dy={10}
                      label={{ 
                        value: "Days", 
                        position: "insideBottom", 
                        offset: -10, 
                        fill: "#58a6ff",
                        fontSize: 12,
                        fontWeight: 600
                      }}
                    />
                    <YAxis 
                      domain={[0, "dataMax + 10"]} 
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                      stroke="#8b949e"
                      dx={-5}
                      label={{ 
                        value: "Contributions", 
                        angle: -90, 
                        position: "insideLeft", 
                        offset: -5,
                        fill: "#8b949e",
                        fontSize: 11,
                        fontWeight: 500
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1f242c", 
                        borderColor: "#30363d",
                        borderRadius: "8px",
                        color: "#c9d1d9"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#58a6ff"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#contribGrad)"
                      dot={{
                        r: 4,
                        fill: "#c9d1d9",
                        stroke: "#58a6ff",
                        strokeWidth: 2,
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#ffffff",
                        stroke: "#58a6ff",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">
                  Loading Graph...
                </div>
              )}
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
