"use client";

import React, { useEffect, useState } from "react";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AntiInspect() {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    // Disable Right Click without showing the security modal
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12
      if (e.key === "F12") {
        e.preventDefault();
        setIsLocked(true);
      }
      
      // Prevent Ctrl+Shift+I (Windows) / Cmd+Option+I (Mac)
      if ((e.ctrlKey && e.shiftKey && e.key === "I") || (e.metaKey && e.altKey && e.key === "i")) {
        e.preventDefault();
        setIsLocked(true);
      }
      
      // Prevent Ctrl+Shift+J (Windows) / Cmd+Option+J (Mac)
      if ((e.ctrlKey && e.shiftKey && e.key === "J") || (e.metaKey && e.altKey && e.key === "j")) {
        e.preventDefault();
        setIsLocked(true);
      }

      // Prevent Ctrl+U (Windows) / Cmd+Option+U (Mac) - View Source
      if ((e.ctrlKey && e.key === "u") || (e.ctrlKey && e.key === "U") || (e.metaKey && e.altKey && e.key === "u")) {
        e.preventDefault();
        setIsLocked(true);
      }

      // Prevent Ctrl+Shift+C (Windows) / Cmd+Option+C (Mac) - Inspect Element
      if ((e.ctrlKey && e.shiftKey && e.key === "C") || (e.metaKey && e.altKey && e.key === "c")) {
        e.preventDefault();
        setIsLocked(true);
      }
    };

    // Detect DevTools opened via browser menu (if docked)
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;
      
      if (widthThreshold || heightThreshold) {
        setIsLocked(true);
      }

      // Fallback check for Device Mode (debugger timing hack)
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger; 
      if (performance.now() - start > 100) {
        setIsLocked(true);
      }
    };

    // Check periodically
    const interval = setInterval(detectDevTools, 500);

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-[480px] bg-[#0c0c0c] border border-white/10 rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center"
          >
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 mb-6">
              <ShieldAlert className="w-8 h-8" />
            </div>

            {/* Title & Desc */}
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Security Alert</h2>
            <p className="text-[#a1a1aa] mb-8 leading-relaxed">
              Developer tools are disabled to maintain the security and integrity of this application.
            </p>

            {/* Notice Box */}
            <div className="w-full bg-[#181111] border border-red-900/50 rounded-xl p-5 mb-8 text-left">
              <p className="text-red-500 text-xs font-bold tracking-widest uppercase mb-2">Copyright Notice</p>
              <p className="text-[#a1a1aa] text-sm leading-relaxed">
                The source code, design, and content of this site are protected by copyright. Unauthorized copying or republishing will result in a DMCA takedown. Your access has been logged.
              </p>
            </div>

            {/* Action Button */}
            <button 
              onClick={handleReload}
              className="w-full py-4 bg-white text-black rounded-xl font-semibold text-[15px] hover:bg-gray-100 transition-colors mb-8"
            >
              Reload Page
            </button>

            {/* Footer */}
            <div className="w-full border-t border-white/10 pt-6 flex flex-col gap-3">
              <p className="text-[#52525b] text-sm">
                &copy; 2024&ndash;2026 Rashedul Islam. All rights reserved.
              </p>
              <button className="text-[#3b82f6] text-sm font-medium hover:underline inline-flex items-center justify-center gap-1 transition-all">
                Legal Terms & Conditions <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
