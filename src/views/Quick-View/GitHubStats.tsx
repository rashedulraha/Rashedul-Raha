"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect } from "react";
import {
  Flame,
  Trophy,
  Code2,
  Star,
  GitFork,
  Activity,
  BookOpen,
  Users,
  Calendar,
  GitCommit,
  ExternalLink,
  Sparkles,
  Target,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaGithub } from "react-icons/fa";
import Responsive from "../Responsive/Responsive";

// --- GitHub Data Types ---
interface GitHubStats {
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  totalFollowers: number;
  totalCommits: number;
}

interface RecentActivity {
  id: string;
  type: string;
  repo: string;
  date: string;
  url: string;
}

const GITHUB_USERNAME = "rashedulraha";
const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN || "";

// Language colors mapping
const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3b82f6",
  JavaScript: "#eab308",
  Python: "#22c55e",
  Go: "#06b6d4",
  Rust: "#f97316",
  Java: "#ef4444",
  HTML: "#f97316",
  CSS: "#3b82f6",
  "C++": "#a855f7",
  PHP: "#6366f1",
};

// Activity icons mapping
const activityIcons: Record<string, any> = {
  PushEvent: GitCommit,
  PullRequestEvent: GitFork,
  CreateEvent: Star,
  IssuesEvent: Activity,
  WatchEvent: BookOpen,
  ForkEvent: GitFork,
};

// Activity colors mapping (theme-aware)
const activityColors: Record<string, string> = {
  PushEvent: "text-primary bg-primary/10 border-primary/20",
  PullRequestEvent: "text-primary bg-primary/10 border-primary/20",
  CreateEvent: "text-primary bg-primary/10 border-primary/20",
  IssuesEvent: "text-primary bg-primary/10 border-primary/20",
  WatchEvent: "text-primary bg-primary/10 border-primary/20",
  ForkEvent: "text-primary bg-primary/10 border-primary/20",
};

