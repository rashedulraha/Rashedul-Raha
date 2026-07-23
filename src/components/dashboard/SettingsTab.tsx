"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Save, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Activity, 
  Bell, 
  Eye, 
  Lock, 
  Bot, 
  CheckCircle2, 
  AlertCircle,
  Sliders,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";

export interface ISettings {
  enableContactForm: boolean;
  enableEmailNotifications: boolean;
  requireEmailVerification: boolean;
  enableGuestbook: boolean;
  autoApproveGuestbook: boolean;
  enableChatbot: boolean;
  enableTrafficTracking: boolean;
  enableIpLogging: boolean;
  availableForHire: boolean;
  maintenanceMode: boolean;
  enableAntiInspect: boolean;
  enableRateLimiting: boolean;
}

const defaultSettings: ISettings = {
  enableContactForm: true,
  enableEmailNotifications: true,
  requireEmailVerification: true,
  enableGuestbook: true,
  autoApproveGuestbook: true,
  enableChatbot: true,
  enableTrafficTracking: true,
  enableIpLogging: true,
  availableForHire: true,
  maintenanceMode: false,
  enableAntiInspect: false,
  enableRateLimiting: true,
};

export function SettingsTab() {
  const [settings, setSettings] = useState<ISettings>(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_app_settings");
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load settings from storage:", err);
    }
  }, []);

  const toggleSetting = (key: keyof ISettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem("portfolio_app_settings", JSON.stringify(settings));
        toast.success("System settings updated successfully!");
      } catch (err) {
        toast.error("Failed to save settings.");
      } finally {
        setIsSaving(false);
      }
    }, 600);
  };

  const resetDefaults = () => {
    setSettings(defaultSettings);
    localStorage.setItem("portfolio_app_settings", JSON.stringify(defaultSettings));
    toast.info("Reset settings to default configuration.");
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">System Settings & Controls</h2>
          <p className="text-muted-foreground mt-1">
            Configure contact permissions, email notifications, traffic tracking, and security controls.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={resetDefaults}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-accent text-xs font-semibold rounded-xl text-foreground transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. CONTACT & MESSAGING CONTROL */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-premium p-6 space-y-5"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="p-2.5 bg-primary/10 text-primary rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Contact & Messages Control</h3>
              <p className="text-xs text-muted-foreground">Control who can send contact messages and email alerts</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Allow Contact Form Submissions</span>
                <span className="text-[11px] text-muted-foreground">Allow visitors to submit messages on contact section</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("enableContactForm")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableContactForm ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableContactForm ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Instant Email Notifications</span>
                <span className="text-[11px] text-muted-foreground">Send email notifications to your inbox when a message arrives</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("enableEmailNotifications")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableEmailNotifications ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableEmailNotifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Require Strict Email Formatting</span>
                <span className="text-[11px] text-muted-foreground">Validate email format before accepting message</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("requireEmailVerification")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.requireEmailVerification ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.requireEmailVerification ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 2. GUESTBOOK & COMMUNITY INTERACTION */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card-premium p-6 space-y-5"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Guestbook & Interaction</h3>
              <p className="text-xs text-muted-foreground">Manage guestbook comments and AI assistant availability</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Enable Guestbook Signing</span>
                <span className="text-[11px] text-muted-foreground">Allow community members to sign and leave messages</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("enableGuestbook")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableGuestbook ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableGuestbook ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Auto-Approve Guestbook Posts</span>
                <span className="text-[11px] text-muted-foreground">Publish guestbook entries immediately without manual review</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("autoApproveGuestbook")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoApproveGuestbook ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoApproveGuestbook ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 3 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">AI Chatbot Widget</span>
                <span className="text-[11px] text-muted-foreground">Display AI Assistant floating chatbot on portfolio</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("enableChatbot")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableChatbot ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableChatbot ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3. USER ACTIVITY & TRAFFIC TRACKING */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-premium p-6 space-y-5"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Traffic & Activity Tracking</h3>
              <p className="text-xs text-muted-foreground">Toggle real-time user visit and analytics logging</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Record Page Views</span>
                <span className="text-[11px] text-muted-foreground">Track public visitor page views in database</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("enableTrafficTracking")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableTrafficTracking ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableTrafficTracking ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Unique Visitor IP Hashing</span>
                <span className="text-[11px] text-muted-foreground">Log anonymized IP hashes to measure unique users</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("enableIpLogging")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableIpLogging ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableIpLogging ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* 4. AVAILABILITY & SYSTEM PROTECTION */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-premium p-6 space-y-5"
        >
          <div className="flex items-center gap-3 pb-3 border-b border-border">
            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">Availability & Security</h3>
              <p className="text-xs text-muted-foreground">Manage hiring badge and inspect protection mode</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Toggle 1 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">"Available for Hire" Badge</span>
                <span className="text-[11px] text-muted-foreground">Show open-for-freelance indicator across website</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("availableForHire")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.availableForHire ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.availableForHire ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/40">
              <div>
                <span className="text-xs font-bold text-foreground block">Anti-DevTools & Inspect Shield</span>
                <span className="text-[11px] text-muted-foreground">Disable right-click & F12 devtools inspection</span>
              </div>
              <button
                type="button"
                onClick={() => toggleSetting("enableAntiInspect")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.enableAntiInspect ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.enableAntiInspect ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => handleSave()}
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving Settings..." : "Save All System Settings"}
        </button>
      </div>
    </div>
  );
}
