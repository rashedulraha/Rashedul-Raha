"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  ChevronDown,
  Search,
  Menu,
  X,
  Link as LinkIcon,
  CreditCard,
  Home,
  User,
  Briefcase,
  PenLine,
  MessageSquare,
  ListTodo,
  Laptop,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import SearchModal from "./SearchModal";
import { Button } from "./ui/button";

// ── Data Configuration ─────────────────────────────────

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/work", label: "Work", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: PenLine },
];

const moreCards = [
  {
    href: "/guestbook",
    title: "Guestbook",
    desc: "Let me know you were here",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
    icon: MessageSquare,
  },
  {
    href: "/bucket-list",
    title: "Bucket List",
    desc: "Dreams with a deadline",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
    icon: ListTodo,
  },
];

const moreLinks = [
  {
    href: "/links",
    label: "Links",
    desc: "All my links are here",
    icon: LinkIcon,
  },
  {
    href: "/uses",
    label: "Uses",
    desc: "A peek into my digital...",
    icon: Laptop,
  },
  {
    href: "/attribution",
    label: "Attribution",
    desc: "Journey to create this site",
    icon: CreditCard,
  },
];

// ── Animation Variants ─────────────────────────────────

const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.45, ease: [0.32, 0.72, 0, 1] },
  },
};

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -12,
    scale: 0.96,
    filter: "blur(8px)",
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    filter: "blur(4px)",
    transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] },
  },
};

