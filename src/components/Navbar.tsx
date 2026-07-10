"use client";

import React, { useState, useEffect, useRef, useMemo, useTransition } from "react";
import { Link, usePathname, useRouter } from "../routing";
import { useTranslations, useLocale } from "next-intl";
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
  KeyIcon,
  Globe
} from "lucide-react";
import { AnimatePresence, motion, LayoutGroup, Variants } from "framer-motion";
import SearchModal from "./SearchModal";
import { Button } from "@base-ui/react";
import { ThemeToggle } from "./ThemeToggle";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "bn", label: "বাংলা", flag: "🇧🇩" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

// ── Data Configuration ─────────────────────────────────

const mainLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: User },
  { href: "/work", label: "Work", icon: Briefcase },
  { href: "/blog", label: "Blog", icon: PenLine },
];

const moreCards = [
  {
    id: "guestbook",
    href: "/guestbook",
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=600&auto=format&fit=crop",
    icon: MessageSquare,
  },
  {
    id: "bucketList",
    href: "/bucket-list",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop",
    icon: ListTodo,
  },
];

const moreLinks = [
  {
    id: "links",
    href: "/links",
    icon: LinkIcon,
  },
  {
    id: "uses",
    href: "/uses",
    icon: Laptop,
  },
  {
    id: "attribution",
    href: "/attribution",
    icon: CreditCard,
  },
];

// ── Animation Variants - SLOWER & MORE DRAMATIC ───────

const dropdownVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
      opacity: { duration: 0.4, delay: 0.2 },
    },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.7, ease: [0.32, 0.72, 0, 1] as const, delay: 0.15 },
      opacity: { duration: 0.5, delay: 0.35 },
    },
  },
};

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
    scale: 0.94,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1] as const,
      staggerChildren: 0.08,
      type: "spring",
      stiffness: 180,
      damping: 22,
    },
  },
};

