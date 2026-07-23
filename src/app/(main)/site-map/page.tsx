"use client";

import React, { useRef, useState } from "react";
import PageWrapper from "@/components/PageWrapper";
import Footer from "@/components/Footer";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/routing";
import { useLocale } from "next-intl";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform,
  AnimatePresence
} from "framer-motion";
import { 
  Layers, 
  Globe, 
  Droplet, 
  Command, 
  Moon, 
  LineChart, 
  LayoutGrid 
} from "lucide-react";

// ── Technical Features Data ──────────────────────────────────────

const technicalFeatures = [
  {
    title: "Next.js 16 App Router",
    description: "Navigate to the Home page to experience the seamless routing.",
    icon: Layers,
    color: "from-blue-500 to-cyan-400",
    action: (router: any) => router.push("/"),
  },
  {
    title: "Global i18n",
    description: "Toggle between English and Bengali to see internationalization in action.",
    icon: Globe,
    color: "from-emerald-500 to-green-400",
    action: (router: any, pathname: string, currentLocale: string) => {
      const nextLocale = currentLocale === "en" ? "bn" : "en";
      router.replace(pathname, { locale: nextLocale });
    }
  },
  {
    title: "Command Palette",
    description: "Click to open the global search interface (Cmd+K).",
    icon: Command,
    color: "from-orange-500 to-amber-400",
    action: () => window.dispatchEvent(new CustomEvent("open-modal", { detail: { view: "search" } })),
  },
  {
    title: "Dark Mode Ecosystem",
    description: "Click to toggle between Dark and Light mode seamlessly.",
    icon: Moon,
    color: "from-slate-500 to-zinc-400",
    action: (router: any, pathname: string, currentLocale: string, theme: any, setTheme: any) => {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  },
  {
    title: "Data Visualizations",
    description: "Check out the About page to see interactive maps and visualizations.",
    icon: LineChart,
    color: "from-rose-500 to-pink-400",
    action: (router: any) => router.push("/about"),
  },
  {
    title: "Responsive Grids",
    description: "Visit the Guestbook to see the beautiful masonry layout in action.",
    icon: LayoutGrid,
    color: "from-indigo-500 to-blue-400",
    action: (router: any) => router.push("/guestbook"),
  },
];

// ── Dock Components ──────────────────────────────────────────────

function DockItem({
  item,
  mouseX,
  isActive,
  onClick,
}: {
  item: typeof technicalFeatures[0];
  mouseX: any;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="relative group flex flex-col items-center">
      {/* Tooltip */}
      <div className="absolute -top-10 px-2.5 py-1 bg-foreground text-background text-[10px] font-semibold rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl">
        {item.title}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-foreground" />
      </div>

      <motion.button
        ref={ref}
        style={{ width, height: width }}
        onClick={onClick}
        className={`relative flex items-center justify-center rounded-[20px] transition-colors duration-300 ${
          isActive
            ? "bg-foreground/10 text-foreground border border-foreground/20 shadow-lg"
            : "bg-foreground/5 text-muted-foreground border border-foreground/5 hover:bg-foreground/10 hover:text-foreground"
        }`}
      >
        {/* Subtle inner glow for active state */}
        {isActive && (
          <div className="absolute inset-0 rounded-[20px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-none" />
        )}
        <item.icon className="w-[45%] h-[45%]" />
      </motion.button>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────

export default function FeatureDockPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mouseX = useMotionValue(Infinity);
  const activeFeature = technicalFeatures[activeIndex];
  
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <PageWrapper className="min-h-screen flex flex-col">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40"
           style={{
             background: "radial-gradient(ellipse at top center, rgba(147, 51, 234, 0.15), transparent 70%)",
           }}
      />

      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pt-24 pb-32 px-4">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <p className="mb-4 font-semibold text-muted-foreground text-xs uppercase tracking-[0.3em]">
            Site Map & Tech Stack
          </p>
          <h1 className="font-serif text-4xl md:text-6xl tracking-tight text-foreground">
            Feature{" "}
            <span
              className="italic font-instrument-serif font-light tracking-normal"
              style={{
                backgroundImage: "linear-gradient(to right, #9333ea, #e879f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
              Dock
            </span>
          </h1>
        </div>

        {/* Feature Display Panel */}
        <div className="w-full max-w-2xl h-[280px] md:h-[220px] relative mb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 flex flex-col items-center text-center p-8 rounded-3xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div className={`w-16 h-16 mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br ${activeFeature.color} shadow-lg`}>
                <activeFeature.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                {activeFeature.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                {activeFeature.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Interactive Dock */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="flex items-end gap-3 rounded-[32px] p-3"
            style={{
              background: "rgba(20, 20, 20, 0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(30px) saturate(200%)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
            }}
          >
            {technicalFeatures.map((item, i) => (
              <DockItem
                key={item.title}
                item={item}
                mouseX={mouseX}
                isActive={activeIndex === i}
                onClick={() => {
                  setActiveIndex(i);
                  if (item.action) {
                    item.action(router, pathname, locale, theme, setTheme);
                  }
                }}
              />
            ))}
          </div>
        </div>

      </div>
      
      {/* We add extra padding at the bottom so the absolute dock doesn't overlap footer content */}
      <div className="pb-32">
        <Footer />
      </div>
    </PageWrapper>
  );
}