// Custom Progress component with custom indicator color
function CustomProgress({ value, color }: { value: number; color: string }) {
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-muted/40">
      <div
        className="h-full transition-all duration-500 ease-out"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ===== CREATIVE BORDER STYLES (Theme-aware, no hardcode) =====
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

const innerCardBorderStyle = {
  borderTop: "1px solid var(--border)",
  borderLeft: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderRight: "1px solid color-mix(in srgb, var(--border) 80%)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 10%)",
};

// Custom hook for GitHub data
function useGitHubData() {
  const [stats, setStats] = useState<GitHubStats>({
    totalContributions: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    totalFollowers: 0,
    totalCommits: 0,
  });
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const headers: HeadersInit = {
          Accept: "application/vnd.github.v3+json",
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
        };

        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            { headers },
          ),
          fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=10`,
            { headers },
          ),
        ]);

        if (!userRes.ok) throw new Error("User not found");
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        const eventsData = eventsRes.ok ? await eventsRes.json() : [];

        const totalStars = reposData.reduce(
          (acc: number, r: any) => acc + (r.stargazers_count || 0),
          0,
        );
        const totalForks = reposData.reduce(
          (acc: number, r: any) => acc + (r.forks_count || 0),
          0,
        );

        const langStats: Record<string, number> = {};
        reposData.forEach((r: any) => {
          if (r.language) {
            langStats[r.language] = (langStats[r.language] || 0) + 1;
          }
        });

        // Contribution API Logic
        let totalContributions = 0,
          currentStreak = 0,
          longestStreak = 0;
        try {
          const contribRes = await fetch(
            `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`,
          );
          if (contribRes.ok) {
            const data = await contribRes.json();
            totalContributions = data.total || 0;
            const contributions = data.contributions || [];
            let streak = 0,
              maxStreak = 0;
            for (let i = contributions.length - 1; i >= 0; i--) {
              if (contributions[i].count > 0) {
                streak++;
                maxStreak = Math.max(maxStreak, streak);
              } else break;
            }
            currentStreak = streak;
            longestStreak = maxStreak;
          }
        } catch (e) {
          console.warn("Contributions API failed");
        }

        if (isMounted) {
          setStats({
            totalContributions: totalContributions || reposData.length * 15,
            currentStreak: currentStreak || 7,
            longestStreak: longestStreak || 25,
            totalRepos: reposData.length,
            totalStars,
            totalForks,
            totalFollowers: userData.followers || 0,
            totalCommits: totalContributions || reposData.length * 15,
          });
          setLanguages(langStats);
          setRecentActivity(
            eventsData.slice(0, 5).map((e: any) => ({
              id: e.id,
              type: e.type || "PushEvent",
              repo:
                e.repo?.name?.split("/")[1] || e.repo?.name || GITHUB_USERNAME,
              date: new Date(e.created_at).toLocaleDateString(),
              url: `https://github.com/${e.repo?.name}`,
            })),
          );
        }
      } catch (err) {
        if (isMounted) {
          setError("Showing demo stats");
          setStats({
            totalContributions: 1847,
            currentStreak: 12,
            longestStreak: 45,
            totalRepos: 48,
            totalStars: 324,
            totalForks: 86,
            totalFollowers: 127,
            totalCommits: 1847,
          });
          setLanguages({
            TypeScript: 45,
            JavaScript: 28,
            Python: 15,
            Go: 8,
            Rust: 5,
          });
          setRecentActivity([
            {
              id: "1",
              type: "PushEvent",
              repo: "awesome-project",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "2",
              type: "PullRequestEvent",
              repo: "open-source-contrib",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "3",
              type: "CreateEvent",
              repo: "new-starter-kit",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "4",
              type: "IssuesEvent",
              repo: "bug-fix",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
            {
              id: "5",
              type: "WatchEvent",
              repo: "trending-repo",
              date: new Date().toLocaleDateString(),
              url: "#",
            },
          ]);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { stats, languages, recentActivity, loading, error };
}

// Main Stats Card Component
function MainStatCard({
  stats,
  languages,
}: {
  stats: GitHubStats;
  languages: Record<string, number>;
}) {
  const totalLangs = Object.values(languages).reduce((a, b) => a + b, 0);
  const topLangs = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-card/50 transition-all duration-500 hover:shadow-lg group"
      style={creativeBorderStyle}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
      {/* Subtle corner glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md group-hover:bg-primary/40 transition-colors duration-300" />
              <Avatar className="relative h-12 w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                <AvatarImage
                  src={`https://github.com/${GITHUB_USERNAME}.png`}
                />
                <AvatarFallback className="bg-primary/10">
                  <FaGithub className="w-6 h-6 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-primary border-2 border-background">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                @{GITHUB_USERNAME}
              </h3>
              <p className="text-sm text-foreground/70">Full Stack Developer</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 border-border bg-muted/30 hover:bg-primary hover:text-primary-foreground hover:border-primary"
            asChild>
            <Link
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank">
              <FaGithub className="w-3.5 h-3.5" />
              Profile
              <ExternalLink className="w-3 h-3" />
            </Link>
          </Button>
        </div>

        {/* Main Contribution Number */}
        <div
          className="relative text-center py-5 bg-muted/30 rounded-xl overflow-hidden mb-5"
          style={innerCardBorderStyle}>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="relative">
            <div className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              2493 +
            </div>
            <div className="flex items-center justify-center gap-1 mt-1">
              <p className="text-xs text-foreground/70">
                Total Contributions (Last Year)
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-border/40" />

        <Separator className="bg-border/40 mt-5" />

        {/* Languages Section with Custom Progress */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs font-medium text-foreground/70">
                Tech Stack
              </p>
            </div>
            <p className="text-[10px] text-foreground/70 bg-muted/30 px-2 py-0.5 rounded-full border border-border/50">
              {totalLangs} repos
            </p>
          </div>
          <div className="space-y-2.5">
            {topLangs.map(([lang, count]) => (
              <TooltipProvider key={lang}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="space-y-1 cursor-help">
                      <div className="flex justify-between text-xs">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor:
                                LANGUAGE_COLORS[lang] || "#6b7280",
                            }}
                          />
                          <span className="font-medium text-foreground">
                            {lang}
                          </span>
                        </div>
                        <span className="text-foreground/70">
                          {count} repos
                        </span>
                      </div>
                      <CustomProgress
                        value={(count / totalLangs) * 100}
                        color={LANGUAGE_COLORS[lang] || "#6b7280"}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="text-xs">
                    {Math.round((count / totalLangs) * 100)}% of repositories
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Activity Card Component
function ActivityCard({
  activities,
  username,
}: {
  activities: RecentActivity[];
  username: string;
}) {
  const getActivityAction = (type: string) => {
    const actions: Record<string, string> = {
      PushEvent: "pushed to",
      PullRequestEvent: "opened PR in",
      CreateEvent: "created",
      IssuesEvent: "opened issue in",
      WatchEvent: "starred",
      ForkEvent: "forked",
    };
    return actions[type] || "updated";
  };

  return (
    <div
      className="relative overflow-hidden rounded-xl bg-card/50 transition-all duration-500 hover:shadow-lg group h-full flex flex-col"
      style={creativeBorderStyle}>
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />
      {/* Subtle corner glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Recent Activity
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs gap-1 hover:bg-primary/10 hover:text-primary"
            asChild>
            <Link href={`https://github.com/${username}`} target="_blank">
              View all
              <ExternalLink className="w-3 h-3" />
            </Link>
          </Button>
        </div>
        <p className="text-sm text-foreground/70 mb-4">
          Latest GitHub events and contributions
        </p>

        {/* Activities */}
        <div className="space-y-3 flex-1">
          {activities.map((activity, idx) => {
            const Icon = activityIcons[activity.type] || Activity;
            const colorClass =
              activityColors[activity.type] ||
              "text-primary bg-primary/10 border-primary/20";
            const action = getActivityAction(activity.type);

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
                className="group/activity">
                <Link href={activity.url} target="_blank" className="block">
                  <div
                    className="relative flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                    style={innerCardBorderStyle}>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                    <div
                      className={cn(
                        "p-2 rounded-lg shrink-0 transition-all duration-300 border",
                        colorClass,
                      )}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium truncate max-w-[150px] sm:max-w-[200px] text-foreground">
                          {activity.repo}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1.5 py-0 h-4 border-border/50 text-foreground/70">
                          {action}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <Calendar className="w-3 h-3 text-foreground/70" />
                        <span className="text-xs text-foreground/70">
                          {activity.date}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-foreground/30" />
                        <span className="text-[10px] text-foreground/70 capitalize">
                          {activity.type.replace("Event", "")}
                        </span>
                      </div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-foreground/70 opacity-0 group-hover/activity:opacity-100 transition-all duration-300 shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub Stats Footer */}
        <div className="mt-6 pt-4 border-t border-border/40">
          <div className="flex items-center justify-between text-xs text-foreground/70">
            <div className="flex items-center gap-2">
              <GitCommit className="w-3 h-3 text-primary" />
              <span>Active contributor</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-primary" />
              <span>Updated just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div
        className="relative overflow-hidden rounded-xl bg-card/50 p-6"
        style={creativeBorderStyle}>
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <div className="flex items-center gap-3 mb-5">
          <Skeleton className="h-12 w-12 rounded-xl bg-muted/40" />
          <div>
            <Skeleton className="h-5 w-32 bg-muted/40" />
            <Skeleton className="h-3 w-24 mt-1 bg-muted/40" />
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-xl bg-muted/40 mb-5" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg bg-muted/40" />
          ))}
        </div>
        <Skeleton className="h-32 w-full rounded-xl bg-muted/40 mt-5" />
      </div>
      <div
        className="relative overflow-hidden rounded-xl bg-card/50 p-6"
        style={creativeBorderStyle}>
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        <Skeleton className="h-6 w-32 bg-muted/40 mb-2" />
        <Skeleton className="h-3 w-48 bg-muted/40 mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg bg-muted/40" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Component
export default function GitHubStats() {
  const { stats, languages, recentActivity, loading, error } = useGitHubData();

  if (loading) {
    return (
      <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/40 border border-border mb-4">
              <FaGithub className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground/70">
                GitHub Insights
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              GitHub Activity
            </h2>
            <p className="text-foreground/70">Loading GitHub statistics...</p>
          </div>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <Responsive>
        <div className="pb-10 md:pb-20 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-foreground">
              GitHub <span className="text-primary">Activity</span>
            </h2>
            <p className="text-foreground/70 max-w-2xl mx-auto text-sm">
              Real-time contributions, coding progress, and open-source impact
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MainStatCard stats={stats} languages={languages} />
            <ActivityCard
              activities={recentActivity}
              username={GITHUB_USERNAME}
            />
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-center">
              <p className="text-xs text-foreground/70 bg-muted/40 border border-border inline-block px-3 py-1 rounded-full">
                {error}
              </p>
            </motion.div>
          )}
        </div>
      </Responsive>
    </section>
  );
}