// ── Liquid Glass Navbar Component ──────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownGreetingRef = useRef(false);
  const prevPathnameRef = useRef(pathname);

  // ── Mark as mounted ─────────────────────────────────
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ── Dynamic greeting based on time ─────────────────
  const getGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  // ── Greeting Logic: Only on RELOAD ─────────────────
  useEffect(() => {
    if (!isMounted) return;

    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const isReload = navEntries[0]?.type === "reload";

    if (isReload && !hasShownGreetingRef.current) {
      setGreeting(getGreeting);
      setShowGreeting(true);
      setIsNavVisible(false);
      hasShownGreetingRef.current = true;

      const greetingTimer = setTimeout(() => {
        setShowGreeting(false);
        setTimeout(() => setIsNavVisible(true), 200);
      }, 3000);

      const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
      const hideTooltipTimer = setTimeout(() => setShowTooltip(false), 8000);

      return () => {
        clearTimeout(greetingTimer);
        clearTimeout(tooltipTimer);
        clearTimeout(hideTooltipTimer);
      };
    } else {
      setIsNavVisible(true);
      hasShownGreetingRef.current = true;
    }
  }, [getGreeting, isMounted]);

  // ── Handle pathname change ─────────────────────────
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (!showGreeting) {
        setIsNavVisible(true);
      }
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
    }
  }, [pathname, showGreeting]);

  // ── Mouse tracking ─────────────────────────────────
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
    if (nav && isMounted) {
      nav.addEventListener("mousemove", handleMouseMove);
      return () => nav.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isMounted]);

  // ── Dropdown hover handling ────────────────────────
  const openDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
    setIsLangDropdownOpen(false);
  };

  const scheduleCloseDropdown = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
      setIsLangDropdownOpen(false);
    }, 300);
  };

  const openLangDropdown = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsLangDropdownOpen(true);
    setIsDropdownOpen(false);
  };

  // ── Keyboard & outside click ───────────────────────
  useEffect(() => {
    if (!isMounted) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setIsLangDropdownOpen(false);
      }
    };
    if (isDropdownOpen || isLangDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, isMounted]);

  // ── Prevent body scroll ────────────────────────────
  useEffect(() => {
    if (!isMounted) return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isMounted]);

  // ── Cleanup ────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const openModal = (view: "contact" | "search" | "login") => {
    window.dispatchEvent(new CustomEvent("open-modal", { detail: { view } }));
  };

  const isActive = (href: string) => pathname === href;
  const isMoreActive = [...moreCards, ...moreLinks].some((item) =>
    pathname?.startsWith(item.href)
  );

  // ── Prevent flash on initial load ──────────────────
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="flex items-start justify-center gap-3 relative">
          {/* ═══════════════════════════════════════════════
              MAIN NAVBAR - LIQUID GLASS
          ═══════════════════════════════════════════════ */}
          <LayoutGroup>
            <motion.nav
              ref={navRef}
              layout
              initial={false}
              animate={{
                borderRadius: isDropdownOpen || isLangDropdownOpen ? 28 : 9999,
              }}
              transition={{
                layout: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
                borderRadius: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
              }}
              onMouseLeave={scheduleCloseDropdown}
              className="relative flex flex-col overflow-hidden glass glass-shadow"
            >

              {/* Inner glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.15) 0%, transparent 60%)",
                }}
              />

              {/* Mouse highlight */}
              <motion.div
                className="pointer-events-none absolute w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
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
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              />

              {/* Bottom reflection */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 70%, transparent)",
                }}
              />

              {/* ── Top Row ── */}
              <div className="flex items-center gap-1 p-1.5 min-h-12 relative z-10">
                {/* GREETING */}
                <AnimatePresence mode="wait">
                  {showGreeting && (
                    <motion.div
                      key="greeting"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.8,
                          ease: [0.32, 0.72, 0, 1],
                          type: "spring",
                          stiffness: 150,
                          damping: 18,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.1,
                        transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
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
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1.5,
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
                          duration: 2.5,
                          repeat: Infinity,
                          repeatDelay: 1,
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
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: {
                          duration: 0.7,
                          ease: [0.32, 0.72, 0, 1],
                        },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.5 } }}
                      className="flex items-center gap-1 w-full"
                    >
                      {/* Mobile Menu Trigger */}
                      <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 15,
                          duration: 0.4 
                        }}
                        className={`md:hidden flex items-center justify-center rounded-full p-2 transition-all duration-500 ${
                          isMobileMenuOpen
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
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
                                duration: 0.4,
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
                                duration: 0.4,
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
                              whileHover={{ 
                                scale: 1.05,
                                transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                              }}
                              whileTap={{ 
                                scale: 0.95,
                                transition: { duration: 0.3 }
                              }}
                              transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                              }}
                            >
                              <Link
                                href={link.href}
                                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-500 ${
                                  active
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              >
                                {active && (
                                  <motion.div
                                    layoutId="activeNavPill"
                                    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                                    transition={{
                                      type: "spring",
                                      stiffness: 200,
                                      damping: 25,
                                      duration: 0.6,
                                    }}
                                  />
                                )}
                                <span className="relative z-10">{t(link.label.toLowerCase() as any)}</span>
                              </Link>
                            </motion.div>
                          );
                        })}

                        {/* More Button */}
                        <div className="relative">
                          <motion.button
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            onMouseEnter={openDropdown}
                            whileHover={{ 
                              scale: 1.05,
                              transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                            }}
                            whileTap={{ 
                              scale: 0.95,
                              transition: { duration: 0.3 }
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                            className={`relative flex items-center gap-0.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-500 ${
                              isDropdownOpen || isMoreActive
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            aria-expanded={isDropdownOpen}
                          >
                            {(isDropdownOpen || isMoreActive) && (
                              <motion.div
                                layoutId="activeNavPill"
                                className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
                                transition={{
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 25,
                                  duration: 0.6,
                                }}
                              />
                            )}
                            <span className="relative z-10">{t('more')}</span>
                            <motion.div
                              className="relative z-10"
                              animate={{
                                rotate: isDropdownOpen ? 180 : 0,
                              }}
                              transition={{
                                duration: 0.6,
                                ease: [0.32, 0.72, 0, 1],
                              }}
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </motion.div>
                          </motion.button>
                        </div>
                      </div>

                      {/* CTA Button & Theme Toggle */}
                      <div className="ml-auto flex items-center gap-2">
                        {/* Language Dropdown Trigger */}
                        <div className="relative">
                          <button
                            onMouseEnter={openLangDropdown}
                            onClick={() => setIsLangDropdownOpen((prev) => !prev)}
                            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500 ${
                              isLangDropdownOpen ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                            aria-label="Change Language"
                          >
                            <Globe className="h-4 w-4" />
                          </button>
                        </div>

                        <ThemeToggle />
                        
                        <button
                          onClick={() => openModal("login")}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors mx-1"
                          aria-label="Dashboard Login"
                        >
                          <KeyIcon className="h-4 w-4" />
                        </button>

                        <Button
                          onClick={() => openModal("contact")}
                          className="rounded-full px-4 h-8 text-xs font-medium bg-primary text-primary-foreground shadow-lg transition-all duration-500 hover:shadow-xl"
                        >
                          {t('bookACall')}
                        </Button>
                      </div>
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
                            initial={{ opacity: 0, y: 16 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.6,
                                delay: index * 0.12 + 0.35,
                                ease: [0.32, 0.72, 0, 1],
                              },
                            }}
                            className="flex-1"
                          >
                            <Link
                              href={card.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="relative h-32 sm:h-40 w-full rounded-xl overflow-hidden group cursor-pointer block"
                              style={{
                                border: "1px solid rgba(255,255,255,0.1)",
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
                                alt={t(card.id as any)}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <h3 className="font-semibold text-foreground text-base mb-1">
                                  {t(card.id as any)}
                                </h3>
                                <p className="text-sm text-muted-foreground">{t(`${card.id}Desc` as any)}</p>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="hidden lg:block w-px bg-foreground/10" />
                      <div className="block lg:hidden h-px bg-foreground/10" />

                      {/* Right - Links */}
                      <div className="flex flex-col gap-1 w-full lg:w-[280px]">
                        {moreLinks.map((link, index) => (
                          <motion.div
                            key={link.href}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{
                              opacity: 1,
                              x: 0,
                              transition: {
                                duration: 0.5,
                                delay: index * 0.1 + 0.5,
                                ease: [0.32, 0.72, 0, 1],
                              },
                            }}
                          >
                            <Link
                              href={link.href}
                              onClick={() => setIsDropdownOpen(false)}
                              className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all duration-500 group"
                            >
                              <motion.div
                                className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg text-muted-foreground group-hover:text-primary transition-all duration-500"
                                style={{
                                  border: "1px solid rgba(255,255,255,0.1)",
                                  background:
                                    "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                                }}
                                whileHover={{ 
                                  scale: 1.08, 
                                  rotate: 4,
                                  transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 200,
                                  damping: 15,
                                }}
                              >
                                <link.icon className="h-5 w-5" />
                              </motion.div>
                              <div className="flex flex-col">
                                <span className="font-medium text-sm text-foreground">
                                  {t(link.id as any)}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {t(`${link.id}Desc` as any)}
                                </span>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Language Dropdown ── */}
                {isLangDropdownOpen && (
                  <motion.div
                    key="lang-dropdown"
                    onMouseEnter={openLangDropdown}
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="overflow-hidden relative"
                    style={{
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative p-6 w-[min(90vw,500px)] grid grid-cols-2 gap-2 mx-auto">
                      {languages.map((lang, index) => (
                        <motion.button
                          key={lang.code}
                          onClick={() => {
                            startTransition(() => {
                              router.replace(pathname, { locale: lang.code });
                            });
                            setIsLangDropdownOpen(false);
                          }}
                          disabled={isPending}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                              duration: 0.5,
                              delay: index * 0.05 + 0.3,
                              ease: [0.32, 0.72, 0, 1],
                            },
                          }}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-foreground/5 transition-all duration-500 group text-left"
                        >
                          <motion.div
                            className={`h-10 w-10 flex shrink-0 items-center justify-center rounded-lg transition-all duration-500 ${
                              locale === lang.code ? "text-primary bg-primary/10 border border-primary/30" : "text-muted-foreground group-hover:text-primary"
                            }`}
                            style={
                              locale !== lang.code ? {
                                border: "1px solid rgba(255,255,255,0.1)",
                                background:
                                  "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                              } : undefined
                            }
                            whileHover={{ 
                              scale: 1.08, 
                              rotate: 4,
                              transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            }}
                          >
                            <span className="text-xl">{lang.flag}</span>
                          </motion.div>
                          <div className="flex flex-col">
                            <span className={`font-medium text-sm transition-colors duration-500 ${
                              locale === lang.code ? "text-primary" : "text-foreground group-hover:text-primary"
                            }`}>
                              {lang.label}
                            </span>
                            {locale === lang.code && (
                              <span className="text-[10px] uppercase tracking-wider font-semibold text-primary/70">
                                Active
                              </span>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.nav>
          </LayoutGroup>

          {/* ═══════════════════════════════════════════════
              SEARCH BUTTON
          ═══════════════════════════════════════════════ */}
          <div className="relative">
            <motion.button
              onClick={() => openModal("search")}
              whileHover={{ 
                scale: 1.08,
                transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.3 }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
              }}
              aria-label="Search"
              className="relative flex items-center justify-center rounded-full p-2.5 overflow-hidden glass"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)",
                }}
              />
              <Search className="relative h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-500" />
            </motion.button>

       
           {/* Tooltip */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -12,
                    scale: 0.85,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.32, 0.72, 0, 1],
                    type: "spring",
                    stiffness: 180,
                    damping: 20,
                  }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap flex items-center gap-1.5 text-xs font-medium overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 100%)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: `
                      0 8px 32px rgba(var(--foreground), 0.3),
                      inset 0 1px 0 rgba(255,255,255,0.1)
                    `,
                  }}
                >
                  {/* Specular highlight - now at top */}
                  <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 50%, transparent)",
                    }}
                  />

                  <kbd
                    className="relative px-1.5 py-0.5 rounded text-[10px] font-mono flex items-center gap-1"
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

                  {/* Arrow - now pointing UP (towards the button) */}
                  <div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      borderLeft: "1px solid rgba(255,255,255,0.15)",
                      borderTop: "1px solid rgba(255,255,255,0.15)",
                      backdropFilter: "blur(20px)",
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            MOBILE MENU
        ═══════════════════════════════════════════════ */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[-1] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
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
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0.3) 70%, transparent)",
                  }}
                />

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
                        x: -16,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          delay: index * 0.07,
                          ease: [0.32, 0.72, 0, 1],
                        },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-500 ${
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
                        {t(link.label.toLowerCase() as any)}
                      </Link>
                    </motion.div>
                  ))}

                  <div className="my-3 h-px bg-foreground/10" />

                  {[...moreCards, ...moreLinks].map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{
                        opacity: 0,
                        x: -16,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: 0.5,
                          delay: (index + mainLinks.length) * 0.07,
                          ease: [0.32, 0.72, 0, 1],
                        },
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-500"
                      >
                        {"icon" in item && <item.icon className="h-5 w-5" />}
                        {t(item.id as any)}
                      </Link>
                    </motion.div>
                  ))}

                  <motion.div
                    className="mt-3 pt-3 border-t border-foreground/10"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.6,
                        delay: 0.3,
                        ease: [0.32, 0.72, 0, 1],
                      },
                    }}
                  >
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openModal("contact");
                      }}
                      className="w-full rounded-xl h-11 transition-all duration-500"
                    >
                      {t('bookACall')}
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