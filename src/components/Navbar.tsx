"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { AnimatePresence, motion, Variants } from "framer-motion";
import SearchModal from "./SearchModal";
import { Button } from "./ui/button";

// --- Data Configuration ---
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

// Animation variants
const dropdownVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

const iconVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.08, rotate: 3, transition: { duration: 0.2 } },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
};

export default function Navbar() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasShownGreetingRef = useRef(false);

  // --- Get dynamic greeting based on time ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // --- Handle greeting display on reload only ---
  useEffect(() => {
    // Check if this is a page reload
    const isReload = window.performance?.navigation?.type === 1;

    // Check if we've already shown greeting in this session
    const greetingShown = sessionStorage.getItem("greetingShown");

    // Only show greeting if:
    // 1. It's a page reload
    // 2. We haven't shown it yet in this session
    if (isReload && !greetingShown && !hasShownGreetingRef.current) {
      // Show greeting
      const currentGreeting = getGreeting();
      setGreeting(currentGreeting);
      setShowGreeting(true);
      setIsNavVisible(false);
      hasShownGreetingRef.current = true;

      // Hide greeting after 3 seconds
      const greetingTimer = setTimeout(() => {
        setShowGreeting(false);
        setIsNavVisible(true);
        // Mark that greeting has been shown in this session
        sessionStorage.setItem("greetingShown", "true");
      }, 3000);

      // Show tooltip after 5 seconds
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 5000);

      // Hide tooltip after 3 more seconds
      const hideTooltipTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);

      return () => {
        clearTimeout(greetingTimer);
        clearTimeout(tooltipTimer);
        clearTimeout(hideTooltipTimer);
      };
    } else {
      // Normal navigation or already shown - show navbar directly
      setShowGreeting(false);
      setIsNavVisible(true);
    }
  }, []);

  // --- Hover handling with smooth delay ---
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
    }, 200);
  };

  // Close menus on Escape key press
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Cleanup timeouts on unmount
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
    pathname.startsWith(item.href),
  );

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="flex items-start justify-center gap-3 relative">
          {/* Main Navbar Pill */}
          <motion.nav
            ref={navRef}
            layout
            initial={false}
            animate={{
              borderRadius: isDropdownOpen ? 24 : 9999,
            }}
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              },
              borderRadius: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
            onMouseLeave={scheduleCloseDropdown}
            className="relative flex flex-col bg-background/80 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-white/10 backdrop-blur-xl overflow-hidden">
            {/* Top Row - Always Visible with fixed height */}
            <div className="flex items-center gap-1 p-1.5 min-h-[48px]">
              {/* GREETING - Only shows on reload */}
              <AnimatePresence mode="wait">
                {showGreeting && (
                  <motion.div
                    key="greeting"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex items-center justify-center w-full px-4 py-1">
                    <span className="text-primary text-lg mr-2">✨</span>
                    <span className="text-base font-semibold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                      {greeting}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      👋
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* FULL NAVBAR - Shows after greeting hides */}
              <AnimatePresence mode="wait">
                {isNavVisible && (
                  <motion.div
                    key="navbar"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex items-center gap-1 w-full">
                    {/* Mobile Menu Trigger */}
                    <motion.button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      variants={iconVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      className={`md:hidden flex items-center justify-center rounded-full p-2 transition-colors duration-200 ${
                        isMobileMenuOpen
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-foreground"
                      }`}
                      aria-label="Toggle mobile menu"
                      aria-expanded={isMobileMenuOpen}>
                      <AnimatePresence mode="wait" initial={false}>
                        {isMobileMenuOpen ? (
                          <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.4, 0, 0.2, 1],
                            }}>
                            <X className="h-5 w-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.4, 0, 0.2, 1],
                            }}>
                            <Menu className="h-5 w-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-0.5">
                      {mainLinks.map((link) => (
                        <motion.div
                          key={link.href}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}>
                          <Link
                            href={link.href}
                            className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                              isActive(link.href)
                                ? "bg-accent text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            }`}>
                            {link.label}
                          </Link>
                        </motion.div>
                      ))}

                      {/* More Button */}
                      <div className="relative">
                        <motion.button
                          onClick={() => setIsDropdownOpen((prev) => !prev)}
                          onMouseEnter={openDropdown}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className={`flex items-center gap-0.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                            isDropdownOpen || isMoreActive
                              ? "bg-accent text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          }`}
                          aria-expanded={isDropdownOpen}>
                          More
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1],
                            }}>
                            <ChevronDown className="h-3.5 w-3.5" />
                          </motion.div>
                        </motion.button>
                      </div>
                    </div>

                    {/* CTA Button - Book a Call */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                      className="ml-auto">
                      <Button
                        onClick={() => openModal("contact")}
                        className="rounded-full px-4 h-8 text-xs font-medium shadow-lg transition-all duration-200">
                        Book a Call
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  key="more-dropdown"
                  onMouseEnter={openDropdown}
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden border-t border-white/10">
                  <div className="flex flex-col lg:flex-row gap-6 p-6 w-[min(90vw,700px)]">
                    {/* Left Section - Cards */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      {moreCards.map((card, index) => (
                        <motion.div
                          key={card.href}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.06,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="flex-1">
                          <Link
                            href={card.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="relative h-32 sm:h-40 w-full rounded-xl overflow-hidden group cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 block">
                            <Image
                              src={card.img}
                              alt={card.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="font-semibold text-white text-base mb-1">
                                {card.title}
                              </h3>
                              <p className="text-sm text-gray-300">
                                {card.desc}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="hidden lg:block w-px bg-white/10" />
                    <div className="block lg:hidden h-px bg-white/10" />

                    {/* Right Section - Links */}
                    <div className="flex flex-col gap-2 w-full lg:w-[280px]">
                      {moreLinks.map((link, index) => (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.25,
                            delay: index * 0.06 + 0.1,
                            ease: [0.4, 0, 0.2, 1],
                          }}>
                          <Link
                            href={link.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-all duration-200 group">
                            <motion.div
                              className="h-10 w-10 flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-background/50 group-hover:bg-background transition-all duration-200 text-muted-foreground group-hover:text-primary"
                              whileHover={{ scale: 1.05, rotate: 3 }}
                              transition={{ duration: 0.2 }}>
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

          {/* Search Button - Outside the navbar (separate) */}
          <div className="relative">
            <motion.button
              onClick={() => openModal("search")}
              variants={iconVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              aria-label="Search"
              className="flex items-center justify-center rounded-full bg-background/80 shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-white/10 backdrop-blur-xl transition-all duration-300 p-2.5 hover:bg-accent/60 hover:border-white/20">
              <Search className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors duration-200" />
            </motion.button>

            {/* Tooltip - Only shows on hover with ⌘K */}
            <AnimatePresence>
              {showTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 bg-background/95 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1.5 shadow-xl whitespace-nowrap flex items-center gap-1.5 text-xs font-medium">
                  <kbd className="px-1.5 py-0.5 bg-accent/50 rounded text-[10px] font-mono flex items-center gap-1">
                    <span className="text-primary text-sm">⌘</span>
                  </kbd>
                  <span className="text-[10px] text-muted-foreground/60">
                    +
                  </span>
                  <kbd className="px-1.5 py-0.5 bg-accent/50 rounded text-[10px] font-mono">
                    K
                  </kbd>
                  <span className="text-[10px] text-muted-foreground/50 ml-1">
                    to search
                  </span>
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 bg-background/95 border-r border-b border-white/10 rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-md origin-top rounded-2xl bg-card/95 p-4 shadow-2xl border border-white/10 backdrop-blur-xl md:hidden">
                {mainLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.04,
                      ease: [0.4, 0, 0.2, 1],
                    }}>
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-accent text-primary"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      }`}>
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="my-3 h-px bg-white/10" />

                {[...moreCards, ...moreLinks].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: (index + mainLinks.length) * 0.04,
                      ease: [0.4, 0, 0.2, 1],
                    }}>
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-accent/50 hover:text-foreground transition-colors">
                      {"icon" in item && <item.icon className="h-5 w-5" />}
                      {"title" in item ? item.title : item.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-3 pt-3 border-t border-white/10"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.15,
                    ease: [0.4, 0, 0.2, 1],
                  }}>
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openModal("contact");
                    }}
                    className="w-full rounded-xl h-11 transition-all duration-200">
                    Book a Call
                  </Button>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <SearchModal />
    </>
  );
}
