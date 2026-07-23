"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Save, UploadCloud, CheckCircle2, User, Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa6";
import { toast } from "sonner";

export function ProfileTab() {
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rashedul Islam",
    title: "Full-Stack Developer & UI/UX Enthusiast",
    tagline: "Building scalable web apps & mobile applications with Next.js, React Native & Node.js",
    email: "contact@rashedulraha.com",
    phone: "+880 1700 000000",
    location: "Dhaka, Bangladesh",
    status: "Available for Hire & Freelance Projects",
    avatar: "/personal_img/rashedul-about.jpeg",
    bio: "I am a passionate Full-Stack Software Engineer specializing in modern JavaScript/TypeScript ecosystems. I focus on creating performant web applications, clean architectural design, and intuitive user interfaces.",
    resumeUrl: "https://rashedulraha.com/resume.pdf",
    githubUrl: "https://github.com/rashedulraha",
    linkedinUrl: "https://linkedin.com/in/rashedulraha",
    twitterUrl: "https://twitter.com/rashedulraha",
    instagramUrl: "https://instagram.com/rashedulraha",
    facebookUrl: "https://facebook.com/rashedulraha",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile settings saved successfully!");
    }, 800);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Profile & Identity</h2>
          <p className="text-muted-foreground mt-1">Manage your public bio, avatar, contact details, and social links.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Saving..." : "Save Profile"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium p-6 md:p-8"
      >
        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Avatar Header Section */}
          <div className="flex flex-col sm:flex-row gap-6 items-center border-b border-border pb-8">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-muted border-2 border-primary/30 shadow-2xl shrink-0 group">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).setAttribute("src", "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80");
                }}
              />
            </div>
            <div className="space-y-2 text-center sm:text-left w-full">
              <h3 className="text-xl font-bold text-foreground">{profile.name}</h3>
              <p className="text-xs text-muted-foreground">{profile.title}</p>
              <div className="pt-2">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="text"
                  value={profile.avatar}
                  onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full max-w-lg bg-muted/60 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" /> Personal Information
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Full Name *</label>
                <input
                  type="text"
                  required
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Professional Title *</label>
                <input
                  type="text"
                  required
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Hero Tagline / Subtitle</label>
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-foreground">Bio / About Me</label>
              <textarea
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50 leading-relaxed"
              />
            </div>
          </div>

          {/* Contact Details & Status */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" /> Contact Details & Status
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Phone Number</label>
                <input
                  type="text"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground">Status / Availability Badge</label>
                <input
                  type="text"
                  value={profile.status}
                  onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                  placeholder="Available for Hire"
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-foreground">Resume PDF Link</label>
                <input
                  type="text"
                  value={profile.resumeUrl}
                  onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2.5 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> Social Profiles & Links
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <FaGithub className="w-3.5 h-3.5" /> GitHub Profile
                </label>
                <input
                  type="text"
                  value={profile.githubUrl}
                  onChange={(e) => setProfile({ ...profile, githubUrl: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <FaLinkedin className="w-3.5 h-3.5 text-blue-500" /> LinkedIn Profile
                </label>
                <input
                  type="text"
                  value={profile.linkedinUrl}
                  onChange={(e) => setProfile({ ...profile, linkedinUrl: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <FaTwitter className="w-3.5 h-3.5 text-sky-400" /> Twitter / X
                </label>
                <input
                  type="text"
                  value={profile.twitterUrl}
                  onChange={(e) => setProfile({ ...profile, twitterUrl: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5 mb-1">
                  <FaInstagram className="w-3.5 h-3.5 text-pink-500" /> Instagram Profile
                </label>
                <input
                  type="text"
                  value={profile.instagramUrl}
                  onChange={(e) => setProfile({ ...profile, instagramUrl: e.target.value })}
                  className="w-full bg-muted/60 border border-border rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-xs font-bold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-primary/20"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
}
