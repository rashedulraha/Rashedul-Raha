"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import DottedMap from "dotted-map";
import { useTheme } from "next-themes";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export default function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const map = new DottedMap({ height: 100, grid: "diagonal" });
  const { theme } = useTheme();

  const svgMap = map.getSVG({
    radius: 0.22,
    color: theme === "dark" ? "#FFFFFF40" : "#00000040",
    shape: "circle",
    backgroundColor: theme === "dark" ? "black" : "white",
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Default dots if none provided
  const defaultDots = [
    {
      start: { lat: 23.685, lng: 90.3563, label: "Dhaka" }, // Bangladesh
      end: { lat: 40.7128, lng: -74.006, label: "New York" }, // USA
    },
    {
      start: { lat: 23.685, lng: 90.3563, label: "Dhaka" }, // Bangladesh
      end: { lat: 51.5074, lng: -0.1278, label: "London" }, // UK
    },
    {
      start: { lat: 23.685, lng: 90.3563, label: "Dhaka" }, // Bangladesh
      end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" }, // Japan
    },
    {
      start: { lat: 23.685, lng: 90.3563, label: "Dhaka" }, // Bangladesh
      end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" }, // USA
    },
    {
      start: { lat: 23.685, lng: 90.3563, label: "Dhaka" }, // Bangladesh
      end: { lat: 19.076, lng: 72.8777, label: "Mumbai" }, // India
    },
  ];

  const displayDots = dots.length > 0 ? dots : defaultDots;

  return (
    <div className="w-full dark:bg-black bg-white rounded-lg relative font-sans overflow-hidden">
      {/* Map Image */}
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full mask-[linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height={495}
        width={1056}
        draggable={false}
      />

      {/* SVG Overlay with Animations */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none">
        <defs>
          {/* Gradient for paths */}
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated Paths - Infinite Loop */}
        {displayDots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`path-group-${i}`}>
              {/* Main animated path */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
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
              />

              {/* Glow trail path */}
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke={lineColor}
                strokeWidth="3"
                initial={{
                  pathLength: 0,
                  opacity: 0,
                }}
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
                style={{
                  filter: "blur(4px)",
                }}
              />
            </g>
          );
        })}

        {/* Animated Dots - Infinite Loop */}
        {displayDots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`points-group-${i}`}>
              {/* Start Point */}
              <g>
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="3"
                  fill={lineColor}
                  filter="url(#glow)"
                />
                <circle
                  cx={startPoint.x}
                  cy={startPoint.y}
                  r="3"
                  fill={lineColor}
                  opacity="0.6">
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
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="3"
                  fill={lineColor}
                  filter="url(#glow)"
                />
                <circle
                  cx={endPoint.x}
                  cy={endPoint.y}
                  r="3"
                  fill={lineColor}
                  opacity="0.6">
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

              {/* Floating particles along the path */}
              <g>
                {[0, 1, 2].map((particle) => (
                  <motion.circle
                    key={`particle-${i}-${particle}`}
                    r="1.5"
                    fill={lineColor}
                    initial={{
                      cx: startPoint.x,
                      cy: startPoint.y,
                      opacity: 0,
                    }}
                    animate={{
                      cx: endPoint.x,
                      cy: endPoint.y,
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      delay: i * 0.8 + particle * 0.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 0.5,
                    }}
                  />
                ))}
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
