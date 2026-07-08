"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import DottedMap from "dotted-map";

// ── Types ──────────────────────────────────────────────

interface MapPoint {
  lat: number;
  lng: number;
  label?: string;
}

interface Connection {
  start: MapPoint;
  end: MapPoint;
}

interface WorldMapProps {
  connections?: Connection[];
  lineColor?: string;
}

// ── Constants ──────────────────────────────────────────

const DEFAULT_CONNECTIONS: Connection[] = [
  {
    start: { lat: 23.685, lng: 90.3563, label: "Dhaka" },
    end: { lat: 40.7128, lng: -74.006, label: "New York" },
  },
  {
    start: { lat: 23.685, lng: 90.3563, label: "Dhaka" },
    end: { lat: 51.5074, lng: -0.1278, label: "London" },
  },
  {
    start: { lat: 23.685, lng: 90.3563, label: "Dhaka" },
    end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
  },
  {
    start: { lat: 23.685, lng: 90.3563, label: "Dhaka" },
    end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
  },
  {
    start: { lat: 23.685, lng: 90.3563, label: "Dhaka" },
    end: { lat: 19.076, lng: 72.8777, label: "Mumbai" },
  },
];

// ── Module-level cache ─────────────────────────────────

let cachedMapSvg: { dark: string; light: string } | null = null;

function generateMapSvg(theme: "dark" | "light"): string {
  if (!cachedMapSvg) {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    
    cachedMapSvg = {
      dark: map.getSVG({
        radius: 0.22,
        color: "#FFFFFF40",
        shape: "circle",
        backgroundColor: "black",
      }),
      light: map.getSVG({
        radius: 0.22,
        color: "#00000040",
        shape: "circle",
        backgroundColor: "white",
      }),
    };
  }
  
  return cachedMapSvg[theme];
}

// ── Helper Functions ───────────────────────────────────

function projectPoint(lat: number, lng: number) {
  const x = (lng + 180) * (800 / 360);
  const y = (90 - lat) * (400 / 180);
  return { x, y };
}

function createCurvedPath(start: { x: number; y: number }, end: { x: number; y: number }) {
  const midX = (start.x + end.x) / 2;
  const midY = Math.min(start.y, end.y) - 50;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}

// ── Tooltip Component ──────────────────────────────────

interface TooltipProps {
  x: number;
  y: number;
  label: string;
  isVisible: boolean;
  color: string;
  position?: "top" | "bottom";
}