// ── Liquid Glass Navbar Component ──────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownGreetingRef = useRef(false);
  const prevPathnameRef = useRef(pathname);

  // ── Dynamic greeting based on time ─────────────────
  const getGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  // ── Greeting Logic: Only on RELOAD, not on navigation ─
  useEffect(() => {
    // Detect reload using modern Navigation API
    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const isReload = navEntries[0]?.type === "reload";

    if (isReload && !hasShownGreetingRef.current) {
      // It's a reload - show greeting
      setGreeting(getGreeting);
      setShowGreeting(true);
      setIsNavVisible(false);
      hasShownGreetingRef.current = true;

      const greetingTimer = setTimeout(() => {
        setShowGreeting(false);
        setTimeout(() => setIsNavVisible(true), 100);
      }, 2800);

      const tooltipTimer = setTimeout(() => setShowTooltip(true), 4500);
      const hideTooltipTimer = setTimeout(() => setShowTooltip(false), 7500);

      return () => {
        clearTimeout(greetingTimer);
        clearTimeout(tooltipTimer);
        clearTimeout(hideTooltipTimer);
      };
    } else {
      // Normal load or navigation - show navbar directly
      setIsNavVisible(true);
      hasShownGreetingRef.current = true;
    }
  }, [getGreeting]);

  // ── Handle pathname change (page navigation) ───────
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      // On page change, just ensure navbar is visible (no greeting)
      if (!showGreeting) {
        setIsNavVisible(true);
      }
      // Close any open menus
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [pathname, showGreeting]);

  // ── Mouse tracking for liquid glass effect ─────────
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener("mousemove", handleMouseMove);
      return () => nav.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // ── Dropdown hover handling ────────────────────────
  const openDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 250);
  };

  // ── Keyboard & outside click handlers ──────────────
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // ── Prevent body scroll when mobile menu open ──────
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // ── Cleanup ────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openModal = (view: "contact" | "search") => {
    window.dispatchEvent(new CustomEvent("open-modal", { detail: { view } }));
  };

  const isActive = (href: string) => pathname === href;
  const isMoreActive = [...moreCards, ...moreLinks].some((item) =>
    pathname?.startsWith(item.href)
  );

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="flex items-start justify-center gap-3 relative">
          {/* ═══════════════════════════════════════════════
              MAIN NAVBAR - LIQUID GLASS
          ═══════════════════════════════════════════════ */}
          <motion.nav
            ref={navRef}
            layout
            initial={false}
            animate={{
              borderRadius: isDropdownOpen ? 28 : 9999,
            }}
            transition={{
              layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
              borderRadius: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
            }}
            onMouseLeave={scheduleCloseDropdown}
            className="relative flex flex-col overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: `
                0 8px 32px rgba(0,0,0,0.3),
                0 2px 8px rgba(0,0,0,0.2),
                inset 0 1px 0 rgba(255,255,255,0.1),
                inset 0 -1px 0 rgba(255,255,255,0.05)
              `,
            }}
          >
            {/* Liquid Glass - Specular Highlight (top edge glow) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 80%, transparent)",
              }}
            />

            {/* Liquid Glass - Inner glow gradient */}
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)",
              }}
            />

            {/* Liquid Glass - Mouse-following highlight */}
            <motion.div
              className="pointer-events-none absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                left: mousePos.x - 80,
                top: mousePos.y - 80,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
              }}
              animate={{
                left: mousePos.x - 80,
                top: mousePos.y - 80,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 40 }}
            />

            {/* Liquid Glass - Bottom reflection */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent)",
              }}
            />

            {/* ── Top Row ── */}
            <div className="flex items-center gap-1 p-1.5 min-h-12 relative z-10">
              {/* GREETING - Only on reload */}
              <AnimatePresence mode="wait">
                {showGreeting && (
                  <motion.div
                    key="greeting"
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.6,
                        ease: [0.32, 0.72, 0, 1],
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      scale: 1.05,
                      filter: "blur(4px)",
                      transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                    }}
                    className="flex items-center justify-center w-full px-4 py-1"
                  >
                    <motion.span
                      className="text-xl mr-2"
                      animate={{
                        rotate: [0, 15, -15, 10, -10, 0],
                        scale: [1, 1.2, 1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      ✨
                    </motion.span>
                    <span className="text-base font-semibold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                      {greeting}
                    </span>
                    <motion.span
                      className="text-sm ml-2"
                      animate={{
                        rotate: [0, 20, -10, 20, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 0.5,
                      }}
                    >
                      👋
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FULL NAVBAR */}
              <AnimatePresence mode="wait">
                {isNavVisible && !showGreeting && (
                  <motion.div
                    key="navbar"
                    initial={{ opacity: 0, filter: "blur(8px)" }}
                    animate={{
                      opacity: 1,
                      filter: "blur(0px)",
                      transition: {
                        duration: 0.5,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    className="flex items-center gap-1 w-full"
                  >
                    {/* Mobile Menu Trigger */}
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className={`md:hidden flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
                        isMobileMenuOpen
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      }`}
                      aria-label="Toggle mobile menu"
                      aria-expanded={isMobileMenuOpen}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isMobileMenuOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.32, 0.72, 0, 1],
                            }}
                          >
                            <X className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{
                              duration: 0.25,
                              ease: [0.32, 0.72, 0, 1],
                            }}
                          >
                            <Menu className="h-5 w-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-0.5">
                      {mainLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                          <motion.div
                            key={link.href}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 17,
                            }}
                          >
                            <Link
                              href={link.href}
                              className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                                active
                                  ? "text-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {/* Active indicator - liquid glass pill */}
                              {active && (
                                <motion.div
                                  layoutId="activeNavPill"
                                  className="absolute inset-0 rounded-full"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                                    border: "1px solid rgba(255,255,255,0.15)",
                                    boxShadow: `
                                      inset 0 1px 0 rgba(255,255,255,0.15),
                                      0 2px 8px rgba(0,0,0,0.15)
                                    `,
                                  }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30,
                                  }}
                                />
                              )}
                              <span className="relative z-10">{link.label}</span>
                            </Link>
                          </motion.div>
                        );
                      })}

                      {/* More Button */}
                      <div className="relative">
                        <motion.button
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          onMouseEnter={openDropdown}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                          className={`relative flex items-center gap-0.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-300 ${
                            isDropdownOpen || isMoreActive
                              ? "text-primary"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                          aria-expanded={isDropdownOpen}
                        >
                          {/* Active indicator */}
                          {(isDropdownOpen || isMoreActive) && (
                            <motion.div
                              layoutId="activeNavPill"
                              className="absolute inset-0 rounded-full"
                              style={{
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)",
                                border: "1px solid rgba(255,255,255,0.15)",
                                boxShadow: `
                                  inset 0 1px 0 rgba(255,255,255,0.15),
                                  0 2px 8px rgba(0,0,0,0.15)
                                `,
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="relative z-10">More</span>
                          <motion.div
                            className="relative z-10"
                            animate={{
                              rotate: isDropdownOpen ? 180 : 0,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.32, 0.72, 0, 1],
                            }}
                          >
                            <ChevronDown className="h-3.5 w-3.5" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className="ml-auto"
                    >
                      <Button
                        onClick={() => openModal("contact")}
                        className="rounded-full px-4 h-8 text-xs font-medium shadow-lg transition-all duration-300 hover:shadow-xl"
                      >
                        Book a Call
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Dropdown Menu ── */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  key="more-dropdown"
                  onMouseEnter={openDropdown}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden relative"
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Dropdown inner glow */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)",
                    }}
                  />

                  <div className="relative flex flex-col lg:flex-row gap-6 p-6 w-[min(90vw,700px)]">
                    {/* Left - Cards */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      {moreCards.map((card, index) => (
                        <motion.div
                          key={card.href}
                          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.4,
                            delay: index * 0.08,
                            ease: [0.32, 0.72, 0, 1],
                          }}
                          className="flex-1"
                        >
                          <Link
                            href={card.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="relative h-32 sm:h-40 w-full rounded-xl overflow-hidden group cursor-pointer block"
                            style={{
                              border: "1px solid rgba(255,255,255,0.1)",
                              transition: "border-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor =
                                "rgba(255,255,255,0.25)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.borderColor =
                                "rgba(255,255,255,0.1)";
                            }}
                          >
                            <Image
                              src={card.img}
                              alt={card.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="font-semibold text-white text-base mb-1">
                                {card.title}
                              </h3>
                              <p className="text-sm text-gray-300">{card.desc}</p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-white/10" />
                    <div className="block lg:hidden h-px bg-white/10" />

                    {/* Right - Links */}
                    <div className="flex flex-col gap-1 w-full lg:w-[280px]">
                      {moreLinks.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -8, filter: "blur(4px)" }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.35,
                            delay: index * 0.07 + 0.1,
                            ease: [0.32, 0.72, 0, 1],
                          }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                          >
                            <motion.div
                              className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg text-muted-foreground group-hover:text-primary transition-all duration-300"
                              style={{
                                border: "1px solid rgba(255,255,255,0.1)",
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                              }}
                              whileHover={{ scale: 1.05, rotate: 3 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 17,
                              }}
                            >
                              <link.icon className="h-5 w-5" />
                            </motion.div>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm text-foreground">
                                {link.label}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {link.desc}
                              </span>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* ═══════════════════════════════════════════════
              SEARCH BUTTON - LIQUID GLASS
          ═══════════════════════════════════════════════ */}
          <div className="relative">
            <motion.button
              onClick={() => openModal("search")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label="Search"
              className="relative flex items-center justify-center rounded-full p-2.5 overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: `
                  0 8px 32px rgba(0,0,0,0.3),
                  0 2px 8px rgba(0,0,0,0.2),
                  inset 0 1px 0 rgba(255,255,255,0.1)
                `,
              }}
            >
              {/* Specular highlight */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)",
                }}
              />
              <Search className="relative h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-300" />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                    scale: 0.9,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.95,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                    type: "spring",
                    stiffness: 260,
                    damping: 22,
                  }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap flex items-center gap-1.5 text-xs font-medium overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: `
                      0 8px 32px rgba(0,0,0,0.3),
                      inset 0 1px 0 rgba(255,255,255,0.1)
                    `,
                  }}
                >
                  {/* Tooltip specular */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)",
                    }}
                  />

                  <kbd className="relative px-1.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-1"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span className="text-primary text-sm">⌘</span>
                  </kbd>
                  <span className="text-[10px] text-muted-foreground/60">+</span>
                  <kbd
                    className="relative px-1.5 py-0.5 rounded text-[10px] font-mono"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    K
                  </kbd>
                  <span className="text-[10px] text-muted-foreground/60 ml-1">
                    to search
                  </span>

                  {/* Arrow */}
                  <div
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderRight: "1px solid rgba(255,255,255,0.15)",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(20px)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            MOBILE MENU - LIQUID GLASS
        ═══════════════════════════════════════════════ */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-md origin-top rounded-3xl p-4 md:hidden overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  backdropFilter: "blur(30px) saturate(180%)",
                  WebkitBackdropFilter: "blur(30px) saturate(180%)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  boxShadow: `
                    0 20px 60px rgba(0,0,0,0.4),
                    0 8px 20px rgba(0,0,0,0.2),
                    inset 0 1px 0 rgba(255,255,255,0.1)
                  `,
                }}
              >
                {/* Specular highlight */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent)",
                  }}
                />

                {/* Inner glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                  }}
                />

                <div className="relative z-10">
                  {mainLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{
                        opacity: 0,
                        x: -12,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.05,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                        style={
                          isActive(link.href)
                            ? {
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                                border: "1px solid rgba(255,255,255,0.12)",
                              }
                            : {}
                        }
                      >
                        <link.icon className="h-5 w-5" />
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="my-3 h-px bg-white/10" />

                  {[...moreCards, ...moreLinks].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: -12,
                        filter: "blur(4px)",
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        filter: "blur(0px)",
                      }}
                      transition={{
                        duration: 0.35,
                        delay: (index + mainLinks.length) * 0.05,
                        ease: [0.32, 0.72, 0, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all duration-300"
                      >
                        {"icon" in item && <item.icon className="h-5 w-5" />}
                        {"title" in item ? item.title : item.label}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    className="mt-3 pt-3 border-t border-white/10"
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                  >
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openModal("contact");
                      }}
                      className="w-full rounded-xl h-11 transition-all duration-300"
                    >
                      Book a Call
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <SearchModal />
    </>
  );
}