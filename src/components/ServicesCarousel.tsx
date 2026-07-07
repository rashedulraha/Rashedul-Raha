"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Search,
  Zap,
  Shield,
  Rocket,
  Globe,
  Cpu,
  type LucideIcon,
} from "lucide-react";

interface Service {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

const services: Service[] = [
  {
    icon: Search,
    title: "SEO & AEO",
    desc: "SSR, SSG, semantic",
    color: "#818cf8",
  },
  {
    icon: Zap,
    title: "Performance",
    desc: "Lighthouse 95+, CWV",
    color: "#facc15",
  },
  {
    icon: Shield,
    title: "Security",
    desc: "HTTPS, CSP, XSS",
    color: "#34d399",
  },
  {
    icon: Rocket,
    title: "Deployment",
    desc: "CI/CD, Vercel, AWS",
    color: "#f87171",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "CDN, edge, multi-region",
    color: "#60a5fa",
  },
  {
    icon: Cpu,
    title: "AI Ready",
    desc: "OpenAI, Gemini, vector",
    color: "#c084fc",
  },
];

export default function ServicesBox() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [boxItems, setBoxItems] = useState<number[]>([]);

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setIdx((prev) => {
        const next = (prev + 1) % services.length;
        setBoxItems((items) => {
          if (items.includes(next)) return items;
          const updated = [...items, next];
          return updated.length >= 6 ? [] : updated;
        });
        return next;
      });
    }, 2500);

    return () => clearInterval(id);
  }, [paused]);

  const cur = services[idx];

  const goTo = useCallback((i: number) => {
    setIdx(i);
    setBoxItems([i]);
  }, []);

  // Calculate grid position for each item
  const getItemPosition = (index: number) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    return {
      left: `${col * 33.33 + 1}%`,
      bottom: `${row * 45 + 5}%`,
    };
  };

  return (
    <div ref={ref} className="md:col-span-6 lg:col-span-4 lg:row-span-6 h-full">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/6 bg-[#09090b] min-h-72"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}>
        <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/3 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-0" />

        <div className="relative z-10 flex flex-1 flex-col px-5 pt-5 pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
            What You Get
          </p>

          <h3 className="mt-1.5 text-base font-semibold leading-snug text-neutral-200 mb-5">
            Clean code, pixel-perfect UI, deployed&nbsp;&amp;&nbsp;scaling
          </h3>

          <div className="mt-auto flex flex-col items-center">
            {/* Floating Pill */}
            <div className="relative z-20 mb-4 h-9">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 shadow-lg backdrop-blur-md">
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: `${cur.color}18`,
                      boxShadow: `0 0 8px ${cur.color}20`,
                    }}>
                    <cur.icon
                      className="h-3 w-3"
                      style={{ color: cur.color }}
                    />
                  </span>
                  <span className="text-[11px] font-medium text-neutral-200">
                    {cur.title}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    {cur.desc}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 3D Box */}
            <div
              className="relative w-full max-w-75"
              style={{ perspective: 600 }}>
              <svg
                viewBox="0 0 300 130"
                className="w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="40"
                  y="28"
                  width="220"
                  height="75"
                  rx="2"
                  fill="#141416"
                  stroke="#27272a"
                  strokeWidth="0.75"
                />
                <path
                  d="M40 28 L12 14 L12 20 L40 34Z"
                  fill="#18181b"
                  stroke="#27272a"
                  strokeWidth="0.75"
                />
                <path
                  d="M260 28 L288 14 L288 20 L260 34Z"
                  fill="#18181b"
                  stroke="#27272a"
                  strokeWidth="0.75"
                />
                <path
                  d="M18 52 L282 52 L260 103 L40 103Z"
                  fill="#18181b"
                  stroke="#27272a"
                  strokeWidth="0.75"
                />
                <line
                  x1="18"
                  y1="52"
                  x2="282"
                  y2="52"
                  stroke="#3f3f46"
                  strokeWidth="1"
                />
                <line
                  x1="40"
                  y1="28"
                  x2="260"
                  y2="28"
                  stroke="#3f3f46"
                  strokeWidth="0.75"
                />
              </svg>

              {/* Items Grid Inside Box */}
              <div className="absolute inset-x-[12%] top-[22%] bottom-[18%]">
                <AnimatePresence>
                  {boxItems.map((si, i) => {
                    const s = services[si];
                    const pos = getItemPosition(i);

                    return (
                      <motion.div
                        key={si}
                        initial={{ opacity: 0, y: -40, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="absolute flex items-center gap-1.5 rounded-md border border-white/[0.06] bg-white/[0.05] px-2 py-1"
                        style={{
                          left: pos.left,
                          bottom: pos.bottom,
                          width: "30%",
                        }}>
                        <s.icon
                          className="h-3 w-3 shrink-0"
                          style={{ color: s.color }}
                        />
                        <span className="text-[9px] font-medium text-neutral-300 truncate">
                          {s.title}
                        </span>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="absolute -bottom-1 left-1/2 h-3 w-24 -translate-x-1/2 rounded-full bg-white/2 blur-xl" />
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={services[i].title}
                  className={`h-1 rounded-full transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 ${
                    idx === i
                      ? "w-4 bg-white/30"
                      : "w-1 bg-white/8 hover:bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