function CityTooltip({ x, y, label, isVisible, color, position = "top" }: TooltipProps) {
  const offsetY = position === "top" ? -20 : 20;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: offsetY / 2, scale: 0.9 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? offsetY : offsetY / 2,
        scale: isVisible ? 1 : 0.9,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="absolute pointer-events-none z-20"
      style={{
        left: `${(x / 800) * 100}%`,
        top: `${(y / 400) * 100}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap shadow-lg backdrop-blur-sm border"
        style={{
          backgroundColor: `${color}15`,
          borderColor: `${color}40`,
          color: color,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

// ── Main Component ─────────────────────────────────────

export default function WorldMap({
  connections = DEFAULT_CONNECTIONS,
  lineColor = "#0ea5e9",
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTooltips, setActiveTooltips] = useState<Set<string>>(new Set());

  // Handle hydration & theme
  useEffect(() => {
    setMounted(true);
    
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
    
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    
    return () => observer.disconnect();
  }, []);

  // Memoized SVG map
  const svgMap = useMemo(() => {
    if (!mounted) return "";
    const rawSvg = generateMapSvg(theme);
    return `data:image/svg+xml;utf8,${encodeURIComponent(rawSvg)}`;
  }, [theme, mounted]);

  // Memoized connection paths
  const paths = useMemo(() => {
    return connections.map((conn) => {
      const start = projectPoint(conn.start.lat, conn.start.lng);
      const end = projectPoint(conn.end.lat, conn.end.lng);
      return {
        start,
        end,
        startLabel: conn.start.label,
        endLabel: conn.end.label,
        path: createCurvedPath(start, end),
      };
    });
  }, [connections]);

  // Show placeholder while mounting
  if (!mounted) {
    return (
      <div className="w-full aspect-[2/1] bg-muted rounded-lg animate-pulse" />
    );
  }

  return (
    <div className="w-full dark:bg-background bg-white rounded-lg relative font-sans overflow-hidden">
      {/* Map Image */}
      <Image
        src={svgMap}
        className="h-full w-full mask-[linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
        priority
      />

      {/* City Labels/Tooltips */}
      <AnimatePresence>
        {paths.map((pathData, i) => {
          const startKey = `start-${i}`;
          const endKey = `end-${i}`;
          
          return (
            <div key={`tooltips-${i}`}>
              {/* Start Point Tooltip */}
              {pathData.startLabel && (
                <CityTooltip
                  x={pathData.start.x}
                  y={pathData.start.y}
                  label={pathData.startLabel}
                  isVisible={activeTooltips.has(startKey)}
                  color={lineColor}
                  position={i % 2 === 0 ? "top" : "bottom"}
                />
              )}
              
              {/* End Point Tooltip */}
              {pathData.endLabel && (
                <CityTooltip
                  x={pathData.end.x}
                  y={pathData.end.y}
                  label={pathData.endLabel}
                  isVisible={activeTooltips.has(endKey)}
                  color={lineColor}
                  position={i % 2 === 0 ? "bottom" : "top"}
                />
              )}
            </div>
          );
        })}
      </AnimatePresence>

      {/* SVG Overlay */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated Paths */}
        {paths.map((pathData, i) => (
          <g key={`path-${i}`}>
            {/* Main path */}
            <motion.path
              d={pathData.path}
              fill="none"
              stroke="url(#path-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
              filter="url(#glow)"
              onAnimationStart={() => {
                // Show start tooltip when animation begins
                setTimeout(() => {
                  setActiveTooltips((prev) => new Set([...prev, `start-${i}`]));
                }, i * 800);
              }}
              onAnimationComplete={() => {
                // Hide tooltips after animation
                setTimeout(() => {
                  setActiveTooltips((prev) => {
                    const next = new Set(prev);
                    next.delete(`start-${i}`);
                    next.delete(`end-${i}`);
                    return next;
                  });
                }, 5000);
              }}
            />

            {/* Glow trail */}
            <motion.path
              d={pathData.path}
              fill="none"
              stroke={lineColor}
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 0.3, 0.7, 1, 0],
                opacity: [0, 0.3, 0.6, 0.3, 0],
              }}
              transition={{
                duration: 4,
                delay: i * 0.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1,
              }}
              style={{ filter: "blur(4px)" }}
            />
          </g>
        ))}

        {/* Connection Points */}
        {paths.map((pathData, i) => (
          <g key={`points-${i}`}>
            {/* Start Point */}
            <g>
              <circle
                cx={pathData.start.x}
                cy={pathData.start.y}
                r="3"
                fill={lineColor}
                filter="url(#glow)"
              />
              <circle
                cx={pathData.start.x}
                cy={pathData.start.y}
                r="3"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="3;12;3"
                  dur="2s"
                  begin={`${i * 0.8}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2s"
                  begin={`${i * 0.8}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* End Point */}
            <g>
              <circle
                cx={pathData.end.x}
                cy={pathData.end.y}
                r="3"
                fill={lineColor}
                filter="url(#glow)"
              />
              <circle
                cx={pathData.end.x}
                cy={pathData.end.y}
                r="3"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values="3;12;3"
                  dur="2s"
                  begin={`${i * 0.8 + 1}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0;0.6"
                  dur="2s"
                  begin={`${i * 0.8 + 1}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Floating particles */}
            {[0, 1].map((particle) => (
              <motion.circle
                key={`particle-${i}-${particle}`}
                r="1.5"
                fill={lineColor}
                initial={{
                  cx: pathData.start.x,
                  cy: pathData.start.y,
                  opacity: 0,
                }}
                animate={{
                  cx: pathData.end.x,
                  cy: pathData.end.y,
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.8 + particle * 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                onAnimationStart={() => {
                  // Show end tooltip when particle arrives
                  if (particle === 1) {
                    setTimeout(() => {
                      setActiveTooltips((prev) => new Set([...prev, `end-${i}`]));
                    }, i * 800 + 3000);
                  }
                }}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}