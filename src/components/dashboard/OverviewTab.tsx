"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
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
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Zap,
  CheckCircle,
  AlertCircle,
  Calendar,
  Filter,
  RefreshCw,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";
import {
  getTrafficStats,
  getBlogs,
  getGuestbookMessages,
  getProjects,
  getCertificates,
  getBucketList,
  getContactMessages,
} from "@/services/apiService";

// Types
interface INotification {
  id: string;
  title: string;
  desc: string;
  action: string;
  type: "danger" | "warning" | "info" | "success";
  timestamp: string;
  read: boolean;
}

interface IStatCard {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend: number;
  color: string;
  subtitle?: string;
}

interface IActivity {
  id: string;
  type: "blog" | "message" | "project" | "guestbook" | "certificate";
  title: string;
  timestamp: string;
  status: "completed" | "pending" | "failed";
}

// Memoized Components
const StatCard = React.memo(
  ({ title, value, icon, trend, subtitle }: IStatCard) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative overflow-hidden rounded-xl border border-border/40 bg-card/40 p-5 hover:bg-card/60 transition-colors duration-300"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="text-2xl font-semibold mt-1.5 text-foreground">{value}</h4>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="text-muted-foreground/70">{icon}</div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <span
          className={`text-xs font-medium ${trend >= 0 ? "text-emerald-500" : "text-red-500"} flex items-center gap-1`}
        >
          {trend >= 0 ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {Math.abs(trend)}%
        </span>
        <span className="text-xs text-muted-foreground">vs last week</span>
      </div>
    </motion.div>
  ),
);

StatCard.displayName = "StatCard";

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-32 bg-muted/20 rounded-2xl" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-muted/20 rounded-2xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-80 bg-muted/20 rounded-2xl" />
      <div className="h-80 bg-muted/20 rounded-2xl" />
    </div>
  </div>
);

