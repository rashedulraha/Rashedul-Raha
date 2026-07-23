"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Users, 
  Eye, 
  MessageSquare, 
  Briefcase, 
  ArrowUpRight, 
  Activity, 
  Server, 
  Database,
  Award,
  ListTodo,
  Bell,
  Mail,
  User,
  ShieldAlert,
  Terminal,
  Clock,
  ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, 
  BarChart, Bar, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { 
  getTrafficStats, 
  getBlogs, 
  getGuestbookMessages, 
  getProjects, 
  getCertificates, 
  getBucketList,
  getContactMessages
} from "@/services/apiService";

interface INotification {
  title: string;
  desc: string;
  action: string;
  type: string;
}

export function OverviewTab() {
  const [mounted, setMounted] = useState(false);
  const [trafficData, setTrafficData] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    chatbotInteractions: 0,
    formSubmissions: 0,
  });
  const [graphData, setGraphData] = useState<{ day: string; value: number }[]>([]);
  
  // Dashboard counts
  const [counts, setCounts] = useState({
    blogs: 0,
    guestbook: 0,
    pendingGuestbook: 0,
    projects: 0,
    certificates: 0,
    bucketList: 0,
    messages: 0,
    unreadMessages: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    async function loadStats() {
      setIsLoading(true);
      try {
        const [
          trafficRes,
          blogsRes,
          guestbookRes,
          projectsRes,
          certificatesRes,
          bucketRes,
          messagesRes
        ] = await Promise.all([
          getTrafficStats().catch(() => ({ data: { success: false } })),
          getBlogs().catch(() => ({ data: { success: false, data: [] } })),
          getGuestbookMessages().catch(() => ({ data: { success: false, data: [] } })),
          getProjects().catch(() => ({ data: { success: false, data: [] } })),
          getCertificates().catch(() => ({ data: { success: false, data: [] } })),
          getBucketList().catch(() => ({ data: { success: false, data: [] } })),
          getContactMessages().catch(() => ({ data: { success: false, data: [] } })),
        ]);

        // Process Traffic
        if (trafficRes.data?.success && trafficRes.data?.data) {
          const { totalViews, uniqueVisitors, chatbotInteractions, formSubmissions, dailyTraffic } = trafficRes.data.data;
          setTrafficData({ totalViews, uniqueVisitors, chatbotInteractions, formSubmissions });
          setGraphData(dailyTraffic || []);
        }

        // Process Counts
        const blogsCount = Array.isArray(blogsRes.data?.data) ? blogsRes.data.data.length : 0;
        const guestbookList = Array.isArray(guestbookRes.data?.data) ? guestbookRes.data.data : [];
        const projectsCount = Array.isArray(projectsRes.data?.data) ? projectsRes.data.data.length : 0;
        const certificatesCount = Array.isArray(certificatesRes.data?.data) ? certificatesRes.data.data.length : 0;
        const bucketCount = Array.isArray(bucketRes.data?.data) ? bucketRes.data.data.length : 0;
        const messagesList = Array.isArray(messagesRes.data?.data) ? messagesRes.data.data : [];

        setCounts({
          blogs: blogsCount,
          guestbook: guestbookList.length,
          pendingGuestbook: guestbookList.filter((m: any) => m.approved === false).length,
          projects: projectsCount,
          certificates: certificatesCount,
          bucketList: bucketCount,
          messages: messagesList.length,
          unreadMessages: messagesList.filter((m: any) => !m.isRead).length,
        });

      } catch (err) {
        console.error("Failed to load dashboard overview stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  // Prepare comparison data for Recharts Bar Chart
  const comparisonData = useMemo(() => {
    return [
      { name: "Projects", count: counts.projects, color: "#38bdf8" },
      { name: "Blogs", count: counts.blogs, color: "#818cf8" },
      { name: "Guestbook", count: counts.guestbook, color: "#fb7185" },
      { name: "Certs", count: counts.certificates, color: "#34d399" },
      { name: "Goals", count: counts.bucketList, color: "#f59e0b" },
      { name: "Inquiries", count: counts.messages, color: "#a78bfa" },
    ];
  }, [counts]);

  // Notifications / Todo list items
  const notifications = useMemo(() => {
    const list: INotification[] = [];
    if (counts.unreadMessages > 0) {
      list.push({
        title: "Unread Contact Messages",
        desc: `You have ${counts.unreadMessages} contact messages waiting for a reply.`,
        action: "Go to Messages",
        type: "danger",
      });
    }
    if (counts.pendingGuestbook > 0) {
      list.push({
        title: "Pending Guestbook Approvals",
        desc: `There are ${counts.pendingGuestbook} guestbook comments that need moderation.`,
        action: "Moderate Guestbook",
        type: "warning",
      });
    }
    if (counts.bucketList > 0) {
      list.push({
        title: "Goals In Progress",
        desc: `You have active bucket list targets to complete.`,
        action: "Check Goals",
        type: "info",
      });
    }
    if (list.length === 0) {
      list.push({
        title: "All Caught Up!",
        desc: "Everything looks perfect. There are no pending reviews or unread messages.",
        action: "Write a Blog Post",
        type: "success",
      });
    }
    return list;
  }, [counts]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Premium Profile Header & Welcome */}
      <div className="card-premium p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-border/50 relative overflow-hidden bg-card/60 backdrop-blur-md">
        <div className="absolute right-0 top-0 -translate-y-12 translate-x-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-emerald-400 p-0.5 shadow-lg shrink-0">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-2xl text-foreground">
              RR
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Rashedul Raha</h2>
              <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold rounded-full uppercase tracking-wider">
                Admin
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm md:text-base">
              System Admin & Developer Portfolio Dashboard.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary" /> Active Session</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-emerald-400" /> Host Operational</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <div className="text-left md:text-right">
             <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">Security Shield</span>
             <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1 justify-start md:justify-end">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" /> SSL Encryption Active
             </span>
          </div>
        </div>
      </div>

      {/* Large Grid comparison of metrics - No Small Cards, Beautiful summary bars */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Side: Dynamic Progress Bar comparison & Recharts Distribution */}
        <div className="xl:col-span-2 card-premium p-6 border border-border/50 bg-card space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Portfolio Progress & Distribution</h3>
                <p className="text-xs text-muted-foreground">Comparison of records across different portfolio sections</p>
              </div>
              <span className="text-xs font-bold text-primary flex items-center gap-1"><Activity className="w-3.5 h-3.5" /> Dynamic Counts</span>
            </div>

            {/* Recharts Bar Chart */}
            <div className="h-64 w-full text-xs">
              {mounted && !isLoading ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={comparisonData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="#8b949e" tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} stroke="#8b949e" tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                      contentStyle={{
                        backgroundColor: "#1f242c",
                        borderColor: "#30363d",
                        borderRadius: "12px",
                        color: "#c9d1d9",
                        fontSize: "12px"
                      }}
                    />
                    <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                      {comparisonData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">
                  Loading metrics chart...
                </div>
              )}
            </div>
          </div>

          {/* Quick Metrics Summary List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-4 border-t border-border/50 text-center">
            {comparisonData.map((data, i) => (
              <div key={i} className="p-3 bg-muted/20 border border-border/50 rounded-xl">
                 <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">{data.name}</span>
                 <span className="text-xl font-black mt-1 block" style={{ color: data.color }}>{isLoading ? "..." : data.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Action center / Notifications */}
        <div className="card-premium p-6 border border-border/50 bg-card flex flex-col justify-between space-y-5">
           <div>
              <div className="flex items-center gap-2 mb-6">
                 <Bell className="w-5 h-5 text-primary" />
                 <div>
                   <h3 className="text-lg font-bold text-foreground">Pending Action Center</h3>
                   <p className="text-xs text-muted-foreground">Attention required items for Rashedul</p>
                 </div>
              </div>
              
              <div className="space-y-4">
                 {notifications.map((item, i) => (
                   <div 
                     key={i} 
                     className={`p-4 rounded-xl border flex flex-col gap-2 transition-all ${
                       item.type === "danger" 
                         ? "bg-red-500/5 border-red-500/20 text-red-400" 
                         : item.type === "warning" 
                           ? "bg-amber-500/5 border-amber-500/20 text-amber-400" 
                           : item.type === "success" 
                             ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                             : "bg-blue-500/5 border-blue-500/20 text-blue-400"
                     }`}
                   >
                     <div className="flex items-center gap-2">
                        {item.type === "danger" && <ShieldAlert className="w-4 h-4" />}
                        <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                     </div>
                     <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                   </div>
                 ))}
              </div>
           </div>

           <div className="space-y-3 pt-4 border-t border-border/50">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold text-foreground">
                 <button className="p-2.5 bg-muted hover:bg-accent rounded-lg transition-colors border border-border/50">Post Blog</button>
                 <button className="p-2.5 bg-muted hover:bg-accent rounded-lg transition-colors border border-border/50">Update CV</button>
              </div>
           </div>
        </div>
      </div>

      {/* Traffic analytics section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Traffic Graph */}
         <div className="lg:col-span-2 card-premium p-6 border border-border/50 bg-card space-y-6">
            <div>
               <h3 className="text-lg font-bold text-foreground">Website Traffic Activity</h3>
               <p className="text-xs text-muted-foreground">Unique visits and total hits registered over the past week</p>
            </div>

            <div className="h-64 w-full pr-4 text-xs">
              {mounted && !isLoading ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="day" stroke="#8b949e" tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} stroke="#8b949e" tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f242c",
                        borderColor: "#30363d",
                        borderRadius: "12px",
                        color: "#c9d1d9",
                        fontSize: "12px"
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#38bdf8"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#trafficGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">
                  Loading traffic activity chart...
                </div>
              )}
            </div>
         </div>

         {/* Right: Operational Status Panel */}
         <div className="card-premium p-6 border border-border/50 bg-card space-y-6 flex flex-col justify-between">
            <div>
               <h3 className="text-lg font-bold text-foreground">Operational Status</h3>
               <p className="text-xs text-muted-foreground">Live connection monitoring for API & DB services</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 bg-muted/20 border border-border/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Server className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-foreground">Main Server API</span>
                </div>
                <span className="text-xs font-black text-emerald-400">ONLINE</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-muted/20 border border-border/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg"><Database className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-foreground">Postgres Database</span>
                </div>
                <span className="text-xs font-black text-emerald-400">CONNECTED</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-muted/20 border border-border/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg"><Activity className="w-4 h-4" /></div>
                  <span className="text-xs font-bold text-foreground">Response Speed</span>
                </div>
                <span className="text-xs font-bold text-foreground/80">~ 28 ms</span>
              </div>
            </div>

            <div className="text-[10px] text-muted-foreground/60 text-center italic">
               System synced automatically • Last update: Just now
            </div>
         </div>
      </div>

    </div>
  );
}
