"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Wand2 } from "lucide-react";
import ParticleScene from "./ParticleScene";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

// ===== CREATIVE BORDER STYLES (Theme-aware, no hardcode) =====
const creativeBorderStyle = {
  borderTop: "1.5px solid var(--border)",
  borderLeft: "1px solid var(--border)",
  borderRight: "1px solid var(--border)",
  borderBottom: "1px solid color-mix(in srgb, var(--border) 15%)",
};

const ParticleSceCreate: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [triggerMorph, setTriggerMorph] = useState<string | null>(null);
  const router = useRouter();

  const handleCreate = () => {
    if (inputText.trim()) {
      setTriggerMorph(inputText);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputText.trim()) {
      setTriggerMorph(inputText);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden font-sans selection:bg-primary/30 selection:text-primary-foreground">
      {/* 3D Scene Component */}
      <ParticleScene triggerText={triggerMorph} />

      {/* ── Top Left: Back Button ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-6 left-6 z-20">
        <button
          onClick={handleBack}
          className="group relative flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md transition-all duration-300 hover:shadow-lg active:scale-95"
          style={creativeBorderStyle}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-full" />

          <ArrowLeft className="w-4 h-4 text-primary group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            Back
          </span>
        </button>
      </motion.div>

      {/* ── Top Right: Header Title (Desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed top-6 right-6 z-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md shadow-lg"
        style={creativeBorderStyle}>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-full" />

        <FaHome className="text-primary" />
        <Link href={"/"}> Home</Link>
      </motion.div>

      {/* ── Mobile Header (Center) ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-20 md:hidden flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md shadow-lg"
        style={creativeBorderStyle}>
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent rounded-t-full" />

        <Link href={"Home"}> Home</Link>
      </motion.div>

      {/* ── Bottom Input UI ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] z-10 px-4">
        <div
          className="relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-md p-2 flex gap-2 shadow-xl transition-all duration-300 hover:shadow-2xl group"
          style={creativeBorderStyle}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none" />

          {/* Subtle corner glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type something magical..."
            maxLength={20}
            className="flex-1 bg-transparent border-none p-3 text-base font-medium text-foreground focus:outline-none placeholder:text-foreground/40"
          />

          <button
            onClick={handleCreate}
            disabled={!inputText.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 active:translate-y-0 flex items-center gap-2 px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none group/btn">
            <Wand2 className="w-4 h-4 transition-transform group-hover/btn:rotate-12" />
            <span className="hidden sm:inline">Create</span>
          </button>
        </div>

        {/* Helper Text */}
        <p className="text-center text-xs text-foreground/50 mt-3 font-mono tracking-wider">
          Press{" "}
          <kbd className="px-1.5 py-0.5 rounded bg-muted/50 border border-border text-foreground/70 text-[10px]">
            Enter
          </kbd>{" "}
          to create particles
        </p>
      </motion.div>
    </div>
  );
};

export default ParticleSceCreate;
