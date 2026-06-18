"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* ══════════════════════════════════════════════
   CLEAN & MODERN BACKGROUND
   Minimal + Premium + Subtle
   ══════════════════════════════════════════════ */
export default function CommonBg() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const spotY = useSpring(mouseY, { stiffness: 40, damping: 25 });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);

    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      observer.disconnect();
    };
  }, [mouseX, mouseY]);

  // Theme-aware colors (more subtle)
  const dotColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";
  const lineColor = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.03)";
  const glowColor = isDark ? "rgba(79,70,229,0.05)" : "rgba(79,70,229,0.035)";
  const spotlightColor = isDark
    ? "rgba(79,70,229,0.025)"
    : "rgba(79,70,229,0.015)";
  const vignetteColor = isDark ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.05)";

  return (
    <>
      {/* ── Fixed Background Layer ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-background">
        {/* Subtle gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/10" />

        {/* ── Modern Dot Grid (larger spacing for cleaner look) ── */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, ${dotColor} 0.8px, transparent 0.8px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* ── Subtle Line Grid (only on larger screens, more subtle) ── */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, ${lineColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)
            `,
            backgroundSize: "140px 140px",
            maskImage:
              "radial-gradient(ellipse at center, black 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 25%, transparent 75%)",
          }}
        />

        {/* ── Slow Rotating Aurora Gradient (very subtle) ── */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              `radial-gradient(ellipse 80% 50% at 20% 40%, ${glowColor} 0%, transparent 60%)`,
              `radial-gradient(ellipse 80% 50% at 80% 60%, ${glowColor} 0%, transparent 60%)`,
              `radial-gradient(ellipse 80% 50% at 50% 20%, ${glowColor} 0%, transparent 60%)`,
              `radial-gradient(ellipse 80% 50% at 20% 40%, ${glowColor} 0%, transparent 60%)`,
            ],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* ── Single Subtle Glow Orb (center, slower) ── */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 700,
            height: 700,
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ── Secondary Glow (bottom right, very subtle) ── */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 450,
            height: 450,
            bottom: "5%",
            right: "5%",
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            filter: "blur(80px)",
            opacity: 0.4,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ── Noise Texture (premium feel, very subtle) ── */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />

        {/* ── Vignette Effect (subtle corner darkening) ── */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at center, transparent 40%, ${vignetteColor} 100%)`,
          }}
        />

        {/* ── Top Accent Line (very subtle) ── */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(to right, transparent 15%, ${lineColor} 50%, transparent 85%)`,
          }}
        />
      </div>

      {/* ── Mouse Spotlight (very subtle, smaller) ── */}
      <motion.div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${spotX}px ${spotY}px, ${spotlightColor}, transparent 60%)`,
        }}
      />
    </>
  );
}
