"use client";

import React from "react";
import { Link } from "@/routing";
import { ArrowLeft, Ghost, Search, Map } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function NotFound() {
  let t;
  try {
    t = useTranslations("NotFound");
  } catch (e) {
    t = (key: string) => key;
  }

  const getTranslation = (key: string) => {
    const res = t(key);
    if (res === `NotFound.${key}` || res === key) {
      if (key === "title") return "Page Not Found";
      if (key === "description") return "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.";
      if (key === "backHome") return "Return Home";
    }
    return res;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-30">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] rounded-full border border-primary/10 border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-primary/20 border-dashed"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-8">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-primary blur-[80px] rounded-full w-48 h-48 -z-10 ml-6 mt-4" 
          />
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Ghost className="w-40 h-40 text-primary drop-shadow-[0_0_15px_rgba(var(--primary),0.5)]" />
          </motion.div>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
          className="text-8xl md:text-9xl font-bold font-instrument-serif text-foreground mb-2 drop-shadow-lg"
        >
          4<span className="text-primary/80">0</span>4
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-2xl md:text-4xl font-semibold mb-6 tracking-tight text-foreground/90"
        >
          {getTranslation("title")}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-muted-foreground text-lg max-w-lg mx-auto mb-10 leading-relaxed"
        >
          {getTranslation("description")}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link 
            href="/"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform duration-300" />
            <span className="font-semibold tracking-wide">{getTranslation("backHome")}</span>
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
