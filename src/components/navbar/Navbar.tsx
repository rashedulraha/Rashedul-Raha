"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { Link, usePathname, useRouter } from "../../routing";
import {
  ChevronDown,
  Menu,
  X,
  KeyIcon,
} from "lucide-react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import SearchModal from "../SearchModal";
import { Button } from "@base-ui/react";
import { ThemeToggle } from "../ThemeToggle";

// Components
import { mainLinks, moreCards, moreLinks } from "./NavbarConfig";
import NavbarGreeting from "./NavbarGreeting";
import NavbarSearch from "./NavbarSearch";
import NavbarDropdown from "./NavbarDropdown";
import NavbarMobileMenu from "./NavbarMobileMenu";

export default function Navbar() {
  const pathname = usePathname();
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const navEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];
    const isReload = navEntries[0]?.type === "reload";

    if (isReload && !hasShownGreetingRef.current) {
      const hour = new Date().getHours();
      let currentGreeting = "Good Evening";
      if (hour < 12) {
        currentGreeting = "Good Morning";
      } else if (hour < 17) {
        currentGreeting = "Good Afternoon";
      }

      setGreeting(currentGreeting);
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
  }, [isMounted]);

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

  useEffect(() => {
    if (!isMounted) return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen, isMounted]);

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

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
        <div className="flex items-start justify-center gap-3 relative">
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
                <NavbarGreeting showGreeting={showGreeting} greeting={greeting} />

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
                      <motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          duration: 0.4,
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

                      <div className="hidden md:flex items-center gap-0.5">
                        {mainLinks.map((link) => {
                          const active = isActive(link.href);
                          return (
                            <motion.div
                              key={link.href}
                              whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
                              }}
                              whileTap={{
                                scale: 0.95,
                                transition: { duration: 0.3 },
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
                                <span className="relative z-10">
                                  {link.label}
                                </span>
                              </Link>
                            </motion.div>
                          );
                        })}

                        <div className="relative">
                          <motion.button
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            onMouseEnter={openDropdown}
                            whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.3 },
                            }}
                            whileTap={{
                              scale: 0.95,
                              transition: { duration: 0.3 },
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
                            <span className="relative z-10">More</span>
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

                      <div className="ml-auto flex items-center gap-2">
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
                          className="relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground shadow-sm hover:shadow-primary/25 cursor-pointer"
                        >
                          Book a Call
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavbarDropdown
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                openDropdown={openDropdown}
              />
            </motion.nav>
          </LayoutGroup>

          <NavbarSearch showTooltip={showTooltip} openModal={openModal} />
        </div>

        <NavbarMobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isActive={isActive}
          openModal={openModal}
        />
      </header>

      <SearchModal />
    </>
  );
}
