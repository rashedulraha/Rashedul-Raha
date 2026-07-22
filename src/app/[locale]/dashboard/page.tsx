"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Sidebar, TabId } from "@/components/dashboard/Sidebar";
import { OverviewTab } from "@/components/dashboard/OverviewTab";
import { ProfileTab } from "@/components/dashboard/ProfileTab";
import { MessagesTab } from "@/components/dashboard/MessagesTab";
import { ProjectsTab } from "@/components/dashboard/ProjectsTab";
import { SkillsTab } from "@/components/dashboard/SkillsTab";
import { ExperienceTab } from "@/components/dashboard/ExperienceTab";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const locale = useLocale();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push(`/${locale}`);
    } else {
      setIsAuthenticated(true);
    }
  }, [router, locale]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "messages": return <MessagesTab />;
      case "profile": return <ProfileTab />;
      case "projects": return <ProjectsTab />;
      case "skills": return <SkillsTab />;
      case "experience": return <ExperienceTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-4">
        <span className="font-bold text-lg text-foreground">Admin Panel</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-muted-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-30 pt-16 bg-background/95 backdrop-blur-3xl"
          >
            <div className="p-4 flex flex-col gap-2">
              {["overview", "messages", "profile", "projects", "skills", "experience", "settings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab as TabId);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`p-4 rounded-xl text-left capitalize font-medium ${
                    activeTab === tab ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen pt-16 md:pt-0 max-w-[100vw]">
        <div className="flex-1 p-6 md:p-10 overflow-x-hidden overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
