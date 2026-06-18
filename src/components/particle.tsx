"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface ParticleTextProps {
  title?: string;
  subtitle?: string;
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

const ParticleText: React.FC<ParticleTextProps> = ({
  title = "Full-Stack Web & Application Developer",
  subtitle = "C/C++ • Python • TypeScript • Next.js • Node.js • Databases • AI Systems",
  className = "",
  particleCount = 60,
  particleColor = "#3b82f6",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full pointer-events-none";
      particle.style.backgroundColor = particleColor;
      particle.style.opacity = Math.random().toString();

      const x = Math.random() * container.offsetWidth;
      const y = Math.random() * container.offsetHeight;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      container.appendChild(particle);
      particles.push(particle);
    }

    const animateParticles = () => {
      particles.forEach((particle, index) => {
        const time = Date.now() * 0.001 + index;
        const x = Math.sin(time * 0.5) * 20 + Math.cos(time * 0.3) * 30;
        const y = Math.cos(time * 0.4) * 15 + Math.sin(time * 0.6) * 25;

        particle.style.transform = `translate(${x}px, ${y}px)`;
        particle.style.opacity = (Math.sin(time * 2) * 0.5 + 0.5).toString();
      });

      requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [particleCount, particleColor]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 select-none">
        {/* Main Title Heading */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-linear-to-b from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent pb-2"
          style={{
            textShadow: `0 0 40px ${particleColor}20`,
          }}>
          {title}
        </h1>

        {/* Subtitle Tech Stack Info */}
        <p
          className="mt-4 text-xs md:text-sm lg:text-base font-mono font-medium tracking-[0.2em] uppercase text-muted-foreground/80 max-w-2xl mx-auto"
          style={{
            filter: `drop-shadow(0 0 8px ${particleColor}40)`,
          }}>
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

export default function ParticleView() {
  return <ParticleText />;
}