export function OverviewTab() {
  // States
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [refreshKey, setRefreshKey] = useState(0);

  // Data states
  const [trafficData, setTrafficData] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    chatbotInteractions: 0,
    formSubmissions: 0,
  });
  const [graphData, setGraphData] = useState<{ day: string; value: number }[]>(
    [],
  );
  const [activityData, setActivityData] = useState<IActivity[]>([]);

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
        messagesRes,
      ] = await Promise.all([
        getTrafficStats().catch(() => ({ data: { success: false } })),
        getBlogs().catch(() => ({ data: { success: false, data: [] } })),
        getGuestbookMessages().catch(() => ({
          data: { success: false, data: [] },
        })),
        getProjects().catch(() => ({ data: { success: false, data: [] } })),
        getCertificates().catch(() => ({ data: { success: false, data: [] } })),
        getBucketList().catch(() => ({ data: { success: false, data: [] } })),
        getContactMessages().catch(() => ({
          data: { success: false, data: [] },
        })),
      ]);

      // Process Traffic
      if (trafficRes.data?.success && trafficRes.data?.data) {
        const {
          totalViews,
          uniqueVisitors,
          chatbotInteractions,
          formSubmissions,
          dailyTraffic,
        } = trafficRes.data.data;
        setTrafficData({
          totalViews,
          uniqueVisitors,
          chatbotInteractions,
          formSubmissions,
        });
        setGraphData(dailyTraffic || generateMockGraphData());
      }

      // Process Counts
      const blogsCount = Array.isArray(blogsRes.data?.data)
        ? blogsRes.data.data.length
        : 0;
      const guestbookList = Array.isArray(guestbookRes.data?.data)
        ? guestbookRes.data.data
        : [];
      const projectsCount = Array.isArray(projectsRes.data?.data)
        ? projectsRes.data.data.length
        : 0;
      const certificatesCount = Array.isArray(certificatesRes.data?.data)
        ? certificatesRes.data.data.length
        : 0;
      const bucketCount = Array.isArray(bucketRes.data?.data)
        ? bucketRes.data.data.length
        : 0;
      const messagesList = Array.isArray(messagesRes.data?.data)
        ? messagesRes.data.data
        : [];

      setCounts({
        blogs: blogsCount,
        guestbook: guestbookList.length,
        pendingGuestbook: guestbookList.filter((m: any) => m.approved === false)
          .length,
        projects: projectsCount,
        certificates: certificatesCount,
        bucketList: bucketCount,
        messages: messagesList.length,
        unreadMessages: messagesList.filter((m: any) => !m.isRead).length,
      });

      // Generate activity data
      generateActivityData(guestbookList, messagesList);
    } catch (err) {
      console.error("Failed to load dashboard overview stats:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Effects
  useEffect(() => {
    setMounted(true);
    loadStats();
  }, [refreshKey]);

  // Mock data generator
  function generateMockGraphData() {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day) => ({
      day,
      value: Math.floor(Math.random() * 100) + 20,
    }));
  }

  function generateActivityData(guestbookList: any[], messagesList: any[]) {
    const activities: IActivity[] = [];

    // Add guestbook activities
    guestbookList.slice(0, 3).forEach((item) => {
      activities.push({
        id: `gb-${item.id}`,
        type: "guestbook",
        title: `New guestbook message from ${item.name || "Anonymous"}`,
        timestamp: new Date(item.createdAt).toLocaleDateString(),
        status: item.approved ? "completed" : "pending",
      });
    });

    // Add message activities
    messagesList.slice(0, 3).forEach((item) => {
      activities.push({
        id: `msg-${item.id}`,
        type: "message",
        title: `Contact message from ${item.name || "Unknown"}`,
        timestamp: new Date(item.createdAt).toLocaleDateString(),
        status: item.isRead ? "completed" : "pending",
      });
    });

    // Sort by timestamp (newest first)
    activities.sort((a, b) => b.timestamp.localeCompare(a.timestamp));
    setActivityData(activities.slice(0, 5));
  }

  // Memoized Data
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

  const quickStats: IStatCard[] = useMemo(
    () => [
      {
        title: "Total Views",
        value: trafficData.totalViews.toLocaleString(),
        icon: <Eye className="w-5 h-5" />,
        trend: 12.5,
        color: "",
        subtitle: `${trafficData.uniqueVisitors.toLocaleString()} unique visitors`,
      },
      {
        title: "Chatbot Interactions",
        value: trafficData.chatbotInteractions.toLocaleString(),
        icon: <MessageSquare className="w-5 h-5" />,
        trend: 8.3,
        color: "",
        subtitle: `${((trafficData.chatbotInteractions / trafficData.totalViews) * 100).toFixed(1)}% engagement rate`,
      },
      {
        title: "Form Submissions",
        value: trafficData.formSubmissions.toLocaleString(),
        icon: <Mail className="w-5 h-5" />,
        trend: -2.1,
        color: "",
        subtitle: `${counts.messages} total messages`,
      },
      {
        title: "Active Projects",
        value: counts.projects,
        icon: <Briefcase className="w-5 h-5" />,
        trend: 5.0,
        color: "",
        subtitle: `${counts.certificates} certificates earned`,
      },
    ],
    [trafficData, counts],
  );

  const notifications = useMemo(() => {
    const list: INotification[] = [];
    if (counts.unreadMessages > 0) {
      list.push({
        id: "1",
        title: "Unread Contact Messages",
        desc: `You have ${counts.unreadMessages} contact messages waiting for a reply.`,
        action: "Go to Messages",
        type: "danger",
        timestamp: "Just now",
        read: false,
      });
    }
    if (counts.pendingGuestbook > 0) {
      list.push({
        id: "2",
        title: "Pending Guestbook Approvals",
        desc: `There are ${counts.pendingGuestbook} guestbook comments that need moderation.`,
        action: "Moderate Guestbook",
        type: "warning",
        timestamp: "5 minutes ago",
        read: false,
      });
    }
    if (counts.bucketList > 0) {
      list.push({
        id: "3",
        title: "Goals In Progress",
        desc: `You have active bucket list targets to complete.`,
        action: "Check Goals",
        type: "info",
        timestamp: "1 hour ago",
        read: true,
      });
    }
    if (list.length === 0) {
      list.push({
        id: "4",
        title: "All Caught Up!",
        desc: "Everything looks perfect. There are no pending reviews or unread messages.",
        action: "Write a Blog Post",
        type: "success",
        timestamp: "2 hours ago",
        read: true,
      });
    }
    return list;
  }, [counts]);

  // Chart Components
  const renderChart = () => {
    const chartData =
      graphData.length > 0 ? graphData : generateMockGraphData();
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="trafficGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            stroke="#8b949e"
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="#8b949e" tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f242c",
              borderColor: "#30363d",
              borderRadius: "12px",
              color: "#c9d1d9",
              fontSize: "12px",
              padding: "12px",
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#38bdf8"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#trafficGrad)"
            dot={{ fill: "#38bdf8", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  };

  const renderDistributionChart = () => (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={comparisonData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="count"
        >
          {comparisonData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1f242c",
            borderColor: "#30363d",
            borderRadius: "12px",
            color: "#c9d1d9",
            fontSize: "12px",
          }}
          itemStyle={{ color: "#c9d1d9" }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36}
          iconType="circle"
          wrapperStyle={{ fontSize: '12px', color: '#8b949e' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );

  // If not mounted or loading
  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 p-4 md:p-6 max-w-7xl mx-auto"
    >
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {/* Clean Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 mb-2 border-b border-border/40"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center font-bold text-lg text-foreground border border-border/50">
                RR
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground tracking-tight">
                    Rashedul Raha
                  </h2>
                  <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-md">
                    Admin
                  </span>
                </div>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  System Admin & Developer Portfolio Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <button
                onClick={() => setRefreshKey((prev) => prev + 1)}
                className="p-2.5 rounded-lg bg-card border border-border/40 hover:bg-muted/50 transition-colors text-muted-foreground"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-colors">
                Quick Action
              </button>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left: Charts Section */}
            <div className="xl:col-span-2 space-y-6">
              {/* Bar Chart Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border border-border/40 bg-card/40 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      Portfolio Distribution
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Content breakdown across all sections
                    </p>
                  </div>
                </div>
                <div className="h-64 w-full">{renderDistributionChart()}</div>
              </motion.div>

              {/* Traffic Chart Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Traffic Overview
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Daily visitors and page views
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {["24h", "7d", "30d", "90d"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                          timeRange === range
                            ? "bg-primary text-white"
                            : "bg-muted/30 hover:bg-muted/50 text-muted-foreground"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="h-64 w-full">{renderChart()}</div>
              </motion.div>
            </div>

            {/* Right: Notifications & Actions */}
            <div className="space-y-6">
              {/* Notifications Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Notifications
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {notifications.filter((n) => !n.read).length} unread items
                    </p>
                  </div>
                </div>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence>
                    {notifications.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border transition-all ${
                          item.type === "danger"
                            ? "bg-red-500/5 border-red-500/20 hover:border-red-500/40"
                            : item.type === "warning"
                              ? "bg-amber-500/5 border-amber-500/20 hover:border-amber-500/40"
                              : item.type === "success"
                                ? "bg-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                                : "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40"
                        } ${!item.read ? "border-l-4 border-l-primary" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-1.5 rounded-lg ${
                              item.type === "danger"
                                ? "text-red-400"
                                : item.type === "warning"
                                  ? "text-amber-400"
                                  : item.type === "success"
                                    ? "text-emerald-400"
                                    : "text-blue-400"
                            }`}
                          >
                            {item.type === "danger" ? (
                              <AlertCircle className="w-4 h-4" />
                            ) : item.type === "warning" ? (
                              <AlertCircle className="w-4 h-4" />
                            ) : item.type === "success" ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <Info className="w-4 h-4" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-foreground">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.desc}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[10px] text-muted-foreground/60 flex items-center gap-1">
                                <Calendar className="w-3 h-3" />{" "}
                                {item.timestamp}
                              </span>
                              <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                                {item.action} →
                              </button>
                            </div>
                          </div>
                          {!item.read && (
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <button className="w-full mt-4 p-2.5 bg-muted/30 hover:bg-muted/50 rounded-xl text-xs font-bold text-foreground transition-colors border border-border/50">
                  View All Notifications
                </button>
              </motion.div>

              {/* Quick Actions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: <Edit className="w-4 h-4" />,
                      label: "Post Blog",
                      color: "bg-blue-500/10 text-blue-400",
                    },
                    {
                      icon: <Briefcase className="w-4 h-4" />,
                      label: "Add Project",
                      color: "bg-purple-500/10 text-purple-400",
                    },
                    {
                      icon: <Award className="w-4 h-4" />,
                      label: "Add Certificate",
                      color: "bg-emerald-500/10 text-emerald-400",
                    },
                    {
                      icon: <Users className="w-4 h-4" />,
                      label: "View Messages",
                      color: "bg-amber-500/10 text-amber-400",
                    },
                  ].map((action, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 rounded-xl border border-border/50 hover:border-border transition-all ${action.color} flex flex-col items-center gap-1.5`}
                    >
                      {action.icon}
                      <span className="text-xs font-bold">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6"
              >
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {activityData.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/20 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "blog"
                            ? "bg-blue-500/10 text-blue-400"
                            : activity.type === "message"
                              ? "bg-purple-500/10 text-purple-400"
                              : activity.type === "project"
                                ? "bg-amber-500/10 text-amber-400"
                                : activity.type === "guestbook"
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : "bg-pink-500/10 text-pink-400"
                        }`}
                      >
                        {activity.type === "blog" ? (
                          <Edit className="w-4 h-4" />
                        ) : activity.type === "message" ? (
                          <Mail className="w-4 h-4" />
                        ) : activity.type === "project" ? (
                          <Briefcase className="w-4 h-4" />
                        ) : activity.type === "guestbook" ? (
                          <Users className="w-4 h-4" />
                        ) : (
                          <Award className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                          activity.status === "completed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : activity.status === "pending"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* System Status Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    API Status
                  </p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Operational
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Database</p>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Connected
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Response Time
                  </p>
                  <p className="text-xs text-foreground/80">~28 ms</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

// Missing Icon components
const Edit = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const Info = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Add to global CSS for scrollbar styling
// .custom-scrollbar::-webkit-scrollbar { width: 4px; }
// .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
